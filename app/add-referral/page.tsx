import { ReferralForm } from '@/features/referrals/components/ReferralForm';

export default function AddReferralPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#082422] mb-2">
          Añadir Nuevo Referido
        </h1>
        <p className="text-gray-600">
          Completa el formulario para agregar un nuevo referido al sistema
        </p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-8">
        <ReferralForm />
      </div>
    </div>
  );
}

