'use client';

import { useErrorSimulationStore } from '@/lib/store/errorSimulationStore';
import { getErrorInfo } from '@/lib/utils/errorMessages';

interface ReferralProfileErrorProps {
  error: unknown;
  refetch?: () => void;
}

export function ReferralProfileError({ error, refetch }: ReferralProfileErrorProps) {
  const { reset } = useErrorSimulationStore();
  const errorInfo = getErrorInfo(error, 'referido');

  const handleRetry = () => {
    reset();
    if (refetch) {
      refetch();
    }
  };

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-red-800 mb-3">
        Error al cargar el referido
      </h3>
      <p className="text-md text-red-700 mb-2 font-semibold">
        {errorInfo.errorType}
      </p>
      <p className="text-sm text-red-700 mb-2">
        <span className="font-medium">Qué falló:</span> {errorInfo.whatFailed}
      </p>
      <p className="text-sm text-red-700 mb-4">
        <span className="font-medium">Cómo recuperarse:</span> {errorInfo.howToRecover}
      </p>
      {refetch && (
        <button
          onClick={handleRetry}
          className="px-4 py-2 bg-[#082422] text-white rounded-lg hover:bg-[#082422]/80 active:bg-[#ffdb3a] active:text-[#082422] transition-colors font-medium"
        >
          Reintentar
        </button>
      )}
    </div>
  );
}

