import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss";
import "assets/demo/demo.css";

import Index from "views/Index.js";
import Galeria from "./views/paginas/galeria.jsx";

console.log = function () { };
console.warn = function () { };
console.error = function () { };
console.info = function () { };

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/eventos" element={<ErrorBoundary><Galeria /></ErrorBoundary>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

function ErrorBoundary({ children }) {
  const [err, setErr] = React.useState(null);
  React.useEffect(() => {
    const h = (e) => setErr(e.reason || e.error || e.message || e);
    window.addEventListener("error", h);
    window.addEventListener("unhandledrejection", h);
    return () => {
      window.removeEventListener("error", h);
      window.removeEventListener("unhandledrejection", h);
    };
  }, []);
  if (err) {
    return (
      <div style={{ padding: 24, color: "#fff" }}>
        <h2>Erro na página /eventos</h2>
        <pre style={{ whiteSpace: "pre-wrap" }}>{String(err?.stack || err)}</pre>
      </div>
    );
  }
  return children;
}
