'use strict';
(() => {
  const launch = document.getElementById('begin');
  const scenes = Array.from(launch.querySelectorAll('.launch-scene'));
  const navigation = launch.querySelector('.launch-navigation');
  const back = document.getElementById('launch-back');
  const next = document.getElementById('launch-next');
  const progress = document.getElementById('launch-progress');
  const project = document.getElementById('launch-project');
  const jump = document.getElementById('launch-jump');
  const sceneButtons = Array.from(jump?.querySelectorAll('button') || []);
  const shortcuts = document.getElementById('launch-shortcuts');
  let current = 0;
  function show(index, focus = true) {
    const destination = Math.max(0, Math.min(scenes.length - 1, index));
    if (destination !== current) {
      scenes.forEach(scene => scene.querySelectorAll('.launch-model').forEach(model => { model.open = false; }));
    }
    current = destination;
    scenes.forEach((scene, i) => { scene.hidden = i !== current; });
    sceneButtons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === current)));
    back.disabled = current === 0;
    next.disabled = current === scenes.length - 1;
    progress.textContent = `Scene ${current + 1} of ${scenes.length}`;
    if (focus) scenes[current].querySelector('h2').focus();
  }
  sceneButtons.forEach((button, i) => button.addEventListener('click', () => show(i)));
  back.addEventListener('click', () => show(current - 1));
  next.addEventListener('click', () => show(current + 1));
  project.addEventListener('click', () => {
    const on = document.body.classList.toggle('launch-projecting');
    project.setAttribute('aria-pressed', String(on));
    project.textContent = on ? 'Exit projection' : 'Project this lesson';
    if (on) launch.scrollIntoView({block:'start'});
  });
  document.addEventListener('keydown', event => {
    if (!document.body.classList.contains('launch-projecting') || event.defaultPrevented) return;
    if (event.key === 'Escape') { project.click(); project.focus(); return; }
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.target?.closest('input, textarea, select, [contenteditable="true"]')) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      show(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  navigation.hidden = false;
  if (jump) jump.hidden = false;
  if (shortcuts) shortcuts.hidden = false;
  show(0, false);
})();
