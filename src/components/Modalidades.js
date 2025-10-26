import React from "react";
import { Container, Row, Col } from "reactstrap";

import m1 from "assets/img/modalidades/baby_fraldinha.jpeg";
import m2 from "assets/img/modalidades/baby_class.jpeg";
import m3 from "assets/img/modalidades/ballet_infantil.jpeg";
import m4 from "assets/img/modalidades/jazz.jpeg";
import m5 from "assets/img/modalidades/ventre.jpeg";
import m6 from "assets/img/modalidades/juvenil_adulto.jpeg";

const defaultCards = [
  {
    src: m1,
    alt: "Baby Fraldinha - Psicomotricidade (A partir de 1 ano e 10 meses)",
    label: "Baby Fraldinha / Psicomotricidade - A partir de 1 ano e 10 meses",
  },
  { src: m2, alt: "Ballet Baby Class - A partir dos 3 anos", label: "Ballet Baby Class - A partir dos 3 anos" },
  { src: m3, alt: "Ballet Infantil - A partir dos 6 anos", label: "Ballet Infantil - A partir dos 6 anos" },
  { src: m4, alt: "Jazz Dance - A partir dos 6 anos", label: "Jazz Dance - A partir dos 6 anos" },
  { src: m5, alt: "Dança do Ventre", label: "Dança do Ventre" },
  { src: m6, alt: "Ballet Juvenil e Adulto - A partir 15 anos", label: "Ballet Juvenil e Adulto - A partir 15 anos" },
];

export default function ModalidadesGrid({ cards = defaultCards }) {
  const sectionStyle = {
    backgroundColor: "#ECE9E9",
    paddingTop: 60,
    paddingBottom: 60,
  };

  const cardWrap = {
    position: "relative",
    width: "100%",
    paddingTop: "100%",
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
    background: "#ddd",
    cursor: "pointer",
  };

  const titleStyle = {
    color: "#f5ae28",
    fontFamily: "Parisienne, cursive",
    fontWeight: 400,
    fontSize: "36px",
    lineHeight: 1.2,
    marginBottom: "16px",
  };

  const cardImg = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center center",
    transition: "transform .25s ease, filter .25s ease",
  };

  const label = {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: "12px 14px",
    color: "#fff",
    background:
      "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(12,16,45,0.9) 100%)",
    fontWeight: 600,
    letterSpacing: 0.2,
    textShadow: "0 3px 8px rgba(0,0,0,0.8)",
    fontSize: 15,
    lineHeight: 1.3,
    userSelect: "none",
    zIndex: 2,
  };

  return (
    <section style={sectionStyle} id="modalidades">
      <Container>
        <Row className="mb-4">
          <Col className="text-center">
            <h1 style={titleStyle}>Modalidades</h1>
          </Col>
        </Row>

        <Row className="g-3">
          {cards.slice(0, 6).map((c, idx) => (
            <Col key={idx} xs="6" md="4">
              <div
                style={cardWrap}
                onMouseEnter={(e) => {
                  const img = e.currentTarget.querySelector(".main-img");
                  if (img) img.style.transform = "scale(1.06)";
                }}
                onMouseLeave={(e) => {
                  const img = e.currentTarget.querySelector(".main-img");
                  if (img) img.style.transform = "scale(1)";
                }}
              >
                {/* Fundo desfocado da própria imagem */}
                <img
                  src={c.src}
                  alt=""
                  style={{
                    ...cardImg,
                    filter: "blur(15px) brightness(0.8)",
                    transform: "scale(1.15)",
                    zIndex: 0,
                    pointerEvents: "none", // <-- impede que o fundo capture o hover
                  }}
                />

                {/* Imagem principal */}
                <img
                  className="main-img"
                  loading="lazy"
                  src={c.src}
                  alt={c.alt}
                  style={{
                    ...cardImg,
                    zIndex: 1,
                    objectFit: "contain",
                    objectPosition: "center center",
                  }}
                />

                <div style={label}>{c.label}</div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
