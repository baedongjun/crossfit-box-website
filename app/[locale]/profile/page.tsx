'use client';
import { useTranslations } from 'next-intl';

export default function ProfilePage() {
  const t = useTranslations('profile');
  
  return (
    <div>
      <h1>{t('title')}</h1>
      {/* 나머지 컴포넌트 내용 */}
    </div>
  );
} 