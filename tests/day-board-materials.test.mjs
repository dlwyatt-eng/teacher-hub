import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {moduleLoader} from './helpers/load-rendered-module.mjs';

const load=moduleLoader(process.cwd());
const {default:DayPlanMorning,DayBlockDetails}=load('app/day-plan-morning.tsx');
const plan={
  id:'day-material-test',date:'',title:'Material test',greeting:'Welcome to our day',arrival:'Read the first step.',
  note:'PRIVATE PLAN NOTE',reflection:'PRIVATE REFLECTION',backups:['PRIVATE BACKUP'],
  blocks:[{
    time:'9:00',title:'Build equivalent fractions',titleKo:'동치분수 만들기',
    firstAction:'Fold one paper strip into four equal parts.',firstActionKo:'종이 띠 한 장을 똑같은 네 부분으로 접으세요.',
    studentSteps:['Shade two parts.','Compare your strip with a partner.'],
    notes:'PRIVATE BLOCK NOTES',href:'?subject=Mathematics&mode=student',
    activity:{label:'Fraction strips',href:'./activities/fraction-strips.html',studentSafe:true},
    worksheet:{label:'Fraction practice sheet',href:'./worksheets/fraction-practice.pdf',studentSafe:true},
    teacherReference:{href:'https://example.com/private-teacher-guide',notes:'PRIVATE TEACHER REFERENCE'},
  }],
};
const renderBoard=(value=plan,props={})=>renderToStaticMarkup(React.createElement(DayPlanMorning,{plan:value,...props}));
const renderDetails=(block=plan.blocks[0],props={})=>renderToStaticMarkup(React.createElement(DayBlockDetails,{block,...props}));
function expectStudentLinks(html,details=false){
  assert.match(html,/href="\.\/activities\/fraction-strips\.html"/);
  assert.match(html,/Open activity/);
  assert.match(html,/Fraction strips/);
  assert.match(html,/href="\.\/worksheets\/fraction-practice\.pdf" target="_blank" rel="noopener noreferrer"/);
  assert.match(html,/Open worksheet to print/);
  assert.match(html,/Fraction practice sheet/);
  if(details){assert.match(html,/Full lesson \/ reference/);assert.match(html,/href="\?subject=Mathematics&amp;mode=student"/);}
  assert.doesNotMatch(html,/PRIVATE|private-teacher-guide/);
}

test('student board and real dialog details show chosen materials separately from full lesson links',()=>{
  const board=renderBoard(),details=renderDetails();
  expectStudentLinks(board);expectStudentLinks(details,true);
  assert.match(board,/aria-haspopup="dialog"/);
  assert.match(board,/What to do/);
  assert.doesNotMatch(board,/Fold one paper strip into four equal parts|Full lesson \/ reference/);
  assert.match(details,/Fold one paper strip into four equal parts/);
  assert.match(details,/Shade two parts/);
  assert.match(details,/Compare your strip with a partner/);
  assert.match(board,/Learn chess/);assert.match(board,/Learn cribbage/);
});

test('unreviewed and unsafe links are absent from student board and dialog markup',()=>{
  for(const block of [
    {...plan.blocks[0],activity:{...plan.blocks[0].activity,studentSafe:false},worksheet:{...plan.blocks[0].worksheet,studentSafe:false}},
    {...plan.blocks[0],activity:{...plan.blocks[0].activity,href:'javascript:alert(1)'},worksheet:{...plan.blocks[0].worksheet,href:'https://example.com/sheet.pdf?token=secret'}},
  ]){
    for(const html of [renderBoard({...plan,blocks:[block]}),renderDetails(block)]){
      assert.doesNotMatch(html,/Fraction strips|Fraction practice sheet|javascript:|token=secret|PRIVATE|private-teacher-guide/);
      assert.ok(html.includes("Full lesson / reference")||html.includes("Shape of our day"));
    }
  }
  const badReference={...plan.blocks[0],href:'javascript:alert(1)'};
  assert.doesNotMatch(renderBoard({...plan,blocks:[badReference]})+renderDetails(badReference),/javascript:|Full lesson \/ reference/);
});

test('Korean is opt-in and keeps English title and first action in both production renderers',()=>{
  const english=renderBoard();
  assert.match(english,/aria-pressed="false"/);
  assert.match(english,/English \+/);
  assert.match(english,/<span lang="ko">한국어<\/span>/);
  assert.doesNotMatch(english,/동치분수 만들기|종이 띠 한 장/);
  for(const html of [renderBoard(plan,{initialKoreanSupport:true}),renderDetails(plan.blocks[0],{koreanSupport:true})]){
    assert.match(html,/Build equivalent fractions/);
    assert.match(html,/lang="ko">동치분수 만들기/);
    if(html.includes('id="day-step-title"')){assert.match(html,/lang="en">Fold one paper strip into four equal parts/);assert.match(html,/lang="ko">종이 띠 한 장/);}
  }
  assert.match(renderBoard(plan,{initialKoreanSupport:true}),/aria-pressed="true"/);
  assert.doesNotMatch(renderDetails(),/동치분수 만들기|종이 띠 한 장/);
});

