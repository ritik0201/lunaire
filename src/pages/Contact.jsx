import React, { useState } from 'react';
import { Mail, Phone, Clock, MessageSquare, Loader2, CheckCircle2 } from 'lucide-react';
const contactSilk = '/assets/images/contact_silk.png';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'order_query',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // idle, sending, success

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('sending');
    
    // Simulate API loading and delay
    setTimeout(() => {
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: 'order_query',
        message: ''
      });
    }, 1500);
  };

  return (
    <div className="w-full bg-surface pt-32 pb-section-gap min-h-screen">
      <main className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto animate-fade-in">
        {/* Page Header */}
        <header className="text-center mb-24">
          <h1 className="font-editorial text-4xl md:text-6xl text-primary mb-4 italic">
            Get in Touch
          </h1>
          <p className="font-ui text-xs uppercase tracking-[0.2em] text-on-surface-variant">
            We reply within 24 hours — always.
          </p>
        </header>

        {/* Content Grid: 1.4fr + 1fr */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-16 items-start">
          
          {/* Contact Form Section */}
          <section className="glass-card p-8 md:p-12 rounded-sm min-h-[450px] flex flex-col justify-center">
            {status === 'success' ? (
              <div className="text-center py-8 space-y-6 animate-fade-in">
                <div className="w-16 h-16 bg-primary/10 text-primary mx-auto rounded-full flex items-center justify-center border border-primary/20 shadow-lg shadow-primary/5">
                  <CheckCircle2 size={32} strokeWidth={1.5} />
                </div>
                <h3 className="font-editorial text-3xl text-primary italic">Message Received</h3>
                <p className="font-ui text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. Your message has been sent successfully. We will review your inquiry and get back to you within 24 hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setStatus('idle')}
                    className="px-10 py-4 border border-primary/50 text-primary hover:bg-primary/5 font-ui text-xs uppercase tracking-widest font-semibold transition-all active:scale-95"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="relative">
                    <label className="font-ui text-[10px] uppercase tracking-widest text-primary/70 mb-2 block font-semibold">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Elias Thorne"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-primary/20 text-on-surface font-ui text-sm py-3 placeholder:text-outline-variant/40 focus:border-primary outline-none focus:ring-0 rounded-none transition-all"
                    />
                  </div>
                  <div className="relative">
                    <label className="font-ui text-[10px] uppercase tracking-widest text-primary/70 mb-2 block font-semibold">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="elias@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-primary/20 text-on-surface font-ui text-sm py-3 placeholder:text-outline-variant/40 focus:border-primary outline-none focus:ring-0 rounded-none transition-all"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="font-ui text-[10px] uppercase tracking-widest text-primary/70 mb-2 block font-semibold">
                    Subject
                  </label>
                  <div className="relative">
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-primary/20 text-on-surface font-ui text-sm py-3 cursor-pointer outline-none focus:ring-0 rounded-none appearance-none pr-8"
                    >
                      <option className="bg-surface text-on-surface" value="order_query">Order Query</option>
                      <option className="bg-surface text-on-surface" value="sizing">Sizing &amp; Fit</option>
                      <option className="bg-surface text-on-surface" value="press">Press &amp; Collaboration</option>
                      <option className="bg-surface text-on-surface" value="other">Other Inquiries</option>
                    </select>
                    <div className="absolute right-0 bottom-3 text-primary pointer-events-none">
                      <ChevronDownIcon />
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <label className="font-ui text-[10px] uppercase tracking-widest text-primary/70 mb-2 block font-semibold">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows="4"
                    placeholder="How can we assist your journey to serenity?"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b border-primary/20 text-on-surface font-ui text-sm py-3 placeholder:text-outline-variant/40 focus:border-primary outline-none focus:ring-0 rounded-none resize-none transition-all"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={status !== 'idle'}
                    className={`w-full md:w-auto px-16 py-5 font-ui text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-400 active:scale-[0.98] rounded-sm flex items-center justify-center gap-3 shadow-xl ${
                      status === 'success'
                        ? 'bg-green-600 text-white shadow-green-600/10'
                        : 'bg-primary text-surface hover:bg-primary-fixed shadow-primary/10'
                    }`}
                  >
                    {status === 'idle' && 'Send Message'}
                    {status === 'sending' && (
                      <>
                        <Loader2 size={14} className="animate-spin" /> Sending...
                      </>
                    )}
                    {status === 'success' && (
                      <>
                        <CheckCircle2 size={14} /> Sent Successfully
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </section>

          {/* Info Column */}
          <aside className="space-y-12">
            {/* Say Hello Card */}
            <div className="glass-card p-10 rounded-sm relative overflow-hidden group">
              <h2 className="font-editorial text-2xl text-primary mb-8">Say Hello</h2>
              <div className="space-y-8 font-ui">
                <div className="flex items-start gap-4">
                  <Mail size={18} className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-primary/70 mb-1 font-semibold">Email</p>
                    <a
                      href="mailto:hello@lunaire.in"
                      className="text-base text-on-surface hover:text-primary transition-colors font-medium"
                    >
                      hello@lunaire.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone size={18} className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-primary/70 mb-1 font-semibold">Phone</p>
                    <p className="text-base text-on-surface font-medium">+1 (888) 555-LUXE</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock size={18} className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-primary/70 mb-1 font-semibold">Operating Hours</p>
                    <p className="text-sm text-on-surface-variant leading-relaxed">Mon – Fri: 09:00 – 18:00 EST</p>
                    <p className="text-sm text-on-surface-variant leading-relaxed">Sat: 10:00 – 14:00 EST</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-12 border-t border-primary/10">
                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-5 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white font-ui text-xs uppercase tracking-widest font-semibold transition-all duration-400 active:scale-95 shadow-lg shadow-[#25D366]/10"
                >
                  <MessageSquare size={16} fill="currentColor" stroke="none" /> Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Atmospheric Visual Card */}
            <div className="rounded-sm overflow-hidden h-[300px] border border-primary/10 relative shadow-2xl group">
              <img
                src={contactSilk}
                alt="Luxury silk textures"
                className="w-full h-full object-cover grayscale opacity-55 transition-transform duration-[2s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-center px-4">
                <p className="font-editorial text-xl text-primary italic">
                  "Designed for the quiet moments."
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

// Simple Chevron Icon
const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export default Contact;
