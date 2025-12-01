'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils/formatCurrency';
import { useGetReferrals } from '@/features/referrals/hooks/useGetReferrals';
import { useDeleteReferral } from '@/features/referrals/hooks/useDeleteReferral';
import { ReferralProfileLoading } from '@/features/referrals/components/ReferralProfile/ReferralProfileLoading';
import { ReferralProfileError } from '@/features/referrals/components/ReferralProfile/ReferralProfileError';
import { DeleteReferralConfirm } from '@/features/referrals/components/ReferralProfile/DeleteReferralConfirm';
import { PRICE_PER_REFERRAL } from '@/features/referrals/consts/referralConsts';

interface ReferralProfileProps {
  id: string;
}

export function ReferralProfile({ id }: ReferralProfileProps) {
  const { referralById } = useGetReferrals();
  const { data: referral, isLoading, isError, error, refetch } = referralById(id);
  const { mutate: deleteReferral, isPending: isDeleting } = useDeleteReferral();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    setShowConfirm(true);
  };

  if (isLoading) {
    return <ReferralProfileLoading />;
  }

  if (isError) {
    return <ReferralProfileError error={error} refetch={refetch} />;
  }

  if (!referral) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-600 mb-4">Referido no encontrado</p>
        <Link
          href="/"
          className="text-primary hover:underline"
        >
          Volver
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-8 relative">
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="absolute top-4 right-4 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Eliminar referido"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>

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
              <h1 className="text-3xl font-bold text-primary mb-2">
                {referral.name}
              </h1>
              <p className="text-lg text-gray-600 mb-4">@{referral.user}</p>
              <div className="flex items-center gap-2 mb-4">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    referral.state
                      ? 'bg-confirmed text-gray-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {referral.state ? `Confirmado + ${formatCurrency(PRICE_PER_REFERRAL)}` : 'Invitado'}
                </span>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-1">
                  Email
                </h3>
                <p className="text-primary">{referral.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-1">
                  Teléfono
                </h3>
                <p className="text-primary">{referral.phone}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-1">
                  Fecha de registro
                </h3>
                <p className="text-primary">
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
                  <p className="text-primary">{referral.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <DeleteReferralConfirm
        isOpen={showConfirm}
        referralName={referral.name}
        isDeleting={isDeleting}
        onConfirm={() => deleteReferral(id)}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
}

