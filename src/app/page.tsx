import Header from '@/components/header';
import Hero from '@/components/hero';
import CategoryBrowser from '@/components/category-browser';
import VipAd from '@/components/vip-ad';

export default function Home() {
  return (
    <>
      <Header />
      <main className="container px-4">
        <Hero />
        <VipAd />
        <CategoryBrowser />
      </main>
    </>
  );
}
