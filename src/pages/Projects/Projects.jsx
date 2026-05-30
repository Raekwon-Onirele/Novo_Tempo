import React, { useState, useEffect } from "react";
import {
  ZoomIn,
  X,
  MapPin,
  Award,
  Layers,
  Building2,
  Factory,
  Hospital,
  ShoppingBag,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./Projects.css";

// ============================================================
// PAGE: Projects
// Galeria interativa completa de projetos e Simulador Multissetorial
// ============================================================

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState("todos");

  /* ─── Dados Fixos dos Projetos (Galeria) ─── */
  const projects = [
    {
      id: 1,
      title: "Hospital Regional Metropolitano",
      sector: "hospitalar",
      sectorLabel: "Saúde / Rede Hospitalar",
      location: "São Paulo — SP",
      year: "2022",
      image: "/project_hospital.png",
      desc: "Projeto completo de fundações e superestrutura para complexo hospitalar de alta complexidade com isolamento sísmico de base e compatibilização multidisciplinar.",
      stats: {
        area: "45.000 m²",
        concrete: "18.500 m³",
        steel: "1.200 t",
        timeframe: "180 dias",
        lod: "LOD 350",
      },
      challenge:
        "Compatibilização tridimensional rigorosa para passagem de dutos de gases hospitalares e HVAC de alta vazão sem perfuração de vigas principais de sustentação.",
    },
    {
      id: 2,
      title: "Shopping Center Parque das Avenidas",
      sector: "comercial",
      sectorLabel: "Comercial / Varejo de Grande Porte",
      location: "Campinas — SP",
      year: "2021",
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
        "Vencer vãos livres de 36 metros sobre a área da praça de eventos utilizando treliças metálicas pré-tensionadas montadas em tempo recorde.",
    },
    {
      id: 3,
      title: "Planta Industrial Klabin — Papel e Celulose",
      sector: "industrial",
      sectorLabel: "Industrial / Infraestrutura Pesada",
      location: "Ortigueira — PR",
      year: "2019",
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
        "Cálculo de vibração dinâmica para base de turbogerador de celulose, garantindo frequência de ressonância fora do intervalo operacional da turbina.",
    },
    {
      id: 4,
      title: "Torre Corporativa Nexus Business Park",
      sector: "corporativo",
      sectorLabel: "Corporativo / Edifícios de Escritórios",
      location: "Barueri — SP",
      year: "2023",
      image: "/project_hospital.png",
      desc: "Estrutura de concreto armado de 22 pavimentos com núcleo rígido central, lajes protendidas e sistema de contenção periférica em solo mole.",
      stats: {
        area: "28.000 m²",
        concrete: "11.200 m³",
        steel: "850 t",
        timeframe: "150 dias",
        lod: "LOD 350",
      },
      challenge:
        "Fundações em solo de baixa capacidade de carga com lençol freático superficial exigindo sistema de rebaixamento e estacas raiz de 30m de profundidade.",
    },
    {
      id: 5,
      title: "Centro de Distribuição Logístico — Rumo",
      sector: "industrial",
      sectorLabel: "Industrial / Logística e Infraestrutura",
      location: "Rondonópolis — MT",
      year: "2022",
      image: "/project_industrial.png",
      desc: "Galpão logístico modular de 80.000 m² com mezaninos metálicos, docas de alto fluxo e bases para sistemas AGV automatizados.",
      stats: {
        area: "80.000 m²",
        concrete: "14.000 m³",
        steel: "4.200 t",
        timeframe: "200 dias",
        lod: "LOD 350",
      },
      challenge:
        "Coordenação estrutural para instalação de trilhos de sistema AGV sobre piso industrial nivelado a laser com tolerância de 3mm/3m.",
    },
    {
      id: 6,
      title: "Complexo Hospitalar Rede D'Or — Expansão",
      sector: "hospitalar",
      sectorLabel: "Saúde / Expansão de Complexo Hospitalar",
      location: "Rio de Janeiro — RJ",
      year: "2023",
      image: "/project_hospital.png",
      desc: "Projeto de reforço estrutural e ampliação vertical de bloco hospitalar existente em operação, com execução em etapas sem interrupção de atendimento.",
      stats: {
        area: "18.000 m²",
        concrete: "7.200 m³",
        steel: "420 t",
        timeframe: "120 dias",
        lod: "LOD 350",
      },
      challenge:
        "Execução de reforço em estrutura existente com limitação de vibração e ruído para não impactar UTIs e centros cirúrgicos ativos nos andares adjacentes.",
    },
  ];

  const filters = [
    { id: "todos", label: "Todos", icon: <Layers size={12} /> },
    { id: "industrial", label: "Industrial", icon: <Factory size={12} /> },
    { id: "hospitalar", label: "Saúde", icon: <Hospital size={12} /> },
    { id: "comercial", label: "Comercial", icon: <ShoppingBag size={12} /> },
    { id: "corporativo", label: "Corporativo", icon: <Building2 size={12} /> },
  ];

  const filteredProjects =
    activeFilter === "todos"
      ? projects
      : projects.filter((p) => p.sector === activeFilter);

  return (
    <div className="page-wrapper technical-grid-lines">
      <Navbar />

      <main className="projects-main" id="heroInicio">
        {/* ─── Galeria de Projetos Recentes ─── */}
        <section className="projects-gallery-section" id="galeria">
          <div className="container">
            <div className="section-header-row">
              <div>
                <span className="technical-tag">Portfólio Concluído</span>
                <h2 className="heading-section">Projetos Executados</h2>
              </div>
              <div className="gallery-filters">
                {filters.map((f) => (
                  <button
                    key={f.id}
                    className={`gallery-filter-btn ${activeFilter === f.id ? "active" : ""}`}
                    onClick={() => setActiveFilter(f.id)}
                  >
                    {f.icon} <span>{f.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Grid de Projetos */}
            <div className="portfolio-grid">
              {filteredProjects.map((project) => (
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
                    <span className="project-year-tag font-technical">
                      {project.year}
                    </span>
                  </div>

                  <div className="project-info">
                    <span className="project-sector font-technical">
                      {project.sectorLabel}
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

            {filteredProjects.length === 0 && (
              <div className="empty-filter-state">
                <p>Nenhum projeto encontrado para o filtro selecionado.</p>
              </div>
            )}
          </div>
        </section>

        {/* ─── Lightbox / Modal Técnico ─── */}
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

                <div className="lightbox-details">
                  <span className="project-sector font-technical">
                    {selectedProject.sectorLabel}
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
                      {[
                        {
                          label: "Área Construída",
                          val: selectedProject.stats.area,
                        },
                        {
                          label: "Volume de Concreto",
                          val: selectedProject.stats.concrete,
                        },
                        {
                          label: "Consumo de Aço",
                          val: selectedProject.stats.steel,
                        },
                        {
                          label: "Prazo de Projeto",
                          val: selectedProject.stats.timeframe,
                        },
                        {
                          label: "Nível de Detalhe",
                          val: selectedProject.stats.lod,
                        },
                        { label: "Ano de Execução", val: selectedProject.year },
                      ].map((item) => (
                        <div key={item.label} className="sheet-detail-item">
                          <span className="sheet-detail-label">
                            {item.label}
                          </span>
                          <span className="sheet-detail-val font-technical">
                            {item.val}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lightbox-challenge">
                    <h4 className="challenge-title">
                      Desafio de Engenharia Superado:
                    </h4>
                    <p className="challenge-text">
                      {selectedProject.challenge}
                    </p>
                  </div>

                  <div className="lightbox-certs">
                    <span className="cert-badge-lb">
                      <Award size={12} /> NBR Atendida
                    </span>
                    <span className="cert-badge-lb">
                      <Award size={12} /> CREA Registrado
                    </span>
                    <span className="cert-badge-lb">
                      <Award size={12} /> ART Emitida
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Projects;
