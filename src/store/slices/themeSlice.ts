import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  isDark: boolean;
  themeSource: "light" | "dark" | "system";
  isSystemThemeListenerActive: boolean;
}

// Detect system theme preference
const detectSystemTheme = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

// Load initial theme from localStorage or system
const getInitialTheme = (): {
  isDark: boolean;
  themeSource: ThemeState["themeSource"];
} => {
  if (typeof window === "undefined")
    return { isDark: false, themeSource: "system" };

  const savedTheme = localStorage.getItem("theme");
  const savedSource = localStorage.getItem(
    "themeSource"
  ) as ThemeState["themeSource"];

  if (savedTheme) {
    return {
      isDark: savedTheme === "dark",
      themeSource: savedSource || "light",
    };
  }

  // If no saved theme, use system preference
  return {
    isDark: detectSystemTheme(),
    themeSource: "system",
  };
};

const initialState: ThemeState = {
  ...getInitialTheme(),
  isSystemThemeListenerActive: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDark = !state.isDark;
      state.themeSource = state.isDark ? "dark" : "light";
      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", state.isDark ? "dark" : "light");
        localStorage.setItem("themeSource", state.themeSource);
      }
    },
    setTheme: (
      state,
      action: PayloadAction<{
        isDark: boolean;
        source: ThemeState["themeSource"];
      }>
    ) => {
      state.isDark = action.payload.isDark;
      state.themeSource = action.payload.source;
      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", state.isDark ? "dark" : "light");
        localStorage.setItem("themeSource", state.themeSource);
      }
    },
    setSystemTheme: (state) => {
      if (typeof window !== "undefined") {
        state.isDark = detectSystemTheme();
        state.themeSource = "system";
        localStorage.setItem("theme", state.isDark ? "dark" : "light");
        localStorage.setItem("themeSource", "system");
      }
    },
    loadThemeFromStorage: (state) => {
      const initial = getInitialTheme();
      state.isDark = initial.isDark;
      state.themeSource = initial.themeSource;
    },
    updateSystemTheme: (state, action: PayloadAction<boolean>) => {
      if (state.themeSource === "system") {
        state.isDark = action.payload;
        // Save current system theme to localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("theme", state.isDark ? "dark" : "light");
        }
      }
    },
    setSystemThemeListenerActive: (state, action: PayloadAction<boolean>) => {
      state.isSystemThemeListenerActive = action.payload;
    },
  },
});

export const {
  toggleTheme,
  setTheme,
  setSystemTheme,
  loadThemeFromStorage,
  updateSystemTheme,
  setSystemThemeListenerActive,
} = themeSlice.actions;
export default themeSlice.reducer;
