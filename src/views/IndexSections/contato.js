import React from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";

export default function Sobre() {

    return (
        <div className="section" id="sobre-mim">
            <Container>
                <h2 style={{ color: "#fffda8" }} data-aos="fade-up" className="text-center title">
                    Venha Dançar Conosco!
                </h2>
                <Row>
                    <p data-aos="fade-up">
                        Se você busca uma experiência de dança enriquecedora, venha fazer parte da nossa família.
                        Estamos ansiosos para receber novos rostos, compartilhar risadas e criar memórias inesquecíveis.
                    </p>
                    <Col className="text-center mt-3" data-aos="fade-up">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14641.68771351002!2d-46.4084549!3d-23.4452404!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce63ec51d9988f%3A0x85120da955fc53f5!2sStudio%20de%20Dan%C3%A7a%20Bruna%20Ferraz!5e0!3m2!1spt-BR!2sbr!4v1702907038089!5m2!1spt-BR!2sbr"
                            width="100%"
                            height="400px"
                            style={{ border: 0 }}
                            allowfullscreen=""
                            loading="speed"
                            referrerpolicy="no-referrer-when-downgrade">
                        </iframe>
                        <p className="mt-2 fs-5">
                            R. Olho D Água do Casado, 94 - Jardim Carvalho, Guarulhos - SP, 07244-380.
                        </p>
                    </Col>

                </Row>
            </Container>
        </div>
    );
}
