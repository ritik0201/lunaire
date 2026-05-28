import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const silkDreams = '/assets/images/silk_dreams.png';
const laceNights = '/assets/images/lace_nights.png';
const cottonComfort = '/assets/images/cotton_comfort.png';

const Collections = () => {
  const navigate = useNavigate();

  // Scroll Reveal Observer
  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );
    sections.forEach((sec) => {
      sec.classList.add('transition-all', 'duration-1000', 'ease-out', 'opacity-0', 'translate-y-10');
      observer.observe(sec);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full bg-surface">
      {/* Hero Header */}
      <header className="pt-40 pb-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center animate-fade-in">
        <h1 className="font-editorial text-4xl md:text-6xl mb-4 text-on-surface">Collections</h1>
        <p className="font-editorial text-lg text-on-surface-variant max-w-xl mx-auto italic">
          Three worlds. One language: elegance.
        </p>
        <div className="w-12 h-px bg-primary/40 mx-auto mt-12"></div>
      </header>

      {/* Collection 01: Silk Dreams */}
      <section className="mb-section-gap group py-8">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid md:grid-cols-2 items-center gap-gutter">
          <div className="relative overflow-hidden aspect-[4/5] gold-border rounded-sm">
            <img
              src={silkDreams}
              alt="Silk Dreams Collection"
              className="w-full h-full object-cover grayscale-[10%] group-hover:scale-105 transition-transform duration-1000"
            />
          </div>
          <div className="py-12 md:pl-16 flex flex-col justify-center">
            <span className="font-editorial text-primary/10 text-8xl block -mb-8 pointer-events-none select-none">
              01
            </span>
            <h2 className="font-editorial text-3xl md:text-4xl text-primary mb-6">Silk Dreams</h2>
            <p className="font-ui text-base md:text-lg text-on-surface-variant mb-10 leading-relaxed">
              Draped in the finest mulberry silk, this collection reimagines evening repose. Each piece is a masterclass in fluidity, designed to glide against the skin like a whispered promise.
            </p>
            <button
              onClick={() => navigate('/shop?collection=Silk Dreams')}
              className="w-fit inline-flex items-center gap-4 text-primary font-ui text-xs uppercase tracking-widest font-semibold group/link border-b border-primary/30 pb-1 hover:border-primary transition-all duration-300"
            >
              Explore Collection
              <ArrowRight size={14} className="group-hover/link:translate-x-2 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </section>

      {/* Collection 02: Lace Nights (Alternating) */}
      <section className="mb-section-gap group bg-surface-container-lowest/50 py-24">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid md:grid-cols-2 items-center gap-gutter">
          <div className="order-2 md:order-1 py-12 md:pr-16 flex flex-col justify-center">
            <span className="font-editorial text-secondary/15 text-8xl block -mb-8 pointer-events-none select-none">
              02
            </span>
            <h2 className="font-editorial text-3xl md:text-4xl text-on-surface mb-6">Lace Nights</h2>
            <p className="font-ui text-base md:text-lg text-on-surface-variant mb-10 leading-relaxed">
              Romantic, intricate, unforgettable. Our signature lace collection is an ode to the craftsmanship of the night, blending delicate transparency with bold, architectural silhouettes.
            </p>
            <button
              onClick={() => navigate('/shop?collection=Lace Nights')}
              className="w-fit inline-flex items-center gap-4 text-on-surface font-ui text-xs uppercase tracking-widest font-semibold group/link border-b border-on-surface/20 pb-1 hover:border-primary hover:text-primary transition-all duration-300"
            >
              Explore Collection
              <ArrowRight size={14} className="group-hover/link:translate-x-2 transition-transform duration-300" />
            </button>
          </div>
          <div className="order-1 md:order-2 relative overflow-hidden aspect-[4/5] border border-on-surface/10 rounded-sm">
            <img
              src={laceNights}
              alt="Lace Nights Collection"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
          </div>
        </div>
      </section>

      {/* Collection 03: Cotton Comfort */}
      <section className="mb-section-gap group py-8">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid md:grid-cols-2 items-center gap-gutter">
          <div className="relative overflow-hidden aspect-[4/5] border border-secondary/20 rounded-sm">
            <img
              src={cottonComfort}
              alt="Cotton Comfort Collection"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
          </div>
          <div className="py-12 md:pl-16 flex flex-col justify-center">
            <span className="font-editorial text-secondary/10 text-8xl block -mb-8 pointer-events-none select-none">
              03
            </span>
            <h2 className="font-editorial text-3xl md:text-4xl text-secondary mb-6">Cotton Comfort</h2>
            <p className="font-ui text-base md:text-lg text-on-surface-variant mb-10 leading-relaxed">
              Breathable beauty for the everyday. Crafted from organic pima cotton, these essentials bridge the gap between loungewear and couture comfort for the modern minimalist.
            </p>
            <button
              onClick={() => navigate('/shop?collection=Cotton Comfort')}
              className="w-fit bg-primary text-surface font-ui text-xs uppercase tracking-widest font-semibold py-4 px-10 hover:bg-primary-fixed transition-all duration-400 active:scale-95 shadow-xl shadow-primary/5"
            >
              Explore Collection
            </button>
          </div>
        </div>
      </section>

      {/* CTA Inner Circle */}
      <section className="py-section-gap px-margin-mobile border-t border-primary/10 bg-surface-container-lowest">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="font-editorial text-2xl md:text-3xl text-primary mb-6 italic">The Inner Circle</h3>
          <p className="font-ui text-sm text-on-surface-variant mb-8 leading-relaxed">
            Join our curated newsletter for early access to new collections and exclusive midnight drops.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="bg-transparent border-b border-primary/30 py-3 px-2 flex-grow focus:outline-none focus:border-primary transition-colors text-on-surface placeholder:text-outline/40 font-ui text-sm"
            />
            <button className="font-ui text-xs uppercase tracking-widest font-semibold text-primary border border-primary/55 px-10 py-3 hover:bg-primary/5 transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Collections;
