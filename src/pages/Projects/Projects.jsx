import React, { useState, useEffect } from "react";
import {
  ZoomIn,
  X,
  Calendar,
  MapPin,
  Award,
  Layers,
  Building2,
  Factory,
  Hospital,
  ShoppingBag,
  Filter,
  Calculator,
  RefreshCw,
  ChevronRight,
  FileSpreadsheet,
  Cpu,
  Landmark,
  HardHat,
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

  // --- Estado do Simulador de Projetos ---
  const [simTemplate, setSimTemplate] = useState("hospitalar");
  const [simArea, setSimArea] = useState(15000);
  const [simFloors, setSimFloors] = useState(5);
  const [simStructure, setSimStructure] = useState("concreto");
  const [simSoil, setSimSoil] = useState("medio");
  const [simFinish, setSimFinish] = useState("padrao");

  // --- Resultados Calculados ---
  const [calcResults, setCalcResults] = useState({
    concrete: 0,
    steel: 0,
    excavation: 0,
    hours: 0,
    minCost: 0,
    maxCost: 0,
    days: 0,
  });

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

  /* ─── Modelos de Simulação Disponíveis ─── */
  const simTemplates = [
    {
      id: "hospitalar",
      label: "Saúde (Hospitalar)",
      icon: <Hospital size={18} />,
      defaultArea: 15000,
      defaultFloors: 5,
    },
    {
      id: "comercial",
      label: "Shopping / Varejo",
      icon: <ShoppingBag size={18} />,
      defaultArea: 35000,
      defaultFloors: 3,
    },
    {
      id: "industrial",
      label: "Industrial / Logístico",
      icon: <Factory size={18} />,
      defaultArea: 40000,
      defaultFloors: 1,
    },
    {
      id: "corporativo",
      label: "Edifício Corporativo",
      icon: <Building2 size={18} />,
      defaultArea: 12000,
      defaultFloors: 12,
    },
  ];

  // --- Recálculo de Quantitativos Paramétricos ---
  useEffect(() => {
    let concreteFactor = 0.38;
    let steelFactor = 36;
    let excavationFactor = 0.85;
    let hourFactor = 0.13;
    let typeMultiplier = 1.0;
    let finishMultiplier = 1.0;

    // Ajuste de acordo com a Tipologia
    switch (simTemplate) {
      case "hospitalar":
        typeMultiplier = 1.35;
        concreteFactor = 0.42;
        break;
      case "comercial":
        typeMultiplier = 1.2;
        concreteFactor = 0.38;
        break;
      case "industrial":
        typeMultiplier = 1.0;
        concreteFactor = 0.28;
        steelFactor = 42;
        break;
      case "corporativo":
        typeMultiplier = 1.15;
        concreteFactor = 0.45;
        break;
      default:
        break;
    }

    // Ajuste de Estrutura
    if (simStructure === "concreto") {
      concreteFactor *= 1.2;
      steelFactor *= 0.9;
    } else if (simStructure === "metalica") {
      concreteFactor *= 0.55;
      steelFactor *= 1.45;
    }

    // Ajuste de Solo
    if (simSoil === "arenoso") {
      excavationFactor = 1.25;
    } else if (simSoil === "rochoso") {
      excavationFactor = 0.45;
    }

    // Ajuste de Acabamento
    const finishFactors = { economico: 0.85, padrao: 1.0, alto: 1.35 };
    finishMultiplier = finishFactors[simFinish] || 1.0;

    const totalArea = simArea * simFloors;
    const concreteVal = Math.round(totalArea * concreteFactor * typeMultiplier);
    const steelVal = Math.round(totalArea * steelFactor * typeMultiplier);
    const excavationVal = Math.round(simArea * excavationFactor);
    const hoursVal = Math.round(totalArea * hourFactor + simFloors * 20);

    const baseCostPerM2 =
      simStructure === "concreto"
        ? 1900
        : simStructure === "metalica"
          ? 2450
          : 2100;
    const adjustedCost = baseCostPerM2 * typeMultiplier * finishMultiplier;
    const totalBaseCost = totalArea * adjustedCost;
    const baseDeadline = Math.round((totalArea / 250) * 30 * typeMultiplier);

    setCalcResults({
      concrete: concreteVal,
      steel: steelVal,
      excavation: excavationVal,
      hours: hoursVal,
      minCost: Math.round(totalBaseCost * 0.9),
      maxCost: Math.round(totalBaseCost * 1.15),
      days: baseDeadline,
    });
  }, [simTemplate, simArea, simFloors, simStructure, simSoil, simFinish]);

  // Atualizar valores padrão ao mudar de template
  const handleTemplateChange = (id) => {
    const selected = simTemplates.find((t) => t.id === id);
    if (selected) {
      setSimTemplate(id);
      setSimArea(selected.defaultArea);
      setSimFloors(selected.defaultFloors);
    }
  };

  const resetSimInputs = () => {
    const selected = simTemplates.find((t) => t.id === simTemplate);
    if (selected) {
      setSimArea(selected.defaultArea);
      setSimFloors(selected.defaultFloors);
      setSimStructure("concreto");
      setSimSoil("medio");
      setSimFinish("padrao");
    }
  };

  const formatCurrency = (val) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(val);

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

  const scrollToSection = (selector) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="page-wrapper technical-grid-lines">
      <Navbar />

      <main className="projects-main" id="heroInicio">
        {/* ─── Hero ─── */}
        <section className="projects-hero-section">
          <div className="container">
            <span className="technical-tag">Engenharia de Estruturas</span>
            <h1 className="heading-huge">
              Casos de Sucesso & <span className="accent-text">Simulações</span>
            </h1>
            <p className="text-para projects-hero-desc">
              Explore nossa galeria de grandes obras executadas e simule na hora
              os quantitativos estruturais para o seu futuro empreendimento
              utilizando nosso sistema paramétrico.
            </p>
          </div>
        </section>

        {/* ─── Área de Simulação de Projetos ─── */}
        <section className="projects-simulator-section">
          <div className="container">
            <div className="simulator-header-box">
              <span className="technical-tag">
                <Cpu
                  size={14}
                  style={{ verticalAlign: "middle", marginRight: 4 }}
                />{" "}
                Pré-Engenharia Interativa
              </span>
              <h2 className="heading-section">
                Simulador de Premissas Estruturais
              </h2>
              <p className="text-para">
                Selecione uma tipologia de projeto abaixo para simular
                modificações e estimar os quantitativos finais. Baseado em dados
                reais consolidados pela Novo Tempo Engenharia ao longo de 14
                anos.
              </p>
            </div>

            {/* Layout do Simulador */}
            <div className="simulator-interactive-layout">
              {/* Coluna de Configuração */}
              <div className="sim-config-panel">
                <h3 className="sim-panel-title font-technical">
                  1. Escolha a Tipologia de Base
                </h3>
                <div className="sim-templates-grid">
                  {simTemplates.map((t) => (
                    <button
                      key={t.id}
                      className={`sim-template-card ${simTemplate === t.id ? "active" : ""}`}
                      onClick={() => handleTemplateChange(t.id)}
                    >
                      <div className="sim-temp-icon">{t.icon}</div>
                      <span className="sim-temp-label">{t.label}</span>
                    </button>
                  ))}
                </div>

                <h3
                  className="sim-panel-title font-technical"
                  style={{ marginTop: "24px" }}
                >
                  2. Parâmetros da Obra
                </h3>
                <div className="sim-sliders-block">
                  <div className="slider-group-box">
                    <div className="slider-labels">
                      <span className="slider-label">
                        Área de Projeção Térrea
                      </span>
                      <span className="slider-val font-technical">
                        {simArea.toLocaleString("pt-BR")} m²
                      </span>
                    </div>
                    <input
                      type="range"
                      min={simTemplate === "industrial" ? 2000 : 500}
                      max={simTemplate === "industrial" ? 80000 : 25000}
                      step={500}
                      value={simArea}
                      onChange={(e) => setSimArea(Number(e.target.value))}
                      className="sim-input-slider"
                    />
                    <span className="slider-bounds">
                      {simTemplate === "industrial" ? "2k m²" : "500m²"} —{" "}
                      {simTemplate === "industrial" ? "80k m²" : "25k m²"}
                    </span>
                  </div>

                  <div className="slider-group-box">
                    <div className="slider-labels">
                      <span className="slider-label">Pavimentos Totais</span>
                      <span className="slider-val font-technical">
                        {simFloors} pavs.
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={simTemplate === "industrial" ? 3 : 25}
                      step={1}
                      value={simFloors}
                      onChange={(e) => setSimFloors(Number(e.target.value))}
                      className="sim-input-slider"
                    />
                    <span className="slider-bounds">
                      1 —{" "}
                      {simTemplate === "industrial" ? "3 pavs." : "25 pavs."}
                    </span>
                  </div>
                </div>

                <h3
                  className="sim-panel-title font-technical"
                  style={{ marginTop: "24px" }}
                >
                  3. Especificações Estruturais
                </h3>
                <div className="sim-selects-grid">
                  <div className="sim-select-wrapper">
                    <label htmlFor="structure-select">Superestrutura</label>
                    <select
                      id="structure-select"
                      value={simStructure}
                      onChange={(e) => setSimStructure(e.target.value)}
                      className="sim-technical-select"
                    >
                      <option value="concreto">Concreto In Loco</option>
                      <option value="metalica">Estrutura Metálica B2B</option>
                      <option value="misto">Mista (Concreto/Aço)</option>
                    </select>
                  </div>

                  <div className="sim-select-wrapper">
                    <label htmlFor="soil-select">Sondagem de Solo</label>
                    <select
                      id="soil-select"
                      value={simSoil}
                      onChange={(e) => setSimSoil(e.target.value)}
                      className="sim-technical-select"
                    >
                      <option value="arenoso">
                        Solo Arenoso (Fundações Profundas)
                      </option>
                      <option value="medio">Firme/Médio (SPT Padrão)</option>
                      <option value="rochoso">Rochoso (Sapatas Diretas)</option>
                    </select>
                  </div>

                  <div className="sim-select-wrapper">
                    <label htmlFor="finish-select">Padrão Geral</label>
                    <select
                      id="finish-select"
                      value={simFinish}
                      onChange={(e) => setSimFinish(e.target.value)}
                      className="sim-technical-select"
                    >
                      <option value="economico">Econômico / Funcional</option>
                      <option value="padrao">Padrão Corporativo B2B</option>
                      <option value="alto">Alto Padrão Técnico</option>
                    </select>
                  </div>
                </div>

                <button
                  className="sim-reset-button font-technical"
                  onClick={resetSimInputs}
                >
                  <RefreshCw size={12} /> Redefinir Parâmetros
                </button>
              </div>

              {/* Coluna da Planilha e Resultado */}
              <div className="sim-results-panel">
                <div className="sim-results-top-bar">
                  <div className="sim-results-tab active">
                    <FileSpreadsheet
                      size={13}
                      style={{ verticalAlign: "middle", marginRight: 4 }}
                    />{" "}
                    NT_ESTIMATIVA_V3.XLSX
                  </div>
                  <span className="sim-results-status font-technical">
                    SIMULAÇÃO=ONLINE
                  </span>
                </div>

                <div className="sim-results-table">
                  <div className="sim-table-row header font-technical">
                    <span className="cell-num">Idx</span>
                    <span className="cell-desc">Componente / Item</span>
                    <span className="cell-unit">Unidade</span>
                    <span className="cell-val">Quantidade</span>
                  </div>
                  <div className="sim-table-row">
                    <span className="cell-num">01</span>
                    <span className="cell-desc">
                      Concreto Armado Estrutural
                    </span>
                    <span className="cell-unit">m³</span>
                    <span className="cell-val font-technical">
                      {calcResults.concrete.toLocaleString("pt-BR")}
                    </span>
                  </div>
                  <div className="sim-table-row">
                    <span className="cell-num">02</span>
                    <span className="cell-desc">
                      Aço Estrutural / Vergalhões (CA-50/60)
                    </span>
                    <span className="cell-unit">kg</span>
                    <span className="cell-val font-technical">
                      {calcResults.steel.toLocaleString("pt-BR")}
                    </span>
                  </div>
                  <div className="sim-table-row">
                    <span className="cell-num">03</span>
                    <span className="cell-desc">
                      Escavação & Movimentação de Solo
                    </span>
                    <span className="cell-unit">m³</span>
                    <span className="cell-val font-technical">
                      {calcResults.excavation.toLocaleString("pt-BR")}
                    </span>
                  </div>
                  <div className="sim-table-row">
                    <span className="cell-num">04</span>
                    <span className="cell-desc">
                      Desenvolvimento e Projetos BIM (LOD 350)
                    </span>
                    <span className="cell-unit">horas</span>
                    <span className="cell-val font-technical">
                      {calcResults.hours.toLocaleString("pt-BR")}
                    </span>
                  </div>
                  <div className="sim-table-row text-highlight">
                    <span className="cell-num">05</span>
                    <span className="cell-desc">
                      Prazo Estimado Projetos + Canteiro
                    </span>
                    <span className="cell-unit">dias</span>
                    <span className="cell-val font-technical">
                      {calcResults.days}
                    </span>
                  </div>
                  <div className="sim-table-row total-row font-technical">
                    <span className="cell-num">Σ</span>
                    <span className="cell-desc">
                      Área Construída Total Simulada
                    </span>
                    <span className="cell-unit">m²</span>
                    <span className="cell-val font-technical">
                      {(simArea * simFloors).toLocaleString("pt-BR")}
                    </span>
                  </div>
                </div>

                <div className="sim-cost-summary-box">
                  <div className="sim-cost-left">
                    <Calculator size={20} className="sim-cost-icon" />
                    <div>
                      <span className="sim-cost-title">
                        Investimento Paramétrico
                      </span>
                      <span className="sim-cost-sub">
                        Inclui insumos estruturais, fundações e projetos
                      </span>
                    </div>
                  </div>
                  <div className="sim-cost-right font-technical">
                    <span>
                      {formatCurrency(calcResults.minCost)} —{" "}
                      {formatCurrency(calcResults.maxCost)}
                    </span>
                  </div>
                </div>

                <div className="sim-disclaimer">
                  <p>
                    *Esta simulação é parametrizada com coeficientes
                    estatísticos baseados na NBR 6118. Uma estimativa exata
                    requer sondagem de solo SPT e projeto arquitetônico final.
                  </p>
                </div>

                <a href="/contact" className="sim-cta-btn font-technical">
                  Enviar Simulação para Orçamento Oficial{" "}
                  <ChevronRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>

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
