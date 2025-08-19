import React, { createContext, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  setLanguage,
  setBrowserLanguage,
  setLanguages,
  loadLanguageFromStorage,
} from "../store/slices/i18nSlice";

interface I18nContextType {
  t: (key: string) => string;
  language: string;
  languages: string[];
  changeLanguage: (lang: string) => void;
  setBrowserLanguage: () => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
};

interface I18nProviderProps {
  children: React.ReactNode;
}

const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const { t, i18n } = useTranslation();
  const language = useSelector((state: RootState) => state.i18n.language);
  const languages = useSelector((state: RootState) => state.i18n.languages);
  const dispatch = useDispatch();

  useEffect(() => {
    // Load language from localStorage when component mounts
    dispatch(loadLanguageFromStorage());
  }, [dispatch]);

  useEffect(() => {
    // Always use fallback translations (no fetch, no window check)
    const fallbackTranslations: Record<string, any> = {
      en: {
        nav: { home: "Home", about: "About", settings: "Settings" },
        home: {
          title: "Welcome",
          subtitle: "Modern React App",
          features: {
            title: "Features",
            start: "Get Started",
            documentation: "Documentation",
            settings: "Settings",
          },
          welcome: {
            title: "Welcome to our App",
            description:
              "This is a modern React application with TypeScript, Ant Design, and SSR support.",
          },
        },
        localStorageTest: {
          title: "Local Storage Test",
          description: "Test local storage functionality",
          controls: "Controls",
          data: "Data",
          noData: "No data available",
          addData: "Add Data",
          clearData: "Clear Data",
          remove: "Remove",
        },
        theme: {
          darkMode: "Dark Mode",
          useSystem: "Use system settings",
        },
        language: {
          select: "Select Language",
          system: "System",
          auto: "auto",
          useSystem: "Use browser language",
        },
        serverStatus: {
          title: "Server Status",
          description: "Check server status and API availability",
          serverStatus: "Server Status",
          refresh: "Refresh",
          status: "Status",
          connectionError: "Connection Error",
          responseTime: "Response Time",
          lastCheck: "Last Check",
          url: "URL",
          apiTests: "API Tests",
          apiTestsDescription:
            "Click below to test available API endpoints. Results will be displayed in the developer console.",
          checkEndpoints: "Check Endpoints",
        },
        about: {
          title: "About Application",
          description:
            "Enterprise-grade React application built with cutting-edge technologies",
          architecture: {
            title: "System Architecture",
            description: "Modern microservices architecture with SSR support",
          },
          features: {
            ssr: {
              title: "Server-Side Rendering",
              description:
                "SEO optimization and performance enhancement through server-side rendering",
            },
            typeSafety: {
              title: "Type Safety",
              description:
                "Full TypeScript support for safe and predictable code",
            },
            api: {
              title: "RESTful API",
              description:
                "Modern API compliant with REST principles for client-server communication",
            },
            stateManagement: {
              title: "State Management",
              description:
                "Advanced application state management with Redux Toolkit",
            },
          },
          specs: {
            title: "Technical Specification",
          },
          techStack: {
            frontend: "Frontend Technologies",
            backend: "Backend & DevOps",
            frontendList:
              "React 18 with React Router v6, TypeScript 5.x for full type safety, Ant Design 5.x comprehensive component system, Redux Toolkit for advanced state management, Vite - ultra-fast development bundler",
            backendList:
              "Node.js 18.x with Express.js, SSR (Server-Side Rendering) for SEO optimization, Internationalization (i18next) for multi-language support, Vercel - automatic CI/CD deployments, RESTful API compliant with best practices",
          },
          openSource: "Open Source",
          openSourceDescription:
            "Source code available on GitHub. Project developed following clean code principles and software engineering best practices.",
        },
      },
      pl: {
        nav: {
          home: "Strona główna",
          about: "O nas",
          settings: "Ustawienia",
        },
        home: {
          title: "Witamy",
          subtitle: "Nowoczesna aplikacja React",
          features: {
            title: "Funkcje",
            start: "Rozpocznij",
            documentation: "Dokumentacja",
            settings: "Ustawienia",
          },
          welcome: {
            title: "Witamy w naszej aplikacji",
            description:
              "To jest nowoczesna aplikacja React z TypeScript, Ant Design i wsparciem dla SSR.",
          },
        },
        localStorageTest: {
          title: "Test Local Storage",
          description: "Testuj funkcjonalność local storage",
          controls: "Kontrolki",
          data: "Dane",
          noData: "Brak dostępnych danych",
          addData: "Dodaj dane",
          clearData: "Wyczyść dane",
          remove: "Usuń",
        },
        theme: {
          darkMode: "Tryb Ciemny",
          useSystem: "Użyj ustawień systemu",
        },
        language: {
          select: "Wybierz Język",
          system: "System",
          auto: "auto",
          useSystem: "Użyj języka przeglądarki",
        },
        serverStatus: {
          title: "Status Serwera",
          description: "Sprawdź status serwera i dostępność API",
          serverStatus: "Status Serwera",
          refresh: "Odśwież",
          status: "Status",
          connectionError: "Błąd połączenia",
          responseTime: "Czas odpowiedzi",
          lastCheck: "Ostatnie sprawdzenie",
          url: "URL",
          apiTests: "Testy API",
          apiTestsDescription:
            "Kliknij poniżej, aby przetestować dostępne endpointy API. Wyniki będą wyświetlone w konsoli deweloperskiej.",
          checkEndpoints: "Sprawdź Endpointy API",
        },
        about: {
          title: "O Aplikacji",
          description:
            "Enterprise-grade aplikacja React zbudowana z wykorzystaniem najnowszych technologii",
          architecture: {
            title: "Architektura Systemu",
            description:
              "Nowoczesna architektura mikroserwisów z wsparciem SSR",
          },
          features: {
            ssr: {
              title: "Server-Side Rendering",
              description:
                "Optymalizacja SEO i wydajności dzięki renderowaniu po stronie serwera",
            },
            typeSafety: {
              title: "Bezpieczeństwo Typów",
              description:
                "Pełne wsparcie TypeScript dla bezpiecznego i przewidywalnego kodu",
            },
            api: {
              title: "RESTful API",
              description:
                "Nowoczesne API zgodne z zasadami REST dla komunikacji klient-serwer",
            },
            stateManagement: {
              title: "Zarządzanie Stanem",
              description:
                "Zaawansowane zarządzanie stanem aplikacji z Redux Toolkit",
            },
          },
          specs: {
            title: "Specyfikacja Techniczna",
          },
          techStack: {
            frontend: "Technologie Frontend",
            backend: "Backend & DevOps",
            frontendList:
              "React 18 z React Router v6, TypeScript 5.x dla pełnego bezpieczeństwa typów, Ant Design 5.x kompleksowy system komponentów, Redux Toolkit dla zaawansowanego zarządzania stanem, Vite - ultra-szybki bundler deweloperski",
            backendList:
              "Node.js 18.x z Express.js, SSR (Server-Side Rendering) dla optymalizacji SEO, Internationalization (i18next) dla wielojęzyczności, Vercel - automatyczne wdrożenia CI/CD, RESTful API zgodne z najlepszymi praktykami",
          },
          openSource: "Open Source",
          openSourceDescription:
            "Kod źródłowy dostępny na GitHub. Projekt rozwijany zgodnie z zasadami clean code i najlepszymi praktykami inżynierii oprogramowania.",
        },
      },
    };
    Object.keys(fallbackTranslations).forEach((lang) => {
      i18n.addResourceBundle(lang, "translation", fallbackTranslations[lang]);
    });
    dispatch(setLanguages(Object.keys(fallbackTranslations)));

    // Set initial language from Redux state to i18next
    if (language && language !== i18n.language) {
      i18n.changeLanguage(language);
    }
  }, [dispatch, i18n, language]);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    dispatch(setLanguage(lang));
  };

  const handleSetBrowserLanguage = () => {
    dispatch(setBrowserLanguage());
  };

  return (
    <I18nContext.Provider
      value={{
        t,
        language,
        languages,
        changeLanguage,
        setBrowserLanguage: handleSetBrowserLanguage,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};

export default I18nProvider;
export { I18nProvider };
