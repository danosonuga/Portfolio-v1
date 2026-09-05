"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export interface Project {
  name: string;
  description: string;
  image: string;
  icon: string;
  badge?: string;
  confidential?: boolean;
  video?: string;
  slides?: string[];
  slideFit?: "contain" | "cover";
  liveUrl?: string;
}

export function ProjectCard({ project, delay = 0, onClick }: { project: Project; delay?: number; onClick?: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  const hasSlides = project.slides && project.slides.length > 1;

  function handleMouseEnter() {
    setIsHovered(true);
    if (project.video && videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  }

  function handleMouseLeave() {
    setIsHovered(false);
    if (project.video && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }

  function togglePlayPause(e: React.MouseEvent) {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  }

  function prevSlide(e: React.MouseEvent) {
    e.stopPropagation();
    setSlideIndex((i) => (i === 0 ? project.slides!.length - 1 : i - 1));
  }

  function nextSlide(e: React.MouseEvent) {
    e.stopPropagation();
    setSlideIndex((i) => (i === project.slides!.length - 1 ? 0 : i + 1));
  }

  return (
    <div className="animate-in group flex cursor-pointer flex-col gap-4" style={{ animationDelay: `${delay}ms` }} onClick={onClick}>
      <div
        className="relative aspect-square w-full overflow-hidden rounded-[24px] bg-[#1A1A1A] transition-colors duration-200 hover:bg-[#262627]"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-2">
          {project.confidential && (
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#4F4F4F]">
              <Image
                src="/lock_filled.svg"
                alt="Confidential"
                width={12}
                height={12}
              />
            </span>
          )}
          {project.badge && (
            <span className="rounded-full bg-[#4F4F4F] px-2.5 py-1 text-[11px] font-medium text-white">
              {project.badge}
            </span>
          )}
        </div>

        {project.video && isHovered && (
          <button
            onClick={togglePlayPause}
            className="absolute top-3.5 right-3.5 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-[#4F4F4F] transition-opacity duration-200"
          >
            <Image
              src={isPlaying ? "/pause_filled.svg" : "/play_filled.svg"}
              alt={isPlaying ? "Pause" : "Play"}
              width={12}
              height={12}
            />
          </button>
        )}

        {hasSlides && isHovered && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[#4F4F4F]/80 backdrop-blur-sm transition-opacity duration-200 hover:bg-[#4F4F4F]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[#4F4F4F]/80 backdrop-blur-sm transition-opacity duration-200 hover:bg-[#4F4F4F]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </>
        )}

        {hasSlides && isHovered && (
          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {project.slides!.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-full transition-colors duration-200 ${i === slideIndex ? "bg-white" : "bg-white/40"}`}
              />
            ))}
          </div>
        )}

        <div className="flex h-full items-center px-5">
          <div className="skeleton relative w-full overflow-hidden rounded-lg" style={{ aspectRatio: "16/10" }}>
            {hasSlides ? (
              <div
                className="flex h-full transition-transform duration-500"
                style={{
                  width: `${project.slides!.length * 100}%`,
                  transform: `translateX(-${slideIndex * (100 / project.slides!.length)}%)`,
                  transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
                }}
              >
                {project.slides!.map((slide) => (
                  <div
                    key={slide}
                    className="relative h-full shrink-0"
                    style={{ width: `${100 / project.slides!.length}%` }}
                  >
                    <Image
                      src={slide}
                      alt={project.name}
                      fill
                      sizes="(max-width: 768px) 80vw, 26vw"
                      className={`${project.slideFit === "contain" ? "object-contain" : "object-cover"} object-top`}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <>
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  sizes="(max-width: 768px) 80vw, 26vw"
                  className={`object-cover object-top ${project.video && isPlaying ? "invisible" : ""}`}
                />
                {project.video && (
                  <video
                    ref={videoRef}
                    src={project.video}
                    muted
                    playsInline
                    loop
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-200 ${isPlaying ? "opacity-100" : "opacity-0"}`}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Image
          src={project.icon}
          alt={`${project.name} icon`}
          width={48}
          height={48}
          className="rounded-xl"
        />
        <div className="flex flex-col gap-1.5">
          <h3 className="text-[14px] font-medium leading-[22px] text-foreground">
            {project.name}
          </h3>
          <p className="text-[14px] leading-[22px] text-muted">
            {project.description}
          </p>
        </div>
      </div>
    </div>
  );
}
