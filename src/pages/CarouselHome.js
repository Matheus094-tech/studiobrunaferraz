// src/components/CarouselHome.js
import React, { useState, useEffect, useRef } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
} from "reactstrap";

// Ajuste os paths/conteúdo conforme os nomes dos seus arquivos:
import img1 from "assets/img/carousel/foto1.jpg";
import img2 from "assets/img/carousel/foto2.jpg";
import img3 from "assets/img/carousel/foto3.jpeg";
import img4 from "assets/img/carousel/foto4.jpeg";
import img5 from "assets/img/carousel/foto5.jpeg";
import img6 from "assets/img/carousel/foto6.jpeg";
import img7 from "assets/img/carousel/foto7.jpeg";
import img8 from "assets/img/carousel/foto8.jpeg";

const items = [
  { src: img1, altText: "Aluna do Studio" },
  { src: img2, altText: "Magia do Ballet" },
  { src: img3, altText: "Primeiros passos" },
  { src: img4, altText: "Performance" },
  { src: img5, altText: "Expressão corporal" },
  { src: img6, altText: "Espetáculo em palco" },
  { src: img7, altText: "Turma em coreografia" },
  { src: img8, altText: "Dança do Ventre" },
];

export default function CarouselHome({
  autoPlay = true,
  interval = 5000,
  height = "65vh",
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [isPortrait, setIsPortrait] = useState({});
  const timerRef = useRef(null);

  const next = () => {
    if (animating) return;
    setActiveIndex((i) => (i === items.length - 1 ? 0 : i + 1));
  };
  const previous = () => {
    if (animating) return;
    setActiveIndex((i) => (i === 0 ? items.length - 1 : i - 1));
  };

  // autoplay
  useEffect(() => {
    if (!autoPlay) return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, interval);
    return () => timerRef.current && clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, autoPlay, interval]);

  const slides = items.map((item, idx) => (
    <CarouselItem
      onExiting={() => setAnimating(true)}
      onExited={() => setAnimating(false)}
      key={idx}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height,
          minHeight: 360,
          overflow: "hidden",
        }}
      >
        {/* Fundo desfocado da própria foto */}
        <img
          src={item.src}
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

        {/* Imagem principal (contain para retratos, cover para paisagens) */}
        <img
          src={item.src}
          alt={item.altText}
          onLoad={(e) => {
            const { naturalWidth: w, naturalHeight: h } = e.currentTarget;
            setIsPortrait((s) => ({ ...s, [idx]: h >= w }));
          }}
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            height: "100%",
            objectFit: isPortrait[idx] ? "contain" : "cover",
            objectPosition: "center center",
            display: "block",
          }}
        />

        {/* Overlay leve para contraste, sem bloquear cliques */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0) 100%)",
            zIndex: 3,
            pointerEvents: "none",
          }}
        />
      </div>
    </CarouselItem>
  ));

  return (
    <>
      {/* Ajustes visuais das setas e indicadores */}
      <style>{`
        .carousel-control-prev, .carousel-control-next { z-index: 10; }
      `}</style>

      <div style={{ borderRadius: 12, overflow: "hidden" }}>
        <Carousel activeIndex={activeIndex} next={next} previous={previous}>
          {slides}
          <CarouselControl
            direction="prev"
            directionText="Anterior"
            onClickHandler={previous}
          />
          <CarouselControl
            direction="next"
            directionText="Próximo"
            onClickHandler={next}
          />
        </Carousel>
      </div>
    </>
  );
}
