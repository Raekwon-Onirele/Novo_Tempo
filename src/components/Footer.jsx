import React from "react";
import { Mail, Phone, MapPin, ArrowUp, Award } from "lucide-react";
import "./Footer.css";
import { Link } from "react-router-dom";

// Custom inline SVG icons for LinkedIn and Instagram to avoid version dependency issues
const LinkedinIcon = ({ size = 18 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = ({ size = 18 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLinkClick = (selector) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="main-footer">
      <div className="container footer-container">
        {/* Row 1: Logo & Info */}
        <div className="footer-grid-row">
          {/* Col 1: Brand details */}
          <div className="footer-col brand-col">
            <div className="logo-area">
              <span className="logo-nt">NOVO TEMPO</span>
              <span className="logo-sub">ENGENHARIA ESTRUTURAL</span>
            </div>
            <p className="footer-brand-desc text-para">
              Engenharia consultiva e estrutural de alta fidelidade técnica.
              Atuamos em escala nacional desenvolvendo soluções
              multidisciplinares sob diretrizes normativas rígidas.
            </p>
            <div className="footer-social-links">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
            </div>
          </div>

          {/* Col 2: Shortcuts */}
          <div className="footer-col links-col">
            <h4 className="footer-col-title font-technical">Navegação</h4>
            <ul className="footer-links-list">
              <Link to="/" className="links-text">
                <li>Início</li>
              </Link>
              <Link to="/woweare" className="links-text">
                <li>Quem Somos</li>
              </Link>
              <Link to="/services" className="links-text">
                <li>Serviços Integrados</li>
              </Link>
              <Link to="/projects" className="links-text">
                <li>Projetos</li>
              </Link>
              <Link to="/simulator" className="links-text">
                <li>Simulador Quantitativo</li>
              </Link>
              <Link to="/contact" className="links-text">
                <li>Contato Técnico</li>
              </Link>
            </ul>
          </div>

          {/* Col 3: Certificates */}
          <div className="footer-col certs-col">
            <h4 className="footer-col-title font-technical">Credenciamentos</h4>
            <div className="footer-certs-list">
              <div className="footer-cert-card">
                <Award size={16} className="cert-icon" />
                <div>
                  <span className="cert-card-title">CREA-SP</span>
                  <span className="cert-card-desc">
                    Registro Ativo Nacional
                  </span>
                </div>
              </div>

              <div className="footer-cert-card">
                <Award size={16} className="cert-icon" />
                <div>
                  <span className="cert-card-title">ISO 9001:2015</span>
                  <span className="cert-card-desc">
                    Gestão de Qualidade Técnica
                  </span>
                </div>
              </div>

              <div className="footer-cert-card">
                <Award size={16} className="cert-icon" />
                <div>
                  <span className="cert-card-title">PBQP-H Nível A</span>
                  <span className="cert-card-desc">Execução de Projetos</span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Contacts */}
          <div className="footer-col contacts-col">
            <h4 className="footer-col-title font-technical">Contato Direto</h4>
            <ul className="footer-contact-info">
              <li>
                <Phone size={14} className="contact-li-icon" /> (11) 4502-3920
              </li>
              <li>
                <Mail size={14} className="contact-li-icon" />{" "}
                contato@novotempoeng.com.br
              </li>
              <li>
                <MapPin size={14} className="contact-li-icon" /> Av. Paulista,
                1000, 14º Andar - Bela Vista, São Paulo - SP
              </li>
            </ul>
          </div>
        </div>

        {/* Row 2: Bottom Bar (Copyright) */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            © {new Date().getFullYear()} Novo Tempo Engenharia Civil LTDA. Todos
            os direitos reservados. CNPJ: 14.120.354/0001-08.
          </p>
          <button
            onClick={scrollToTop}
            className="back-to-top-btn"
            aria-label="Voltar para o Topo"
          >
            <ArrowUp size={16} /> Voltar ao Topo
          </button>
        </div>
      </div>
    </footer>
  );
}
