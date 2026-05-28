import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Diamond, Leaf, Bed, Quote } from 'lucide-react';

const storyHero = '/assets/images/story_hero.png';
const storyChair = '/assets/images/story_chair.png';
const founderMeera = '/assets/images/founder_meera.png';

const About = () => {
  const navigate = useNavigate();

  // Scroll Reveal Observer
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
      { threshold: 0.1 }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full bg-surface">
      {/* About Hero */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={storyHero}
            alt="Lunaire Story Twilight Background"
            className="w-full h-full object-cover brightness-[0.45]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/40 to-surface"></div>
        </div>
        <div className="relative z-10 text-center px-margin-mobile">
          <p className="font-ui text-xs uppercase tracking-[0.35em] text-primary mb-6 reveal">
            ESTABLISHED 2024
          </p>
          <h1 className="font-editorial text-4xl md:text-6xl text-on-surface max-w-4xl mx-auto leading-tight reveal">
            Born from Moonlit Reveries
          </h1>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="reveal">
            <span className="font-ui text-xs uppercase tracking-widest text-primary mb-4 block font-semibold">
              THE ORIGIN
            </span>
            <h2 className="font-editorial text-3xl md:text-4xl text-on-surface mb-8">
              Redefining the Private Hours
            </h2>
            <div className="space-y-6 font-ui text-base md:text-lg text-on-surface-variant leading-relaxed">
              <p>
                Founded by Meera Nair, Lunaire was conceived in the quiet stillness of the midnight hour. After a decade in high-fashion architecture in Milan and New York, Meera realized that the most important space—the one where we dream—was often the most overlooked.
              </p>
              <p>
                Lunaire is not just about apparel; it is a mission to bring the precision of luxury design into the intimacy of your private sanctuary. We believe that the transition from the day's chaos to the night's calm should be marked by fabrics that feel like a second skin and silhouettes that honor the body's need for repose.
              </p>
            </div>
          </div>
          <div className="relative reveal h-[550px] lg:h-[600px]">
            <div className="absolute inset-0 border border-primary/20 translate-x-4 translate-y-4 rounded-sm"></div>
            <img
              src={storyChair}
              alt="Draped silk premium sleepwear"
              className="w-full h-full object-cover relative z-10 rounded-sm border border-primary/10"
            />
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-section-gap bg-surface-container-low">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="text-center mb-16 reveal">
            <h2 className="font-editorial text-3xl md:text-4xl text-on-surface">Our Philosophy</h2>
            <div className="w-12 h-px bg-primary/30 mx-auto mt-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Quality */}
            <div className="bg-surface p-10 border border-primary/10 hover:border-primary/45 transition-all duration-500 reveal group rounded-sm">
              <div className="w-12 h-12 flex items-center justify-center bg-primary/5 text-primary mb-8 group-hover:scale-110 transition-transform duration-300">
                <Diamond size={20} strokeWidth={1.5} />
              </div>
              <h3 className="font-editorial text-2xl text-on-surface mb-4">Unrivaled Quality</h3>
              <p className="font-ui text-sm text-on-surface-variant leading-relaxed">
                Every thread is selected for its longevity and tactile resonance. We source only the finest Grade A mulberry silks and organic cottons.
              </p>
            </div>

            {/* Conscious Crafting */}
            <div className="bg-surface p-10 border border-primary/10 hover:border-primary/45 transition-all duration-500 reveal group rounded-sm">
              <div className="w-12 h-12 flex items-center justify-center bg-primary/5 text-primary mb-8 group-hover:scale-110 transition-transform duration-300">
                <Leaf size={20} strokeWidth={1.5} />
              </div>
              <h3 className="font-editorial text-2xl text-on-surface mb-4">Conscious Crafting</h3>
              <p className="font-ui text-sm text-on-surface-variant leading-relaxed">
                Our production cycle respects the rhythm of the artisans. Small-batch runs ensure zero waste, fair trades, and highly focused craftsmanship.
              </p>
            </div>

            {/* Comfort */}
            <div className="bg-surface p-10 border border-primary/10 hover:border-primary/45 transition-all duration-500 reveal group rounded-sm">
              <div className="w-12 h-12 flex items-center justify-center bg-primary/5 text-primary mb-8 group-hover:scale-110 transition-transform duration-300">
                <Bed size={20} strokeWidth={1.5} />
              </div>
              <h3 className="font-editorial text-2xl text-on-surface mb-4">Absolute Comfort</h3>
              <p className="font-ui text-sm text-on-surface-variant leading-relaxed">
                Design that flows with the breath. Our cuts are engineered to facilitate movement and stillness in equal measure, adapting to the night's calm.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 reveal">
            <img
              src={founderMeera}
              alt="Founder Meera Nair"
              className="w-full aspect-[4/5] object-cover grayscale rounded-sm border border-primary/10 shadow-2xl"
            />
          </div>
          <div className="lg:col-span-7 lg:pl-12 reveal">
            <Quote size={36} className="text-primary mb-6" strokeWidth={1.5} />
            <blockquote className="font-editorial text-2xl md:text-3xl text-on-surface italic mb-8 leading-relaxed">
              "Luxury is not an external display; it is an internal feeling of being completely at home in one's own skin, surrounded by things that whisper, rather than shout."
            </blockquote>
            <div className="border-l-2 border-primary pl-6">
              <p className="font-editorial text-xl text-primary mb-1">Meera Nair</p>
              <p className="font-ui text-xs uppercase tracking-widest text-on-surface-variant font-semibold">
                Founder &amp; Creative Director
              </p>
            </div>
            <div className="mt-8 font-ui text-sm md:text-base text-on-surface-variant max-w-xl leading-relaxed space-y-4">
              <p>
                With a background spanning Milan and New York, Meera Nair brings a global perspective to domestic luxury. Her work has been featured in Architectural Digest and Vogue, always focusing on the intersection of human psychology and physical space.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-center px-margin-mobile border-t border-primary/10 bg-surface-container-lowest">
        <div className="reveal space-y-8">
          <h2 className="font-editorial text-3xl md:text-4xl text-on-surface">Enter the World of Lunaire</h2>
          <button
            onClick={() => navigate('/shop')}
            className="inline-block px-16 py-5 bg-primary text-surface font-ui text-xs uppercase tracking-[0.2em] font-semibold hover:bg-primary-fixed transition-all duration-400 active:scale-95 shadow-xl shadow-primary/10 rounded-sm"
          >
            Explore Collections
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
