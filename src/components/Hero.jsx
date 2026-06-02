import React from "react";
import { ArrowRight, Sparkles, Shield, Cpu } from "lucide-react";
import "./Hero.css";
import { Link } from "react-router-dom";

export default function Hero() {
  const scrollToSection = (selector) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="heroInicio" className="hero-section">
      <div className="container hero-container">
        {/* Grid: Left Column for Copy, Right Column for Graphic */}
        <div className="hero-grid">
          <div className="hero-content">
            <div className="technical-tag">
              <span>
                NOVO TEMPO{" "}
                <span className="tagName">Soluções em Engenharia</span> • 14
                Anos
              </span>
            </div>

            <h1 className="heading-huge hero-title">
              Engenharia <span>Completa</span> Do Conceito da Obra Completa.
            </h1>

            <p className="text-para hero-desc">
              A empresa oferece uma atuação integrada e multidisciplinar na
              engenharia civil através de três pilares principais: consultoria
              especializada (que engloba pré-engenharia, gerenciamento técnico,
              projetos básicos/executivos e avaliação de conformidade),
              desenvolvimento de projetos completos (abrangendo implantação,
              terraplenagem, arquitetura, fundações e estruturas metálicas ou de
              concreto) e cálculo estrutural avançado focado na otimização e
              dimensionamento de estruturas de grande porte.
            </p>

            <div className="hero-ctas">
              <Link to="/contact" onClick={() => handleLinkClick("#heroInicio")}>
                <button
                  className="btn-primary"
                >
                  Fale com um Especialista <ArrowRight size={18} />
                </button>
              </Link>

              <Link to="/simulator" onClick={() => handleLinkClick("#heroInicio")}>
                <button
                  className="btn-secondary"
                >
                  Simular Quantitativos
                </button>
              </Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-frame">
              <img
                src="/hero_project.jpg"
                alt="Novo Tempo Engenharia - Projeto de Alta Complexidade"
                className="hero-image"
              />

              {/* Technical floating cards overlay */}

              <div className="floating-card top-left animate-pulse">
                <Cpu size={16} className="float-icon" />
                <div>
                  <span className="float-label">Metodologia</span>
                  <span className="float-value">BIM 3D Integrado</span>
                </div>
              </div>

              <div className="floating-card bottom-right">
                <Shield size={16} className="float-icon" />
                <div>
                  <span className="float-label">Padrão Técnico</span>
                  <span className="float-value">NBR Normativa</span>
                </div>
              </div>

              {/* Technical CAD grid style background lines */}
              <div className="cad-grid-overlay"></div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="hero-stats-row">
          <div className="stat-card">
            <span className="stat-number">14</span>
            <div className="stat-meta">
              <span className="stat-label">Anos de Mercado</span>
              <span className="stat-desc">Consolidação e robustez</span>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-number">B2B</span>
            <div className="stat-meta">
              <span className="stat-label">Foco Corporativo</span>
              <span className="stat-desc">
                Grandes indústrias & investidores
              </span>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-number">100%</span>
            <div className="stat-meta">
              <span className="stat-label">Multidisciplinar</span>
              <span className="stat-desc">Fundações à consultoria técnica</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
