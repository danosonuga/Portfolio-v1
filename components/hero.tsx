"use client";

import { useState } from "react";

export function Hero() {
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText("osonuga.daniel@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="mx-auto max-w-[720px] pt-[60px] pb-10 md:pt-[100px]">
      <h1 className="animate-in text-[32px] font-semibold leading-[40px] tracking-[-0.02em] text-foreground md:text-[48px] md:leading-[56px]" style={{ animationDelay: "100ms" }}>
        Design partner for early-
        <br className="hidden md:block" />
        stage startups and founders.
      </h1>

      <p className="animate-in mt-6 text-[14px] leading-[22px] text-muted" style={{ animationDelay: "180ms" }}>
        I previously led the design initiative at{" "}
        <span className="font-semibold text-foreground">IPC Africa</span>,
        before that I worked with the design team at
        <br className="hidden md:block" />
        {" "}<span className="font-semibold text-foreground">Remita</span> to elevate
        their agent and corporate experience. Now I help early-stage startups
        move from
        <br className="hidden md:block" />
        {" "}<span className="font-semibold text-foreground">0 → 1</span> from idea
        to fully working product.{" "}
        <span className="font-semibold text-foreground">Open to relocate</span>.
      </p>

      <div className="animate-in mt-8 flex items-center gap-3" style={{ animationDelay: "260ms" }}>
        <button
          data-cal-link="danosonuga/intro-call"
          data-cal-namespace="intro-call"
          data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
          className="rounded-full bg-white px-4 py-2 text-[13px] font-medium text-[#0A0A0A] transition-opacity hover:opacity-90"
        >
          Book an intro call
        </button>
        <button
          onClick={copyEmail}
          className="inline-grid rounded-full bg-[#1A1A1A] px-4 py-2 text-[13px] font-medium text-white transition-opacity hover:opacity-90"
        >
          <span className={`col-start-1 row-start-1 ${copied ? "invisible" : ""}`}>Copy email</span>
          <span className={`col-start-1 row-start-1 ${copied ? "" : "invisible"}`}>Copied!</span>
        </button>
      </div>
    </section>
  );
}
