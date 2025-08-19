import React, { createContext, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { toggleTheme, loadThemeFromStorage } from "../store/slices/themeSlice";
import { useSystemSettings } from "../hooks/useSystemSettings";

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const dispatch = useDispatch();

  // Initialize system settings monitoring
  useSystemSettings();

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  useEffect(() => {
    // Load theme from localStorage when component mounts
    dispatch(loadThemeFromStorage());
  }, [dispatch]);

  useEffect(() => {
    // Remove conflicting CSS classes - Ant Design handles theming automatically
    // The theme is now handled by Ant Design ConfigProvider
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme: handleToggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
