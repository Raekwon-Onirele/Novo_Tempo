import React, { useState } from "react";
import {
  ShieldAlert,
  Target,
  Eye,
  Shield,
  CheckCircle,
  FileSpreadsheet,
  Award,
  Cpu,
  Briefcase,
  Landmark,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./WoWeAre.css";

// ============================================================
// PAGE: WoWeAre (Quem Somos)
// Perfil Institucional, Valores e Terminal de Compliance
// ============================================================

const WoWeAre = () => {
  const [selectedCheck, setSelectedCheck] = useState("nbr");

  const technicalChecks = {
    nbr: {
      title: "Dimensionamento Normativo (NBR 6118 / 8800)",
      status: "CONFORME",
      badgeClass: "status-success",
      desc: "Todas as nossas simulações, modelagens e projetos de engenharia executivos são calculados rigorosamente de acordo com os coeficientes de majoração e limites regulamentares estabelecidos pela ABNT.",
      items: [
        "NBR 6118: Projeto de estruturas de concreto - Procedimento",
        "NBR 8800: Projeto de estruturas de aço e de estruturas mistas",
        "NBR 6120: Cargas para o cálculo de estruturas de edificações",
        "NBR 6122: Projeto e execução de fundações",
      ],
    },
    crea: {
      title: "Registro de Classe & Emissão de ART",
      status: "REGISTRADO",
      badgeClass: "status-success",
      desc: "A Novo Tempo Engenharia possui registro ativo de pessoa jurídica no Conselho Regional de Engenharia e Agronomia (CREA). Cada escopo contratado recebe sua devida ART.",
      items: [
        "Emissão de ART de projeto em até 48 horas da contratação.",
        "Engenheiros responsáveis técnicos com mais de 14 anos de experiência.",
        "Auditoria interna periódica de acervo técnico de projetos.",
        "Certificação de conformidade de responsabilidade técnica corporativa.",
      ],
    },
    bim: {
      title: "Modelagem 3D & Detalhamento (BIM LOD 350/400)",
      status: "CERTIFICADO",
      badgeClass: "status-success",
      desc: "Nossos modelos tridimensionais federados garantem compatibilização total das disciplinas, extração parametrizada de planilhas de aço/concreto e nível as-built de manutenção.",
      items: [
        "Modelagem geométrica precisa de ferragens estruturais e conexões.",
        "Clash Detection automatizado nativo no modelo estrutural.",
        "Geração de arquivos IFC e compatibilidade de software aberto.",
        "Tolerâncias dimensionais de modelagem limitadas a milímetros.",
      ],
    },
    seguro: {
      title: "Seguro de Responsabilidade Civil Profissional (E&O)",
      status: "ATIVO",
      badgeClass: "status-success",
      desc: "Segurança e solidez jurídica para nossos parceiros comerciais B2B. Projetos de alta complexidade contam com cobertura civil técnica securitária.",
      items: [
        "Apólice ativa para cobertura de falhas de dimensionamento estrutural.",
        "Garantia de reexecução de projetos em caso de divergência de escopo.",
        "Proteção corporativa para projetos hospitalares e industriais.",
        "Mitigação completa de risco financeiro para a incorporadora contratante.",
      ],
    },
    certificados: {
      title: "Nossos Certificados",
      status: "CERTIFICADO",
      badgeClass: "status-success",
      desc: "Aqui estão alguns de nossos certificados:",
      items: [
        "CERTIFICADO PRIME 2025",
        "CERTIFICADO QUALIDADE ANCEC 2025",
        "CERTIFICADO Brasil 2021",
        "CERTIFICADO CHAMPION 2024",
      ],
    },
  };

  const scrollToSection = (selector) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <main className="woweare-page-main" id="heroInicio">
        {/* ─── Hero ─── */}
        <section className="woweare-hero-section">
          <div className="container">
            <span className="technical-tag">Nossa Trajetória</span>
            <h1 className="heading-huge">
              Engenharia com{" "}
              <span className="accent-text">História e Rigor</span>
            </h1>
            <p className="text-para woweare-hero-desc">
              Fundada em 2014 pelo Diretor Engenheiro Carlos Henrique Silva
              Monteiro Barbosa de Freitas, a NOVO TEMPO SOLUÇÕES EM ENGENHARIA
              tem como proposta oferecer projetos e soluções em engenharia civil
              multidisciplinar com extrema qualidade para nossos clientes. Com
              vasta experiência na área, a empresa está sempre atenta as
              constantes evoluções e inovações do mercado que se apresenta cada
              dia mais exigente, porém sem perder a tradição e disciplina
              conquistada ao longo de toda sua existência.
            </p>
            <p className="text-para woweare-hero-desc">
              Para isso, contamos com uma equipe de profissionais qualificados e
              de alta qualidade, em constante evolução, capacitados a operar
              produtos e softwares de última geração disponíveis no mercado.
              Conheça mais um pouco da nossa história em:{" "}
              <a href="https://youtu.be/NGetINT3L7M" className="link-text">
                https://youtu.be/NGetINT3L7M
              </a>
            </p>
          </div>
        </section>

        {/* ─── História & Métricas ─── */}
        <section className="woweare-history-section">
          <div className="container">
            <div className="history-grid">
              <div className="history-content">
                <h2 className="heading-section">
                  Somos uma empresa especializada em Projetos de Engenharia
                  Civil
                </h2>
                <p className="text-para text-history">
                  Com ênfase em indústrias e estruturas de grande porte em
                  geral, incluindo as principais disciplinas de CIVIL, como
                  implantação, arquitetura, fundações, estruturas de concreto
                  armado in bloco e pré-moldado, instalações hidrossanitárias e
                  estruturas metálicas, com habilitação para participar das
                  diversas fases de um empreendimento a partir da etapa de FEL 2
                  até FEL 4. Também atuamos na área de gerenciamento e
                  planejamento, pré engenharia, take off e elaboração de
                  Inquiry. Trabalhamos em BIM LOD 300, e desenvolvemos ATP nos
                  moldes da NBR 6118.
                </p>
              </div>

              {/* Grid de Estatísticas */}
              <div className="woweare-stats-grid">
                <div className="stat-box">
                  <span className="stat-num font-technical">14</span>
                  <span className="stat-label">Anos de atuação no mercado</span>
                </div>
                <div className="stat-box">
                  <span className="stat-num font-technical">400k+</span>
                  <span className="stat-label">
                    m² de projetos estruturais calculados
                  </span>
                </div>
                <div className="stat-box">
                  <span className="stat-num font-technical">LOD400</span>
                  <span className="stat-label">
                    Nível máximo de detalhamento BIM
                  </span>
                </div>
                <div className="stat-box">
                  <span className="stat-num font-technical">Zero</span>
                  <span className="stat-label">
                    Ocorrências ou falhas estruturais
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Missão, Visão e Valores ─── */}
        <section className="woweare-mvv-section">
          <div className="container">
            <div className="mvv-grid">
              <div className="mvv-card">
                <Target size={32} className="mvv-icon" />
                <h3 className="heading-card">Nossa Missão</h3>
                <p className="text-para mvv-desc">
                  Oferecer soluções e projetos de Engenharia Civil, buscando o
                  melhor desempenho e melhor custo para proporcionar os melhores
                  resultados
                </p>
              </div>

              <div className="mvv-card">
                <Eye size={32} className="mvv-icon" />
                <h3 className="heading-card">Nossa Visão</h3>
                <p className="text-para mvv-desc">
                  Ser reconhecida no meio técnico como uma empresa de projetos
                  que melhor atende as necessidades e expectativas dos nossos
                  clientes
                </p>
              </div>

              <div className="mvv-card">
                <Shield size={32} className="mvv-icon" />
                <h3 className="heading-card">Nossos Valores</h3>
                <p className="text-para mvv-desc">
                  Ética, respeito, sustentabilidade, inovação, eficiência,
                  qualidade e tradição com modernidade. Sob todas as
                  circunstâncias, gratidão a <strong>Deus</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Terminal de Verificações Técnicas / Compliance ─── */}
        <section className="woweare-compliance-section">
          <div className="container">
            <div className="compliance-header">
              <span className="technical-tag">Auditoria de Qualidade</span>
              <h2 className="heading-section">
                Terminal de Conformidade Técnica
              </h2>
              <p className="text-para">
                Transparência total. Clique em cada área regulatória abaixo para
                visualizar nosso painel de controle de processos e as
                verificações de engenharia aplicadas ativamente em nossos
                projetos.
              </p>
            </div>

            <div className="compliance-terminal-layout">
              {/* Menu Esquerdo de Verificação */}
              <div className="terminal-menu">
                <span className="terminal-menu-header font-technical">
                  Lista de Processos
                </span>

                <button
                  className={`terminal-menu-btn font-technical ${selectedCheck === "nbr" ? "active" : ""}`}
                  onClick={() => setSelectedCheck("nbr")}
                >
                  <Award size={14} /> NBR 6118 / 8800
                </button>

                <button
                  className={`terminal-menu-btn font-technical ${selectedCheck === "crea" ? "active" : ""}`}
                  onClick={() => setSelectedCheck("crea")}
                >
                  <Landmark size={14} /> CREA & ART
                </button>

                <button
                  className={`terminal-menu-btn font-technical ${selectedCheck === "bim" ? "active" : ""}`}
                  onClick={() => setSelectedCheck("bim")}
                >
                  <Cpu size={14} /> BIM LOD 350/400
                </button>

                <button
                  className={`terminal-menu-btn font-technical ${selectedCheck === "seguro" ? "active" : ""}`}
                  onClick={() => setSelectedCheck("seguro")}
                >
                  <Shield size={14} /> Seguro Técnico Civil
                </button>

                <button
                  className={`terminal-menu-btn font-technical ${selectedCheck === "certificados" ? "active" : ""}`}
                  onClick={() => setSelectedCheck("certificados")}
                >
                  <Shield size={14} /> Certificados
                </button>
              </div>

              {/* Display de Detalhes da Verificação */}
              <div className="terminal-display">
                <div className="terminal-display-header">
                  <h3 className="terminal-display-title">
                    {technicalChecks[selectedCheck].title}
                  </h3>
                  <span
                    className={`terminal-status-badge ${technicalChecks[selectedCheck].badgeClass} font-technical`}
                  >
                    {technicalChecks[selectedCheck].status}
                  </span>
                </div>

                <p className="terminal-display-desc text-para">
                  {technicalChecks[selectedCheck].desc}
                </p>

                <div className="terminal-checklist-box">
                  <div className="terminal-checklist-grid">
                    {technicalChecks[selectedCheck].items.map((item, idx) => (
                      <div key={idx} className="terminal-check-item">
                        <CheckCircle size={14} className="check-success-icon" />
                        <span className="check-text">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default WoWeAre;
