// src/views/paginas/galeria.jsx
import React, { useEffect, useMemo, useState, useCallback } from "react";

// layout
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footer/Footer.js";
import coverNovembro from "assets/img_wm/espetaculos/novembro/capa.jpg";
import coverCoreo1 from "assets/img_wm/espetaculos/novembro/coreografia_1/capa.jpg";
import coverCoreo2 from "assets/img_wm/espetaculos/novembro/coreografia_2/capa.jpg";
import coverCoreo3 from "assets/img_wm/espetaculos/novembro/coreografia_3/capa.jpg";

// modal e grid (Reactstrap)
import { Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from "reactstrap";

// css escopado da galeria
import "assets/css/galeria.css";

/* =========================================================
   HELPERS
   ========================================================= */
function importAll(ctx, excludeRe) {
  try {
    return ctx
      .keys()
      .filter((k) => (excludeRe ? !excludeRe.test(k) : true))
      .map(ctx);
  } catch (e) {
    console.error("[Galeria] Falha ao importar imagens:", e);
    return [];
  }
}
const EXCLUDE_COVER = /\/?capa\.(jpg|jpeg|png|webp)$/i;

const moneyBRL = (cents) =>
  (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function fileNameFromSrc(imgSrc) {
  try {
    const parts = String(imgSrc).split("/");
    return decodeURIComponent(parts[parts.length - 1]);
  } catch {
    return String(imgSrc);
  }
}

/* =========================================================
   IMPORTS DE IMAGENS (com marca d’água) — Webpack literals
   ========================================================= */
// IMPORTANTE: os caminhos abaixo precisam existir no build.
const coreografia1Ctx = require.context(
  "assets/img_wm/espetaculos/novembro/coreografia_1",
  false,
  /\.(png|jpe?g|webp|gif)$/i
);
const coreografia2Ctx = require.context(
  "assets/img_wm/espetaculos/novembro/coreografia_2",
  false,
  /\.(png|jpe?g|webp|gif)$/i
);
const coreografia3Ctx = require.context(
  "assets/img_wm/espetaculos/novembro/coreografia_3",
  false,
  /\.(png|jpe?g|webp|gif)$/i
);

const coreografia1Imgs = importAll(coreografia1Ctx, EXCLUDE_COVER);
const coreografia2Imgs = importAll(coreografia2Ctx, EXCLUDE_COVER);
const coreografia3Imgs = importAll(coreografia3Ctx, EXCLUDE_COVER);

/* ===================== CONFIG ===================== */
const WHATSAPP_NUMBER = "5511991502640"; // DDI+DDD+número
const PRICE_PER_PHOTO = 2000; // em centavos (R$ 20,00)

/* ===================== DADOS (EVENTS) ===================== */
const EVENTS = [
  {
    id: "esp-novembro",
    title: "Espetáculo 01",
    cover: coverNovembro,
    coreos: [
      {
        id: "esp-novembro-coreo-01",
        title: "COREOGRAFIA 01 - Baby class",
        cover: coverCoreo1,
        images: coreografia1Imgs,
      },
      {
        id: "esp-novembro-coreo-02",
        title: "COREOGRAFIA 02 - Adulto",
        cover: coverCoreo2,
        images: coreografia2Imgs,
      },
      {
        id: "esp-novembro-coreo-03",
        title: "COREOGRAFIA 03 - Jazz",
        cover: coverCoreo3,
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
  useEffect(() => {
    document.body.classList.toggle("index-page");
    return () => document.body.classList.toggle("index-page");
  }, []);

  const hasEvents = Array.isArray(EVENTS) && EVENTS.length > 0;

  const [view, setView] = useState("events"); // "events" | "event" | "coreo"
  const [eventId, setEventId] = useState(() => (hasEvents ? EVENTS[0].id : null));
  const [coreoId, setCoreoId] = useState(() => {
    const first = hasEvents && EVENTS[0].coreos?.length ? EVENTS[0].coreos[0].id : null;
    return first ?? null;
  });

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

  // Modal resumo + contato
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
        linhas.push(`• ${c.title}:`);
        linhas.push(arr.join("\n")); 
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

  const TotalStrong = ({ value }) => (
    <span style={{ color: "#e6b557", fontWeight: 800, fontSize: 18 }}>{value}</span>
  );

  /* ===================== VIEWER (imagem grande) ===================== */
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerData, setViewerData] = useState({
    coreoId: null,
    imgSrc: null,
    file: null,
    index: -1, // índice dentro da coreografia atual
  });

  const openViewer = useCallback(
    (coreoIdParam, imgSrcParam) => {
      const list = currentCoreo?.images || [];
      const idx = list.findIndex((src) => src === imgSrcParam);
      const file = fileNameFromSrc(imgSrcParam);
      setViewerData({
        coreoId: coreoIdParam,
        imgSrc: imgSrcParam,
        file,
        index: idx < 0 ? 0 : idx,
      });
      setViewerOpen(true);
    },
    [currentCoreo]
  );

  const closeViewer = () => setViewerOpen(false);

  const isCurrentSelected = useCallback(() => {
    if (!viewerData.coreoId || !viewerData.file) return false;
    const composedId = `${viewerData.coreoId}::${viewerData.file}`;
    return cart.items.includes(composedId);
  }, [viewerData, cart.items]);

  // Seleciona/deseleciona a foto atual sem fechar o modal
  const toggleSelectCurrent = useCallback(() => {
    if (!viewerData.coreoId || !viewerData.file) return;
    const composedId = `${viewerData.coreoId}::${viewerData.file}`;
    cart.toggle(composedId);
  }, [viewerData, cart]);

  const navigate = useCallback(
    (delta) => {
      if (!currentCoreo?.images?.length) return;
      const total = currentCoreo.images.length;
      if (total === 0) return;

      let nextIndex = viewerData.index + delta;
      if (nextIndex < 0) nextIndex = total - 1; // circular
      if (nextIndex >= total) nextIndex = 0; // circular

      const nextSrc = currentCoreo.images[nextIndex];
      setViewerData({
        coreoId: currentCoreo.id,
        imgSrc: nextSrc,
        file: fileNameFromSrc(nextSrc),
        index: nextIndex,
      });
    },
    [currentCoreo, viewerData.index]
  );

  // atalhos de teclado no viewer
  useEffect(() => {
    if (!viewerOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeViewer();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        navigate(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        navigate(1);
      } else if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        toggleSelectCurrent();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [viewerOpen, navigate, toggleSelectCurrent]);

  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
        <div className="main">
          <div className="section" id="comprar-fotos">
            <div className="container">
              <h2 className="text-center title" style={{ marginBottom: 24 }}>
                Galeria
              </h2>

              {/* ==== LISTA DE EVENTOS ==== */}
              {view === "events" && (
                <div
                  className="grid-xs-1"
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
                        className="btn btn-success btn-mobile"
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
                  {/* Top bar */}
                  <div
                    className="bar-stack"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      flexWrap: "wrap",
                    }}
                  >
                    <div style={{ placeContent: "end" }} className="row w-100 m-0 mt-3">
                      <div className="col-12 col-md-3 text-end">
                        <button
                          onClick={() => setView("events")}
                          className="btn btn-outline-secondary w-100"
                        >
                          ← Voltar
                        </button>
                      </div>
                    </div>

                    <h3 style={{ margin: 0 }}>{currentEvent.title}</h3>

                    <div style={{ marginLeft: "auto", display: "flex", gap: 12, alignItems: "center" }}>
                      <button onClick={cart.clear} className="btn btn-outline-secondary btn-mobile">
                        Limpar seleção do evento
                      </button>
                      <span className="badge" style={{ borderRadius: 999, padding: "6px 12px" }}>
                        Selecionadas: {cart.count}
                      </span>
                    </div>
                  </div>

                  {/* Grid de coreografias (com capa) */}
                  <div
                    className="grid-xs-1"
                    style={{
                      display: "grid",
                      gap: 16,
                      gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                      marginTop: 12,
                    }}
                  >
                    {currentEvent.coreos?.map((c) => (
                      <div key={c.id} className="p-3 border rounded-3 h-100">
                        {c.cover && (
                          <img
                            src={c.cover}
                            alt={c.title}
                            className="rounded-3 mb-2"
                            style={{ width: "100%", height: 160, objectFit: "cover" }}
                          />
                        )}
                        <h6 className="mb-2">{c.title}</h6>
                        <p className="text-muted small mb-3">{c.images?.length ?? 0} fotos</p>
                        <button
                          onClick={() => {
                            setCoreoId(c.id);
                            setView("coreo");
                          }}
                          className="btn btn-success btn-mobile"
                        >
                          Ver fotos
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Barra inferior: Total + Finalizar */}
                  <div className="row w-100 m-0 mt-3 align-items-center">
                    <div className="col-6 col-md-3 ms-auto">
                      <div style={{ textAlign: "end" }} className="row w-100 m-0 mt-3 align-items-center">
                        <TotalStrong value={`Total: ${moneyBRL(cart.totalCents)}`} />
                        <button
                          className={`btn ${cart.count === 0 ? "btn-secondary" : "btn-success"} w-100`}
                          onClick={() => setShowResumo(true)}
                          disabled={cart.count === 0}
                        >
                          Finalizar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ==== GALERIA DA COREOGRAFIA ==== */}
              {view === "coreo" && currentCoreo && (
                <div style={{ marginTop: 16 }}>
                  {/* Top bar */}
                  <div style={{ placeContent: "end" }} className="row w-100 m-0 mt-3">
                    <div className="col-12 col-md-3 text-end">
                      <button
                        onClick={() => setView("event")}
                        className="btn btn-outline-secondary w-100"
                      >
                        ← Voltar
                      </button>
                    </div>
                  </div>

                  <div className="bar-stack" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <h4 style={{ margin: 0 }}>{currentCoreo.title}</h4>

                    <div style={{ marginLeft: "auto", display: "flex", gap: 12, alignItems: "center" }}>
                      <button onClick={cart.clear} className="btn btn-outline-secondary btn-mobile">
                        Limpar seleção do evento
                      </button>
                      <span className="badge" style={{ borderRadius: 999, padding: "6px 12px" }}>
                        Selecionadas: {cart.count}
                      </span>
                    </div>
                  </div>

                  {/* Grid de fotos */}
                  <div
                    className="grid-xs-1"
                    style={{
                      display: "grid",
                      gap: 12,
                      gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                      marginTop: 12,
                    }}
                  >
                    {currentCoreo.images?.map((imgSrc) => {
                      const file = fileNameFromSrc(imgSrc);
                      const composedId = `${currentCoreo.id}::${file}`;
                      const selected = cart.items.includes(composedId);
                      return (
                        <div
                          key={composedId}
                          onClick={() => openViewer(currentCoreo.id, imgSrc)}
                          className={`thumb border rounded-3 ${selected ? "is-selected" : ""}`}
                          role="button"
                          tabIndex={0}
                        >
                          <span className="thumb-label">{file}</span>
                          <img alt={file} loading="lazy" src={imgSrc} />
                          {selected && <span className="check">✓</span>}
                        </div>
                      );
                    })}
                  </div>

                  {/* Barra inferior: Total + Finalizar */}
                  <div
                    className="bar-stack"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      justifyContent: "flex-end",
                      marginTop: 16,
                    }}
                  >
                    <div className="col-6 col-md-3 ms-auto">
                      <div style={{ textAlign: "end" }} className="row w-100 m-0 mt-3 align-items-center">
                        <TotalStrong value={`Total: ${moneyBRL(cart.totalCents)}`} />
                        <button
                          className={`btn ${cart.count === 0 ? "btn-secondary" : "btn-success"} w-100`}
                          onClick={() => setShowResumo(true)}
                          disabled={cart.count === 0}
                        >
                          Finalizar
                        </button>
                      </div>
                    </div>
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
      <Modal
        isOpen={showResumo}
        toggle={() => setShowResumo(false)}
        className="modal-checkout modal-top"
        modalClassName="modal-top"
        scrollable
      >
        <ModalHeader toggle={() => setShowResumo(false)}>
          <span className="badge">Finalizar pedido</span>
        </ModalHeader>

        <ModalBody>
          {cart.count === 0 ? (
            <p>Nenhuma foto selecionada.</p>
          ) : (
            <div className="mc-grid">
              <div className="card-soft">
                <div className="mc-h6">
                  Selecionadas por coreografia <span className="badge">{cart.count}</span>
                </div>
                <div className="sel-list">
                  {currentEvent?.coreos?.map((c) => {
                    const list = groupedByCoreo[c.id] || [];
                    if (!list.length) return null;
                    return (
                      <div key={c.id} style={{ marginBottom: 12 }}>
                        <div style={{ fontWeight: 700, marginBottom: 6 }}>{c.title}</div>
                        <div style={{ display: "grid", gap: 6 }}>
                          {list.map((name) => (
                            <div key={name} className="sel-item">
                              {name}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="total-row">
                  <div className="total-label">Valor total</div>
                  <div className="total-value">{moneyBRL(cart.totalCents)}</div>
                </div>
                <div className="small" style={{ marginTop: 6, textAlign: "end" }}>
                  ({moneyBRL(PRICE_PER_PHOTO)} por foto)
                </div>
              </div>

              <div className="card-soft">
                <div className="mc-h6">Seus dados</div>
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
              </div>
            </div>
          )}
        </ModalBody>

        <ModalFooter className="w-100 d-flex justify-content-between">
          <button className="btn btn-outline-secondary" onClick={() => setShowResumo(false)}>
            Voltar
          </button>

          <button
            className={`btn ${cart.count === 0 ? "btn-secondary" : "btn-success"}`}
            onClick={finalizarNoWhats}
            disabled={cart.count === 0}
          >
            Finalizar
          </button>
        </ModalFooter>
      </Modal>

      {/* ===== MODAL DE VISUALIZAÇÃO DE IMAGEM ===== */}
      <Modal
        isOpen={viewerOpen}
        toggle={closeViewer}
        className="modal-viewer modal-top"
        modalClassName="modal-top"
      >
        <ModalHeader toggle={closeViewer}>
          <div className="d-flex flex-column">
            <span className="fw-bold">Visualizar foto</span>
            {!!viewerData.file && <small className="text-muted">{viewerData.file}</small>}
          </div>
        </ModalHeader>

        <ModalBody className="p-0">
          {viewerData.imgSrc ? (
            <div className="viewer-img-wrap d-flex flex-column align-items-center position-relative">
              {/* selo de selecionada */}
              {isCurrentSelected() && <span className="viewer-check">✓ Selecionada</span>}

              <img
                src={viewerData.imgSrc}
                alt={viewerData.file || "foto"}
                className="viewer-img mb-2"
              />

              {/* navegação colada na foto */}
              <div className="d-flex justify-content-between w-100 px-3">
                <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
                  ← Anterior
                </button>
                <button className="btn btn-outline-secondary" onClick={() => navigate(1)}>
                  Próxima →
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 text-center text-muted">Carregando…</div>
          )}
        </ModalBody>

        <ModalFooter className="w-100 d-flex justify-content-between">
          <button className="btn btn-outline-secondary" onClick={closeViewer}>
            Voltar
          </button>

          <button
            className={`btn ${isCurrentSelected() ? "btn-secondary" : "btn-success"}`}
            onClick={toggleSelectCurrent} // não fecha o modal
          >
            {isCurrentSelected() ? "Remover da seleção" : "Selecionar esta foto"}
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
}