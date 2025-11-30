import { NetworkError, ApiError } from '@/lib/api/client';

interface ReferralListErrorProps {
  error: unknown;
}

export function ReferralListError({ error }: ReferralListErrorProps) {
  const errorType =
    error instanceof NetworkError
      ? 'NetworkError'
      : error instanceof ApiError
        ? 'ApiError'
        : 'UnknownError';
  const errorMessage =
    error instanceof Error ? error.message : 'An unknown error occurred';

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-red-800 mb-2">
        Error al cargar los referidos
      </h3>
      <p className="text-sm text-red-600 mb-1">
        <span className="font-medium">Tipo:</span> {errorType}
      </p>
      <p className="text-sm text-red-600">
        <span className="font-medium">Mensaje:</span> {errorMessage}
      </p>
    </div>
  );
}

