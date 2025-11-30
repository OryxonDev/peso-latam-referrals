import { ReferralForm } from '@/features/referrals/components/ReferralInvite/ReferralForm';
import { ReferralLinkCard } from '@/features/referrals/components/ReferralInvite/ReferralLinkCard';
import { PRICE_PER_REFERRAL } from '@/features/referrals/consts/referralConsts';
import { formatCurrency } from '@/lib/utils/formatCurrency';

export default function AddReferralPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#082422] mb-2">
          Invita y gana
        </h1>
        <p className="text-gray-600">
          Completa el formulario para enviar tu invitación a un amigo y gana <span className="font-bold">{formatCurrency(PRICE_PER_REFERRAL)}</span>.
        </p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-8">
        <ReferralForm />
      </div>
      <div className="mt-10 mb-8">
        <h2 className="text-2xl font-bold text-[#082422] mb-2">
          O comporparte tu link
        </h2>
      </div>
      <div className="bg-white rounded-lg shadow-md p-8">
        <ReferralLinkCard />
      </div>
    </div>
  );
}

