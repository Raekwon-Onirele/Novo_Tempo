import React, { useState } from "react";
import {
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  Award,
  ChevronRight,
} from "lucide-react";
import "./Navbar.css";

import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLinkClick = (selector) => {
    setIsOpen(false);
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="header-nav">
        <div className="header-container">
          <NavLink className="logo-container" to="/">
            <img
              className="logo-nt"
              src="/logo_icon_branco.png"
              alt="logo"
              onClick={() => handleLinkClick("#heroInicio")}
            />
          </NavLink>

          <button
            className="menu-hamburger-btn"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Slide-out Overlay Drawer */}
      <div className={`menu-drawer ${isOpen ? "open" : ""}`}>
        <div className="drawer-overlay" onClick={toggleMenu}></div>
        <div className="drawer-content">
          <div className="drawer-header">
            <div className="logo-area">
              <span className="logo-nt">NOVO TEMPO</span>
              <span className="logo-sub">14 ANOS</span>
            </div>
            <button className="close-btn" onClick={toggleMenu}>
              <X size={24} />
            </button>
          </div>

          <nav className="drawer-links">
            <NavLink to="/" className="navlink">
              <div
                className="nav-item"
                onClick={() => handleLinkClick("#heroInicio")}
              >
                <span className="nav-num">01.</span>
                <span className="nav-label">Início</span>
                <ChevronRight className="nav-arrow" size={18} />
              </div>
            </NavLink>
            <NavLink to="/woweare" className="navlink">
              <div
                className="nav-item"
                onClick={() => handleLinkClick("#heroInicio")}
              >
                <span className="nav-num">02.</span>
                <span className="nav-label">Quem Somos</span>
                <ChevronRight className="nav-arrow" size={18} />
              </div>
            </NavLink>

            <NavLink to="/services" className="navlink">
              <div
                className="nav-item"
                onClick={() => handleLinkClick("#heroInicio")}
              >
                <span className="nav-num">03.</span>
                <span className="nav-label">Serviços Integrados</span>
                <ChevronRight className="nav-arrow" size={18} />
              </div>
            </NavLink>

            <NavLink to="/projects" className="navlink">
              <div
                className="nav-item"
                onClick={() => handleLinkClick("#heroInicio")}
              >
                <span className="nav-num">04.</span>
                <span className="nav-label">Projetos</span>
                <ChevronRight className="nav-arrow" size={18} />
              </div>
            </NavLink>
            <NavLink to="/simulator" className="navlink">
              <div
                className="nav-item"
                onClick={() => handleLinkClick("#heroInicio")}
              >
                <span className="nav-num">05.</span>
                <span className="nav-label">Simulador Quantitativo</span>
                <ChevronRight className="nav-arrow" size={18} />
              </div>
            </NavLink>
            <NavLink to="/contact" className="navlink">
              <div
                className="nav-item"
                onClick={() => handleLinkClick("#heroInicio")}
              >
                <span className="nav-num">06.</span>
                <span className="nav-label">Formulário de Contato</span>
                <ChevronRight className="nav-arrow" size={18} />
              </div>
            </NavLink>
          </nav>

          <div className="drawer-footer">
            <div className="drawer-footer-sec">
              <h4 className="drawer-footer-title">Contato Direto</h4>
              <p>
                <Phone size={14} /> (11) 4502-3920
              </p>
              <p>
                <Mail size={14} /> contato@novotempoeng.com.br
              </p>
              <p>
                <MapPin size={14} /> Av. Paulista, 1000 - São Paulo, SP
              </p>
            </div>

            <div className="drawer-footer-sec">
              <h4 className="drawer-footer-title">Certificações</h4>
              <div className="cert-badges-drawer">
                <span className="cert-badge">
                  <Award size={12} /> CREA-SP Ativo
                </span>
                <span className="cert-badge">
                  <Award size={12} /> PBQP-H Nível A
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
