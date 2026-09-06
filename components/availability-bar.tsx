export function AvailabilityBar() {
  return (
    <div className="flex items-center justify-center bg-[#1A1A1A] px-5 py-2.5">
      <div className="animate-in flex items-center gap-2.5" style={{ animationDelay: "50ms" }}>
        <span className="rounded-full bg-white px-2.5 py-0.5 text-[12px] font-medium text-[#0A0A0A]">
          New
        </span>
        <span className="text-[13px] text-white">
          Open to full-time, contract, and freelance opportunities
        </span>
      </div>
    </div>
  );
}
