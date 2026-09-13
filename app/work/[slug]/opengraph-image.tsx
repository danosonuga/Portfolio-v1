import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getCaseStudy, caseStudies } from "@/lib/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

async function loadImage(name: string) {
  const buf = await readFile(join(process.cwd(), "public", name));
  return `data:image/png;base64,${buf.toString("base64")}`;
}

export default async function OGImage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const project = getCaseStudy(slug);
  if (!project) return new ImageResponse(<div />, { ...size });

  const icon = await loadImage(project.icon.replace(/^\//, ""));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: project.theme?.bg || "#0A0A0A",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <img
            src={icon}
            width={64}
            height={64}
            style={{ borderRadius: "16px" }}
          />
          <span
            style={{
              color: project.theme?.fg || "#FFFFFF",
              fontSize: 28,
              fontWeight: 600,
            }}
          >
            {project.name}
          </span>
        </div>
        <span
          style={{
            color: project.theme?.fg || "#FFFFFF",
            fontSize: 52,
            fontWeight: 600,
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
          }}
        >
          {project.title}
        </span>
        <span
          style={{
            color: project.theme?.fgMuted || "#888888",
            fontSize: 22,
            marginTop: "24px",
            fontWeight: 400,
          }}
        >
          {project.role} · {project.impact}
        </span>
      </div>
    ),
    { ...size }
  );
}
