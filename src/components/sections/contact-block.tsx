import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { Mail, MapPin, MessageCircle, Phone, Send, Check } from "lucide-react";
import { site } from "@/data/site";
import { products } from "@/data/products";
import emailjs from "@emailjs/browser";

const schema = z.object({
  name: z.string().trim().min(1, "Required").max(100),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  country: z.string().trim().min(1, "Required").max(80),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  product: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().min(10, "A short note helps us reply faster").max(1500),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

export function ContactBlock({ compact = false }: { compact?: boolean }) {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd) as Record<string, string>;
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Errors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof Errors;
        if (!errs[k]) errs[k] = issue.message;
      }
      setErrors(errs);
      return;
    }
    try {
      setSubmitting(true);

      await emailjs.send(
        "service_24fys1f",
        "template_ekbmrqh",
        {
          name: data.name,
          company: data.company,
          country: data.country,
          email: data.email,
          phone: data.phone,
          product: data.product,
          message: data.message,
        },
        "Q0X5sQwDq4GS3M0k0"
      );

      setSent(true);
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Failed to send enquiry");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={`${compact ? "" : "section-y"} bg-background`} id="contact">
      <div className="container-x">
        {!compact && (
          <div className="max-w-2xl">
            <p className="text-eyebrow text-muted-foreground">08 — Get in touch</p>
            <h2 className="text-display-2 mt-4">
              Start a <span className="italic text-[var(--gold)]">conversation.</span>
            </h2>
            <p className="mt-5 text-muted-foreground">
              Tell us what you need — species, forms, volumes, destination — and our export team will reply within one business day.
            </p>
          </div>
        )}

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="min-w-0 rounded-2xl border border-foreground/10 bg-card p-6 md:p-10"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field name="name" label="Name" error={errors.name} required />
              <Field name="company" label="Company" error={errors.company} />
              <Field name="country" label="Country" error={errors.country} required />
              <Field name="email" label="Email" type="email" error={errors.email} required />
              <Field name="phone" label="Phone" error={errors.phone} />
              <div className="min-w-0">
                <label className="text-eyebrow text-muted-foreground" htmlFor="product">Product Interest</label>
                <select
                  id="product"
                  name="product"
                  defaultValue=""
                  className="mt-2 h-12 w-full rounded-xl border border-foreground/15 bg-background px-4 text-sm outline-none transition focus:border-[var(--gold)]"
                >
                  <option value="">Select species (optional)</option>
                  {products.map((p) => (
                    <option key={p.slug} value={p.name}>{p.name}</option>
                  ))}
                  <option value="Other">Other / Mixed</option>
                </select>
              </div>
            </div>

            <div className="mt-5">
              <label className="text-eyebrow text-muted-foreground" htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Volumes, forms, destination port…"
                className="mt-2 w-full rounded-xl border border-foreground/15 bg-background p-4 text-sm outline-none transition focus:border-[var(--gold)]"
              />
              {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-muted-foreground">We reply within one business day.</p>
              <button
                type="submit"
                disabled={submitting || sent}
                className="inline-flex h-12 min-w-[10rem] items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition disabled:opacity-70"
              >
                {sent ? (
                  <><Check className="h-4 w-4" /> Sent</>
                ) : submitting ? (
                  <>Sending…</>
                ) : (
                  <>Send inquiry <Send className="h-4 w-4" /></>
                )}
              </button>
            </div>
          </motion.form>

          <div className="space-y-3">
            <ContactChip icon={<MapPin className="h-4 w-4" />} title="Visit" body={site.address} />
            <ContactChip icon={<Mail className="h-4 w-4" />} title="Email" body={site.email} href={`mailto:${site.email}`} />
            <ContactChip icon={<Phone className="h-4 w-4" />} title="Phone" body={site.phone} href={`tel:${site.phone.replace(/\s/g, "")}`} />
            <ContactChip icon={<MessageCircle className="h-4 w-4" />} title="WhatsApp" body="Message our export desk" href={site.whatsappUrl} />
            <div className="overflow-hidden rounded-2xl border border-foreground/10">
              <iframe
                title="Delsea Exports — Kochi"
                src="https://www.google.com/maps?q=Kochi%2C%20Kerala%2C%20India&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block aspect-[4/3] w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  error,
}: { name: string; label: string; type?: string; required?: boolean; error?: string }) {
  return (
    <div className="min-w-0">
      <label className="text-eyebrow text-muted-foreground" htmlFor={name}>
        {label}{required && <span className="ml-1 text-[var(--gold)]">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        maxLength={255}
        className="mt-2 h-12 w-full rounded-xl border border-foreground/15 bg-background px-4 text-sm outline-none transition focus:border-[var(--gold)]"
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function ContactChip({ icon, title, body, href }: { icon: React.ReactNode; title: string; body: string; href?: string }) {
  const inner = (
    <div className="group flex min-w-0 items-start gap-4 rounded-2xl border border-foreground/10 bg-card p-5 transition-colors hover:border-foreground/30">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-foreground/5 text-foreground/80">{icon}</span>
      <div className="min-w-0">
        <p className="text-eyebrow text-muted-foreground">{title}</p>
        <p className="mt-1 break-words text-sm text-foreground">{body}</p>
      </div>
    </div>
  );
  if (href) return <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{inner}</a>;
  return inner;
}
