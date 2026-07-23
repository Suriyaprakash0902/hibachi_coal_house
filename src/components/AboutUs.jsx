import React from 'react';
import aboutImg from '../assets/new/gallery-2.jpeg';

const AboutUs = () => {
  return (
    <section className="bg-dark py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1 space-y-6 relative z-20">
          <h4 className="text-primary tracking-[0.3em] uppercase text-xs font-bold mb-2">Amazing Experience</h4>
          <div className="w-16 h-1 bg-primary"></div>
          <h2 className="text-4xl md:text-5xl font-serif text-light font-black leading-tight italic">
            "We are not just a takeaway. We are a cosmic invitation to feel, to taste, and to remember."
          </h2>
          <div className="w-full flex items-center gap-4 py-4 opacity-50">
             <div className="h-px bg-primary flex-1"></div>
             <span className="text-primary text-2xl">❦</span>
             <div className="h-px bg-primary flex-1"></div>
          </div>
          <p className="text-light/70 font-sans leading-relaxed text-lg">
            At Hibachi Coal House, our journey began with a simple vision: to bring the authentic, smoky flavors of traditional coal-fired cooking to your table. We meticulously source our ingredients and prepare every dish with passion.
          </p>
          <div className="flex gap-12 pt-8">
            <div>
              <div className="text-5xl font-black text-white font-serif">150+</div>
              <div className="text-primary text-xs tracking-widest uppercase font-bold mt-2">Daily<br/>Orders</div>
            </div>
            <div>
              <div className="text-5xl font-black text-white font-serif">30+</div>
              <div className="text-primary text-xs tracking-widest uppercase font-bold mt-2">Special<br/>Dishes</div>
            </div>
            <div>
              <div className="text-5xl font-black text-white font-serif">3+</div>
              <div className="text-primary text-xs tracking-widest uppercase font-bold mt-2">Expert<br/>Chefs</div>
            </div>
          </div>
        </div>
        <div className="flex-1 relative w-full h-[500px]">
          <div className="absolute inset-0 bg-gradient-to-r from-dark to-transparent z-10 md:hidden"></div>
          <img src={aboutImg} alt="Experience" className="absolute inset-0 w-full h-full object-cover rounded-sm shadow-2xl z-0" />
          <div className="absolute -inset-4 border border-primary/30 rounded-sm z-0 translate-x-4 translate-y-4 hidden md:block"></div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
