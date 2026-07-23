import React from 'react';
import { ShieldCheck, Leaf, Utensils, PartyPopper } from 'lucide-react';

const OurStrength = () => {
  return (
    <section className="bg-[#121212] py-20 border-y border-white/10 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h4 className="text-primary tracking-[0.3em] uppercase text-xs font-bold mb-4">Why Choose Us</h4>
        <div className="flex justify-center mb-8">
          <div className="w-24 h-6 relative flex items-center justify-center text-primary">
            <span className="block border-t border-primary w-8"></span>
            <span className="mx-2 text-xl">❦</span>
            <span className="block border-t border-primary w-8"></span>
          </div>
        </div>
        <h2 className="text-4xl md:text-5xl font-serif text-light mb-16">Our Strength</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center group">
            <div className="w-24 h-24 mb-6 rounded-full border border-primary/20 flex items-center justify-center bg-[#1a1a1a] transition-transform duration-500 group-hover:-translate-y-2 group-hover:border-primary/60 shadow-[0_0_15px_rgba(255,184,0,0.1)] group-hover:shadow-[0_0_25px_rgba(255,184,0,0.3)]">
              <Leaf size={32} className="text-primary font-light" />
            </div>
            <h3 className="text-lg font-sans text-light font-medium tracking-wide">Hygienic Food</h3>
          </div>
          <div className="flex flex-col items-center group">
            <div className="w-24 h-24 mb-6 rounded-full border border-primary/20 flex items-center justify-center bg-[#1a1a1a] transition-transform duration-500 group-hover:-translate-y-2 group-hover:border-primary/60 shadow-[0_0_15px_rgba(255,184,0,0.1)] group-hover:shadow-[0_0_25px_rgba(255,184,0,0.3)]">
              <ShieldCheck size={32} className="text-primary font-light" />
            </div>
            <h3 className="text-lg font-sans text-light font-medium tracking-wide">Fresh Environment</h3>
          </div>
          <div className="flex flex-col items-center group">
            <div className="w-24 h-24 mb-6 rounded-full border border-primary/20 flex items-center justify-center bg-[#1a1a1a] transition-transform duration-500 group-hover:-translate-y-2 group-hover:border-primary/60 shadow-[0_0_15px_rgba(255,184,0,0.1)] group-hover:shadow-[0_0_25px_rgba(255,184,0,0.3)]">
              <Utensils size={32} className="text-primary font-light" />
            </div>
            <h3 className="text-lg font-sans text-light font-medium tracking-wide">Skilled Chefs</h3>
          </div>
          <div className="flex flex-col items-center group">
            <div className="w-24 h-24 mb-6 rounded-full border border-primary/20 flex items-center justify-center bg-[#1a1a1a] transition-transform duration-500 group-hover:-translate-y-2 group-hover:border-primary/60 shadow-[0_0_15px_rgba(255,184,0,0.1)] group-hover:shadow-[0_0_25px_rgba(255,184,0,0.3)]">
              <PartyPopper size={32} className="text-primary font-light" />
            </div>
            <h3 className="text-lg font-sans text-light font-medium tracking-wide">Event & Party</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStrength;
