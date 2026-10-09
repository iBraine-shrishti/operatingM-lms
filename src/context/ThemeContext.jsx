import React, { createContext, useContext, useState, useLayoutEffect, useEffect } from "react";

const ThemeContext = createContext(undefined);
const THEME_STORAGE_KEY = "om_lms_theme";

// Helper to disable transitions across all DOM elements during theme switch
// Eliminates the staggered/delayed "time difference" between components when toggling dark/light theme
const disableTransitionsTemporarily = () => {
  const css = document.createElement("style");
  css.setAttribute("id", "theme-transition-blocker");
  css.appendChild(
    document.createTextNode(
      `*, *::before, *::after {
        -webkit-transition: none !important;
        -moz-transition: none !important;
        -o-transition: none !important;
        -ms-transition: none !important;
        transition: none !important;
      }`
    )
  );
  document.head.appendChild(css);

  return () => {
    // Force a restyle / reflow so all new theme properties are committed synchronously without transition
    (() => window.getComputedStyle(document.body).opacity)();

    // Re-enable normal interactive hover transitions on the next animation frames
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const el = document.getElementById("theme-transition-blocker");
        if (el) {
          el.remove();
        }
      });
    });
  };
};

const applyThemeToDOM = (themeMode) => {
  const root = document.documentElement;
  if (themeMode === "dark") {
    root.classList.add("dark");
    root.style.colorScheme = "dark";
  } else {
    root.classList.remove("dark");
    root.style.colorScheme = "light";
  }
  try {
    localStorage.setItem(THEME_STORAGE_KEY, themeMode);
  } catch (e) {}
};

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === "light" || stored === "dark") return stored;
    } catch (e) {}
    // Default to dark theme as requested
    return "dark";
  });

  // Apply theme immediately to DOM on mount before first paint
  useLayoutEffect(() => {
    applyThemeToDOM(theme);
  }, []);

  const setTheme = (newTheme) => {
    const nextTheme = typeof newTheme === "function" ? newTheme(theme) : newTheme;
    if (nextTheme !== "light" && nextTheme !== "dark") return;

    // 1. Block transitions across all elements
    const restoreTransitions = disableTransitionsTemporarily();

    // 2. Apply theme directly to DOM synchronously
    applyThemeToDOM(nextTheme);

    // 3. Update React state
    setThemeState(nextTheme);

    // 4. Restore hover transitions after synchronous repaint
    restoreTransitions();
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const isDark = theme === "dark";

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: "dark",
      isDark: true,
      toggleTheme: () => {},
      setTheme: () => {},
    };
  }
  return context;
};
