/**
 * External Dependencies
 */
import express from "express";
import { fileURLToPath } from "url";
import path from "path";

/**
 * Internal Dependencies
 */
import {
  getLinks,
  createLink,
  redirectLink,
  getLinkStatus,
  deleteLink,
  healthCheck,
} from "./controllers/dashboardController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

app.route("/api/").get(getLinks).post(createLink);
app.route("/api/healthz").get(healthCheck);
app.route("/api/code/:code").get(getLinkStatus);
app.route("/api/:code").get(redirectLink).delete(deleteLink);

// Serve static files
app.use(express.static(path.join(__dirname, "frontend", "dist")));
app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

export default app;
