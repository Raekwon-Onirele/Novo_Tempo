import React, { useState } from 'react';
import { Ruler, Activity, Layers, FileText, CheckCircle2 } from 'lucide-react';
import './ServicesHub.css';

export default function ServicesHub() {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      num: '01',
      title: 'Pré-Engenharia & Viabilidade',
      icon: <Ruler size={32} />,
      desc: 'Estruturação estratégica de empreendimentos industriais e comerciais de grande porte antes da fase executiva.',
      details: [
        'Análise de viabilidade estrutural e geotécnica',
        'Estudo preliminar de movimentação de terra',
        'Estimativas de custo de fundações e superestruturas',
        'Apoio técnico para aquisição de terrenos corporativos'
      ]
    },
    {
      num: '02',
      title: 'Projetos Estruturais & Fundações',
      icon: <Layers size={32} />,
      desc: 'Dimensionamento estrutural robusto em concreto armado, concreto protendido e estruturas metálicas.',
      details: [
        'Projetos de fundações profundas e superficiais',
        'Cálculo de estruturas metálicas de grande vão',
        'Detalhamento de terraplanagem e contenções',
        'Projetos de shopping centers, hospitais e galpões industriais'
      ]
    },
    {
      num: '03',
      title: 'Consultoria Técnica de Ponta a Ponta',
      icon: <FileText size={32} />,
      desc: 'Assessoria especializada para otimização de projetos existentes, laudos técnicos e conformidade normativa.',
      details: [
        'Auditoria e revisão de projetos de terceiros (Peer Review)',
        'Laudos de patologia de estruturas existentes',
        'Otimização de consumo de aço e concreto (value engineering)',
        'Consultoria em reforço estrutural complexo'
      ]
    },
    {
      num: '04',
      title: 'BIM & Entregas Tecnológicas',
      icon: <Activity size={32} />,
      desc: 'Modelagem tridimensional paramétrica e extração de dados integrados de projeto.',
      details: [
        'Modelagem 3D estrutural no padrão BIM (LOD 350+)',
        'Detecção automática de interferências (Clash Detection)',
        'Planilhas automáticas de quantidades de materiais',
        'Sincronização entre arquitetura e demais disciplinas técnicos'
      ]
    }
  ];

  return (
    <section id="servicos" className="services-section">
      <div className="container">
        
        {/* Intro Grid */}
        <div className="services-header-grid">
          <div>
            <span className="technical-tag">Nosso Core Business</span>
            <h2 className="heading-section">Um novo ritmo de engenharia multidisciplinar.</h2>
          </div>
          <div className="services-header-desc">
            <p className="text-para">
              Superamos a barreira do nicho de papel e celulose para entregar soluções estruturais completas. 
              Atuamos de ponta a ponta: desde os primeiros estudos geológicos e desenhos arquitetônicos, 
              passando pelas fundações pesadas, terraplanagem, até a modelagem estrutural final em 3D. 
              Geramos inteligência de projeto que economiza recursos no canteiro de obras.
            </p>
          </div>
        </div>

        {/* Interactive Hub Panels */}
        <div className="services-interactive-hub">
          
          {/* Left Menu Selection */}
          <div className="services-selector-list">
            {services.map((item, index) => (
              <div 
                key={index} 
                className={`service-selector-card ${activeService === index ? 'active' : ''}`}
                onClick={() => setActiveService(index)}
              >
                <span className="service-number">{item.num}</span>
                <div className="service-selector-info">
                  <h3 className="service-selector-title">{item.title}</h3>
                  <p className="service-selector-short">{item.desc.substring(0, 75)}...</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Detailed Visualization Pane */}
          <div className="services-details-pane">
            <div className="pane-header">
              <div className="pane-icon-container">
                {services[activeService].icon}
              </div>
              <div>
                <span className="pane-number">ETAPA {services[activeService].num}</span>
                <h3 className="heading-card pane-title">{services[activeService].title}</h3>
              </div>
            </div>

            <p className="text-para pane-desc">
              {services[activeService].desc}
            </p>

            <div className="pane-deliverables">
              <h4 className="deliverables-title">Entregáveis & Soluções:</h4>
              <ul className="deliverables-list">
                {services[activeService].details.map((detail, idx) => (
                  <li key={idx} className="deliverable-item">
                    <CheckCircle2 size={16} className="deliverable-icon" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pane-cad-decoration">
              <div className="cad-line"></div>
              <div className="cad-label">NOVO_TEMPO</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
