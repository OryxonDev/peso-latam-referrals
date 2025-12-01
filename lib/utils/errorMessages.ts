import { NetworkError, ApiError } from '@/lib/api/client';
import { getTranslation } from '@/lib/i18n/getTranslation';

interface ErrorInfo {
  errorType: string;
  whatFailed: string;
  howToRecover: string;
}

export function getErrorInfo(error: unknown, context: string): ErrorInfo {
  if (error instanceof ApiError) {
    const statusMessages: Record<number, { errorType: string; whatFailed: string; howToRecover: string }> = {
      400: {
        errorType: getTranslation('errors.api.400.errorType'),
        whatFailed: getTranslation('errors.api.400.whatFailed'),
        howToRecover: getTranslation('errors.api.400.howToRecover'),
      },
      401: {
        errorType: getTranslation('errors.api.401.errorType'),
        whatFailed: getTranslation('errors.api.401.whatFailed'),
        howToRecover: getTranslation('errors.api.401.howToRecover'),
      },
      403: {
        errorType: getTranslation('errors.api.403.errorType'),
        whatFailed: getTranslation('errors.api.403.whatFailed'),
        howToRecover: getTranslation('errors.api.403.howToRecover'),
      },
      404: {
        errorType: getTranslation('errors.api.404.errorType'),
        whatFailed: getTranslation('errors.api.404.whatFailed', 'es', { context }),
        howToRecover: getTranslation('errors.api.404.howToRecover'),
      },
      500: {
        errorType: getTranslation('errors.api.500.errorType'),
        whatFailed: getTranslation('errors.api.500.whatFailed'),
        howToRecover: getTranslation('errors.api.500.howToRecover'),
      },
      502: {
        errorType: getTranslation('errors.api.502.errorType'),
        whatFailed: getTranslation('errors.api.502.whatFailed'),
        howToRecover: getTranslation('errors.api.502.howToRecover'),
      },
      503: {
        errorType: getTranslation('errors.api.503.errorType'),
        whatFailed: getTranslation('errors.api.503.whatFailed'),
        howToRecover: getTranslation('errors.api.503.howToRecover'),
      },
    };

    const errorInfo = statusMessages[error.statusCode];
    if (errorInfo) {
      return errorInfo;
    }

    return {
      errorType: getTranslation('errors.api.default.errorType', 'es', { code: error.statusCode }),
      whatFailed: error.message || getTranslation('errors.api.default.whatFailed'),
      howToRecover: getTranslation('errors.api.default.howToRecover'),
    };
  }

  if (error instanceof NetworkError) {
    return {
      errorType: getTranslation('errors.network.errorType'),
      whatFailed: getTranslation('errors.network.whatFailed'),
      howToRecover: getTranslation('errors.network.howToRecover'),
    };
  }

  return {
    errorType: getTranslation('errors.unknown.errorType'),
    whatFailed: error instanceof Error ? error.message : getTranslation('errors.unknown.whatFailed'),
    howToRecover: getTranslation('errors.unknown.howToRecover'),
  };
}

