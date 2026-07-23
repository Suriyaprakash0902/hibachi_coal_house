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
      <div className="relative animate-pulse">
        <img src={logoImg} alt="Hibachi Coal House Loader" className="h-32 w-auto object-contain rounded-xl shadow-[0_0_40px_rgba(255,184,0,0.4)]" />
      </div>
      <div className="mt-8 flex gap-2">
        {'HIBACHI'.split('').map((letter, i) => (
          <span key={i} className="text-primary font-serif font-bold text-2xl animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Loader;
