const steps = [
  {
    title: "Product discovery",
    description:
      "I hop on a quick product discovery call to understand the problem, product and the business goals.",
  },
  {
    title: "Research",
    description:
      "After aligning on the product goals, I would do some user research and also check out competitors if any.",
  },
  {
    title: "Moodboarding",
    description:
      "I explore various design solutions and inspiration, to understand which suits the stakeholder the most.",
  },
  {
    title: "Design system",
    description:
      "I have a bespoke design system which I tweak to suits specifically every product I work on.",
  },
  {
    title: "Collaborative design",
    description:
      "At every step of designing the product, the stakeholder is always carried along with weekly review calls.",
  },
  {
    title: "Collaborative hand-off",
    description:
      "I work closely with developers to ensure the development is aligned with the business goal, even after launch.",
  },
];

export function DesignProcess() {
  return (
    <section className="mx-auto w-[90%] pt-16 md:w-[80%] md:pt-24">
      <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-muted">
        My design process
      </p>
      <h2 className="mt-3 text-[28px] font-semibold leading-[36px] tracking-[-0.02em] text-foreground md:text-[40px] md:leading-[48px]">
        I follow a non-linear approach for each
        <br className="hidden md:block" />
        {" "}product. It typically looks like this:
      </h2>
      <div className="mt-10 grid grid-cols-1 gap-y-8 md:mt-12 md:grid-cols-3 md:gap-x-16 md:gap-y-10">
        {steps.map((step) => (
          <div key={step.title}>
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
