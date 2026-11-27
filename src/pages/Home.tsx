import { Hero } from "@/components/sections/hero";
import { InfrastructureGallery } from "@/components/sections/infrastructure-gallery";
import { AboutSection } from "@/components/sections/about-section";
import { ProductsShowcase } from "@/components/sections/products-showcase";
import { MarketsMap } from "@/components/sections/markets-map";
import { CertificationsRow } from "@/components/sections/certifications-row";
//import { DirectorsGrid } from "@/components/sections/directors-grid";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { SustainabilityPillars } from "@/components/sections/sustainability-pillars";
import { ContactBlock } from "@/components/sections/contact-block";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Seo } from "@/components/Seo";
import heroImage from "@/assets/hero-ocean.jpg";

export default function Home() {
  return (
    <>
      <Seo
        title="Delsea Exports | Frozen Seafood Processor & Exporter, India"
        description="Direct seafood processor and exporter in Kochi, India. Frozen hook-caught and net-caught ribbonfish, Thelly shrimp, baby octopus and leatherjacket."
        ogUrl="/"
        ogImage={heroImage}
      />
      <Hero />
      <ProductsShowcase />
      <AboutSection />
      <InfrastructureGallery />
      <ProcessTimeline />
      <CertificationsRow />
      <MarketsMap />
      <SustainabilityPillars />
      <ContactBlock />

      <WhatsAppButton />
    </>
  );
}
