/**
 * Internal Dependencies
 */
import "./config.js";
import app from "./app.js";
import initDb from "./initDb.js";

// Fetch environment variables.
const { PORT } = process.env;

// Initialize DB.
initDb().catch((err) => {
  console.error("DB init failed:", err);
  process.exit(1);
});

// Start the server.
app.listen(PORT, (err) => {
  // If Error return early.
  if (err) return console.log(`Server Failed..`);

  // Console that server is running.
  console.log("\x1b[34m", `Server is running at ${PORT}`);
});
