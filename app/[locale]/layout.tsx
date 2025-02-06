import {notFound} from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Providers from '../components/Providers';

export default async function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <Providers locale={locale} messages={messages}>
      <Header />
      <main className="container mx-auto px-4 py-8">{children}</main>
      <Footer />
    </Providers>
  );
} 