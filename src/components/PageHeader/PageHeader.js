import React from "react";
import "./PageHeader.css";
// reactstrap components
import { Container } from "reactstrap";
import Promocao from "views/IndexSections/promocao";
export default function PageHeader() {
  return (
    <div className="page-header ">
      <Container>
        <div className="header fundo-um">
          <img
            alt="Studio de Dança Bruna Ferraz"
            className="img-fluid"
            src={require("assets/img/logo_gold.png")}
          />
          <Promocao />
        </div>
      </Container>
    </div>
  );
}
