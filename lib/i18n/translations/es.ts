export const es = {
  common: {
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    retry: 'Reintentar',
    back: 'Volver',
    delete: 'Eliminar',
    deleting: 'Eliminando...',
    copy: 'Copiar',
    copied: 'Copiado!',
    previous: 'Anterior',
    next: 'Siguiente',
    page: 'Página',
    of: 'de',
    user: 'Usuario',
    email: 'Email',
    phone: 'Teléfono',
    name: 'Nombre',
    description: 'Descripción',
    invited: 'Invitado',
    confirmed: 'Confirmado',
    share: 'Compartir',
    shareOn: 'Compartir en',
  },
  home: {
    title: 'Tus referidos',
    subtitle: 'Estos son todos tus referidos que has invitado',
  },
  referrals: {
    list: {
      empty: {
        title: 'No hay referidos disponibles',
        message: 'Comienza a invitar personas y gana {amount} por cada referido confirmado',
        inviteFirst: 'Invitar primer referido',
      },
      error: {
        title: 'Error al cargar los referidos',
        whatFailed: 'Qué falló:',
        howToRecover: 'Cómo recuperarse:',
      },
      pagination: {
        page: 'Página {current} de {total}',
      },
    },
    card: {
      confirmedWithAmount: 'Confirmado + {amount}',
    },
    profile: {
      title: 'Referido',
      subtitle: 'Información detallada del referido',
      notFound: 'Referido no encontrado',
      registrationDate: 'Fecha de registro',
      deleteAriaLabel: 'Eliminar referido',
    },
    invite: {
      title: 'Invita y gana',
      subtitle: 'Completa el formulario para enviar tu invitación a un amigo y gana {amount}.',
      shareLinkTitle: 'O comporparte tu link',
      form: {
        nameLabel: 'Nombre',
        emailLabel: 'Email',
        phoneLabel: 'Teléfono',
        submit: 'Invitar',
        submitting: 'Invitando...',
      },
      deleteConfirm: {
        title: '¿Eliminar referido?',
        message: 'Esta acción no se puede deshacer. Se eliminará permanentemente el referido {name}.',
      },
    },
    profileError: {
      title: 'Error al cargar el referido',
      whatFailed: 'Qué falló:',
      howToRecover: 'Cómo recuperarse:',
    },
  },
  totalEarned: {
    title: 'Total ganado',
    confirmed: 'confirmados',
    invited: 'invitados',
    message: 'Puedes invitar a más personas para ganar más dinero. Por cada referido confirmado, ganas {amount}.',
    inviteButton: 'Invitar',
    error: {
      title: 'Error al cargar el total ganado',
      whatFailed: 'Qué falló:',
      howToRecover: 'Cómo recuperarse:',
    },
  },
  layout: {
    sidebar: {
      yourReferrals: 'Tus referidos',
      inviteAndEarn: 'Invita y gana',
    },
    header: {
      requestCard: 'Pide tu tarjeta gratis',
      toggleMenu: 'Toggle menu',
    },
  },
  errors: {
    api: {
      '400': {
        errorType: '400 - Bad Request',
        whatFailed: 'Los datos enviados no son válidos o están mal formateados.',
        howToRecover: 'Verifica los datos e intenta nuevamente. Si el problema persiste, contacta al soporte.',
      },
      '401': {
        errorType: '401 - Unauthorized',
        whatFailed: 'No tienes permisos para acceder a este recurso.',
        howToRecover: 'Inicia sesión nuevamente o verifica tus credenciales.',
      },
      '403': {
        errorType: '403 - Forbidden',
        whatFailed: 'No tienes permisos para realizar esta acción.',
        howToRecover: 'Contacta al administrador si crees que deberías tener acceso.',
      },
      '404': {
        errorType: '404 - Not Found',
        whatFailed: 'El {context} que buscas no existe o fue eliminado.',
        howToRecover: 'Verifica que la URL sea correcta o intenta buscar otro recurso.',
      },
      '500': {
        errorType: '500 - Internal Server Error',
        whatFailed: 'El servidor encontró un error interno y no pudo completar la solicitud.',
        howToRecover: 'El sistema intentará recuperarse automáticamente. Si el problema persiste, contacta al soporte.',
      },
      '502': {
        errorType: '502 - Bad Gateway',
        whatFailed: 'El servidor no está respondiendo correctamente.',
        howToRecover: 'El sistema intentará reconectarse automáticamente. Espera unos momentos.',
      },
      '503': {
        errorType: '503 - Service Unavailable',
        whatFailed: 'El servicio está temporalmente fuera de línea por mantenimiento.',
        howToRecover: 'El sistema intentará reconectarse automáticamente. Vuelve a intentar en unos minutos.',
      },
      default: {
        errorType: '{code} - Error',
        whatFailed: 'Ocurrió un error al procesar tu solicitud.',
        howToRecover: 'El sistema intentará recuperarse automáticamente. Si el problema persiste, contacta al soporte.',
      },
    },
    network: {
      errorType: 'Network Error',
      whatFailed: 'No se pudo conectar con el servidor. Verifica tu conexión a internet.',
      howToRecover: 'Verifica tu conexión a internet y el sistema intentará reconectarse automáticamente.',
    },
    unknown: {
      errorType: 'Unknown Error',
      whatFailed: 'Ocurrió un error inesperado.',
      howToRecover: 'El sistema intentará recuperarse automáticamente. Si el problema persiste, recarga la página.',
    },
  },
  validation: {
    nameRequired: 'El nombre es requerido',
    emailInvalid: 'El email debe ser válido',
    phoneRequired: 'El teléfono es requerido',
  },
} as const;

