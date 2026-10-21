import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Phone, Mail, LogOut, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function AccountPage() {
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) {
    return (
      <div className="py-20 max-w-[1360px] mx-auto px-6 sm:px-8 text-center">
        <div className="max-w-md mx-auto p-10 rounded-3xl bg-[var(--card)]/40 border border-[var(--border)]">
          <User size={40} className="mx-auto text-[var(--muted-foreground)] mb-4" />
          <h2 className="font-serif text-[28px] text-[var(--foreground)] mb-2">
            No active session
          </h2>
          <p className="text-[15px] text-[var(--muted-foreground)] font-light mb-6">
            Please sign in to view your account details and refill status.
          </p>
          <div className="flex flex-col space-y-3">
            <Link
              to="/signin"
              className="py-3 px-6 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] font-label text-[12px] tracking-[0.14em]"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="py-3 px-6 rounded-full border border-[var(--border)] font-label text-[12px] tracking-[0.14em]"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-8">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 font-label text-[11px] tracking-[0.14em] text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Account Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-8 border-b border-[var(--border)]">
          <div>
            <span className="font-label text-[11px] tracking-[0.16em] text-[var(--muted-foreground)] uppercase block mb-2">
              CLIENT PROFILE
            </span>
            <h1 className="font-serif text-[38px] sm:text-[46px] text-[var(--foreground)]">
              Welcome, {currentUser.name}
            </h1>
            <p className="text-[15px] text-[var(--muted-foreground)] font-light mt-1">
              Member since {new Date(currentUser.createdAt).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
            </p>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            className="mt-6 sm:mt-0 inline-flex items-center space-x-2 px-6 py-3 rounded-full border border-[var(--border)] text-[var(--foreground)] hover:border-red-300 hover:text-red-700 hover:bg-red-50/50 transition-colors font-label text-[11px] tracking-[0.14em] cursor-pointer"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Personal Credentials from LocalStorage */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-[var(--card)]/40 border border-[var(--border)]">
              <h3 className="font-serif text-[22px] text-[var(--foreground)] mb-6">
                Saved Credentials
              </h3>

              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 rounded-xl bg-[var(--background)] border border-[var(--border)]/70">
                  <div className="w-10 h-10 rounded-full bg-[var(--card)] flex items-center justify-center text-[var(--primary)] shrink-0">
                    <User size={18} />
                  </div>
                  <div>
                    <span className="font-label text-[10px] tracking-[0.14em] text-[var(--muted-foreground)] uppercase block">
                      Name
                    </span>
                    <span className="text-[15px] text-[var(--foreground)] font-medium">
                      {currentUser.name}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 rounded-xl bg-[var(--background)] border border-[var(--border)]/70">
                  <div className="w-10 h-10 rounded-full bg-[var(--card)] flex items-center justify-center text-[var(--primary)] shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="font-label text-[10px] tracking-[0.14em] text-[var(--muted-foreground)] uppercase block">
                      Phone Number
                    </span>
                    <span className="text-[15px] text-[var(--foreground)] font-medium">
                      {currentUser.phone}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 rounded-xl bg-[var(--background)] border border-[var(--border)]/70">
                  <div className="w-10 h-10 rounded-full bg-[var(--card)] flex items-center justify-center text-[var(--primary)] shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="font-label text-[10px] tracking-[0.14em] text-[var(--muted-foreground)] uppercase block">
                      Email Address
                    </span>
                    <span className="text-[15px] text-[var(--foreground)] font-medium">
                      {currentUser.email}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--border)]/60 flex items-center space-x-2 text-[var(--muted-foreground)] text-[12px]">
                <ShieldCheck size={14} className="text-[var(--primary)]" />
                <span>Verified in local browser storage</span>
              </div>
            </div>

            {/* Circularity card */}
            <div className="p-8 rounded-3xl bg-[var(--card)]/40 border border-[var(--border)]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-[22px] text-[var(--foreground)]">
                  Empties Returned
                </h3>
                <span className="font-label text-[11px] tracking-[0.14em] text-[var(--primary)]">
                  2 OF 4 RETURNED
                </span>
              </div>
              <p className="text-[14px] text-[var(--foreground)]/80 font-light leading-[1.6] mb-4">
                Return 2 more empty vessels to unlock your complimentary 150ml Cleanser or Toner.
              </p>
              <div className="w-full bg-[var(--border)] h-2 rounded-full overflow-hidden mb-5">
                <div className="bg-[var(--primary)] h-full w-1/2 rounded-full" />
              </div>
              <Link
                to="/refills"
                className="font-label text-[11px] tracking-[0.12em] text-[var(--primary)] hover:underline"
              >
                Request return label &rarr;
              </Link>
            </div>
          </div>

          {/* Right Column: Routine & Activity */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-8 sm:p-10 rounded-3xl bg-[var(--card)]/30 border border-[var(--border)]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-[24px] text-[var(--foreground)]">
                  Your Active Formulations
                </h3>
                <Link
                  to="/#products"
                  className="font-label text-[11px] tracking-[0.12em] text-[var(--primary)]"
                >
                  Browse all &rarr;
                </Link>
              </div>

              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-14 rounded-lg bg-[var(--card)] overflow-hidden shrink-0">
                      <img src="/images/product-cleanser.jpg" alt="Clay Cleanser" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-serif text-[18px] text-[var(--foreground)]">Clay Cleanser</h4>
                      <p className="font-label text-[10px] tracking-[0.12em] text-[var(--muted-foreground)]">150ml · Daily Morning & Night</p>
                    </div>
                  </div>
                  <span className="font-label text-[11px] tracking-[0.12em] text-[var(--primary)] font-semibold">
                    In Routine
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-14 rounded-lg bg-[var(--card)] overflow-hidden shrink-0">
                      <img src="/images/product-serum.jpg" alt="Daily Serum" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-serif text-[18px] text-[var(--foreground)]">Daily Serum</h4>
                      <p className="font-label text-[10px] tracking-[0.12em] text-[var(--muted-foreground)]">30ml · Niacinamide & Squalane</p>
                    </div>
                  </div>
                  <span className="font-label text-[11px] tracking-[0.12em] text-[var(--primary)] font-semibold">
                    In Routine
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Orders Box */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[var(--card)]/30 border border-[var(--border)]">
              <h3 className="font-serif text-[24px] text-[var(--foreground)] mb-4">
                Recent Workshop Dispatches
              </h3>
              
              {(() => {
                let orders: any[] = [];
                try {
                  const stored = localStorage.getItem('oda_customer_orders');
                  if (stored) orders = JSON.parse(stored);
                } catch {}

                if (orders.length === 0) {
                  return (
                    <div className="p-6 rounded-2xl bg-[var(--background)] border border-[var(--border)] text-center">
                      <p className="text-[14px] text-[var(--muted-foreground)] font-light">
                        No orders recorded yet. Explore our five core formulations.
                      </p>
                      <Link
                        to="/#products"
                        className="font-label text-[11px] tracking-[0.12em] text-[var(--primary)] mt-3 inline-block"
                      >
                        Shop the formulations &rarr;
                      </Link>
                    </div>
                  );
                }

                return (
                  <div className="space-y-4">
                    {orders.map((ord: any) => (
                      <div key={ord.id} className="p-5 rounded-2xl bg-[var(--background)] border border-[var(--border)]">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-label text-[11px] tracking-[0.12em] text-[var(--foreground)] font-medium">
                            Order #{ord.id}
                          </span>
                          <span className="font-label text-[10px] tracking-[0.12em] text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                            Dispatched
                          </span>
                        </div>
                        <p className="text-[14px] text-[var(--muted-foreground)] font-light mb-3">
                          {ord.items?.map((it: any) => `${it.product.name} (x${it.quantity})`).join(', ') || 'Skincare parcel'} · Total: Rs. {ord.total?.toLocaleString() || ord.subtotal?.toLocaleString()}
                        </p>
                        <div className="flex items-center justify-between text-[12px] text-[var(--muted-foreground)] pt-3 border-t border-[var(--border)]/60">
                          <span>{ord.customer?.city || 'Pakistan'} · {ord.customer?.paymentMethod || 'COD'}</span>
                          <span className="text-[var(--primary)] font-medium">Tracked Express Courier</span>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
