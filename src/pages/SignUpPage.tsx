import { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Phone, Mail, Lock, Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function SignUpPage() {
  const navigate = useNavigate();
  const { signUp, currentUser } = useAuth();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // If already logged in, show quick welcome or allow redirect
  if (currentUser && !success) {
    return (
      <div className="py-20 max-w-[1360px] mx-auto px-6 sm:px-8 text-center">
        <div className="max-w-md mx-auto p-10 rounded-3xl bg-[var(--card)]/40 border border-[var(--border)]">
          <CheckCircle2 size={40} className="mx-auto text-[var(--primary)] mb-4" />
          <h2 className="font-serif text-[28px] text-[var(--foreground)] mb-2">
            You're already signed in
          </h2>
          <p className="text-[15px] text-[var(--muted-foreground)] font-light mb-6">
            Welcome back, {currentUser.name}.
          </p>
          <div className="flex flex-col space-y-3">
            <Link
              to="/account"
              className="py-3 px-6 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] font-label text-[12px] tracking-[0.14em]"
            >
              Go to Account
            </Link>
            <Link
              to="/"
              className="py-3 px-6 rounded-full border border-[var(--border)] font-label text-[12px] tracking-[0.14em]"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 7) {
      setError('Please provide a valid contact phone number.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    const res = signUp(name, phone, email, password);
    if (!res.success) {
      setError(res.error || 'Failed to create account.');
    } else {
      setSuccess(true);
      setTimeout(() => {
        navigate('/account');
      }, 1200);
    }
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

        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="font-label text-[11px] tracking-[0.16em] text-[var(--muted-foreground)] uppercase block mb-3">
              CREATING AN ACCOUNT
            </span>
            <h1 className="font-serif text-[42px] sm:text-[48px] text-[var(--foreground)] mb-3 leading-tight">
              Join <span className="italic font-normal text-[var(--primary)]">Oda</span>.
            </h1>
            <p className="text-[16px] text-[var(--foreground)]/80 font-light leading-[1.6]">
              Save your formulation preferences, track small-batch refills, and unlock complimentary delivery.
            </p>
          </div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="p-8 sm:p-10 rounded-3xl bg-[var(--card)]/30 border border-[var(--border)] shadow-xs"
          >
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-start space-x-3 text-[14px]">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {success ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-12 h-12 rounded-full bg-[var(--primary)] text-white flex items-center justify-center mx-auto">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="font-serif text-[26px] text-[var(--foreground)]">
                  Account Created
                </h3>
                <p className="text-[15px] text-[var(--muted-foreground)] font-light">
                  Credentials saved securely in local storage. Redirecting to your account dashboard...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="font-label text-[11px] tracking-[0.12em] text-[var(--foreground)] block mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--muted-foreground)]">
                      <User size={16} />
                    </div>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ayesha Khan"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:border-[var(--primary)] text-[15px] transition-colors"
                    />
                  </div>
                </div>

                {/* Phone Number (Required by user request) */}
                <div>
                  <label className="font-label text-[11px] tracking-[0.12em] text-[var(--foreground)] block mb-2">
                    Phone Number * (Stored for sign in)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--muted-foreground)]">
                      <Phone size={16} />
                    </div>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 0300 1234567"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:border-[var(--primary)] text-[15px] transition-colors"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="font-label text-[11px] tracking-[0.12em] text-[var(--foreground)] block mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--muted-foreground)]">
                      <Mail size={16} />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ayesha@example.com"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:border-[var(--primary)] text-[15px] transition-colors"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="font-label text-[11px] tracking-[0.12em] text-[var(--foreground)] block mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--muted-foreground)]">
                      <Lock size={16} />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      className="w-full pl-11 pr-11 py-3.5 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:border-[var(--primary)] text-[15px] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full mt-2 py-4 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[#a85b42] transition-colors font-label text-[12px] tracking-[0.14em] cursor-pointer shadow-sm"
                >
                  Create Account
                </button>
              </form>
            )}

            {/* Switch to Sign In */}
            <div className="mt-8 pt-6 border-t border-[var(--border)]/70 text-center">
              <p className="text-[14px] text-[var(--muted-foreground)] font-light">
                Already registered with Oda?{' '}
                <Link
                  to="/signin"
                  className="font-medium text-[var(--primary)] hover:underline underline-offset-2"
                >
                  Sign in here &rarr;
                </Link>
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </div>
  );
}
