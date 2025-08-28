import React, { useEffect, useMemo, useState } from "react";

// CONFIGURAÇÕES GERAIS
const WHATSAPP_NUMBER = "55XXXXXXXXXXX"; // DDI + DDD + número
const PRICE_PER_PHOTO = 1500; // em centavos (R$ 15,00)

// Catálogo exemplo. Substitua pelos seus eventos/coreografias/imagens.
// Use caminhos públicos (ex.: /fotos/evento-1/coreo-2/IMG001.jpg) ou URLs absolutas.
const EVENTS = [
  {
    id: "petipa-2025-03-17",
    title: "01 - Petipa - 17 de Março",
    coreos: [
      {
        id: "coreo-02",
        title: "COREOGRAFIA 02",
        dir: "/fotos/eventos/01 - Petipa - 17 de Março/COREOGRAFIA 02/",
        images: Array.from({ length: 12 }, (_, i) => `02 (${i + 1}).svg`),
      },
    ],
  },
];

// Utils
const moneyBRL = (cents) => (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function useLocalCart(key, priceCents) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key) || "[]");
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(items));
  }, [key, items]);

  const actions = useMemo(
    () => ({
      toggle: (id) =>
        setItems((prev) => {
          const exists = prev.includes(id);
          if (exists) return prev.filter((x) => x !== id);
          return [...prev, id];
        }),
      clear: () => setItems([]),
    }),
    []
  );

  return {
    items,
    count: items.length,
    totalCents: items.length * priceCents,
    ...actions,
  };
}

function Breadcrumb({ children }) {
  return (
    <div className="flex items-center gap-2 text-sm text-neutral-300 mb-3">
      {children}
    </div>
  );
}

function CardButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="btn inline-flex items-center gap-2 rounded-2xl border border-neutral-700 bg-neutral-900 px-4 py-2 hover:border-neutral-600 hover:bg-neutral-800 transition"
    >
      {children}
    </button>
  );
}

export default function Carrinho() {
  const [view, setView] = useState("events"); // "events" | "coreo"
  const [eventId, setEventId] = useState(EVENTS[0]?.id);
  const [coreoId, setCoreoId] = useState(EVENTS[0]?.coreos[0]?.id);

  const currentEvent = useMemo(() => EVENTS.find((e) => e.id === eventId), [eventId]);
  const currentCoreo = useMemo(
    () => currentEvent?.coreos.find((c) => c.id === coreoId),
    [currentEvent, coreoId]
  );

  // Cart per event+coreo
  const cartKey = `cart-${eventId}-${coreoId}`;
  const cart = useLocalCart(cartKey, PRICE_PER_PHOTO);

  const goEvent = (id) => {
    setEventId(id);
    setView("event");
  };
  const goCoreo = (id) => {
    setCoreoId(id);
    setView("coreo");
  };

  // share selection in URL (?sel=...)
  const shareUrl = () => {
    try {
      const sel = encodeURIComponent(
        btoa(unescape(encodeURIComponent(JSON.stringify(cart.items))))
      );
      const u = new URL(window.location.href);
      u.searchParams.set("sel", sel);
      return u.toString();
    } catch (e) {
      return window.location.href;
    }
  };

  // Apply selection from URL once per mount
  useEffect(() => {
    const m = window.location.search.match(/[?&]sel=([^&]+)/);
    if (!m) return;
    try {
      const raw = decodeURIComponent(m[1]);
      const arr = JSON.parse(decodeURIComponent(escape(atob(raw))));
      if (Array.isArray(arr)) {
        localStorage.setItem(cartKey, JSON.stringify(arr));
        window.history.replaceState({}, "", window.location.pathname); // limpa a query
        // força recarregar estado do cart
        const parsed = JSON.parse(localStorage.getItem(cartKey) || "[]");
        if (Array.isArray(parsed)) {
          // rehydrate
          // eslint-disable-next-line no-unsafe-finally
          setTimeout(() => window.location.reload(), 0);
        }
      }
    } catch (e) {
      // ignore
    }
  }, [cartKey]);

  const finalizeWhatsApp = (payload) => {
    const msg = [
      "*Pedido de fotos - Studio Bruna Ferraz*",
      `Evento: ${currentEvent?.title}`,
      `Coreografia: ${currentCoreo?.title}`,
      `Qtd: ${cart.count}`,
      `Arquivos: ${cart.items.join(", ") || "(nenhum)"}`,
      `Total: ${moneyBRL(cart.totalCents)}`,
      "",
      `Nome: ${payload.nome}`,
      `E-mail: ${payload.email}`,
      `Telefone: ${payload.tel}`,
    ].join("\n");
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <header className="sticky top-0 z-10 border-b border-neutral-900 bg-black/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-3">
          <div className="font-semibold">Comprar Fotos</div>
          <div className="ml-auto text-sm opacity-80">Preço: {moneyBRL(PRICE_PER_PHOTO)}</div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        {view === "events" && (
          <section>
            <div className="text-sm text-neutral-400 mb-2">Escolha um evento</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {EVENTS.map((ev) => (
                <button
                  key={ev.id}
                  onClick={() => goEvent(ev.id)}
                  className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4 text-left hover:border-neutral-700 hover:bg-neutral-800"
                >
                  <div className="font-semibold">{ev.title}</div>
                  <div className="text-sm opacity-70">{ev.coreos.length} coreografia(s)</div>
                </button>
              ))}
            </div>
          </section>
        )}

        {view === "event" && (
          <section>
            <Breadcrumb>
              <button onClick={() => setView("events")} className="hover:underline">Eventos</button>
              <span>›</span>
              <span className="opacity-90">{currentEvent?.title}</span>
            </Breadcrumb>
            <div className="text-sm text-neutral-400 mb-2">Escolha a coreografia</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {currentEvent?.coreos.map((c) => (
                <button
                  key={c.id}
                  onClick={() => goCoreo(c.id)}
                  className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4 text-left hover:border-neutral-700 hover:bg-neutral-800"
                >
                  <div className="font-semibold">{c.title}</div>
                  <div className="text-sm opacity-70">{c.images.length} fotos</div>
                </button>
              ))}
            </div>
          </section>
        )}

        {view === "coreo" && currentCoreo && (
          <CoreoGallery
            eventTitle={currentEvent?.title}
            coreo={currentCoreo}
            cart={cart}
            onBack={() => setView("event")}
            onFinalize={finalizeWhatsApp}
            shareUrl={shareUrl}
          />
        )}
      </main>
    </div>
  );
}

