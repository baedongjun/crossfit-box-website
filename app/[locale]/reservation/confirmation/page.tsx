'use client';
import { useTranslations } from 'next-intl';

export default function ReservationConfirmationPage() {
  const t = useTranslations('reservation');
  
  return (
    <div>
      <h1>{t('confirmation.title')}</h1>
      {/* 나머지 컴포넌트 내용 */}
    </div>
  );
} 