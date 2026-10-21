import { useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  size: string;
  price: string;
  numericPrice: number;
  image: string;
  alt: string;
  details: string;
  keyIngredients: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: 'clay-cleanser',
    name: 'Clay Cleanser',
    tagline: 'A pink clay gel that lifts the day without stripping.',
    size: '150ml',
    price: 'Rs. 4,500',
    numericPrice: 4500,
    image: '/images/product-cleanser.jpg',
    alt: 'Clay Cleanser 150ml amber glass pump bottle',
    details: 'Formulated with French pink kaolin and botanical squalane. Transforms into a velvety lather that dissolves impurities, makeup, and SPF while preserving the skin barrier.',
    keyIngredients: ['Pink Kaolin Clay', 'Squalane', 'Oat Extract'],
  },
  {
    id: 'oat-milk-toner',
    name: 'Oat Milk Toner',
    tagline: 'Calms redness and preps skin in one step.',
    size: '150ml',
    price: 'Rs. 3,800',
    numericPrice: 3800,
    image: '/images/product-toner.jpg',
    alt: 'Oat Milk Toner 150ml frosted bottle with cream cap',
    details: 'A soothing emulsion crafted from organic Scottish colloidal oat. Balances pH immediately after cleansing and drenches sensitized skin in lightweight moisture.',
    keyIngredients: ['Colloidal Oat', 'Hyaluronic Acid', 'Rosewater'],
  },
  {
    id: 'daily-serum',
    name: 'Daily Serum',
    tagline: 'Niacinamide and squalane, light enough for mornings.',
    size: '30ml',
    price: 'Rs. 6,800',
    numericPrice: 6800,
    image: '/images/product-serum.jpg',
    alt: 'Daily Serum 30ml amber dropper bottle',
    details: 'A weightless water-gel serum uniting 5% niacinamide with olive squalane. Refines skin texture and minimizes moisture loss under daily environmental stress.',
    keyIngredients: ['Niacinamide 5%', 'Olive Squalane', 'Beta-Glucan'],
  },
  {
    id: 'barrier-cream',
    name: 'Barrier Cream',
    tagline: 'A rich, unscented moisturiser for dry and reactive skin.',
    size: '50ml',
    price: 'Rs. 5,900',
    numericPrice: 5900,
    image: '/images/product-cream.jpg',
    alt: 'Barrier Cream 50ml amber glass jar with cream lid',
    details: 'An ultra-restorative lipid cushion packed with ceramides and calming oat lipids. Shields delicate skin against wind, harsh winters, and trans-epidermal moisture loss.',
    keyIngredients: ['Ceramide Complex', 'Oat Lipids', 'Shea Butter'],
  },
  {
    id: 'night-oil',
    name: 'Night Oil',
    tagline: 'Rosehip and camellia, pressed cold, used sparingly.',
    size: '30ml',
    price: 'Rs. 6,400',
    numericPrice: 6400,
    image: '/images/product-oil.jpg',
    alt: 'Night Oil 30ml amber dropper bottle with pipette',
    details: 'Virgin cold-pressed Chilean rosehip seed oil married with wild camellia. Rich in essential fatty acids and natural provitamin A to support restorative overnight cell renewal.',
    keyIngredients: ['Chilean Rosehip', 'Camellia Seed Oil', 'Vitamin E'],
  },
];

interface ProductsSectionProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export function ProductsSection({ onSelectProduct, onAddToCart }: ProductsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="products" className="py-24 md:py-32 bg-[var(--background)]">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16">
          <div>
            <span className="font-label text-[11px] sm:text-[12px] tracking-[0.14em] text-[var(--muted-foreground)] block mb-3">
              THE FORMULATIONS
            </span>
            <h2 className="font-display-h2 text-[var(--foreground)]">
              The <span className="font-serif italic font-normal text-[var(--primary)]">whole</span> range.
            </h2>
          </div>

          {/* Scroll Nav buttons (Desktop/Tablet) */}
          <div className="hidden sm:flex items-center space-x-3 mt-6 md:mt-0">
            <button
              type="button"
              onClick={() => scroll('left')}
              className="w-11 h-11 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors cursor-pointer"
              aria-label="Previous products"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              className="w-11 h-11 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors cursor-pointer"
              aria-label="Next products"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Product Carousel:
            Mobile: shows 1.3 tiles with snap scroll
            Tablet: shows 2.5 tiles
            Desktop: shows all 5 or scrolls seamlessly */}
        <div 
          ref={scrollRef}
          className="flex space-x-5 md:space-x-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-6 -mx-6 px-6 sm:-mx-8 sm:px-8"
        >
          {PRODUCTS.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="shrink-0 w-[78vw] sm:w-[38vw] md:w-[280px] lg:w-[calc(20%-20px)] snap-start flex flex-col group cursor-pointer"
              onClick={() => onSelectProduct(product)}
            >
              {/* Product Tile Container (4:5 ratio on --card background) */}
              <div className="relative aspect-[4/5] bg-[var(--card)] rounded-2xl overflow-hidden mb-5 p-4 flex items-center justify-center transition-colors">
                <img
                  src={product.image}
                  alt={product.alt}
                  className="w-full h-full object-cover object-center rounded-xl transition-transform duration-[800ms] ease-out group-hover:scale-[1.04]"
                  loading="lazy"
                />

                {/* Quick Add Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product);
                  }}
                  className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-[var(--background)]/90 backdrop-blur-xs text-[var(--foreground)] flex items-center justify-center shadow-md opacity-90 group-hover:opacity-100 hover:bg-[var(--primary)] hover:text-white transition-all duration-300"
                  aria-label={`Add ${product.name} to bag`}
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Product Info */}
              <div className="flex flex-col grow">
                <div className="flex items-baseline justify-between mb-1.5">
                  <h3 className="font-serif text-[22px] sm:text-[24px] text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                    {product.name}
                  </h3>
                  <span className="font-label text-[12px] tracking-[0.12em] text-[var(--foreground)] font-medium">
                    {product.price}
                  </span>
                </div>

                <p className="text-[14px] text-[var(--muted-foreground)] leading-[1.6] font-light mb-3 line-clamp-2">
                  {product.tagline}
                </p>

                <div className="mt-auto flex items-center justify-between pt-2 border-t border-[var(--border)]/60">
                  <span className="font-label text-[11px] tracking-[0.12em] text-[var(--muted-foreground)]">
                    {product.size}
                  </span>
                  <span className="font-label text-[11px] tracking-[0.12em] text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity">
                    View &rarr;
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
