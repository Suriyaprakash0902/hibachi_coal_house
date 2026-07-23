import React, { useState, useEffect } from 'react';
import { Tag, Loader2, Gift, Percent } from 'lucide-react';
import api from '../api';

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('/storage')) return `https://vazhithunai.ai/backend2/public${url}`;
    return url;
  };

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await api.get('/offers');
        setOffers(res.data);
      } catch (error) {
        console.error('Failed to load offers', error);
      }
      setLoading(false);
    };
    fetchOffers();
  }, []);

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

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-primary" size={64} />
          </div>
        ) : offers.length === 0 ? (
          <div className="bg-darker border border-gray rounded-2xl p-16 text-center max-w-3xl mx-auto shadow-2xl">
            <Gift size={64} className="mx-auto text-light/20 mb-6" />
            <h2 className="text-2xl font-bold text-light mb-2">No Active Offers Right Now</h2>
            <p className="text-light/50">Check back soon for exciting deals on our signature dishes!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offers.map((offer) => (
              <div 
                key={offer.id} 
                className="bg-darker rounded-2xl overflow-hidden border border-gray hover:border-primary/50 transition-all duration-500 group shadow-2xl hover:shadow-[0_0_40px_rgba(255,184,0,0.2)] transform hover:-translate-y-2 flex flex-col"
              >
                <div className="h-56 bg-gray/50 relative overflow-hidden">
                  <img 
                    src={getImageUrl(offer.image) || `https://via.placeholder.com/600x400.png/141414/FFB800?text=${encodeURIComponent(offer.title)}`} 
                    alt={offer.title}
                    className="w-full h-full object-cover z-20 group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-darker via-transparent to-transparent z-20"></div>
                  
                  {offer.discount_info && (
                    <div className="absolute top-4 right-4 bg-primary text-darker font-black text-sm uppercase tracking-wider px-4 py-2 rounded-lg shadow-xl z-30 flex items-center gap-2">
                      <Percent size={16} /> {offer.discount_info}
                    </div>
                  )}
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-black text-white mb-3 uppercase tracking-wide">{offer.title}</h3>
                  <p className="text-light/70 flex-1 mb-6 leading-relaxed">
                    {offer.description || 'Visit our restaurant to learn more about this special offer!'}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-gray flex items-center justify-between text-sm font-bold text-light/50">
                    <span className="flex items-center gap-2"><Tag size={16} className="text-primary"/> Limited Time Deal</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Offers;
