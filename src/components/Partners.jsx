import React from 'react';
import { ShieldAlert, Cpu, Box, Flame, HardHat, Compass } from 'lucide-react';
import './Partners.css';

export default function Partners() {
  const partners = [
    { name: 'Klabin', sector: 'Papel e Celulose', icon: <Flame size={20} /> },
    { name: 'Certek', sector: 'Construtora / Industrial', icon: <Box size={20} /> },
    { name: 'Cesbe', sector: 'Contrutora / Infraestrutura', icon: <Cpu size={20} /> },
    { name: 'LPE', sector: 'Pavimentos / Pisos', icon: <Compass size={20} /> },
    { name: 'Construcap', sector: 'Contrutora', icon: <HardHat size={20} /> },
    { name: 'Fortes', sector: 'Papel e Celulose', icon: <ShieldAlert size={20} /> },
    { name: 'HTB', sector: 'Construtora / Industrial', icon: <Flame size={20} /> },
    { name: 'Suzano', sector: 'Papel e Celulose', icon: <Box size={20} /> },
    { name: 'Valmet', sector: 'Tecnologia / Automação', icon: <Cpu size={20} /> },
    { name: 'Cenibra', sector: 'Celulose Branqueada', icon: <Compass size={20} /> },
    { name: 'Agrária', sector: 'Agroindustrial', icon: <HardHat size={20} /> },
    { name: 'M.ROSCOE', sector: 'Engenharia e Construções', icon: <ShieldAlert size={20} /> },
    { name: 'Voith', sector: 'Tecnologia e Engenharia Mecânica', icon: <Flame size={20} /> },
    { name: 'AkzoNobel', sector: 'Tintas e Revestimentos', icon: <Box size={20} /> },
    { name: 'Grupo Metrópolis', sector: 'Transporte', icon: <Flame size={20} /> },
    { name: 'AFRY', sector: 'Engenharia / Plantas Industriais', icon: <Box size={20} /> },
    { name: 'Ahlstrom', sector: 'Fibras Sustentáveis', icon: <Cpu size={20} /> },
    { name: 'Mg&A', sector: 'Engenharia / Gestão', icon: <Compass size={20} /> },
    { name: 'Suez', sector: 'Industria de Água', icon: <HardHat size={20} /> },
    { name: 'International Paper', sector: 'Embalagens Sustentáveis', icon: <ShieldAlert size={20} /> },
    { name: 'CBC', sector: 'Indústrias Pesadas', icon: <Flame size={20} /> },
  ];

  return (
    <section className="partners-section">
      <div className="container">
        <div className="partners-header">
          <span className="partners-title-meta font-technical">Parceiros Estratégicos</span>
          <p className="partners-desc">Empresas e corporações que confiam na precisão da nossa engenharia estrutural:</p>
        </div>

        <div className="partners-grid grid-6">
          {partners.map((partner, index) => (
            <div key={index} className="partner-card">
              <div className="partner-logo-container">
                <span className="partner-vector-icon">{partner.icon}</span>
                <span className="partner-name">{partner.name}</span>
              </div>
              <span className="partner-sector-tag font-technical">{partner.sector}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
