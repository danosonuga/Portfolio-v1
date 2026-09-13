"use client";

import { useState, useEffect, useRef } from "react";

interface SectionLink {
  label: string;
  id: string;
}

export function SectionNavigator({ sections }: { sections: SectionLink[] }) {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const activeLabel = sections.find((s) => s.id === activeId)?.label || sections[0]?.label || "";

  useEffect(() => {
    function onScroll() {
      const offsets = sections
        .map((s) => {
          const el = document.getElementById(s.id);
          return el ? { id: s.id, top: el.getBoundingClientRect().top } : null;
        })
        .filter(Boolean) as { id: string; top: number }[];

      const active = offsets.reduce<string>((best, cur) => {
        return cur.top <= 300 ? cur.id : best;
      }, "");
      setActiveId(active);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", onClick);
      return () => document.removeEventListener("mousedown", onClick);
    }
  }, [open]);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpen(false);
    }
  }

  if (!activeLabel) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 md:bottom-8" ref={ref}>
      {open && (
        <div
          className="mb-2 w-[280px] overflow-hidden rounded-[14px] py-2 shadow-xl"
          style={{
            background: "var(--hero-bg, var(--surface, #161616))",
                      }}
        >
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-[13px] transition-colors hover:bg-white/5"
              style={{
                color:
                  activeId === s.id
                    ? "var(--fg, #fff)"
                    : "var(--fg-muted, #999)",
                fontWeight: activeId === s.id ? 500 : 400,
              }}
            >
              {activeId === s.id && (
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: "var(--accent, #3B9EFF)" }}
                />
              )}
              <span className={activeId !== s.id ? "pl-[18px]" : ""}>
                {s.label}
              </span>
            </button>
          ))}
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="mx-auto flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-medium text-white shadow-lg transition-colors hover:opacity-90"
        style={{
          background: "var(--hero-bg, var(--surface, #161616))",
                  }}
      >
        {activeLabel}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          className="transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <path
            d="M6 15l6-6 6 6"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
