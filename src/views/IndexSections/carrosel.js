import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./carrosel.css";

// reactstrap components
import { Container, UncontrolledCarousel, Row, Col } from "reactstrap";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

export default function Curriculo() {
  useEffect(() => {
    AOS.init();
  }, []);

  const carouselItems = [
    {
      src: require("./../../assets/turmas/1.JPG"),
      altText: "Slide 1",
      caption: "",
    },
    {
      src: require("./../../assets/turmas/2.JPG"),
      altText: "Slide 2",
      caption: "",
    },
    {
      src: require("./../../assets/turmas/3.JPG"),
      altText: "Slide 3",
      caption: "",
    },
    {
      src: require("./../../assets/turmas/4.JPG"),
      altText: "Slide 4",
      caption: "",
    },
    {
      src: require("./../../assets/turmas/6.JPG"),
      altText: "Slide 4",
      caption: "",
    },
    {
      src: require("./../../assets/turmas/7.JPG"),
      altText: "Slide 4",
      caption: "",
    },
    {
      src: require("./../../assets/turmas/8.JPG"),
      altText: "Slide 4",
      caption: "",
    },
    {
      src: require("./../../assets/turmas/9.JPG"),
      altText: "Slide 4",
      caption: "",
    },
    {
      src: require("./../../assets/turmas/11.JPG"),
      altText: "Slide 4",
      caption: "",
    },
    {
      src: require("./../../assets/turmas/12.JPG"),
      altText: "Slide 4",
      caption: "",
    },
    {
      src: require("./../../assets/turmas/13.JPG"),
      altText: "Slide 4",
      caption: "",
    },
    {
      src: require("./../../assets/turmas/14.JPG"),
      altText: "Slide 4",
      caption: "",
    },
    {
      src: require("./../../assets/turmas/15.JPG"),
      altText: "Slide 4",
      caption: "",
    },
    {
      src: require("./../../assets/turmas/16.JPG"),
      altText: "Slide 4",
      caption: "",
    },
    {
      src: require("./../../assets/turmas/17.JPG"),
      altText: "Slide 4",
      caption: "",
    },
    {
      src: require("./../../assets/turmas/18.JPG"),
      altText: "Slide 4",
      caption: "",
    },
    {
      src: require("./../../assets/turmas/19.JPG"),
      altText: "Slide 4",
      caption: "",
    },
    {
      src: require("./../../assets/turmas/20.JPG"),
      altText: "Slide 4",
      caption: "",
    },
    {
      src: require("./../../assets/turmas/21.JPG"),
      altText: "Slide 4",
      caption: "",
    },
    {
      src: require("./../../assets/turmas/22.JPG"),
      altText: "Slide 4",
      caption: "",
    },
    {
      src: require("./../../assets/turmas/23.JPG"),
      altText: "Slide 4",
      caption: "",
    },
    {
      src: require("./../../assets/turmas/24.JPG"),
      altText: "Slide 4",
      caption: "",
    },
    {
      src: require("./../../assets/turmas/25.JPG"),
      altText: "Slide 4",
      caption: "",
    },
    {
      src: require("./../../assets/turmas/26.JPG"),
      altText: "Slide 4",
      caption: "",
    },
    {
      src: require("./../../assets/turmas/27.JPG"),
      altText: "Slide 4",
      caption: "",
    },
    {
      src: require("./../../assets/turmas/29.JPG"),
      altText: "Slide 4",
      caption: "",
    },
    {
      src: require("./../../assets/turmas/30.JPG"),
      altText: "Slide 4",
      caption: "",
    },

  ];

  return (
    <div className="section fundo-dois" id="curriculo">
      
      <Container>
        <h2 style={{ color: "#fffda8" }} data-aos="fade-up" className="text-center title">
          Galeria
        </h2>
        <Row>
          <Col data-aos="fade-up" md="12">
            <UncontrolledCarousel
              data-aos="fade-up"
              items={carouselItems}
              indicators={true}
              autoPlay={true}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
