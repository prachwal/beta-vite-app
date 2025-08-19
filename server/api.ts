import express from "express";
import { Request, Response } from "express";

const router = express.Router();

// Basic health check endpoint
router.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
  });
});

// Status endpoint
router.get("/api/status", (_req: Request, res: Response) => {
  res.json({
    server: "running",
    version: "1.0.0",
    endpoints: ["/api/health", "/api/status", "/api/translations"],
  });
});

// Translations endpoint (basic fallback)
router.get("/api/translations", (_req: Request, res: Response) => {
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
            "To jest nowoczesna aplikacja React z TypeScript, Ant Design i wsparciem dla SSR.",
        },
      },
    },
  };

  res.json(translations);
});

// Error handler
router.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Endpoint not found" });
});

export default router;
