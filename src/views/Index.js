// src/views/Index.js
import React from "react";

// CSS globais — sempre aqui!
import "bootstrap/dist/css/bootstrap.min.css";
import "assets/css/blk-design-system-react.css";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import PageHeader from "components/PageHeader/PageHeader.js";

// sections for this page/view
// (ajuste os caminhos/exactos nomes conforme seus arquivos reais)
import Sobre from "views/IndexSections/sobre_mim";
import Equipe from "views/IndexSections/equipe";
import Contato from "views/IndexSections/contato";

export default function Index() {
  React.useEffect(() => {
    document.body.classList.toggle("index-page");
    return () => {
      document.body.classList.toggle("index-page");
    };
  }, []);

  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
        <PageHeader />
        <div className="main">
          <Sobre />
          <Equipe />
          <Contato />
        </div>
      </div>
    </>
  );
}
