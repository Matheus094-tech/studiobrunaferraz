import React from "react";
import { Container } from "reactstrap";
import "./Home.css";

export default function Home() {
  return (
    <div className="page-header">
      <Container>
        <div className="header fundo-um">
          <img
            alt="Studio de Dança Bruna Ferraz"
            className="img-fluid"
            src={require("assets/img/fundo.jpeg")}
          />
        </div>

        {/* isolamos o texto em uma div com classe própria */}
        <div className="home-text">
          <p>
            Nós nascemos com a missão de ensinar com excelência, inspirar através
            da arte e emocionar em cada experiência.
          </p>
          <p>
            Somos movidos pelo propósito de formar bailarinos e pessoas, unindo
            técnica, criatividade e sensibilidade em cada detalhe.
          </p>
          <p>
            Nosso compromisso é transformar a dança em um legado de vivências e
            memórias inesquecíveis.
          </p>
        </div>
      </Container>
    </div>
  );
}
