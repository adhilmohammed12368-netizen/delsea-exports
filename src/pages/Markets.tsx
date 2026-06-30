import { MarketsMap } from "@/components/sections/markets-map";
import { Seo } from "@/components/Seo";

export default function Markets() {
  return (
    <div className="pt-24 md:pt-28">
      <Seo
        title="Export Markets — Delsea Exports | Europe · Middle East · Asia · North America"
        description="Weekly reefer dispatches from Cochin Port to retailers, hotels and distributors across four continents."
        ogTitle="Export Markets — Delsea Exports"
        ogDescription="From Kochi to four continents."
        ogUrl="/markets"
      />
      <MarketsMap />
    </div>
  );
}
