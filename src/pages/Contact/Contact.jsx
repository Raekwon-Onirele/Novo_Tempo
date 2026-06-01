import React, { useState, useEffect } from "react";
import { Send, CheckCircle, Mail, Phone, Clock, FileText } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { EMAIL_CONFIG } from "../../config/emailConfig";
import "./Contact.css";

// ============================================================
// PAGE: Contact
// Página de Atendimento Técnico e Canal Comercial Integrado
// ============================================================

const Contact = () => {
  const [formData, setFormData] = useState({
    nome: "",
    empresa: "",
    email: "",
    telefone: "",
    departamentoId: EMAIL_CONFIG.DEPARTAMENTOS[0]?.id || "",
    servico: "estrutural",
    mensagem: "",
  });

  const [loading, setLoading] = useState(false);
  const [showSimulatedModal, setShowSimulatedModal] = useState(false);
  const [simulatedPayload, setSimulatedPayload] = useState(null);

  // Pré-selecionar serviço vindo de parâmetros de busca (query string)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get("servico");
    if (serviceParam) {
      // Mapear termos comuns dos serviços para as options do formulário
      let mappedService = "estrutural";
      if (
        serviceParam.includes("viabilidade") ||
        serviceParam.includes("pré-engenharia")
      ) {
        mappedService = "consultoria";
      } else if (
        serviceParam.includes("estruturais") ||
        serviceParam.includes("fundações")
      ) {
        mappedService = "estrutural";
      } else if (
        serviceParam.includes("consultoria") ||
        serviceParam.includes("auditoria")
      ) {
        mappedService = "consultoria";
      } else if (
        serviceParam.includes("bim") ||
        serviceParam.includes("tecnologia")
      ) {
        mappedService = "consultoria";
      } else if (serviceParam.includes("arquitetura")) {
        mappedService = "estrutural";
      } else if (serviceParam.includes("topografia")) {
        mappedService = "consultoria";
      }

      setFormData((prev) => ({
        ...prev,
        servico: mappedService,
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // ROTEAMENTO DINÂMICO DE E-MAIL
    // Localiza o departamento selecionado no formulário dentro da lista de emailConfig.js
    const selectedDept = EMAIL_CONFIG.DEPARTAMENTOS.find(
      (dept) => dept.id === formData.departamentoId,
    );

    const destinationEmail = selectedDept
      ? selectedDept.email
      : EMAIL_CONFIG.EMAIL_PADRAO;
    const departmentLabel = selectedDept ? selectedDept.label : "Geral";

    setTimeout(() => {
      // Simula o envio do e-mail montando o payload do evento
      setSimulatedPayload({
        destination: destinationEmail,
        department: departmentLabel,
        sentData: { ...formData },
      });
      setLoading(false);
      setShowSimulatedModal(true);

      // Limpa os campos do formulário
      setFormData({
        nome: "",
        empresa: "",
        email: "",
        telefone: "",
        departamentoId: EMAIL_CONFIG.DEPARTAMENTOS[0]?.id || "",
        servico: "estrutural",
        mensagem: "",
      });
    }, 1200); // Simula 1.2 segundos de resposta de rede
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
                      {EMAIL_CONFIG.EMAIL_PADRAO}
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

              <form onSubmit={handleSubmit} className="contact-actual-form">
                <div className="contact-form-grid">
                  <div className="contact-field">
                    <label htmlFor="nome">Nome Completo</label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      placeholder="Ex: João da Silva"
                      required
                    />
                  </div>

                  <div className="contact-field">
                    <label htmlFor="empresa">Empresa / Incorporadora</label>
                    <input
                      type="text"
                      id="empresa"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleChange}
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
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Ex: joao@realcon.com.br"
                      required
                    />
                  </div>

                  <div className="contact-field">
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

                  <div className="contact-field span-2">
                    <label htmlFor="departamentoId">
                      Departamento de Destino (Encaminhamento Automático)
                    </label>
                    <select
                      id="departamentoId"
                      name="departamentoId"
                      value={formData.departamentoId}
                      onChange={handleChange}
                      className="contact-form-select"
                      required
                    >
                      {EMAIL_CONFIG.DEPARTAMENTOS.map((dept) => (
                        <option key={dept.id} value={dept.id}>
                          {dept.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="contact-field span-2">
                    <label htmlFor="servico">
                      Setor Técnico do Empreendimento
                    </label>
                    <select
                      id="servico"
                      name="servico"
                      value={formData.servico}
                      onChange={handleChange}
                      className="contact-form-select"
                    >
                      <option value="estrutural">
                        Projeto Estrutural de Edificações / Infraestrutura
                      </option>
                      <option value="industrial">
                        Industrial (Silos, Bases Pesadas, Papel & Celulose)
                      </option>
                      <option value="hospitalar">
                        Rede Hospitalar (Saúde / Clínicas)
                      </option>
                      <option value="shopping">
                        Shopping Center / Centros Comerciais
                      </option>
                      <option value="consultoria">
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
                      name="mensagem"
                      rows="4"
                      value={formData.mensagem}
                      onChange={handleChange}
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
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Modal de Simulação de Envio de Email */}
      {showSimulatedModal && simulatedPayload && (
        <div className="simulated-modal-overlay">
          <div className="simulated-modal">
            <div className="modal-header-sec">
              <CheckCircle size={36} className="success-icon" />
              <h3>Simulação de Disparo de E-mail</h3>
            </div>

            <div className="modal-body-sec">
              <p className="modal-intro">
                O formulário disparou o evento com sucesso. As informações foram
                empacotadas e encaminhadas de acordo com a configuração de
                e-mail selecionada:
              </p>

              <div className="payload-box">
                <div className="payload-line">
                  <span className="payload-label font-technical font-bold">
                    DEPARTAMENTO ALVO:
                  </span>
                  <span className="payload-val">
                    {simulatedPayload.department}
                  </span>
                </div>
                <div className="payload-line">
                  <span className="payload-label font-technical font-bold">
                    EMAIL DE DESTINO:
                  </span>
                  <span className="payload-val highlight font-technical">
                    {simulatedPayload.destination}
                  </span>
                </div>
                <div className="payload-divider"></div>
                <div className="payload-line">
                  <span className="payload-label font-technical">
                    NOME CLIENTE:
                  </span>
                  <span className="payload-val">
                    {simulatedPayload.sentData.nome}
                  </span>
                </div>
                <div className="payload-line">
                  <span className="payload-label font-technical">EMPRESA:</span>
                  <span className="payload-val">
                    {simulatedPayload.sentData.empresa}
                  </span>
                </div>
                <div className="payload-line">
                  <span className="payload-label font-technical">
                    EMAIL CLIENTE:
                  </span>
                  <span className="payload-val">
                    {simulatedPayload.sentData.email}
                  </span>
                </div>
                <div className="payload-line">
                  <span className="payload-label font-technical">
                    TELEFONE:
                  </span>
                  <span className="payload-val">
                    {simulatedPayload.sentData.telefone}
                  </span>
                </div>
                <div className="payload-line">
                  <span className="payload-label font-technical">
                    SETOR PROJETO:
                  </span>
                  <span className="payload-val">
                    {simulatedPayload.sentData.servico.toUpperCase()}
                  </span>
                </div>
                <div className="payload-line scrollable-msg">
                  <span className="payload-label font-technical">
                    MENSAGEM:
                  </span>
                  <span className="payload-val">
                    "{simulatedPayload.sentData.mensagem}"
                  </span>
                </div>
              </div>

              <p className="modal-helper-text">
                Para alterar o email ou departamento acima, edite o arquivo{" "}
                <code>src/config/emailConfig.js</code> no código.
              </p>
            </div>

            <button
              className="btn-primary modal-close-btn font-technical"
              onClick={() => setShowSimulatedModal(false)}
            >
              Fechar Confirmação
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Contact;
