import Image from "next/image";

const logos = [
  { name: "Cold Stone", src: "/Coldstone logo.png", height: 24, noFilter: true },
  { name: "Remita", src: "/Remita logo.png", height: 22 },
  { name: "Lovebox", src: "/Lovebox logo.png", height: 20 },
  { name: "GoSource", src: "/GoSource logo.png", height: 20 },
];

export function TrustBar() {
  return (
    <div className="mx-auto flex max-w-[720px] flex-col gap-4 pb-[100px]">
      <p className="animate-in text-[13px] text-muted" style={{ animationDelay: "340ms" }}>
        Trusted by teams & early stage startup across the globe
      </p>
      <div className="animate-in flex items-center gap-7" style={{ animationDelay: "400ms" }}>
        {logos.map((logo) => (
          <Image
            key={logo.name}
            src={logo.src}
            alt={logo.name}
            width={logo.height * 4}
            height={logo.height}
            className={logo.noFilter ? "" : "brightness-0 invert"}
            style={{ height: logo.height, width: "auto" }}
          />
        ))}
      </div>
    </div>
  );
}
