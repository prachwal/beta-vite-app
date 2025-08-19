import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface I18nState {
  language: string;
  languages: string[];
  languageSource: "manual" | "browser";
  isLanguageListenerActive: boolean;
}

// Detect browser language
const detectBrowserLanguage = (): string => {
  if (typeof window === "undefined") return "en";

  const browserLang = navigator.language || navigator.languages?.[0] || "en";
  const shortLang = browserLang.split("-")[0].toLowerCase();

  // Map common browser languages to our supported languages
  const supportedLanguages = ["en", "pl", "es"];
  return supportedLanguages.includes(shortLang) ? shortLang : "en";
};

// Load initial language from localStorage or browser
const getInitialLanguage = (): {
  language: string;
  source: I18nState["languageSource"];
} => {
  if (typeof window === "undefined")
    return { language: "en", source: "browser" };

  const savedLanguage = localStorage.getItem("language");
  const savedSource = localStorage.getItem(
    "languageSource"
  ) as I18nState["languageSource"];

  if (savedLanguage) {
    return {
      language: savedLanguage,
      source: savedSource || "manual",
    };
  }

  // If no saved language, use browser preference
  return {
    language: detectBrowserLanguage(),
    source: "browser",
  };
};

const initialState: I18nState = {
  language: getInitialLanguage().language,
  languageSource: getInitialLanguage().source,
  languages: ["en", "pl", "es"],
  isLanguageListenerActive: false,
};

const i18nSlice = createSlice({
  name: "i18n",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
      state.languageSource = "manual";
      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("language", action.payload);
        localStorage.setItem("languageSource", "manual");
      }
    },
    setBrowserLanguage: (state) => {
      if (typeof window !== "undefined") {
        state.language = detectBrowserLanguage();
        state.languageSource = "browser";
        localStorage.setItem("language", state.language);
        localStorage.setItem("languageSource", "browser");
      }
    },
    setLanguages: (state, action: PayloadAction<string[]>) => {
      state.languages = action.payload;
    },
    loadLanguageFromStorage: (state) => {
      const initial = getInitialLanguage();
      state.language = initial.language;
      state.languageSource = initial.source;
    },
    updateBrowserLanguage: (state, action: PayloadAction<string>) => {
      if (state.languageSource === "browser") {
        state.language = action.payload;
        // Save current browser language to localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("language", state.language);
        }
      }
    },
    setLanguageListenerActive: (state, action: PayloadAction<boolean>) => {
      state.isLanguageListenerActive = action.payload;
    },
  },
});

export const {
  setLanguage,
  setBrowserLanguage,
  setLanguages,
  loadLanguageFromStorage,
  updateBrowserLanguage,
  setLanguageListenerActive,
} = i18nSlice.actions;
export default i18nSlice.reducer;
