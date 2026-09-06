"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const navLinks = ["Home", "Work", "About", "UI shots"];

export function Header() {
  const [toast, setToast] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function handleNavClick(label: string) {
    if (label === "Home") {
      setMenuOpen(false);
      return;
    }
    setMenuOpen(false);
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  }

  function copyEmail() {
    navigator.clipboard.writeText("osonuga.daniel@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      <header className={`sticky top-0 z-40 border-b border-[#1A1A1A] bg-background/80 backdrop-blur-md ${menuOpen ? "z-50" : ""}`}>
        <div className="animate-in mx-auto flex w-[90%] items-center justify-between py-4 md:w-[80%]">
          <div className="flex items-center gap-3">
            <Image
              src="/profile pic.png"
              alt="Daniel Osonuga"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="text-[14px] font-medium text-foreground">
              Daniel Osonuga
            </span>
          </div>
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((label) => (
              <span
                key={label}
                onClick={() => handleNavClick(label)}
                className={`cursor-pointer text-[14px] transition-colors hover:text-foreground ${label === "Home" ? "text-foreground" : "text-muted"}`}
              >
                {label}
              </span>
            ))}
          </nav>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-50 flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/10 md:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              {menuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Full-page mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-background transition-opacity duration-300 md:hidden ${menuOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <div className="flex h-full flex-col px-[5%] pt-20">
          <nav className="flex flex-col gap-6">
            {navLinks.map((label) => (
              <span
                key={label}
                onClick={() => handleNavClick(label)}
                className={`cursor-pointer text-[28px] font-semibold tracking-[-0.02em] transition-colors hover:text-foreground ${label === "Home" ? "text-foreground" : "text-muted"}`}
              >
                {label}
              </span>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-3 pb-10">
            <button
              onClick={copyEmail}
              className="inline-grid w-full rounded-full bg-[#1A1A1A] py-3.5 text-[14px] font-medium text-white transition-colors hover:bg-[#222]"
            >
              <span className={`col-start-1 row-start-1 ${copied ? "invisible" : ""}`}>Copy email</span>
              <span className={`col-start-1 row-start-1 ${copied ? "" : "invisible"}`}>Copied!</span>
            </button>
            <button
              data-cal-link="danosonuga/intro-call"
              data-cal-namespace="intro-call"
              data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
              onClick={() => setMenuOpen(false)}
              className="w-full rounded-full bg-white py-3.5 text-[14px] font-medium text-[#0A0A0A] transition-opacity hover:opacity-90"
            >
              Book an intro call
            </button>
          </div>
        </div>
      </div>

      <div
        className={`fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#262627] px-5 py-2.5 text-[13px] font-medium text-white shadow-lg transition-all duration-300 ${toast ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"}`}
      >
        I am currently working on this
      </div>
    </>
  );
}
