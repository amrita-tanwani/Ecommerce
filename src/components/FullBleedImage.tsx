import { motion } from 'motion/react';

export function FullBleedImage() {
  return (
    <section className="relative w-full h-[70vh] min-h-[480px] max-h-[760px] overflow-hidden">
      {/* Background Photograph */}
      <img
        src="/images/clay-texture.jpg"
        alt="Pale pink clay being mixed with water in a ceramic bowl with a wooden spoon"
        className="w-full h-full object-cover object-center filter brightness-[0.92]"
        loading="lazy"
      />

      {/* Atmospheric Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--foreground)]/80 via-[var(--foreground)]/25 to-transparent" />

      {/* Overlaid Quote in Cream */}
      <div className="absolute inset-0 flex items-end">
        <div className="max-w-[1360px] mx-auto w-full px-6 sm:px-8 pb-16 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <p className="font-serif text-[32px] sm:text-[44px] md:text-[54px] text-[var(--primary-foreground)] leading-[1.08] tracking-tight">
              Skin doesn't need more. It needs{' '}
              <span className="italic font-normal text-white">fewer, better</span> things.
            </p>
            <span className="font-label text-[11px] tracking-[0.16em] text-[var(--primary-foreground)]/70 uppercase block mt-4">
              Oda Peak District Manifesto
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
