import Header from '@/components/header';
import Footer from '@/components/footer';
import HeroSearch from '@/components/hero-search';
import CategoryBrowser from '@/components/category-browser';
import Listings from '@/components/listings';

export default function Home() {
  return (
    <>
      <Header />
      <HeroSearch />
      <main>
        <CategoryBrowser />
        <Listings />
      </main>
      <Footer />
    </>
  );
}
