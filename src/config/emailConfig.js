/**
 * CONFIGURAÇÃO DE EMAILS DE DESTINO - NOVO TEMPO ENGENHARIA
 * 
 * Como alterar as configurações de email:
 * 1. Para alterar o email de destino de uma área, modifique o campo 'email' do respectivo departamento abaixo.
 * 2. Para adicionar um novo departamento, insira um novo objeto na lista 'DEPARTAMENTOS' seguindo o mesmo padrão:
 *    { id: 'identificador', label: 'Nome Visível no Formulário', email: 'email@dominio.com' }
 * 3. Esta configuração é lida dinamicamente pelo formulário de contato.
 */

export const EMAIL_CONFIG = {
  // Lista de departamentos disponíveis para seleção no formulário de contato
  DEPARTAMENTOS: [
    {
      id: 'comercial',
      label: 'Comercial (Novos Negócios & Orçamentos)',
      email: 'raekwononirele@gmail.com'
    },
    {
      id: 'tecnico',
      label: 'Departamento Técnico (Projetos & BIM)',
      email: 'engenharia@novotempoengenharia.com.br'
    },
    {
      id: 'consultoria',
      label: 'Consultoria & Pré-Engenharia',
      email: 'consultoria@novotempoengenharia.com.br'
    },
    {
      id: 'diretoria',
      label: 'Diretoria & Parcerias Estratégicas',
      email: 'diretoria@novotempoengenharia.com.br'
    }
  ],

  // Email padrão usado como fallback (caso algo dê errado na seleção)
  EMAIL_PADRAO: 'projetos@novotempoengenharia.com.br',

  // Configurações do simulador de envio (exibidas no console ou popup para teste manual)
  SIMULAR_ENVIO: true // Se true, exibe um log no console e modal de simulação com os detalhes do email disparado.
};
