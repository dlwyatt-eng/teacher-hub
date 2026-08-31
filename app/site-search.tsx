"use client";

import { useCallback, useEffect, useRef, useState, type ComponentType } from "react";

export type SiteSearchTarget =
  | { kind: "page"; page: string }
  | { kind: "subject"; subject: string }
  | { kind: "generic"; subject: string; id: string }
  | { kind: "social"; id: string }
  | { kind: "science"; id: string };

export type SiteSearchAudience = "teacher" | "student";

export type SiteSearchProps = {
  audience: SiteSearchAudience;
  onNavigate: (target: SiteSearchTarget) => void;
};

export type SiteSearchDialogProps = SiteSearchProps & {
  onClose: () => void;
};

let resolvedDialog: ComponentType<SiteSearchDialogProps> | null = null;
let pendingDialog: Promise<ComponentType<SiteSearchDialogProps>> | null = null;

function loadSearchDialog() {
  if (resolvedDialog) return Promise.resolve(resolvedDialog);
  pendingDialog ??= import("./site-search-dialog")
    .then((module) => {
      resolvedDialog = module.default;
      return resolvedDialog;
    })
    .catch((error: unknown) => {
      pendingDialog = null;
      throw error;
    });
  return pendingDialog;
}

function SearchLoading({ onClose }: { onClose: () => void }) {
  return (
    <section className="site-search__load-state" role="status" aria-live="polite" aria-busy="true">
      <header>
        <div><small>CLASSROOM OS</small><h2 id="site-search-title">Find a lesson, unit, or tool</h2></div>
        <button type="button" onClick={onClose} aria-label="Close search" data-search-initial-focus>×</button>
      </header>
      <div><span aria-hidden="true">⌕</span><strong>Loading curriculum search…</strong><p>Opening the lesson and planning index.</p></div>
    </section>
  );
}

function SearchLoadError({ onRetry, onClose }: { onRetry: () => void; onClose: () => void }) {
  return (
    <section className="site-search__load-state site-search__load-state--error" role="alert">
      <header>
        <div><small>CLASSROOM OS</small><h2 id="site-search-title">Search could not load</h2></div>
        <button type="button" onClick={onClose} aria-label="Close search">×</button>
      </header>
      <div>
        <span aria-hidden="true">↻</span>
        <strong>Check the connection and try again.</strong>
        <p>The rest of the Teacher Hub is still available.</p>
        <span className="site-search__retry"><button type="button" onClick={onRetry} data-search-initial-focus>Retry search</button><button type="button" onClick={onClose}>Close</button></span>
      </div>
    </section>
  );
}

export function SiteSearch({ audience, onNavigate }: SiteSearchProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [Dialog, setDialog] = useState<ComponentType<SiteSearchDialogProps> | null>(() => resolvedDialog);
  const [loadFailed, setLoadFailed] = useState(false);

  const beginLoad = useCallback(() => {
    setLoadFailed(false);
    void loadSearchDialog()
      .then((Component) => setDialog(() => Component))
      .catch(() => setLoadFailed(true));
  }, []);

  const openSearch = useCallback(() => {
    setIsOpen(true);
    beginLoad();
  }, [beginLoad]);

  const closeSearch = useCallback(() => {
    dialogRef.current?.close();
    setIsOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    if (!dialogRef.current?.open) dialogRef.current?.showModal();
    const frame = window.requestAnimationFrame(() => dialogRef.current?.querySelector<HTMLElement>("[data-search-initial-focus]")?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [isOpen]);

  useEffect(() => {
    const shortcut = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping = target?.matches("input, textarea, select, [contenteditable='true']");
      if ((event.key === "/" && !isTyping) || ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k")) {
        event.preventDefault();
        openSearch();
      }
    };
    window.addEventListener("keydown", shortcut);
    return () => window.removeEventListener("keydown", shortcut);
  }, [openSearch]);

  return (
    <div className="site-search">
      <button ref={triggerRef} className="site-search__open" type="button" onClick={openSearch} aria-haspopup="dialog" aria-expanded={isOpen}>
        <span aria-hidden="true">⌕</span><strong>Search</strong><kbd>/</kbd>
      </button>
      <dialog
        ref={dialogRef}
        className="site-search__dialog"
        aria-labelledby="site-search-title"
        onClose={() => {
          setIsOpen(false);
          window.requestAnimationFrame(() => triggerRef.current?.focus());
        }}
        onClick={(event) => { if (event.target === dialogRef.current) closeSearch(); }}
      >
        {isOpen && (Dialog
          ? <Dialog audience={audience} onNavigate={onNavigate} onClose={closeSearch} />
          : loadFailed
            ? <SearchLoadError onRetry={beginLoad} onClose={closeSearch} />
            : <SearchLoading onClose={closeSearch} />)}
      </dialog>
    </div>
  );
}
