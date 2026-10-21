import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Mail, MapPin, Clock, Check, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'General Question',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

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
            CUSTOMER CARE & ENQUIRIES
          </span>
          <h1 className="font-display-h1 text-[var(--foreground)] mb-6">
            Get in <span className="font-serif italic font-normal text-[var(--primary)]">touch</span>.
          </h1>
          <p className="text-[18px] sm:text-[20px] text-[var(--foreground)]/80 font-light leading-[1.7]">
            Whether you need guidance choosing formulations for reactive skin, want to check batch refill dates, or just want to say hello.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Workshop & Contact Information */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-2xl bg-[var(--card)]/40 border border-[var(--border)] space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-[var(--card)] flex items-center justify-center text-[var(--primary)] shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <h3 className="font-serif text-[20px] text-[var(--foreground)] mb-1">
                    Peak District Workshop
                  </h3>
                  <address className="not-italic text-[15px] text-[var(--foreground)]/80 font-light leading-[1.6]">
                    Oda Skin Ltd<br />
                    Station Road, Hathersage<br />
                    Hope Valley, Derbyshire, S32 1DD<br />
                    United Kingdom
                  </address>
                </div>
              </div>

              <div className="flex items-start space-x-4 pt-4 border-t border-[var(--border)]/70">
                <div className="w-10 h-10 rounded-full bg-[var(--card)] flex items-center justify-center text-[var(--primary)] shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <h3 className="font-serif text-[20px] text-[var(--foreground)] mb-1">
                    Direct Email
                  </h3>
                  <a
                    href="mailto:hello@odaskin.co.uk"
                    className="text-[15px] text-[var(--primary)] hover:underline font-light"
                  >
                    hello@odaskin.co.uk
                  </a>
                  <p className="text-[13px] text-[var(--muted-foreground)] mt-1">
                    We respond within 24 hours, Monday to Friday.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 pt-4 border-t border-[var(--border)]/70">
                <div className="w-10 h-10 rounded-full bg-[var(--card)] flex items-center justify-center text-[var(--primary)] shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <h3 className="font-serif text-[20px] text-[var(--foreground)] mb-1">
                    Studio Consultations
                  </h3>
                  <p className="text-[14px] text-[var(--foreground)]/80 font-light">
                    Private skin consultations and refill returns are available Thursdays and Fridays by appointment.
                  </p>
                </div>
              </div>
            </div>

            {/* Note box */}
            <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)]">
              <span className="font-label text-[11px] tracking-[0.12em] text-[var(--primary)] uppercase block mb-1">
                Refill Returns
              </span>
              <p className="text-[14px] text-[var(--foreground)]/80 font-light leading-[1.6]">
                Returning 4 empty glass vessels? Print your complimentary return label from our{' '}
                <Link to="/refills" className="text-[var(--primary)] underline underline-offset-2">
                  Circularity Portal
                </Link>.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-12 rounded-3xl bg-[var(--card)]/30 border border-[var(--border)]">
              <h2 className="font-serif text-[28px] sm:text-[32px] text-[var(--foreground)] mb-2">
                Send a Message
              </h2>
              <p className="text-[15px] text-[var(--muted-foreground)] font-light mb-8">
                Tell us about your skin or your enquiry. Our Derbyshire team reads every note.
              </p>

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="font-label text-[11px] tracking-[0.12em] text-[var(--foreground)] block mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Hannah Thorne"
                          className="w-full px-5 py-3.5 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:border-[var(--primary)] text-[15px]"
                        />
                      </div>

                      <div>
                        <label className="font-label text-[11px] tracking-[0.12em] text-[var(--foreground)] block mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="hannah@example.co.uk"
                          className="w-full px-5 py-3.5 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:border-[var(--primary)] text-[15px]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-label text-[11px] tracking-[0.12em] text-[var(--foreground)] block mb-2">
                        Subject
                      </label>
                      <select
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        className="w-full px-5 py-3.5 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:border-[var(--primary)] text-[15px]"
                      >
                        <option value="General Question">General Question</option>
                        <option value="Skin Consultation">Skin Consultation (Sensitive / Reactive)</option>
                        <option value="Refill Scheme">Refill Scheme & Returns</option>
                        <option value="Press & Stockists">Press & Independent Stockists</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-label text-[11px] tracking-[0.12em] text-[var(--foreground)] block mb-2">
                        Your Note *
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="How can we help your routine?"
                        className="w-full px-5 py-3.5 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:border-[var(--primary)] text-[15px] resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-8 py-4 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[#a85b42] transition-colors font-label text-[12px] tracking-[0.14em] flex items-center space-x-2 cursor-pointer shadow-sm"
                    >
                      <Send size={15} />
                      <span>Send note to workshop</span>
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-message"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] text-center space-y-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-[var(--primary)] text-white flex items-center justify-center mx-auto">
                      <Check size={22} strokeWidth={2} />
                    </div>
                    <h3 className="font-serif text-[26px] text-[var(--foreground)]">
                      Thank you, {formData.name}.
                    </h3>
                    <p className="text-[15px] text-[var(--foreground)]/80 font-light max-w-md mx-auto leading-[1.6]">
                      Your note has reached our apothecary table in Hathersage. One of our formulation team members will reply to <span className="font-medium text-[var(--foreground)]">{formData.email}</span> within 24 hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', topic: 'General Question', message: '' });
                      }}
                      className="mt-4 font-label text-[11px] tracking-[0.12em] text-[var(--primary)] underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
