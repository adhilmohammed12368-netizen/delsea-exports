import { createFileRoute } from "@tanstack/react-router";
import { AboutSection } from "@/components/sections/about-section";
//import { DirectorsGrid } from "@/components/sections/directors-grid";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { SustainabilityPillars } from "@/components/sections/sustainability-pillars";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Delsea Exports | A decade on the Arabian Sea" },
      { name: "description", content: "Founded in 2013 on Kerala's historic port of Kochi, Delsea Exports has grown into one of India's most trusted seafood exporters." },
      { property: "og:title", content: "About — Delsea Exports" },
      { property: "og:description", content: "A decade of trust, delivered in every shipment." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="pt-24 md:pt-28">
      <AboutSection />
      <ProcessTimeline />
      <SustainabilityPillars />
    </div>
  );
}
