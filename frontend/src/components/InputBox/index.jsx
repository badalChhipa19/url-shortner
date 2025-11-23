/**
 * external dependencies.
 */
import { useState } from "react";

/**
 * Internal Dependencies.
 */
import { Input } from "./input";
import "./style.css";

export const InputBox = () => {
  const [shortCode, setShortCode] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("api/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: shortCode, url }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.data.error}`);
        throw new Error(errorData.data.error);
      }

      setShortCode("");
      setUrl("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <Input
        requireField={true}
        name="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter original URL"
      />
      <Input
        classVariant="short"
        name="short"
        value={shortCode}
        onChange={(e) => setShortCode(e.target.value)}
        placeholder="Enter short code"
      />
      <button type="submit" disabled={loading} className="submit_button">
        {loading ? "Creating..." : "Create Link"}
      </button>
    </form>
  );
};
