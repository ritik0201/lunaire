import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart, PRODUCTS } from '../context/CartContext';
import { Star, ArrowRight, MessageSquare } from 'lucide-react';

const heroBedroom = '/assets/images/hero_bedroom.png';
const silkDreams = '/assets/images/silk_dreams.png';
const laceNights = '/assets/images/lace_nights.png';
const cottonComfort = '/assets/images/cotton_comfort.png';

const Home = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [scrollY, setScrollY] = useState(0);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for scroll reveal
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.08 }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const bestSellers = PRODUCTS.filter(p => p.bestSeller || p.id === 'cloud-cotton-set').slice(0, 4);

  return (
    <div className="w-full">
      {/* Parallax Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroBedroom}
            alt="Lunaire Luxury Bedroom"
            className="w-full h-full object-cover brightness-[0.25] parallax-bg"
            style={{ transform: `translateY(${scrollY * 0.35}px) scale(1.05)` }}
          />
        </div>
        <div className="relative z-10 text-center px-margin-mobile md:px-margin-desktop max-w-4xl animate-fade-in">
          <h1 className="font-editorial text-4xl md:text-7xl text-primary mb-6 leading-tight">
            Dress the Night in Elegance
          </h1>
          <p className="font-ui text-base md:text-lg text-on-surface-variant mb-10 max-w-2xl mx-auto leading-relaxed">
            Premium sleepwear & loungewear crafted for the woman who cherishes every quiet moment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate('/shop')}
              className="w-full sm:w-auto bg-primary text-surface font-ui text-xs uppercase tracking-widest font-semibold py-5 px-10 hover:bg-primary-fixed transition-all duration-400 active:scale-95 shadow-xl shadow-primary/10"
            >
              Shop Now
            </button>
            <button
              onClick={() => navigate('/collections')}
              className="w-full sm:w-auto border border-primary/50 text-primary font-ui text-xs uppercase tracking-widest font-semibold py-5 px-10 hover:bg-primary/5 transition-all duration-400 active:scale-95"
            >
              View Collections
            </button>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
          <span className="text-primary text-xs uppercase tracking-[0.2em] font-ui">Scroll Down</span>
        </div>
      </section>

      {/* USP Strip */}
      <div className="bg-primary py-4.5 w-full relative z-10">
        <div className="max-w-container-max mx-auto px-margin-desktop flex flex-col md:flex-row justify-around items-center gap-4 text-surface font-ui text-xs font-semibold uppercase tracking-widest">
          <span className="flex items-center gap-2">✦ Premium Mulberry Silk</span>
          <span className="flex items-center gap-2">✦ Free Shipping above ₹999</span>
          <span className="flex items-center gap-2">✦ 15-day Easy Returns</span>
        </div>
      </div>

      {/* Featured Collections Section */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative z-10">
        <div className="text-center mb-16 reveal">
          <span className="font-ui text-xs text-primary mb-3 block uppercase tracking-[0.35em]">Curation</span>
          <h2 className="font-editorial text-3xl md:text-5xl text-on-surface">The Signature Edit</h2>
          <div className="w-12 h-px bg-primary/30 mx-auto mt-6"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter reveal">
          {/* Card 1 */}
          <div
            onClick={() => navigate('/collections')}
            className="group relative overflow-hidden aspect-[3/4] cursor-pointer gold-border"
          >
            <img
              src={silkDreams}
              alt="Silk Dreams Collection"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent flex flex-col justify-end p-8">
              <h3 className="font-editorial text-2xl text-white mb-2">Silk Dreams</h3>
              <span className="font-ui text-xs text-primary flex items-center gap-2 uppercase tracking-widest">
                Explore <ArrowRight size={12} />
              </span>
            </div>
          </div>

          {/* Card 2 */}
          <div
            onClick={() => navigate('/collections')}
            className="group relative overflow-hidden aspect-[3/4] cursor-pointer gold-border md:translate-y-12 transition-transform duration-500"
          >
            <img
              src={laceNights}
              alt="Lace Nights Collection"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent flex flex-col justify-end p-8">
              <h3 className="font-editorial text-2xl text-white mb-2">Lace Nights</h3>
              <span className="font-ui text-xs text-primary flex items-center gap-2 uppercase tracking-widest">
                Explore <ArrowRight size={12} />
              </span>
            </div>
          </div>

          {/* Card 3 */}
          <div
            onClick={() => navigate('/collections')}
            className="group relative overflow-hidden aspect-[3/4] cursor-pointer gold-border"
          >
            <img
              src={cottonComfort}
              alt="Cotton Comfort Collection"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent flex flex-col justify-end p-8">
              <h3 className="font-editorial text-2xl text-white mb-2">Cotton Comfort</h3>
              <span className="font-ui text-xs text-primary flex items-center gap-2 uppercase tracking-widest">
                Explore <ArrowRight size={12} />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-section-gap bg-surface-container-lowest relative z-10">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 reveal">
            <div>
              <span className="font-ui text-xs text-primary mb-3 block uppercase tracking-[0.35em]">Treasured</span>
              <h2 className="font-editorial text-3xl md:text-5xl text-on-surface">Most Loved Designs</h2>
            </div>
            <Link
              to="/shop"
              className="mt-6 md:mt-0 font-ui text-xs text-primary uppercase tracking-widest border-b border-primary/30 pb-1 hover:border-primary transition-all duration-300"
            >
              Shop All Products
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter reveal">
            {bestSellers.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                className="group cursor-pointer flex flex-col h-full"
              >
                <div className="relative aspect-[4/5] overflow-hidden mb-6 border border-primary/10 transition-colors duration-500 group-hover:border-primary/40 bg-surface-container">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {product.tag && (
                    <div className="absolute top-4 left-4 bg-tertiary/60 backdrop-blur-md px-3 py-1 border border-primary/20">
                      <span className="font-ui text-[9px] font-semibold text-primary uppercase tracking-widest">
                        {product.tag}
                      </span>
                    </div>
                  )}
                </div>
                <div className="text-center mt-auto">
                  <h4 className="font-ui text-base text-on-surface group-hover:text-primary transition-colors duration-400">
                    {product.name}
                  </h4>
                  <p className="font-ui text-xs text-primary mt-2 font-semibold tracking-wider">
                    ₹{product.price.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Love Notes (Testimonials) */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative z-10">
        <div className="text-center mb-16 reveal">
          <span className="font-ui text-xs text-primary mb-3 block uppercase tracking-[0.35em]">Testimonials</span>
          <h2 className="font-editorial text-3xl md:text-5xl text-on-surface">Love Notes</h2>
          <div className="w-12 h-px bg-primary/30 mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 reveal">
          {/* Testimonial 1 */}
          <div className="glass-card p-8 md:p-10 flex flex-col items-center text-center rounded-sm">
            <div className="flex text-primary mb-6 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#e6c364" stroke="none" />
              ))}
            </div>
            <p className="font-editorial text-lg text-on-surface-variant italic mb-8 leading-relaxed">
              "The silk slip feels like a second skin. I have never felt more elegant, comfortable, and beautiful while just relaxing at home."
            </p>
            <span className="font-ui text-[10px] text-primary uppercase tracking-widest font-semibold">
              — Ananya M.
            </span>
          </div>

          {/* Testimonial 2 */}
          <div className="glass-card p-8 md:p-10 flex flex-col items-center text-center rounded-sm">
            <div className="flex text-primary mb-6 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#e6c364" stroke="none" />
              ))}
            </div>
            <p className="font-editorial text-lg text-on-surface-variant italic mb-8 leading-relaxed">
              "The packaging alone is a sensory experience. Lunaire has truly redefined what loungewear and evening serenity mean to me."
            </p>
            <span className="font-ui text-[10px] text-primary uppercase tracking-widest font-semibold">
              — Rhea S.
            </span>
          </div>

          {/* Testimonial 3 */}
          <div className="glass-card p-8 md:p-10 flex flex-col items-center text-center rounded-sm">
            <div className="flex text-primary mb-6 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#e6c364" stroke="none" />
              ))}
            </div>
            <p className="font-editorial text-lg text-on-surface-variant italic mb-8 leading-relaxed">
              "I gifted the Cotton Set to my sister and she is obsessed. Beautiful texture, airy weave, and impeccable luxury silhouettes."
            </p>
            <span className="font-ui text-[10px] text-primary uppercase tracking-widest font-semibold">
              — Priya K.
            </span>
          </div>
        </div>
      </section>

      {/* Instagram Grid Section */}
      <section className="py-section-gap relative z-10 border-t border-primary/10">
        <div className="text-center mb-16 reveal">
          <span className="font-ui text-xs text-primary mb-3 block uppercase tracking-[0.35em]">Follow Us</span>
          <h2 className="font-editorial text-3xl md:text-5xl text-on-surface">The Lunaire Life</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 reveal">
          {[silkDreams, laceNights, cottonComfort, heroBedroom, silkDreams, laceNights].map((img, i) => (
            <div key={i} className="aspect-square overflow-hidden group border border-surface">
              <img
                src={img}
                alt="Lunaire Lifestyle Post"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.7] group-hover:brightness-100"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto reveal relative z-10">
        <div className="glass-card p-12 md:p-20 text-center relative overflow-hidden rounded-sm">
          <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
          <h2 className="font-editorial text-3xl md:text-5xl text-primary mb-4">Join the Lunaire Circle</h2>
          <p className="font-ui text-sm text-on-surface-variant mb-10 max-w-lg mx-auto leading-relaxed">
            Be the first to explore new midnight collections and receive exclusive invitations to private events.
          </p>
          <div className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow bg-surface border-b border-primary/30 text-on-surface px-6 py-4 focus:border-primary focus:ring-0 outline-none transition-all placeholder:text-outline/50 font-ui text-sm rounded-sm"
            />
            <button className="bg-primary text-surface font-ui text-xs uppercase tracking-widest font-semibold py-4 px-10 hover:bg-primary-fixed transition-all active:scale-95 whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919999999999"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[60] bg-[#25D366] text-white p-4.5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center"
        aria-label="Contact us on WhatsApp"
      >
        <MessageSquare size={20} fill="currentColor" stroke="none" />
      </a>
    </div>
  );
};

export default Home;
