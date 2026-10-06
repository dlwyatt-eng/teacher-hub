import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, readdirSync} from 'node:fs';
import path from 'node:path';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {moduleLoader} from './helpers/load-rendered-module.mjs';

const root = path.resolve(import.meta.dirname, '..');
const load = moduleLoader(root);
const store = load('app/day-plan-store.ts');

// Synthetic planning data only. Nothing in these fixtures is a classroom resource.
function material(overrides = {}) {
  return {label:'Compare decimals activity', href:'./activities/compare-decimals.html', studentSafe:true, ...overrides};
}
function plan(overrides = {}) {
  return {
    id:'materials-test', date:'2030-10-01', title:'Synthetic materials test',
    greeting:'Welcome', arrival:'Open your notebook.', note:'Teacher preparation',
    reflection:'Keep this browser-local reflection.', backups:['Read quietly.'],
    blocks:[{
      time:'9:00', title:'Compare decimals', notes:'Model 0.50 > 0.45.',
      href:'?subject=Mathematics&mode=student', studentSteps:['Compare 0.50 and 0.45.'],
      titleKo:'소수 비교하기', firstAction:'Write 0.50 and 0.45 in your notebook.',
      firstActionKo:'공책에 0.50과 0.45를 쓰세요.',
      activity:material(),
      worksheet:material({label:'Decimal comparison sheet', href:'./worksheets/decimal-comparison.pdf'}),
      teacherReference:{href:'https://example.org/teacher-guide', notes:'TEACHER REFERENCE: model first, then release practice.'},
    }],
    ...overrides,
  };
}
function changeBlock(patch) {
  const value = plan();
  Object.assign(value.blocks[0], patch);
  return value;
}
function revision(value, id = 'incoming-materials', savedAt = '2030-10-01T07:00:00.000Z') {
  return {revisionId:id, savedAt, plan:value};
}
function browser(t) {
  const previous = globalThis.window;
  const data = new Map(), events = [];
  let writes = 0;
  globalThis.window = {
    localStorage:{
      getItem:key => data.get(key) ?? null,
      setItem:(key, value) => { writes++; data.set(key, value); },
    },
    dispatchEvent:event => { events.push(event.type); return true; },
  };
  t.after(() => {
    if (previous === undefined) delete globalThis.window;
    else globalThis.window = previous;
  });
  return {data, events, get writes() { return writes; }};
}

test('all committed day plans remain registered and parse without losing historical fields', () => {
  const directory = path.join(root, 'content/day-plans');
  const committed = readdirSync(directory).filter(name => name.endsWith('.json'))
    .map(name => ({name, value:JSON.parse(readFileSync(path.join(directory, name), 'utf8'))}));
  assert.ok(committed.length > 0);
  for (const {name, value} of committed) {
    assert.deepEqual(store.parseDayPlan(value), value, `${name} round trip`);
    assert.deepEqual(store.publishedDayPlans.find(p => p.id === value.id), value, `${name} registration`);
  }
  assert.equal(new Set(store.publishedDayPlans.map(p => p.id)).size, store.publishedDayPlans.length);
});

test('published day-plan JSON and public learning-window JSON contain no teacher references', () => {
  const files = readdirSync(path.join(root, 'content/day-plans'))
    .filter(name => name.endsWith('.json')).map(name => `content/day-plans/${name}`);
  files.push('public/generated/public-window-v2.json');
  function assertPublic(value, location) {
    if (!value || typeof value !== 'object') return;
    assert.equal(Object.hasOwn(value, 'teacherReference'), false, location);
    for (const key of ['activity', 'worksheet']) {
      if (value[key]?.href) assert.equal(value[key].studentSafe, true, `${location}.${key} must be explicitly student-safe`);
    }
    for (const [key, child] of Object.entries(value)) assertPublic(child, `${location}.${key}`);
  }
  for (const file of files) assertPublic(JSON.parse(readFileSync(path.join(root, file), 'utf8')), file);
});

test('manual Korean, first actions, both chosen materials and teacher reference survive parse without aliasing', () => {
  const original = plan();
  const expected = structuredClone(original);
  const clean = store.parseDayPlan(original);
  assert.deepEqual(clean, expected);
  original.blocks[0].activity.label = 'Changed outside archive';
  original.blocks[0].worksheet.href = './worksheets/changed.pdf';
  original.blocks[0].teacherReference.notes = 'Changed reference';
  original.blocks[0].studentSteps.push('Changed outside archive');
  original.backups.push('Changed outside archive');
  assert.deepEqual(clean, expected, 'parsed data must not share nested mutable records with the input');
});

