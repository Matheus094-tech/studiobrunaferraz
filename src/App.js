// src/App.js
// CSS globais — sempre aqui!
import "./assets/css/global.css";


import React, { Suspense, lazy, useEffect } from "react";
import Layout from "components/layout/Layout";
import ScrollToTop from "components/ScrollToTop";
import BotaoWhatsapp from "components/BotaoWhatsapp";
import { Routes, Route, Navigate } from "react-router-dom";

const Home = lazy(() => import("pages/Home"));
const SobreNos = lazy(() => import("components/SobreNosSection"));
const Modalidades = lazy(() => import("components/Modalidades"));
const Eventos = lazy(() => import("views/paginas/galeria"));
const Contato = lazy(() => import("views/IndexSections/contato"));

const NotFound = () => (
  <div className="container py-5" style={{ color: "#0c102d" }}>
    Página não encontrada
  </div>
);

export default function App() {
  // ✅ aplique a classe de fundo de forma determinística
  useEffect(() => {
    document.body.classList.add("page-bg");
    return () => document.body.classList.remove("page-bg");
  }, []);

  return (
    <Layout>
      <ScrollToTop />
      <Suspense fallback={<div style={{ padding: 24, color: "#0c102d" }}>Carregando…</div>}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/sobre" element={<SobreNos />} />
          <Route path="/modalidades" element={<Modalidades />} />
          {/* <Route path="/eventos" element={<Eventos />} /> */}
          <Route path="/contato" element={<Contato />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      {/* Botão fixo do WhatsApp em todas as páginas */}
      <BotaoWhatsapp />
    </Layout>
  );
}
