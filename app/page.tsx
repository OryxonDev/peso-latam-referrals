import { ReferralList } from '@/features/referrals/components/ReferralList/ReferralList';
import { TotalEarnedBanner } from '@/features/referrals/components/TotalEarnedBanner/TotalEarnedBanner';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">
          Tus referidos
        </h1>
        <p className="text-gray-600">
          Estos son todos tus referidos que has invitado
        </p>
      </div>
      <TotalEarnedBanner />
      <ReferralList />
    </div>
  );
}
