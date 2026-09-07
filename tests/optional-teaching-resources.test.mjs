import assert from "node:assert/strict";
import test from "node:test";
import path from "node:path";
import {readFileSync} from "node:fs";
import React from "react";
import {renderToStaticMarkup} from "react-dom/server";
import {moduleLoader} from "./helpers/load-rendered-module.mjs";
const root=path.resolve(import.meta.dirname,"..");
const load=moduleLoader(root);
const {infographicResources,infographicTitles,OptionalTeachingResources}=load("app/optional-teaching-resources.tsx");
const html=node=>renderToStaticMarkup(node);

test("every existing infographic has an independently selectable resource",()=>{
  const source=readFileSync(path.join(root,"app/infographic-library.tsx"),"utf8");
  for(const [,id] of source.matchAll(/experienceId === "([^"]+)"/g)){
    assert.ok(infographicTitles[id],id);
    const resources=infographicResources(id);
    assert.ok(html(resources[0].content).includes("lesson-infographic"),id);
  }
  assert.equal(infographicResources("graph-story-lab").length,2);
});
test("tour lessons retain infographic choices and resources start closed",()=>{
  for(const id of ["precision-poetry","career-constellation"]){
    const output=html(React.createElement(OptionalTeachingResources,{lessonId:id}));
    assert.match(output,/Infographic/);
    assert.match(output,/Videos &amp; virtual visits/);
    assert.doesNotMatch(output,/<details open|<iframe|lesson-infographic/);
  }
  const output=html(React.createElement(OptionalTeachingResources,{lessonId:"edit-room"}));
  assert.match(output,/Same facts, different edit/);
});
test("new diagrams render concrete models and discussion checks",()=>{
  for(const id of ["power-in-the-room","supply-chain-shockwave","signal-case","mixture-toolkit","force-patterns-lab","fraction-ratio-remix"]){
    const resource=infographicResources(id).at(-1);
    assert.match(html(resource.content),/Talk about it/);
    assert.match(html(resource.content),/diagram-limit/);
  }
  const ratio=html(infographicResources("fraction-ratio-remix")[0].content);
  assert.match(ratio,/2 : 3 = 4 : 6 = 6 : 9/);
});
test("teacher and projector renderers both expose the chooser",()=>{
  for(const file of ["learning-program.tsx","inquiry-experience.tsx","social-studies-program.tsx"]){
    const source=readFileSync(path.join(root,"app",file),"utf8");
    assert.equal((source.match(/<OptionalTeachingResources /g)||[]).length,2,file);
  }
});
