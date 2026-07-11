import { Hero } from "@/components/sections/hero";
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
import { site } from "@/data/site";
import heroImage from "@/assets/hero-ocean.jpg";

export default function Home() {
  return (
    <>
      <Seo
        title={`${site.name} — ${site.tagline}`}
        description={site.description}
        ogUrl="/"
        ogImage={heroImage}
      />
      <Hero />
      <AboutSection />
      <ProductsShowcase />
      <MarketsMap />
      <CertificationsRow />
      <ProcessTimeline />
      <SustainabilityPillars />
      <ContactBlock />

      <WhatsAppButton />
    </>
  );
}
