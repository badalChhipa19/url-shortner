/**
 * External dependencies.
 */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/**
 * Internal Dependencies.
 */
import { Dashboard } from "./components/dashboard";
import Healthz from "./components/health";
import { Status } from "./components/status";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/healthz" element={<Healthz />} />
        <Route path="/code/:code" element={<Status />} />
      </Routes>
    </Router>
  );
}

export default App;
