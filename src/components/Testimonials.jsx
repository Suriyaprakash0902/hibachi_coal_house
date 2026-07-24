import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const reviews = [
    { name: 'Arjun K.', text: 'The smoky flavor of the pulled mutton burrito is absolutely out of this world! Best I have ever had.' },
    { name: 'Sarah M.', text: 'Hibachi Coal House redefines takeaway. The ambiance and the perfectly spiced chilli chicken make it a weekly ritual.' },
    { name: 'Priya R.', text: 'Their Thai chilli fried rice and Peri Peri BBQ are phenomenal. You can actually taste the authenticity of the coal fire.' }
  ];

  return (
    <section className="bg-darker py-16 md:py-24 relative overflow-hidden border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
        <h4 className="text-primary tracking-[0.3em] uppercase text-xs md:text-sm font-bold mb-3">What They Say</h4>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-light mb-10 md:mb-16 tracking-wide">
          Client <span className="text-primary">Testimonials</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {reviews.map((rev, idx) => (
            <div key={idx} className="bg-dark/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10 hover:border-primary/40 transition-all duration-500 shadow-xl hover:shadow-[0_0_30px_rgba(255,184,0,0.15)] flex flex-col items-center text-center transform hover:-translate-y-1 relative">
              <Quote className="text-primary/20 absolute top-4 right-4" size={32} />
              
              <div className="flex gap-1 mb-5 text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="fill-primary text-primary drop-shadow-[0_0_6px_rgba(255,184,0,0.4)]" />
                ))}
              </div>
              
              <p className="text-light/80 font-sans italic mb-6 leading-relaxed text-sm md:text-base flex-1">
                "{rev.text}"
              </p>
              
              <div className="mt-auto pt-4 border-t border-white/5 w-full">
                <h4 className="text-white font-bold tracking-widest uppercase text-xs md:text-sm">- {rev.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
