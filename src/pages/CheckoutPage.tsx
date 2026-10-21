import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Truck, CreditCard, Banknote, Building2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart, type OrderRecord } from '../context/CartContext';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { cartItems, subtotal, clearCart, setLastOrder } = useCart();

  const [fullName, setFullName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Lahore');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'raast' | 'card'>('cod');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync if currentUser updates
  useEffect(() => {
    if (currentUser) {
      if (!fullName) setFullName(currentUser.name);
      if (!phone) setPhone(currentUser.phone);
      if (!email) setEmail(currentUser.email);
    }
  }, [currentUser]);

  const shippingCost = subtotal >= 8000 ? 0 : (cartItems.length > 0 ? 350 : 0);
  const grandTotal = subtotal + shippingCost;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (cartItems.length === 0) {
      setError('Your shopping bag is empty.');
      return;
    }

    if (!fullName.trim()) {
      setError('Please provide your full recipient name.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 8) {
      setError('Please provide a valid delivery contact phone number.');
      return;
    }
    if (!address.trim()) {
      setError('Please specify your complete street address.');
      return;
    }

    setIsSubmitting(true);

    const orderNumber = `ODA-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder: OrderRecord = {
      id: orderNumber,
      items: [...cartItems],
      customer: {
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        address: address.trim(),
        city,
        notes: notes.trim(),
        paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : paymentMethod === 'raast' ? 'Raast / Bank Transfer' : 'Credit / Debit Card',
      },
      subtotal,
      shipping: shippingCost,
      total: grandTotal,
      date: new Date().toISOString(),
    };

    // Store in localStorage
    try {
      const existingOrdersRaw = localStorage.getItem('oda_customer_orders');
      const existingOrders: OrderRecord[] = existingOrdersRaw ? JSON.parse(existingOrdersRaw) : [];
      existingOrders.unshift(newOrder);
      localStorage.setItem('oda_customer_orders', JSON.stringify(existingOrders));
      localStorage.setItem('oda_last_confirmed_order', JSON.stringify(newOrder));
    } catch (err) {
      console.error('Error saving order to localStorage:', err);
    }

    setLastOrder(newOrder);
    clearCart();

    setTimeout(() => {
      navigate('/order-success');
    }, 600);
  };

  if (cartItems.length === 0) {
    return (
      <div className="py-20 max-w-[1360px] mx-auto px-6 sm:px-8 text-center">
        <div className="max-w-md mx-auto p-10 rounded-3xl bg-[var(--card)]/40 border border-[var(--border)]">
          <Truck size={40} className="mx-auto text-[var(--muted-foreground)] mb-4" />
          <h2 className="font-serif text-[28px] text-[var(--foreground)] mb-2">
            Your bag is empty
          </h2>
          <p className="text-[15px] text-[var(--muted-foreground)] font-light mb-6">
            Please select at least one formulation before proceeding to checkout.
          </p>
          <Link
            to="/#products"
            className="inline-block py-3.5 px-8 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] font-label text-[12px] tracking-[0.14em]"
          >
            Explore Formulations &rarr;
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-8">
        
        {/* Back link */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 font-label text-[11px] tracking-[0.14em] text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Return to Store</span>
          </Link>
        </div>

        {/* Header */}
        <div className="max-w-2xl mb-12">
          <span className="font-label text-[11px] sm:text-[12px] tracking-[0.16em] text-[var(--muted-foreground)] uppercase block mb-3">
            SECURE ORDER DISPATCH
          </span>
          <h1 className="font-display-h2 text-[var(--foreground)] mb-3">
            Complete your <span className="font-serif italic font-normal text-[var(--primary)]">order</span>.
          </h1>
          <p className="text-[16px] text-[var(--foreground)]/80 font-light leading-[1.6]">
            Every batch is hand-packed in plastic-free recycled paper cushion with tracked courier delivery across Pakistan.
          </p>
        </div>

        {error && (
          <div className="mb-8 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-center space-x-3 text-[14px] max-w-4xl">
            <AlertCircle size={18} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Delivery & Customer Info */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Contact details */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[var(--card)]/30 border border-[var(--border)] space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border)]/60">
                <h2 className="font-serif text-[24px] text-[var(--foreground)]">
                  1. Contact Details
                </h2>
                {currentUser && (
                  <span className="font-label text-[11px] tracking-[0.12em] text-[var(--primary)]">
                    Logged in as {currentUser.name}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="font-label text-[11px] tracking-[0.12em] text-[var(--foreground)] block mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Recipient's name"
                    className="w-full px-5 py-3.5 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:border-[var(--primary)] text-[15px]"
                  />
                </div>

                <div>
                  <label className="font-label text-[11px] tracking-[0.12em] text-[var(--foreground)] block mb-2">
                    Mobile Phone * (For Courier SMS)
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0300 1234567"
                    className="w-full px-5 py-3.5 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:border-[var(--primary)] text-[15px]"
                  />
                </div>
              </div>

              <div>
                <label className="font-label text-[11px] tracking-[0.12em] text-[var(--foreground)] block mb-2">
                  Email Address * (For Tracking & Invoice)
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="order-receipts@example.com"
                  className="w-full px-5 py-3.5 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:border-[var(--primary)] text-[15px]"
                />
              </div>
            </div>

            {/* Delivery Address */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[var(--card)]/30 border border-[var(--border)] space-y-6">
              <h2 className="font-serif text-[24px] text-[var(--foreground)] pb-4 border-b border-[var(--border)]/60">
                2. Shipping Address
              </h2>

              <div>
                <label className="font-label text-[11px] tracking-[0.12em] text-[var(--foreground)] block mb-2">
                  Complete Street Address *
                </label>
                <textarea
                  required
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House / Apartment number, Street name, Sector, Area"
                  className="w-full px-5 py-3.5 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:border-[var(--primary)] text-[15px] resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="font-label text-[11px] tracking-[0.12em] text-[var(--foreground)] block mb-2">
                    Destination City *
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-5 py-3.5 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:border-[var(--primary)] text-[15px]"
                  >
                    <option value="Lahore">Lahore</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Peshawar">Peshawar</option>
                    <option value="Multan">Multan</option>
                    <option value="Sialkot">Sialkot</option>
                    <option value="Gujranwala">Gujranwala</option>
                    <option value="Quetta">Quetta</option>
                    <option value="Other City">Other City (All Pakistan)</option>
                  </select>
                </div>

                <div>
                  <label className="font-label text-[11px] tracking-[0.12em] text-[var(--foreground)] block mb-2">
                    Dispatch Delivery Note (Optional)
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Call before arrival"
                    className="w-full px-5 py-3.5 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:border-[var(--primary)] text-[15px]"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[var(--card)]/30 border border-[var(--border)] space-y-6">
              <h2 className="font-serif text-[24px] text-[var(--foreground)] pb-4 border-b border-[var(--border)]/60">
                3. Payment Method
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    paymentMethod === 'cod'
                      ? 'border-[var(--primary)] bg-[var(--card)] text-[var(--foreground)] shadow-xs'
                      : 'border-[var(--border)] bg-[var(--background)] hover:border-[var(--primary)]/60 text-[var(--muted-foreground)]'
                  }`}
                >
                  <Banknote size={22} className={paymentMethod === 'cod' ? 'text-[var(--primary)]' : ''} />
                  <div className="mt-4">
                    <span className="font-label text-[11px] tracking-[0.12em] block font-semibold text-[var(--foreground)]">
                      Cash on Delivery
                    </span>
                    <span className="text-[12px] text-[var(--muted-foreground)] mt-0.5 block">
                      Pay courier upon arrival
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('raast')}
                  className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    paymentMethod === 'raast'
                      ? 'border-[var(--primary)] bg-[var(--card)] text-[var(--foreground)] shadow-xs'
                      : 'border-[var(--border)] bg-[var(--background)] hover:border-[var(--primary)]/60 text-[var(--muted-foreground)]'
                  }`}
                >
                  <Building2 size={22} className={paymentMethod === 'raast' ? 'text-[var(--primary)]' : ''} />
                  <div className="mt-4">
                    <span className="font-label text-[11px] tracking-[0.12em] block font-semibold text-[var(--foreground)]">
                      Raast / Bank Transfer
                    </span>
                    <span className="text-[12px] text-[var(--muted-foreground)] mt-0.5 block">
                      Instant direct transfer
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    paymentMethod === 'card'
                      ? 'border-[var(--primary)] bg-[var(--card)] text-[var(--foreground)] shadow-xs'
                      : 'border-[var(--border)] bg-[var(--background)] hover:border-[var(--primary)]/60 text-[var(--muted-foreground)]'
                  }`}
                >
                  <CreditCard size={22} className={paymentMethod === 'card' ? 'text-[var(--primary)]' : ''} />
                  <div className="mt-4">
                    <span className="font-label text-[11px] tracking-[0.12em] block font-semibold text-[var(--foreground)]">
                      Debit / Credit Card
                    </span>
                    <span className="text-[12px] text-[var(--muted-foreground)] mt-0.5 block">
                      Visa / Mastercard
                    </span>
                  </div>
                </button>
              </div>

              {paymentMethod === 'raast' && (
                <div className="p-4 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[13px] text-[var(--foreground)]/80 space-y-1">
                  <p className="font-medium text-[var(--foreground)]">Oda Apothecary Raast ID: <span className="font-mono text-[var(--primary)]">0300-8492011</span></p>
                  <p>Bank: Meezan Bank Ltd · Account: 0102-0104882910</p>
                  <p className="text-[12px] text-[var(--muted-foreground)]">Please share the transfer transaction ID via SMS or WhatsApp upon submission.</p>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Order Summary & Review */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <div className="p-8 sm:p-10 rounded-3xl bg-[var(--card)]/40 border border-[var(--border)] shadow-xs">
              <h2 className="font-serif text-[24px] text-[var(--foreground)] mb-6 pb-4 border-b border-[var(--border)]/70">
                Order Summary ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
              </h2>

              {/* Items List */}
              <div className="divide-y divide-[var(--border)]/60 mb-6 max-h-[300px] overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-14 rounded-lg bg-[var(--card)] overflow-hidden shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-serif text-[17px] text-[var(--foreground)]">
                          {item.product.name}
                        </h4>
                        <p className="font-label text-[10px] tracking-[0.1em] text-[var(--muted-foreground)]">
                          {item.product.size} · Qty {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-label text-[12px] tracking-[0.1em] text-[var(--foreground)] font-medium">
                      Rs. {(item.product.numericPrice * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cost Calculations */}
              <div className="space-y-3 pt-4 border-t border-[var(--border)] text-[14px]">
                <div className="flex justify-between text-[var(--muted-foreground)]">
                  <span>Subtotal</span>
                  <span className="font-medium text-[var(--foreground)]">Rs. {subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-[var(--muted-foreground)]">
                  <span>Tracked Nationwide Shipping</span>
                  {shippingCost === 0 ? (
                    <span className="text-emerald-700 font-medium">FREE</span>
                  ) : (
                    <span className="font-medium text-[var(--foreground)]">Rs. {shippingCost}</span>
                  )}
                </div>

                {subtotal < 8000 && (
                  <p className="text-[12px] text-[var(--primary)] font-light">
                    Add Rs. {(8000 - subtotal).toLocaleString()} more to unlock free shipping.
                  </p>
                )}

                <div className="flex justify-between pt-4 border-t border-[var(--border)]/70 text-[18px]">
                  <span className="font-serif text-[22px] text-[var(--foreground)]">Total Due</span>
                  <span className="font-serif text-[24px] text-[var(--foreground)] font-semibold">
                    Rs. {grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-8 py-4 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[#a85b42] transition-colors font-label text-[12px] tracking-[0.14em] shadow-sm flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Confirming Dispatch...' : `Confirm Order · Rs. ${grandTotal.toLocaleString()}`}</span>
              </button>

              <div className="mt-6 flex items-center justify-center space-x-2 text-[var(--muted-foreground)] text-[11px]">
                <ShieldCheck size={14} className="text-[var(--primary)]" />
                <span>Small batch fresh guarantee · 30-day sensitive trial</span>
              </div>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
