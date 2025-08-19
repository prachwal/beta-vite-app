import type { VercelRequest, VercelResponse } from "@vercel/node";

const translations = {
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
          "To jest nowoczesna aplikacja React z TypeScript, Ant Design i obsługą SSR.",
      },
    },
  },
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { lang } = req.query;

  if (
    lang &&
    typeof lang === "string" &&
    translations[lang as keyof typeof translations]
  ) {
    res.status(200).json(translations[lang as keyof typeof translations]);
  } else {
    res.status(200).json(translations);
  }
}
