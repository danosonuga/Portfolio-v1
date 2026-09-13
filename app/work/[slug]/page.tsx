import { ViewTransition } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProjectHero } from "@/components/project-hero";
import { CaseStudyRenderer } from "@/components/case-study-section";
import { getCaseStudy, caseStudies } from "@/lib/projects";
import { CaseStudyNav } from "@/components/case-study-nav";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import { SectionNavigator } from "@/components/section-navigator";

export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/work/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getCaseStudy(slug);
  if (!project) return {};

  return {
    title: `${project.name} — ${project.title}`,
    description: project.description,
    openGraph: {
      title: `${project.name} — ${project.title}`,
      description: project.description,
      type: "article",
      siteName: "Daniel Osonuga",
    },
  };
}

export default async function CaseStudyPage(
  props: PageProps<"/work/[slug]">
) {
  const { slug } = await props.params;
  const project = getCaseStudy(slug);

  if (!project) {
    notFound();
  }

  const sectionLinks = project.sections
    .filter((s) => s.heading || s.title)
    .filter((s) => s.type !== "image")
    .map((s) => {
      const label = s.heading || s.title || "";
      const id = label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      return { label, id };
    });

  const theme = project.theme;
  const themeStyle = theme
    ? ({
        "--background": theme.bg,
        "--bg-alt": theme.bgAlt,
        "--fg": theme.fg,
        "--fg-muted": theme.fgMuted,
        "--fg-subtle": theme.fgSubtle,
        "--border": theme.border,
        "--surface": theme.surface,
        "--accent": theme.accent,
        ...(theme.heroBg ? { "--hero-bg": theme.heroBg } : {}),
        "--foreground": theme.fg,
        "--card": theme.surface,
        "--card-border": theme.border,
        "--muted": theme.fgMuted,
        background: theme.bg,
        color: theme.fg,
        colorScheme: "dark",
      } as React.CSSProperties)
    : undefined;

  return (
    <ViewTransition
      enter={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
      exit={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
      default="none"
    >
      <div className="min-h-screen" style={themeStyle}>
        <CaseStudyNav />
        <main>
          <ProjectHero project={project} />
          <CaseStudyRenderer sections={project.sections} />
        </main>
        <Footer />
        <ScrollToTop />
        <SectionNavigator sections={sectionLinks} />
      </div>
    </ViewTransition>
  );
}
