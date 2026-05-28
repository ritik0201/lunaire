import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { getCartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawer on path change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const activeClass = (path) => {
    return location.pathname === path
      ? "text-primary border-b border-primary pb-1"
      : "text-on-surface-variant hover:text-primary transition-colors duration-300";
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#0A0A0A]/85 backdrop-blur-2xl border-b border-primary/20 shadow-2xl shadow-black/80 h-20"
          : "bg-transparent h-24 border-b border-transparent"
      }`}
    >
      <nav className="flex justify-between items-center h-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="flex items-center gap-12">
          <Link
            to="/"
            className="font-editorial text-2xl md:text-3xl text-primary tracking-widest uppercase focus:outline-none"
          >
            Lunaire
          </Link>
          <div className="hidden md:flex gap-8">
            <Link to="/" className={`font-ui text-xs uppercase tracking-widest ${activeClass('/')}`}>
              Home
            </Link>
            <Link to="/shop" className={`font-ui text-xs uppercase tracking-widest ${activeClass('/shop')}`}>
              Shop
            </Link>
            <Link to="/collections" className={`font-ui text-xs uppercase tracking-widest ${activeClass('/collections')}`}>
              Collections
            </Link>
            <Link to="/about" className={`font-ui text-xs uppercase tracking-widest ${activeClass('/about')}`}>
              About
            </Link>
            <Link to="/contact" className={`font-ui text-xs uppercase tracking-widest ${activeClass('/contact')}`}>
              Contact
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Link
            to="/cart"
            className="relative p-2 rounded-full text-primary hover:bg-primary/5 transition-colors duration-400 active:scale-95"
            aria-label="Shopping Cart"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {getCartCount() > 0 && (
              <span className="absolute top-0 right-0 bg-secondary text-surface-container-lowest font-ui font-semibold text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center animate-bounce shadow-md">
                {getCartCount()}
              </span>
            )}
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-full text-primary hover:bg-primary/5 transition-colors duration-400 active:scale-95 md:hidden"
            aria-label="Toggle Menu"
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      {/* Premium Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-50 bg-surface md:hidden transition-all duration-500 ease-in-out ${
          isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
        }`}
      >
        <div className="flex justify-between items-center h-24 px-margin-mobile border-b border-primary/15">
          <span className="font-editorial text-2xl text-primary tracking-widest uppercase">
            Lunaire
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full text-primary hover:bg-primary/5 transition-colors active:scale-95"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex flex-col items-center justify-center gap-6 h-[calc(100vh-120px)] overflow-y-auto">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="font-editorial text-3xl text-on-surface hover:text-primary transition-colors tracking-wide"
          >
            Home
          </Link>
          <Link
            to="/shop"
            onClick={() => setIsOpen(false)}
            className="font-editorial text-3xl text-on-surface hover:text-primary transition-colors tracking-wide"
          >
            Shop
          </Link>
          <Link
            to="/collections"
            onClick={() => setIsOpen(false)}
            className="font-editorial text-3xl text-on-surface hover:text-primary transition-colors tracking-wide"
          >
            Collections
          </Link>
          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="font-editorial text-3xl text-on-surface hover:text-primary transition-colors tracking-wide"
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="font-editorial text-3xl text-on-surface hover:text-primary transition-colors tracking-wide"
          >
            Contact
          </Link>
          <Link
            to="/cart"
            onClick={() => setIsOpen(false)}
            className="font-editorial text-3xl text-primary hover:text-primary-fixed transition-colors tracking-wide"
          >
            Your Cart ({getCartCount()})
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
