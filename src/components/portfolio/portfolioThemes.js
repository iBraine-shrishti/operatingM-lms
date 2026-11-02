// Dynamic Theme Palettes for Student Portfolio Builder
// Prevents repetitive colors across graduating student cohorts

export const PORTFOLIO_THEMES = [
  {
    id: "amber-slate",
    name: "Classic Amber & Slate",
    primary: "#f59e0b", // Amber 500
    primaryHover: "#d97706",
    primaryBg: "bg-amber-400",
    primaryText: "text-amber-500",
    primaryBorder: "border-amber-400",
    secondary: "#0f172a", // Slate 900
    accent: "#38bdf8", // Sky
    surfaceBg: "#f8fafc",
    badgeBg: "bg-amber-50 text-amber-800 border-amber-200",
    heroGradient: "from-slate-900 via-slate-800 to-slate-950",
    navActive: "border-amber-500 text-amber-600 bg-amber-50/50",
  },
  {
    id: "emerald-pine",
    name: "Emerald Growth & ROI",
    primary: "#10b981", // Emerald 500
    primaryHover: "#059669",
    primaryBg: "bg-emerald-500",
    primaryText: "text-emerald-500",
    primaryBorder: "border-emerald-500",
    secondary: "#064e3b", // Deep Pine
    accent: "#f59e0b",
    surfaceBg: "#f0fdf4",
    badgeBg: "bg-emerald-50 text-emerald-800 border-emerald-200",
    heroGradient: "from-emerald-950 via-slate-900 to-teal-950",
    navActive: "border-emerald-500 text-emerald-600 bg-emerald-50/50",
  },
  {
    id: "royal-indigo",
    name: "Royal Indigo & Tech",
    primary: "#6366f1", // Indigo 500
    primaryHover: "#4f46e5",
    primaryBg: "bg-indigo-600",
    primaryText: "text-indigo-600",
    primaryBorder: "border-indigo-500",
    secondary: "#1e1b4b", // Deep Indigo
    accent: "#ec4899", // Pink
    surfaceBg: "#f5f3ff",
    badgeBg: "bg-indigo-50 text-indigo-800 border-indigo-200",
    heroGradient: "from-indigo-950 via-slate-900 to-slate-950",
    navActive: "border-indigo-600 text-indigo-600 bg-indigo-50/50",
  },
  {
    id: "cyber-cyan",
    name: "Electric Cyan & AI",
    primary: "#06b6d4", // Cyan 500
    primaryHover: "#0891b2",
    primaryBg: "bg-cyan-500",
    primaryText: "text-cyan-500",
    primaryBorder: "border-cyan-400",
    secondary: "#083344", // Deep Cyan
    accent: "#8b5cf6", // Violet
    surfaceBg: "#ecfeff",
    badgeBg: "bg-cyan-50 text-cyan-800 border-cyan-200",
    heroGradient: "from-slate-950 via-cyan-950 to-slate-900",
    navActive: "border-cyan-500 text-cyan-700 bg-cyan-50/50",
  },
  {
    id: "sunset-crimson",
    name: "Sunset Crimson & Creative",
    primary: "#f43f5e", // Rose 500
    primaryHover: "#e11d48",
    primaryBg: "bg-rose-500",
    primaryText: "text-rose-500",
    primaryBorder: "border-rose-400",
    secondary: "#4c0519", // Deep Rose
    accent: "#fb923c", // Orange
    surfaceBg: "#fff1f2",
    badgeBg: "bg-rose-50 text-rose-800 border-rose-200",
    heroGradient: "from-rose-950 via-slate-900 to-slate-950",
    navActive: "border-rose-500 text-rose-600 bg-rose-50/50",
  },
  {
    id: "obsidian-gold",
    name: "Obsidian Executive & Gold",
    primary: "#d97706", // Gold / Amber 600
    primaryHover: "#b45309",
    primaryBg: "bg-amber-500",
    primaryText: "text-amber-600",
    primaryBorder: "border-amber-500",
    secondary: "#18181b", // Zinc 900
    accent: "#10b981",
    surfaceBg: "#fafaf9",
    badgeBg: "bg-amber-50 text-amber-900 border-amber-300",
    heroGradient: "from-zinc-950 via-stone-900 to-black",
    navActive: "border-amber-600 text-amber-700 bg-amber-50/50",
  },
];

export const getThemeById = (themeId) => {
  return (
    PORTFOLIO_THEMES.find((t) => t.id === themeId) || PORTFOLIO_THEMES[0]
  );
};
