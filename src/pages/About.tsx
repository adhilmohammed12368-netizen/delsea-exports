import { AboutSection } from "@/components/sections/about-section";
import { DirectorsGrid } from "@/components/sections/directors-grid";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { SustainabilityPillars } from "@/components/sections/sustainability-pillars";
import { Seo } from "@/components/Seo";

export default function About() {
  return (
    <div className="pt-24 md:pt-28">
      <Seo
        title="About — Delsea Exports | A decade on the Arabian Sea"
        description="Founded in 2013 on Kerala's historic port of Kochi, Delsea Exports has grown into one of India's most trusted seafood exporters."
        ogTitle="About — Delsea Exports"
        ogDescription="A decade of trust, delivered in every shipment."
        ogUrl="/about"
      />
      <AboutSection />
      <DirectorsGrid />
      <ProcessTimeline />
      <SustainabilityPillars />
    </div>
  );
}
