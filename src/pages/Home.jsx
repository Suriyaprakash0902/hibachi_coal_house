import React from 'react';
import { Flame, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import insideImg from '../assets/images/inside.jpg';
import storeImg from '../assets/images/store.jpg';
import Testimonials from '../components/Testimonials';

const Home = () => {
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

      {/* Popular Picks Section - Directs to Menu Page */}
      <section className="py-20 px-4 max-w-7xl mx-auto relative" id="menu">
        <div className="bg-gradient-to-r from-darker via-dark to-darker rounded-3xl p-10 md:p-16 border border-white/10 shadow-2xl relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
          <span className="text-primary font-serif tracking-[0.3em] uppercase text-xs md:text-sm font-bold mb-3 inline-block border-b border-primary/30 pb-1">
            Taste The Smoke & Flame
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-black text-white mb-6 uppercase tracking-wider">
            Popular <span className="text-primary">Picks</span>
          </h2>
          <p className="text-light/70 max-w-2xl mx-auto text-base md:text-lg mb-8 font-sans leading-relaxed">
            Discover our chef's signature coal-fired specialties, crafted with rich spices and authentic grilling techniques.
          </p>
          <Link 
            to="/menu" 
            className="inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-darker font-sans font-bold uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-[0_0_25px_rgba(255,184,0,0.4)] hover:shadow-[0_0_35px_rgba(255,184,0,0.6)] text-sm md:text-base"
          >
            <span>Explore Popular Picks Menu</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

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

      <Testimonials />

    </div>
  );
};

export default Home;
