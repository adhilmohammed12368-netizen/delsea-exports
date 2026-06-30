// src/components/markets/ExportStats.tsx
import { motion } from "framer-motion";
import { Ship as ShipIcon, Globe2, MapPin } from "lucide-react";
import type { Continent } from "./data";

interface ExportStatsProps {
  continent: Continent;
  staggerKey: string | number;
}

export function ExportStats({ continent, staggerKey }: ExportStatsProps) {
  const stats = [
    {
      icon: MapPin,
      label: "Countries",
      value: String(continent.countries.length),
    },
    {
      icon: ShipIcon,
      label: continent.stat.label,
      value: continent.stat.value,
    },
    {
      icon: Globe2,
      label: "Active Routes",
      value: String(continent.countries.length),
    },
  ];

  return (
    <div key={staggerKey} className="grid grid-cols-3 gap-2.5 sm:gap-3">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.05 + i * 0.07, ease: "easeOut" }}
          className="flex flex-col items-center gap-1 rounded-xl border border-[#D4A24C]/20 bg-gradient-to-b from-white/[0.05] to-transparent px-2 py-3 text-center"
        >
          <stat.icon className="h-4 w-4 text-[#D4A24C]" strokeWidth={1.75} aria-hidden="true" />
          <span className="font-['Cormorant_Garamond'] text-xl font-semibold leading-none text-[#F0E6D2] sm:text-2xl">
            {stat.value}
          </span>
          <span className="font-['DM_Sans'] text-[10px] uppercase tracking-wide text-[#A9BFC9] sm:text-[11px]">
            {stat.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}