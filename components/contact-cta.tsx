"use client";

import { useState } from "react";
import { haptic, playPositiveSound } from "@/lib/feedback";

export function ContactCTA() {
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText("osonuga.daniel@gmail.com");
    haptic();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto w-[90%] text-center md:w-[80%]">
        <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-[var(--fg-subtle)]">
          Like what you see?
        </p>
        <h2 className="mt-4 text-[28px] font-medium leading-[1.2] tracking-[-0.025em] text-[var(--fg)] md:text-[40px]">
          Let&apos;s work together.
        </h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={copyEmail}
            className="inline-grid h-11 rounded-full px-6 text-[14px] font-medium transition-colors"
            style={{
              background: "var(--surface, #161616)",
              color: "var(--fg)",
              border: "1px solid var(--border, #222)",
            }}
          >
            <span className={`col-start-1 row-start-1 flex items-center ${copied ? "invisible" : ""}`}>
              Copy email
            </span>
            <span className={`col-start-1 row-start-1 flex items-center ${copied ? "" : "invisible"}`}>
              Copied!
            </span>
          </button>
          <button
            data-cal-link="danosonuga/intro-call"
            data-cal-namespace="intro-call"
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
            onClick={playPositiveSound}
            className="inline-flex h-11 items-center rounded-full px-6 text-[14px] font-medium text-[#0A0A0A] transition-opacity hover:opacity-90"
            style={{ background: "var(--fg)" }}
          >
            Book an intro call
          </button>
        </div>
      </div>
    </section>
  );
}
