import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  updateSystemTheme,
  setSystemThemeListenerActive,
} from "../store/slices/themeSlice";
import {
  updateBrowserLanguage,
  setLanguageListenerActive,
} from "../store/slices/i18nSlice";

/**
 * Hook for monitoring system theme and language changes
 * Automatically updates Redux state when system settings change
 */
export const useSystemSettings = () => {
  const dispatch = useDispatch();
  const themeSource = useSelector(
    (state: RootState) => state.theme.themeSource
  );
  const languageSource = useSelector(
    (state: RootState) => state.i18n.languageSource
  );
  const isThemeListenerActive = useSelector(
    (state: RootState) => state.theme.isSystemThemeListenerActive
  );
  const isLanguageListenerActive = useSelector(
    (state: RootState) => state.i18n.isLanguageListenerActive
  );

  // Monitor system theme changes
  useEffect(() => {
    if (typeof window === "undefined" || themeSource !== "system") {
      if (isThemeListenerActive) {
        dispatch(setSystemThemeListenerActive(false));
      }
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleThemeChange = (e: MediaQueryListEvent) => {
      dispatch(updateSystemTheme(e.matches));
    };

    // Set listener as active
    dispatch(setSystemThemeListenerActive(true));

    // Add listener
    mediaQuery.addEventListener("change", handleThemeChange);

    // Initial update
    dispatch(updateSystemTheme(mediaQuery.matches));

    return () => {
      mediaQuery.removeEventListener("change", handleThemeChange);
      dispatch(setSystemThemeListenerActive(false));
    };
  }, [dispatch, themeSource, isThemeListenerActive]);

  // Monitor browser language changes
  useEffect(() => {
    if (typeof window === "undefined" || languageSource !== "browser") {
      if (isLanguageListenerActive) {
        dispatch(setLanguageListenerActive(false));
      }
      return;
    }

    const handleLanguageChange = () => {
      const browserLang =
        navigator.language || navigator.languages?.[0] || "en";
      const shortLang = browserLang.split("-")[0].toLowerCase();

      // Map to supported languages
      const supportedLanguages = ["en", "pl", "es"];
      const detectedLanguage = supportedLanguages.includes(shortLang)
        ? shortLang
        : "en";

      dispatch(updateBrowserLanguage(detectedLanguage));
    };

    // Set listener as active
    dispatch(setLanguageListenerActive(true));

    // Listen for language changes (some browsers support this)
    window.addEventListener("languagechange", handleLanguageChange);

    // Initial update
    handleLanguageChange();

    return () => {
      window.removeEventListener("languagechange", handleLanguageChange);
      dispatch(setLanguageListenerActive(false));
    };
  }, [dispatch, languageSource, isLanguageListenerActive]);

  return {
    isThemeListenerActive,
    isLanguageListenerActive,
  };
};
