'use client';

import { useReferrals } from '../hooks/useReferrals';
import { ReferralCard } from './ReferralCard';
import { useReferralStore } from '../store/referralStore';
import { NetworkError, ApiError } from '@/lib/api/client';

export function ReferralList() {
  const { data, isLoading, error } = useReferrals();
  const { currentPage, setCurrentPage } = useReferralStore();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-md p-6 animate-pulse"
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-200"></div>
              <div className="flex-1">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
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

  if (!data || data.data.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No hay referidos disponibles</p>
      </div>
    );
  }

  const totalPages = Math.ceil(data.total / 9);
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {data.data.map((referral) => (
          <ReferralCard key={referral.id} referral={referral} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={!hasPrevPage}
            className="px-4 py-2 bg-[#082422] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#082422]/90 transition-colors"
          >
            Anterior
          </button>
          <span className="text-gray-600">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={!hasNextPage}
            className="px-4 py-2 bg-[#082422] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#082422]/90 transition-colors"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}

