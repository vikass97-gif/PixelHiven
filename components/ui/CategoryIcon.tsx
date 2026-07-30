import {
  LayoutGrid,
  BookOpen,
  Code2,
  Sparkles,
  Palette,
  GraduationCap,
  Folder,
} from "lucide-react";

interface CategoryIconProps {
  slug: string;
  size?: "sm" | "md" | "lg";
}

const iconMap = {
  templates: {
    Icon: LayoutGrid,
    gradient: "from-indigo-500 via-indigo-600 to-purple-600",
    shadow: "shadow-indigo-500/30",
    glow: "bg-indigo-500/20",
  },
  ebooks: {
    Icon: BookOpen,
    gradient: "from-sky-400 via-blue-500 to-indigo-600",
    shadow: "shadow-sky-500/30",
    glow: "bg-sky-500/20",
  },
  "source-code": {
    Icon: Code2,
    gradient: "from-emerald-400 via-teal-500 to-cyan-600",
    shadow: "shadow-emerald-500/30",
    glow: "bg-emerald-500/20",
  },
  "ai-prompts": {
    Icon: Sparkles,
    gradient: "from-amber-400 via-orange-500 to-red-500",
    shadow: "shadow-amber-500/30",
    glow: "bg-amber-500/20",
  },
  graphics: {
    Icon: Palette,
    gradient: "from-rose-400 via-pink-500 to-purple-600",
    shadow: "shadow-rose-500/30",
    glow: "bg-rose-500/20",
  },
  courses: {
    Icon: GraduationCap,
    gradient: "from-violet-400 via-purple-500 to-fuchsia-600",
    shadow: "shadow-violet-500/30",
    glow: "bg-violet-500/20",
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
      {/* Halo lumineux 3D en arrière-plan */}
      <div
        className={`absolute -inset-1 rounded-2xl ${config.glow} blur-lg transition-all duration-300 group-hover:blur-xl opacity-70 group-hover:opacity-100`}
      />

      {/* Badge 3D Effet Verre & Dégradé */}
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
