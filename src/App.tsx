import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { BagDrawer } from './components/BagDrawer';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { TermsPage } from './pages/TermsPage';
import { RefillsPage } from './pages/RefillsPage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { AccountPage } from './pages/AccountPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { type Product } from './components/ProductsSection';

function AppContent() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { cartItems, addToCart, removeFromCart, totalCount, isBagOpen, setIsBagOpen } = useCart();

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col font-sans selection:bg-[var(--primary)] selection:text-[var(--primary-foreground)]">
        {/* 1. Announcement Bar */}
        <AnnouncementBar />

        {/* 2. Sticky Navbar */}
        <Navbar
          onOpenBag={() => setIsBagOpen(true)}
          bagCount={totalCount}
        />

        {/* Main Routed Content */}
        <main className="grow">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  onSelectProduct={setSelectedProduct}
                  onAddToCart={addToCart}
                />
              }
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/refills" element={<RefillsPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Persistent Footer with Giant 'oda' Wordmark */}
        <Footer />

        {/* Product Quick-View Modal */}
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />

        {/* Shopping Bag Drawer */}
        <BagDrawer
          isOpen={isBagOpen}
          onClose={() => setIsBagOpen(false)}
          items={cartItems}
          onRemoveItem={removeFromCart}
        />
      </div>
    </BrowserRouter>
  );
}

export function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
