import {
  Laptop,
  FileText,
  Palette,
  ShieldCheck,
  Cpu,
  Tv,
  Folder,
} from "lucide-react";

interface CategoryIconProps {
  slug: string;
  size?: "sm" | "md" | "lg";
}

const iconMap = {
  "software-os": {
    Icon: Laptop,
    gradient: "from-blue-500 via-indigo-600 to-purple-600",
    shadow: "shadow-blue-500/30",
    glow: "bg-blue-500/20",
  },
  "office-productivity": {
    Icon: FileText,
    gradient: "from-amber-400 via-orange-500 to-red-500",
    shadow: "shadow-amber-500/30",
    glow: "bg-amber-500/20",
  },
  "design-creative": {
    Icon: Palette,
    gradient: "from-rose-400 via-pink-500 to-purple-600",
    shadow: "shadow-rose-500/30",
    glow: "bg-rose-500/20",
  },
  "security-antivirus": {
    Icon: ShieldCheck,
    gradient: "from-emerald-400 via-teal-500 to-cyan-600",
    shadow: "shadow-emerald-500/30",
    glow: "bg-emerald-500/20",
  },
  "ai-dev-tools": {
    Icon: Cpu,
    gradient: "from-violet-500 via-purple-600 to-indigo-700",
    shadow: "shadow-violet-500/30",
    glow: "bg-violet-500/20",
  },
  "subscriptions-media": {
    Icon: Tv,
    gradient: "from-sky-400 via-blue-500 to-indigo-600",
    shadow: "shadow-sky-500/30",
    glow: "bg-sky-500/20",
  },
};

export default function CategoryIcon({ slug, size = "md" }: CategoryIconProps) {
  const config = iconMap[slug as keyof typeof iconMap] || {
    Icon: Folder,
    gradient: "from-indigo-500 to-purple-600",
    shadow: "shadow-indigo-500/30",
    glow: "bg-indigo-500/20",
  };

  const IconComponent = config.Icon;

  const sizeClasses = {
    sm: "h-10 w-10 rounded-xl",
    md: "h-16 w-16 rounded-2xl",
    lg: "h-20 w-20 rounded-3xl",
  };

  const iconSizes = {
    sm: 20,
    md: 30,
    lg: 38,
  };

  return (
    <div className="relative inline-block">
      <div
        className={`absolute -inset-1 rounded-2xl ${config.glow} blur-lg transition-all duration-300 group-hover:blur-xl opacity-70 group-hover:opacity-100`}
      />
      <div
        className={`relative flex items-center justify-center bg-gradient-to-br ${config.gradient} ${sizeClasses[size]} shadow-lg ${config.shadow} ring-1 ring-white/30 border-t border-white/40 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1`}
      >
        <IconComponent
          size={iconSizes[size]}
          className="text-white drop-shadow-md"
          strokeWidth={2.2}
        />
      </div>
    </div>
  );
}
