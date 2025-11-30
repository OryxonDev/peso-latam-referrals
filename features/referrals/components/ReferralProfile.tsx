'use client';

import Image from 'next/image';
import Link from 'next/link';
import { NetworkError, ApiError } from '@/lib/api/client';
import { formatCurrency } from '@/lib/utils/formatCurrency';
import { useReferrals } from '../hooks/useReferrals';

interface ReferralProfileProps {
  id: string;
}

export function ReferralProfile({ id }: ReferralProfileProps) {
  const { referralById } = useReferrals();
  const { data: referral, isLoading, isError, error } = referralById(id);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 animate-pulse">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto md:mx-0"></div>
          <div className="flex-1 space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
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
          Error al cargar el referido
        </h3>
        <p className="text-sm text-red-600 mb-1">
          <span className="font-medium">Tipo:</span> {errorType}
        </p>
        <p className="text-sm text-red-600 mb-4">
          <span className="font-medium">Mensaje:</span> {errorMessage}
        </p>
        <Link
          href="/"
          className="text-sm text-red-600 hover:text-red-800 underline"
        >
          Volver al listado
        </Link>
      </div>
    );
  }

  if (!referral) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-600 mb-4">Referido no encontrado</p>
        <Link
          href="/"
          className="text-[#082422] hover:underline"
        >
          Volver al listado
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0">
          <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto md:mx-0">
            <Image
              src={referral.avatar}
              alt={referral.name}
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-[#082422] mb-2">
              {referral.name}
            </h1>
            <p className="text-lg text-gray-600 mb-4">@{referral.user}</p>
            <div className="flex items-center gap-2 mb-4">
              <span
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  referral.state
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {referral.state ? `Confirmado + ${formatCurrency(50)}` : 'Pendiente'}
              </span>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-1">
                Email
              </h3>
              <p className="text-[#082422]">{referral.email}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-1">
                Teléfono
              </h3>
              <p className="text-[#082422]">{referral.phone}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-1">
                Fecha de registro
              </h3>
              <p className="text-[#082422]">
                {new Date(referral.createdAt).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            {referral.description && (
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-1">
                  Descripción
                </h3>
                <p className="text-[#082422]">{referral.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

