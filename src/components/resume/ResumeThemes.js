// Multi-tone coordinated color palettes for resume templates
// Ensures no repetitive single colors across headings, badges, and accents

export const RESUME_THEMES = [
  {
    id: "om-navy",
    name: "Operating Media Navy",
    primary: "#003873",
    secondary: "#0284c7",
    accent: "#f59e0b",
    lightBg: "#f0f7ff",
    border: "#bae6fd",
    gradient: "from-[#003873] to-[#0284c7]",
    badgeBg: "#e0f2fe",
    badgeText: "#0369a1",
  },
  {
    id: "emerald-teal",
    name: "Emerald & Teal",
    primary: "#064e3b",
    secondary: "#0d9488",
    accent: "#10b981",
    lightBg: "#f0fdf4",
    border: "#a7f3d0",
    gradient: "from-[#064e3b] to-[#0d9488]",
    badgeBg: "#dcfce7",
    badgeText: "#15803d",
  },
  {
    id: "royal-indigo",
    name: "Royal Indigo & Plum",
    primary: "#312e81",
    secondary: "#7c3aed",
    accent: "#ec4899",
    lightBg: "#f5f3ff",
    border: "#ddd6fe",
    gradient: "from-[#312e81] to-[#7c3aed]",
    badgeBg: "#ede9fe",
    badgeText: "#6d28d9",
  },
  {
    id: "crimson-ruby",
    name: "Crimson & Rose",
    primary: "#881337",
    secondary: "#be123c",
    accent: "#f43f5e",
    lightBg: "#fff1f2",
    border: "#fecdd3",
    gradient: "from-[#881337] to-[#be123c]",
    badgeBg: "#ffe4e6",
    badgeText: "#be123c",
  },
  {
    id: "charcoal-gold",
    name: "Charcoal & Bronze",
    primary: "#18181b",
    secondary: "#71717a",
    accent: "#d97706",
    lightBg: "#fafafa",
    border: "#e4e4e7",
    gradient: "from-[#18181b] to-[#3f3f46]",
    badgeBg: "#f4f4f5",
    badgeText: "#27272a",
  },
  {
    id: "ocean-cyan",
    name: "Ocean & Cyan",
    primary: "#0e7490",
    secondary: "#0369a1",
    accent: "#06b6d4",
    lightBg: "#ecfeff",
    border: "#a5f3fc",
    gradient: "from-[#0e7490] to-[#0369a1]",
    badgeBg: "#cffafe",
    badgeText: "#0891b2",
  },
];

export const getThemeById = (themeId, customColor = null) => {
  if (themeId === "custom" && customColor) {
    return {
      id: "custom",
      name: "Custom Theme",
      primary: customColor,
      secondary: adjustColorBrightness(customColor, 30),
      accent: adjustColorBrightness(customColor, -20),
      lightBg: adjustColorBrightness(customColor, 85),
      border: adjustColorBrightness(customColor, 60),
      gradient: "from-slate-800 to-slate-900",
      badgeBg: adjustColorBrightness(customColor, 80),
      badgeText: customColor,
    };
  }
  return RESUME_THEMES.find((t) => t.id === themeId) || RESUME_THEMES[0];
};

function adjustColorBrightness(hex, percent) {
  let num = parseInt(hex.replace("#", ""), 16);
  let amt = Math.round(2.55 * percent);
  let R = (num >> 16) + amt;
  let B = ((num >> 8) & 0x00ff) + amt;
  let G = (num & 0x0000ff) + amt;
  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
      (G < 255 ? (G < 1 ? 0 : G) : 255)
    )
      .toString(16)
      .slice(1)
  );
}
