import { FaWhatsapp } from "react-icons/fa";
import { site } from "@/data/site";

export function WhatsAppButton() {
  return (
    <a
      href={site.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom))] left-3 z-[9999] sm:bottom-6 sm:left-6"
    >
      {/* Pulse Ring */}
      <span className="absolute inset-0 animate-ping rounded-full bg-green-500 opacity-30"></span>

      {/* Button */}
      <div className="relative flex h-11 w-11 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#25D366] shadow-[0_10px_30px_rgba(37,211,102,0.45)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_15px_40px_rgba(37,211,102,0.6)]">
        <FaWhatsapp className="text-2xl text-white sm:text-3xl" />
      </div>

      {/* Tooltip */}
      <div className="pointer-events-none absolute left-20 top-1/2 hidden sm:block -translate-y-1/2 rounded-full border border-white/10 bg-[var(--abyss)]/95 px-4 py-2 text-sm text-white opacity-0 shadow-xl backdrop-blur transition-all duration-300 group-hover:opacity-100">
        Chat with us
      </div>
    </a>
  );
}
