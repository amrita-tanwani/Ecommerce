import { motion } from 'motion/react';

interface Ingredient {
  id: string;
  name: string;
  origin: string;
  description: string;
  benefit: string;
}

export function IngredientsSection() {
  const ingredients: Ingredient[] = [
    {
      id: 'pink-kaolin',
      name: 'Pink kaolin',
      origin: 'From Brittany.',
      description: 'The gentlest clay there is. It absorbs excess oil without drawing moisture out of the skin.',
      benefit: 'Purifies & softens',
    },
    {
      id: 'colloidal-oat',
      name: 'Colloidal oat',
      origin: 'From Scottish farms.',
      description: 'Soothes itching and redness, and forms a light protective film that helps skin hold water.',
      benefit: 'Calms redness & retains water',
    },
    {
      id: 'squalane',
      name: 'Squalane',
      origin: 'From olives.',
      description: 'Mimics the oils skin makes itself, so it sinks in without residue.',
      benefit: 'Bio-identical lipid barrier',
    },
    {
      id: 'rosehip-oil',
      name: 'Rosehip oil',
      origin: 'From Chile, cold-pressed.',
      description: 'Rich in vitamin A and fatty acids. Brightens slowly, the honest way.',
      benefit: 'Restores tone & elasticity',
    },
  ];

  return (
    <section id="ingredients" className="py-24 md:py-32 bg-[var(--background)] border-t border-[var(--border)]">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-20 max-w-2xl">
          <span className="font-label text-[11px] sm:text-[12px] tracking-[0.14em] text-[var(--muted-foreground)] block mb-3">
            SOURCING & SCIENCE
          </span>
          <h2 className="font-display-h2 text-[var(--foreground)]">
            Four things <span className="font-serif italic font-normal text-[var(--primary)]">doing</span> the work.
          </h2>
        </div>

        {/* Two-column layout: Sticky product image left, 4 scrolling ingredient blocks right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 relative items-start">
          
          {/* Left Column: Sticky Product Image (Desktop / Tablet) */}
          <div className="hidden md:block md:col-span-5 lg:col-span-5 sticky top-[96px] h-[calc(100vh-128px)]">
            <div className="w-full h-full rounded-2xl overflow-hidden bg-[var(--card)] p-4 flex flex-col justify-between border border-[var(--border)]/60 shadow-xs">
              <div className="relative w-full h-[85%] rounded-xl overflow-hidden">
                <img
                  src="/images/ingredients-sticky.jpg"
                  alt="Raw pink kaolin stones, botanical oils and apothecary bottle"
                  className="w-full h-full object-cover object-center transform hover:scale-[1.02] transition-transform duration-700"
                />
              </div>
              <div className="pt-3 px-2 flex items-center justify-between">
                <span className="font-label text-[11px] tracking-[0.12em] text-[var(--muted-foreground)]">
                  RAW EXTRACTS
                </span>
                <span className="font-label text-[11px] tracking-[0.12em] text-[var(--foreground)]">
                  Peak District, UK
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Four Ingredient Blocks */}
          <div className="md:col-span-7 lg:col-span-7 flex flex-col space-y-12 md:space-y-24 py-4 md:py-8">
            {ingredients.map((ingredient, index) => (
              <div key={ingredient.id} className="relative">
                
                {/* On mobile: show image above each ingredient block */}
                <div className="md:hidden w-full aspect-[16/10] rounded-xl overflow-hidden mb-6 bg-[var(--card)]">
                  <img
                    src="/images/ingredients-sticky.jpg"
                    alt="Raw botanical skincare ingredients"
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                </div>

                {/* Effect 1: As each block reaches the centre of the viewport, it goes from 30% to 100% opacity */}
                <motion.div
                  initial={{ opacity: 0.3 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ amount: 0.6 }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  className="p-8 sm:p-10 rounded-2xl bg-[var(--card)]/40 border border-[var(--border)] transition-all duration-300 hover:bg-[var(--card)]/70"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-label text-[11px] tracking-[0.14em] text-[var(--primary)] font-medium">
                      0{index + 1} · {ingredient.origin}
                    </span>
                    <span className="font-label text-[10px] tracking-[0.12em] text-[var(--muted-foreground)] border border-[var(--border)] px-2.5 py-1 rounded-full">
                      {ingredient.benefit}
                    </span>
                  </div>

                  <h3 className="font-serif italic font-normal text-[36px] sm:text-[46px] lg:text-[52px] leading-tight text-[var(--foreground)] mb-4">
                    {ingredient.name}
                  </h3>

                  <p className="text-[17px] sm:text-[19px] text-[var(--foreground)]/85 leading-[1.7] font-light max-w-xl">
                    {ingredient.description}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
