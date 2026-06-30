// src/components/markets/ContinentCard.tsx
import { motion } from "framer-motion";
import type { Continent } from "./data";
import { ExportStats } from "./ExportStats";
import { CountryList } from "./CountryList";

interface ContinentCardProps {
  continent: Continent;
  index: number;
  totalCount: number;
}


export function ContinentCard({ continent, index, totalCount }: ContinentCardProps) {
    const isMobile =
  typeof window !== "undefined" && window.innerWidth < 768;

const visibleCountries = isMobile
  ? continent.countries.slice(0, 5)
  : continent.countries;
  return (
    <div className="flex h-full w-full flex-col px-1 pb-1 pt-3 sm:px-2 sm:pt-4">
      {/* heading */}
      <div className="mb-4 flex items-start justify-between gap-3 px-3 sm:px-2">
        <div>
          <motion.span
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="mb-1 block font-['DM_Sans'] text-[11px] font-medium uppercase tracking-[0.18em] text-[#D4A24C]"
          >
            Export Region {index + 1} / {totalCount}
          </motion.span>
          <motion.h3
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
            className="font-['Cormorant_Garamond'] text-3xl font-semibold leading-tight text-[#F0E6D2] sm:text-4xl"
          >
            {continent.name}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
            className="mt-1 font-['DM_Sans'] text-sm text-[#A9BFC9]"
          >
            {continent.tagline}
          </motion.p>
        </div>
      </div>

      {/* stats row */}
      <div className="mb-4 px-3 sm:px-2">
        <ExportStats continent={continent} staggerKey={continent.id} />
      </div>

      {/* country list, scrollable if it overflows on small screens */}
      <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-2 sm:px-2 [-webkit-overflow-scrolling:touch] [scrollbar-width:thin]">
       <CountryList
  countries={visibleCountries}
  staggerKey={continent.id}
/>

{isMobile && continent.countries.length > 5 && (
  <button
    className="mt-4 w-full rounded-xl border border-[#D4A24C]/30 py-3 text-sm font-medium text-[#D4A24C]"
  >
    + {continent.countries.length - 5} More Countries
  </button>
)}
      </div>
    </div>
  );
}