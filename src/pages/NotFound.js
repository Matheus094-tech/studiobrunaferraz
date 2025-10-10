import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container py-5 text-center">
      <h1 className="display-6 mb-2">404</h1>
      <p className="mb-4">Página não encontrada.</p>
      <Link className="btn btn-primary" to="/">Voltar ao início</Link>
    </div>
  );
}
