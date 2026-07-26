import { GraduationCap, Video, Eye, Briefcase, Code2 } from "lucide-react";
import { FaYoutube } from "react-icons/fa";
import { STATS } from "@/lib/links";

const icons = [GraduationCap, FaYoutube, Video, Eye, Briefcase, Code2];
const iconColors = ["#2563EB", "#C8102E", "#2563EB", "#C8102E", "#FF9900", "#7C3AED"];

export default function Stats() {
  return (
    <section className="mx-auto max-w-7xl px-6">
      <div className="grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-card/60 p-6 sm:grid-cols-3 lg:grid-cols-6">
        {STATS.map((stat, i) => {
          const Icon = icons[i];
          return (
            <div key={stat.label} className="flex flex-col items-center gap-2 text-center">
              <Icon size={26} color={iconColors[i]} />
              <p className="text-2xl font-extrabold text-white">{stat.value}</p>
              <p className="text-xs text-grey">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