test('save, unchanged save, revision, JSON export and import preserve full material metadata and manual Korean', t => {
  const storage = browser(t);
  const original = plan();
  store.saveDayPlan(original);
  const afterFirst = storage.data.get(store.DAY_ARCHIVE_KEY);
  store.saveDayPlan(structuredClone(original));
  assert.equal(storage.data.get(store.DAY_ARCHIVE_KEY), afterFirst);
  assert.equal(storage.writes, 1, 'an unchanged save must not create another revision');
  const edited = structuredClone(original);
  edited.blocks[0].worksheet = material({label:'Revised printable', href:'./worksheets/revised.pdf'});
  edited.blocks[0].firstActionKo = '공책에 먼저 쓰세요.';
  edited.blocks[0].teacherReference.notes = 'Revised browser-only preparation';
  store.saveDayPlan(edited);
  const exported = JSON.parse(JSON.stringify(store.readDayRevisions()));
  assert.equal(exported.length, 2);
  assert.deepEqual(exported[0].plan, original, 'the original revision remains intact');
  assert.deepEqual(exported[1].plan, edited);
  assert.deepEqual(store.dayPlanForDate(edited.date), edited);
  storage.data.clear();
  assert.deepEqual(store.importDayArchive(exported), exported);
  assert.deepEqual(store.readDayRevisions(), exported);
  store.importDayArchive(exported);
  assert.deepEqual(store.readDayRevisions(), exported, 'reimport must not duplicate revisions');
  assert.ok(storage.events.every(name => name === store.DAY_ARCHIVE_EVENT));
});

test('optional fields may be absent or empty while notes-only teacher references round trip', () => {
  const legacy = structuredClone(store.publishedDayPlans[0]);
  assert.deepEqual(store.parseDayPlan(legacy), legacy);
  const blank = changeBlock({titleKo:'', firstAction:'', firstActionKo:'', teacherReference:{href:'', notes:'Prepare cards.'}});
  assert.deepEqual(store.parseDayPlan(blank), blank);
  for (const field of ['titleKo', 'firstAction', 'firstActionKo', 'activity', 'worksheet', 'teacherReference']) {
    const without = plan();
    delete without.blocks[0][field];
    const parsed = store.parseDayPlan(without);
    assert.ok(parsed, field);
    assert.equal(Object.hasOwn(parsed.blocks[0], field), false, `${field} must not be invented`);
  }
});

test('safe site routes, public PDF/HTML paths and ordinary HTTPS destinations are accepted', () => {
  const accepted = [
    '?view=Games+%26+Activities&mode=student&deck=agreements',
    '?subject=Social+Studies&socialLesson=trace-the-claim&socialScene=1&mode=student',
    './activities/orange-shirt-art.html', './worksheets/decimal-comparison.pdf',
    './resources/grade-6/Place_Value.v2.pdf?print=1#page=2',
    'https://ca.spacesedu.com/', 'https://example.org/learning?q=place%20value#example',
  ];
  for (const href of accepted) {
    assert.equal(store.isSafeDayHref(href), true, href);
    assert.ok(store.parseDayPlan(changeBlock({href, activity:material({href}), worksheet:material({href}), teacherReference:{href, notes:''}})), href);
  }
});

const unsafeHrefs = [
  '', 'javascript:alert(1)', 'JaVaScRiPt:alert(1)', 'data:text/html,<script>alert(1)</script>',
  'file:///tmp/private.pdf', 'blob:https://example.org/id', 'mailto:teacher@example.org',
  'http://example.org/worksheet.pdf', '//example.org/worksheet.pdf', '/worksheets/worksheet.pdf',
  '../worksheet.pdf', './worksheets/../worksheet.pdf', './worksheets/%2e%2e/worksheet.pdf',
  './worksheets/%2E%2E/worksheet.pdf', './worksheets/worksheet.docx',
  './worksheets\\worksheet.pdf', 'https://example.org\\@other.example/worksheet.pdf',
  ' https://example.org/worksheet.pdf', 'https://example.org/worksheet.pdf ',
  'https://example.org/a\nb.pdf', 'https://example.org/a\tb.pdf',
  'https://example.org/a%0ab.pdf', './worksheets/a%00b.pdf', '?view=Home%0D%0AInjected',
  'https://teacher:secret@example.org/worksheet.pdf', 'https://teacher@example.org/worksheet.pdf',
  'https://example.org/%ZZ', 'https://files.oaiusercontent.com/private.pdf',
  'https://chatgpt.com/backend-api/files/download',
  'https://chatgpt.com/%62ackend-api/files/download',
  'https://chatgpt.com/api/library/file-example/download',
  'https://chatgpt.com/%61pi/%6cibrary/file-example/download',
  'https://chatgpt.com/api%2flibrary%2ffile-example%2fdownload',
  'https://example.org/a.pdf?token=private', 'https://example.org/a.pdf?access_token=private',
  'https://example.org/a.pdf?auth_token=private', 'https://example.org/a.pdf?authToken=private',
  'https://example.org/a.pdf?refresh_token=private', 'https://example.org/a.pdf?id_token=private',
  'https://example.org/a.pdf?client_secret=private', 'https://example.org/a.pdf?CLIENT-SECRET=private',
  'https://example.org/a.pdf?API-KEY=private', 'https://example.org/a.pdf?password=private',
  'https://example.org/a.pdf?X-Amz-Signature=private', 'https://example.org/a.pdf?X-Goog-Credential=private',
  'https://example.org/a.pdf?sig=private&sv=2025-01-01',
  'https://example.org/a.pdf#access_token=private',
  './worksheets/sheet.pdf?signature=private', '?view=Home&token=private',
  '?subject=Mathematics&access%5Ftoken=private',
];

