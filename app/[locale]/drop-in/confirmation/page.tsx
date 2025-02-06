'use client';
import { useTranslations } from 'next-intl';

export default function DropInConfirmationPage() {
  const t = useTranslations('dropIn');
  
  return (
    <div>
      <h1>{t('confirmation.title')}</h1>
      {/* 나머지 컴포넌트 내용 */}
    </div>
  );
} 