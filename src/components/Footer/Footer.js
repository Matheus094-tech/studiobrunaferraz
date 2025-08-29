import React from "react";
// reactstrap components
import {
  Container,
  Row,
  Col,
} from "reactstrap";

export default function Footer() {
  return (
    <footer>
      <Container>
        <Row style={{ placeContent: "center" }}>
          <Col md="3 text-center">
            <div class="d-flex justify-content-center">
              <a
                href="https://api.whatsapp.com/send?phone=5511964230207&text=Ol%C3%A1,%20gostaria%20de%20conhecer%20sua%20escola!"
                target="_blank"
                rel="noopener noreferrer"
                class="iconeFooter">
                <i class="lab la-whatsapp"></i>
              </a>
              <a
                href="https://www.instagram.com/studiobrunaferraz/"
                target="_blank"
                rel="noopener noreferrer"
                class="iconeFooter">
                <i class="lab la-instagram"></i>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
