/**
 * External dependencies.
 */
import React, { useState, useEffect } from "react";

/**
 * Internal dependencies.
 */
import "./style.css";

export const Table = () => {
  const [links, setLinks] = useState([]);

  // Initial load from backend
  useEffect(() => {
    fetch("/api/")
      .then((res) => res.json())
      .then((data) => setLinks(data.data.links));
  }, []);

  const handleDelete = async (code) => {
    try {
      // Optimistic UI update
      setLinks(links.filter((link) => link.code !== code));

      const response = await fetch(`/api/${code}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.data);
      }

      alert(`Link ${code} deleted successfully`);
    } catch (err) {
      console.error("Error deleting link:", err.message);
    }
  };

  return (
    <div className="table">
      <h1>TinyLink Dashboard</h1>
      <table className="table__layout">
        <thead>
          <tr>
            <th>Code</th>
            <th>Original URL</th>
            <th>Hits</th>
            <th>Last Clicked</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(links) &&
            links.map((link) => (
              <tr key={link.code}>
                <td>
                  <a href={`/${link.code}`}>{link.code}</a>
                </td>
                <td>{link.url}</td>
                <td>{link.hits}</td>
                <td>{link.last_clicked}</td>
                <td>
                  <button
                    className="delete_button"
                    onClick={() => handleDelete(link.code)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
