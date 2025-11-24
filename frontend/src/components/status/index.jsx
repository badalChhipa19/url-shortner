/**
 * External dependencies.
 */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

/**
 * Internal Dependencies.
 */
import "./style.css";

export const Status = () => {
  const { code } = useParams();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fun = async () => {
      fetch(`/api/code/${code}`)
        .then((res) => {
          if (!res.ok) throw new Error("Link not found");
          return res.json();
        })
        .then((data) => {
          setStats(data.data.link_details);
        })
        .catch((err) => setError(err.message));
    };
    fun();
  }, [code]);

  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!stats) return <p>Loading stats...</p>;

  return (
    <div>
      <h1>Stats for Code: {code}</h1>
      <ul className="status">
        <li>
          <strong>Original URL:</strong> {stats.url}
        </li>
        <li>
          <strong>Hits:</strong> {stats.hits}
        </li>
        <li>
          <strong>Last Clicked:</strong> {stats.last_clicked || "Never"}
        </li>
      </ul>
    </div>
  );
};
