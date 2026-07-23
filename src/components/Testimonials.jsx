import React from 'react';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const reviews = [
    { name: 'Arjun K.', text: 'The smoky flavor of the pulled mutton burrito is absolutely out of this world! Best I have ever had.' },
    { name: 'Sarah M.', text: 'Hibachi Coal House redefines takeaway. The ambiance and the perfectly spiced chilli chicken make it a weekly ritual.' },
    { name: 'Priya R.', text: 'Their Thai chilli fried rice and Peri Peri BBQ are phenomenal. You can actually taste the authenticity of the coal fire.' }
  ];

  return (
    <section className="bg-[#121212] py-24 relative overflow-hidden border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h4 className="text-primary tracking-[0.3em] uppercase text-xs font-bold mb-4">What They Say</h4>
        <h2 className="text-4xl md:text-5xl font-serif text-light mb-16">Client Testimonials</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div key={idx} className="bg-darker p-8 rounded-sm border border-white/10 hover:border-primary/30 transition-colors duration-500 flex flex-col items-center">
              <div className="flex gap-1 mb-6 text-primary">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-primary" />)}
              </div>
              <p className="text-light/70 font-sans italic mb-8 leading-relaxed">"{rev.text}"</p>
              <div className="mt-auto">
                <h4 className="text-white font-bold tracking-widest uppercase text-sm">- {rev.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
