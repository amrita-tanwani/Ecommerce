import { ArrowLeft, Shield, Truck, RefreshCw, HeartHandshake, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

export function TermsPage() {
  const sections = [
    {
      icon: Shield,
      title: '1. Small-Batch Craft & Freshness Window',
      content: [
        'All five Oda formulations are hand-blended in Derbyshire in limited micro-batches of 200 bottles. Because we do not rely on aggressive synthetic parabens or chemical stabilisers, our products have a 12-month shelf life unopened, and 6 months once opened.',
        'Batch numbers and bottling dates are stamped cleanly on the base of every amber vessel.',
      ],
    },
    {
      icon: Truck,
      title: '2. Delivery & Carbon-Neutral Shipping',
      content: [
        'Standard nationwide delivery is complimentary on all orders over Rs. 8,000. For orders under Rs. 8,000, shipping is charged at a flat Rs. 350 via tracked courier service.',
        'All packaging is 100% paper-based, biodegradable, and tape-free. Parcels are carbon-offset directly through regional woodland restoration projects in the Peak District National Park.',
      ],
    },
    {
      icon: RefreshCw,
      title: '3. The Circular Refill Scheme Guarantee',
      content: [
        'Our glass vessels are engineered for lifelong durability. When you have finished four bottles or jars, you can request a prepaid carbon-neutral return label through our Circularity Portal.',
        'Upon receipt at our Hathersage workshop, we thoroughly wash, sterilise, and refill the vessels. As a token of gratitude for supporting closed-loop beauty, your fourth returned bottle qualifies you for a complimentary 150ml Cleanser or Toner of your choice.',
      ],
    },
    {
      icon: HeartHandshake,
      title: '4. 30-Day Sensitive Skin Guarantee',
      content: [
        'We understand that hypersensitive or reactive skin can be unpredictable. If an Oda formulation causes an adverse reaction within 30 days of receipt, simply contact us at hello@odaskin.co.uk.',
        'We will either recommend a gentle adjustment to your routine or provide a full refund, no interrogation required.',
      ],
    },
    {
      icon: Eye,
      title: '5. Formulation Transparency & Patch Testing',
      content: [
        'We believe in radical clarity. Every ingredient is listed on our website with its common name and botanical origin. We never hide behind the umbrella term "fragrance" or "parfum".',
        'While our formulations are hypoallergenic and free from essential oils, we always recommend conducting a 24-hour patch test on the inner forearm prior to full facial application.',
      ],
    },
  ];

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
            LEGAL, CARE & TRANSPARENCY
          </span>
          <h1 className="font-display-h1 text-[var(--foreground)] mb-6">
            Our <span className="font-serif italic font-normal text-[var(--primary)]">terms</span> & policies.
          </h1>
          <p className="text-[18px] sm:text-[20px] text-[var(--foreground)]/80 font-light leading-[1.7]">
            Written in plain, honest language. Here is how we run our workshop, manage circular refills, and protect your skin and peace of mind.
          </p>
          <span className="font-label text-[11px] tracking-[0.12em] text-[var(--muted-foreground)] mt-4 block">
            Last revised: May 2026 · Oda Skin Ltd (UK Reg. 14920491)
          </span>
        </div>

        {/* Terms Sections */}
        <div className="max-w-4xl space-y-10 mb-20">
          {sections.map((sec) => {
            const Icon = sec.icon;
            return (
              <div
                key={sec.title}
                className="p-8 sm:p-10 rounded-2xl bg-[var(--card)]/30 border border-[var(--border)]"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-[var(--card)] flex items-center justify-center text-[var(--primary)] shrink-0">
                    <Icon size={17} />
                  </div>
                  <h2 className="font-serif text-[24px] sm:text-[28px] text-[var(--foreground)]">
                    {sec.title}
                  </h2>
                </div>

                <div className="space-y-4 text-[16px] text-[var(--foreground)]/80 font-light leading-[1.75] pl-0 sm:pl-12">
                  {sec.content.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer contact nudge */}
        <div className="p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex flex-col sm:flex-row items-center justify-between max-w-4xl">
          <p className="text-[15px] text-[var(--foreground)]/80 font-light mb-4 sm:mb-0">
            Have a question about our policies or wholesale terms?
          </p>
          <Link
            to="/contact"
            className="px-6 py-3 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[#a85b42] transition-colors font-label text-[11px] tracking-[0.14em]"
          >
            Contact Customer Care
          </Link>
        </div>

      </div>
    </div>
  );
}
