import { Header } from "@/components/header";
import { AvailabilityBar } from "@/components/availability-bar";
import { Hero } from "@/components/hero";
import { TrustBar } from "@/components/trust-bar";
import { ProjectGrid } from "@/components/project-grid";
import { UiShots } from "@/components/ui-shots";
import { DesignProcess } from "@/components/design-process";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />
      <AvailabilityBar />
      <main className="mx-auto w-[90%] pb-24 md:w-[80%]">
        <Hero />
        <TrustBar />
        <ProjectGrid />
      </main>
      <UiShots />
      <DesignProcess />
      <Footer />
    </div>
  );
}
