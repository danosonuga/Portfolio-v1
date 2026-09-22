const steps = [
  {
    title: "Understand",
    description:
      "Understand the user, business problem and constraints.",
  },
  {
    title: "Explore",
    description:
      "Research users, existing behaviour and competing solutions.",
  },
  {
    title: "Model",
    description:
      "Map the system, states, information architecture and edge cases.",
  },
  {
    title: "Design",
    description:
      "Develop and test solutions through prototypes and interaction design.",
  },
  {
    title: "Build",
    description:
      "Work closely with engineering to resolve implementation constraints.",
  },
  {
    title: "Learn",
    description:
      "Measure what shipped, observe behaviour and iterate.",
  },
];

export function DesignProcess() {
  return (
    <section className="mx-auto w-[90%] pt-16 md:w-[80%] md:pt-24">
      <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-muted">
        My design process
      </p>
      <h2 className="mt-3 text-[28px] font-semibold leading-[36px] tracking-[-0.02em] text-foreground md:text-[40px] md:leading-[48px]" style={{ textWrap: "balance" } as React.CSSProperties}>
        I follow a non-linear approach for each product. It typically looks like this:
      </h2>
      <div className="mt-10 grid grid-cols-1 gap-y-8 md:mt-12 md:grid-cols-3 md:gap-x-16 md:gap-y-10">
        {steps.map((step) => (
          <div key={step.title} className="min-[1440px]:max-w-[420px]">
            <h3 className="text-[14px] font-medium leading-[22px] text-foreground">
              {step.title}
            </h3>
            <p className="mt-2 text-[13px] leading-[20px] text-muted">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
