import { CertificationsRow } from "@/components/sections/certifications-row";
import { Seo } from "@/components/Seo";

export default function Certifications() {
  return (
    <div className="pt-24 md:pt-28">
      <Seo
        title="Certifications — Delsea Exports | BRCGS · ISO 22000 · HACCP · USFDA · SFDA · FSSAI"
        description="Explore our food safety certifications and regulatory registrations. Contact our export team for current documentation."
        ogTitle="Certifications — Delsea Exports"
        ogDescription="Audited. Verified. Trusted."
        ogUrl="/certifications"
      />
      <CertificationsRow />
    </div>
  );
}
