import assert from 'node:assert/strict';
import test from 'node:test';
import path from 'node:path';
import {readFileSync} from 'node:fs';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {moduleLoader} from './helpers/load-rendered-module.mjs';

const root = path.resolve(import.meta.dirname, '..');
const load = moduleLoader(root);
const {mathAnticsRoutes} = load('app/math-antics-routes.ts');
const {firstTermMediaPlans, mediaViewingPlansFor} = load('app/first-term-media-preparation.ts');
const {TeacherMediaPreparation} = load('app/teacher-media-preparation.tsx');
const {TeacherRunSheet} = load('app/teacher-run-sheet.tsx');
const {StudentTeacherLayer} = load('app/student-teacher-layer.tsx');
const {LocalIndigenousResourceDock} = load('app/infographic-library.tsx');
const {experienceMedia} = load('app/program-supports.ts');
const {ExplorationPlayer} = load('app/exploration-player.tsx');
const register = JSON.parse(readFileSync(path.join(root, 'content/virtual-explorations.json'), 'utf8'));
const render = (Component, props) => renderToStaticMarkup(React.createElement(Component, props));
const firstTermMath = ['magnitude-gallery','strategy-league','pack-and-sync','scoreboard-rules','fraction-ratio-remix','decimal-dispatch','sale-lab'];

// These tests prove integration and boundaries, not media playback or suitability.
test('each first-term primary and secondary has its own bounded viewing plan', () => {
  const urls = firstTermMath.flatMap(id => [mathAnticsRoutes[id].url, mathAnticsRoutes[id].secondary?.url]).filter(Boolean);
  assert.equal(new Set(urls).size, 12);
  for (const url of urls) {
    const plan = firstTermMediaPlans[url];
    assert.ok(plan, url);
    assert.match(plan.timing, /up to 3 minutes.*not a verified excerpt.*start and stop/);
    assert.match(plan.access, /No student account/);
    assert.match(plan.verification, /not.*verified|not a playback pass/i);
  }
  assert.match(firstTermMediaPlans[mathAnticsRoutes['magnitude-gallery'].secondary.url].pause, /endpoints and equal intervals/);
  assert.match(firstTermMediaPlans[mathAnticsRoutes['strategy-league'].secondary.url].pause, /quotient digit/);
  assert.match(firstTermMediaPlans[mathAnticsRoutes['pack-and-sync'].secondary.url].bridge, /final prime factors/);
  assert.match(firstTermMediaPlans[mathAnticsRoutes['sale-lab'].secondary.url].before, /whole/);
  assert.equal(firstTermMediaPlans[mathAnticsRoutes['pattern-forecast'].url], undefined, 'Do not silently certify later resources');
});

test('opening renders both plans and separates observed metadata from playback', () => {
  const resource = mathAnticsRoutes['magnitude-gallery'];
  const html = render(TeacherMediaPreparation, {urls: [resource.url, resource.secondary.url]});
  assert.equal((html.match(/class="teacher-media-preparation__plan"/g) ?? []).length, 2);
  assert.match(html, /0:00 of 11:50/);
  assert.match(html, /not a playback pass/);
  assert.match(html, /KG6ILNOiMgM/);
  assert.match(html, /Before viewing/);
  assert.match(html, /Without this media/);
  assert.doesNotMatch(html, /<iframe|<video|<form|<input/);
  assert.match(html, /Viewing questions, access checks and fallbacks/);
  assert.equal(mediaViewingPlansFor([resource.url, resource.url, undefined]).length, 1);
  assert.equal(render(TeacherMediaPreparation, {urls: ['https://example.invalid/']}), '');
});

test('actual teacher run sheet includes primary and secondary preparation', () => {
  const html = render(TeacherRunSheet, {
    title: 'Magnitude Gallery', duration: '55 min', learningQuestion: 'Where is 0.008?', firstAction: 'Read the endpoints.',
    steps: [{title:'Model',action:'Count equal intervals.',finishCheck:'Explain one interval.'}], finishEvidence:['A labelled line'],
    saveTarget:{kind:'in-class',label:'In class',message:'Keep the line.'}, discussionMoves:[],
    misconception:{idea:'Every interval is one.',respond:'Read the endpoints.'}, accessibility:[],
    routes:{projector:'Shared model',sharedDevice:'One screen',offline:'Supplied paper lines'},
    launchResource:mathAnticsRoutes['magnitude-gallery'],
  });
  assert.match(html, /Decimal Place Value/);
  assert.match(html, /The Number Line/);
  assert.equal((html.match(/class="teacher-media-preparation__plan"/g) ?? []).length, 2);
});

