import React, { useState } from 'react';
import {
  Ruler, Layers, FileText, Activity, Landmark, Compass,
  CheckCircle2, ArrowRight, ShieldCheck, FileSpreadsheet, HardHat
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './Services.css';

// ============================================================
// PAGE: Services
// Hub interativo de Engenharia Multidisciplinar
// ============================================================

const Services = () => {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      num: '01',
      title: 'Pré-Engenharia & Viabilidade',
      icon: <Ruler size={24} />,
      desc: 'Estruturação estratégica e mitigação de riscos para empreendimentos de grande porte na fase pré-executiva.',
      details: [
        'Análise de viabilidade estrutural e geológica preliminar.',
        'Estudo paramétrico de movimentação de terra e terraplanagem.',
        'Estimativa de custo de fundações com base em sondagem SPT.',
        'Assessoria técnica para aquisição de terrenos corporativos (Due Diligence).',
        'Estudos de impacto de vizinhança e pré-dimensionamento de contenções.'
      ],
      standards: 'NBR 12721 / NBR 8044',
      timeframe: '10 a 20 dias úteis',
      deliverable: 'Relatório Técnico de Viabilidade (RTV)'
    },
    {
      num: '02',
      title: 'Projetos Estruturais & Fundações',
      icon: <Layers size={24} />,
      desc: 'Dimensionamento estrutural de alta performance focado em segurança, racionalização de materiais e construtibilidade.',
      details: [
        'Projetos de fundações profundas (estacas escavadas, hélice contínua) e superficiais (sapatas, radier).',
        'Cálculo de estruturas em concreto armado moldado in loco, pré-moldado e concreto protendido.',
        'Projetos de superestrutura metálica de grande vão para coberturas e galpões industriais.',
        'Projetos estruturais completos para hospitais, shopping centers, indústrias e edifícios altos.',
        'Projetos de contenção de taludes (solo grampeado, cortinas atirantadas e arrimo).'
      ],
      standards: 'NBR 6118 / NBR 6122 / NBR 8800',
      timeframe: '30 a 60 dias úteis',
      deliverable: 'Caderno de Projeto Executivo de Estruturas (DWG/IFC)'
    },
    {
      num: '03',
      title: 'Consultoria Técnica & Auditoria',
      icon: <FileText size={24} />,
      desc: 'Assessoria especializada independente para otimização de insumos, auditoria de segurança e diagnóstico de patologias.',
      details: [
        'Auditoria e revisão crítica independente de projetos de terceiros (Peer Review / Double Check).',
        'Engenharia de valor para redução de consumo de aço e concreto mantendo a classe de segurança.',
        'Diagnósticos de patologias estruturais com ensaios não destrutivos (esclerometria, ultrassom).',
        'Projetos de reforço estrutural para alteração de uso, expansão vertical ou recuperação de falhas.',
        'Emissão de laudos de estabilidade estrutural e pareceres técnicos assinados por especialistas.'
      ],
      standards: 'NBR 6118 / NBR 16280',
      timeframe: '15 a 30 dias úteis',
      deliverable: 'Laudo Técnico Pericial / Relatório de Peer Review com ART'
    },
    {
      num: '04',
      title: 'BIM & Modelagem Paramétrica',
      icon: <Activity size={24} />,
      desc: 'Digitalização completa do projeto estrutural com extração inteligente de dados e eliminação de conflitos.',
      details: [
        'Modelagem estrutural tridimensional paramétrica no padrão BIM (LOD 350 a LOD 400).',
        'Detecção automatizada de interferências entre estrutura e instalações (Clash Detection).',
        'Extração precisa e automatizada de planilhas de quantitativos de materiais (aço, concreto, formas).',
        'Sincronização em nuvem para colaboração simultânea com arquitetura e instalações.',
        'Criação de modelos As-Built tridimensionais prontos para manutenção predial (Facility Management).'
      ],
      standards: 'NBR ISO 19650-1 / NBR 15965',
      timeframe: 'Sincronizado com os prazos de projeto',
      deliverable: 'Modelo Federado IFC / Planilha de Quantidades Dinâmica'
    },
    {
      num: '05',
      title: 'Arquitetura Industrial & Comercial',
      icon: <Landmark size={24} />,
      desc: 'Desenvolvimento de projetos arquitetônicos corporativos focados em fluxo de processos, ergonomia e legislação.',
      details: [
        'Planejamento de layout funcional para indústrias, galpões logísticos e fluxos operacionais.',
        'Estudo de rotas de evacuação, saídas de emergência e adequação às normas de acessibilidade.',
        'Desenho de fachadas comerciais modernas e projetos de retrofit para edifícios corporativos.',
        'Legalização de projetos junto à prefeitura, órgãos ambientais e Corpo de Bombeiros.',
        'Compatibilização de fluxogramas industriais com a envoltória arquitetônica.'
      ],
      standards: 'NBR 9050 / NBR 15575',
      timeframe: '30 a 50 dias úteis',
      deliverable: 'Projeto de Arquitetura Executivo Legal'
    },
    {
      num: '06',
      title: 'Topografia & Georreferenciamento',
      icon: <Compass size={24} />,
      desc: 'Mapeamento preciso de superfícies e posicionamento espacial técnico como base confiável de projeto.',
      details: [
        'Levantamento planialtimétrico cadastral de alta definição.',
        'Georreferenciamento de imóveis e terrenos de acordo com as normas do INCRA.',
        'Locação de gabaritos e estacas em canteiro de obras com precisão milimétrica.',
        'Varredura por varredura laser 3D (Laser Scanning) para cadastro de estruturas existentes.',
        'Medição de volume de corte e aterro por fotogrametria aérea.'
      ],
      standards: 'NBR 13133 / Decreto 4.449',
      timeframe: '5 a 12 dias úteis',
      deliverable: 'Nuvem de Pontos / Planta Planialtimétrica Georreferenciada'
    }
  ];

  const handleOpenContact = (serviceTitle) => {
    window.location.href = `/contact?servico=${encodeURIComponent(serviceTitle.toLowerCase())}`;
  };

  const scrollToSection = (selector) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="page-wrapper technical-grid-lines">
      <Navbar />

      <main className="services-page-main" id="heroInicio">
        {/* ─── Hero ─── */}
        <section className="services-hero-section">
          <div className="container">
            <span className="technical-tag">Especialidades B2B</span>
            <h1 className="heading-huge">
              Serviços de <span className="accent-text">Engenharia de Ponta</span>
            </h1>
            <p className="text-para services-hero-desc">
              Atuação multidisciplinar de ponta a ponta. Oferecemos soluções integradas que vão da topografia
              inicial à modelagem tridimensional estrutural avançada, garantindo eficiência financeira e segurança.
            </p>
          </div>
        </section>

        {/* ─── Hub Interativo de Serviços ─── */}
        <section className="services-hub-interactive-section">
          <div className="container">
            <div className="services-page-layout">
              {/* Barra Lateral / Seleção */}
              <div className="services-sidebar-menu">
                <span className="sidebar-header-title font-technical">Nossas Disciplinas</span>
                <div className="services-selectors-container">
                  {services.map((item, index) => (
                    <button
                      key={index}
                      className={`service-card-selector ${activeService === index ? 'active' : ''}`}
                      onClick={() => setActiveService(index)}
                    >
                      <div className="selector-num-box font-technical">{item.num}</div>
                      <div className="selector-text-box">
                        <span className="selector-title">{item.title}</span>
                        <span className="selector-desc-short">{item.desc.substring(0, 50)}...</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Detalhes do Serviço Ativo */}
              <div className="services-detail-display-pane">
                <div className="pane-header-strip">
                  <div className="pane-icon-circle">
                    {services[activeService].icon}
                  </div>
                  <div>
                    <span className="pane-step-label font-technical">DISCIPLINA TÉCNICA {services[activeService].num}</span>
                    <h2 className="heading-card pane-service-title">{services[activeService].title}</h2>
                  </div>
                </div>

                <p className="text-para pane-service-desc">
                  {services[activeService].desc}
                </p>

                <div className="pane-checklist-box">
                  <h3 className="checklist-heading font-technical">Atividades e Escopo de Trabalho</h3>
                  <ul className="checklist-list">
                    {services[activeService].details.map((detail, idx) => (
                      <li key={idx} className="checklist-item">
                        <CheckCircle2 size={16} className="checklist-icon" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bloco de Ficha Técnica do Serviço */}
                <div className="service-tech-spec-grid">
                  <div className="spec-card">
                    <span className="spec-card-label font-technical">Normas Reguladoras Base</span>
                    <span className="spec-card-val font-technical">{services[activeService].standards}</span>
                  </div>
                  <div className="spec-card">
                    <span className="spec-card-label font-technical">Prazo Médio de Entrega</span>
                    <span className="spec-card-val">{services[activeService].timeframe}</span>
                  </div>
                  <div className="spec-card">
                    <span className="spec-card-label font-technical">Entregável Principal</span>
                    <span className="spec-card-val">{services[activeService].deliverable}</span>
                  </div>
                </div>

                {/* CTA Action */}
                <div className="pane-action-bar">
                  <div className="action-tag font-technical">
                    <ShieldCheck size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} /> ART / CREA Inclusos em todos os entregáveis
                  </div>
                  <button
                    className="btn-primary pane-cta-btn font-technical"
                    onClick={() => handleOpenContact(services[activeService].title)}
                  >
                    Solicitar Escopo de Serviço <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Banner de Garantias Técnicas ─── */}
        <section className="services-guarantee-strip">
          <div className="container">
            <div className="guarantee-grid">
              <div className="guarantee-card">
                <HardHat size={36} className="guarantee-icon" />
                <h3 className="guarantee-title">Equipe Registrada</h3>
                <p className="guarantee-desc">Nossos engenheiros e arquitetos possuem registro ativo no CREA e CAU, com ARTs emitidas para cada entrega estrutural.</p>
              </div>
              <div className="guarantee-card">
                <FileSpreadsheet size={36} className="guarantee-icon" />
                <h3 className="guarantee-title">Engenharia de Valor</h3>
                <p className="guarantee-desc">Otimização estrutural real: dimensionamos estruturas seguras que evitam desperdício de vergalhões e concreto no canteiro.</p>
              </div>
              <div className="guarantee-card">
                <ShieldCheck size={36} className="guarantee-icon" />
                <h3 className="guarantee-title">Apólice de Seguro Civil</h3>
                <p className="guarantee-desc">Nossos projetos de alta complexidade contam com cobertura de seguro de responsabilidade civil técnica (E&O) garantindo proteção.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;