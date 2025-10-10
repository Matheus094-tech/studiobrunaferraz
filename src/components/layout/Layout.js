// src/components/layout/Layout.js
import React from "react";
import IndexNavbar from "components/Navbars/IndexNavbar";

export default function Layout({ children }) {
  return (
    <div className="app-shell d-flex flex-column min-vh-100">
      <IndexNavbar />
      <main className="flex-grow-1" style={{ paddingTop: "70px" }}>
        {children}
      </main>
    </div>
  );
}
