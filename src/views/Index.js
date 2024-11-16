import React from "react";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import PageHeader from "components/PageHeader/PageHeader.js";
import Footer from "components/Footer/Footer.js";

// sections for this page/view
import Sobre from "views/IndexSections/sobre_mim";
import Equipe from "views/IndexSections/equipe.js";
import Contato from "views/IndexSections/contato"

export default function Index() {
  React.useEffect(() => {
    document.body.classList.toggle("index-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
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
        <Footer />
      </div>

      <style jsx>{`
  @media (max-width: 600px) {
    .wrapper {
      margin-top: 100px;
    }
  }
`}</style>
    </>


  );
}
