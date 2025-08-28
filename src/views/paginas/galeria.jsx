// src/views/paginas/galeria.jsx
import React, { useEffect, useMemo, useState } from "react";

// layout
import IndexNavbar from "components/Navbars/IndexNavbar.js";
// import PageHeader from "components/PageHeader/PageHeader.js"; // opcional
import Footer from "components/Footer/Footer.js";

// modal e grid (Bootstrap/Reactstrap)
import { Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from "reactstrap";

// css escopado da galeria
import "assets/css/galeria.css";

/* =========================================================
   HELPER: importa todas as imagens de uma pasta (webpack)
   ========================================================= */
function importAll(r) {
  return r.keys().map(r);
}

// Carrega imagens das 3 coreografias (como você pediu)
const coreografia1Imgs = importAll(
  require.context(
    "assets/img/espetaculos/novembro/coreografia_1",
    false,
    /\.(png|jpe?g|webp|gif)$/i
  )
);
const coreografia2Imgs = importAll(
  require.context(
    "assets/img/espetaculos/novembro/coreografia_2",
    false,
    /\.(png|jpe?g|webp|gif)$/i
  )
);
const coreografia3Imgs = importAll(
  require.context(
    "assets/img/espetaculos/novembro/coreografia_3",
    false,
    /\.(png|jpe?g|webp|gif)$/i
  )
);

// (opcional) capa do evento
let coverNovembro;
try {
  coverNovembro = require("assets/img/espetaculos/novembro/cover.webp");
} catch {
  coverNovembro = null;
}

/* ===================== CONFIG ===================== */
const WHATSAPP_NUMBER = "5511991502640"; // DDI+DDD+número
const PRICE_PER_PHOTO = 1500; // em centavos (R$ 15,00)
const moneyBRL = (cents) =>
  (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

/* Utils */
function fileNameFromSrc(imgSrc) {
  try {
    const parts = imgSrc.split("/");
    return decodeURIComponent(parts[parts.length - 1]); // ex: "01.webp"
  } catch {
    return String(imgSrc);
  }
}

/* ===================== DADOS (EVENTS) ===================== */
const EVENTS = [
  {
    id: "esp-novembro",
    title: "Espetáculo XPTO - Novembro",
    cover: coverNovembro,
    coreos: [
      {
        id: "esp-novembro-coreo-01",
        title: "COREOGRAFIA 01 - XPTO",
        images: coreografia1Imgs,
      },
      {
        id: "esp-novembro-coreo-02",
        title: "COREOGRAFIA 02 - XPTO",
        images: coreografia2Imgs,
      },
      {
        id: "esp-novembro-coreo-03", // <- corrigido p/ ser único
        title: "COREOGRAFIA 03 - XPTO",
        images: coreografia3Imgs,
      },
    ],
  },
];

/* ===================== CARRINHO (POR EVENTO) ===================== */
function useLocalCartByEvent(eventId, priceCents) {
  const key = `cart-${eventId ?? "none"}`;
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key) || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(items));
  }, [key, items]);

  const toggle = (id) =>
    setItems((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const clear = () => setItems([]);

  return {
    items,
    count: items.length,
    totalCents: items.length * priceCents,
    toggle,
    clear,
  };
}

/* ===================== COMPONENTE ===================== */
export default function Galeria() {
  // mesmo comportamento do Index (classe no body)
  useEffect(() => {
    document.body.classList.toggle("index-page");
    return () => document.body.classList.toggle("index-page");
  }, []);

  const hasEvents = Array.isArray(EVENTS) && EVENTS.length > 0;
  const [view, setView] = useState("events"); // "events" | "event" | "coreo"
  const [eventId, setEventId] = useState(hasEvents ? EVENTS[0].id : null);
  const [coreoId, setCoreoId] = useState(
    hasEvents && EVENTS[0].coreos?.length ? EVENTS[0].coreos[0].id : null
  );

  const currentEvent = useMemo(
    () => (hasEvents ? EVENTS.find((e) => e.id === eventId) : null),
    [hasEvents, eventId]
  );
  const currentCoreo = useMemo(
    () => currentEvent?.coreos?.find((c) => c.id === coreoId) ?? null,
    [currentEvent, coreoId]
  );

  // Carrinho POR evento
  const cart = useLocalCartByEvent(eventId, PRICE_PER_PHOTO);

  // Modal resumo
  const [showResumo, setShowResumo] = useState(false);
  const [form, setForm] = useState({ nome: "", email: "", tel: "" });

  // Agrupa itens do carrinho por coreografia
  const groupedByCoreo = useMemo(() => {
    const byCoreo = {};
    for (const sel of cart.items) {
      const [cId, file] = sel.split("::");
      if (!byCoreo[cId]) byCoreo[cId] = [];
      byCoreo[cId].push(file);
    }
    return byCoreo;
  }, [cart.items]);

  const finalizarNoWhats = () => {
    const linhas = ["*Pedido de fotos - Studio Bruna Ferraz*"];
    linhas.push(`Evento: ${currentEvent?.title ?? "-"}`);
    for (const c of currentEvent?.coreos ?? []) {
      const arr = groupedByCoreo[c.id] || [];
      if (arr.length) {
        linhas.push(`• ${c.title}: ${arr.join(", ")}`);
      }
    }
    linhas.push(`Qtd total: ${cart.count}`);
    linhas.push(`Total: ${moneyBRL(cart.totalCents)}`);
    linhas.push("");
    linhas.push(`Nome: ${form.nome}`);
    linhas.push(`E-mail: ${form.email}`);
    linhas.push(`Telefone: ${form.tel}`);

    const msg = linhas.join("\n");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
        {/* <PageHeader /> */}

        <div className="main">
          <div className="section" id="comprar-fotos">
            <div className="container">
              <h2 className="text-center title" style={{ marginBottom: 24 }}>
                Comprar Fotos
              </h2>

              {/* ==== LISTA DE EVENTOS ==== */}
              {view === "events" && (
                <div
                  style={{
                    display: "grid",
                    gap: 16,
                    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  }}
                >
                  {EVENTS.map((ev) => (
                    <div key={ev.id} className="p-3 border rounded-3 h-100">
                      {ev.cover && (
                        <img
                          src={ev.cover}
                          alt={ev.title}
                          className="rounded-3 mb-2"
                          style={{ width: "100%", height: 160, objectFit: "cover" }}
                        />
                      )}

                      <h5 className="mb-2">{ev.title}</h5>
                      <p className="text-muted small mb-3">
                        {ev.coreos?.length ?? 0} coreografia(s)
                      </p>
                      <button
                        onClick={() => {
                          setEventId(ev.id);
                          setCoreoId(ev.coreos?.[0]?.id ?? null);
                          setView("event");
                        }}
                        className="btn btn-success"
                      >
                        Abrir evento
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* ==== COREOGRAFIAS DO EVENTO ==== */}
              {view === "event" && currentEvent && (
                <div style={{ marginTop: 16 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      flexWrap: "wrap",
                    }}
                  >
                    <button onClick={() => setView("events")} className="btn btn-outline-secondary">
                      ← Voltar
                    </button>

                    <h3 style={{ margin: 0 }}>{currentEvent.title}</h3>

                    {/* Barra de ação do EVENTO */}
                    <div
                      style={{
                        marginLeft: "auto",
                        display: "flex",
                        gap: 12,
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <button onClick={cart.clear} className="btn btn-outline-secondary">
                        Limpar seleção do evento
                      </button>
                      <span className="badge" style={{ borderRadius: 999, padding: "6px 12px" }}>
                        Selecionadas: {cart.count}
                      </span>
                      <span style={{ fontWeight: 600 }}>Total: {moneyBRL(cart.totalCents)}</span>
                      <button
                        className={`btn ${cart.count === 0 ? "btn-secondary" : "btn-success"}`}
                        onClick={() => setShowResumo(true)}
                        disabled={cart.count === 0}
                        title={
                          cart.count === 0
                            ? "Selecione fotos nas coreografias para finalizar"
                            : "Ver resumo e finalizar"
                        }
                      >
                        Finalizar
                      </button>
                    </div>
                  </div>

                  {/* grid de coreografias */}
                  <div
                    style={{
                      display: "grid",
                      gap: 16,
                      gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                      marginTop: 12,
                    }}
                  >
                    {currentEvent.coreos?.map((c) => (
                      <div key={c.id} className="p-3 border rounded-3 h-100">
                        <h6 className="mb-2">{c.title}</h6>
                        <p className="text-muted small mb-3">{c.images?.length ?? 0} fotos</p>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button
                            onClick={() => {
                              setCoreoId(c.id);
                              setView("coreo");
                            }}
                            className="btn btn-success"
                          >
                            Ver fotos
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ==== GALERIA DA COREOGRAFIA ==== */}
              {view === "coreo" && currentCoreo && (
                <div style={{ marginTop: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <button onClick={() => setView("event")} className="btn btn-outline-secondary">
                      ← {currentEvent?.title}
                    </button>
                    <h4 style={{ margin: 0 }}>{currentCoreo.title}</h4>
                    <span
                      className="badge"
                      style={{ marginLeft: "auto", borderRadius: 999, padding: "6px 12px" }}
                    >
                      Selecionadas: {cart.count}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      flexWrap: "wrap",
                      marginTop: 12,
                      alignItems: "center",
                    }}
                  >
                    <button onClick={cart.clear} className="btn btn-outline-secondary">
                      Limpar seleção do evento
                    </button>
                    <div style={{ marginLeft: "auto", fontWeight: 600 }}>
                      Total: {moneyBRL(cart.totalCents)}{" "}
                      <span className="text-muted">({moneyBRL(PRICE_PER_PHOTO)} cada)</span>
                    </div>
                    <button
                      className={`btn ${cart.count === 0 ? "btn-secondary" : "btn-success"}`}
                      onClick={() => setShowResumo(true)}
                      disabled={cart.count === 0}
                    >
                      Finalizar
                    </button>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gap: 12,
                      gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                      marginTop: 12,
                    }}
                  >
                    {currentCoreo.images?.map((imgSrc) => {
                      const file = fileNameFromSrc(imgSrc);
                      const composedId = `${currentCoreo.id}::${file}`; // único por evento
                      const selected = cart.items.includes(composedId);
                      return (
                        <div
                          key={composedId}
                          onClick={() => cart.toggle(composedId)}
                          className={`thumb border rounded-3 ${selected ? "is-selected" : ""}`}
                          style={{
                            borderColor: selected ? "#e6b557" : undefined,
                            boxShadow: selected ? "0 0 0 1px #e6b557 inset" : undefined,
                          }}
                        >
                          <span className="thumb-label">{file}</span>
                          <img alt={file} loading="lazy" src={imgSrc} />
                          {selected && <span className="check">✓</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {!hasEvents && (
                <div className="text-center" style={{ marginTop: 24 }}>
                  <p>Nenhum evento cadastrado.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>

      {/* ===== MODAL DE RESUMO DETALHADO ===== */}
      <Modal isOpen={showResumo} toggle={() => setShowResumo(false)}>
        <ModalHeader toggle={() => setShowResumo(false)}>Resumo do pedido</ModalHeader>
        <ModalBody>
          {cart.count === 0 ? (
            <p>Nenhuma foto selecionada.</p>
          ) : (
            <>
              <p className="mb-2">
                <strong>Evento:</strong> {currentEvent?.title}
              </p>

              {/* Listagem por coreografia */}
              {currentEvent?.coreos?.map((c) => {
                const list = groupedByCoreo[c.id] || [];
                if (!list.length) return null;
                return (
                  <div key={c.id} className="mb-3">
                    <div className="d-flex align-items-center">
                      <h6 className="m-0">{c.title}</h6>
                      <span className="badge ms-2">{list.length}</span>
                    </div>
                    <p className="text-muted small" style={{ wordBreak: "break-word" }}>
                      {list.join(", ")}
                    </p>
                  </div>
                );
              })}

              <Row className="mb-3">
                <Col sm="12">
                  <div className="d-flex align-items-center gap-2">
                    <strong>Total de fotos:</strong> {cart.count}
                  </div>
                  <div>
                    <strong>Valor total:</strong> {moneyBRL(cart.totalCents)}{" "}
                    <span className="text-muted">({moneyBRL(PRICE_PER_PHOTO)} cada)</span>
                  </div>
                </Col>
              </Row>

              {/* Formulário simples de contato */}
              <Row className="g-2">
                <Col sm="12">
                  <label className="form-label">Nome completo</label>
                  <input
                    className="form-control"
                    value={form.nome}
                    onChange={(e) => setForm({ ...form, nome: e.target.value })}
                    placeholder="Seu nome"
                  />
                </Col>
                <Col sm="12">
                  <label className="form-label">E-mail</label>
                  <input
                    type="email"
                    className="form-control"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="seu@email.com"
                  />
                </Col>
                <Col sm="12">
                  <label className="form-label">Telefone (DDD + número)</label>
                  <input
                    className="form-control"
                    value={form.tel}
                    onChange={(e) => setForm({ ...form, tel: e.target.value })}
                    placeholder="11999999999"
                  />
                </Col>
              </Row>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-outline-secondary" onClick={() => setShowResumo(false)}>
            Voltar
          </button>
          <button
            className={`btn ${cart.count === 0 ? "btn-secondary" : "btn-success"}`}
            onClick={() => {
              if (!form.nome || !form.email || !form.tel) {
                alert("Preencha nome, e-mail e telefone.");
                return;
              }
              finalizarNoWhats();
            }}
            disabled={cart.count === 0}
          >
            Finalizar no WhatsApp
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
}
