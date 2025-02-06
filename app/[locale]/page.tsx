'use client';

import {useTranslations} from 'next-intl';
import VideoHero from '../components/VideoHero';

export default function HomePage() {
  const t = useTranslations('home');
  
  return (
    <div>
      <VideoHero />
      <h1>{t('welcome')}</h1>
      <p>{t('description')}</p>
      {/* 나머지 컴포넌트 내용 */}
    </div>
  );
} 