test('older plans keep the optional full lesson route without an invented worksheet',()=>{
  const legacy={time:'10:00',title:'Reading',notes:'PRIVATE LEGACY NOTES',href:'?subject=English+Language+Arts&mode=student'};
  const html=renderBoard({...plan,blocks:[legacy]});
  assert.match(html,/href="\?subject=English\+Language\+Arts&amp;mode=student"/);
  assert.doesNotMatch(html,/Open worksheet to print|Open activity|PRIVATE/);
});

// Exercise the production event handlers and effects without a browser adapter.
// Content components above are rendered with real React; this harness controls only hooks and a dialog ref.
function interactiveBoard(initialPlan,storage){
  const slots=[],dependencies=[];let cursor=0,pending=[],props={plan:initialPlan},tree;
  const dialog={open:false,shows:0,closes:0,showModal(){this.open=true;this.shows++;},close(){this.open=false;this.closes++;}};
  const hooks={
    useState(initial){const i=cursor++;if(!(i in slots))slots[i]=typeof initial==='function'?initial():initial;return [slots[i],value=>{slots[i]=typeof value==='function'?value(slots[i]):value;}];},
    useRef(){const i=cursor++;return slots[i]??(slots[i]={current:dialog});},
    useEffect(effect,deps){const i=cursor++;if(!dependencies[i]||deps.some((dep,j)=>!Object.is(dep,dependencies[i][j]))){dependencies[i]=deps;pending.push(effect);}},
  };
  const component=moduleLoader(process.cwd(),{react:hooks})('app/day-plan-morning.tsx').default;
  const render=(nextProps=props,flush=true)=>{props=nextProps;cursor=0;pending=[];tree=component(props);if(flush){const effects=pending;pending=[];for(const effect of effects)effect();}return tree;};
  function walk(predicate,node){
    if(Array.isArray(node)){for(const child of node){const match=walk(predicate,child);if(match)return match;}}
    else if(React.isValidElement(node)){if(predicate(node))return node;return walk(predicate,node.props.children);}
    return null;
  }
  globalThis.window={localStorage:storage};
  render();
  return {render,find:predicate=>walk(predicate,tree),dialog};
}
const buttonByClass=name=>node=>node.type==='button'&&node.props.className===name;

test('Korean toggle survives device reload and still works when storage is blocked',()=>{
  const values=new Map();const storage={getItem:key=>values.get(key)??null,setItem:(key,value)=>values.set(key,value)};
  try{
    const first=interactiveBoard(plan,storage);
    assert.equal(first.find(buttonByClass('day-language-toggle')).props['aria-pressed'],false);
    first.find(buttonByClass('day-language-toggle')).props.onClick();first.render();
    assert.equal(first.find(buttonByClass('day-language-toggle')).props['aria-pressed'],true);
    assert.equal([...values.values()][0],'true');
    const reloaded=interactiveBoard(plan,storage);reloaded.render();
    assert.equal(reloaded.find(buttonByClass('day-language-toggle')).props['aria-pressed'],true);
    reloaded.find(buttonByClass('day-language-toggle')).props.onClick();reloaded.render();
    assert.equal(reloaded.find(buttonByClass('day-language-toggle')).props['aria-pressed'],false);
    assert.equal([...values.values()][0],'false');
    const blocked=interactiveBoard(plan,{getItem(){throw new Error('Blocked');},setItem(){throw new Error('Blocked');}});
    assert.doesNotThrow(()=>blocked.find(buttonByClass('day-language-toggle')).props.onClick());blocked.render();
    assert.equal(blocked.find(buttonByClass('day-language-toggle')).props['aria-pressed'],true);
  }finally{delete globalThis.window;}
});

test('changing day plan removes and closes focused details, and closing allows reopening',()=>{
  try{
    const board=interactiveBoard(plan,{getItem:()=>null,setItem:()=>{}});
    board.find(buttonByClass('day-block-title')).props.onClick();board.render();
    assert.equal(board.dialog.open,true);
    assert.equal(board.find(node=>typeof node.type==='function'&&node.type.name==='DayBlockDetails').props.block,plan.blocks[0]);
    const closesBeforeRefresh=board.dialog.closes;
    board.render({plan:structuredClone(plan)});
    assert.equal(board.dialog.open,true,'An unchanged device-local refresh must not dismiss teaching');
    assert.equal(board.dialog.closes,closesBeforeRefresh);
    const next={...plan,id:'another-day',blocks:[{...plan.blocks[0],title:'New lesson'}]};
    board.render({plan:next},false);
    assert.equal(board.find(node=>typeof node.type==='function'&&node.type.name==='DayBlockDetails'),null,'No previous details even before the close effect runs');
    // Rerender the original then change normally, so the changed-plan effect is actually flushed.
    board.render({plan});board.render({plan:next});board.render();
    assert.equal(board.dialog.open,false);
    assert.equal(board.find(node=>typeof node.type==='function'&&node.type.name==='DayBlockDetails'),null);
    board.find(buttonByClass('day-block-title')).props.onClick();board.render();
    assert.equal(board.dialog.open,true);
    board.find(buttonByClass('day-step-close')).props.onClick();
    board.find(node=>node.type==='dialog').props.onClose();board.render();
    assert.equal(board.dialog.open,false);
    board.find(buttonByClass('day-block-title')).props.onClick();board.render();
    assert.equal(board.dialog.open,true);
    assert.equal(board.find(node=>typeof node.type==='function'&&node.type.name==='DayBlockDetails').props.block.title,'New lesson');
  }finally{delete globalThis.window;}
});
