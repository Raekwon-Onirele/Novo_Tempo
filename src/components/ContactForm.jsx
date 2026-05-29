import React, { useState } from 'react';
import { Send, CheckCircle, Mail, Phone, Clock, FileText } from 'lucide-react';
// IMPORTANTE: A configuração de emails de destino está centralizada no arquivo abaixo!
// Você pode alterar os emails e os departamentos no arquivo '/src/config/emailConfig.js' a qualquer momento.
import { EMAIL_CONFIG } from '../config/emailConfig';
import './ContactForm.css';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nome: '',
    empresa: '',
    email: '',
    telefone: '',
    departamentoId: EMAIL_CONFIG.DEPARTAMENTOS[0]?.id || '', // Inicia com o primeiro departamento da configuração
    servico: 'estrutural',
    mensagem: ''
  });

  const [loading, setLoading] = useState(false);
  const [showSimulatedModal, setShowSimulatedModal] = useState(false);
  const [simulatedPayload, setSimulatedPayload] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // DYNAMIC EMAIL ROUTING RESOLUTION
    // Procuro o departamento selecionado pelo usuário dentro da lista configurada no 'emailConfig.js'
    const selectedDept = EMAIL_CONFIG.DEPARTAMENTOS.find(
      dept => dept.id === formData.departamentoId
    );
    
    // Se o departamento for encontrado, pega seu email. Caso contrário, usa o email padrão.
    const destinationEmail = selectedDept ? selectedDept.email : EMAIL_CONFIG.EMAIL_PADRAO;
    const departmentLabel = selectedDept ? selectedDept.label : 'Geral';

    setTimeout(() => {
      // Simula o disparo de email montando o payload de envio
      setSimulatedPayload({
        destination: destinationEmail,
        department: departmentLabel,
        sentData: { ...formData }
      });
      setLoading(false);
      setShowSimulatedModal(true);
      
      // Limpa formulário
      setFormData({
        nome: '',
        empresa: '',
        email: '',
        telefone: '',
        departamentoId: EMAIL_CONFIG.DEPARTAMENTOS[0]?.id || '',
        servico: 'estrutural',
        mensagem: ''
      });
    }, 1200); // 1.2 segundos de simulação de rede
  };

  return (
    <section id="contato" className="contact-section">
      <div className="container contact-container">
        
        {/* Left Column - Contact Details */}
        <div className="contact-info-panel">
          <span className="technical-tag">Canais de Atendimento</span>
          <h2 className="heading-section">Pronto para dar o primeiro passo?</h2>
          <p className="text-para contact-desc-text">
            Nossa equipe técnica e comercial está disponível para analisar as premissas do seu empreendimento, 
            estudos de viabilidade geológica ou compatibilização estrutural.
          </p>

          <div className="contact-details-list">
            <div className="contact-detail-card">
              <Mail className="detail-icon" size={20} />
              <div>
                <span className="detail-title">Email de Contato</span>
                <span className="detail-val font-technical">{EMAIL_CONFIG.EMAIL_PADRAO}</span>
              </div>
            </div>

            <div className="contact-detail-card">
              <Phone className="detail-icon" size={20} />
              <div>
                <span className="detail-title">Telefone Central</span>
                <span className="detail-val font-technical">(11) 4502-3920</span>
              </div>
            </div>

            <div className="contact-detail-card">
              <Clock className="detail-icon" size={20} />
              <div>
                <span className="detail-title">Horário de Funcionamento</span>
                <span className="detail-val">Segunda a Sexta: 08:00 às 18:00</span>
              </div>
            </div>
          </div>

          <div className="contact-crea-stamp">
            <FileText size={24} className="crea-icon" />
            <div>
              <span className="stamp-title">ART (Anotação de Responsabilidade Técnica)</span>
              <span className="stamp-desc">Todas as nossas consultorias e projetos estruturais são registrados no CREA e segurados.</span>
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="contact-form-panel">
          <h3 className="heading-card form-box-title">Formulário de Pré-Orçamento</h3>
          <p className="form-box-desc">Preencha as informações básicas para direcionamento imediato:</p>

          <form onSubmit={handleSubmit} className="actual-form">
            <div className="form-grid">
              {/* Name */}
              <div className="form-field">
                <label htmlFor="nome">Nome Completo</label>
                <input 
                  type="text" 
                  id="nome" 
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Ex: João Silva" 
                  required 
                />
              </div>

              {/* Company */}
              <div className="form-field">
                <label htmlFor="empresa">Empresa / Incorporadora</label>
                <input 
                  type="text" 
                  id="empresa" 
                  name="empresa"
                  value={formData.empresa}
                  onChange={handleChange}
                  placeholder="Ex: Construtora Real" 
                  required 
                />
              </div>

              {/* Email */}
              <div className="form-field">
                <label htmlFor="email">E-mail Corporativo</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Ex: joao@empresa.com" 
                  required 
                />
              </div>

              {/* Phone */}
              <div className="form-field">
                <label htmlFor="telefone">Telefone / WhatsApp</label>
                <input 
                  type="tel" 
                  id="telefone" 
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  placeholder="Ex: (11) 99999-9999" 
                  required 
                />
              </div>

              {/* CONFIGURAÇÃO DINÂMICA: SELEÇÃO DE EMAIL */}
              {/* Este campo puxa dinamicamente os departamentos cadastrados no seu 'emailConfig.js' */}
              <div className="form-field span-2">
                <label htmlFor="departamentoId">Área de Destino (Direcionamento de E-mail)</label>
                <select 
                  id="departamentoId" 
                  name="departamentoId"
                  value={formData.departamentoId}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  {EMAIL_CONFIG.DEPARTAMENTOS.map(dept => (
                    <option key={dept.id} value={dept.id}>
                      {dept.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sector Selection */}
              <div className="form-field span-2">
                <label htmlFor="servico">Setor / Tipo de Empreendimento</label>
                <select 
                  id="servico" 
                  name="servico"
                  value={formData.servico}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="industrial">Industrial (Galpão, Silo, Bases Pesadas)</option>
                  <option value="hospitalar">Rede de Saúde (Hospital, Clínicas)</option>
                  <option value="shopping">Shopping Center / Centro Comercial</option>
                  <option value="estrutural">Projeto Estrutural de Edifício</option>
                  <option value="consultoria">Consultoria Técnica / Auditoria de Projetos</option>
                </select>
              </div>

              {/* Message */}
              <div className="form-field span-2">
                <label htmlFor="mensagem">Resumo do Escopo / Mensagem</label>
                <textarea 
                  id="mensagem" 
                  name="mensagem"
                  rows="4"
                  value={formData.mensagem}
                  onChange={handleChange}
                  placeholder="Descreva as dimensões aproximadas, tipo de solo (se conhecido) ou escopo da consultoria estrutural." 
                  required
                ></textarea>
              </div>
            </div>

            <button type="submit" className="btn-primary form-submit-btn" disabled={loading}>
              {loading ? (
                <>
                  <Clock className="animate-spin" size={18} /> Processando dados...
                </>
              ) : (
                <>
                  <Send size={18} /> Enviar Solicitação Técnica
                </>
              )}
            </button>
          </form>
        </div>

      </div>

      {/* Dynamic Simulated Email Shipment Modal */}
      {showSimulatedModal && simulatedPayload && (
        <div className="simulated-modal-overlay">
          <div className="simulated-modal">
            <div className="modal-header-sec">
              <CheckCircle size={36} className="success-icon" />
              <h3>Simulação de Disparo de E-mail</h3>
            </div>
            
            <div className="modal-body-sec">
              <p className="modal-intro">
                O formulário disparou o evento com sucesso. As informações foram empacotadas 
                e encaminhadas de acordo com a configuração de e-mail selecionada:
              </p>
              
              <div className="payload-box">
                <div className="payload-line">
                  <span className="payload-label font-technical font-bold">DEPARTAMENTO ALVO:</span>
                  <span className="payload-val">{simulatedPayload.department}</span>
                </div>
                <div className="payload-line">
                  <span className="payload-label font-technical font-bold">EMAIL DE DESTINO:</span>
                  <span className="payload-val highlight font-technical">{simulatedPayload.destination}</span>
                </div>
                <div className="payload-divider"></div>
                <div className="payload-line">
                  <span className="payload-label font-technical">NOME CLIENTE:</span>
                  <span className="payload-val">{simulatedPayload.sentData.nome}</span>
                </div>
                <div className="payload-line">
                  <span className="payload-label font-technical">EMPRESA:</span>
                  <span className="payload-val">{simulatedPayload.sentData.empresa}</span>
                </div>
                <div className="payload-line">
                  <span className="payload-label font-technical">EMAIL CLIENTE:</span>
                  <span className="payload-val">{simulatedPayload.sentData.email}</span>
                </div>
                <div className="payload-line">
                  <span className="payload-label font-technical">TELEFONE:</span>
                  <span className="payload-val">{simulatedPayload.sentData.telefone}</span>
                </div>
                <div className="payload-line">
                  <span className="payload-label font-technical">SETOR PROJETO:</span>
                  <span className="payload-val">{simulatedPayload.sentData.servico.toUpperCase()}</span>
                </div>
                <div className="payload-line scrollable-msg">
                  <span className="payload-label font-technical">MENSAGEM:</span>
                  <span className="payload-val">"{simulatedPayload.sentData.mensagem}"</span>
                </div>
              </div>

              <p className="modal-helper-text">
                Para alterar o email ou departamento acima, edite o arquivo <code>src/config/emailConfig.js</code> no código.
              </p>
            </div>
            
            <button className="btn-primary modal-close-btn" onClick={() => setShowSimulatedModal(false)}>
              Fechar Confirmação
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