test('unsafe or sensitive URLs are rejected consistently in every link field', () => {
  for (const href of unsafeHrefs) {
    assert.equal(store.isSafeDayHref(href), false, `helper accepted ${JSON.stringify(href)}`);
    for (const field of ['activity', 'worksheet']) {
      assert.equal(store.parseDayPlan(changeBlock({[field]:material({href})})), null, `${field}: ${JSON.stringify(href)}`);
    }
    // Legacy links and notes-only references may intentionally be empty.
    if (href !== '') {
      assert.equal(store.parseDayPlan(changeBlock({href})), null, `legacy href: ${JSON.stringify(href)}`);
      assert.equal(store.parseDayPlan(changeBlock({teacherReference:{href, notes:''}})), null, `teacher reference: ${JSON.stringify(href)}`);
    }
  }
});

test('student material selection requires literal studentSafe true and revalidates the destination', () => {
  const approved = material();
  assert.deepEqual(store.studentDayMaterial(approved), approved);
  for (const studentSafe of [false, undefined, null, 0, 1, 'true']) {
    assert.equal(store.studentDayMaterial({...approved, studentSafe}), undefined, `studentSafe=${studentSafe}`);
  }
  for (const href of unsafeHrefs) assert.equal(store.studentDayMaterial(material({href})), undefined, href);
  for (const invalid of [undefined, null, '', {}, {...approved, label:''}, {...approved, label:'   '}]) {
    assert.equal(store.studentDayMaterial(invalid), undefined);
  }
  // An unapproved selection is valid teacher planning data, but is not publishable.
  assert.ok(store.parseDayPlan(changeBlock({activity:material({studentSafe:false})})));
});

test('new field limits accept exact maxima and reject excess or mistyped metadata', () => {
  for (const [field, max] of [['titleKo', 180], ['firstAction', 500], ['firstActionKo', 500]]) {
    assert.ok(store.parseDayPlan(changeBlock({[field]:'가'.repeat(max)})), `${field} boundary`);
    assert.equal(store.parseDayPlan(changeBlock({[field]:'가'.repeat(max + 1)})), null, `${field} overflow`);
    for (const value of [null, 42, [], {}]) assert.equal(store.parseDayPlan(changeBlock({[field]:value})), null, `${field} type`);
  }
  const hrefPrefix = 'https://example.org/';
  const maxHref = hrefPrefix + 'a'.repeat(2000 - hrefPrefix.length);
  assert.equal(store.isSafeDayHref(maxHref), true);
  assert.equal(store.isSafeDayHref(`${maxHref}a`), false);
  for (const field of ['activity', 'worksheet']) {
    assert.ok(store.parseDayPlan(changeBlock({[field]:material({label:'x'.repeat(180), href:maxHref})})), field);
    for (const value of [null, [], {}, material({label:'x'.repeat(181)}), material({label:''}), material({label:'   '}), material({label:1}), material({href:`${maxHref}a`}), material({studentSafe:'true'}), material({studentSafe:undefined})]) {
      assert.equal(store.parseDayPlan(changeBlock({[field]:value})), null, `${field} must reject ${JSON.stringify(value)}`);
    }
  }
  assert.ok(store.parseDayPlan(changeBlock({href:maxHref, teacherReference:{href:maxHref, notes:'x'.repeat(2000)}})));
  assert.equal(store.parseDayPlan(changeBlock({href:`${maxHref}a`})), null);
  for (const value of [null, {}, {href:'', notes:'x'.repeat(2001)}, {href:`${maxHref}a`, notes:''}, {href:'', notes:42}, {href:42, notes:''}]) {
    assert.equal(store.parseDayPlan(changeBlock({teacherReference:value})), null, 'teacher reference validation');
  }
});

test('invalid material saves do not mutate stored revisions or emit a successful update', t => {
  const storage = browser(t);
  store.saveDayPlan(plan());
  const before = storage.data.get(store.DAY_ARCHIVE_KEY), writes = storage.writes, events = storage.events.length;
  for (const field of ['activity', 'worksheet', 'teacherReference']) {
    const invalid = changeBlock({[field]:field === 'teacherReference' ? {href:'javascript:alert(1)', notes:''} : material({href:'javascript:alert(1)'})});
    assert.throws(() => store.saveDayPlan(invalid));
    assert.equal(storage.data.get(store.DAY_ARCHIVE_KEY), before);
  }
  assert.equal(storage.writes, writes);
  assert.equal(storage.events.length, events);
});

