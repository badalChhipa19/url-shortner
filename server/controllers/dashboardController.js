/**
 * Internal Dependencies
 */
import pool from "../db.js";

// Fetch variables.
const { HOST } = process.env;

// Get all links.
export const getLinks = async (req, res) => {
  const query = await pool.query("SELECT * FROM links");

  res.status(200).json({
    status: "success",
    count: query.rowCount,
    data: {
      links: query.rows,
    },
  });
};

// generate a short code.
export const generateCode = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Create a new shortened link.
export const createLink = async (req, res) => {
  try {
    // Get rul and code from body.
    const { code, url } = req.body;

    // Generate a short code if not provided.
    const shortCode = code || generateCode();

    // Check if the url is invalid.
    try {
      new URL(url);

      // try to fetch the URL to ensure it's reachable.
      const response = await fetch(url, { method: "HEAD" });
      if (!response.ok) {
        throw new Error("URL not reachable");
      }
    } catch {
      return res
        .status(400)
        .json({ status: "fail", data: { error: "Invalid URL format" } });
    }

    // Check if the code already exists.
    const existingLink = await pool.query(
      "SELECT * FROM links WHERE code = $1",
      [shortCode]
    );

    if (existingLink.rows.length > 0) {
      return res
        .status(409)
        .json({ status: "fail", data: { error: "Code already exists" } });
    }

    // Insert the new link into the database.
    await pool.query("INSERT INTO links (code, url) VALUES ($1, $2)", [
      shortCode,
      url,
    ]);

    const shortUrl = `${HOST}/${shortCode}`;
    return res.status(201).json({
      status: "success",
      data: {
        short_link: shortUrl,
      },
    });
  } catch (error) {
    console.error("Error creating link:", error);
    res.status(500).json({ status: "error", message: "Something went wrong." });
  }
};

// Redirect to the original URL based on the short code.
export const redirectLink = async (req, res) => {
  try {
    const { code } = req.params;

    // Look up the code in the database.
    const linkQuery = await pool.query("SELECT * FROM links WHERE code = $1", [
      code,
    ]);

    if (linkQuery.rows.length === 0) {
      return res
        .status(404)
        .json({ status: "fail", data: { error: "Not found" } });
    }

    await pool.query(
      "UPDATE links SET hits = hits + 1, last_clicked = NOW() WHERE code = $1",
      [code]
    );
    const url = linkQuery.rows[0].url;

    res.redirect(302, url);
  } catch (error) {
    console.error("Error redirecting link:", error);
    res.status(500).json({ status: "error", message: "Something went wrong." });
  }
};

// Get link statistics.
export const getLinkStatus = async (req, res) => {
  try {
    const { code } = req.params;
    const linkQuery = await pool.query("SELECT * FROM links WHERE code = $1", [
      code,
    ]);

    if (linkQuery.rows.length === 0) {
      return res
        .status(404)
        .json({ status: "fail", data: { error: "Not found" } });
    }

    res.status(200).json({
      status: "success",
      data: {
        link_details: linkQuery.rows[0],
      },
    });
  } catch (error) {
    console.error("Error fetching link stats:", error);
    res.status(500).json({ status: "error", message: "Something went wrong." });
  }
};

// Delete a link.
export const deleteLink = async (req, res) => {
  try {
    const { code } = req.params;
    const deleteQuery = await pool.query("DELETE FROM links WHERE code = $1", [
      code,
    ]);

    if (deleteQuery.rowCount === 0) {
      return res
        .status(404)
        .json({ status: "fail", data: { error: "Not found" } });
    }

    res.status(200).json({
      status: "success",
      data: { message: "Link deleted successfully" },
    });
  } catch (error) {
    console.error("Error deleting link:", error);
    res.status(500).json({ status: "error", message: "Something went wrong." });
  }
};

// Health check endpoint.
export const healthCheck = (req, res) =>
  res.json({ ok: true, version: "1.0", uptime: process.uptime() });
