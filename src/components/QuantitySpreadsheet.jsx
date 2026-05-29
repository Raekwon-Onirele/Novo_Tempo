import React, { useState, useEffect } from 'react';
import { Calculator, FileSpreadsheet, RefreshCw } from 'lucide-react';
import './QuantitySpreadsheet.css';

export default function QuantitySpreadsheet() {
  // Inputs
  const [area, setArea] = useState(1500); // in m2
  const [floors, setFloors] = useState(2); // number of stories
  const [structureType, setStructureType] = useState('misto'); // concreto, metalica, misto
  const [soilType, setSoilType] = useState('medio'); // arenoso, medio, rochoso

  // Calculated Outputs
  const [concrete, setConcrete] = useState(0); // m³
  const [steel, setSteel] = useState(0); // kg
  const [excavation, setExcavation] = useState(0); // m³
  const [cadHours, setCadHours] = useState(0); // hours
  const [costEstRange, setCostEstRange] = useState({ min: 0, max: 0 });

  // Recalculate quantities when inputs change
  useEffect(() => {
    // Structural coefficients based on research
    let concreteFactor = 0.35; // m³ of concrete per m²
    let steelFactor = 35; // kg of steel per m²
    let excavationFactor = 0.8; // m³ of excavation per base area m²
    let hourFactor = 0.12; // engineering hours per m²

    if (structureType === 'concreto') {
      concreteFactor = 0.45;
      steelFactor = 30;
    } else if (structureType === 'metalica') {
      concreteFactor = 0.20;
      steelFactor = 48;
    }

    if (soilType === 'arenoso') {
      excavationFactor = 1.1; // needs more retaining walls
    } else if (soilType === 'rochoso') {
      excavationFactor = 0.5; // less excavation but harder rock
    }

    // Calculations
    const totalArea = area * floors;
    const calcConcrete = totalArea * concreteFactor;
    const calcSteel = totalArea * steelFactor;
    const baseArea = area;
    const calcExcavation = baseArea * excavationFactor;
    const calcHours = totalArea * hourFactor + (floors * 20);

    // Cost range estimates (arbitrary B2B averages for structure execution)
    const costPerM2 = structureType === 'concreto' ? 1800 : structureType === 'metalica' ? 2200 : 2000;
    const baseCost = totalArea * costPerM2;
    const minCost = baseCost * 0.9;
    const maxCost = baseCost * 1.15;

    setConcrete(Math.round(calcConcrete));
    setSteel(Math.round(calcSteel));
    setExcavation(Math.round(calcExcavation));
    setCadHours(Math.round(calcHours));
    setCostEstRange({
      min: Math.round(minCost),
      max: Math.round(maxCost),
    });

  }, [area, floors, structureType, soilType]);

  const handleReset = () => {
    setArea(1500);
    setFloors(2);
    setStructureType('misto');
    setSoilType('medio');
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <section id="orcamento" className="spreadsheet-section">
      <div className="container">
        
        {/* Header Block */}
        <div className="spreadsheet-header">
          <span className="technical-tag">Orçamentação e Pré-Engenharia</span>
          <h2 className="heading-section">Planilha de Quantitativos Preliminar</h2>
          <p className="text-para spreadsheet-subtitle">
            Transparência técnica desde o primeiro contato. Ajuste as variáveis abaixo para estimar, 
            com base em nossos algoritmos de pré-engenharia, o volume aproximado de insumos estruturais do seu projeto.
          </p>
        </div>

        {/* Dynamic Calculator Grid */}
        <div className="calculator-wrapper">
          
          {/* Inputs Column */}
          <div className="calculator-inputs">
            <h3 className="heading-card calc-title">Parâmetros do Empreendimento</h3>
            
            {/* Area Slider */}
            <div className="input-group">
              <div className="input-labels">
                <label htmlFor="area-slider">Área de Projeção (Térreo)</label>
                <span className="input-value font-technical">{area.toLocaleString('pt-BR')} m²</span>
              </div>
              <input 
                id="area-slider"
                type="range" 
                min="300" 
                max="10000" 
                step="100"
                value={area} 
                onChange={(e) => setArea(Number(e.target.value))}
                className="range-slider"
              />
              <span className="range-bounds">300m² - 10.000m²</span>
            </div>

            {/* Floors Slider */}
            <div className="input-group">
              <div className="input-labels">
                <label htmlFor="floors-slider">Número de Pavimentos</label>
                <span className="input-value font-technical">{floors} {floors === 1 ? 'Pavimento' : 'Pavimentos'}</span>
              </div>
              <input 
                id="floors-slider"
                type="range" 
                min="1" 
                max="12" 
                step="1"
                value={floors} 
                onChange={(e) => setFloors(Number(e.target.value))}
                className="range-slider"
              />
              <span className="range-bounds">1 - 12 Pavimentos</span>
            </div>

            {/* Structure Type Select */}
            <div className="input-group">
              <label htmlFor="structure-select" className="select-label">Tipo de Superestrutura</label>
              <select 
                id="structure-select"
                value={structureType} 
                onChange={(e) => setStructureType(e.target.value)}
                className="technical-select"
              >
                <option value="concreto">Concreto Armado In Loco</option>
                <option value="metalica">Estrutura Metálica de Alta Performance</option>
                <option value="misto">Misto (Metálica + Lajes Alveolares)</option>
              </select>
            </div>

            {/* Soil Type Select */}
            <div className="input-group">
              <label htmlFor="soil-select" className="select-label">Perfil de Solo (Sondagem SPT)</label>
              <select 
                id="soil-select"
                value={soilType} 
                onChange={(e) => setSoilType(e.target.value)}
                className="technical-select"
              >
                <option value="arenoso">Solo Arenoso (Fundações Profundas Necessárias)</option>
                <option value="medio">Solo de Média Consistência (Padrão)</option>
                <option value="rochoso">Solo Rochoso / Firme (Fundações Rasas/Sapata)</option>
              </select>
            </div>

            <button onClick={handleReset} className="reset-calc-btn">
              <RefreshCw size={14} /> Restaurar Padrões
            </button>
          </div>

          {/* Spreadsheet Outputs Column */}
          <div className="spreadsheet-grid-card">
            <div className="spreadsheet-top-bar">
              <div className="sheet-tab active"><FileSpreadsheet size={14} /> NT_ESTIMATOR_V1.XLSX</div>
              <div className="sheet-status font-technical">SOMA=EFICIENTE</div>
            </div>

            {/* Excel style Table */}
            <div className="sheet-table">
              <div className="sheet-row header">
                <span className="sheet-col cell-idx"></span>
                <span className="sheet-col cell-desc">Descrição do Insumo / Serviço</span>
                <span className="sheet-col cell-unit">Unidade</span>
                <span className="sheet-col cell-qty">Quantidade Estimada</span>
              </div>

              <div className="sheet-row">
                <span className="sheet-col cell-idx">1</span>
                <span className="sheet-col cell-desc">Volume de Concreto Estrutural Total</span>
                <span className="sheet-col cell-unit">m³</span>
                <span className="sheet-col cell-qty font-technical">{concrete.toLocaleString('pt-BR')}</span>
              </div>

              <div className="sheet-row">
                <span className="sheet-col cell-idx">2</span>
                <span className="sheet-col cell-desc">Armadura de Aço CA-50 / CA-60</span>
                <span className="sheet-col cell-unit">kg</span>
                <span className="sheet-col cell-qty font-technical">{steel.toLocaleString('pt-BR')}</span>
              </div>

              <div className="sheet-row">
                <span className="sheet-col cell-idx">3</span>
                <span className="sheet-col cell-desc">Escavação e Movimentação de Terra</span>
                <span className="sheet-col cell-unit">m³</span>
                <span className="sheet-col cell-qty font-technical">{excavation.toLocaleString('pt-BR')}</span>
              </div>

              <div className="sheet-row">
                <span className="sheet-col cell-idx">4</span>
                <span className="sheet-col cell-desc">Horas de Engenharia de Projetos (BIM/CAD)</span>
                <span className="sheet-col cell-unit">hrs</span>
                <span className="sheet-col cell-qty font-technical">{cadHours.toLocaleString('pt-BR')}</span>
              </div>

              <div className="sheet-row total-row">
                <span className="sheet-col cell-idx">Σ</span>
                <span className="sheet-col cell-desc">Área Construída Total Equivalente</span>
                <span className="sheet-col cell-unit">m²</span>
                <span className="sheet-col cell-qty font-technical">{(area * floors).toLocaleString('pt-BR')}</span>
              </div>
            </div>

            {/* B2B budget highlight */}
            <div className="sheet-summary-badge">
              <div className="summary-left">
                <Calculator size={20} className="summary-icon" />
                <div>
                  <span className="summary-title">Orçamento Estrutural Estimado</span>
                  <span className="summary-desc">Valores médios para execução civil e insumos</span>
                </div>
              </div>
              <div className="summary-right font-technical">
                <span className="cost-range">{formatCurrency(costEstRange.min)} - {formatCurrency(costEstRange.max)}</span>
              </div>
            </div>

            <div className="spreadsheet-note">
              <p>
                *Estes valores são calculados com base em taxas médias paramétricas brasileiras. 
                Os quantitativos reais dependem de sondagem geológica e do projeto arquitetônico. 
                Para obter uma proposta oficial, faça contato abaixo anexando suas premissas.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