test('a late invalid entry rejects the complete import atomically, preserving every existing revision', t => {
  const storage = browser(t);
  store.saveDayPlan(plan({id:'already-saved'}));
  const before = storage.data.get(store.DAY_ARCHIVE_KEY), writes = storage.writes, events = storage.events.length;
  const valid = revision(plan({id:'valid-incoming'}), 'valid-first');
  for (const field of ['href', 'activity', 'worksheet', 'teacherReference']) {
    const invalid = plan({id:'invalid-incoming'});
    invalid.blocks[0][field] = field === 'href' ? 'javascript:alert(1)' : field === 'teacherReference' ? {href:'javascript:alert(1)', notes:''} : material({href:'javascript:alert(1)'});
    assert.throws(() => store.importDayArchive([valid, revision(invalid, 'invalid-last')]));
    assert.equal(storage.data.get(store.DAY_ARCHIVE_KEY), before, field);
  }
  assert.equal(storage.writes, writes);
  assert.equal(storage.events.length, events);
});

test('conflicting existing or incoming revision IDs cannot silently replace material choices', t => {
  const storage = browser(t);
  const original = revision(plan(), 'same-revision');
  store.importDayArchive([original]);
  const before = storage.data.get(store.DAY_ARCHIVE_KEY), writes = storage.writes;
  const conflicting = structuredClone(original);
  conflicting.plan.blocks[0].worksheet.href = './worksheets/different.pdf';
  assert.throws(() => store.importDayArchive([conflicting]), /conflict/i);
  assert.equal(storage.data.get(store.DAY_ARCHIVE_KEY), before);
  assert.equal(storage.writes, writes);
  const first = revision(plan({id:'new-incoming'}), 'new-revision');
  const second = structuredClone(first);
  second.plan.blocks[0].teacherReference.notes = 'Conflicting local reference';
  assert.throws(() => store.importDayArchive([first, second]), /conflict/i);
  assert.equal(storage.data.get(store.DAY_ARCHIVE_KEY), before);
  assert.equal(storage.writes, writes);
});

test('identical repeated records within one import collapse to one revision', t => {
  browser(t);
  const record = revision(plan());
  const imported = store.importDayArchive([record, structuredClone(record)]);
  assert.deepEqual(imported, [record]);
  assert.deepEqual(store.readDayRevisions(), [record]);
});

test('the production teacher printout identifies exact materials, keeps Korean, and labels teacher references', () => {
  const {default:DayPlanPrint} = load('app/day-plan-print.tsx');
  const value = plan();
  const html = renderToStaticMarkup(React.createElement(DayPlanPrint, {plan:value}));
  for (const selected of [value.blocks[0].activity, value.blocks[0].worksheet, value.blocks[0].teacherReference]) {
    const absolute = new URL(selected.href, 'https://dlwyatt-eng.github.io/teacher-hub/').href;
    assert.ok(html.includes(`href="${absolute}"`), absolute);
    assert.ok(html.includes(`>${absolute}</a>`), 'printed text includes the usable absolute destination');
  }
  for (const text of [value.blocks[0].titleKo, value.blocks[0].firstAction, value.blocks[0].firstActionKo, value.blocks[0].teacherReference.notes]) {
    assert.ok(html.includes(text), text);
  }
  assert.match(html, /Teacher day plan printout/);
  assert.match(html, /Student worksheet \(print separately\)/);
  assert.match(html, /Teacher reference \/ page notes/);
  assert.match(html, /Open the chosen student worksheet separately to print student copies/);
  const unapproved = changeBlock({worksheet:material({studentSafe:false})});
  const unapprovedHtml = renderToStaticMarkup(React.createElement(DayPlanPrint, {plan:unapproved}));
  assert.match(unapprovedHtml, /teacher preview; not shared on the board/);
});

test('printable material paths and Hub routes resolve to the canonical site without rewriting HTTPS links', () => {
  const {printableDayHref} = load('app/day-plan-print.tsx');
  assert.equal(printableDayHref('./worksheets/decimals.pdf'), 'https://dlwyatt-eng.github.io/teacher-hub/worksheets/decimals.pdf');
  assert.equal(printableDayHref('?subject=Mathematics&mode=student'), 'https://dlwyatt-eng.github.io/teacher-hub/?subject=Mathematics&mode=student');
  assert.equal(printableDayHref('https://example.org/worksheet.pdf?print=1#page=2'), 'https://example.org/worksheet.pdf?print=1#page=2');
  for (const href of unsafeHrefs) assert.equal(printableDayHref(href), '', href);
});

test('the production teacher printout never makes unsafe unsaved links clickable', () => {
  const {default:DayPlanPrint} = load('app/day-plan-print.tsx');
  const unsafe = changeBlock({
    href:'javascript:alert(1)', activity:material({href:'javascript:alert(1)'}),
    worksheet:material({href:'https://example.org/a.pdf?token=private'}),
    teacherReference:{href:'https://user:secret@example.org', notes:'Browser-only reference note'},
  });
  const html = renderToStaticMarkup(React.createElement(DayPlanPrint, {plan:unsafe}));
  assert.doesNotMatch(html, /href=/);
  assert.match(html, /Browser-only reference note/);
});

