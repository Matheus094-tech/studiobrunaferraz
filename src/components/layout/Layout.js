// src/components/layout/Layout.js
import React from "react";
import IndexNavbar from "components/Navbars/IndexNavbar";

export default function Layout({ children }) {
  return (
    <div className="wrapper d-flex flex-column min-vh-100" style={{ background: "#ECE9E9" }}>
      <IndexNavbar />
      <main className="main flex-grow-1" style={{ paddingTop: "80px" }}>
        {children}
      </main>
    </div>
  );
}
