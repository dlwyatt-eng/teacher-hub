'use strict';
(() => {
  const launch = document.getElementById('begin');
  const scenes = Array.from(launch.querySelectorAll('.launch-scene'));
  const navigation = launch.querySelector('.launch-navigation');
  const back = document.getElementById('launch-back');
  const next = document.getElementById('launch-next');
  const progress = document.getElementById('launch-progress');
  const project = document.getElementById('launch-project');
  let current = 0;
  function show(index, focus = true) {
    current = Math.max(0, Math.min(scenes.length - 1, index));
    scenes.forEach((scene, i) => { scene.hidden = i !== current; });
    back.disabled = current === 0;
    next.disabled = current === scenes.length - 1;
    progress.textContent = `Scene ${current + 1} of ${scenes.length}`;
    if (focus) scenes[current].querySelector('h2').focus();
  }
  back.addEventListener('click', () => show(current - 1));
  next.addEventListener('click', () => show(current + 1));
  project.addEventListener('click', () => {
    const on = document.body.classList.toggle('launch-projecting');
    project.setAttribute('aria-pressed', String(on));
    project.textContent = on ? 'Exit projection' : 'Project this lesson';
    if (on) launch.scrollIntoView({block:'start'});
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && document.body.classList.contains('launch-projecting')) project.click();
  });
  navigation.hidden = false;
  show(0, false);
})();
