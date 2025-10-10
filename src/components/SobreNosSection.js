import React, { useState } from "react";
import { Container, Row, Col, Modal, ModalBody } from "reactstrap";

// Exemplo de imagens (troque pelos seus arquivos/paths)
import f1 from "assets/img/sobre_nos/foto1.jpg";
import f2 from "assets/img/sobre_nos/foto2.jpeg";
import f3 from "assets/img/sobre_nos/foto3.jpeg";
import f4 from "assets/img/sobre_nos/foto4.jpeg";
import f5 from "assets/img/sobre_nos/foto5.jpeg";
import f6 from "assets/img/sobre_nos/foto6.jpeg";
import f7 from "assets/img/sobre_nos/foto7.jpeg";
import f8 from "assets/img/sobre_nos/foto8.jpeg";

const defaultImages = [
    { src: f1, alt: "Foto 1" },
    { src: f2, alt: "Foto 2" },
    { src: f3, alt: "Foto 3" },
    { src: f4, alt: "Foto 4" },
    { src: f5, alt: "Foto 5" },
    { src: f6, alt: "Foto 6" },
    { src: f7, alt: "Foto 7" },
    { src: f8, alt: "Foto 8" },
];

export default function SobreNosSection({ images = defaultImages }) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [current, setCurrent] = useState(0);

    const openAt = (idx) => {
        setCurrent(idx);
        setLightboxOpen(true);
    };

    const next = () => setCurrent((c) => (c + 1) % images.length);
    const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);

    const titleStyle = {
        color: "#f5ae28",
        fontFamily: "Parisienne, cursive",
        fontWeight: 400,
        fontSize: "36px",
        lineHeight: 1.2,
        marginBottom: "16px",
    };

    const textStyle = {
        color: "#f5ae28",
        fontSize: "18px",
        lineHeight: 1.8,
        letterSpacing: "0.3px",
    };

    const sectionStyle = {
        backgroundColor: "#ECE9E9",
        paddingTop: "60px",
        paddingBottom: "60px",
    };

    const thumbWrapStyle = {
        position: "relative",
        width: "100%",
        paddingTop: "100%", // quadrado perfeito
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
        cursor: "pointer",
    };

    const thumbImgStyle = {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transition: "transform .25s ease",
    };

    const gridGap = 12;

    return (
        <section style={sectionStyle}>
            <Container>
                <Row className="align-items-center">

                    <Col
                        lg="5"
                        className="mb-4 mb-lg-0"
                        style={{ display: "grid", gap: gridGap, gridTemplateColumns: "repeat(2, 1fr)" }}
                    >
                        {images.map((img, idx) => (
                            <div
                                key={idx}
                                style={thumbWrapStyle}
                                onClick={() => openAt(idx)}
                                onMouseEnter={(e) => (e.currentTarget.firstChild.style.transform = "scale(1.05)")}
                                onMouseLeave={(e) => (e.currentTarget.firstChild.style.transform = "scale(1)")}
                                title="Clique para ampliar"
                            >
                                <img src={img.src} alt={img.alt} style={thumbImgStyle} />
                            </div>
                        ))}
                    </Col>

                    {/* DIREITA: texto */}
                    <Col lg="7">
                        <h1 style={titleStyle}>Sobre o Studio de Dança Bruna Ferraz</h1>
<div style={{ ...textStyle, color: "#0c102d" }}>
  <p style={{ marginBottom: 14 }}>
    Nossa história com a dança não é momentânea. São mais de 19 anos de dedicação,
    estudo e paixão.
  </p>
  <p style={{ marginBottom: 14 }}>
    O Studio de Dança Bruna Ferraz nasceu do sonho da bailarina e empreendedora Bruna
    Ferraz, que construiu sua trajetória em escolas de dança, academias e projetos,
    somando mais de 10 anos de experiência como professora. Depois de ensinar e
    inspirar em tantos palcos e salas de aula, decidiu trilhar seu próprio caminho e dar
    vida à sua marca: SDBF.
  </p>
  <p style={{ marginBottom: 14 }}>
    Esse foi o ponto de virada: acreditar que a dança deve ser possível para todos. Mais
    que passos e técnica, ela é uma experiência que fica para a vida.
  </p>
  <p style={{ marginBottom: 0 }}>
    No SDBF, queremos propor algo especial a cada pessoa que nos encontra: que você se
    permita viver a dança pela primeira vez, por você e para você. Porque dançar é muito
    mais do que aprender movimentos; é descobrir quem você pode ser.
  </p>
</div>

                    </Col>
                </Row>
            </Container>

            {/* LIGHTBOX / MODAL */}
            <Modal isOpen={lightboxOpen} toggle={() => setLightboxOpen(false)} centered size="lg">
                <ModalBody
                    style={{
                        backgroundColor: "#ECE9E9",
                        position: "relative",
                        padding: 0,
                    }}
                >
                    {/* imagem grande */}
                    <div
                        style={{
                            position: "relative",
                            width: "100%",
                            height: "70vh",
                            minHeight: 360,
                            backgroundColor: "#ECE9E9",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            overflow: "hidden",
                        }}
                    >
                        {/* Fundo desfocado da mesma foto (deixa lindo em retratos) */}
                        <img
                            src={images[current]?.src}
                            alt=""
                            style={{
                                position: "absolute",
                                inset: 0,
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                filter: "blur(25px) brightness(0.7)",
                                transform: "scale(1.1)",
                            }}
                        />
                        {/* Imagem principal sem cortes */}
                        <img
                            src={images[current]?.src}
                            alt={images[current]?.alt}
                            style={{
                                position: "relative",
                                zIndex: 2,
                                maxWidth: "100%",
                                maxHeight: "100%",
                                objectFit: "contain",
                                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                                borderRadius: 8,
                            }}
                        />
                    </div>

                    {/* Controles */}
                    <button
                        type="button"
                        onClick={prev}
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
                        }}
                        aria-label="Anterior"
                        title="Anterior"
                    >
                        ‹
                    </button>

                    <button
                        type="button"
                        onClick={next}
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
                        }}
                        aria-label="Próxima"
                        title="Próxima"
                    >
                        ›
                    </button>

                    <button
                        type="button"
                        onClick={() => setLightboxOpen(false)}
                        style={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            background: "#ECE9E9",
                            color: "#f5ae28",
                            border: "none",
                            borderRadius: "50%",
                            width: 38,
                            height: 38,
                            fontSize: 18,
                            cursor: "pointer",
                        }}
                        aria-label="Fechar"
                        title="Fechar"
                    >
                        ✕
                    </button>
                </ModalBody>
            </Modal>
        </section>
    );
}
