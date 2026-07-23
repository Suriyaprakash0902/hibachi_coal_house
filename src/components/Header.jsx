import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, MapPin, Clock, Phone, Mail, Menu, X } from 'lucide-react';
import logoImg from '../assets/images/Logo without bg.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Info Bar */}
      <div className="hidden md:flex justify-between items-center bg-darker text-light/80 text-xs py-2 px-8 border-b border-gray/30 font-sans tracking-wide">
        <div className="flex gap-6">
          <span className="flex items-center gap-2"><Clock size={14} className="text-primary"/> Open Daily: 12:00 PM – 4:00 PM & 6:00 PM – 11:00 PM</span>
        </div>
        <div className="flex gap-6">
          <a href="tel:09514311128" className="flex items-center gap-2 hover:text-primary transition"><Phone size={14} className="text-primary"/> 095143 11128</a>
          <a href="mailto:info@hibachicoalhouse.in" className="flex items-center gap-2 hover:text-primary transition"><Mail size={14} className="text-primary"/> info@hibachicoalhouse.in</a>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-darker/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-3'}`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 relative z-50">
            <img src={logoImg} alt="Hibachi Coal House" className={`transition-all duration-300 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.7)] ${isScrolled ? 'h-20' : 'h-28'}`} />
          </Link>

          {/* Desktop Nav & Menu Toggle */}
          <div className="flex items-center gap-8 relative z-50">
            <nav className="hidden md:flex items-center gap-8 font-serif text-sm font-bold tracking-widest uppercase mr-4">
              <Link to="/" className={`transition-colors ${location.pathname === '/' ? 'text-primary' : 'text-light hover:text-primary'}`}>Home</Link>
              <Link to="/about" className={`transition-colors ${location.pathname === '/about' ? 'text-primary' : 'text-light hover:text-primary'}`}>About</Link>
              <Link to="/menu" className={`transition-colors ${location.pathname === '/menu' ? 'text-primary' : 'text-light hover:text-primary'}`}>Menu</Link>
              <Link to="/videos" className={`transition-colors ${location.pathname === '/videos' ? 'text-primary' : 'text-light hover:text-primary'}`}>Videos</Link>
              <Link to="/contact" className={`transition-colors ${location.pathname === '/contact' ? 'text-primary' : 'text-light hover:text-primary'}`}>Contact</Link>
            </nav>

            <Link to="/menu" className="hidden lg:flex bg-primary hover:bg-primary-dark text-darker font-bold font-sans uppercase tracking-widest text-xs px-6 py-2.5 rounded-sm transition-all transform hover:-translate-y-0.5 shadow-[0_0_15px_rgba(255,184,0,0.4)] hover:shadow-[0_0_25px_rgba(255,184,0,0.6)]">
              View Menu
            </Link>

            {/* Menu Toggle */}
            <button className="text-light hover:text-primary transition-colors flex items-center gap-2" onClick={() => setIsMobileMenuOpen(true)}>
              <span className="hidden md:block font-sans uppercase tracking-widest text-xs font-bold mt-0.5">Explore</span>
              <Menu size={28} />
            </button>
          </div>
        </div>
      </header>

      {/* Stylish Full Screen Menu */}
      <div className={`fixed inset-0 z-[100] bg-darker/95 backdrop-blur-lg transition-all duration-700 flex flex-col justify-center items-center ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-10 right-10 text-light hover:text-primary transition-transform hover:rotate-90 duration-500">
          <X size={40} />
        </button>
        
        <img src={logoImg} alt="Logo" className={`h-24 rounded-md shadow-2xl mb-12 transition-all duration-700 transform ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`} />
        
        <nav className="flex flex-col items-center gap-6 font-serif font-black text-4xl md:text-6xl tracking-widest uppercase">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={`relative group text-light hover:text-primary transition-all duration-700 delay-100 transform ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Home
            <span className="absolute -bottom-2 left-1/2 w-0 h-1 bg-primary group-hover:w-1/2 transition-all duration-300"></span>
            <span className="absolute -bottom-2 right-1/2 w-0 h-1 bg-primary group-hover:w-1/2 transition-all duration-300"></span>
          </Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className={`relative group text-light hover:text-primary transition-all duration-700 delay-150 transform ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            About
            <span className="absolute -bottom-2 left-1/2 w-0 h-1 bg-primary group-hover:w-1/2 transition-all duration-300"></span>
            <span className="absolute -bottom-2 right-1/2 w-0 h-1 bg-primary group-hover:w-1/2 transition-all duration-300"></span>
          </Link>
          <Link to="/menu" onClick={() => setIsMobileMenuOpen(false)} className={`relative group text-light hover:text-primary transition-all duration-700 delay-200 transform ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Menu
            <span className="absolute -bottom-2 left-1/2 w-0 h-1 bg-primary group-hover:w-1/2 transition-all duration-300"></span>
            <span className="absolute -bottom-2 right-1/2 w-0 h-1 bg-primary group-hover:w-1/2 transition-all duration-300"></span>
          </Link>
          <Link to="/videos" onClick={() => setIsMobileMenuOpen(false)} className={`relative group text-light hover:text-primary transition-all duration-700 delay-225 transform ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Videos
            <span className="absolute -bottom-2 left-1/2 w-0 h-1 bg-primary group-hover:w-1/2 transition-all duration-300"></span>
            <span className="absolute -bottom-2 right-1/2 w-0 h-1 bg-primary group-hover:w-1/2 transition-all duration-300"></span>
          </Link>
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className={`relative group text-light hover:text-primary transition-all duration-700 delay-250 transform ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Contact
            <span className="absolute -bottom-2 left-1/2 w-0 h-1 bg-primary group-hover:w-1/2 transition-all duration-300"></span>
            <span className="absolute -bottom-2 right-1/2 w-0 h-1 bg-primary group-hover:w-1/2 transition-all duration-300"></span>
          </Link>
          {/* <Link to="/offers" onClick={() => setIsMobileMenuOpen(false)} className={`relative group text-light hover:text-primary transition-all duration-700 delay-300 transform ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Offers
            <span className="absolute -bottom-2 left-1/2 w-0 h-1 bg-primary group-hover:w-1/2 transition-all duration-300"></span>
            <span className="absolute -bottom-2 right-1/2 w-0 h-1 bg-primary group-hover:w-1/2 transition-all duration-300"></span>
          </Link> */}
          {/* <Link to="/admin/login" onClick={() => setIsMobileMenuOpen(false)} className={`relative group text-light hover:text-primary transition-all duration-700 delay-400 transform text-2xl md:text-3xl mt-4 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Admin Login
            <span className="absolute -bottom-2 left-1/2 w-0 h-0.5 bg-primary group-hover:w-1/2 transition-all duration-300"></span>
            <span className="absolute -bottom-2 right-1/2 w-0 h-0.5 bg-primary group-hover:w-1/2 transition-all duration-300"></span>
          </Link> */}
        </nav>
        
        <div className={`absolute bottom-10 flex flex-col items-center transition-all duration-1000 delay-500 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}>
           <div className="flex gap-6 text-primary tracking-[0.2em] uppercase text-xs font-bold mb-4">
             <a href="#" className="hover:text-light transition-colors">Instagram</a>
             <a href="#" className="hover:text-light transition-colors">Facebook</a>
           </div>
           <div className="text-light/50 font-sans tracking-widest text-sm">Call us: 095143 11128</div>
        </div>
      </div>
    </>
  );
};

export default Header;
