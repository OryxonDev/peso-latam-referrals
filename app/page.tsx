import { ReferralList } from '@/features/referrals/components/ReferralList';
import { TotalEarnedBanner } from '@/features/referrals/components/TotalEarnedBanner';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#082422] mb-2">
          Listado de Referidos
        </h1>
        <p className="text-gray-600">
          Gestiona y visualiza todos tus referidos en un solo lugar
        </p>
      </div>
      <TotalEarnedBanner />
      <ReferralList />
    </div>
  );
}
