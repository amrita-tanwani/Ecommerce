import { Hero } from '../components/Hero';
import { MarqueeStrip } from '../components/MarqueeStrip';
import { ProductsSection, type Product } from '../components/ProductsSection';
import { IngredientsSection } from '../components/IngredientsSection';
import { BeforeYouBuy } from '../components/BeforeYouBuy';
import { FullBleedImage } from '../components/FullBleedImage';
import { ReviewsSection } from '../components/ReviewsSection';
import { JournalSection } from '../components/JournalSection';
import { Newsletter } from '../components/Newsletter';

interface HomePageProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export function HomePage({ onSelectProduct, onAddToCart }: HomePageProps) {
  return (
    <>
      {/* 3. Hero Section with Morphing Clay Blob and Reveal Typography */}
      <Hero />

      {/* 4. Marquee Strip */}
      <MarqueeStrip />

      {/* 5. The Five Products Carousel */}
      <ProductsSection
        onSelectProduct={onSelectProduct}
        onAddToCart={onAddToCart}
      />

      {/* 6. Ingredients Section (Effect 1: Sticky Product, Scrolling Ingredients) */}
      <IngredientsSection />

      {/* 7. Before You Buy (3 Columns) */}
      <BeforeYouBuy />

      {/* 8. Full-Bleed Tactile Texture Photograph */}
      <FullBleedImage />

      {/* 9. Verified Reviews */}
      <ReviewsSection />

      {/* 10. The Journal Editorial Cards */}
      <JournalSection />

      {/* 11. Monthly Newsletter Terracotta Panel */}
      <Newsletter />
    </>
  );
}
