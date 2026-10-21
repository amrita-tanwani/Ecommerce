import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export function JournalSection() {
  const articles = [
    {
      category: 'ROUTINE',
      title: 'Why we only make five products',
      date: 'May 2026',
      readTime: '4 min read',
      image: '/images/journal-routine.jpg',
      alt: 'Five amber skincare bottles lined neatly on stone ledge',
      excerpt: 'The beauty industry thrives on planned dissatisfaction. Here is the reason we formulated a tight circle of five essentials, and why your bathroom needs nothing else.',
    },
    {
      category: 'INGREDIENTS',
      title: 'Clay, explained without the marketing',
      date: 'April 2026',
      readTime: '6 min read',
      image: '/images/journal-clay.jpg',
      alt: 'Fine mounds of pink French kaolin clay and ground oats on stoneware plate',
      excerpt: 'Not all clay is drying. How Brittany pink kaolin preserves natural lipid membranes while absorbing cellular debris.',
    },
  ];

  return (
    <section id="journal" className="py-24 md:py-32 bg-[var(--background)] border-t border-[var(--border)]">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 md:mb-18">
          <div>
            <span className="font-label text-[11px] sm:text-[12px] tracking-[0.14em] text-[var(--muted-foreground)] block mb-3">
              NOTES & ESSAYS
            </span>
            <h2 className="font-serif text-[32px] sm:text-[44px] text-[var(--foreground)]">
              The Journal
            </h2>
          </div>
          <span className="font-label text-[12px] tracking-[0.14em] text-[var(--primary)] mt-3 sm:mt-0 font-medium">
            Read all entries &rarr;
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          {articles.map((art, index) => (
            <motion.article
              key={art.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 bg-[var(--card)]">
                <img
                  src={art.image}
                  alt={art.alt}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[var(--background)]/90 backdrop-blur-xs flex items-center justify-center text-[var(--foreground)] opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight size={17} />
                </div>
              </div>

              <div className="flex items-center space-x-3 mb-3">
                <span className="font-label text-[11px] tracking-[0.14em] text-[var(--primary)] font-semibold">
                  {art.category}
                </span>
                <span className="text-[var(--border)]">·</span>
                <span className="font-label text-[11px] tracking-[0.12em] text-[var(--muted-foreground)]">
                  {art.readTime}
                </span>
              </div>

              <h3 className="font-serif text-[26px] sm:text-[32px] text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors leading-[1.2] mb-3">
                {art.title}
              </h3>

              <p className="text-[15px] sm:text-[16px] text-[var(--muted-foreground)] leading-[1.7] font-light">
                {art.excerpt}
              </p>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
