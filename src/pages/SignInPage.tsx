import { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, Eye, EyeOff, CheckCircle2, AlertCircle, Smartphone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function SignInPage() {
  const navigate = useNavigate();
  const { signIn, currentUser } = useAuth();

  const [identifier, setIdentifier] = useState(''); // phone or email
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
            You're currently signed in
          </h2>
          <p className="text-[15px] text-[var(--muted-foreground)] font-light mb-6">
            Signed in as {currentUser.name} ({currentUser.phone || currentUser.email})
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
              Return to Store
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!identifier.trim()) {
      setError('Please enter your phone number or email.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    const res = signIn(identifier, password);
    if (!res.success) {
      setError(res.error || 'Invalid credentials.');
    } else {
      setSuccess(true);
      setTimeout(() => {
        navigate('/account');
      }, 900);
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
              CLIENT ACCESS
            </span>
            <h1 className="font-serif text-[42px] sm:text-[48px] text-[var(--foreground)] mb-3 leading-tight">
              Welcome <span className="italic font-normal text-[var(--primary)]">back</span>.
            </h1>
            <p className="text-[16px] text-[var(--foreground)]/80 font-light leading-[1.6]">
              Sign in with your registered phone number or email to access your formulations.
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
                  Welcome Back
                </h3>
                <p className="text-[15px] text-[var(--muted-foreground)] font-light">
                  Credentials verified from local storage. Directing to your account...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Phone or Email Identifier */}
                <div>
                  <label className="font-label text-[11px] tracking-[0.12em] text-[var(--foreground)] block mb-2">
                    Phone Number or Email *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--muted-foreground)]">
                      <Smartphone size={16} />
                    </div>
                    <input
                      type="text"
                      required
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="e.g. 0300 1234567 or ayesha@example.com"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:border-[var(--primary)] text-[15px] transition-colors"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="font-label text-[11px] tracking-[0.12em] text-[var(--foreground)]">
                      Password *
                    </label>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--muted-foreground)]">
                      <Lock size={16} />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-11 pr-11 py-3.5 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:border-[var(--primary)] text-[15px] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] cursor-pointer"
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
                  Sign In
                </button>
              </form>
            )}

            {/* Switch to Sign Up */}
            <div className="mt-8 pt-6 border-t border-[var(--border)]/70 text-center">
              <p className="text-[14px] text-[var(--muted-foreground)] font-light">
                Don't have an Oda account yet?{' '}
                <Link
                  to="/signup"
                  className="font-medium text-[var(--primary)] hover:underline underline-offset-2"
                >
                  Create one now &rarr;
                </Link>
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </div>
  );
}
