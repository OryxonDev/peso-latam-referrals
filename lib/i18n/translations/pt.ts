export const pt = {
  common: {
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    retry: 'Tentar novamente',
    back: 'Voltar',
    delete: 'Excluir',
    deleting: 'Excluindo...',
    copy: 'Copiar',
    copied: 'Copiado!',
    previous: 'Anterior',
    next: 'Próximo',
    page: 'Página',
    of: 'de',
    user: 'Usuário',
    email: 'Email',
    phone: 'Telefone',
    name: 'Nome',
    description: 'Descrição',
    invited: 'Convidado',
    confirmed: 'Confirmado',
    share: 'Compartilhar',
    shareOn: 'Compartilhar no',
  },
  home: {
    title: 'Seus indicados',
    subtitle: 'Estes são todos os seus indicados que você convidou',
  },
  referrals: {
    list: {
      empty: {
        title: 'Não há indicados disponíveis',
        message: 'Comece a convidar pessoas e ganhe {amount} por cada indicado confirmado',
        inviteFirst: 'Convidar primeiro indicado',
      },
      error: {
        title: 'Erro ao carregar os indicados',
        whatFailed: 'O que falhou:',
        howToRecover: 'Como recuperar:',
      },
      pagination: {
        page: 'Página {current} de {total}',
      },
    },
    card: {
      confirmedWithAmount: 'Confirmado + {amount}',
    },
    profile: {
      title: 'Indicado',
      subtitle: 'Informações detalhadas do indicado',
      notFound: 'Indicado não encontrado',
      registrationDate: 'Data de registro',
      deleteAriaLabel: 'Excluir indicado',
    },
    invite: {
      title: 'Convide e ganhe',
      subtitle: 'Preencha o formulário para enviar seu convite a um amigo e ganhe {amount}.',
      shareLinkTitle: 'Ou compartilhe seu link',
      form: {
        nameLabel: 'Nome',
        emailLabel: 'Email',
        phoneLabel: 'Telefone',
        submit: 'Convidar',
        submitting: 'Convidando...',
      },
      deleteConfirm: {
        title: 'Excluir indicado?',
        message: 'Esta ação não pode ser desfeita. O indicado {name} será excluído permanentemente.',
      },
    },
    profileError: {
      title: 'Erro ao carregar o indicado',
      whatFailed: 'O que falhou:',
      howToRecover: 'Como recuperar:',
    },
  },
  totalEarned: {
    title: 'Total ganho',
    confirmed: 'confirmados',
    invited: 'convidados',
    message: 'Você pode convidar mais pessoas para ganhar mais dinheiro. Por cada indicado confirmado, você ganha {amount}.',
    inviteButton: 'Convidar',
    error: {
      title: 'Erro ao carregar o total ganho',
      whatFailed: 'O que falhou:',
      howToRecover: 'Como recuperar:',
    },
  },
  layout: {
    sidebar: {
      yourReferrals: 'Seus indicados',
      inviteAndEarn: 'Convide e ganhe',
    },
    header: {
      requestCard: 'Peça seu cartão grátis',
      toggleMenu: 'Alternar menu',
    },
  },
  errors: {
    api: {
      '400': {
        errorType: '400 - Bad Request',
        whatFailed: 'Os dados enviados não são válidos ou estão mal formatados.',
        howToRecover: 'Verifique os dados e tente novamente. Se o problema persistir, entre em contato com o suporte.',
      },
      '401': {
        errorType: '401 - Unauthorized',
        whatFailed: 'Você não tem permissão para acessar este recurso.',
        howToRecover: 'Faça login novamente ou verifique suas credenciais.',
      },
      '403': {
        errorType: '403 - Forbidden',
        whatFailed: 'Você não tem permissão para realizar esta ação.',
        howToRecover: 'Entre em contato com o administrador se acredita que deveria ter acesso.',
      },
      '404': {
        errorType: '404 - Not Found',
        whatFailed: 'O {context} que você procura não existe ou foi excluído.',
        howToRecover: 'Verifique se a URL está correta ou tente buscar outro recurso.',
      },
      '500': {
        errorType: '500 - Internal Server Error',
        whatFailed: 'O servidor encontrou um erro interno e não pôde completar a solicitação.',
        howToRecover: 'O sistema tentará se recuperar automaticamente. Se o problema persistir, entre em contato com o suporte.',
      },
      '502': {
        errorType: '502 - Bad Gateway',
        whatFailed: 'O servidor não está respondendo corretamente.',
        howToRecover: 'O sistema tentará reconectar automaticamente. Aguarde alguns momentos.',
      },
      '503': {
        errorType: '503 - Service Unavailable',
        whatFailed: 'O serviço está temporariamente fora de linha para manutenção.',
        howToRecover: 'O sistema tentará reconectar automaticamente. Tente novamente em alguns minutos.',
      },
      default: {
        errorType: '{code} - Erro',
        whatFailed: 'Ocorreu um erro ao processar sua solicitação.',
        howToRecover: 'O sistema tentará se recuperar automaticamente. Se o problema persistir, entre em contato com o suporte.',
      },
    },
    network: {
      errorType: 'Erro de Rede',
      whatFailed: 'Não foi possível conectar ao servidor. Verifique sua conexão com a internet.',
      howToRecover: 'Verifique sua conexão com a internet e o sistema tentará reconectar automaticamente.',
    },
    unknown: {
      errorType: 'Erro Desconhecido',
      whatFailed: 'Ocorreu um erro inesperado.',
      howToRecover: 'O sistema tentará se recuperar automaticamente. Se o problema persistir, recarregue a página.',
    },
  },
  validation: {
    nameRequired: 'O nome é obrigatório',
    emailInvalid: 'O email deve ser válido',
    phoneRequired: 'O telefone é obrigatório',
  },
} as const;

