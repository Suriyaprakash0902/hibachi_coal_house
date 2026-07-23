import React from 'react';
import img1 from '../assets/new/gallery-1.jpeg';
import img2 from '../assets/new/gallery-2.jpeg';
import img3 from '../assets/new/gallery-3.jpeg';
import img4 from '../assets/new/gallery-4.jpeg';
import img5 from '../assets/new/gallery-5.jpeg';
import img6 from '../assets/new/gallery-6.jpeg';
import img7 from '../assets/new/gallery-7.jpeg';
import img8 from '../assets/new/gallery-8.jpeg';
import img9 from '../assets/new/gallery-9.jpeg';

const Gallery = () => {
  const images = [
    { src: img1, title: 'Signature Dish' },
    { src: img2, title: 'Culinary Masterpiece' },
    { src: img3, title: 'Exquisite Flavor' },
    { src: img4, title: 'Premium Taste' },
    { src: img5, title: 'Authentic Recipe' },
    { src: img6, title: 'Perfectly Charred' },
    { src: img7, title: 'Smoky Perfection' },
    { src: img8, title: 'Chef Special' },
    { src: img9, title: 'Irresistible' },
  ];

  return (
    <section className="bg-darker py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h4 className="text-primary tracking-[0.3em] uppercase text-xs font-bold mb-4">Our Culinary Art</h4>
        <h2 className="text-4xl md:text-5xl font-serif text-light mb-16">Gallery</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, idx) => (
            <div key={idx} className="relative group overflow-hidden rounded-md h-80 bg-dark cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500">
              <img src={img.src} alt={img.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out opacity-80 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                <h3 className="text-primary font-sans font-bold tracking-widest uppercase text-sm">{img.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
