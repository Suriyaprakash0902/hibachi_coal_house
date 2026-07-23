import React from 'react';
import { Tag, Gift, Percent } from 'lucide-react';

const staticOffers = [
  {
    id: 1,
    title: 'Weekend Coal Grill Special',
    description: 'Get 15% off on all signature coal-fired BBQ platters every Saturday & Sunday.',
    discount: '15% OFF',
  },
  {
    id: 2,
    title: 'Family Feast Combo',
    description: 'Order any 3 main course dishes and get a complimentary signature starter & drink.',
    discount: 'COMBO DEAL',
  },
  {
    id: 3,
    title: 'Chef Smoky Special',
    description: 'Special discount on master chef signature peri-peri charcoal grills.',
    discount: 'SPECIAL',
  }
];

const Offers = () => {
  return (
    <div className="min-h-screen bg-dark py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-4">
            Exclusive <span className="text-primary">Offers</span>
          </h1>
          <div className="w-24 h-1.5 bg-primary mx-auto rounded mb-6"></div>
          <p className="text-light/70 max-w-2xl mx-auto text-lg">
            Enjoy premium coal-fired experiences at a fraction of the cost. Check out our latest deals and discounts!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {staticOffers.map((offer) => (
            <div 
              key={offer.id} 
              className="bg-darker rounded-2xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-500 group shadow-2xl hover:shadow-[0_0_40px_rgba(255,184,0,0.2)] transform hover:-translate-y-2 flex flex-col"
            >
              <div className="p-8 flex-1 flex flex-col">
                <div className="bg-primary text-darker font-black text-xs uppercase tracking-wider px-3 py-1.5 rounded-md w-max mb-4 shadow-md flex items-center gap-1.5">
                  <Percent size={14} /> {offer.discount}
                </div>

                <h3 className="text-2xl font-black text-white mb-3 uppercase tracking-wide group-hover:text-primary transition-colors">{offer.title}</h3>
                <p className="text-light/70 flex-1 mb-6 leading-relaxed">
                  {offer.description}
                </p>
                
                <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between text-sm font-bold text-light/50">
                  <span className="flex items-center gap-2"><Tag size={16} className="text-primary"/> Limited Time Deal</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Offers;
