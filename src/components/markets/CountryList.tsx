// src/components/markets/CountryList.tsx
import { motion } from "framer-motion";
import type { ExportCountry } from "./data";

interface CountryListProps {
  countries: ExportCountry[];
  /** unique key root, used to stagger re-entrance per slide */
  staggerKey: string | number;
}

/** Renders a small flag using the Unicode regional indicator trick — no image assets required */
function flagEmoji(code: string): string {
  return code
    .toUpperCase()
    .split("")
    .map((c) => String.fromCodePoint(127397 + c.charCodeAt(0)))
    .join("");
}

export function CountryList({ countries, staggerKey }: CountryListProps) {
  return (
    <ul
      key={staggerKey}
      className="grid grid-cols-1 gap-2 sm:grid-cols-2"
      role="list"
      aria-label="Export destinations"
    >
      {countries.map((country, i) => (
        <motion.li
          key={country.code}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: 0.15 + i * 0.05, ease: "easeOut" }}
          className="flex items-center gap-2.5 rounded-lg border border-[#D4A24C]/15 bg-white/[0.03] px-3 py-2.5 backdrop-blur-sm transition-colors hover:border-[#D4A24C]/35 hover:bg-white/[0.06]"
        >
          <span className="text-lg leading-none" aria-hidden="true">
            {flagEmoji(country.code)}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate font-['DM_Sans'] text-sm font-medium text-[#F0E6D2]">
              {country.name}
            </span>
            {country.note && (
              <span className="block truncate font-['DM_Sans'] text-[11px] text-[#A9BFC9]">
                {country.note}
              </span>
            )}
          </span>
        </motion.li>
      ))}
    </ul>
  );
}