"use client";
import { useEffect, useRef, type ReactNode } from "react";

/** The native top layer removes the Hub's fixed navigation from the teaching stage
 * and keeps keyboard focus in the presentation. No fullscreen permission needed. */
export default function FractionPresentation({ children, onExit, titleId, returnFocusId }: {
  children: ReactNode; onExit: () => void; titleId: string; returnFocusId: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const current = dialog.current;
    if (current && !current.open) current.showModal();
    return () => { if (current?.open) current.close(); };
  }, []);
  function exit() {
    onExit();
    requestAnimationFrame(() => document.getElementById(returnFocusId)?.focus());
  }
  return <dialog ref={dialog} className="fraction-presentation" aria-labelledby={titleId}
    onCancel={event => { event.preventDefault(); exit(); }}>
    <div className="fraction-presentation__bar"><span>NUMBER STUDIO · SAME AMOUNT, NEW NAME</span><button type="button" autoFocus onClick={exit}>Exit presentation <small>Esc</small></button></div>
    {children}
  </dialog>;
}
