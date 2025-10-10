// src/views/IndexSections/contato.js
import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../../pages/Home.css";

export default function Contato() {
  return (
    <div className="section" id="contato" style={{ background: "#ECE9E9" }}>
      <Container>
        <Row className="align-items-stretch g-4">
          {/* MAPA (esquerda) */}
          <Col md="6">
            <div
              style={{
                width: "100%",
                height: 380,           // médio (nem grande, nem pequeno)
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: "0 8px 24px rgba(0,0,0,.12)",
                background: "#ddd",
              }}
            >
              <iframe
                title="Mapa - Studio de Dança Bruna Ferraz"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14641.68771351002!2d-46.4084549!3d-23.4452404!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce63ec51d9988f%3A0x85120da955fc53f5!2sStudio%20de%20Dan%C3%A7a%20Bruna%20Ferraz!5e0!3m2!1spt-BR!2sbr!4v1702907038089!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Col>

          {/* INFORMAÇÕES (direita) */}
          <Col md="6">
            {/* Título */}
            <h3
              style={{
                color: "#0c102d",            // azul marinho
                marginBottom: 12,
                fontWeight: 700,
              }}
            >
              Localização
            </h3>

            {/* Endereço em branco dentro de faixa azul */}
            <div
              style={{
                background: "#0c102d",
                color: "#ffffff",
                borderRadius: 10,
                padding: "14px 16px",
                marginBottom: 20,
                lineHeight: 1.6,
                boxShadow: "0 6px 18px rgba(0,0,0,.12)",
              }}
            >
              R. Olho D’Água do Casado, 94 – Jardim Carvalho,<br />
              Guarulhos – SP, 07244-380
            </div>

            {/* Horário de atendimento via WhatsApp */}
            <div style={{ marginBottom: 18 }}>
              <div style={{ color: "#0c102d", fontWeight: 700, marginBottom: 6 }}>
                Horário de atendimento pelo WhatsApp
              </div>
              <p style={{ color: "#0c102d", marginBottom: 4 }}>Seg à sex: 10h às 20h</p>
              <p style={{ color: "#0c102d", marginBottom: 0 }}>Sábado: 9h às 14h</p>
            </div>

            {/* Secretaria */}
            <div>
              <div style={{ color: "#0c102d", fontWeight: 700, marginBottom: 6 }}>
                Atendimento Secretaria
              </div>
              <p style={{ color: "#0c102d", marginBottom: 0 }}>
                Atendimento <strong>EXCLUSIVO</strong> com horário agendado.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
