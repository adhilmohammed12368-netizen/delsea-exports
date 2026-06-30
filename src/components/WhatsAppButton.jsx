import { FaWhatsapp } from "react-icons/fa";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919447051504"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-6 left-6 z-[9999]"
    >
      {/* Pulse Ring */}
      <span className="absolute inset-0 animate-ping rounded-full bg-green-500 opacity-30"></span>

      {/* Button */}
      <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] shadow-[0_10px_30px_rgba(37,211,102,0.45)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_15px_40px_rgba(37,211,102,0.6)]">
        <FaWhatsapp className="text-3xl text-white" />
      </div>

      {/* Tooltip */}
      <div className="pointer-events-none absolute left-20 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-[var(--abyss)]/95 px-4 py-2 text-sm text-white opacity-0 shadow-xl backdrop-blur transition-all duration-300 group-hover:opacity-100">
        Chat with us
      </div>
    </a>
  );
}