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
import { User, X, Plus, Minus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import api from './api';
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
        <footer className="relative py-16 border-t border-white/10 text-center overflow-hidden flex items-center shadow-inner min-h-[300px]">
          <div className="absolute inset-0 bg-cover bg-center bg-fixed z-0" style={{ backgroundImage: `url(${footerBg})` }}></div>
          <div className="absolute inset-0 bg-black/70 z-0"></div>
          
          <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10 px-4 mb-8">
            <div className="flex flex-col items-center gap-6 font-sans tracking-[0.4em] uppercase text-sm md:text-base font-black text-light/90 transition-colors">
              <a href="#" className="hover:text-primary transition-colors duration-300 py-2 hover:scale-105 transform drop-shadow-md">Instagram</a>
              <a href="#" className="hover:text-primary transition-colors duration-300 py-2 hover:scale-105 transform drop-shadow-md">WhatsApp</a>
            </div>
            
            <div className="w-full flex flex-col items-center md:items-start gap-4">
              <h4 className="font-serif text-primary tracking-widest uppercase font-bold text-lg drop-shadow-md">Our Location</h4>
              <div className="w-full h-[250px] rounded-xl overflow-hidden shadow-2xl border border-white/10 opacity-90 hover:opacity-100 transition-opacity">
                <iframe width="100%" height="100%" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" src="https://maps.google.com/maps?q=Hibachi+Coal+House,Sivagnanam+St,Pondy+Bazaar,Chennai&t=&z=15&ie=UTF8&iwloc=&output=embed"></iframe>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-6 left-0 right-0 text-[10px] font-sans tracking-widest text-light/40 uppercase text-center z-10">
             &copy; 2026 Hibachi Coal House
          </div>
        </footer>
      )}
    </div>
    </>
  );
}

export default App;
