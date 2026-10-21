import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Product } from './ProductsSection';

interface BagItem {
  product: Product;
  quantity: number;
}

interface BagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: BagItem[];
  onRemoveItem: (id: string) => void;
}

export function BagDrawer({ isOpen, onClose, items, onRemoveItem }: BagDrawerProps) {
  const navigate = useNavigate();
  const subtotal = items.reduce((acc, item) => acc + item.product.numericPrice * item.quantity, 0);
  const freeDeliveryThreshold = 8000;
  const awayFromFree = Math.max(0, freeDeliveryThreshold - subtotal);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[var(--foreground)]/40 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-screen max-w-md bg-[var(--background)] border-l border-[var(--border)] shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="px-6 py-6 border-b border-[var(--border)] flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-[26px] text-[var(--foreground)]">
                    Your Bag
                  </h3>
                  <p className="font-label text-[11px] tracking-[0.12em] text-[var(--muted-foreground)]">
                    {items.length === 0 ? 'Empty' : `${items.length} ${items.length === 1 ? 'item' : 'items'}`}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 -mr-2 text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
                  aria-label="Close bag"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              {/* Free delivery banner */}
              <div className="bg-[var(--card)] px-6 py-3 border-b border-[var(--border)] text-center">
                <p className="font-label text-[11px] tracking-[0.1em] text-[var(--foreground)]">
                  {awayFromFree === 0 ? (
                    <span className="text-[var(--primary)] font-semibold">
                      You've unlocked free standard delivery
                    </span>
                  ) : (
                    <span>
                      Add Rs. {awayFromFree.toLocaleString()} more to qualify for free delivery
                    </span>
                  )}
                </p>
              </div>

              {/* Items List */}
              <div className="grow overflow-y-auto p-6 space-y-6">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16">
                    <p className="font-serif text-[22px] text-[var(--muted-foreground)] mb-2">
                      Your bag is quiet.
                    </p>
                    <p className="text-[14px] text-[var(--muted-foreground)] max-w-xs font-light mb-6">
                      Explore our five essential formulations made from clay, oat, and cold-pressed oils.
                    </p>
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-6 py-3 rounded-full bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-white transition-colors font-label text-[11px] tracking-[0.14em]"
                    >
                      Browse the five
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex space-x-4 pb-6 border-b border-[var(--border)]/70 last:border-b-0 items-center"
                    >
                      <div className="w-20 h-24 rounded-xl overflow-hidden bg-[var(--card)] shrink-0 p-1">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover object-center rounded-lg"
                        />
                      </div>
                      <div className="grow">
                        <h4 className="font-serif text-[19px] text-[var(--foreground)]">
                          {item.product.name}
                        </h4>
                        <p className="font-label text-[11px] tracking-[0.12em] text-[var(--muted-foreground)] mb-1">
                          {item.product.size} · Qty {item.quantity}
                        </p>
                        <p className="font-label text-[12px] tracking-[0.1em] text-[var(--foreground)] font-medium">
                          {item.product.price}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-[var(--muted-foreground)] hover:text-red-600 transition-colors p-2"
                        aria-label={`Remove ${item.product.name}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="p-6 border-t border-[var(--border)] bg-[var(--card)]/30 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-label text-[12px] tracking-[0.12em] text-[var(--muted-foreground)]">
                      Subtotal
                    </span>
                    <span className="font-serif text-[22px] text-[var(--foreground)]">
                      Rs. {subtotal.toLocaleString()}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      navigate('/checkout');
                    }}
                    className="w-full py-4 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[#a85b42] transition-colors font-label text-[12px] tracking-[0.14em] flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight size={15} />
                  </button>

                  <p className="text-center font-label text-[10px] tracking-[0.12em] text-[var(--muted-foreground)]">
                    Refillable glass packaging · Carbon neutral shipping
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
