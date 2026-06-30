// src/components/markets/PaginationDots.tsx
import { motion } from "framer-motion";

interface PaginationDotsProps {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
  labels?: string[];
}

export function PaginationDots({ count, activeIndex, onSelect, labels }: PaginationDotsProps) {
  return (
    <div
      className="flex items-center justify-center gap-2.5"
      role="tablist"
      aria-label="Continent slides"
    >
      {Array.from({ length: count }).map((_, i) => {
        const isActive = i === activeIndex;
        return (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={labels?.[i] ? `Go to ${labels[i]}` : `Go to slide ${i + 1}`}
            onClick={() => onSelect(i)}
            className="group relative flex h-11 w-11 items-center justify-center touch-manipulation"
          >
            <span
              className={[
                "relative block rounded-full transition-all duration-300",
                isActive ? "h-2.5 w-7" : "h-2.5 w-2.5 group-hover:bg-[#D4A24C]/50",
                isActive ? "bg-[#D4A24C]" : "bg-[#D4A24C]/25",
              ].join(" ")}
            >
              {isActive && (
                <motion.span
                  layoutId="pagination-glow"
                  className="absolute inset-0 rounded-full bg-[#D4A24C]"
                  style={{ filter: "blur(6px)", opacity: 0.6 }}
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}