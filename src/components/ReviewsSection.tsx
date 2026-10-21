import { motion } from 'motion/react';
import { Star } from 'lucide-react';

export function ReviewsSection() {
  const reviews = [
    {
      quote: "The first cleanser that doesn't leave my rosacea angry. I've finished three bottles.",
      author: "Hannah",
      skinType: "sensitive skin",
      product: "Clay Cleanser",
    },
    {
      quote: "I replaced a shelf of products with four of these. My bathroom looks better too.",
      author: "Jamal",
      skinType: "combination skin",
      product: "Complete Routine",
    },
    {
      quote: "The barrier cream got me through a Yorkshire winter. Nothing else has.",
      author: "Priya",
      skinType: "dry skin",
      product: "Barrier Cream",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-[var(--background)] border-t border-[var(--border)]">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-8">
        
        <div className="mb-14 md:mb-18">
          <span className="font-label text-[11px] sm:text-[12px] tracking-[0.14em] text-[var(--muted-foreground)] block mb-3">
            FROM PEOPLE WHO USE IT
          </span>
          <h2 className="font-serif text-[32px] sm:text-[44px] text-[var(--foreground)]">
            Quiet results, tested by real routines.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
          {reviews.map((rev, index) => (
            <motion.div
              key={rev.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col justify-between p-8 rounded-2xl bg-[var(--card)]/25 border border-[var(--border)]/80 hover:border-[var(--border)] transition-colors"
            >
              <div>
                {/* 5 Small Stars */}
                <div className="flex items-center space-x-1 mb-6 text-[var(--primary)]" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>

                {/* Quote */}
                <p className="font-serif text-[22px] sm:text-[24px] text-[var(--foreground)] leading-[1.35] mb-8">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              {/* Author & Skin Type */}
              <div className="pt-4 border-t border-[var(--border)]/70 flex items-baseline justify-between">
                <span className="text-[15px] font-medium text-[var(--foreground)]">
                  {rev.author}
                </span>
                <span className="text-[14px] italic text-[var(--muted-foreground)]">
                  {rev.skinType}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
