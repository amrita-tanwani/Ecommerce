import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Truck, ShieldCheck, ArrowRight, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function OrderSuccessPage() {
  const { lastOrder } = useCart();

  // Fallback demo order if visited directly
  const order = lastOrder || {
    id: 'ODA-924185',
    items: [],
    customer: {
      fullName: 'Ayesha Khan',
      phone: '0300 1234567',
      email: 'client@example.com',
      address: 'House 42, Street 7, Sector F-7/2',
      city: 'Islamabad',
      paymentMethod: 'Cash on Delivery (COD)',
    },
    subtotal: 11300,
    shipping: 0,
    total: 11300,
    date: new Date().toISOString(),
  };

  return (
    <div className="py-12 md:py-24">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-8">
        
        <div className="max-w-3xl mx-auto">
          
          {/* Card Container */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="p-8 sm:p-14 rounded-3xl bg-[var(--card)]/40 border border-[var(--border)] text-center shadow-xs"
          >
            
            {/* Custom Aesthetic Artisanal SVG Illustration */}
            <div className="w-full max-w-[280px] sm:max-w-[320px] mx-auto mb-8 relative">
              <svg
                viewBox="0 0 320 240"
                className="w-full h-auto drop-shadow-sm"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Soft background organic pebble */}
                <path
                  d="M160 30 C230 25, 290 70, 295 135 C300 200, 240 225, 160 220 C80 215, 25 180, 25 120 C25 60, 90 35, 160 30 Z"
                  fill="var(--card)"
                  opacity="0.9"
                />

                {/* Apothecary Parcel Box */}
                <rect
                  x="85"
                  y="90"
                  width="150"
                  height="95"
                  rx="14"
                  fill="hsl(30, 33%, 95%)"
                  stroke="var(--border)"
                  strokeWidth="2"
                />

                {/* Terracotta ribbon across package */}
                <path
                  d="M160 90 L160 185"
                  stroke="var(--primary)"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <path
                  d="M85 137 L235 137"
                  stroke="var(--primary)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                {/* Handcrafted Botanical Oat Sprig extending from ribbon */}
                <g stroke="var(--primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {/* Stem */}
                  <path d="M160 137 C180 110, 210 95, 235 85" />
                  {/* Oat grains */}
                  <ellipse cx="195" cy="116" rx="6" ry="3.5" transform="rotate(-30 195 116)" fill="var(--card)" />
                  <ellipse cx="215" cy="102" rx="6" ry="3.5" transform="rotate(-40 215 102)" fill="var(--card)" />
                  <ellipse cx="232" cy="88" rx="6" ry="3.5" transform="rotate(-45 232 88)" fill="var(--card)" />
                  <path d="M195 116 L202 110" />
                  <path d="M215 102 L223 96" />
                  <path d="M232 88 L240 82" />
                </g>

                {/* Amber Wax Seal with Checkmark */}
                <circle cx="160" cy="137" r="22" fill="var(--primary)" />
                <circle cx="160" cy="137" r="18" fill="var(--primary)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
                <path
                  d="M152 137 L157 142 L168 131"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Little decorative organic clay dots */}
                <circle cx="70" cy="75" r="4" fill="var(--primary)" opacity="0.4" />
                <circle cx="250" cy="165" r="5" fill="var(--primary)" opacity="0.3" />
                <circle cx="230" cy="195" r="3" fill="var(--muted-foreground)" opacity="0.3" />
              </svg>
            </div>

            {/* Title & Tagline */}
            <span className="font-label text-[11px] sm:text-[12px] tracking-[0.16em] text-[var(--primary)] font-semibold uppercase block mb-3">
              DISPATCH CONFIRMED
            </span>
            <h1 className="font-display-h2 text-[var(--foreground)] mb-4">
              Thank you, <span className="font-serif italic font-normal text-[var(--primary)]">{order.customer.fullName}</span>.
            </h1>
            <p className="text-[17px] text-[var(--foreground)]/80 font-light max-w-lg mx-auto leading-[1.65] mb-8">
              Your order has been recorded in our dispatch ledger. We are preparing your fresh small-batch formulation with care.
            </p>

            {/* Order Confirmation Details Box */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[var(--background)] border border-[var(--border)] text-left mb-10 max-w-xl mx-auto space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border)]/70">
                <div>
                  <span className="font-label text-[10px] tracking-[0.14em] text-[var(--muted-foreground)] uppercase block">
                    Order Reference
                  </span>
                  <span className="font-mono text-[16px] text-[var(--foreground)] font-semibold">
                    #{order.id}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-label text-[10px] tracking-[0.14em] text-[var(--muted-foreground)] uppercase block">
                    Payment Method
                  </span>
                  <span className="text-[13px] text-[var(--foreground)] font-medium">
                    {order.customer.paymentMethod}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px] text-[var(--foreground)]/80 font-light">
                <div>
                  <span className="font-label text-[10px] tracking-[0.12em] text-[var(--muted-foreground)] uppercase block mb-1">
                    Delivery Destination
                  </span>
                  <p>{order.customer.address}, {order.customer.city}</p>
                  <p className="text-[12px] text-[var(--muted-foreground)] mt-0.5">{order.customer.phone}</p>
                </div>

                <div>
                  <span className="font-label text-[10px] tracking-[0.12em] text-[var(--muted-foreground)] uppercase block mb-1">
                    Estimated Arrival
                  </span>
                  <p className="font-medium text-[var(--foreground)]">2–3 Working Days</p>
                  <p className="text-[12px] text-[var(--muted-foreground)] mt-0.5">Tracked Express Courier</p>
                </div>
              </div>

              {order.items.length > 0 && (
                <div className="pt-4 border-t border-[var(--border)]/70">
                  <span className="font-label text-[10px] tracking-[0.12em] text-[var(--muted-foreground)] uppercase block mb-2">
                    Purchased Formulations
                  </span>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.product.id} className="flex justify-between text-[13px]">
                        <span>{item.product.name} ({item.product.size}) × {item.quantity}</span>
                        <span className="font-medium">Rs. {(item.product.numericPrice * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-3 border-t border-[var(--border)]/70 flex justify-between items-center text-[15px]">
                <span className="font-label text-[11px] tracking-[0.12em] text-[var(--muted-foreground)] uppercase">Total Paid / Due</span>
                <span className="font-serif text-[20px] font-semibold text-[var(--foreground)]">
                  Rs. {order.total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Courier SMS Note */}
            <div className="flex items-center justify-center space-x-2 text-[13px] text-[var(--muted-foreground)] font-light mb-8">
              <Truck size={16} className="text-[var(--primary)]" />
              <span>A courier tracking SMS will be dispatched to {order.customer.phone} once picked up.</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[#a85b42] transition-colors font-label text-[12px] tracking-[0.14em] flex items-center justify-center space-x-2 shadow-sm"
              >
                <span>Return to Store</span>
                <ArrowRight size={15} />
              </Link>

              <Link
                to="/account"
                className="w-full sm:w-auto px-8 py-4 rounded-full border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors font-label text-[12px] tracking-[0.14em] flex items-center justify-center space-x-2"
              >
                <User size={15} />
                <span>View Account Orders</span>
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-[var(--border)]/60 flex items-center justify-center space-x-2 text-[12px] text-[var(--muted-foreground)]">
              <ShieldCheck size={14} className="text-[var(--primary)]" />
              <span>30-Day Sensitive Skin Guarantee applies to all orders</span>
            </div>

          </motion.div>

        </div>

      </div>
    </div>
  );
}
