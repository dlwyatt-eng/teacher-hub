import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {moduleLoader} from './helpers/load-rendered-module.mjs';

const props = {
 title:'Sample lesson', duration:'30 minutes', learningQuestion:'What changed?', firstAction:'Observe.',
 steps:[{title:'Notice',action:'Observe the model',finishCheck:'Name a change',minutes:'5 min'}, {title:'Try',action:'Try another example',finishCheck:'Explain the result',minutes:'10 min'}],
 finishEvidence:['An explanation'], saveTarget:{kind:'in-class',label:'In class',message:'Keep the work'},
 discussionMoves:[],misconception:{idea:'A guess',respond:'Look for evidence'},accessibility:[],
 routes:{projector:'Show the model',sharedDevice:'Work together',offline:'Draw the model on paper'},
 prepare:['Set out the model'], materials:['Paper','Pencil'],
 dayPlanLesson:{sourceId:'sample',subject:'Science',title:'Sample lesson'},
};
function nodes(node, predicate) {
 if (!node || typeof node !== 'object') return [];
 const children = React.Children.toArray(node.props?.children);
 return [...(predicate(node) ? [node] : []), ...children.flatMap(child=>nodes(child,predicate))];
}
function harness() {
 const states=[]; let cursor=0;
 const mockReact={...React,useId:()=> 'test-id',useState: initial=>{
  const index=cursor++; if (!(index in states)) states[index]=initial;
  return [states[index],value=> { states[index]=typeof value==='function'?value(states[index]):value; }];
 }};
 const load=moduleLoader(process.cwd(),{react:mockReact});
 const {TeacherRunSheet}=load('app/teacher-run-sheet.tsx');
 return {load, states, wrapper:TeacherRunSheet, render(p=props){cursor=0;const el=TeacherRunSheet(p);return el.type(el.props);}};
}

test('focus switch is optional, repeatable and retains full route in print source',()=>{
 const h=harness(); let tree=h.render();
 assert.equal(tree.props['data-focus-mode'],false);
 const switchTo = label => { const button=nodes(tree,n=>n.type==='button'&&n.props.children===label)[0];button.props.onClick();tree=h.render(); };
 switchTo('Focus · one move');switchTo('Focus · one move');
 assert.equal(tree.props['data-focus-mode'],true);
 let route=nodes(tree,n=>n.type==='ol'&&n.props['aria-label']==='Lesson route')[0];
 assert.equal(React.Children.count(route.props.children),2);
 const html=renderToStaticMarkup(tree);
 for(const text of ['Observe the model.','Try another example.','Name a change.','Explain the result.','Set out the model.','Paper · Pencil','Draw the model on paper','mode=student','Print / PDF']) assert.ok(html.includes(text),text);
 switchTo('All moves');switchTo('All moves');
 assert.equal(tree.props['data-focus-mode'],false);
 assert.equal(nodes(tree,n=>n.type?.name==='TeacherFocusMove').length,0);
});

test('previous/next are bounded under repeated queued actions, including one/empty move',()=>{
 const h=harness();const {TeacherFocusMove,boundedMove}=h.load('app/teacher-focus-move.tsx');
 const route=[{label:'A',minutes:'5 min',action:'Act A',doneWhen:'Check A'},{label:'B',minutes:'5 min',action:'Act B',doneWhen:'Check B'}];
 let index=0; const render=()=>TeacherFocusMove({route,activeMove:index,onMove:fn=>index=fn(index),offline:'Use paper'});
 let tree=render();const buttons=nodes(tree,n=>n.type==='button');
 assert.equal(buttons[0].props.disabled,true);
 for(let i=0;i<10;i++) buttons[1].props.onClick();
 assert.equal(index,1);tree=render();assert.equal(nodes(tree,n=>n.type==='button')[1].props.disabled,true);
 assert.match(renderToStaticMarkup(tree),/Check B/);assert.doesNotMatch(renderToStaticMarkup(tree),/Check A/);
 for(let i=0;i<10;i++) buttons[0].props.onClick(); assert.equal(index,0);
 const single=TeacherFocusMove({route:route.slice(0,1),activeMove:10,onMove:()=>{},offline:'Paper'});
 assert.ok(nodes(single,n=>n.type==='button').every(b=>b.props.disabled));
 assert.equal(TeacherFocusMove({route:[],activeMove:0,onMove:()=>{},offline:'Paper'}),null);
 assert.equal(boundedMove(-10,2),0);assert.equal(boundedMove(100,2),1);
});

