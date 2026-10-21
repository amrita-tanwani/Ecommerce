import { motion } from 'motion/react';
import { Droplets, ShieldCheck, Ban } from 'lucide-react';

export function BeforeYouBuy() {
  const columns = [
    {
      title: 'How to use',
      icon: Droplets,
      text: 'Cleanse and tone morning and night. Serum in the morning, oil at night, cream whenever skin feels tight.',
      detail: '5 steps, modular and intuitive.',
    },
    {
      title: 'Skin types',
      icon: ShieldCheck,
      text: 'Formulated for sensitive, dry and combination skin. Patch test first if you react easily.',
      detail: 'Dermatologically evaluated.',
    },
    {
      title: 'What we leave out',
      icon: Ban,
      text: 'Fragrance, essential oils, alcohol, sulphates, silicones and parabens.',
      detail: 'Zero unnecessary additives.',
    },
  ];

  return (
    <section id="before-you-buy" className="py-20 md:py-28 bg-[var(--background)] border-t border-[var(--border)]">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-8">
        
        <div className="mb-12">
          <span className="font-label text-[11px] sm:text-[12px] tracking-[0.14em] text-[var(--muted-foreground)] block mb-2">
            PRACTICAL GUIDANCE
          </span>
          <h2 className="font-serif text-[32px] sm:text-[40px] text-[var(--foreground)]">
            Before you buy
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {columns.map((col, index) => {
            const Icon = col.icon;
            return (
              <motion.div
                key={col.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-[var(--card)]/30 border border-[var(--border)] flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-[var(--card)] flex items-center justify-center text-[var(--primary)] mb-6">
                    <Icon size={18} strokeWidth={1.8} />
                  </div>
                  
                  <h3 className="font-serif text-[24px] sm:text-[26px] text-[var(--foreground)] mb-3">
                    {col.title}
                  </h3>
                  
                  <p className="text-[16px] text-[var(--foreground)]/80 leading-[1.7] font-light mb-6">
                    {col.text}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--border)]/70">
                  <span className="font-label text-[11px] tracking-[0.12em] text-[var(--muted-foreground)]">
                    {col.detail}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
