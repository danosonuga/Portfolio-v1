import Image from "next/image";

const navLinks = ["Home", "Work", "About", "UI shots"];

export function Header() {
  return (
    <header className="border-b border-[#1A1A1A]">
      <div className="animate-in mx-auto flex w-[80%] items-center justify-between py-4">
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
        <nav className="flex items-center gap-8">
          {navLinks.map((label) => (
            <span
              key={label}
              className={`cursor-pointer text-[14px] transition-colors hover:text-foreground ${label === "Home" ? "text-foreground" : "text-muted"}`}
            >
              {label}
            </span>
          ))}
        </nav>
      </div>
    </header>
  );
}