// Exercise production event handlers directly. Effects deliberately do not run:
// persistence and archive integrity are tested above, without synthetic DOM APIs.
function editorHarness(value) {
  const state = [], mountEffects = [], cleanups = [];
  let cursor = 0;
  let captureMountEffects = true;
  const react = {
    ...React,
    useEffect:effect => { if (captureMountEffects) mountEffects.push(effect); },
    useRef:initial => ({current:initial}),
    useState:initial => {
      const index = cursor++;
      if (!Object.hasOwn(state, index)) {
        state[index] = initial && !Array.isArray(initial) && Array.isArray(initial.blocks)
          ? structuredClone(value) : typeof initial === 'function' ? initial() : initial;
      }
      return [state[index], next => { state[index] = typeof next === 'function' ? next(state[index]) : next; }];
    },
  };
  const {default:DayPlanLibrary} = moduleLoader(root, {react})('app/day-plan-library.tsx');
  return {
    render() { cursor = 0; const tree = DayPlanLibrary(); captureMountEffects = false; return tree; },
    mount() {
      this.render();
      for (const effect of mountEffects) { const cleanup = effect(); if (typeof cleanup === 'function') cleanups.push(cleanup); }
      mountEffects.length = 0;
      return this.render();
    },
    unmount() { for (const cleanup of cleanups) cleanup(); },
    get draft() { return state.find(item => item && !Array.isArray(item) && Array.isArray(item.blocks)); },
  };
}
function elements(tree, predicate) {
  if (!React.isValidElement(tree)) return [];
  return [ ...(predicate(tree) ? [tree] : []),
    ...React.Children.toArray(tree.props.children).flatMap(child => elements(child, predicate)),
  ];
}
function textContent(tree) {
  if (typeof tree === 'string' || typeof tree === 'number') return String(tree);
  return React.isValidElement(tree) ? React.Children.toArray(tree.props.children).map(textContent).join('') : '';
}
function control(tree, labelText) {
  const labels = elements(tree, node => node.type === 'label' && textContent(node) === labelText);
  assert.equal(labels.length, 1, `one control labelled ${labelText}`);
  const controls = elements(labels[0], node => ['input', 'textarea', 'select'].includes(node.type));
  assert.equal(controls.length, 1, labelText);
  return controls[0];
}
function materialEditor(tree, kind) {
  const editors = elements(tree, node => node.type?.name === 'MaterialEditor' && node.props.kind === kind);
  assert.equal(editors.length, 1, `${kind} material editor`);
  return editors[0].type(editors[0].props);
}

function navigationHarness(props) {
  const state = [], effects = [], cleanups = [];
  let cursor = 0, mounting = true;
  const react = {
    ...React,
    useState:initial => {
      const index = cursor++;
      if (!Object.hasOwn(state, index)) state[index] = typeof initial === 'function' ? initial() : initial;
      return [state[index], next => { state[index] = typeof next === 'function' ? next(state[index]) : next; }];
    },
    useEffect:effect => { if (mounting) effects.push(effect); },
  };
  const {ClassroomNavigation} = moduleLoader(root, {react})('app/classroom-navigation.tsx');
  return {
    render() { cursor = 0; const tree = ClassroomNavigation(props); mounting = false; return tree; },
    mount() { this.render(); for (const effect of effects) { const cleanup = effect(); if (typeof cleanup === 'function') cleanups.push(cleanup); } return this.render(); },
    unmount() { for (const cleanup of cleanups) cleanup(); },
  };
}

test('editing a selected URL resets its student approval without losing the other material or manual Korean', () => {
  for (const [kind, label] of [['activity', 'Chosen activity / material URL'], ['worksheet', 'Student worksheet URL']]) {
    const value = plan(), editor = editorHarness(value);
    const rendered = materialEditor(editor.render(), kind);
    control(rendered, label).props.onChange({target:{value:'https://example.org/new-student-page.pdf'}});
    assert.deepEqual(editor.draft.blocks[0][kind], {...value.blocks[0][kind], href:'https://example.org/new-student-page.pdf', studentSafe:false});
    const other = kind === 'activity' ? 'worksheet' : 'activity';
    assert.deepEqual(editor.draft.blocks[0][other], value.blocks[0][other]);
    assert.deepEqual(editor.draft.blocks[0].teacherReference, value.blocks[0].teacherReference);
    assert.equal(editor.draft.blocks[0].titleKo, value.blocks[0].titleKo);
    assert.equal(editor.draft.blocks[0].firstActionKo, value.blocks[0].firstActionKo);
    const updated = materialEditor(editor.render(), kind);
    const checkbox = elements(updated, node => node.type === 'input' && node.props.type === 'checkbox')[0];
    assert.equal(checkbox.props.checked, false);
    assert.equal(checkbox.props.disabled, false);
    checkbox.props.onChange({target:{checked:true}});
    assert.equal(editor.draft.blocks[0][kind].studentSafe, true);
  }
});

