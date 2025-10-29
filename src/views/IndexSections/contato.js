// src/views/IndexSections/contato.js
import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../../pages/Home.css";

const numero = "5511964230207"; // 55 = BR, 11 = SP
const mensagem = encodeURIComponent(
  "Olá! Gostaria de saber mais sobre as aulas de dança"
);

export default function Contato() {
  return (
    <section
      id="contato"
      className="section"
      style={{
        background: "#ECE9E9",
        paddingTop: "40px",     // mesmo topo das outras seções
        paddingBottom: "60px",   // mesmo bottom
        scrollMarginTop: "80px", // compensa navbar fixa (igual rule global de <section>)
      }}
    >
      <Container>
        {/* ===== TÍTULO PADRÃO (igual às outras seções) ===== */}
        <div className="text-center mt-4">
          <h2
            style={{
              color: "#000080", // mesmo tom navy usado em "Modalidades"
              fontFamily: "Parisienne, cursive",
              fontWeight: 400,
              fontSize: 40,
              lineHeight: 1.2,
              marginBottom: 16,
            }}
          >
            Contato & Localização
          </h2>
          <div
            style={{
              width: 80,
              height: 3,
              backgroundColor: "#D3AF37",
              margin: "0 auto 40px auto",
              borderRadius: 2,
            }}
          />
        </div>

        {/* ===== CONTEÚDO (largura idêntica ao grid de Modalidades) ===== */}
        <div className="container" style={{ maxWidth: 1100 }}>
          <Row className="align-items-stretch gy-4 gx-4">
            {/* MAPA */}
            <Col md="6" className="mb-4 mb-md-0">
              <div
                style={{
                  width: "100%",
                  height: 380,
                  borderRadius: 12,
                  overflow: "hidden",
                  background: "#e9ecef",
                  boxShadow: "0 8px 24px rgba(0,0,0,.12)",
                }}
              >
                <iframe
                  title="Mapa - Studio de Dança Bruna Ferraz"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14641.68771351002!2d-46.4084549!3d-23.4452404!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce63ec51d9988f%3A0x85120da955fc53f5!2sStudio%20de%20Dan%C3%A7a%20Bruna%20Ferraz!5e0!3m2!1spt-BR!2sbr!4v1702907038089!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Col>

            {/* INFO */}
            <Col md="6">
              {/* Endereço */}
              <div
                className="mb-3"
                style={{
                  background: "#0c102d",
                  color: "#fff",
                  borderRadius: 12,
                  padding: "16px 18px",
                  boxShadow: "0 8px 24px rgba(0,0,0,.12)",
                }}
              >
                <div className="d-flex align-items-start">
                  <i
                    className="las la-map-marker-alt"
                    style={{
                      fontSize: 28,
                      color: "#D3AF37",
                      marginRight: 10,
                      lineHeight: 1,
                    }}
                  />
                  <div style={{ lineHeight: 1.6 }}>
                    <strong style={{ color: "#D3AF37" }}>Endereço</strong>
                    <div>
                      R. Olho D’Água do Casado, 94 – Jardim Carvalho,
                      <br />
                      Guarulhos – SP, 07244-380
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <div
                className="mb-3"
                style={{
                  background: "#fff",
                  color: "#0c102d",
                  borderRadius: 12,
                  padding: "16px 18px",
                  border: "1px solid #e9e9e9",
                  boxShadow: "0 8px 20px rgba(0,0,0,.06)",
                }}
              >
                <div className="d-flex align-items-start">
                  <i
                    className="las la-headset"
                    style={{
                      fontSize: 26,
                      color: "#D3AF37",
                      marginRight: 10,
                      lineHeight: 1,
                    }}
                  />
                  <div>
                    <strong>Atendimento pelo WhatsApp</strong>
                    <div>Seg à sex: 10h às 20h</div>
                    <div className="mb-2">Sábado: 9h às 14h</div>

                    <a
                      href={`https://wa.me/${numero}?text=${mensagem}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-success"
                      style={{ fontWeight: 800, marginTop: 8 }}
                    >
                      <i
                        className="las la-whatsapp"
                        style={{ fontSize: 20, marginRight: 6 }}
                      />
                      Falar no WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* Secretaria */}
              <div
                style={{
                  background: "#fff",
                  color: "#0c102d",
                  borderRadius: 12,
                  padding: "16px 18px",
                  border: "1px solid #e9e9e9",
                  boxShadow: "0 8px 20px rgba(0,0,0,.06)",
                }}
              >
                <div className="d-flex align-items-start">
                  <i
                    className="las la-school"
                    style={{
                      fontSize: 26,
                      color: "#D3AF37",
                      marginRight: 10,
                      lineHeight: 1,
                    }}
                  />
                  <div>
                    <strong>Atendimento Secretaria</strong>
                    <div>
                      Atendimento <strong>EXCLUSIVO</strong> com horário
                      agendado.
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          {/* Espaçamento final padronizado */}
          <div style={{ height: 20 }} />
        </div>
      </Container>
    </section>
  );
}
