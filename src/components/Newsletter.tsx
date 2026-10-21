import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubmitted(true);
  };

  return (
    <section className="py-20 md:py-28 bg-[var(--background)]">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-8">
        
        <div className="rounded-3xl bg-[var(--primary)] text-[var(--primary-foreground)] px-8 py-16 md:p-20 relative overflow-hidden shadow-sm">
          
          {/* Subtle background glow */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />

          <div className="max-w-2xl relative z-10">
            <span className="font-label text-[11px] sm:text-[12px] tracking-[0.16em] uppercase text-[var(--primary-foreground)]/80 block mb-4">
              DISPATCHES FROM THE LAB
            </span>

            <h2 className="font-display-h2 text-white mb-4">
              One email a <span className="font-serif italic font-normal text-[var(--card)]">month</span>.
            </h2>

            <p className="text-[17px] sm:text-[19px] text-[var(--primary-foreground)]/90 font-light mb-10 leading-[1.6]">
              New batches, refill dates and nothing else.
            </p>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 max-w-lg"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="grow px-6 py-4 rounded-full bg-white/15 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 text-[15px] transition-all"
                  />
                  <button
                    type="submit"
                    className="px-8 py-4 rounded-full bg-[var(--primary-foreground)] text-[var(--foreground)] hover:bg-white transition-colors duration-200 font-label text-[12px] tracking-[0.14em] font-medium cursor-pointer shrink-0 shadow-sm"
                  >
                    Subscribe
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-3 text-white bg-white/10 px-6 py-4 rounded-full w-fit"
                >
                  <div className="w-6 h-6 rounded-full bg-white text-[var(--primary)] flex items-center justify-center">
                    <Check size={14} strokeWidth={2.5} />
                  </div>
                  <span className="text-[15px] font-light">
                    You're on the list. We'll speak once a month.
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </div>
    </section>
  );
}
