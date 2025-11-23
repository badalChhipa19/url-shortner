/**
 * External Dependencies
 */
import express from "express";

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

const app = express();

app.use(express.json());

app.route("/").get(getLinks).post(createLink);
app.route("/healthz").get(healthCheck);
app.route("/code/:code").get(getLinkStatus);
app.route("/:code").get(redirectLink).delete(deleteLink);

export default app;
