"use client";

import { useRouter } from "next/navigation";

export function CaseStudyNav() {
  const router = useRouter();

  return (
    <div className="fixed top-0 left-0 right-0 z-40 pointer-events-none">
      <div className="mx-auto flex w-[90%] items-center justify-between py-5 md:w-[80%]">
        <button
          onClick={() => router.push("/", { transitionTypes: ["nav-back"] })}
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:opacity-80"
          style={{ background: "var(--hero-bg, var(--surface, #161616))" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
