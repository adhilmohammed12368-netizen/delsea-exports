import logo from "@/assets/delsea-logo.png";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <img
      src={logo}
      alt="Delsea Exports"
      className={`h-12 md:h-14 w-auto ${className}`}
    />
  );
}