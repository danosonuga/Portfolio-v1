"use client";

import Image from "next/image";
import { ScrollReveal } from "./scroll-reveal";
import type { CaseStudySection as SectionType } from "@/lib/projects";

function sectionId(section: SectionType): string | undefined {
  const label = section.heading || section.title;
  if (!label) return undefined;
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function renderBoldText(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-[var(--fg)]">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

export function CaseStudyRenderer({
  sections,
}: {
  sections: SectionType[];
}) {
  return (
    <div className="mx-auto w-[90%] py-16 md:w-[80%] md:py-24">
      <div>
        {sections.map((section, i) => {
          const prevType = i > 0 ? sections[i - 1].type : null;
          const isImageAfterImage =
            section.type === "image" && prevType === "image";
          return (
            <div
              key={i}
              id={sectionId(section)}
              style={
                i > 0
                  ? { marginTop: isImageAfterImage ? 40 : 100 }
                  : undefined
              }
            >
              <CaseStudyBlock section={section} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CaseStudyBlock({ section }: { section: SectionType }) {
  switch (section.type) {
    case "narrative":
      return (
        <ScrollReveal>
          <div>
            <div className="max-w-[960px]">
              {section.heading && (
                <h2 className="text-[12px] font-medium uppercase tracking-[0.1em] text-[var(--fg-subtle)]">
                  {section.heading}
                </h2>
              )}
              {section.title && (
                <h3
                  className={`${section.heading ? "mt-6" : ""} text-[28px] font-semibold leading-[1.2] tracking-[-0.1px] text-[var(--fg)] md:text-[40px] md:leading-[48px]`}
                >
                  {section.title.includes("\n")
                    ? section.title.split("\n").map((line, i, arr) => (
                        <span key={i}>
                          {line}
                          {i < arr.length - 1 && <br className="hidden md:inline" />}
                          {i < arr.length - 1 && <span className="md:hidden"> </span>}
                        </span>
                      ))
                    : section.title}
                </h3>
              )}
              {section.content && (
                <div
                  className={`${section.title || section.heading ? "mt-5" : ""} space-y-4`}
                >
                  {section.content.split("\n\n").map((para, i) => (
                    <p
                      key={i}
                      className="text-[14px] leading-[22px] text-[var(--fg-muted)]"
                    >
                      {renderBoldText(para)}
                    </p>
                  ))}
                </div>
              )}
              {section.bullets && (
                <ul className="mt-4 space-y-1.5 pl-1">
                  {section.bullets.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-[14px] leading-[22px] text-[var(--fg-muted)]"
                    >
                      <span className="mt-[9px] h-[4px] w-[4px] shrink-0 rounded-full bg-[var(--fg-muted)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {section.contentAfter && !section.items && !section.metricRows && !section.numberedItems && (
                <div className="mt-5 space-y-4">
                  {section.contentAfter.split("\n\n").map((para, i) => (
                    <p
                      key={i}
                      className="text-[14px] leading-[22px] text-[var(--fg-muted)]"
                    >
                      {renderBoldText(para)}
                    </p>
                  ))}
                </div>
              )}
            </div>
            {section.numberedItems && (
              <>
                <div className="mt-6 space-y-3">
                  {section.numberedItems.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 rounded-[12px] px-5 py-4"
                      style={{
                        background: "var(--hero-bg, var(--surface, #161616))",
                      }}
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[13px] font-semibold text-[#0A0A0A]">
                        {i + 1}
                      </span>
                      <p className="text-[14px] font-medium leading-[22px] text-[var(--fg)]">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
                {section.contentAfter && (
                  <div className="mt-6 max-w-[960px] space-y-4">
                    {section.contentAfter.split("\n\n").map((para, i) => (
                      <p
                        key={i}
                        className="text-[14px] leading-[22px] text-[var(--fg-muted)]"
                      >
                        {renderBoldText(para)}
                      </p>
                    ))}
                  </div>
                )}
              </>
            )}
            {section.items && (
              <>
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {section.items.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[12px] p-5"
                      style={{
                        background:
                          "var(--hero-bg, var(--surface, #161616))",
                      }}
                    >
                      <p className="text-[14px] font-medium text-[var(--fg)]">
                        {item.url ? (
                          <a href={item.url} target="_blank" rel="noopener noreferrer" className="underline decoration-dotted decoration-[var(--fg-muted)] underline-offset-2 transition-colors hover:decoration-[var(--fg)]">
                            {item.label}
                          </a>
                        ) : item.label}
                      </p>
                      <p className="mt-2 text-[13px] leading-[1.6] text-[var(--fg-muted)]">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
                {section.contentAfter && (
                  <div className="mt-6 max-w-[960px] space-y-4">
                    {section.contentAfter.split("\n\n").map((para, i) => (
                      <p
                        key={i}
                        className="text-[14px] leading-[22px] text-[var(--fg-muted)]"
                      >
                        {renderBoldText(para)}
                      </p>
                    ))}
                  </div>
                )}
              </>
            )}
            {section.metricRows && (
              <div className="mt-8">
                {section.contentAfter && (
                  <div className="mb-6 max-w-[960px] space-y-4">
                    {section.contentAfter.split("\n\n").map((para, i) => (
                      <p
                        key={i}
                        className="text-[14px] leading-[22px] text-[var(--fg)]"
                      >
                        {renderBoldText(para)}
                      </p>
                    ))}
                  </div>
                )}
                {section.metricRows.map((row, ri) => (
                  <div key={ri}>
                    {row.intro && (
                      <p className="mt-6 mb-4 text-[14px] leading-[22px] text-[var(--fg)]">
                        {row.intro}
                      </p>
                    )}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      {row.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="rounded-[12px] p-5"
                          style={{
                            background: "var(--hero-bg, var(--surface, #161616))",
                          }}
                        >
                          <p className="text-[13px] text-[var(--fg-muted)]">
                            {m.label}
                          </p>
                          <p className="mt-3 text-[32px] font-medium leading-[1] tracking-[-0.02em] text-[var(--fg)] md:text-[40px]">
                            {m.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {section.callout && (
              <div
                className="mt-8 rounded-[12px] px-6 py-5"
                style={{
                  background: "var(--hero-bg, var(--surface, #161616))",
                }}
              >
                {section.calloutLabel ? (
                  <div>
                    <p className="text-[14px] leading-[22px] text-[var(--fg-muted)]">
                      {section.calloutLabel}
                    </p>
                    <p className="mt-2 text-[14px] font-medium leading-[22px] text-[var(--fg)]">
                      {section.callout}
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white">
                      <Image
                        src="/question_2_regular.svg"
                        alt=""
                        width={14}
                        height={14}
                      />
                    </span>
                    <p className="text-[14px] font-medium leading-[22px] text-[var(--fg)]">
                      {section.callout}
                    </p>
                  </div>
                )}
              </div>
            )}
            {section.callouts && (
              <div className="mt-8 space-y-3">
                {section.callouts.map((c, i) => (
                  <div
                    key={i}
                    className="rounded-[12px] px-6 py-5"
                    style={{
                      background: "var(--hero-bg, var(--surface, #161616))",
                    }}
                  >
                    <p className="text-[14px] leading-[22px] text-[var(--fg-muted)]">
                      {c.label}
                    </p>
                    <p className="mt-2 text-[14px] font-medium leading-[22px] text-[var(--fg)]">
                      {c.text}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollReveal>
      );

    case "image":
      return (
        <ScrollReveal>
          <div>
            <div
              className="relative left-1/2 -ml-[50vw] w-screen py-10 md:py-16"
              style={{ background: "var(--hero-bg, var(--surface, #161616))" }}
            >
              <div className="mx-auto w-[90%] md:w-[80%]">
                <div className="relative">
                  <img
                    src={section.image!}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full scale-[1.02] rounded-[12px] blur-[40px] opacity-40 md:rounded-[16px] md:blur-[60px]"
                  />
                  <div className="relative overflow-hidden rounded-[12px] md:rounded-[16px]">
                    <img
                      src={section.image!}
                      alt={section.imageAlt || ""}
                      className="h-auto w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
            {section.caption && (
              <p className="mt-4 text-center text-[13px] text-[var(--fg-subtle)]">
                {section.caption}
              </p>
            )}
          </div>
        </ScrollReveal>
      );

    case "metric":
      return (
        <ScrollReveal>
          <div className="max-w-[960px] border-l-2 py-3 pl-8" style={{ borderColor: "var(--accent, #a1a1a1)" }}>
            <p className="text-[48px] font-medium leading-[1] tracking-[-0.02em] text-[var(--fg)] md:text-[64px]">
              {section.value}
            </p>
            <p className="mt-3 text-[14px] text-[var(--fg-muted)]">
              {section.label}
            </p>
          </div>
        </ScrollReveal>
      );

    case "quote":
      return (
        <ScrollReveal>
          <blockquote className="max-w-[960px] border-l-2 py-2 pl-8" style={{ borderColor: "var(--border, #222)" }}>
            <p className="text-[20px] italic leading-[1.5] text-[var(--fg)] md:text-[24px]">
              &ldquo;{section.content}&rdquo;
            </p>
          </blockquote>
        </ScrollReveal>
      );

    case "insight":
      return (
        <ScrollReveal>
          <div
            className="rounded-[16px] p-8 md:p-10"
            style={{
              background: "var(--surface, #161616)",
              border: "1px solid var(--border, #222)",
            }}
          >
            {section.heading && (
              <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--fg-subtle)]">
                {section.heading}
              </p>
            )}
            <p className="mt-3 text-[20px] font-medium leading-[1.4] tracking-[-0.01em] text-[var(--fg)] md:text-[24px]">
              {section.content}
            </p>
          </div>
        </ScrollReveal>
      );

    case "image-pair":
      return (
        <ScrollReveal>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            {section.images?.map((img) => (
              <div
                key={img.src}
                className="relative aspect-[16/10] overflow-hidden rounded-[12px] md:rounded-[16px]"
                style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.2)" }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 360px"
                  className="object-cover object-top"
                />
              </div>
            ))}
          </div>
        </ScrollReveal>
      );

    case "grid":
      return (
        <ScrollReveal>
          <div>
            {section.heading && (
              <h2 className="text-[12px] font-medium uppercase tracking-[0.1em] text-[var(--fg-subtle)]">
                {section.heading}
              </h2>
            )}
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {section.items?.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[12px] p-5"
                  style={{
                    background: "var(--surface, #161616)",
                    border: "1px solid var(--border, #222)",
                  }}
                >
                  <p className="text-[14px] font-medium text-[var(--fg)]">
                    {item.label}
                  </p>
                  <p className="mt-2 text-[13px] leading-[1.6] text-[var(--fg-muted)]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      );

    default:
      return null;
  }
}
