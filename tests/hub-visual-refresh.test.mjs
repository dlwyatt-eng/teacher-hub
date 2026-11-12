import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, statSync} from 'node:fs';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {moduleLoader} from './helpers/load-rendered-module.mjs';

// Only the image adapter is replaced. Render the real new entrance components.
const load = moduleLoader(process.cwd(), {'next/image': ({unoptimized, priority, sizes, ...props}) => React.createElement('img', props)});
const {HubWelcome, HubInquiryInvitation} = load('app/hub-welcome.tsx');

test('welcome uses real artwork and does not create a parallel classroom state or invented daily plan', () => {
  const html = renderToStaticMarkup(React.createElement(HubWelcome));
  assert.match(html, /Make room<br\/>for wonder/);
  assert.match(html, /An imagined school courtyard/);
  assert.match(html, /Start with your day below/);
  assert.doesNotMatch(html, /<input|<button|<select|2026-\d|<iframe/);
  assert.ok(statSync('public/design/classroom-landscape.webp').size > 10000);
});

test('inquiry invitation uses the existing activity address and broad curriculum framing', () => {
  const html = renderToStaticMarkup(React.createElement(HubInquiryInvitation));
  assert.match(html, /href="activities\/better-world-journey.html"/);
  assert.match(html, /GLOBAL ISSUES &amp; GOVERNANCE/);
  assert.match(html, /How do choices in different places shape people/);
  assert.match(html, /An imagined landscape/);
  assert.ok(statSync('public/design/inquiry-landscape.webp').size > 10000);
});

test('home retains the existing classroom launch before subjects and the optional inquiry invitation', () => {
  const source = readFileSync('app/page.tsx', 'utf8').split('function Dashboard(')[1].split('function StudentHome(')[0];
  assert.ok(source.indexOf('<ClassroomLaunch />') < source.indexOf('className="subjects-section"'));
  assert.ok(source.indexOf('className="subjects-section"') < source.indexOf('<HubInquiryInvitation />'));
  for (const text of ['<TeacherHomeOperations','<TeacherDailyLaunchManager','onClick={() => onSubject(subject)}','<OpeningWeekCockpit','STUDENT_FAMILY_SITE_URL']) assert.ok(source.includes(text), text);
});

test('new visual components have no storage, transmission, or date ownership', () => {
  const source = readFileSync('app/hub-welcome.tsx', 'utf8');
  assert.doesNotMatch(source, /localStorage|sessionStorage|fetch\(|XMLHttpRequest|setItem|new Date|writeClassroomLocation/);
  const css = readFileSync('app/hub-visual-theme.css', 'utf8');
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /forced-colors/);
  assert.match(css, /@media \(max-width: 520px\)/);
  assert.match(css, /grid-template-columns: 44px minmax\(0, 1fr\)/);
  assert.match(css, /flex-wrap: wrap; justify-content: flex-start/);
  assert.match(css, /@media print/);
  assert.match(css, /large-text-mode/);
  for (const selector of ['.hub-welcome .section-kicker', '.hub-inquiry-invitation .section-kicker', '.hub-welcome-art figcaption']) assert.ok(css.includes('.hub-visual-theme.large-text-mode ' + selector));
});
