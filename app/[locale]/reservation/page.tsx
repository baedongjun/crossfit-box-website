import { useTranslations } from 'next-intl';

export default function ReservationPage() {
  const t = useTranslations('reservation');  // messages 파일에 reservation 섹션 필요
  
  return (
    <div>
      <h1>{t('title')}</h1>
      {/* 나머지 컴포넌트 내용 */}
    </div>
  );
} 