function CoreoGallery({ eventTitle, coreo, cart, onBack, onFinalize, shareUrl }) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [form, setForm] = useState({ nome: "", email: "", tel: "" });

  return (
    <section>
      <Breadcrumb>
        <button onClick={onBack} className="hover:underline">{eventTitle}</button>
        <span>›</span>
        <span className="opacity-90">{coreo.title}</span>
        <span className="ml-auto text-xs opacity-70">Selecionadas: {cart.count}</span>
      </Breadcrumb>

      <div className="flex gap-2 mb-3">
        <CardButton onClick={cart.clear}>Limpar seleção</CardButton>
        <CardButton
          onClick={() => {
            const url = shareUrl();
            if (navigator.clipboard?.writeText) {
              navigator.clipboard.writeText(url).then(() => alert("Link copiado!"));
            } else {
              window.prompt("Copie o link:", url);
            }
          }}
        >
          Copiar link da seleção
        </CardButton>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {coreo.images.map((name) => {
          const id = name;
          const selected = cart.items.includes(id);
          return (
            <button
              key={id}
              onClick={() => cart.toggle(id)}
              className={`relative h-40 overflow-hidden rounded-xl border ${
                selected ? "border-emerald-400 ring-1 ring-emerald-400" : "border-neutral-800"
              } bg-neutral-900 hover:border-neutral-700`}
            >
              <span className="absolute left-2 top-2 rounded-md bg-black/60 px-2 py-1 text-xs text-white">
                {name}
              </span>
              <img
                loading="lazy"
                alt={name}
                className="h-full w-full object-cover"
                src={coreo.dir + encodeURIComponent(name)}
              />
              {selected && (
                <span className="absolute bottom-2 right-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-400 font-bold text-black">
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Floating bar */}
      <div className="sticky bottom-4 mt-6 flex items-center justify-end gap-3">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 px-4 py-2 text-sm">
          <span className="opacity-70">Total:</span> {moneyBRL(cart.totalCents)}
        </div>
        <button
          onClick={() => setShowCheckout(true)}
          className="rounded-2xl bg-emerald-400 px-5 py-2 font-semibold text-black shadow-lg hover:brightness-95"
        >
          Finalizar ({cart.count})
        </button>
      </div>

      {/* Checkout modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
          <div className="w-full max-w-lg rounded-2xl border border-neutral-800 bg-neutral-950 p-4">
            <div className="mb-3 flex items-center">
              <div className="text-lg font-semibold">Finalizar pedido</div>
              <button onClick={() => setShowCheckout(false)} className="ml-auto text-sm opacity-70 hover:opacity-100">Fechar</button>
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-sm font-medium">Fotos selecionadas ({cart.count})</div>
                <div className="text-xs opacity-70 break-words">
                  {cart.items.join(", ") || "Nenhuma selecionada."}
                </div>
                <div className="mt-1 text-sm">Total: {moneyBRL(cart.totalCents)}</div>
              </div>

              <div className="grid gap-2">
                <label className="text-sm opacity-80">Nome completo</label>
                <input
                  className="rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-400"
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  placeholder="Seu nome"
                />
                <label className="text-sm opacity-80">E-mail</label>
                <input
                  type="email"
                  className="rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-400"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="seu@email.com"
                />
                <label className="text-sm opacity-80">Telefone (DDD + número)</label>
                <input
                  className="rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-400"
                  value={form.tel}
                  onChange={(e) => setForm({ ...form, tel: e.target.value })}
                  placeholder="11999999999"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowCheckout(false)}
                  className="rounded-2xl border border-neutral-800 bg-neutral-900 px-4 py-2 hover:bg-neutral-800"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    if (!form.nome || !form.email || !form.tel) {
                      alert("Preencha todos os campos.");
                      return;
                    }
                    onFinalize(form);
                  }}
                  className="rounded-2xl bg-emerald-400 px-5 py-2 font-semibold text-black hover:brightness-95"
                >
                  Finalizar no WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
