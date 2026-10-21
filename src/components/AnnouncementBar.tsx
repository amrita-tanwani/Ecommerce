export function AnnouncementBar() {
  return (
    <aside 
      aria-label="Announcement"
      className="h-[36px] bg-[var(--primary)] text-[var(--primary-foreground)] flex items-center justify-center px-4 overflow-hidden"
    >
      <p className="font-label text-[11px] sm:text-[12px] tracking-[0.14em] text-center font-medium truncate">
        Free delivery over Rs. 8,000 · Refills now available for every product
      </p>
    </aside>
  );
}
