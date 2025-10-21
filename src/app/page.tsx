import Header from '@/components/header';
import HeroSlider from '@/components/hero-slider';
import CategoryBrowser from '@/components/category-browser';
import VipAd from '@/components/vip-ad';
import HomeFeatures from '@/components/home-features';
import HomeServices from '@/components/home-services';

export default function Home() {
  return (
    <>
      <Header />
      <main className="container px-4">
        <HeroSlider />
        <VipAd />
        <CategoryBrowser />
        <HomeFeatures />
        <HomeServices />
      </main>
    </>
  );
}
