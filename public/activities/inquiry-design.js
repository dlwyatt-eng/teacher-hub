'use strict';
// Enhance existing document content. Without JavaScript every inquiry move remains readable.
(() => {
  const largeText = document.getElementById('large-text');
  largeText?.addEventListener('click', () => {
    const on = document.documentElement.classList.toggle('large-text');
    largeText.setAttribute('aria-pressed', String(on));
  });
  const currentPage = location.pathname.split('/').pop();
  document.querySelectorAll('.inquiry-topbar nav a').forEach(link => {
    if (link.getAttribute('href') === currentPage) link.setAttribute('aria-current', 'page');
  });
  function enhanceTabs(controlSelector, panelSelector, prefix, label) {
    const controls = document.querySelector(controlSelector);
    const panels = Array.from(document.querySelectorAll(panelSelector));
    if (!controls || !panels.length) return;
    controls.setAttribute('role', 'tablist');
    const buttons = panels.map((panel, i) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.id = `${prefix}-tab-${i}`;
      button.textContent = label(panel, i);
      button.setAttribute('role', 'tab');
      panel.id ||= `${prefix}-panel-${i}`;
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', button.id);
      panel.tabIndex = 0;
      button.setAttribute('aria-controls', panel.id);
      controls.append(button);
      button.addEventListener('click', () => select(i));
      return button;
    });
    function select(index) {
      buttons.forEach((button, i) => {
        button.setAttribute('aria-selected', String(i === index));
        button.tabIndex = i === index ? 0 : -1;
        panels[i].hidden = i !== index;
      });
    }
    controls.addEventListener('keydown', event => {
      let index = buttons.indexOf(event.target);
      if (index < 0) return;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') index = (index + 1) % buttons.length;
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') index = (index - 1 + buttons.length) % buttons.length;
      else if (event.key === 'Home') index = 0;
      else if (event.key === 'End') index = buttons.length - 1;
      else return;
      event.preventDefault(); select(index); buttons[index].focus();
    });
    select(0);
    panels[0].parentElement.classList.add('enhanced');
  }
  enhanceTabs('.topic-controls', '.topic-panel', 'topic', panel => panel.dataset.tabLabel);
  enhanceTabs('.move-controls', '.moves .card', 'move', (panel, i) => `${i + 1}. ${['Wonder','Find','Compare','Listen','Improve','Share'][i]}`);
  const fields = Array.from(document.querySelectorAll('.notes-form textarea, .notes-form input[type="text"]'));
  if (!fields.length) return;
  // Local, in-memory inputs only. No storage or network operations.
  let dirty = false;
  fields.forEach(field => field.addEventListener('input', () => { dirty = true; }));
  document.querySelectorAll('.finish input').forEach(field => field.addEventListener('change', () => { dirty = true; }));
  window.addEventListener('beforeunload', event => {
    if (dirty) { event.preventDefault(); event.returnValue = ''; }
  });
  document.getElementById('download-notes')?.addEventListener('click', () => {
    const content = ['INQUIRY FIELDNOTES', 'Two countries. Shared questions.', ''];
    fields.forEach(field => {
      const label = document.querySelector(`label[for="${field.id}"]`);
      const section = field.closest('section').querySelector('h2');
      content.push(`${section.textContent}: ${label.textContent}`, field.value || '(not recorded)', '');
    });
    content.push('READY TO EXPLAIN');
    document.querySelectorAll('.finish input').forEach(check => content.push(`${check.checked ? '[x]' : '[ ]'} ${check.parentElement.textContent.trim()}`));
    const url = URL.createObjectURL(new Blob([content.join('\n')], {type:'text/plain;charset=utf-8'}));
    const link = document.createElement('a');
    link.href = url; link.download = 'inquiry-fieldnotes.txt';
    document.body.append(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    document.getElementById('export-status').textContent = 'Text copy requested. Check your downloads before leaving; this page still does not save automatically.';
  });
})();
