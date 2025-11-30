interface TotalEarnedBannerErrorProps {
  error: unknown;
}

export function TotalEarnedBannerError({ error }: TotalEarnedBannerErrorProps) {
  const errorMessage =
    error instanceof Error ? error.message : 'An unknown error occurred';
  const errorName =
    error instanceof Error ? error.name : 'UnknownError';

  return (
    <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-red-800 mb-2">
        Error al cargar los referidos
      </h3>
      <p className="text-sm text-red-600">{errorMessage}</p>
      <p className="text-sm text-red-600">{errorName}</p>
    </div>
  );
}

