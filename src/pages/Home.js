import React from "react";
import { Container } from "reactstrap";
import "./Home.css";
import CarouselHome from "./CarouselHome";

export default function Home() {
  return (
    <div className="home-header">
      <Container>
        <div className="header fundo-um">
          <img
            alt="Studio de Dança Bruna Ferraz"
            className="img-fluid"
            src={require("assets/img/fundo.jpeg")}
          />
        </div>

        <div className="home-text">
          <h1
            style={{
              color: "#D3AF37",
              fontFamily: "Parisienne, cursive",
              fontWeight: 400,
              fontSize: "48px",
              marginTop: "40px",
              marginBottom: "30px",
              lineHeight: 1.2,
            }}
          >
            “Escola que ensina, inspira e emociona.”
          </h1>

          <span style={{ color: "#0c102d" }}>
            Nós nascemos com a missão de ensinar com excelência, inspirar através
            da arte e emocionar em cada experiência.
            <br />
            Somos movidos pelo propósito de formar bailarinos e pessoas, unindo
            técnica, criatividade e sensibilidade em cada detalhe.
            <br />
            Nosso compromisso é transformar a dança em um legado de vivências e
            memórias inesquecíveis.
          </span>
        </div>

        {/* Título da seção */}
        <div
          className="text-center mt-5"
          style={{
            color: "#D3AF37",
            fontFamily: "Parisienne, cursive",
            fontSize: "40px",
            fontWeight: 400,
            marginBottom: "40px",
          }}
        >
          Por que escolher o Studio Bruna Ferraz?
        </div>

        {/* Linha dourada decorativa */}
        <div
          style={{
            width: "80px",
            height: "3px",
            backgroundColor: "#D3AF37",
            margin: "0 auto 40px auto",
            borderRadius: "2px",
          }}
        ></div>

        {/* Seção dos diferenciais */}
        <section
          className="container py-4 text-center"
          style={{
            color: "#0c102d",
            fontFamily: "Montserrat, sans-serif",
            maxWidth: "800px",
          }}
        >
          <div className="d-flex flex-column align-items-center gap-4">
            {[
              {
                icon: "theater-masks",
                text: "Espetáculos temáticos anuais realizados em teatros.",
              },
              {
                icon: "headset",
                text: "Atendimento exclusivo e personalizado com horário agendado em nossa escola.",
              },
              {
                icon: "scroll",
                text: "Escola de formação com certificação e avaliações anuais.",
              },
              {
                icon: "award",
                text: "Participações em festivais e competições.",
              },
              {
                icon: "clock",
                text: "Grade e horários estratégicos para o melhor encaixe na sua rotina.",
              },
              {
                icon: "map-marker-alt",
                text: "Localizado em ponto estratégico de Guarulhos, próximo à Av. Jurema e ao Supermercado Nagumo, a apenas 5 minutos do Terminal Pimentas.",
              },
              {
                icon: "magic",
                text: "Metodologia exclusiva, pensando no desenvolvimento integral e individual de cada aluno(a).",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="d-flex flex-column align-items-center"
                style={{ maxWidth: "600px" }}
              >
                <i
                  className={`las la-${item.icon}`}
                  style={{
                    fontSize: "45px",
                    color: "#D3AF37",
                    marginBottom: "10px",
                  }}
                ></i>
                <p className="mb-0" style={{ color: "#0c102d" }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Carrossel */}
        <div className="container my-4" style={{ maxWidth: 1100 }}>
          <CarouselHome
            autoPlay={true}
            interval={5000}
            height="65vh"
            showCaptions={true}
          />
        </div>
      </Container>
    </div>
  );
}
