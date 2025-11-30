'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Referral } from '@/features/referrals/types/referral.types';
import { formatCurrency } from '@/lib/utils/formatCurrency';
import { PRICE_PER_REFERRAL } from '@/features/referrals/consts/referralConsts';

interface ReferralCardProps {
  referral: Referral;
}

export function ReferralCard({ referral }: ReferralCardProps) {
  return (
    <Link href={`/referrals/${referral.id}`}>
      <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border cursor-pointer ${
          referral.state
            ? 'border-2 border-[#B1D090]'
            : 'border-gray-200'
          }`}
        >
      <div className="flex items-start gap-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={referral.avatar}
            alt={referral.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0 [&>p]:truncate [&>p]:text-sm [&>p]:text-gray-600">
          <h3 className="text-lg font-semibold text-[#082422] truncate">
            {referral.name}
          </h3>
          <p className="font-bold mb-1">{referral.user}</p>
          <p className="mb-1">{referral.email}</p>
          <p className="mb-4">{referral.phone}</p>
          <div className="flex justify-end">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                referral.state
                  ? 'bg-[#B1D090] text-gray-700'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {referral.state ? `Confirmado + ${formatCurrency(PRICE_PER_REFERRAL)}` : 'Invitado'}
            </span>
          </div>
        </div>
      </div>
      </div>
    </Link>
  );
}

