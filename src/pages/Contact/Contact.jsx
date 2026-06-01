import React, { useState, useEffect, useRef } from "react";
import { Send, CheckCircle, Mail, Phone, Clock, FileText } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import emailjs from "@emailjs/browser";
import "./Contact.css";

// ============================================================
// PAGE: Contact
// Página de Atendimento Técnico e Canal Comercial Integrado
// ============================================================

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const formRef = useRef();
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
      setStatus("success");
      formRef.current.reset();
    } catch (error) {
      console.error("Erro ao enviar:", error);
      setStatus("error");
    }
  };
  return (
    <div className="page-wrapper technical-grid-lines">
      <Navbar />

      <main className="contact-page-main" id="heroInicio">
        {/* ─── Hero ─── */}
        <section className="contact-hero-section">
          <div className="container">
            <span className="technical-tag">Canais de Entrada</span>
            <h1 className="heading-huge">
              Fale com a <span className="accent-text">Novo Tempo</span>
            </h1>
            <p className="text-para contact-hero-desc">
              Entre em contato diretamente com nossa equipe técnica. Preencha o
              formulário abaixo para direcionamento de e-mail automatizado de
              acordo com o departamento de sua necessidade.
            </p>
          </div>
        </section>

        {/* ─── Layout do Formulário de Contato ─── */}
        <section className="contact-form-section">
          <div className="container contact-page-container">
            {/* Coluna da Esquerda: Canais de Atendimento */}
            <div className="contact-page-info">
              <span className="technical-tag font-technical">
                Atendimento Direto
              </span>
              <h2 className="heading-card">Engenharia sob Demanda</h2>
              <p className="text-para">
                Estamos prontos para analisar estudos geotécnicos,
                compatibilização estrutural, projetos as-built ou orçamentação
                civil completa para o seu negócio B2B.
              </p>

              <div className="contact-details-grid-box">
                <div className="contact-info-card">
                  <Mail className="contact-card-icon" size={20} />
                  <div>
                    <span className="info-card-title">E-mail Principal</span>
                    <span className="info-card-val font-technical">
                      projetos@novotempoengenharia.com.br
                    </span>
                  </div>
                </div>

                <div className="contact-info-card">
                  <Phone className="contact-card-icon" size={20} />
                  <div>
                    <span className="info-card-title">Central Comercial</span>
                    <div className="info-contact">
                      <span className="info-card-val font-technical">
                        +55 (11) 3214-2918
                      </span>
                      <span className="info-card-val font-technical">
                        +55 (11) 9 8261-2500
                      </span>
                      <span className="info-card-val font-technical">
                        +55 (11) 9 9266-5955
                      </span>
                    </div>
                  </div>
                </div>

                <div className="contact-info-card">
                  <Clock className="contact-card-icon" size={20} />
                  <div>
                    <span className="info-card-title">Horário Técnico</span>
                    <span className="info-card-val">
                      Segunda a Sexta: 08:00 às 18:00
                    </span>
                  </div>
                </div>
              </div>

              <div className="crea-compliance-badge">
                <FileText size={28} className="compliance-icon" />
                <div>
                  <span className="compliance-title">Projetos Assegurados</span>
                  <span className="compliance-text">
                    Todos os projetos possuem emissão de ART registrada junto ao
                    CREA, atestando total conformidade técnica com as normas
                    vigentes NBR 6118 e 8800.
                  </span>
                </div>
              </div>
            </div>

            {/* Coluna da Direita: Formulário de Contato */}
            <div className="contact-page-form-panel">
              <h3 className="heading-card form-panel-title">
                Formulário de Pré-Orçamento
              </h3>
              <p className="form-panel-subtitle">
                Insira as diretrizes básicas do empreendimento para envio
                imediato:
              </p>

              <form
                onSubmit={handleSubmit}
                ref={formRef}
                className="contact-actual-form"
              >
                <div className="contact-form-grid">
                  <div className="contact-field">
                    <label htmlFor="nome">Nome Completo</label>
                    <input
                      type="text"
                      id="nome"
                      name="name"
                      placeholder="Ex: João da Silva"
                      required
                    />
                  </div>

                  <div className="contact-field">
                    <label htmlFor="empresa">Empresa / Incorporadora</label>
                    <input
                      type="text"
                      id="empresa"
                      name="company"
                      placeholder="Ex: Construtora Real Ltda"
                      required
                    />
                  </div>

                  <div className="contact-field">
                    <label htmlFor="email">E-mail Corporativo</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Ex: joao@realcon.com.br"
                      required
                    />
                  </div>

                  <div className="contact-field">
                    <label htmlFor="telefone">Telefone / WhatsApp</label>
                    <input
                      type="tel"
                      id="telefone"
                      name="phone"
                      placeholder="Ex: (11) 99999-9999"
                      required
                    />
                  </div>

                  <div className="contact-field span-2">
                    <label htmlFor="departamentoId">
                      Departamento de Destino (Encaminhamento Automático)
                    </label>
                    <select
                      id="departamentoId"
                      name="sector"
                      className="contact-form-select"
                      required
                    >
                      <option value="Comercial">Comercial</option>
                      <option value="Financeiro">Financeiro</option>
                    </select>
                  </div>

                  <div className="contact-field span-2">
                    <label htmlFor="servico">
                      Setor Técnico do Empreendimento
                    </label>
                    <select
                      id="servico"
                      name="servico"
                      name="undertaking"
                      className="contact-form-select"
                    >
                      <option value="Projeto Estrutural de Edificações / Infraestrutura">
                        Projeto Estrutural de Edificações / Infraestrutura
                      </option>
                      <option value="Industrial (Silos, Bases Pesadas, Papel & Celulose)">
                        Industrial (Silos, Bases Pesadas, Papel & Celulose)
                      </option>
                      <option value="Rede Hospitalar (Saúde / Clínicas)">
                        Rede Hospitalar (Saúde / Clínicas)
                      </option>
                      <option value="Shopping Center / Centros Comerciais">
                        Shopping Center / Centros Comerciais
                      </option>
                      <option value="Consultoria Técnica Independente / Auditoria BIM">
                        Consultoria Técnica Independente / Auditoria BIM
                      </option>
                    </select>
                  </div>

                  <div className="contact-field span-2">
                    <label htmlFor="mensagem">
                      Detalhamento Técnico / Escopo da Mensagem
                    </label>
                    <textarea
                      id="mensagem"
                      name="describe"
                      rows="4"
                      placeholder="Descreva a área total estimada, quantidade de pavimentos, sondagem de solo (se conhecida) ou outras diretrizes do projeto."
                      required
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-primary contact-submit-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Clock
                        className="animate-spin"
                        size={18}
                        style={{ marginRight: 8 }}
                      />{" "}
                      Processando dados...
                    </>
                  ) : (
                    <>
                      <Send size={18} style={{ marginRight: 8 }} /> Enviar
                      Mensagem Comercial
                    </>
                  )}
                </button>

                {status === "success" && (
                  <p style={{ color: "green" }}>Email enviado com sucesso!</p>
                )}
                {status === "error" && (
                  <p style={{ color: "red" }}>
                    Erro ao enviar. Tente novamente.
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
