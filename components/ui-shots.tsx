"use client";

import Image from "next/image";

const images = [
  { src: "/images/Personal exploration/Updated homescreen 1.png", width: 640, height: 480 },
  { src: "/images/Personal exploration/image 6.png", width: 640, height: 480 },
  { src: "/images/Personal exploration/image 7.png", width: 640, height: 480 },
  { src: "/images/Personal exploration/image 8.png", width: 640, height: 480 },
  { src: "/images/Personal exploration/image 9.png", width: 640, height: 480 },
  { src: "/images/Personal exploration/image 10.png", width: 640, height: 480 },
  { src: "/images/Personal exploration/image 11.png", width: 640, height: 480 },
  { src: "/images/Personal exploration/image 12.png", width: 384, height: 480 },
  { src: "/images/Personal exploration/image 13.png", width: 384, height: 480 },
  { src: "/images/Personal exploration/image 14.png", width: 640, height: 480 },
];

export function UiShots() {
  const repeated = [...images, ...images];

  return (
    <section className="animate-in mt-16 md:mt-24" style={{ animationDelay: "700ms" }}>
      <div className="mx-auto w-[90%] md:w-[80%]">
        <p className="text-[12px] font-medium tracking-[0.1em] text-muted uppercase">
          UI Shots
        </p>
        <h2 className="mt-3 text-[28px] font-semibold leading-[36px] tracking-[-0.02em] text-foreground md:text-[40px] md:leading-[48px]">
          More of my personal
          <br />
          explorations
        </h2>
      </div>

      <div className="mt-10 overflow-hidden">
        <div className="flex w-max animate-scroll gap-5">
          {repeated.map((img, i) => (
            <div
              key={`${img.src}-${i}`}
              className="skeleton shrink-0 overflow-hidden rounded-[12px] h-[280px] md:h-[480px] md:rounded-[16px]"
              style={{ aspectRatio: `${img.width} / ${img.height}` }}
            >
              <Image
                src={img.src}
                alt="UI exploration"
                width={img.width}
                height={img.height}
                quality={75}
                loading={i < 4 ? "eager" : "lazy"}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
