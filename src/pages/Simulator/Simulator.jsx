import React, { useState, useEffect } from 'react';
import { Calculator, FileSpreadsheet, RefreshCw, Building2, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './Simulator.css';

// ============================================================
// PAGE: Simulator
// Simulador completo de empreendimento com cálculos paramétricos.
// Expandido a partir do componente QuantitySpreadsheet da Home.
// ============================================================

const Simulator = () => {
  // --- Inputs do empreendimento ---
  const [area, setArea] = useState(3000);
  const [floors, setFloors] = useState(4);
  const [structureType, setStructureType] = useState('misto');
  const [soilType, setSoilType] = useState('medio');
  const [projectType, setProjectType] = useState('industrial');
  const [finishLevel, setFinishLevel] = useState('padrao');

  // --- Outputs calculados ---
  const [concrete, setConcrete] = useState(0);
  const [steel, setSteelVal] = useState(0);
  const [excavation, setExcavation] = useState(0);
  const [cadHours, setCadHours] = useState(0);
  const [costEstRange, setCostEstRange] = useState({ min: 0, max: 0 });
  const [deadlineDays, setDeadlineDays] = useState(0);

  // --- Recalcular ao alterar qualquer parâmetro ---
  useEffect(() => {
    let concreteFactor = 0.35;
    let steelFactor = 35;
    let excavationFactor = 0.8;
    let hourFactor = 0.12;
    let finishMultiplier = 1.0;
    let typeMultiplier = 1.0;

    // Tipo de superestrutura
    if (structureType === 'concreto') { concreteFactor = 0.45; steelFactor = 30; }
    else if (structureType === 'metalica') { concreteFactor = 0.20; steelFactor = 48; }

    // Tipo de solo
    if (soilType === 'arenoso') excavationFactor = 1.1;
    else if (soilType === 'rochoso') excavationFactor = 0.5;

    // Tipo de projeto
    const typeFactors = { industrial: 1.0, hospitalar: 1.35, shopping: 1.2, residencial: 0.9, corporativo: 1.15 };
    typeMultiplier = typeFactors[projectType] || 1.0;

    // Nível de acabamento
    const finishFactors = { economico: 0.85, padrao: 1.0, alto: 1.3, luxo: 1.7 };
    finishMultiplier = finishFactors[finishLevel] || 1.0;

    const totalArea = area * floors;
    const calcConcrete = Math.round(totalArea * concreteFactor * typeMultiplier);
    const calcSteel = Math.round(totalArea * steelFactor * typeMultiplier);
    const calcExcavation = Math.round(area * excavationFactor);
    const calcHours = Math.round(totalArea * hourFactor + (floors * 25));

    const baseCostPerM2 = structureType === 'concreto' ? 1800 : structureType === 'metalica' ? 2200 : 2000;
    const adjustedCost = baseCostPerM2 * typeMultiplier * finishMultiplier;
    const baseCost = totalArea * adjustedCost;

    // Prazo estimado em dias corridos
    const baseDeadline = Math.round((totalArea / 200) * 30 * typeMultiplier);

    setConcrete(calcConcrete);
    setSteelVal(calcSteel);
    setExcavation(calcExcavation);
    setCadHours(calcHours);
    setCostEstRange({ min: Math.round(baseCost * 0.90), max: Math.round(baseCost * 1.15) });
    setDeadlineDays(baseDeadline);
  }, [area, floors, structureType, soilType, projectType, finishLevel]);

  const handleReset = () => {
    setArea(3000); setFloors(4); setStructureType('misto');
    setSoilType('medio'); setProjectType('industrial'); setFinishLevel('padrao');
  };

  const formatCurrency = (val) => new Intl.NumberFormat('pt-BR', {
    style: 'currency', currency: 'BRL', maximumFractionDigits: 0
  }).format(val);

  const scrollToContact = () => {
    window.location.href = '/contact';
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

      <main className="simulator-main" id="heroInicio">

        {/* ─── Hero da Página ─── */}
        <section className="sim-hero-section">
          <div className="container">
            <span className="technical-tag">Ferramenta de Pré-Engenharia</span>
            <h1 className="heading-huge sim-hero-title">
              Simulador de <span className="accent-text">Empreendimento</span>
            </h1>
            <p className="text-para sim-hero-desc">
              Estime com precisão paramétrica os quantitativos de concreto, aço, movimentação de terra, 
              horas de projeto e faixa de investimento do seu empreendimento antes mesmo da contratação. 
              Ferramenta desenvolvida pelos engenheiros da Novo Tempo.
            </p>
            <div className="sim-hero-badges">
              <span className="sim-badge"><Building2 size={14} /> Multissetorial</span>
              <span className="sim-badge"><TrendingUp size={14} /> Coeficientes NBR</span>
              <span className="sim-badge"><Clock size={14} /> Prazo Estimado</span>
            </div>
          </div>
        </section>

        {/* ─── Calculadora Interativa ─── */}
        <section className="sim-calculator-section">
          <div className="container">
            <div className="calculator-wrapper">

              {/* Coluna de Inputs */}
              <div className="calculator-inputs">
                <h3 className="heading-card calc-title">Parâmetros do Empreendimento</h3>

                {/* Tipo de Projeto */}
                <div className="input-group">
                  <label htmlFor="project-type-select" className="select-label">Tipologia do Empreendimento</label>
                  <select id="project-type-select" value={projectType}
                    onChange={(e) => setProjectType(e.target.value)} className="technical-select">
                    <option value="industrial">Industrial (Galpão, Fábrica, Silo)</option>
                    <option value="hospitalar">Rede de Saúde (Hospital / Clínica)</option>
                    <option value="shopping">Shopping Center / Centro Comercial</option>
                    <option value="residencial">Residencial Multifamiliar</option>
                    <option value="corporativo">Torre Corporativa / Escritórios</option>
                  </select>
                </div>

                {/* Área Slider */}
                <div className="input-group">
                  <div className="input-labels">
                    <label htmlFor="area-slider-sim">Área de Projeção (Térreo)</label>
                    <span className="input-value font-technical">{area.toLocaleString('pt-BR')} m²</span>
                  </div>
                  <input id="area-slider-sim" type="range" min="500" max="50000" step="500"
                    value={area} onChange={(e) => setArea(Number(e.target.value))} className="range-slider" />
                  <span className="range-bounds">500m² — 50.000m²</span>
                </div>

                {/* Pavimentos Slider */}
                <div className="input-group">
                  <div className="input-labels">
                    <label htmlFor="floors-slider-sim">Número de Pavimentos</label>
                    <span className="input-value font-technical">{floors} {floors === 1 ? 'Pavimento' : 'Pavimentos'}</span>
                  </div>
                  <input id="floors-slider-sim" type="range" min="1" max="30" step="1"
                    value={floors} onChange={(e) => setFloors(Number(e.target.value))} className="range-slider" />
                  <span className="range-bounds">1 — 30 Pavimentos</span>
                </div>

                {/* Superestrutura */}
                <div className="input-group">
                  <label htmlFor="structure-select-sim" className="select-label">Tipo de Superestrutura</label>
                  <select id="structure-select-sim" value={structureType}
                    onChange={(e) => setStructureType(e.target.value)} className="technical-select">
                    <option value="concreto">Concreto Armado In Loco</option>
                    <option value="metalica">Estrutura Metálica de Alta Performance</option>
                    <option value="misto">Misto (Metálica + Lajes Alveolares)</option>
                  </select>
                </div>

                {/* Solo */}
                <div className="input-group">
                  <label htmlFor="soil-select-sim" className="select-label">Perfil de Solo (Sondagem SPT)</label>
                  <select id="soil-select-sim" value={soilType}
                    onChange={(e) => setSoilType(e.target.value)} className="technical-select">
                    <option value="arenoso">Solo Arenoso (Fundações Profundas)</option>
                    <option value="medio">Solo de Média Consistência (Padrão)</option>
                    <option value="rochoso">Solo Rochoso / Firme (Sapatas)</option>
                  </select>
                </div>

                {/* Padrão de Acabamento */}
                <div className="input-group">
                  <label htmlFor="finish-select" className="select-label">Padrão de Acabamento / Especificação</label>
                  <select id="finish-select" value={finishLevel}
                    onChange={(e) => setFinishLevel(e.target.value)} className="technical-select">
                    <option value="economico">Econômico (Funcional, sem extras)</option>
                    <option value="padrao">Padrão (Mercado B2B)</option>
                    <option value="alto">Alto Padrão (Especificação técnica elevada)</option>
                    <option value="luxo">Luxo / Premium (Máxima especificação)</option>
                  </select>
                </div>

                <button onClick={handleReset} className="reset-calc-btn">
                  <RefreshCw size={14} /> Restaurar Padrões
                </button>
              </div>

              {/* Planilha de Saída */}
              <div className="spreadsheet-grid-card">
                <div className="spreadsheet-top-bar">
                  <div className="sheet-tab active"><FileSpreadsheet size={14} /> NT_SIMULADOR_V2.XLSX</div>
                  <div className="sheet-status font-technical">CÁLCULO=ATIVO</div>
                </div>

                <div className="sheet-table">
                  <div className="sheet-row header">
                    <span className="sheet-col cell-idx"></span>
                    <span className="sheet-col cell-desc">Descrição do Insumo / Entregável</span>
                    <span className="sheet-col cell-unit">Un.</span>
                    <span className="sheet-col cell-qty">Qtd. Estimada</span>
                  </div>
                  {[
                    { idx:'1', desc:'Volume de Concreto Estrutural Total', unit:'m³', val: concrete.toLocaleString('pt-BR') },
                    { idx:'2', desc:'Armadura de Aço CA-50 / CA-60', unit:'kg', val: steel.toLocaleString('pt-BR') },
                    { idx:'3', desc:'Escavação e Movimentação de Terra', unit:'m³', val: excavation.toLocaleString('pt-BR') },
                    { idx:'4', desc:'Horas de Engenharia de Projetos (BIM/CAD)', unit:'hrs', val: cadHours.toLocaleString('pt-BR') },
                    { idx:'5', desc:'Prazo Estimado de Projeto (Corridos)', unit:'dias', val: deadlineDays.toLocaleString('pt-BR') },
                  ].map(row => (
                    <div key={row.idx} className="sheet-row">
                      <span className="sheet-col cell-idx">{row.idx}</span>
                      <span className="sheet-col cell-desc">{row.desc}</span>
                      <span className="sheet-col cell-unit">{row.unit}</span>
                      <span className="sheet-col cell-qty font-technical">{row.val}</span>
                    </div>
                  ))}
                  <div className="sheet-row total-row">
                    <span className="sheet-col cell-idx">Σ</span>
                    <span className="sheet-col cell-desc">Área Construída Total Equivalente</span>
                    <span className="sheet-col cell-unit">m²</span>
                    <span className="sheet-col cell-qty font-technical">{(area * floors).toLocaleString('pt-BR')}</span>
                  </div>
                </div>

                {/* Badge de Custo */}
                <div className="sheet-summary-badge">
                  <div className="summary-left">
                    <Calculator size={20} className="summary-icon" />
                    <div>
                      <span className="summary-title">Faixa de Investimento Estimada</span>
                      <span className="summary-desc">Execução civil + insumos + projeto técnico</span>
                    </div>
                  </div>
                  <div className="summary-right font-technical">
                    <span className="cost-range">{formatCurrency(costEstRange.min)} — {formatCurrency(costEstRange.max)}</span>
                  </div>
                </div>

                <div className="spreadsheet-note">
                  <p>
                    *Estimativa paramétrica baseada em coeficientes técnicos da ABNT NBR e SINAPI. 
                    Valores reais dependem de sondagem geotécnica e projeto arquitetônico definitivo.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA para contato */}
            <div className="sim-cta-block">
              <div className="sim-cta-text">
                <h3 className="heading-card">Gostou da estimativa? Solicite uma proposta oficial.</h3>
                <p className="text-para">Nossa equipe técnica elabora planilhas detalhadas de quantitativos com base no projeto real.</p>
              </div>
              <button className="btn-primary" onClick={scrollToContact}>
                Solicitar Proposta Formal <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Simulator;