import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, Instagram, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="w-full pt-section-gap pb-8 bg-surface-container-lowest border-t border-primary/10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="md:col-span-1">
          <Link to="/" className="font-editorial text-2xl text-primary mb-4 block tracking-widest uppercase">
            Lunaire
          </Link>
          <p className="font-ui text-sm text-on-surface-variant leading-relaxed max-w-xs">
            Defining midnight luxury through minimalist craftsmanship, noble fabrics, and tactile elegance. Elevating your quietest hours.
          </p>
        </div>
        
        <div className="flex flex-col space-y-3">
          <h4 className="font-ui font-semibold text-xs text-primary uppercase tracking-widest mb-2">
            Collections
          </h4>
          <Link to="/collections" className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-ui text-sm">
            Silk Dreams
          </Link>
          <Link to="/collections" className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-ui text-sm">
            Lace Nights
          </Link>
          <Link to="/collections" className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-ui text-sm">
            Cotton Comfort
          </Link>
          <Link to="/about" className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-ui text-sm">
            Our Story
          </Link>
        </div>

        <div className="flex flex-col space-y-3">
          <h4 className="font-ui font-semibold text-xs text-primary uppercase tracking-widest mb-2">
            Support
          </h4>
          <a href="#" className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-ui text-sm">
            Shipping & Returns
          </a>
          <Link to="/contact" className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-ui text-sm">
            Contact Us
          </Link>
          <a href="#" className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-ui text-sm">
            Privacy Policy
          </a>
        </div>

        <div>
          <h4 className="font-ui font-semibold text-xs text-primary uppercase tracking-widest mb-4">
            Journal
          </h4>
          <p className="text-on-surface-variant font-ui text-xs leading-relaxed mb-4">
            Join our inner circle for exclusive updates, private sales, and midnight musings.
          </p>
          {subscribed ? (
            <p className="text-primary font-editorial text-sm italic animate-fade-in">
              Thank you. You are now inside the circle.
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex border-b border-primary/30 py-2 items-center">
              <input
                className="bg-transparent outline-none flex-grow text-on-surface placeholder:text-outline/55 text-sm font-ui border-none focus:ring-0 px-0"
                placeholder="Email address"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="text-primary hover:opacity-80 transition-opacity p-1">
                <Send size={16} strokeWidth={1.5} />
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-16 pt-8 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-on-surface-variant font-ui text-[10px] tracking-widest uppercase opacity-65">
          © 2026 Lunaire. All rights reserved.
        </p>
        <div className="flex gap-6 items-center">
          <a href="#" className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5 text-xs font-ui">
            <Instagram size={14} /> Instagram
          </a>
          <a href="#" className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5 text-xs font-ui">
            <Mail size={14} /> Pinterest
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