test('the teacher editor requires a labelled safe link before approval and lets a material be cleared', () => {
  const value = changeBlock({activity:material({href:'javascript:alert(1)', studentSafe:false})});
  const editor = editorHarness(value);
  const rendered = materialEditor(editor.render(), 'activity');
  const checkbox = elements(rendered, node => node.type === 'input' && node.props.type === 'checkbox')[0];
  assert.equal(checkbox.props.disabled, true);
  assert.equal(control(rendered, 'Chosen activity / material URL').props['aria-invalid'], true);
  const html = renderToStaticMarkup(rendered);
  assert.doesNotMatch(html, /href=/);
  assert.match(html, /No credentials, access tokens or temporary signed downloads/);
  const clear = elements(rendered, node => node.type === 'button' && textContent(node) === 'Clear activity')[0];
  assert.ok(clear);
  clear.props.onClick();
  assert.equal(editor.draft.blocks[0].activity, undefined);
  assert.deepEqual(editor.draft.blocks[0].worksheet, value.blocks[0].worksheet);
});

test('English edits clear only their paired Korean translation; other edits preserve manual translations', () => {
  for (const [label, english, korean, otherKorean] of [
    ['Activity title (English)', 'title', 'titleKo', 'firstActionKo'],
    ['First student action (English)', 'firstAction', 'firstActionKo', 'titleKo'],
  ]) {
    const value = plan(), editor = editorHarness(value);
    control(editor.render(), label).props.onChange({target:{value:'Updated English instruction'}});
    assert.equal(editor.draft.blocks[0][english], 'Updated English instruction');
    assert.equal(editor.draft.blocks[0][korean], undefined);
    assert.equal(editor.draft.blocks[0][otherKorean], value.blocks[0][otherKorean]);
    assert.deepEqual(editor.draft.blocks[0].activity, value.blocks[0].activity);
    assert.deepEqual(editor.draft.blocks[0].worksheet, value.blocks[0].worksheet);
  }
  const value = plan(), editor = editorHarness(value);
  control(editor.render(), 'When').props.onChange({target:{value:'10:00'}});
  assert.equal(editor.draft.blocks[0].titleKo, value.blocks[0].titleKo);
  assert.equal(editor.draft.blocks[0].firstActionKo, value.blocks[0].firstActionKo);
  control(editor.render(), 'Korean activity title').props.onChange({target:{value:'새로운 한국어 제목'}});
  assert.equal(editor.draft.blocks[0].titleKo, '새로운 한국어 제목');
  assert.equal(editor.draft.blocks[0].title, value.blocks[0].title);
  assert.deepEqual(store.parseDayPlan(editor.draft), editor.draft);
});

test('tentative status survives save and backup import, rejects unknown states and stays optional for old plans', t => {
  const storage = browser(t);
  const value = plan({status:'tentative'});
  assert.deepEqual(store.parseDayPlan(value), value);
  const records = store.saveDayPlan(value);
  const backup = JSON.parse(JSON.stringify(records));
  storage.data.clear();
  assert.deepEqual(store.importDayArchive(backup), backup);
  assert.deepEqual(store.dayPlanForDate(value.date), value);
  for (const status of ['', 'confirmed', 'published', 'TENTATIVE', null, true, {}, []]) {
    assert.equal(store.parseDayPlan(plan({status})), null, `invalid status: ${JSON.stringify(status)}`);
  }
  assert.equal(Object.hasOwn(store.parseDayPlan(plan()), 'status'), false);
  const nav = load('app/classroom-navigation-state.ts');
  for (const date of ['', '2020-10-01', '2030-10-01', '2040-10-01']) {
    assert.equal(nav.dayPlanStatus({status:'tentative', date}, '2030-10-01'), 'Tentative plan · review before teaching');
  }
  const {default:DayPlanPrint} = load('app/day-plan-print.tsx');
  assert.match(renderToStaticMarkup(React.createElement(DayPlanPrint, {plan:value})), /TENTATIVE: REVIEW BEFORE TEACHING/);
});

test('the tentative checkbox changes only plan status and can restore the legacy optional state', () => {
  const value = plan(), editor = editorHarness(value);
  const label = 'Tentative plan · review before teaching';
  assert.equal(control(editor.render(), label).props.checked, false);
  control(editor.render(), label).props.onChange({target:{checked:true}});
  assert.deepEqual(editor.draft, {...value, status:'tentative'});
  assert.equal(control(editor.render(), label).props.checked, true);
  control(editor.render(), label).props.onChange({target:{checked:false}});
  assert.deepEqual(store.parseDayPlan(editor.draft), value);
});

