import React, { useState, useEffect } from 'react';
import { Flame, ArrowRight, Star, Loader2, Utensils, Clock, MapPin, Phone, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../api';
import insideImg from '../assets/images/inside.jpg';
import storeImg from '../assets/images/store.jpg';
import OurStrength from '../components/OurStrength';
import AboutUs from '../components/AboutUs';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeBanner, setActiveBanner] = useState(0);

  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('/storage')) return `https://vazhithunai.ai/backend2/public${url}`;
    return url;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, bannerRes] = await Promise.all([
          api.get('/products'),
          api.get('/admin/banners') // In a real app, you'd use a public endpoint for banners, but this works since no auth middleware is fully strict yet.
        ]);
        setProducts(prodRes.data.slice(0, 6)); 
        setBanners(bannerRes.data.filter(b => b.status));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Auto-slide banners
  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      setActiveBanner(prev => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [banners.length]);
  
  return (
    <div className="overflow-x-hidden bg-dark">
      
      {/* Premium Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden mt-[-100px]">
        {/* Background Image / Overlay */}
        <div className="absolute inset-0 bg-dark z-0">
          <img src={insideImg} alt="Hero Background" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-darker via-darker/60 to-darker/30"></div>
        </div>

        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center mt-20">
          <div className="mb-4 inline-block">
            <span className="font-serif text-primary tracking-[0.3em] uppercase text-sm md:text-base font-bold relative inline-block py-2 border-y border-primary/30">
              Welcome to
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-black text-white mb-6 tracking-wide drop-shadow-2xl leading-tight">
            Hibachi <span className="text-primary block md:inline">Coal House</span>
          </h1>
          
          <p className="font-sans text-lg md:text-xl text-light/90 mb-10 font-light max-w-2xl mx-auto tracking-wide leading-relaxed">
            Where Tradition Meets Taste. Experience authentic flavors forged in fire and smoke.
          </p>
          
          <div className="flex justify-center mt-4">
            <Link to="/menu" className="group relative px-10 py-4 overflow-hidden border border-primary text-primary hover:text-darker transition-colors duration-500 font-sans font-bold uppercase tracking-widest text-sm">
              <span className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></span>
              <span className="relative z-10">View Our Menu</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Info Strip */}
      <section className="bg-darker text-light py-8 border-y border-gray/50 shadow-inner z-20 relative -mt-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-around items-center gap-6 font-bold uppercase tracking-wider text-sm md:text-base">
          <div className="flex items-center gap-3 text-primary"><Clock size={24} /> <span className="text-light">12:00 PM – 4:00 PM & 6:00 PM – 11:00 PM</span></div>
          <div className="hidden md:block w-1.5 h-1.5 bg-gray rounded-full"></div>
          <div className="flex items-center gap-3 text-primary"><MapPin size={24} /> <span className="text-light text-center">Sivagnanam St, Pondy Bazaar, Chennai</span></div>
          <div className="hidden md:block w-1.5 h-1.5 bg-gray rounded-full"></div>
          <div className="flex items-center gap-3 text-primary"><Phone size={24} /> <span className="text-light">095143 11128</span></div>
        </div>
      </section>

      {/* Popular Picks Section */}
      <section className="py-24 px-4 max-w-7xl mx-auto relative" id="menu">
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-widest mb-4">Popular <span className="text-primary">Picks</span></h2>
          <div className="w-24 h-1.5 bg-primary mx-auto rounded"></div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <Loader2 className="animate-spin text-primary" size={48} />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {products.map((product) => (
              <div key={product.id} className="bg-darker rounded-3xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-500 group shadow-lg hover:shadow-[0_0_40px_rgba(255,184,0,0.15)] transform hover:-translate-y-2 flex flex-col relative">
                
                {/* Image Container with Gradient Overlay */}
                <div className="h-64 bg-dark relative overflow-hidden">
                  <img 
                    src={getImageUrl(product.image) || `https://via.placeholder.com/600x400.png/141414/FFB800?text=${encodeURIComponent(product.name)}`} 
                    alt={product.name}
                    className="w-full h-full object-cover z-0 group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-darker via-darker/20 to-transparent z-10"></div>
                  
                  {/* Veg/Non-veg beautifully styled tag */}
                  {product.is_veg ? (
                    <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-green-500/30 z-20 flex items-center gap-2 shadow-xl">
                      <Star size={12} className="text-green-500 fill-green-500" />
                      <span className="text-xs font-bold text-green-500 uppercase tracking-widest">Veg</span>
                    </div>
                  ) : (
                    <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-red-500/30 z-20 flex items-center gap-2 shadow-xl">
                      <Star size={12} className="text-red-500 fill-red-500" />
                      <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Non-Veg</span>
                    </div>
                  )}
                </div>

                {/* Content Area */}
                <div className="p-6 relative z-20 flex-1 flex flex-col -mt-12 bg-gradient-to-b from-transparent via-darker to-darker">
                  <div className="bg-primary/10 text-primary w-max px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-3 border border-primary/20 backdrop-blur-sm shadow-sm">
                    {product.category?.name || 'Chef Special'}
                  </div>
                  
                  <h3 className="text-2xl font-black text-white mb-2 tracking-tight group-hover:text-primary transition-colors">{product.name}</h3>
                  <p className="text-light/50 text-sm leading-relaxed mb-6 flex-1 font-medium">{product.description || 'Prepared with our signature blend of spices and coal-fired to perfection.'}</p>
                </div>
              </div>
              ))}
            </div>
          </>
        )}
        
        <div className="text-center mt-16">
           <Link to="/menu" className="inline-block border-b-2 border-primary text-light hover:text-primary pb-1 font-bold tracking-widest uppercase transition-colors">
              View Entire Collection
           </Link>
        </div>
      </section>

      <OurStrength />
      <AboutUs />
      
      {/* Ambiance Section */}
      <section className="py-24 bg-darker relative overflow-hidden border-t border-gray">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-cover bg-center opacity-10 blur-sm" style={{ backgroundImage: `url(${insideImg})` }}></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
              Crafted in <span className="text-primary block">Fire & Smoke</span>
            </h2>
            <p className="text-lg text-light/80 leading-relaxed font-medium">
              We believe that the best flavors are forged in fire. Our master chefs use traditional coal grills to lock in juices and impart that signature smoky flavor you won't find anywhere else.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-4 border-t border-gray/50">
               <div>
                 <h4 className="text-3xl font-black text-primary mb-1">50+</h4>
                 <p className="text-sm uppercase tracking-wider text-light/70 font-bold">Signature Recipes</p>
               </div>
               <div>
                 <h4 className="text-3xl font-black text-primary mb-1">100%</h4>
                 <p className="text-sm uppercase tracking-wider text-light/70 font-bold">Coal Fired Quality</p>
               </div>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="absolute -inset-4 bg-primary/10 rounded-full blur-3xl"></div>
            <img src={storeImg} alt="Store Front" className="rounded-2xl border border-gray shadow-2xl relative z-10" />
            <div className="absolute -bottom-8 -left-8 bg-dark p-6 rounded-xl border border-gray shadow-xl z-20 hidden md:block">
               <Flame size={40} className="text-primary mb-2" />
               <p className="font-black uppercase tracking-widest text-sm">Authentic<br/>Preparation</p>
            </div>
          </div>
        </div>
      </section>

      {/* <Gallery /> */}
      <Testimonials />
    </div>
  );
};

export default Home;
