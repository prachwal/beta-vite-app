import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ConfigProvider, theme } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { store, RootState } from "./store/store";
import { ThemeProvider } from "./contexts/ThemeContext";
import { I18nProvider } from "./contexts/I18nContext";
import SimpleLayout from "./components/Layout/SimpleLayout";
import { Home, About, Settings, ServerStatus, LocalStorageTest } from "./pages";
import NoSSR from "./components/NoSSR";
import "@ant-design/v5-patch-for-react-19";
import "./App.css";

// Import i18next
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Initialize i18next
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        nav: {
          home: "Home",
          about: "About",
          settings: "Settings",
        },
        home: {
          title: "Welcome to Our App",
          subtitle: "A modern React application with Ant Design",
          features: {
            title: "Features",
            start: "Get Started",
            documentation: "Documentation",
            settings: "Settings",
          },
          welcome: {
            title: "Welcome",
            description:
              "This is a modern React application built with TypeScript, Ant Design, Redux, and React Router. It includes theme switching, internationalization, and responsive design.",
          },
        },
        about: {
          title: "About Us",
          description: "Learn more about our team and mission",
          team: {
            title: "Our Team",
            members: "Dedicated professionals",
            github: "Open source contributors",
            linkedin: "Industry connections",
          },
          mission: {
            title: "Our Mission",
            description:
              "To create beautiful, functional, and accessible web applications that solve real-world problems.",
          },
        },
        settings: {
          title: "Settings",
          description: "Configure your application preferences",
          appearance: {
            title: "Appearance",
            darkMode: "Dark Mode",
          },
          language: {
            title: "Language",
            select: "Select Language",
          },
          about: {
            title: "About",
            description:
              "This application is built with modern web technologies including React, TypeScript, Ant Design, and Redux.",
          },
        },
      },
    },
    pl: {
      translation: {
        nav: {
          home: "Strona Główna",
          about: "O Nas",
          settings: "Ustawienia",
        },
        home: {
          title: "Witamy w Aplikacji",
          subtitle: "Nowoczesna aplikacja React z Ant Design",
          features: {
            title: "Funkcje",
            start: "Rozpocznij",
            documentation: "Dokumentacja",
            settings: "Ustawienia",
          },
          welcome: {
            title: "Witamy",
            description:
              "To nowoczesna aplikacja React zbudowana z TypeScript, Ant Design, Redux i React Router. Zawiera przełączanie motywów, internacjonalizację i responsywny design.",
          },
        },
        about: {
          title: "O Nas",
          description: "Dowiedz się więcej o naszym zespole i misji",
          team: {
            title: "Nasz Zespół",
            members: "Profesjonaliści",
            github: "Współtwórcy open source",
            linkedin: "Połączenia branżowe",
          },
          mission: {
            title: "Nasza Misja",
            description:
              "Tworzenie pięknych, funkcjonalnych i dostępnych aplikacji webowych, które rozwiązują prawdziwe problemy.",
          },
        },
        settings: {
          title: "Ustawienia",
          description: "Skonfiguruj preferencje aplikacji",
          appearance: {
            title: "Wygląd",
            darkMode: "Tryb Ciemny",
          },
          language: {
            title: "Język",
            select: "Wybierz Język",
          },
          about: {
            title: "O Aplikacji",
            description:
              "Ta aplikacja jest zbudowana z nowoczesnych technologii webowych w tym React, TypeScript, Ant Design i Redux.",
          },
        },
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

// Create a new component that uses the theme from Redux
const AppContent: React.FC = () => {
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const currentLanguage = useSelector(
    (state: RootState) => state.i18n.language
  );

  // Update HTML lang attribute when language changes
  useEffect(() => {
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  const antdTheme = {
    algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: "#1890ff",
      borderRadius: 6,
    },
  };

  return (
    <ConfigProvider theme={antdTheme}>
      <SimpleLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/server-status" element={<ServerStatus />} />
          <Route path="/localStorage-test" element={<LocalStorageTest />} />
        </Routes>
      </SimpleLayout>
    </ConfigProvider>
  );
};

function App() {
  return (
    <Provider store={store}>
      <StyleProvider hashPriority="high">
        <ThemeProvider>
          <I18nProvider>
            <Router>
              <NoSSR>
                <AppContent />
              </NoSSR>
            </Router>
          </I18nProvider>
        </ThemeProvider>
      </StyleProvider>
    </Provider>
  );
}

export default App;
