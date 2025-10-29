import React, { useState, useEffect } from "react";

export default function BotaoWhatsapp() {
  const [hover, setHover] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const numero = "5511964230207"; // ✅ número atualizado (55 = Brasil, 11 = SP)
  const mensagem = encodeURIComponent(
    "Olá! Gostaria de saber mais sobre as aulas de dança"
  );

  // Exibe o tooltip automaticamente por 3s ao entrar na página
  useEffect(() => {
    setShowTooltip(true);
    const timer = setTimeout(() => setShowTooltip(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Mostra novamente ao passar o mouse
  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);

  const isVisible = hover || showTooltip;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 9999,
      }}
    >
      {/* Tooltip animado */}
      <div
        style={{
          position: "absolute",
          bottom: "70px",
          right: isVisible ? "0" : "-9999px",
          backgroundColor: "#0c102d",
          color: "#D3AF37",
          padding: "8px 14px",
          borderRadius: "20px",
          fontSize: "14px",
          fontWeight: 500,
          whiteSpace: "nowrap",
          boxShadow: "0 3px 8px rgba(0,0,0,0.3)",
          transform: isVisible ? "translateY(0)" : "translateY(10px)",
          opacity: isVisible ? 1 : 0,
          transition:
            "opacity 0.3s ease, transform 0.3s ease, right 0.3s ease-in-out",
        }}
      >
        💬 Fale conosco
      </div>

      {/* Botão principal */}
      <a
        href={`https://wa.me/${numero}?text=${mensagem}`}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          backgroundColor: "#25D366",
          color: "#fff",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 3px 10px rgba(0,0,0,0.3)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          textDecoration: "none",
        }}
      >
        <i className="lab la-whatsapp" style={{ fontSize: "32px" }}></i>
      </a>
    </div>
  );
}
