"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface SectionLink {
  label: string;
  id: string;
}

export function SectionNavigator({ sections }: { sections: SectionLink[] }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeLabel = sections.find((s) => s.id === activeId)?.label || sections[0]?.label || "";

  useEffect(() => {
    if (open) {
      setMounted(true);
    } else if (mounted) {
      setHoverIndex(null);
      const t = setTimeout(() => setMounted(false), 200);
      return () => clearTimeout(t);
    }
  }, [open, mounted]);

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

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpen(false);
    }
  }, []);

  function getHighlightStyle(): React.CSSProperties {
    if (hoverIndex === null || !itemRefs.current[hoverIndex] || !menuRef.current) {
      return { opacity: 0, top: 0, height: 0 };
    }
    const item = itemRefs.current[hoverIndex]!;
    const menu = menuRef.current;
    const itemRect = item.getBoundingClientRect();
    const menuRect = menu.getBoundingClientRect();
    return {
      opacity: 1,
      top: itemRect.top - menuRect.top,
      height: itemRect.height,
    };
  }

  if (!activeLabel) return null;

  const highlightStyle = getHighlightStyle();

  return (
    <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 md:bottom-8" ref={ref}>
      {mounted && (
        <div
          ref={menuRef}
          className="relative mb-2 w-[280px] overflow-hidden rounded-[14px] py-2 shadow-xl"
          style={{
            background: "var(--hero-bg, var(--surface, #161616))",
            transformOrigin: "bottom center",
            transition: "opacity 200ms cubic-bezier(0.22, 1, 0.36, 1), transform 200ms cubic-bezier(0.22, 1, 0.36, 1)",
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0) scale(1)" : "translateY(8px) scale(0.95)",
            pointerEvents: open ? "auto" : "none",
          }}
          onMouseLeave={() => setHoverIndex(null)}
        >
          <div
            className="pointer-events-none absolute left-0 right-0 rounded-[8px] mx-1.5"
            style={{
              background: "rgba(255, 255, 255, 0.06)",
              transition: "all 200ms cubic-bezier(0.22, 1, 0.36, 1)",
              opacity: highlightStyle.opacity,
              top: highlightStyle.top,
              height: highlightStyle.height,
            }}
          />
          {sections.map((s, i) => (
            <button
              key={s.id}
              ref={(el) => { itemRefs.current[i] = el; }}
              onClick={() => scrollTo(s.id)}
              onMouseEnter={() => setHoverIndex(i)}
              className="relative flex w-full items-center gap-3 px-4 py-2.5 text-left text-[13px]"
              style={{
                color:
                  activeId === s.id
                    ? "var(--fg, #fff)"
                    : "var(--fg-muted, #999)",
                fontWeight: activeId === s.id ? 500 : 400,
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(6px)",
                transition: `opacity 200ms cubic-bezier(0.22, 1, 0.36, 1) ${open ? i * 25 : 0}ms, transform 200ms cubic-bezier(0.22, 1, 0.36, 1) ${open ? i * 25 : 0}ms`,
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
