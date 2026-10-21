export function MarqueeStrip() {
  const values = [
    "Fragrance-free",
    "Refillable glass",
    "Vegan",
    "Made in small batches",
    "Nothing you can't pronounce",
  ];

  // Repeat sequence 4 times so translation is continuous and smooth
  const items = [...values, ...values, ...values, ...values];

  return (
    <section 
      aria-label="Brand Values"
      className="w-full border-y border-[var(--border)] py-5 overflow-hidden bg-[var(--background)] group"
    >
      <div className="animate-marquee flex items-center whitespace-nowrap cursor-default">
        {items.map((item, index) => (
          <div key={index} className="flex items-center mx-6 sm:mx-8">
            <span className="font-label text-[12px] tracking-[0.18em] text-[var(--foreground)] uppercase font-medium">
              {item}
            </span>
            <span className="ml-6 sm:ml-8 text-[var(--primary)] text-sm select-none" aria-hidden="true">
              *
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