test('opening an explicit dated editor plan and another archived day preserves selection through projection and return', t => {
  const storage = browser(t), session = new Map(), listeners = new Map();
  const first = plan({id:'requested & dated day', date:'2030-10-01', title:'Requested material day', status:'tentative'});
  const second = plan({id:'second-selected-day', date:'2030-10-02', title:'Second available day'});
  store.saveDayPlan(first);
  store.saveDayPlan(second);
  const before = storage.data.get(store.DAY_ARCHIVE_KEY);
  window.location = {search:`?view=Day+Plans&plan=${encodeURIComponent(first.id)}`};
  window.sessionStorage = {getItem:key => session.get(key) ?? null, setItem:(key, value) => session.set(key, value)};
  window.addEventListener = (name, listener) => listeners.set(name, listener);
  window.removeEventListener = name => listeners.delete(name);
  window.history = {state:{}, replaceState(_state, _title, url) { window.location.search = url; }};
  const dispatched = [];
  window.dispatchEvent = event => {
    dispatched.push({name:event.type, route:window.location.search});
    listeners.get(event.type)?.(event);
    return true;
  };
  const nav = load('app/classroom-navigation-state.ts');
  nav.rememberDisplayedDay(second.id);
  assert.equal(nav.displayedDayPlan().id, first.id, 'explicit plan query outranks a remembered day');
  assert.equal(nav.editDayHref(), window.location.search);

  const navigation = navigationHarness({active:'Day Plans', routeKey:'unchanged-editor-route', projector:false});
  let shortcuts = navigation.mount();
  assert.equal(elements(shortcuts, node => node.type === 'a' && textContent(node) === 'Shape of the Day')[0].props.href, nav.shapeOfDayHref(first.id));
  assert.ok(listeners.has(nav.DISPLAYED_DAY_EVENT), 'the mounted navigation listens for selection changes');

  const editor = editorHarness(plan({id:'unselected-initial-draft'}));
  let tree = editor.mount();
  assert.deepEqual(editor.draft, first, 'mount opens the requested local plan, date, materials and tentative marker');
  assert.ok(listeners.has('beforeunload'));
  const firstChoice = elements(tree, node => node.type === 'button' && node.props.className === 'day-choice' && node.props['aria-pressed'])[0];
  assert.match(textContent(firstChoice), /2030-10-01 · Tentative/);
  const nextChoice = elements(tree, node => node.type === 'button' && node.props.className === 'day-choice' && textContent(node).includes(second.title))[0];
  assert.ok(nextChoice);
  nextChoice.props.onClick();
  tree = editor.render();
  assert.deepEqual(editor.draft, second);
  assert.equal(window.location.search, nav.editDayHref(second.id));
  assert.equal(nav.displayedDayPlan().id, second.id);
  assert.deepEqual(dispatched.at(-1), {name:nav.DISPLAYED_DAY_EVENT, route:nav.editDayHref(second.id)}, 'the selected query changes before listeners refresh');
  shortcuts = navigation.render();
  assert.equal(elements(shortcuts, node => node.type === 'a' && textContent(node) === 'Shape of the Day')[0].props.href, nav.shapeOfDayHref(second.id));
  assert.equal(elements(shortcuts, node => node.type === 'a' && textContent(node) === 'Saved day plans')[0].props.href, nav.editDayHref(second.id));
  const project = elements(tree, node => node.type === 'a' && textContent(node) === 'Project this day')[0];
  assert.equal(project.props.href, nav.shapeOfDayHref(second.id));
  project.props.onClick({preventDefault:() => assert.fail('a valid saved day should project')});
  window.location.search = project.props.href;
  assert.deepEqual(nav.displayedDayPlan(), second);
  window.location.search = elements(shortcuts, node => node.type === 'a' && textContent(node) === 'Activities')[0].props.href;
  assert.equal(nav.shapeOfDayHref(), project.props.href, 'the activity round trip keeps the same day');
  window.location.search = nav.editDayHref();
  assert.equal(window.location.search, nav.editDayHref(second.id));
  assert.equal(storage.data.get(store.DAY_ARCHIVE_KEY), before, 'navigation does not create revisions or change dates');
  editor.unmount();
  navigation.unmount();
  assert.equal(listeners.size, 0);
});

test('lightweight weekly snapshots share storage and preserve the latest reflection, original history and explicit daily materials', t => {
  browser(t);
  const storage = load('app/day-plan-storage.ts');
  const {archiveWeekPlan} = load('app/archive-week-plan.ts');
  for (const helper of ['saveDayPlan', 'readDayRevisions', 'parseDayPlan', 'parseDayArchive', 'importDayArchive']) {
    assert.equal(store[helper], storage[helper], `${helper} remains the same public store API`);
  }
  const week = {
    weekOf:'2030-10-07', title:'Synthetic weekly planning', weekNote:'Week preparation',
    blocks:[
      {day:'monday', title:'Monday practice', startTime:'9:00', timing:'', runSteps:['Compare 0.50 and 0.45.'], notes:'Record one reason.'},
      {day:'friday', title:'Friday review', startTime:'', timing:'After recess', runSteps:['Explain your strategy.'], notes:''},
    ],
  };
  archiveWeekPlan(week);
  const original = structuredClone(store.readDayRevisions());
  assert.equal(original.length, 2);
  assert.equal(store.dayPlanForDate('2030-10-11').blocks[0].time, 'After recess');
  const monday = store.dayPlanForDate('2030-10-07');
  store.saveDayPlan({...monday, reflection:'First reflection'});
  store.saveDayPlan({...monday, reflection:'Latest actual reflection'});
  const explicit = plan({id:'explicit-material-day', date:'2030-10-07'});
  store.saveDayPlan(explicit);
  const before = structuredClone(store.readDayRevisions());
  archiveWeekPlan({...week, title:'Revised week title'});
  const after = store.readDayRevisions();
  assert.deepEqual(after.slice(0, before.length), before, 'no preexisting revision is rewritten');
  assert.deepEqual(after.slice(0, original.length), original, 'the original weekly snapshots remain intact');
  assert.equal(after.filter(r => r.plan.id === monday.id).at(-1).plan.reflection, 'Latest actual reflection');
  assert.deepEqual(store.dayPlanForDate(explicit.date), explicit, 'explicit daily choices still take priority');
  archiveWeekPlan({...week, title:'Revised week title'});
  assert.deepEqual(store.readDayRevisions(), after, 'an identical repeated weekly save adds no revisions');
});

