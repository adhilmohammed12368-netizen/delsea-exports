import { CertificationsRow } from "@/components/sections/certifications-row";
import { Seo } from "@/components/Seo";

export default function Certifications() {
  return (
    <div className="pt-24 md:pt-28">
      <Seo
        title="Certifications — Delsea Exports | BRCGS · ISO 22000 · HACCP · USFDA · SFDA · FSSAI"
        description="Six independent certifications govern how we source, process, freeze and ship — for the world's most regulated markets."
        ogTitle="Certifications — Delsea Exports"
        ogDescription="Audited. Verified. Trusted."
        ogUrl="/certifications"
      />
      <CertificationsRow />
    </div>
  );
}
