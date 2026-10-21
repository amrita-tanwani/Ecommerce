import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onOpenBag?: () => void;
  bagCount?: number;
}

export function Navbar({ onOpenBag, bagCount = 0 }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { currentUser } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Shop', href: '/#products', isHash: true },
    { label: 'Ingredients', href: '/#ingredients', isHash: true },
    { label: 'About', href: '/about', isHash: false },
    { label: 'Refills', href: '/refills', isHash: false },
    { label: 'Journal', href: '/#journal', isHash: true },
  ];

  return (
    <header 
      className={`sticky top-0 z-40 w-full h-[76px] bg-[var(--background)] transition-all duration-300 ${
        scrolled ? 'border-b border-[var(--border)]/70 shadow-xs backdrop-blur-md bg-[var(--background)]/95' : 'border-b border-transparent'
      }`}
    >
      <div className="max-w-[1360px] mx-auto h-full px-6 sm:px-8 flex items-center justify-between relative">
        
        {/* Left: Desktop Nav Links / Mobile Menu Button */}
        <div className="flex items-center">
          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 -ml-2 text-[var(--foreground)] hover:text-[var(--primary)] transition-colors focus:outline-none cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>

          {/* Desktop Links */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              link.isHash ? (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-label text-[12px] tracking-[0.14em] text-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-200"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`font-label text-[12px] tracking-[0.14em] transition-colors duration-200 ${
                    location.pathname === link.href ? 'text-[var(--primary)] font-semibold' : 'text-[var(--foreground)] hover:text-[var(--primary)]'
                  }`}
                >
                  {link.label}
                </Link>
              )
            ))}
          </nav>
        </div>

        {/* Center: Centred Wordmark */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
          <Link
            to="/"
            className="font-serif text-[32px] tracking-tight text-[var(--foreground)] hover:opacity-85 transition-opacity"
            aria-label="Oda Skin Home"
          >
            oda
          </Link>
        </div>

        {/* Right: Contact + Account + Bag / Mobile Bag Icon */}
        <div className="flex items-center space-x-5 sm:space-x-8">
          <Link
            to="/contact"
            className={`hidden md:block font-label text-[12px] tracking-[0.14em] transition-colors cursor-pointer ${
              location.pathname === '/contact' ? 'text-[var(--primary)] font-semibold' : 'text-[var(--foreground)] hover:text-[var(--primary)]'
            }`}
          >
            Contact
          </Link>

          {/* Account Link based on Auth State */}
          {currentUser ? (
            <Link
              to="/account"
              className={`hidden md:block font-label text-[12px] tracking-[0.14em] transition-colors cursor-pointer ${
                location.pathname === '/account' ? 'text-[var(--primary)] font-semibold' : 'text-[var(--foreground)] hover:text-[var(--primary)]'
              }`}
            >
              Account ({currentUser.name.split(' ')[0]})
            </Link>
          ) : (
            <Link
              to="/signin"
              className={`hidden md:block font-label text-[12px] tracking-[0.14em] transition-colors cursor-pointer ${
                location.pathname === '/signin' || location.pathname === '/signup'
                  ? 'text-[var(--primary)] font-semibold'
                  : 'text-[var(--foreground)] hover:text-[var(--primary)]'
              }`}
            >
              Account
            </Link>
          )}

          <button
            type="button"
            onClick={onOpenBag}
            className="hidden md:block font-label text-[12px] tracking-[0.14em] text-[var(--foreground)] hover:text-[var(--primary)] transition-colors cursor-pointer"
          >
            Bag ({bagCount})
          </button>

          {/* Mobile bag icon button */}
          <button
            type="button"
            onClick={onOpenBag}
            className="md:hidden p-2 -mr-2 text-[var(--foreground)] hover:text-[var(--primary)] transition-colors relative flex items-center cursor-pointer"
            aria-label={`Shopping bag with ${bagCount} items`}
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {bagCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[var(--primary)]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden border-b border-[var(--border)] bg-[var(--background)] px-6 py-8 overflow-hidden shadow-lg"
          >
            <nav className="flex flex-col space-y-5">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-3xl text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
              >
                Home
              </Link>
              <a
                href="/#products"
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-3xl text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
              >
                Shop
              </a>
              <a
                href="/#ingredients"
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-3xl text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
              >
                Ingredients
              </a>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-3xl text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
              >
                About
              </Link>
              <Link
                to="/refills"
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-3xl text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
              >
                Refills
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-3xl text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
              >
                Contact
              </Link>
              <Link
                to="/terms"
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-3xl text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
              >
                Our Terms
              </Link>

              {currentUser ? (
                <Link
                  to="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-3xl text-[var(--primary)] hover:underline transition-colors"
                >
                  Account ({currentUser.name.split(' ')[0]})
                </Link>
              ) : (
                <div className="pt-2 flex flex-col space-y-3">
                  <Link
                    to="/signin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-3xl text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-2xl text-[var(--primary)] hover:underline transition-colors"
                  >
                    Create Account &rarr;
                  </Link>
                </div>
              )}

              <div className="pt-6 border-t border-[var(--border)] flex flex-col space-y-4">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBag?.();
                  }}
                  className="text-left font-label text-[12px] tracking-[0.14em] text-[var(--primary)]"
                >
                  View Bag ({bagCount})
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
