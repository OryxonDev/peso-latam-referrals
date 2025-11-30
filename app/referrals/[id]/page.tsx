import { ReferralProfile } from '@/features/referrals/components/ReferralProfile';
import Link from 'next/link';

interface ReferralPageProps {
  params: Promise<{ id: string }>;
}

export default async function ReferralPage({ params }: ReferralPageProps) {
  const { id } = await params;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
        <h1 className="text-3xl font-bold text-[#082422] mb-2">
          Referido
        </h1>
        <p className="text-gray-600">
          Información detallada del referido
        </p>
        </div>

        <Link
            href="/"
            className="inline-block px-6 py-2 bg-[#082422] text-white rounded-lg hover:bg-[#082422]/90 transition-colors"
          >
            Volver al listado
          </Link>
      </div>
      <ReferralProfile id={id} />
    </div>
  );
}

