import React from "react";
import { NavLink, Link } from "react-router-dom";
import { NavbarBrand } from "reactstrap";

export default function IndexNavbar() {
  const navbarStyle = {
    backgroundColor: "#d1cfcf",
    boxShadow: "0 2px 10px rgba(0,0,0,0.4)",
  };

  const linkBaseStyle = {
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: 500,
    marginLeft: "10px",
    marginRight: "10px",
    transition: "color 0.2s ease",
    textDecoration: "none",
  };

  const linkActiveStyle = {
    color: "#0c102d",
    borderBottom: "2px solid #0c102d",
  };


  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark fixed-top"
      style={navbarStyle}
    >
      <div className="container">
        <NavbarBrand to="/" tag={Link} id="navbar-brand">
          <span className="navBarTexto">
            <img
              alt="Studio de Dança Bruna Ferraz"
              className="img-fluid"
              width={150}
              height={150}
              src={require("assets/img/navbar.png")}
            />
          </span>
        </NavbarBrand>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto">
            {[
              { path: "/", label: "Início" },
              { path: "/sobre", label: "Sobre" },
              { path: "/modalidades", label: "Modalidades" },
              { path: "/eventos", label: "Eventos" },
              { path: "/contato", label: "Contato" },
            ].map((item) => (
              <li className="nav-item" key={item.path}>
                <NavLink
                  end={item.path === "/"}
                  to={item.path}
                  className="nav-link"
                  style={({ isActive }) =>
                    isActive
                      ? { ...linkBaseStyle, ...linkActiveStyle }
                      : linkBaseStyle
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