test('lightweight weekly snapshots cannot overwrite an unreadable local archive', t => {
  const storage = browser(t);
  const {archiveWeekPlan} = load('app/archive-week-plan.ts');
  const damaged = '{not readable';
  storage.data.set(store.DAY_ARCHIVE_KEY, damaged);
  assert.throws(() => archiveWeekPlan({weekOf:'2030-10-07', title:'Synthetic week', weekNote:'', blocks:[{day:'monday', title:'Practice', startTime:'9:00', timing:'', runSteps:[], notes:''}]}));
  assert.equal(storage.data.get(store.DAY_ARCHIVE_KEY), damaged);
  assert.equal(storage.writes, 0);
});

test('the weekly snapshot shortcut creates one explicit same-date day without losing the source, history or chosen metadata', t => {
  browser(t);
  const source = plan({id:'week-day-2030-10-07', date:'2030-10-07', status:'tentative'});
  store.saveDayPlan(source);
  const before = structuredClone(store.readDayRevisions());
  window.location = {search:`?view=Day+Plans&plan=${source.id}`};
  window.history = {state:{}, replaceState(_state, _title, url) { window.location.search = url; }};
  window.addEventListener = () => {};
  window.removeEventListener = () => {};
  const editor = editorHarness(source);
  let tree = editor.mount();
  assert.equal(control(tree, 'New teaching date').props.value, source.date, 'the snapshot teaching date is the copy default');
  const descendants = elements(tree, () => true);
  const warningIndex = descendants.findIndex(node => node.type === 'p' && textContent(node).startsWith('This is an automatic weekly snapshot.'));
  const firstEditorField = descendants.findIndex(node => node.type === 'label' && textContent(node) === 'Tentative plan · review before teaching');
  assert.ok(warningIndex >= 0 && warningIndex < firstEditorField, 'the replacement warning precedes editable fields');
  const copy = elements(tree, node => node.type === 'button' && textContent(node) === 'Make dated copy / open existing day')[0];
  assert.ok(copy);
  copy.props.onClick();
  tree = editor.render();
  const created = structuredClone(editor.draft);
  assert.match(created.id, /^day-2030-10-07-/);
  assert.equal(created.date, source.date);
  assert.equal(created.status, source.status);
  assert.deepEqual(created.blocks, source.blocks, 'selected activity, worksheet, teacher reference, Korean and first actions survive');
  assert.deepEqual(created.backups, source.backups);
  assert.deepEqual(store.readDayRevisions().slice(0, before.length), before);
  assert.equal(store.readDayRevisions().length, before.length + 1);
  assert.deepEqual(store.listDayPlans().find(value => value.id === source.id), source);
  assert.deepEqual(store.dayPlanForDate(source.date), created);
  assert.equal(window.location.search, `?view=Day+Plans&plan=${encodeURIComponent(created.id)}`);
  assert.equal(elements(tree, node => node.type === 'button' && textContent(node) === 'Make dated copy / open existing day').length, 0, 'the explicit copy no longer shows the snapshot warning');
  editor.unmount();
});

test('the weekly snapshot shortcut opens an existing explicit day instead of creating or overwriting one', t => {
  const storage = browser(t);
  const source = plan({id:'week-day-2030-10-07', date:'2030-10-07', title:'Weekly source'});
  const existing = changeBlock({firstActionKo:'이미 준비된 활동을 시작하세요.', worksheet:material({label:'Chosen existing sheet', href:'./worksheets/existing.pdf'})});
  Object.assign(existing, {id:'already-prepared-day', date:source.date, title:'Existing explicit day'});
  store.saveDayPlan(source);
  store.saveDayPlan(existing);
  const before = storage.data.get(store.DAY_ARCHIVE_KEY), writes = storage.writes;
  window.location = {search:`?view=Day+Plans&plan=${source.id}`};
  window.history = {state:{}, replaceState(_state, _title, url) { window.location.search = url; }};
  window.addEventListener = () => {};
  window.removeEventListener = () => {};
  const editor = editorHarness(source);
  const tree = editor.mount();
  const open = elements(tree, node => node.type === 'button' && textContent(node) === 'Make dated copy / open existing day')[0];
  assert.ok(open);
  open.props.onClick();
  assert.deepEqual(editor.draft, existing);
  assert.equal(window.location.search, `?view=Day+Plans&plan=${existing.id}`);
  assert.equal(storage.data.get(store.DAY_ARCHIVE_KEY), before);
  assert.equal(storage.writes, writes);
  assert.deepEqual(store.dayPlanForDate(source.date), existing);
  editor.unmount();
});
