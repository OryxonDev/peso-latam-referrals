import { NetworkError, ApiError } from '@/lib/api/client';

interface ErrorInfo {
  errorType: string;
  whatFailed: string;
  howToRecover: string;
}

export function getErrorInfo(error: unknown, context: string): ErrorInfo {
  if (error instanceof ApiError) {
    const statusMessages: Record<number, { errorType: string; whatFailed: string; howToRecover: string }> = {
      400: {
        errorType: '400 - Bad Request',
        whatFailed: 'Los datos enviados no son válidos o están mal formateados.',
        howToRecover: 'Verifica los datos e intenta nuevamente. Si el problema persiste, contacta al soporte.',
      },
      401: {
        errorType: '401 - Unauthorized',
        whatFailed: 'No tienes permisos para acceder a este recurso.',
        howToRecover: 'Inicia sesión nuevamente o verifica tus credenciales.',
      },
      403: {
        errorType: '403 - Forbidden',
        whatFailed: 'No tienes permisos para realizar esta acción.',
        howToRecover: 'Contacta al administrador si crees que deberías tener acceso.',
      },
      404: {
        errorType: '404 - Not Found',
        whatFailed: `El ${context} que buscas no existe o fue eliminado.`,
        howToRecover: 'Verifica que la URL sea correcta o intenta buscar otro recurso.',
      },
      500: {
        errorType: '500 - Internal Server Error',
        whatFailed: 'El servidor encontró un error interno y no pudo completar la solicitud.',
        howToRecover: 'El sistema intentará recuperarse automáticamente. Si el problema persiste, contacta al soporte.',
      },
      502: {
        errorType: '502 - Bad Gateway',
        whatFailed: 'El servidor no está respondiendo correctamente.',
        howToRecover: 'El sistema intentará reconectarse automáticamente. Espera unos momentos.',
      },
      503: {
        errorType: '503 - Service Unavailable',
        whatFailed: 'El servicio está temporalmente fuera de línea por mantenimiento.',
        howToRecover: 'El sistema intentará reconectarse automáticamente. Vuelve a intentar en unos minutos.',
      },
    };

    const errorInfo = statusMessages[error.statusCode];
    if (errorInfo) {
      return errorInfo;
    }

    return {
      errorType: `${error.statusCode} - Error`,
      whatFailed: error.message || 'Ocurrió un error al procesar tu solicitud.',
      howToRecover: 'El sistema intentará recuperarse automáticamente. Si el problema persiste, contacta al soporte.',
    };
  }

  if (error instanceof NetworkError) {
    return {
      errorType: 'Network Error',
      whatFailed: 'No se pudo conectar con el servidor. Verifica tu conexión a internet.',
      howToRecover: 'Verifica tu conexión a internet y el sistema intentará reconectarse automáticamente.',
    };
  }

  return {
    errorType: 'Unknown Error',
    whatFailed: error instanceof Error ? error.message : 'Ocurrió un error inesperado.',
    howToRecover: 'El sistema intentará recuperarse automáticamente. Si el problema persiste, recarga la página.',
  };
}

