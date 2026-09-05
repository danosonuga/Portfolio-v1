"use client";

import { useState } from "react";
import { ProjectCard, type Project } from "./project-card";
import { ProjectModal } from "./project-modal";

const CARD_BASE_DELAY = 460;

const projects: Project[] = [
  {
    name: "Bayana",
    description: "The trusted ecosystem for social impact.",
    image: "/Bayana image preview.png",
    icon: "/Bayana app icon.png",
    confidential: true,
    liveUrl: "https://www.joinbayana.com/",
    slides: [
      "/Bayana image preview.png",
      "/Bayana slide - 4.png",
      "/Bayana slide - 3.png",
      "/Bayana slide - 1.png",
      "/Bayana slide - 2.png",
    ],
  },
  {
    name: "Coldstone",
    description: "Refreshed look for Coldstone ordering site.",
    image: "/Coldstone image preview.png",
    icon: "/Coldstone app icon.png",
    badge: "2+ countries",
    confidential: true,
    liveUrl: "https://coldstonecreamery.ng/?dining-mode=delivery",
    video: "/Coldstone video.mp4",
  },
  {
    name: "Daash",
    description: "Manage your restaurant and retail business.",
    image: "/Daash image preview.png",
    icon: "/Daash app icon.png",
    badge: "₦8.7B+ transaction value",
    confidential: true,
    liveUrl: "https://daashapp.co/",
    slideFit: "contain",
    slides: [
      "/Daash image preview.png",
      "/Daash slide - 1.png",
      "/Daash slide - 2.png",
      "/Daash slide - 3.png",
      "/Daash slide - 4.png",
    ],
  },
  {
    name: "GoSource",
    description: "Shop grocery items for businesses.",
    image: "/GoSource image preview.png",
    icon: "/GoSource app icon.png",
    confidential: true,
    liveUrl: "https://gosource.app/",
  },
  {
    name: "Lovebox",
    description: "Sharing cards and gifts made easy.",
    image: "/Lovebox image preview.png",
    icon: "/Lovebox app icon.png",
    badge: "15,000+ cards sent",
    confidential: true,
    liveUrl: "https://lovebox.africa/",
    slides: [
      "/Lovebox image preview.png",
      "/Lovebox slide - 1.png",
      "/Lovebox slide - 2.png",
      "/Lovebox slide - 3.png",
      "/Lovebox slide - 4.png",
    ],
  },
  {
    name: "Remita",
    description: "Easy payment for everyone, everywhere.",
    image: "/Remita image preview.png",
    icon: "/Remita app icon.png",
    confidential: true,
    liveUrl: "https://www.remita.net/",
    slides: [
      "/Remita image preview.png",
      "/Remita slide - 1.png",
      "/Remita slide - 2.png",
    ],
  },
];

export function ProjectGrid() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <>
      <section className="grid grid-cols-1 gap-x-[20px] gap-y-[40px] sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.name}
            project={project}
            delay={CARD_BASE_DELAY + i * 60}
            onClick={() => setActiveProject(project)}
          />
        ))}
      </section>

      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </>
  );
}
