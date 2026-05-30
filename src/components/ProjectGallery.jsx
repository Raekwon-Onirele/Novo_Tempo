import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ZoomIn, X, Calendar, MapPin, Award, Layers } from "lucide-react";
import "./ProjectGallery.css";

export default function ProjectGallery() {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "Hospital Regional Metropolitano",
      sector: "Saúde / Rede Hospitalar",
      location: "São Paulo - SP",
      image: "/project_hospital.png",
      desc: "Projeto completo de fundações e superestrutura para complexo hospitalar de alta complexidade com isolamento sísmico de base.",
      stats: {
        area: "45.000 m²",
        concrete: "18.500 m³",
        steel: "1.200 t",
        timeframe: "180 dias",
        lod: "LOD 350",
      },
      challenge:
        "Compatibilização tridimensional rigorosa para a passagem de dutos de gases hospitalares e HVAC de alta vazão sem perfuração de vigas principais de sustentação.",
    },
    {
      id: 2,
      title: "Shopping Center Parque das Avenidas",
      sector: "Comercial / Varejo de Grande Porte",
      location: "Campinas - SP",
      image: "/project_shopping.png",
      desc: "Estrutura mista de concreto protendido e cobertura metálica espacial de grandes vãos livres para praça de alimentação e claraboia central.",
      stats: {
        area: "82.000 m²",
        concrete: "32.000 m³",
        steel: "2.800 t",
        timeframe: "240 dias",
        lod: "LOD 350",
      },
      challenge:
        "Vencer vãos livres de 36 metros sobre a área da praça de eventos utilizando treliças metálicas pré-tensionadas de alta performance montadas em tempo recorde.",
    },
    {
      id: 3,
      title: "Planta Industrial de Papel e Celulose (Klabin)",
      sector: "Industrial / Infraestrutura Pesada",
      location: "Ortigueira - PR",
      image: "/project_industrial.png",
      desc: "Projeto estrutural para bases de máquinas de grande vibração, silos de estocagem de cavacos e pontes rolantes de alta tonelagem.",
      stats: {
        area: "120.000 m²",
        concrete: "55.000 m³",
        steel: "6.500 t",
        timeframe: "360 dias",
        lod: "LOD 400",
      },
      challenge:
        "Cálculo de vibração dinâmica para base de turbogerador de celulose, garantindo frequência de ressonância fora do intervalo operacional da turbina para evitar fadiga estrutural.",
    },
  ];

  return (
    <section id="sobre" className="portfolio-section">
      <div className="container">
        {/* Gallery Title */}
        <div className="portfolio-header">
          <span className="technical-tag">Portfólio Técnico</span>
          <h2 className="heading-section">
            Casos de Sucesso Multidisciplinares
          </h2>
          <p className="text-para portfolio-subtitle">
            Projetamos estruturas robustas e seguras para diversos setores da
            economia. Clique em cada projeto para abrir a ficha técnica
            detalhada de quantitativos e desafios superados.
          </p>
        </div>

        {/* Project Grid */}
        <div className="portfolio-grid">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card"
              onClick={() => setSelectedProject(project)}
            >
              <div className="project-img-wrapper">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-thumb"
                />
                <div className="project-overlay-hover">
                  <div className="zoom-circle">
                    <ZoomIn size={24} />
                  </div>
                  <span className="overlay-text font-technical">
                    Ver Ficha Técnica
                  </span>
                </div>
              </div>

              <div className="project-info">
                <span className="project-sector font-technical">
                  {project.sector}
                </span>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">
                  {project.desc.substring(0, 110)}...
                </p>
                <div className="project-meta-strip">
                  <span className="meta-item">
                    <MapPin size={12} /> {project.location}
                  </span>
                  <span className="meta-item">
                    <Layers size={12} /> {project.stats.area}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox / Zoom Modal */}
        {selectedProject && (
          <div
            className="lightbox-modal"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="lightbox-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="lightbox-close"
                onClick={() => setSelectedProject(null)}
              >
                <X size={24} />
              </button>

              <div className="lightbox-grid">
                {/* Left column - Big Image */}
                <div className="lightbox-visual">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="lightbox-image"
                  />
                  <div className="lightbox-location-tag">
                    <MapPin size={14} /> {selectedProject.location}
                  </div>
                </div>

                {/* Right column - Data Sheet */}
                <div className="lightbox-details">
                  <span className="project-sector font-technical">
                    {selectedProject.sector}
                  </span>
                  <h3 className="heading-card lightbox-title">
                    {selectedProject.title}
                  </h3>
                  <p className="text-para lightbox-desc">
                    {selectedProject.desc}
                  </p>

                  <div className="sheet-box">
                    <h4 className="sheet-box-title font-technical">
                      Especificações Técnicas (As-Built)
                    </h4>
                    <div className="sheet-details-grid">
                      <div className="sheet-detail-item">
                        <span className="sheet-detail-label">
                          Área Construída
                        </span>
                        <span className="sheet-detail-val font-technical">
                          {selectedProject.stats.area}
                        </span>
                      </div>
                      <div className="sheet-detail-item">
                        <span className="sheet-detail-label">
                          Volume de Concreto
                        </span>
                        <span className="sheet-detail-val font-technical">
                          {selectedProject.stats.concrete}
                        </span>
                      </div>
                      <div className="sheet-detail-item">
                        <span className="sheet-detail-label">
                          Consumo de Aço
                        </span>
                        <span className="sheet-detail-val font-technical">
                          {selectedProject.stats.steel}
                        </span>
                      </div>
                      <div className="sheet-detail-item">
                        <span className="sheet-detail-label">
                          Prazo de Projeto
                        </span>
                        <span className="sheet-detail-val font-technical">
                          {selectedProject.stats.timeframe}
                        </span>
                      </div>
                      <div className="sheet-detail-item">
                        <span className="sheet-detail-label">
                          Nível de Detalhe
                        </span>
                        <span className="sheet-detail-val font-technical">
                          {selectedProject.stats.lod}
                        </span>
                      </div>
                      <div className="sheet-detail-item">
                        <span className="sheet-detail-label">Certificação</span>
                        <span className="sheet-detail-val font-technical">
                          <Award
                            size={12}
                            style={{ verticalAlign: "middle", marginRight: 2 }}
                          />{" "}
                          NBR Atendida
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="lightbox-challenge">
                    <h4 className="challenge-title">
                      O Desafio de Engenharia:
                    </h4>
                    <p className="challenge-text">
                      {selectedProject.challenge}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="button-container">
          <Link to="/projects" onClick={() => handleLinkClick("#heroInicio")}>
            <button className="btn-secondary">Ver Mais</button>
          </Link>
        </div>
      </div>
    </section>
  );
}
