export function printClosest(trigger: HTMLElement, selector: string) {
  const target = trigger.closest<HTMLElement>(selector);

  if (!target) {
    window.print();
    return;
  }

  document.body.classList.add("print-target-active");
  target.classList.add("print-target");

  try {
    window.print();
  } finally {
    target.classList.remove("print-target");
    document.body.classList.remove("print-target-active");
  }
}
