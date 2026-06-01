import React, { useState, useRef } from 'react';
import { Send, CheckCircle, Mail, Phone, Clock, FileText } from 'lucide-react';
// IMPORTANTE: A configuração de emails de destino está centralizada no arquivo abaixo!
// Você pode alterar os emails e os departamentos no arquivo '/src/config/emailConfig.js' a qualquer momento.
import emailjs from '@emailjs/browser'
import './ContactForm.css';

export default function ContactForm() {

  const [loading, setLoading] = useState(false);

  const formRef = useRef()
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
      formRef.current.reset()
    } catch (error) {
      console.error('Erro ao enviar:', error)
      setStatus('error')
    }
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
                <span className="detail-val font-technical">projetos@novotempoengenharia.com.br</span>
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

          <form onSubmit={handleSubmit} ref={formRef} className="actual-form">
            <div className="form-grid">
              {/* Name */}
              <div className="form-field">
                <label htmlFor="nome">Nome Completo</label>
                <input 
                  type="text" 
                  id="nome" 
                  name="name"
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
                  name="company"
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
                  name="phone"
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
                  name="sector"
                  className="form-select"
                >
                  <option value="Comercial">Comercial</option>
                  <option value="Financeiro">Financeiro</option>
                </select>
              </div>

              {/* Sector Selection */}
              <div className="form-field span-2">
                <label htmlFor="servico">Setor / Tipo de Empreendimento</label>
                <select 
                  id="servico" 
                  name="undertaking"
                  className="form-select"
                >
                  <option value="Industrial (Galpão, Silo, Bases Pesadas)">Industrial (Galpão, Silo, Bases Pesadas)</option>
                  <option value="Rede de Saúde (Hospital, Clínicas)">Rede de Saúde (Hospital, Clínicas)</option>
                  <option value="Shopping Center / Centro Comercial">Shopping Center / Centro Comercial</option>
                  <option value="Projeto Estrutural de Edifício">Projeto Estrutural de Edifício</option>
                  <option value="Consultoria Técnica / Auditoria de Projetos">Consultoria Técnica / Auditoria de Projetos</option>
                </select>
              </div>

              {/* Message */}
              <div className="form-field span-2">
                <label htmlFor="mensagem">Resumo do Escopo / Mensagem</label>
                <textarea 
                  id="mensagem" 
                  name="describe"
                  rows="4"
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

            {status === 'success' && <p style={{ color: 'green' }}>Email enviado com sucesso!</p>}
            {status === 'error'   && <p style={{ color: 'red'  }}>Erro ao enviar. Tente novamente.</p>}
          </form>
        </div>

      </div>
    </section>
  );
}
