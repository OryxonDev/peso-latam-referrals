'use client';

import { useTranslations } from '@/lib/i18n/useTranslations';

interface DeleteReferralConfirmProps {
  isOpen: boolean;
  referralName: string;
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteReferralConfirm({
  isOpen,
  referralName,
  isDeleting,
  onConfirm,
  onCancel,
}: DeleteReferralConfirmProps) {
  const { t } = useTranslations();
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10 rounded-lg">
      <div className="bg-white rounded-lg p-6 max-w-md mx-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {t('referrals.invite.deleteConfirm.title')}
        </h3>
        <p className="text-gray-600 mb-4">
          {t('referrals.invite.deleteConfirm.message', { name: referralName })}
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            disabled={isDeleting}
          >
            {t('common.cancel')}
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? t('common.deleting') : t('common.delete')}
          </button>
        </div>
      </div>
    </div>
  );
}

