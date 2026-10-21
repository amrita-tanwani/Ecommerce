import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';
import type { Product } from './ProductsSection';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  if (!product) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[var(--foreground)]/50 backdrop-blur-xs transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-2xl bg-[var(--background)] rounded-3xl p-6 sm:p-10 shadow-2xl border border-[var(--border)] overflow-hidden z-10 my-8"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[var(--card)]/60 text-[var(--foreground)] flex items-center justify-center hover:bg-[var(--card)] hover:text-[var(--primary)] transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
            {/* Image */}
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-[var(--card)] p-3">
              <img
                src={product.image}
                alt={product.alt}
                className="w-full h-full object-cover object-center rounded-xl"
              />
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <span className="font-label text-[11px] tracking-[0.12em] text-[var(--muted-foreground)]">
                  {product.size} · REFILLABLE
                </span>
                <span className="font-label text-[13px] tracking-[0.12em] text-[var(--foreground)] font-semibold">
                  {product.price}
                </span>
              </div>

              <h2 className="font-serif text-[32px] sm:text-[36px] text-[var(--foreground)] mb-3 leading-tight">
                {product.name}
              </h2>

              <p className="text-[15px] text-[var(--foreground)]/80 leading-[1.65] font-light mb-6">
                {product.details}
              </p>

              {/* Key Ingredients */}
              <div className="mb-8">
                <span className="font-label text-[10px] tracking-[0.14em] text-[var(--muted-foreground)] uppercase block mb-2">
                  Active Botanicals
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.keyIngredients.map((ing) => (
                    <span
                      key={ing}
                      className="px-3 py-1 rounded-full bg-[var(--card)] text-[var(--foreground)] text-[12px] font-light"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="w-full py-4 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[#a85b42] transition-colors font-label text-[12px] tracking-[0.14em] flex items-center justify-center space-x-2"
              >
                <Check size={16} />
                <span>Add to bag · {product.price}</span>
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </AnimatePresence>
  );
}
