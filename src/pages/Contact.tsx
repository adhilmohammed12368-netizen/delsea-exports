import { ContactBlock } from "@/components/sections/contact-block";
import { Seo } from "@/components/Seo";

export default function Contact() {
  return (
    <div className="pt-28 md:pt-36">
      <Seo
        title="Contact — Delsea Exports | Request a Quote"
        description="Tell us what you need — species, forms, volumes, destination — and our export team will reply within one business day."
        ogTitle="Contact — Delsea Exports"
        ogDescription="Start a conversation with our export team."
        ogUrl="/contact"
      />
      <ContactBlock />
    </div>
  );
}