test('closed teacher overlay does not place the preparation in student markup', () => {
  const html = render(StudentTeacherLayer, {bigIdea:'Place value',coreCompetencies:[],say:'Count intervals.',ask:'What is one interval?',watchFor:'Scale reading',ifStuck:'Model',nextMove:'Try',teacherResource:mathAnticsRoutes['magnitude-gallery']});
  assert.doesNotMatch(html, /teacher-media-preparation|11:50|KG6ILNOiMgM/);
});

test('first-term NAC destinations expose selection and registration limitations', () => {
  const urls = ['four-arts-languages','same-facts-frame'].flatMap(id => experienceMedia[id].filter(item => item.type === 'video').map(item => item.url));
  const plans = mediaViewingPlansFor(urls);
  assert.equal(plans.length, 5);
  const html = render(TeacherMediaPreparation, {urls});
  assert.match(html, /schools to register/);
  assert.match(html, /No episode or exact start\/stop has been selected/);
  assert.match(html, /Module, not a selected clip/);
  assert.match(html, /not Carnatic music instruction/);
  assert.match(html, /retrieval limitation, not a broken-link finding/);
});

test('district dock shows clean-film password gate but does not expose credentials', () => {
  const teacher = render(LocalIndigenousResourceDock, {experienceId:'four-arts-languages'});
  const student = render(LocalIndigenousResourceDock, {experienceId:'four-arts-languages',student:true});
  assert.match(teacher, /SD36 clean film/);
  assert.match(teacher, /8:45/);
  assert.match(teacher, /teacher-held password/);
  assert.match(teacher, /not equivalent cultural evidence/);
  assert.doesNotMatch(teacher, /<input|type="password"|<iframe|<video/);
  assert.match(student, /teacher needs the SD36 password/);
  assert.doesNotMatch(student, /teacher-media-preparation|Evidence \/ preview status/);
  const story = render(LocalIndigenousResourceDock, {experienceId:'semiahmoo-story-source-lab'});
  assert.match(story, /First listening is uninterrupted/);
  assert.match(story, /does not count as First Peoples oral-tradition evidence/);
  const language = render(LocalIndigenousResourceDock, {experienceId:'place-soundwalk'});
  assert.match(language, /Do not invent pronunciation/);
});

test('City Hall asks a civic prequestion before media while preserving direct-access evidence', () => {
  const tour = register.trips.find(item => item.id === 'surrey-city-hall');
  const html = render(ExplorationPlayer, {tour,audience:'student',initiallyOpen:true});
  assert.match(html, /Before viewing, ask: Who decides, who carries out the work, and who needs to be heard/);
  assert.match(tour.teacher.verification, /Daryl confirmed direct video access/);
  assert.equal(tour.youtubeId, 'yd8Ls6mLTW0');
  assert.doesNotMatch(html, /<iframe|<video/);
});

test('all existing teacher entry points use shared plans without nesting preparation in links', () => {
  const teacher = readFileSync(path.join(root,'app/teacher-run-sheet.tsx'),'utf8');
  const overlay = readFileSync(path.join(root,'app/student-teacher-layer.tsx'),'utf8');
  const learning = readFileSync(path.join(root,'app/learning-program.tsx'),'utf8');
  assert.match(teacher, /urls=\{\[launchResource.url, launchResource.secondary\?\.url\]\}/);
  assert.match(overlay, /urls=\{\[teacherResource.url, teacherResource.secondary\?\.url\]\}/);
  assert.match(learning, /!student && <TeacherMediaPreparation urls=\{routes.map/);
  assert.match(learning, /urls=\{\[mathAntics.url, mathAntics.secondary\?\.url\]\}/);
});
