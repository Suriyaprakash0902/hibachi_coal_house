import React from 'react';
import AboutUs from '../components/AboutUs';
import OurStrength from '../components/OurStrength';
import Testimonials from '../components/Testimonials';

const About = () => {
  return (
    <div className="bg-dark min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-widest text-white mb-4">About <span className="text-primary">Us</span></h1>
        <div className="flex justify-center mb-8">
          <div className="w-24 h-6 relative flex items-center justify-center text-primary">
            <span className="block border-t border-primary w-8"></span>
            <span className="mx-2 text-xl">❦</span>
            <span className="block border-t border-primary w-8"></span>
          </div>
        </div>
      </div>
      <AboutUs />
      <OurStrength />
      <Testimonials />
    </div>
  );
};

export default About;
