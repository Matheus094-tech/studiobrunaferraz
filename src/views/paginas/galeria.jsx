// src/views/paginas/galeria.jsx
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

// ====== CAPAS (exemplo) ======
import coverNovembro from "assets/img_wm/espetaculos/novembro/capa.jpg";
import coverCoreo1 from "assets/img_wm/espetaculos/novembro/coreografia_1/capa.jpg";
import coverCoreo2 from "assets/img_wm/espetaculos/novembro/coreografia_2/capa.jpg";
import coverCoreo3 from "assets/img_wm/espetaculos/novembro/coreografia_3/capa.jpg";

// CSS do tema (mantém seu arquivo)
import "assets/css/galeria.css";

/* ======================= HELPERS ======================= */
function importAll(ctx, excludeRe) {
  try {
    return ctx.keys().filter((k) => (excludeRe ? !excludeRe.test(k) : true)).map(ctx);
  } catch (e) {
    console.error("[Galeria] Falha ao importar imagens:", e);
    return [];
  }
}
const EXCLUDE_COVER = /\/?capa\.(jpg|jpeg|png|webp)$/i;

const moneyBRL = (cents) =>
  (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const fileNameFromSrc = (imgSrc) => {
  try {
    const parts = String(imgSrc).split("/");
    return decodeURIComponent(parts[parts.length - 1]);
  } catch {
    return String(imgSrc);
  }
};

/* ================== IMPORT DINÂMICO (fotos) ================== */
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

/* ======================= CONFIG ======================= */
const WHATSAPP_NUMBER = "5511964230207";
const PRICE_PER_PHOTO = 2000;

/* ======================= EVENTS ======================= */
const EVENTS = [
  {
    id: "esp-novembro",
    title: "A Magia das Cores",
    cover: coverNovembro,
    coreos: [
      { id: "esp-novembro-coreo-01", title: "COREOGRAFIA 01 - Baby class", cover: coverCoreo1, images: coreografia1Imgs },
      { id: "esp-novembro-coreo-02", title: "COREOGRAFIA 02 - Adulto",      cover: coverCoreo2, images: coreografia2Imgs },
      { id: "esp-novembro-coreo-03", title: "COREOGRAFIA 03 - Jazz",        cover: coverCoreo3, images: coreografia3Imgs },
    ],
  },
];

/* ============ Carrinho por evento (localStorage) ============ */
function useLocalCartByEvent(eventId, priceCents) {
  const key = `cart-${eventId ?? "none"}`;
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch { return []; }
  });
  useEffect(() => { localStorage.setItem(key, JSON.stringify(items)); }, [key, items]);

  const toggle = (id) =>
    setItems((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  const clear  = () => setItems([]);

  return { items, count: items.length, totalCents: items.length * priceCents, toggle, clear };
}

/* ======================= SUBCOMPONENTES ======================= */
function ActionBar({ count, totalCents, onClear, onFinalize, finalizeDisabled }) {
  return (
    <div
      className="w-100 d-flex align-items-center flex-wrap gap-2 mt-4"
      style={{ justifyContent: "flex-end" }}
    >
      <span className="badge" style={{ borderRadius: 999, padding: "6px 12px" }}>
        Selecionadas: {count}
      </span>

      <button
        onClick={onClear}
        className="btn btn-outline-secondary"
        title="Remover todas as fotos selecionadas deste evento"
      >
        Limpar seleção do evento
      </button>

      <div className="ms-auto d-grid" style={{ minWidth: 260 }}>
        <span className="text-end" style={{ marginBottom: 6 }}>
          <strong style={{ color: "#f5ae28" }}>
            Total: {moneyBRL(totalCents)}
          </strong>
        </span>
        <button
          className={`btn ${finalizeDisabled ? "btn-secondary" : "btn-success"}`}
          onClick={onFinalize}
          disabled={finalizeDisabled}
        >
          Finalizar
        </button>
      </div>
    </div>
  );
}

/* ======================= COMPONENTE ======================= */
export default function Galeria() {
  // (deixe seu wrapper/layout externo cuidar do navbar e do bg)
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
    <span style={{ color: "#f5ae28", fontWeight: 800, fontSize: 18 }}>{value}</span>
  );

  /* ============ Viewer (Modal – visual das Modalidades) ============ */
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerData, setViewerData] = useState({ coreoId: null, imgSrc: null, file: null, index: -1 });

  const openViewer = useCallback((coreoIdParam, imgSrcParam) => {
    const list = currentCoreo?.images || [];
    const idx  = list.findIndex((src) => src === imgSrcParam);
    const file = fileNameFromSrc(imgSrcParam);
    setViewerData({ coreoId: coreoIdParam, imgSrc: imgSrcParam, file, index: idx < 0 ? 0 : idx });
    setViewerOpen(true);
  }, [currentCoreo]);

  const closeViewer = () => setViewerOpen(false);

  const isCurrentSelected = useCallback(() => {
    if (!viewerData.coreoId || !viewerData.file) return false;
    const composedId = `${viewerData.coreoId}::${viewerData.file}`;
    return cart.items.includes(composedId);
  }, [viewerData, cart.items]);

  const toggleSelectCurrent = useCallback(() => {
    if (!viewerData.coreoId || !viewerData.file) return;
    const composedId = `${viewerData.coreoId}::${viewerData.file}`;
    cart.toggle(composedId);
  }, [viewerData, cart]);

  const navigate = useCallback((delta) => {
    if (!currentCoreo?.images?.length) return;
    const total = currentCoreo.images.length;
    let nextIndex = viewerData.index + delta;
    if (nextIndex < 0) nextIndex = total - 1;
    if (nextIndex >= total) nextIndex = 0;
    const nextSrc = currentCoreo.images[nextIndex];
    setViewerData({ coreoId: currentCoreo.id, imgSrc: nextSrc, file: fileNameFromSrc(nextSrc), index: nextIndex });
  }, [currentCoreo, viewerData.index]);

  // atalhos de teclado no viewer
  useEffect(() => {
    if (!viewerOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape")       { e.preventDefault(); closeViewer(); }
      else if (e.key === "ArrowLeft")  { e.preventDefault(); navigate(-1); }
      else if (e.key === "ArrowRight") { e.preventDefault(); navigate(1); }
      else if (e.key === " " || e.key === "Enter") { e.preventDefault(); toggleSelectCurrent(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [viewerOpen, navigate, toggleSelectCurrent]);

  /* =================== Styles inline mínimos =================== */
  const sectionStyle = { backgroundColor: "#ECE9E9", paddingTop: 60, paddingBottom: 60 };
  const titleStyle   = { color: "#f5ae28", fontFamily: "Parisienne, cursive", fontWeight: 400, fontSize: "36px", lineHeight: 1.2, marginBottom: "16px" };

  const cardWrap = {
    position: "relative",
    width: "100%",
    paddingTop: "100%", // quadrado
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
    background: "#fff",
    cursor: "pointer",
    border: "1px solid #e9e9e9",
  };
  const cardImg = { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", transition: "transform .25s ease" };
  const cardLabel = {
    position: "absolute", left: 0, right: 0, bottom: 0, padding: "10px 12px",
    color: "#ECE9E9", background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.65) 100%)",
    fontWeight: 600, letterSpacing: 0.2, textShadow: "0 2px 10px rgba(0,0,0,.6)", fontSize: 16, lineHeight: 1.2, userSelect: "none",
  };

  return (
    <>
      <div className="wrapper">
        <div className="main">
          <section id="comprar-fotos" style={sectionStyle}>
            <Container>
              <Row className="mb-4"><Col className="text-center"><h1 style={titleStyle}>Galeria</h1></Col></Row>

              {/* ============ LISTA DE EVENTOS ============ */}
              {view === "events" && (
                <Row className="g-3">
                  {EVENTS.map((ev) => (
                    <Col key={ev.id} xs="12" md="6" lg="4">
                      <div
                        style={cardWrap}
                        onClick={() => { setEventId(ev.id); setCoreoId(ev.coreos?.[0]?.id ?? null); setView("event"); }}
                        onMouseEnter={(e) => { const img = e.currentTarget.querySelector("img"); if (img) img.style.transform = "scale(1.06)"; }}
                        onMouseLeave={(e) => { const img = e.currentTarget.querySelector("img"); if (img) img.style.transform = "scale(1)"; }}
                        title={ev.title}
                        aria-label={`Abrir ${ev.title}`}
                      >
                        <img src={ev.cover} alt={ev.title} style={cardImg} />
                        <div style={cardLabel}>
                          {ev.title}
                          <div style={{ fontSize: 12, opacity: 0.9 }}>
                            Clique para ver {ev.coreos?.length ?? 0} coreografia(s)
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              )}

              {/* ============ COREOGRAFIAS DO EVENTO ============ */}
              {view === "event" && currentEvent && (
                <>
<div
  className="row w-100 m-0 mt-3 align-items-center justify-content-between"
  style={{ gap: "10px" }}
>
  {/* Esquerda - botão voltar */}
  <div className="col-auto">
    <button
      onClick={() => setView("events")}
      className="btn btn-outline-secondary"
    >
      ← Voltar
    </button>
  </div>

  {/* Direita - Action Bar */}
  <div className="col-auto d-flex align-items-center gap-2">
    <span
      className="badge"
      style={{
        borderRadius: 999,
        padding: "6px 12px",
        background: "#0c102d",
        color: "#ECE9E9",
      }}
    >
      Selecionadas: {cart.count}
    </span>

    <button
      onClick={cart.clear}
      className="btn btn-outline-warning"
      style={{ whiteSpace: "nowrap", fontWeight: 500 }}
    >
      Limpar seleção do evento
    </button>
  </div>
</div>


                  <Row className="g-3 mt-1">
                    {currentEvent.coreos?.map((c) => (
                      <Col key={c.id} xs="12" md="6" lg="4">
                        <div
                          style={cardWrap}
                          onClick={() => { setCoreoId(c.id); setView("coreo"); }}
                          onMouseEnter={(e) => { const img = e.currentTarget.querySelector("img"); if (img) img.style.transform = "scale(1.06)"; }}
                          onMouseLeave={(e) => { const img = e.currentTarget.querySelector("img"); if (img) img.style.transform = "scale(1)"; }}
                          title={c.title}
                          aria-label={`Abrir ${c.title}`}
                        >
                          <img src={c.cover} alt={c.title} style={cardImg} />
                          <div style={cardLabel}>{c.title} — {c.images?.length ?? 0} foto(s)</div>
                        </div>
                      </Col>
                    ))}
                  </Row>

                </>
              )}

              {/* ============ FOTOS DA COREOGRAFIA ============ */}
              {view === "coreo" && currentCoreo && (
                <>
                  <div className="row w-100 m-0 mt-3">
                    <div className="col-12 col-md-3 text-end">
                      <button onClick={() => setView("event")} className="btn btn-outline-secondary w-100">← Voltar</button>
                    </div>
                  </div>

                  <Row className="g-3 mt-1">
                    {currentCoreo.images?.map((src) => {
                      const file = fileNameFromSrc(src);
                      const composedId = `${currentCoreo.id}::${file}`;
                      const selected = cart.items.includes(composedId);
                      return (
                        <Col key={composedId} xs="6" md="4" lg="3">
                          <div
                            className={`thumb-card ${selected ? "is-selected" : ""}`}
                            onClick={() => openViewer(currentCoreo.id, src)}
                            title={file}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === "Enter" && openViewer(currentCoreo.id, src)}
                          >
                            <div className="thumb-quad"><img loading="lazy" src={src} alt={file} /></div>
                            <div className="thumb-overlay">
                              <span className="thumb-name">{file}</span>
                              {selected && <span className="thumb-check">✓</span>}
                            </div>
                          </div>
                        </Col>
                      );
                    })}
                  </Row>


                </>
              )}

              {!hasEvents && (
                <div className="text-center" style={{ marginTop: 24 }}>
                  <p>Nenhum evento cadastrado.</p>
                </div>
              )}
            </Container>
          </section>
        </div>
      </div>

      {/* ================== MODAL DE RESUMO ================== */}
      <Modal
        isOpen={showResumo}
        toggle={() => setShowResumo(false)}
        className="modal-checkout modal-top"
        scrollable
        centered
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
                            <div key={name} className="sel-item">{name}</div>
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

      {/* ================== MODAL VIEWER (visual Modalidades) ================== */}
      <Modal
        isOpen={viewerOpen}
        toggle={closeViewer}
        className="modal-viewer modal-top"
        size="lg"
        centered
      >
        <ModalHeader toggle={closeViewer}>
          <div className="d-flex flex-column">
            <span className="fw-bold">Visualizar foto</span>
            {!!viewerData.file && <small className="text-muted">{viewerData.file}</small>}
          </div>
        </ModalHeader>

        <ModalBody className="p-0">
          {viewerData.imgSrc ? (
            <div
              className="viewer-img-wrap"
              style={{
                position: "relative",
                width: "100%",
                height: "80vh",
                minHeight: 360,
                background: "#ECE9E9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              {/* Fundo desfocado */}
              <img
                src={viewerData.imgSrc}
                alt=""
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "blur(25px) brightness(0.8)",
                  transform: "scale(1.1)",
                  zIndex: 0,
                }}
              />
              {/* Imagem principal */}
              <img
                src={viewerData.imgSrc}
                alt={viewerData.file || "foto"}
                style={{
                  position: "relative",
                  zIndex: 2,
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  borderRadius: 8,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                }}
              />

              {/* Controles */}
              <button
                type="button"
                onClick={() => navigate(-1)}
                aria-label="Anterior"
                title="Anterior"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: 10,
                  transform: "translateY(-50%)",
                  background: "#ECE9E9",
                  color: "#f5ae28",
                  border: "none",
                  borderRadius: "50%",
                  width: 44,
                  height: 44,
                  fontSize: 22,
                  cursor: "pointer",
                  zIndex: 3,
                }}
              >
                ‹
              </button>

              <button
                type="button"
                onClick={() => navigate(1)}
                aria-label="Próxima"
                title="Próxima"
                style={{
                  position: "absolute",
                  top: "50%",
                  right: 10,
                  transform: "translateY(-50%)",
                  background: "#ECE9E9",
                  color: "#f5ae28",
                  border: "none",
                  borderRadius: "50%",
                  width: 44,
                  height: 44,
                  fontSize: 22,
                  cursor: "pointer",
                  zIndex: 3,
                }}
              >
                ›
              </button>
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
            onClick={toggleSelectCurrent}
          >
            {isCurrentSelected() ? "Remover da seleção" : "Selecionar esta foto"}
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
}
