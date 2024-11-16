import { Container, Row, Col, Modal, ModalBody, ModalFooter, Button } from "reactstrap";
import React, { useState, useEffect } from 'react';
import "./promocao.css";

const Promocao = () => {
  const targetDate = new Date("2024-11-30T23:59:59").getTime();
  const [timeLeft, setTimeLeft] = useState(targetDate - new Date().getTime());
  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft(targetDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, targetDate]);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${days}D ${String(hours).padStart(2, '0')}H ${String(minutes).padStart(2, '0')}M ${String(seconds).padStart(2, '0')}S`;
  };

  return (
    <Container className="container-fixo">
      <h2 style={{ color: "#fffda8", marginTop: 55, fontSize: '1.5rem' }} className="text-center title texto-piscando">
        PROMOÇÃO IMPERDÍVEL EM
      </h2>
      <Row>
        <Col md="12" style={{ marginBottom: 150, textAlign: "center" }}>
          <div className="text-center texto-piscando" style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#fffda8' }}>
            {timeLeft > 0 ? formatTime(timeLeft) : 'Promoção Encerrada!'}
            <span style={{ cursor: 'pointer', color: '#fffda8', textDecoration: 'underline' }} onClick={toggleModal}><br />Saiba mais</span>
          </div>
        </Col>
      </Row>

      {/* Modal */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalBody>
          <p style={{ textAlign: "center" }}>
            <span style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>🎉 Promoção de Fim de Ano! 🎉 <br></br></span>
            <span style={{ fontSize: 18 }}><br></br><br></br>
              De 1º a 22 de dezembro, <span style={{ fontWeight: 'bold' }}>pague apenas a taxa de matrícula de R$60</span> e comece a dançar! <br></br><br></br>
              <span style={{ fontWeight: 'bold' }}>💃 Primeira mensalidade só em fevereiro de 2025! <br></br><br></br></span>
              <span style={{ fontWeight: 'bold' }}>📢 Vagas limitadas! <br></br>      </span>
              Studio de Dança Bruna Ferraz <br></br><br></br>
              <span style={{ fontWeight: 'bold' }}>📢 Garanta sua vaga agora mesmo e comece 2025 dançando conosco!<br></br> Clique aqui:
                <a
                  href="https://api.whatsapp.com/send/?phone=5511964230207&text=Ol%C3%A1%2C+quero+aproveitar+a+promo%C3%A7%C3%A3o+de+fim+de+ano+do+Studio+de+Dan%C3%A7a+Bruna+Ferraz%21+Pode+me+passar+mais+informa%C3%A7%C3%B5es%3F&type=phone_number&app_absent=0"
                  target="_blank"
                  class="iconeWhatsapp">
                  <i class="lab la-whatsapp"></i>
                </a>
              </span>
            </span>
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>Fechar</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default Promocao;
