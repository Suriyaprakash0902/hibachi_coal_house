import React, { useState, useEffect } from 'react';
import logoImg from '../assets/images/Logo without bg.png';

const Loader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-darker flex flex-col items-center justify-center transition-opacity duration-500">
      <div className="relative animate-pulse flex items-center justify-center">
        <img 
          src={logoImg} 
          alt="Hibachi Coal House Loader" 
          className="h-36 md:h-44 w-auto object-contain drop-shadow-[0_0_30px_rgba(255,184,0,0.6)]" 
        />
      </div>
      <div className="mt-8 flex gap-3">
        {'HIBACHI'.split('').map((letter, i) => (
          <span 
            key={i} 
            className="text-primary font-serif font-black text-2xl md:text-3xl tracking-widest animate-bounce drop-shadow-[0_0_10px_rgba(255,184,0,0.3)]" 
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Loader;
