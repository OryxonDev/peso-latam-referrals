'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateReferral } from '@/features/referrals/hooks/useCreateReferral';
import { createReferralSchema, type CreateReferralFormData } from '@/features/referrals/schemas/referral.schema';
import { useRouter } from 'next/navigation';
import { NetworkError, ApiError } from '@/lib/api/client';

export function ReferralForm() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { mutate, isPending } = useCreateReferral();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateReferralFormData>({
    resolver: zodResolver(createReferralSchema),
  });

  const onSubmit = (data: CreateReferralFormData) => {
    setSubmitError(null);
    mutate(data, {
      onSuccess: () => {
        router.push('/');
      },
      onError: (error) => {
        const errorType =
          error instanceof NetworkError
            ? 'NetworkError'
            : error instanceof ApiError
              ? 'ApiError'
              : 'UnknownError';
        const errorMessage =
          error instanceof Error ? error.message : 'An unknown error occurred';
        setSubmitError(`${errorType}: ${errorMessage}`);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-[#082422] mb-2"
        >
          Nombre
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffdb3a] focus:border-transparent"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-[#082422] mb-2"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffdb3a] focus:border-transparent"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-[#082422] mb-2"
        >
          Teléfono
        </label>
        <input
          id="phone"
          type="tel"
          {...register('phone')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffdb3a] focus:border-transparent"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-600">{submitError}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full px-6 py-3 bg-[#ffdb3a] text-gray-700 rounded-lg font-medium hover:bg-[#082422]/90 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? 'Invitando...' : 'Invitar'}
      </button>
    </form>
  );
}

