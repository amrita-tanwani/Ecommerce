import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-[var(--background)] border-t border-[var(--border)] pt-20 overflow-hidden relative">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-8 mb-16 md:mb-24">
        
        {/* 4 Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-14">
          
          {/* Col 1 */}
          <div>
            <span className="font-label text-[11px] tracking-[0.14em] text-[var(--muted-foreground)] block mb-5">
              EXPLORE
            </span>
            <ul className="space-y-3 font-serif text-[18px] sm:text-[20px] text-[var(--foreground)]">
              <li>
                <a href="/#products" className="hover:text-[var(--primary)] transition-colors">Shop</a>
              </li>
              <li>
                <a href="/#ingredients" className="hover:text-[var(--primary)] transition-colors">Ingredients</a>
              </li>
              <li>
                <Link to="/refills" className="hover:text-[var(--primary)] transition-colors">Refills</Link>
              </li>
              <li>
                <a href="/#journal" className="hover:text-[var(--primary)] transition-colors">Journal</a>
              </li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <span className="font-label text-[11px] tracking-[0.14em] text-[var(--muted-foreground)] block mb-5">
              COMPANY & CARE
            </span>
            <ul className="space-y-3 font-serif text-[18px] sm:text-[20px] text-[var(--foreground)]">
              <li>
                <Link to="/about" className="hover:text-[var(--primary)] transition-colors">About Oda</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[var(--primary)] transition-colors">Contact Workshop</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-[var(--primary)] transition-colors">Terms & Care</Link>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[var(--primary)] transition-colors">Instagram</a>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <span className="font-label text-[11px] tracking-[0.14em] text-[var(--muted-foreground)] block mb-5">
              WORKSHOP
            </span>
            <address className="not-italic text-[15px] sm:text-[16px] text-[var(--foreground)]/80 leading-[1.7] font-light">
              Oda Skin Ltd<br />
              Hathersage, Derbyshire<br />
              Peak District, UK
            </address>
            <p className="mt-4 font-label text-[11px] tracking-[0.12em] text-[var(--muted-foreground)]">
              © 2026 Oda Skin Ltd.
            </p>
          </div>

          {/* Col 4 */}
          <div>
            <span className="font-label text-[11px] tracking-[0.14em] text-[var(--muted-foreground)] block mb-5">
              CIRCULARITY
            </span>
            <p className="text-[14px] sm:text-[15px] text-[var(--muted-foreground)] leading-[1.65] font-light mb-4">
              Our 100% amber glass vessels are infinitely reusable. Return four empties with our prepaid label to receive a complimentary refill of your choice.
            </p>
            <Link
              to="/refills"
              className="font-label text-[11px] tracking-[0.12em] text-[var(--primary)] hover:underline inline-block"
            >
              Order refills & returns &rarr;
            </Link>
          </div>

        </div>

      </div>

      {/* Giant 'oda' wordmark across the full width at the very bottom in Instrument Serif at 22vw, cropped slightly by viewport bottom */}
      <div className="w-full flex justify-center items-end select-none pointer-events-none -mb-[4vw] overflow-hidden">
        <span className="font-serif text-[22vw] leading-[0.72] tracking-[-0.05em] text-[var(--foreground)]/10 text-center font-normal block transform translate-y-[8%]">
          oda
        </span>
      </div>
    </footer>
  );
}
