import { motion } from 'motion/react';
import { ArrowLeft, Sparkles, Sprout, Recycle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AboutPage() {
  const pillars = [
    {
      icon: Sparkles,
      title: 'Restraint Over Hype',
      body: 'The beauty industry relies on constant dissatisfaction. New launches every week, 12-step routines that sensitise the barrier, and marketing that confuses activity with efficacy. We formulate five products and stop there.',
    },
    {
      icon: Sprout,
      title: 'Whole, Honest Actives',
      body: 'Our star ingredients are not synthetic marketing buzzwords. We work directly with family farms in Scotland for colloidal oat, certified organic growers in Brittany for pink kaolin, and cold-press Chilean wild rosehip without heat degradation.',
    },
    {
      icon: Recycle,
      title: 'Circularity by Design',
      body: 'Every Oda bottle is heavy amber apothecary glass crafted to last decades. Our refill system is closed-loop: return 4 empties in our prepaid mailer, and we clean, sterilise, and refill them, gifting you a product on us.',
    },
  ];

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-8">
        
        {/* Breadcrumb / Back button */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 font-label text-[11px] tracking-[0.14em] text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="max-w-3xl mb-14 md:mb-20">
          <span className="font-label text-[11px] sm:text-[12px] tracking-[0.16em] text-[var(--muted-foreground)] uppercase block mb-4">
            OUR PHILOSOPHY & WORKSHOP
          </span>
          <h1 className="font-display-h1 text-[var(--foreground)] mb-6">
            The story of <span className="font-serif italic font-normal text-[var(--primary)]">restraint</span>.
          </h1>
          <p className="text-[18px] sm:text-[20px] text-[var(--foreground)]/80 font-light leading-[1.7]">
            Oda was founded on a simple realization: when skin is overwhelmed by twenty synthetic ingredients twice a day, it reacts with inflammation. What it actually craves is fewer, better things.
          </p>
        </div>

        {/* Workshop Image Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full aspect-[16/9] max-h-[580px] rounded-3xl overflow-hidden bg-[var(--card)] mb-16 md:mb-24 shadow-sm relative"
        >
          <img
            src="/images/about-workshop.jpg"
            alt="Artisan apothecary workshop in the Derbyshire Peak District with amber bottles and ceramic bowls"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 bg-[var(--background)]/90 backdrop-blur-md px-5 py-3 rounded-xl border border-[var(--border)]/70">
            <span className="font-label text-[11px] tracking-[0.12em] text-[var(--foreground)]">
              The Oda Workshop · Hathersage, Derbyshire
            </span>
          </div>
        </motion.div>

        {/* Narrative Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20 md:mb-28">
          <div className="lg:col-span-5">
            <h2 className="font-serif text-[32px] sm:text-[40px] text-[var(--foreground)] leading-tight mb-4">
              Made in small batches where the moorland meets the stone.
            </h2>
            <p className="font-label text-[12px] tracking-[0.14em] text-[var(--primary)]">
              EST. 2024 · DERBYSHIRE
            </p>
          </div>
          <div className="lg:col-span-7 space-y-6 text-[16px] sm:text-[17px] text-[var(--foreground)]/85 font-light leading-[1.8]">
            <p>
              We formulate in Hathersage, a stone village nestled into the edges of the Peak District. Here, winters are harsh, winds are brisk, and the local moorland reminds us that nature does not over-complicate things to be resilient.
            </p>
            <p>
              Every batch of Oda is mixed by hand in runs of no more than two hundred bottles. We never use artificial fragrances, essential oils that cause photosensitivity, texturisers to fake richness, or cheap petroleum mineral oils.
            </p>
            <p>
              When you pick up a bottle of Oda, you hold pure French pink kaolin that lifts daily sebum without drying; whole oat lipids that seal sensitive moisture barriers; and virgin cold-pressed Chilean rosehip that restores tone through natural, un-bleached carotenoids.
            </p>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="p-8 sm:p-10 rounded-2xl bg-[var(--card)]/40 border border-[var(--border)]"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--card)] flex items-center justify-center text-[var(--primary)] mb-6">
                  <Icon size={20} strokeWidth={1.7} />
                </div>
                <span className="font-label text-[11px] tracking-[0.14em] text-[var(--muted-foreground)] block mb-2">
                  0{idx + 1}
                </span>
                <h3 className="font-serif text-[24px] text-[var(--foreground)] mb-3">
                  {p.title}
                </h3>
                <p className="text-[15px] text-[var(--foreground)]/80 leading-[1.7] font-light">
                  {p.body}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="p-10 sm:p-14 rounded-3xl bg-[var(--card)] border border-[var(--border)] text-center max-w-3xl mx-auto">
          <h3 className="font-serif text-[30px] sm:text-[36px] text-[var(--foreground)] mb-4">
            Experience the Five.
          </h3>
          <p className="text-[16px] text-[var(--foreground)]/80 font-light mb-8 max-w-md mx-auto">
            Discover a calmer morning ritual. Free nationwide delivery on orders over Rs. 8,000.
          </p>
          <Link
            to="/#products"
            className="inline-flex items-center px-8 py-4 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[#a85b42] transition-colors font-label text-[12px] tracking-[0.14em]"
          >
            Explore the range &rarr;
          </Link>
        </div>

      </div>
    </div>
  );
}
