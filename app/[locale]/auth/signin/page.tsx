'use client';
import { useTranslations } from 'next-intl';

export default function SignInPage() {
  const t = useTranslations('auth');
  
  return (
    <div>
      <h1>{t('signIn.title')}</h1>
      {/* 나머지 컴포넌트 내용 */}
    </div>
  );
} 