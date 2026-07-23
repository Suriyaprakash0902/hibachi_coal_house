import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Offers from './pages/Offers';
import About from './pages/About';
import Contact from './pages/Contact';
import Videos from './pages/Videos';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import { useAlert } from './components/AlertContext';
import { User, X, Plus, Minus, Trash2, Clock, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import Header from './components/Header';
import Loader from './components/Loader';
import ScrollToTop from './components/ScrollToTop';
import logoImg from './assets/images/logo.jpeg';
import footerBg from './assets/new/peri-peri-bbq.jpeg';

function App() {
  const { showAlert } = useAlert();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      <Loader />
      <div className="min-h-screen flex flex-col font-sans">
        {!isAdminRoute && <Header />}

      <main className="flex-1 bg-dark">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
      </main>

      {!isAdminRoute && (
        <footer className="relative py-16 border-t border-white/10 text-center overflow-hidden flex flex-col items-center justify-center shadow-inner min-h-[350px]">
          <div className="absolute inset-0 bg-cover bg-center bg-fixed z-0" style={{ backgroundImage: `url(${footerBg})` }}></div>
          <div className="absolute inset-0 bg-black/80 z-0"></div>
          
          <div className="max-w-6xl mx-auto w-full flex flex-col gap-10 relative z-10 px-4 mb-8">
            {/* Info Block (Time, Address, Mobile) + Map */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              
              {/* Timing, Address, Mobile details - Appears ABOVE map on mobile */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left gap-5 bg-black/50 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/10 shadow-2xl">
                <h4 className="font-serif text-primary tracking-widest uppercase font-black text-xl mb-1 drop-shadow-md">
                  Hibachi Coal House
                </h4>

                {/* Opening Hours */}
                <div className="flex items-center md:items-start gap-3 text-light/90">
                  <Clock className="text-primary flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-primary/90 tracking-widest">Opening Hours</p>
                    <p className="text-sm font-medium">12:00 PM – 4:00 PM & 6:00 PM – 11:00 PM</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-center md:items-start gap-3 text-light/90">
                  <MapPin className="text-primary flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-primary/90 tracking-widest">Address</p>
                    <p className="text-sm font-medium">Sivagnanam St, Pondy Bazaar, T. Nagar, Chennai</p>
                  </div>
                </div>

                {/* Mobile Number */}
                <div className="flex items-center md:items-start gap-3 text-light/90">
                  <Phone className="text-primary flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-primary/90 tracking-widest">Contact No.</p>
                    <a href="tel:09514311128" className="text-sm font-medium hover:text-primary transition-colors">095143 11128</a>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex mt-2 pt-4 border-t border-white/10 w-full justify-center md:justify-start">
                  <a 
                    href="https://www.instagram.com/hibachicoalhouse/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-sans tracking-[0.15em] uppercase text-xs font-black shadow-lg hover:shadow-[0_0_25px_rgba(236,72,153,0.6)] hover:scale-105 transition-all duration-300"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-sm">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                    <span>Instagram</span>
                  </a>
                </div>
              </div>

              {/* Map - Appears BELOW details on mobile */}
              <div className="w-full flex flex-col items-center md:items-start gap-3">
                <h4 className="font-serif text-primary tracking-widest uppercase font-bold text-base drop-shadow-md w-full text-center md:text-left">Our Location</h4>
                <div className="w-full h-[260px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 opacity-90 hover:opacity-100 transition-opacity">
                  <iframe width="100%" height="100%" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" src="https://maps.google.com/maps?q=Hibachi+Coal+House,Sivagnanam+St,Pondy+Bazaar,Chennai&t=&z=15&ie=UTF8&iwloc=&output=embed"></iframe>
                </div>
              </div>

            </div>
          </div>
          
          <div className="absolute bottom-4 left-0 right-0 text-[10px] font-sans tracking-widest text-light/40 uppercase text-center z-10">
             &copy; 2026 Hibachi Coal House
          </div>
        </footer>
      )}
    </div>
    </>
  );
}

export default App;
