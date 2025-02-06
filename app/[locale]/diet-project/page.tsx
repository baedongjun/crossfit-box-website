'use client';
import { useTranslations } from 'next-intl';

export default function DietProjectPage() {
  const t = useTranslations('dietProject');
  
  return (
    <div>
      <h1>{t('title')}</h1>
      {/* 나머지 컴포넌트 내용 */}
    </div>
  );
} 