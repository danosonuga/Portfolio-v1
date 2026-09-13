import Image from "next/image";
import type { CaseStudy } from "@/lib/projects";

function renderBoldText(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-[var(--fg)]">
        {part}
      </strong>
    ) : (
      part
    )
  );
}

export function ProjectHero({ project }: { project: CaseStudy }) {
  const hasMeta = project.meta && project.meta.length > 0;

  return (
    <section className="pt-24 md:pt-36">
      <div className="mx-auto w-[90%] md:w-[80%]">
        {/* App icon */}
        <div className="animate-in">
          <Image
            src={project.icon}
            alt={`${project.name} icon`}
            width={72}
            height={72}
            className="rounded-[18px]"
          />
        </div>

        {/* Title */}
        <h1
          className="animate-in mt-8 max-w-[800px] text-[32px] font-semibold leading-[1.17] tracking-[-0.02em] text-[var(--fg)] md:text-[48px] md:leading-[56px]"
          style={{ animationDelay: "100ms" }}
        >
          {project.name} - {project.title}
        </h1>

        {/* Description */}
        {project.heroDescription && (
          <p
            className="animate-in mt-6 max-w-[800px] text-[14px] leading-[22px] text-[var(--fg-muted)]"
            style={{ animationDelay: "200ms" }}
          >
            {renderBoldText(project.heroDescription)}
          </p>
        )}

        {/* Metadata grid */}
        {hasMeta && (
          <div
            className="animate-in mt-10 flex flex-wrap gap-x-12 gap-y-6"
            style={{ animationDelay: "300ms" }}
          >
            {project.meta!.map((item) => (
              <div key={item.label}>
                <p className="text-[12px] leading-[20px] text-[var(--fg-subtle)]">
                  {item.label}
                </p>
                <p className="mt-1.5 text-[14px] leading-[22px] font-medium text-[var(--fg)]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Visit live site button */}
        {project.liveUrl && (
          <div
            className="animate-in mt-8"
            style={{ animationDelay: "400ms" }}
          >
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[14px] font-medium text-[#0A0A0A] transition-opacity hover:opacity-90"
            >
              Visit live site
            </a>
          </div>
        )}
      </div>

      <div
        className="animate-in mt-12 md:mt-16"
        style={{ animationDelay: "500ms", background: "var(--hero-bg, var(--bg-alt))" }}
      >
        <div
          className="mx-auto w-[90%] py-10 md:w-[80%] md:py-16"
        >
          <div
            className="relative aspect-[16/9] overflow-hidden rounded-[16px] md:rounded-[20px]"
            style={{ background: "var(--bg-alt)" }}
          >
            {project.heroVideo ? (
              <video
                src={project.heroVideo}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
            ) : (
              <Image
                src={project.heroImage}
                alt={project.name}
                fill
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover object-top"
                priority
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
