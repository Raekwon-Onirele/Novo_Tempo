import React, { useState, useEffect, useRef } from 'react';
import { ToggleLeft, Info, HelpCircle, ZoomIn } from 'lucide-react';
import './BimViewer.css';

export default function BimViewer() {
  const canvasRef = useRef(null);
  const [activeLayers, setActiveLayers] = useState({
    fundações: true,
    pilares: true,
    lajes: true,
    instalações: false,
  });
  
  // Rotation angles (degrees converted to radians in code)
  const [angleY, setAngleY] = useState(45);
  const [angleX, setAngleX] = useState(25);
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  // Metadata for active layers to show technical info
  const layerMeta = {
    fundações: { material: 'Concreto Armado Fck 40MPa', status: 'Cálculo Concluído', safety: '1.60 (Segurança)' },
    pilares: { material: 'Aço Estrutural ASTM A572 Gr50', status: 'LOD 350 Verificado', safety: '1.50 (Segurança)' },
    lajes: { material: 'Laje Alveolar Protendida', status: 'Otimizado', safety: '1.40 (Segurança)' },
    instalações: { material: 'Polímeros / Cobre / Aço Galv.', status: 'Compatibilizado BIM', safety: 'N/A' },
  };

  const toggleLayer = (layer) => {
    setActiveLayers(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }));
  };

  // 3D structural model coordinates for a tall building (prédio)
  // Nodes defined as {x, y, z} where y is vertical axis (negative up)
  const columnsGrid = [
    { x: -60, z: -60 },
    { x: 60, z: -60 },
    { x: 60, z: 60 },
    { x: -60, z: 60 },
    { x: 0, z: -60 },
    { x: 0, z: 60 },
    { x: -60, z: 0 },
    { x: 60, z: 0 },
    { x: 0, z: 0 },
  ];

  // 6 floor heights representing a high-rise building structure
  const floorHeights = [60, 30, 0, -30, -60, -90]; 
  const foundationY = 90;

  // 1. ANIMATION EFFECT: Dedicated loop to increment rotation angle
  // Runs only once on mount to avoid infinite render update cycles
  useEffect(() => {
    let animationFrameId;
    const updateRotation = () => {
      if (!isDragging.current) {
        setAngleY(prev => (prev + 0.15) % 360);
      }
      animationFrameId = requestAnimationFrame(updateRotation);
    };
    updateRotation();
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // 2. DRAWING EFFECT: Handles redrawing on the canvas
  // Runs when activeLayers, angleY, or angleX changes (read-only state)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    
    // Rotation matrices helper
    const radY = (angleY * Math.PI) / 180;
    const radX = (angleX * Math.PI) / 180;

    const cosY = Math.cos(radY);
    const sinY = Math.sin(radY);
    const cosX = Math.cos(radX);
    const sinX = Math.sin(radX);

    // Project 3D point to 2D
    const project = (x, y, z) => {
      // Rotate around Y axis
      let x1 = x * cosY - z * sinY;
      let z1 = x * sinY + z * cosY;

      // Rotate around X axis
      let y2 = y * cosX - z1 * sinX;
      let z2 = y * sinX + z1 * cosX;

      // Perspective projection factor
      const distance = 400;
      const scale = distance / (distance + z2);
      
      return {
        x: cx + x1 * scale * 1.5,
        y: cy + y2 * scale * 1.5
      };
    };

    // Draw grid helper (Reference plane at base)
    ctx.strokeStyle = 'rgba(21, 24, 22, 0.05)';
    ctx.lineWidth = 1;
    for (let i = -120; i <= 120; i += 40) {
      ctx.beginPath();
      let p1 = project(-120, foundationY, i);
      let p2 = project(120, foundationY, i);
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();

      ctx.beginPath();
      let p3 = project(i, foundationY, -120);
      let p4 = project(i, foundationY, 120);
      ctx.moveTo(p3.x, p3.y);
      ctx.lineTo(p4.x, p4.y);
      ctx.stroke();
    }

    // 1. Draw Foundations (Fundações)
    if (activeLayers.fundações) {
      ctx.strokeStyle = '#8E9690';
      ctx.fillStyle = 'rgba(142, 150, 144, 0.4)';
      ctx.lineWidth = 1.5;
      columnsGrid.forEach(col => {
        // Foundation blocks (3D cubes at base)
        const size = 12;
        const py = foundationY;
        const vertices = [
          project(col.x - size, py, col.z - size),
          project(col.x + size, py, col.z - size),
          project(col.x + size, py, col.z + size),
          project(col.x - size, py, col.z + size),
          project(col.x - size, py + 15, col.z - size),
          project(col.x + size, py + 15, col.z - size),
          project(col.x + size, py + 15, col.z + size),
          project(col.x - size, py + 15, col.z + size),
        ];

        // Draw base block faces
        ctx.beginPath();
        ctx.moveTo(vertices[0].x, vertices[0].y);
        for (let i = 1; i < 4; i++) ctx.lineTo(vertices[i].x, vertices[i].y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Connect top and bottom block lines
        for (let i = 0; i < 4; i++) {
          ctx.beginPath();
          ctx.moveTo(vertices[i].x, vertices[i].y);
          ctx.lineTo(vertices[i+4].x, vertices[i+4].y);
          ctx.stroke();
        }
      });
    }

    // 2. Draw Columns and Beams (Pilares e Vigas do Prédio)
    if (activeLayers.pilares) {
      ctx.strokeStyle = '#006e80'; // Accent green for structure
      ctx.lineWidth = 2.5;
      columnsGrid.forEach(col => {
        // Vertical columns extending from foundation to highest floor
        const pBase = project(col.x, foundationY, col.z);
        const pTop = project(col.x, floorHeights[floorHeights.length - 1], col.z);
        
        ctx.beginPath();
        ctx.moveTo(pBase.x, pBase.y);
        ctx.lineTo(pTop.x, pTop.y);
        ctx.stroke();
      });

      // Beams linking columns on each floor
      floorHeights.forEach(h => {
        // Draw floor beams connecting the outer ring columns
        const outerCols = [
          { x: -60, z: -60 },
          { x: 60, z: -60 },
          { x: 60, z: 60 },
          { x: -60, z: 60 },
        ];

        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let i = 0; i < outerCols.length; i++) {
          let nextIdx = (i + 1) % outerCols.length;
          let pt1 = project(outerCols[i].x, h, outerCols[i].z);
          let pt2 = project(outerCols[nextIdx].x, h, outerCols[nextIdx].z);
          ctx.moveTo(pt1.x, pt1.y);
          ctx.lineTo(pt2.x, pt2.y);
        }
        
        // Inner grid lines on each floor
        // X grid line through center
        let ptLeft = project(-60, h, 0);
        let ptRight = project(60, h, 0);
        ctx.moveTo(ptLeft.x, ptLeft.y);
        ctx.lineTo(ptRight.x, ptRight.y);

        // Z grid line through center
        let ptBack = project(0, h, -60);
        let ptFront = project(0, h, 60);
        ctx.moveTo(ptBack.x, ptBack.y);
        ctx.lineTo(ptFront.x, ptFront.y);
        
        ctx.stroke();
      });
    }

    // 3. Draw Slabs (Lajes do Prédio)
    if (activeLayers.lajes) {
      ctx.fillStyle = 'rgba(35, 78, 55, 0.08)';
      ctx.strokeStyle = '#376C50';
      ctx.lineWidth = 0.8;
      floorHeights.forEach(h => {
        // Draw a semi-transparent slab on each floor
        const corners = [
          project(-60, h - 1, -60),
          project(60, h - 1, -60),
          project(60, h - 1, 60),
          project(-60, h - 1, 60),
        ];
        ctx.beginPath();
        ctx.moveTo(corners[0].x, corners[0].y);
        ctx.lineTo(corners[1].x, corners[1].y);
        ctx.lineTo(corners[2].x, corners[2].y);
        ctx.lineTo(corners[3].x, corners[3].y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      });
    }

    // 4. Draw Facilities (Instalações do Prédio)
    if (activeLayers.instalações) {
      ctx.strokeStyle = '#D45A25'; // Rust/Orange color for pipes
      ctx.lineWidth = 1.8;
      
      // Draw vertical main piping stack
      ctx.beginPath();
      let pBottom = project(-30, foundationY, -30);
      let pTopPipe = project(-30, floorHeights[floorHeights.length - 1], -30);
      ctx.moveTo(pBottom.x, pBottom.y);
      ctx.lineTo(pTopPipe.x, pTopPipe.y);
      ctx.stroke();

      // Draw horizontal piping branches spreading on alternate floors
      floorHeights.forEach((h, idx) => {
        ctx.beginPath();
        let pStart = project(-30, h, -30);
        let pEnd;
        // Alternate directions of pipe branches per floor
        if (idx % 2 === 0) {
          pEnd = project(40, h, -30);
        } else {
          pEnd = project(-30, h, 40);
        }
        ctx.moveTo(pStart.x, pStart.y);
        ctx.lineTo(pEnd.x, pEnd.y);
        ctx.stroke();

        // Small junction point node
        let pJunc = project(pEnd.x, h, pEnd.z);
        ctx.fillStyle = '#D45A25';
        ctx.beginPath();
        ctx.arc(pJunc.x, pJunc.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });
    }
  }, [activeLayers, angleY, angleX]);

  // Drag and rotate handlers
  const handleMouseDown = (e) => {
    isDragging.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - lastMousePos.current.x;
    const deltaY = e.clientY - lastMousePos.current.y;
    
    setAngleY(prev => (prev + deltaX * 0.5) % 360);
    setAngleX(prev => Math.max(-60, Math.min(60, prev + deltaY * 0.5))); // constraint tilt
    
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  // Touch screen support
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      isDragging.current = true;
      lastMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - lastMousePos.current.x;
    const deltaY = e.touches[0].clientY - lastMousePos.current.y;
    
    setAngleY(prev => (prev + deltaX * 0.5) % 360);
    setAngleX(prev => Math.max(-60, Math.min(60, prev + deltaY * 0.5)));
    
    lastMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  return (
    <section id="projetos" className="bim-section">
      <div className="container">
        
        {/* Title Grid */}
        <div className="bim-header">
          <span className="technical-tag">Engenharia Tecnológica</span>
          <h2 className="heading-section">Modelagem e Compatibilidade BIM 3D</h2>
          <p className="text-para bim-subtitle">
            Trabalhamos no padrão LOD (Level of Detail) 350. Arraste no modelo abaixo para rotacionar a 
            estrutura 3D e ative/desative as camadas técnicas para visualizar como compatibilizamos cada etapa.
          </p>
        </div>

        <div className="bim-viewer-grid">
          
          {/* 3D Canvas Panel */}
          <div className="bim-canvas-container">
            <canvas 
              ref={canvasRef} 
              width={540} 
              height={400} 
              className="bim-canvas"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleMouseUpOrLeave}
            />
            <div className="bim-canvas-overlay-guide">
              <ZoomIn size={14} /> Arraste para Rotacionar
            </div>
            
            {/* Geometric axes visualizer */}
            <div className="coordinates-overlay">
              <span className="coord-axis axis-x">X: {(angleY).toFixed(0)}°</span>
              <span className="coord-axis axis-y">Y: {(angleX).toFixed(0)}°</span>
              <span className="coord-axis axis-z">LOD: 350</span>
            </div>
          </div>

          {/* Configuration and layer details panel */}
          <div className="bim-controls-panel">
            <h3 className="heading-card control-panel-title">Filtro de Disciplinas</h3>
            <p className="control-panel-desc">Selecione as camadas do modelo tridimensional:</p>

            <div className="layer-toggles">
              {Object.keys(activeLayers).map((layer) => (
                <div 
                  key={layer} 
                  className={`layer-toggle-row ${activeLayers[layer] ? 'active' : ''}`}
                  onClick={() => toggleLayer(layer)}
                >
                  <div className="layer-info-side">
                    <span className={`layer-indicator-dot ${layer}`}></span>
                    <span className="layer-name">{layer.charAt(0).toUpperCase() + layer.slice(1)}</span>
                  </div>
                  <div className="toggle-switch-wrapper">
                    <span className="status-label">{activeLayers[layer] ? 'Ativado' : 'Oculto'}</span>
                    <div className="switch-element">
                      <div className={`switch-knob ${activeLayers[layer] ? 'checked' : ''}`}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Live Properties Display based on selections */}
            <div className="live-specifications">
              <h4 className="specs-title"><Info size={14} /> Especificações das Camadas Ativas</h4>
              
              <div className="specs-table">
                <div className="specs-row header">
                  <span>Disciplina</span>
                  <span>Material Principal</span>
                  <span>Coef. Segurança</span>
                </div>

                {Object.keys(activeLayers).map((layer) => {
                  if (!activeLayers[layer]) return null;
                  return (
                    <div key={layer} className="specs-row">
                      <span className="spec-name">{layer.toUpperCase()}</span>
                      <span className="spec-val truncate">{layerMeta[layer].material}</span>
                      <span className="spec-safety font-technical">{layerMeta[layer].safety}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
