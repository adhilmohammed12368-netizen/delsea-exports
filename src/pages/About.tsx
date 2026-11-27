import { AboutSection } from "@/components/sections/about-section";
import { DirectorsGrid } from "@/components/sections/directors-grid";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { SustainabilityPillars } from "@/components/sections/sustainability-pillars";
import { InfrastructureGallery } from "@/components/sections/infrastructure-gallery";
import { Seo } from "@/components/Seo";

export default function About() {
  return (
    <div className="pt-24 md:pt-28">
      <Seo
        title="About — Delsea Exports | A decade on the Arabian Sea"
        description="Learn about Delsea Exports, its seafood processing facility, quality control and export operations in Kochi, Kerala."
        ogTitle="About — Delsea Exports"
        ogDescription="A decade of trust, delivered in every shipment."
        ogUrl="/about"
      />
      <AboutSection />
      <InfrastructureGallery />
      <DirectorsGrid />
      <ProcessTimeline />
      <SustainabilityPillars />
    </div>
  );
}