test('lesson identity resets focus and move state, same lesson rerenders do not',()=>{
 const h=harness();const initial=h.wrapper(props);
 assert.equal(initial.key,h.wrapper({...props,steps:props.steps.map(s=>({...s}))}).key);
 for(const change of [{title:'Other'},{dayPlanLesson:{...props.dayPlanLesson,sourceId:'other'}},{steps:props.steps.slice(0,1)},{learningQuestion:'Another question'}]) assert.notEqual(initial.key,h.wrapper({...props,...change}).key);
 // The keyed lesson component owns both transient states; changing this key remounts it.
 const tree=h.render();assert.equal(tree.props['data-focus-mode'],false);assert.deepEqual(h.states,[false,0]);
});

test('empty lesson route uses existing first action and finish evidence; print remains scoped',()=>{
 const h=harness();const tree=h.render({...props,steps:[]});
 const route=nodes(tree,n=>n.type==='ol'&&n.props['aria-label']==='Lesson route')[0];
 assert.equal(React.Children.count(route.props.children),1);
 assert.match(renderToStaticMarkup(route),/Observe\./);assert.match(renderToStaticMarkup(route),/An explanation\./);
 const css=readFileSync('app/teacher-run-sheet.css','utf8');
 assert.match(css,/@media screen\{\s*\.teacher-run-sheet\[data-focus-mode="true"\]>\.teacher-run-sheet__route\{display:none\}/);
 assert.match(css,/@media print\{\s*\.teacher-run-sheet__view-switch,\.teacher-focus-move\{display:none!important\}\s*\.teacher-run-sheet\[data-focus-mode="true"\]>\.teacher-run-sheet__route\{display:grid!important\}/);
 const source=readFileSync('app/teacher-run-sheet.tsx','utf8');
 assert.match(source,/printClosest\(event.currentTarget, "\.teacher-run-sheet"\)/);
 assert.match(source,/prefers-reduced-motion: reduce/);
});

test('optional support actions work repeatedly in Focus with reduced motion',()=>{
 const h=harness(); let tree=h.render();
 nodes(tree,n=>n.type==='button'&&n.props.children==='Focus · one move')[0].props.onClick();tree=h.render();
 const action=nodes(tree,n=>n.type==='button'&&n.props.children==='Optional SchoolAI ↓')[0];
 const scrolls=[];let focuses=0;
 const panel={scrollIntoView: options=>scrolls.push(options),querySelector:()=>({focus:()=>focuses++})};
 const event={currentTarget:{closest:()=>({querySelector:()=>panel})}};
 const previous=globalThis.window;
 try {
  globalThis.window={matchMedia:()=>({matches:true})};
  action.props.onClick(event);action.props.onClick(event);
  assert.equal(focuses,2);assert.deepEqual(scrolls,[{block:'center',behavior:'auto'},{block:'center',behavior:'auto'}]);
  action.props.onClick({currentTarget:{closest:()=>null}});
 } finally { if(previous===undefined)delete globalThis.window;else globalThis.window=previous; }
});

test('focus does not advertise a missing student-screen link',()=>{
 const h=harness();let tree=h.render({...props,dayPlanLesson:undefined});
 nodes(tree,n=>n.type==='button'&&n.props.children==='Focus · one move')[0].props.onClick();
 tree=h.render({...props,dayPlanLesson:undefined});
 const html=renderToStaticMarkup(tree);
 assert.doesNotMatch(html,/Open student screens/);
 assert.match(html,/Print \/ PDF/);
});
