"use client";

import { useState } from "react";
import { playPositiveSound } from "@/lib/feedback";

const links = [
  { label: "Email", href: "mailto:osonuga.daniel@gmail.com" },
  { label: "X/Twitter", href: "https://x.com/danosonuga" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/daniel-osonuga-197a48198" },
  { label: "Instagram", href: "https://www.instagram.com/danosonuga" },
  { label: "Behance", href: "#" },
];

function TextSwap({ defaultText, hoverText, isHovered }: { defaultText: string; hoverText: string; isHovered: boolean }) {
  const maxLen = Math.max(defaultText.length, hoverText.length);
  const padded1 = defaultText.padEnd(maxLen);
  const padded2 = hoverText.padEnd(maxLen);

  return (
    <span className="inline-grid" aria-hidden="true">
      <span className="col-start-1 row-start-1 flex justify-center">
        {padded1.split("").map((char, i) => (
          <span key={`a-${i}`} className="inline-block overflow-hidden" style={{ height: "1.15em" }}>
            <span
              className="block transition-transform duration-500"
              style={{
                height: "1.15em",
                lineHeight: "1.15",
                transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
                transitionDelay: `${i * 20}ms`,
                transform: isHovered ? "translateY(-100%)" : "translateY(0)",
              }}
            >
              {char === " " ? " " : char}
            </span>
          </span>
        ))}
      </span>
      <span className="col-start-1 row-start-1 flex justify-center">
        {padded2.split("").map((char, i) => (
          <span key={`b-${i}`} className="inline-block overflow-hidden" style={{ height: "1.15em" }}>
            <span
              className="block transition-transform duration-500"
              style={{
                height: "1.15em",
                lineHeight: "1.15",
                transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
                transitionDelay: `${i * 20}ms`,
                transform: isHovered ? "translateY(0)" : "translateY(100%)",
              }}
            >
              {char === " " ? " " : char}
            </span>
          </span>
        ))}
      </span>
    </span>
  );
}

export function Footer() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <footer className="animate-in mt-16 border-t border-[#1A1A1A] pt-16 pb-12 md:mt-24 md:pt-24" style={{ animationDelay: "800ms" }}>
      <div className="mx-auto w-[90%] md:w-[80%]">
        <h2 className="w-full text-center font-semibold leading-[1] tracking-[-0.04em] text-foreground" style={{ fontSize: "10.2vw" }}>
          <button
            data-cal-link="danosonuga/intro-call"
            data-cal-namespace="intro-call"
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
            className="cursor-pointer"
            onClick={playPositiveSound}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span className="sr-only">Daniel Osonuga</span>
            <TextSwap
              defaultText="Daniel Osonuga"
              hoverText="Book an intro call"
              isHovered={isHovered}
            />
          </button>
        </h2>
        <div className="mt-10 flex flex-col gap-6 md:mt-16 md:flex-row md:items-center md:justify-between">
          <p className="text-[13px] text-muted">All rights reserved</p>
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
