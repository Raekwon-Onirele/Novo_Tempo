import React from 'react';
import { ShieldAlert, Cpu, Box, Flame, HardHat, Compass } from 'lucide-react';
import './Partners.css';

export default function Partners() {
  const partners = [
    { name: 'Klabin', sector: 'Papel e Celulose', icon: <Flame size={20} /> },
    { name: 'Coca-Cola', sector: 'Bebidas / Industrial', icon: <Box size={20} /> },
    { name: 'Rede D\'Or', sector: 'Saúde / Hospitalar', icon: <Cpu size={20} /> },
    { name: 'Multiplan', sector: 'Shopping Centers', icon: <Compass size={20} /> },
    { name: 'Cyrela', sector: 'Incorporação Civil', icon: <HardHat size={20} /> },
    { name: 'Rumo Logística', sector: 'Infraestrutura Pesada', icon: <ShieldAlert size={20} /> },
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
