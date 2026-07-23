import React from 'react';

const Videos = () => {
  const instagramReels = [
    "https://www.instagram.com/reel/DaYg60lTdcj/embed",
    "https://www.instagram.com/reel/DaIy5ehJII4/embed",
    "https://www.instagram.com/reel/DaQkbWRTife/embed"
  ];

  return (
    <div className="bg-dark min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-widest text-white mb-4">Behind the <span className="text-primary">Scenes</span></h1>
          <p className="text-light/70 max-w-2xl mx-auto text-lg mb-8">Watch our master chefs in action on Instagram.</p>
          <div className="flex justify-center">
            <div className="w-24 h-6 relative flex items-center justify-center text-primary">
              <span className="block border-t border-primary w-8"></span>
              <span className="mx-2 text-xl">❦</span>
              <span className="block border-t border-primary w-8"></span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
          {instagramReels.map((src, index) => (
            <div key={index} className="w-full max-w-[400px] h-[550px] bg-darker rounded-2xl overflow-hidden shadow-xl border border-white/5">
              <iframe src={src} className="w-full h-full" frameBorder="0" scrolling="no" allowtransparency="true" allow="encrypted-media"></iframe>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Videos;
