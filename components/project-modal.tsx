"use client";

import Image from "next/image";
import { useEffect, useState, useCallback, useRef } from "react";
import type { Project } from "./project-card";

export function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasSlides = project.slides && project.slides.length > 1;

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(onClose, 200);
  }, [onClose]);

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
    if (project.video && videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  }, [project.video]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
      if (hasSlides && e.key === "ArrowRight") setSlideIndex((i) => (i === project.slides!.length - 1 ? 0 : i + 1));
      if (hasSlides && e.key === "ArrowLeft") setSlideIndex((i) => (i === 0 ? project.slides!.length - 1 : i - 1));
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleClose, hasSlides, project.slides]);

  const liveUrl = project.liveUrl;

  function renderBottomButtons() {
    return (
      <div className="relative flex shrink-0 items-center justify-center gap-3 px-6 py-4">
        <button className="flex items-center gap-2 rounded-full bg-[#4F4F4F] px-5 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-[#5a5a5a]">
          <Image src="/lock_filled.svg" alt="" width={12} height={12} />
          Read case study
        </button>
        {liveUrl ? (
          <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white px-5 py-2.5 text-[13px] font-medium text-[#0A0A0A] transition-opacity hover:opacity-90">
            Visit live site
          </a>
        ) : null}
        {hasSlides ? (
          <div className="absolute right-6 flex gap-2">
            {project.slides!.map((_, i) => (
              <button key={i} onClick={() => setSlideIndex(i)} className={`h-2 w-2 rounded-full transition-colors duration-200 ${i === slideIndex ? "bg-white" : "bg-white/30"}`} />
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  function renderMedia() {
    if (project.video) {
      return (
        <>
          <Image src={project.image} alt={project.name} fill sizes="1100px" className={`object-cover object-top ${isPlaying ? "invisible" : ""}`} />
          <video ref={videoRef} src={project.video} muted playsInline loop className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-200 ${isPlaying ? "opacity-100" : "opacity-0"}`} />
          <button onClick={togglePlayPause} className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20">
            <Image src={isPlaying ? "/pause_filled.svg" : "/play_filled.svg"} alt={isPlaying ? "Pause" : "Play"} width={14} height={14} />
          </button>
        </>
      );
    }
    if (hasSlides) {
      return (
        <div className="flex h-full transition-transform duration-500" style={{ width: `${project.slides!.length * 100}%`, transform: `translateX(-${slideIndex * (100 / project.slides!.length)}%)`, transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" }}>
          {project.slides!.map((slide) => (
            <div key={slide} className="relative h-full shrink-0" style={{ width: `${100 / project.slides!.length}%` }}>
              <Image src={slide} alt={project.name} fill sizes="1100px" className={`${project.slideFit === "contain" ? "object-contain" : "object-cover"} object-top`} />
            </div>
          ))}
        </div>
      );
    }
    return <Image src={project.image} alt={project.name} fill sizes="1100px" className="object-cover object-top" />;
  }

  function togglePlayPause() {
    if (!videoRef.current) return;
    if (isPlaying) { videoRef.current.pause(); setIsPlaying(false); }
    else { videoRef.current.play(); setIsPlaying(true); }
  }

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-200 ${isVisible ? "opacity-100" : "opacity-0"}`} onClick={handleClose}>
      <div className="absolute inset-0 bg-black/80" />
      <div className={`relative z-10 flex flex-col overflow-hidden rounded-[20px] bg-[#262627] transition-transform duration-300 ${isVisible ? "scale-100" : "scale-[0.97]"}`} style={{ width: "90vw", height: "90vh", transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" }} onClick={(e) => e.stopPropagation()}>
        <div className="flex shrink-0 items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Image src={project.icon} alt={`${project.name} icon`} width={36} height={36} className="rounded-lg" />
            <span className="text-[14px] font-semibold text-foreground">{project.name}</span>
          </div>
          <button onClick={handleClose} className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/10">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
        <div className="relative flex min-h-0 flex-1 items-center justify-center">
          {hasSlides && (
            <button onClick={() => setSlideIndex((i) => (i === 0 ? project.slides!.length - 1 : i - 1))} className="absolute left-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          )}
          <div className="skeleton relative mx-20 h-full w-full max-w-[1100px] overflow-hidden rounded-xl">
            {renderMedia()}
          </div>
          {hasSlides && (
            <button onClick={() => setSlideIndex((i) => (i === project.slides!.length - 1 ? 0 : i + 1))} className="absolute right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          )}
        </div>
        {renderBottomButtons()}
      </div>
    </div>
  );
}
