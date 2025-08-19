import express from "express";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import apiRoutes from "./api";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Serve static files from dist/client
app.use(express.static("dist/client"));

// Mount API routes
app.use(apiRoutes);

// Legacy API routes for compatibility
app.get("/api/hello", (_req, res) => {
  res.json({ message: "Hello from TypeScript server! - Auto-reloaded!" });
});

// Catch-all handler: send back React's index.html file for client-side routing
app.get("/", (_req, res) => {
  const indexPath = resolve(__dirname, "../dist/client/index.html");
  try {
    const html = readFileSync(indexPath, "utf-8");
    res.send(html);
  } catch (error) {
    res
      .status(404)
      .send("Client build not found. Please run npm run build first.");
  }
});

// For Vercel deployment
export default app;

// For local development
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}
