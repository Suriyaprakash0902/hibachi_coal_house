import React, { useState } from 'react';
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';
import page1 from '../assets/menus/Hibachi Menu Revamp A4_page-0001.jpg';
import page2 from '../assets/menus/Hibachi Menu Revamp A4_page-0002.jpg';
import page3 from '../assets/menus/Hibachi Menu Revamp A4_page-0003.jpg';
import page4 from '../assets/menus/Hibachi Menu Revamp A4_page-0004.jpg';
import page5 from '../assets/menus/Hibachi Menu Revamp A4_page-0005.jpg';
import page6 from '../assets/menus/Hibachi Menu Revamp A4_page-0006.jpg';
import page7 from '../assets/menus/Hibachi Menu Revamp A4_page-0007.jpg';
import page8 from '../assets/menus/Hibachi Menu Revamp A4_page-0008.jpg';
import page9 from '../assets/menus/Hibachi Menu Revamp A4_page-0009.jpg';

const menuPages = [
  { id: 1, title: 'Menu Card 1', image: page1 },
  { id: 2, title: 'Menu Card 2', image: page2 },
  { id: 3, title: 'Menu Card 3', image: page3 },
  { id: 4, title: 'Menu Card 4', image: page4 },
  { id: 5, title: 'Menu Card 5', image: page5 },
  { id: 6, title: 'Menu Card 6', image: page6 },
  { id: 7, title: 'Menu Card 7', image: page7 },
  { id: 8, title: 'Menu Card 8', image: page8 },
  { id: 9, title: 'Menu Card 9', image: page9 },
];

const Menu = () => {
  const [selectedPageIndex, setSelectedPageIndex] = useState(null);

  const handlePrevPage = (e) => {
    e.stopPropagation();
    if (selectedPageIndex !== null) {
      setSelectedPageIndex((prev) => (prev > 0 ? prev - 1 : menuPages.length - 1));
    }
  };

  const handleNextPage = (e) => {
    e.stopPropagation();
    if (selectedPageIndex !== null) {
      setSelectedPageIndex((prev) => (prev < menuPages.length - 1 ? prev + 1 : 0));
    }
  };

  return (
    <div className="bg-dark min-h-screen pb-20">
      
      {/* Compact Premium Header */}
      <div className="bg-darker border-b border-white/5 pt-12 pb-10 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-full bg-primary/5 blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-widest text-white mb-3">Explore <span className="text-primary">Menu</span></h1>
          <p className="text-light/70 max-w-2xl mx-auto text-base md:text-lg font-sans">
            Authentic Hibachi Coal House Menu
          </p>
        </div>
      </div>

      {/* Main Content Area - 9 Menu Pages Display */}
      <div className="max-w-7xl mx-auto px-4 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuPages.map((page) => (
            <div 
              key={page.id} 
              onClick={() => setSelectedPageIndex(menuPages.findIndex(p => p.id === page.id))}
              className="bg-darker rounded-3xl overflow-hidden border border-white/10 hover:border-primary/40 transition-all duration-500 group shadow-2xl hover:shadow-[0_0_40px_rgba(255,184,0,0.2)] transform hover:-translate-y-2 cursor-pointer flex flex-col relative"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden bg-black/60 aspect-[3/4]">
                <img 
                  src={page.image} 
                  alt={page.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-darker via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-primary/90 text-darker font-black uppercase tracking-widest text-xs px-5 py-3 rounded-full flex items-center gap-2 shadow-2xl transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <ZoomIn size={18} /> Click to View Full Screen
                  </span>
                </div>

                {/* Page Badge */}
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md text-primary font-black uppercase text-xs px-3 py-1.5 rounded-full border border-primary/30 shadow-lg">
                  Page {page.id} of 9
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Screen Lightbox Modal */}
      {selectedPageIndex !== null && (
        <div 
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8 animate-fadeIn"
          onClick={() => setSelectedPageIndex(null)}
        >
          {/* Close Button */}
          <button 
            onClick={() => setSelectedPageIndex(null)}
            className="absolute top-6 right-6 text-white hover:text-primary transition-colors bg-white/10 hover:bg-white/20 p-3 rounded-full z-50 shadow-2xl"
          >
            <X size={28} />
          </button>

          {/* Previous Page Button */}
          <button 
            onClick={handlePrevPage}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors bg-white/10 hover:bg-white/20 p-3 md:p-4 rounded-full z-50 shadow-2xl"
          >
            <ChevronLeft size={32} />
          </button>

          {/* Modal Image & Controls */}
          <div className="max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center relative" onClick={(e) => e.stopPropagation()}>
            <img 
              src={menuPages[selectedPageIndex].image} 
              alt={menuPages[selectedPageIndex].title}
              className="max-h-[80vh] w-auto object-contain rounded-xl shadow-2xl border border-white/10"
            />
            
            <div className="mt-4 flex items-center justify-center w-full max-w-xl px-4 text-white font-sans">
              <span className="text-sm font-bold tracking-widest text-primary uppercase">
                Page {menuPages[selectedPageIndex].id} of {menuPages.length}
              </span>
            </div>
          </div>

          {/* Next Page Button */}
          <button 
            onClick={handleNextPage}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors bg-white/10 hover:bg-white/20 p-3 md:p-4 rounded-full z-50 shadow-2xl"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}

    </div>
  );
};

export default Menu;
