import { motion, type Variants } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  // Line animation variants for the 3 H1 lines
  const lineVariants: Variants = {
    hidden: { y: '100%', opacity: 0 },
    visible: (custom: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        delay: custom * 0.12,
      },
    }),
  };

  // Two smooth organic pebble shapes with identical cubic bezier control points for continuous morphing
  const blobPath1 = "M 250,55 C 365,50 445,130 450,250 C 455,365 375,445 250,450 C 130,455 55,375 50,250 C 45,130 135,60 250,55 Z";
  const blobPath2 = "M 245,45 C 385,75 460,165 440,275 C 420,385 345,455 235,445 C 125,435 45,355 55,235 C 65,125 105,15 245,45 Z";

  return (
    <section className="relative overflow-hidden pt-8 pb-20 md:py-24 lg:py-32">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-8">
        
        {/* Responsive grid: On mobile stacks with image first, on desktop left text and right image */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Mobile Product Visual (Shown first on mobile <768px, hidden on desktop) */}
          <div className="md:hidden flex flex-col items-center justify-center relative min-h-[50vh] max-h-[60vh] py-4">
            {/* SVG Pebble Blob */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg 
                viewBox="0 0 500 500" 
                className="w-full h-full max-w-[340px] max-h-[340px] drop-shadow-sm opacity-90"
              >
                <motion.path
                  d={blobPath1}
                  animate={{ d: [blobPath1, blobPath2, blobPath1] }}
                  transition={{
                    duration: 12,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                  fill="var(--card)"
                />
              </svg>
            </div>

            {/* Product Bottle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-full max-w-[280px] aspect-[3/4] rounded-2xl overflow-hidden shadow-md"
            >
              <img
                src="/images/hero-bottle.jpg"
                alt="Oda amber glass skincare bottle with cream label on warm terracotta stone"
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          </div>

          {/* Left Column: Text Content */}
          <div className="md:col-span-7 lg:col-span-6 flex flex-col justify-center z-10">
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-6 md:mb-8"
            >
              <span className="font-label text-[11px] sm:text-[12px] tracking-[0.14em] text-[var(--muted-foreground)]">
                CLAY · OAT · COLD-PRESSED OILS
              </span>
            </motion.div>

            {/* Giant H1 across 3 lines with individual overflow-hidden reveals */}
            <h1 className="font-display-h1 text-[var(--foreground)] mb-6 md:mb-8 select-none">
              <div className="overflow-hidden pb-1">
                <motion.div
                  custom={0}
                  variants={lineVariants}
                  initial="hidden"
                  animate="visible"
                  className="block"
                >
                  Less,
                </motion.div>
              </div>

              <div className="overflow-hidden pb-1">
                <motion.div
                  custom={1}
                  variants={lineVariants}
                  initial="hidden"
                  animate="visible"
                  className="block"
                >
                  but <span className="font-serif italic font-normal text-[var(--primary)]">better</span>
                </motion.div>
              </div>

              <div className="overflow-hidden pb-1">
                <motion.div
                  custom={2}
                  variants={lineVariants}
                  initial="hidden"
                  animate="visible"
                  className="block"
                >
                  for skin.
                </motion.div>
              </div>
            </h1>

            {/* Subline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="text-[16px] sm:text-[17px] text-[var(--foreground)]/80 max-w-[500px] leading-[1.7] font-light mb-8 md:mb-10"
            >
              Five products. No fragrance, no fillers, no twelve-step routine. Made in small batches in the Peak District.
            </motion.p>

            {/* Action Button */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <a
                href="#products"
                className="inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[#a85b42] transition-colors duration-300 shadow-sm font-label text-[12px] tracking-[0.14em] group"
              >
                <span>Shop the five</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </motion.div>
          </div>

          {/* Right Column: Desktop Organic Blob + Hero Bottle (Effect 2) */}
          <div className="hidden md:flex md:col-span-5 lg:col-span-6 relative items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[460px] lg:max-w-[520px] aspect-[4/5] flex items-center justify-center">
              
              {/* Background Blob: 12-second continuous morphing SVG pebble */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none scale-110">
                <svg 
                  viewBox="0 0 500 500" 
                  className="w-full h-full drop-shadow-sm opacity-95"
                  aria-hidden="true"
                >
                  <motion.path
                    d={blobPath1}
                    animate={{ d: [blobPath1, blobPath2, blobPath1] }}
                    transition={{
                      duration: 12,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "mirror",
                    }}
                    fill="var(--card)"
                  />
                </svg>
              </div>

              {/* Centered Tall Product Bottle */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 w-[78%] aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border border-[var(--border)]/40"
              >
                <img
                  src="/images/hero-bottle.jpg"
                  alt="Amber glass skincare bottle with cream label on warm clay stone"
                  className="w-full h-full object-cover object-center transform hover:scale-[1.02] transition-transform duration-700"
                  loading="eager"
                />
              </motion.div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
