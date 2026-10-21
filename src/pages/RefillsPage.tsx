import { useState } from 'react';
import { ArrowLeft, RefreshCw, PackageCheck, Gift, Check, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export function RefillsPage() {
  const [labelRequested, setLabelRequested] = useState(false);
  const [returnEmail, setReturnEmail] = useState('');

  const steps = [
    {
      num: '01',
      icon: PackageCheck,
      title: 'Preserve Your Vessels',
      description: 'Our heavy amber apothecary glass and precision pump dispensers are engineered for decades of daily bathroom use. Never throw them away.',
    },
    {
      num: '02',
      icon: RefreshCw,
      title: 'Order Lightweight Pods',
      description: 'Receive fresh formula in infinitely recyclable aluminium canisters. They use 85% less shipping energy and decant cleanly into your original bottle.',
    },
    {
      num: '03',
      icon: Gift,
      title: 'Return 4 Empties, Get 1 Free',
      description: 'Collect four empty Oda vessels. Download our prepaid Royal Mail return label and drop them in any post box. We clean, sterilise, and reward you with a free product.',
    },
  ];

  const refillPrices = [
    { name: 'Clay Cleanser Refill', size: '150ml', original: 'Rs. 4,500', refill: 'Rs. 3,600' },
    { name: 'Oat Milk Toner Refill', size: '150ml', original: 'Rs. 3,800', refill: 'Rs. 3,000' },
    { name: 'Daily Serum Refill', size: '30ml', original: 'Rs. 6,800', refill: 'Rs. 5,400' },
    { name: 'Barrier Cream Refill Pod', size: '50ml', original: 'Rs. 5,900', refill: 'Rs. 4,700' },
    { name: 'Night Oil Refill Bottle', size: '30ml', original: 'Rs. 6,400', refill: 'Rs. 5,100' },
  ];

  const handleLabelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!returnEmail) return;
    setLabelRequested(true);
  };

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 font-label text-[11px] tracking-[0.14em] text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Header */}
        <div className="max-w-3xl mb-14 md:mb-20">
          <span className="font-label text-[11px] sm:text-[12px] tracking-[0.16em] text-[var(--muted-foreground)] uppercase block mb-4">
            CLOSED-LOOP BEAUTY
          </span>
          <h1 className="font-display-h1 text-[var(--foreground)] mb-6">
            Refills & <span className="font-serif italic font-normal text-[var(--primary)]">circularity</span>.
          </h1>
          <p className="text-[18px] sm:text-[20px] text-[var(--foreground)]/80 font-light leading-[1.7]">
            Skincare packaging accounts for over 120 billion units of landfill plastic each year. Here is how Oda eliminates single-use waste from your daily routine.
          </p>
        </div>

        {/* 3 Step Process */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {steps.map((st) => {
            const Icon = st.icon;
            return (
              <div
                key={st.title}
                className="p-8 sm:p-10 rounded-2xl bg-[var(--card)]/40 border border-[var(--border)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-11 h-11 rounded-full bg-[var(--card)] flex items-center justify-center text-[var(--primary)]">
                      <Icon size={19} />
                    </div>
                    <span className="font-label text-[12px] tracking-[0.14em] text-[var(--primary)] font-semibold">
                      STEP {st.num}
                    </span>
                  </div>
                  <h3 className="font-serif text-[24px] text-[var(--foreground)] mb-3">
                    {st.title}
                  </h3>
                  <p className="text-[15px] text-[var(--foreground)]/80 leading-[1.7] font-light">
                    {st.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing comparison table */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[var(--card)]/30 border border-[var(--border)] mb-20">
          <div className="max-w-2xl mb-8">
            <h2 className="font-serif text-[28px] sm:text-[34px] text-[var(--foreground)] mb-2">
              Refill Pricing
            </h2>
            <p className="text-[15px] text-[var(--muted-foreground)] font-light">
              Because packaging isn't remade from scratch, refills cost an average of 20% less.
            </p>
          </div>

          <div className="divide-y divide-[var(--border)]/70">
            {refillPrices.map((item) => (
              <div key={item.name} className="py-4 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-[19px] sm:text-[21px] text-[var(--foreground)]">
                    {item.name}
                  </h4>
                  <span className="font-label text-[11px] tracking-[0.12em] text-[var(--muted-foreground)]">
                    {item.size}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-[14px] text-[var(--muted-foreground)] line-through">
                    {item.original}
                  </span>
                  <span className="font-label text-[13px] tracking-[0.1em] text-[var(--primary)] font-semibold">
                    {item.refill}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Return Label Request Box */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[var(--primary)] text-[var(--primary-foreground)] max-w-3xl mx-auto shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <ShieldCheck size={22} className="text-white" />
            <span className="font-label text-[12px] tracking-[0.14em] text-white/80 uppercase">
              Free Royal Mail Return Label
            </span>
          </div>

          <h3 className="font-serif text-[28px] sm:text-[34px] text-white mb-3">
            Ready to return 4 empty vessels?
          </h3>

          <p className="text-[16px] text-white/90 font-light mb-8 leading-[1.6]">
            Enter your order email address below. We'll automatically generate a printable prepaid Royal Mail 48 Tracked QR code and shipping label for your parcel.
          </p>

          {!labelRequested ? (
            <form onSubmit={handleLabelSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={returnEmail}
                onChange={(e) => setReturnEmail(e.target.value)}
                placeholder="Order email (e.g. hannah@example.co.uk)"
                className="grow px-6 py-4 rounded-full bg-white/15 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 text-[15px]"
              />
              <button
                type="submit"
                className="px-8 py-4 rounded-full bg-white text-[var(--foreground)] hover:bg-[var(--card)] transition-colors font-label text-[12px] tracking-[0.14em] font-medium shrink-0 cursor-pointer"
              >
                Generate Label
              </button>
            </form>
          ) : (
            <div className="p-6 rounded-2xl bg-white/10 flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-white text-[var(--primary)] flex items-center justify-center shrink-0">
                <Check size={18} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[16px] text-white font-medium">
                  Prepaid Return Label sent to {returnEmail}!
                </p>
                <p className="text-[13px] text-white/80 font-light mt-0.5">
                  Check your inbox for the Royal Mail QR code. No printer required — just show it at the Post Office.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
