/**
 * External dependencies.
 */
import { useEffect, useState } from "react";

/**
 * Internal dependencies.
 */
import "./style.css";

export default function HealthzPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("/api/healthz")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Failed to load health stats:", err));
  }, []);

  if (!stats) return <p>Loading health stats...</p>;

  return (
    <div style={{ padding: "20px" }} className="healthz">
      <h1>Service Health</h1>
      <ul>
        <li>
          <strong>Status:</strong> {stats.ok ? "OK ✅" : "Fail ❌"}
        </li>
        <li>
          <strong>Version:</strong> {stats.version}
        </li>
        <li>
          <strong>Uptime:</strong> {Math.round(stats.uptime)} seconds
        </li>
      </ul>
    </div>
  );
}
