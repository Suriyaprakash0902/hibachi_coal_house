import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
  return (
    <div className="bg-dark min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-widest text-white mb-16 text-center">Contact <span className="text-primary">Us</span></h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-10">
            <h2 className="text-3xl font-serif text-light">Get In Touch</h2>
            <p className="text-light/70 font-sans leading-relaxed text-lg">
              Have a question about our menu, want to book a table for a party, or just want to say hi? We'd love to hear from you.
            </p>
            
            <div className="space-y-6 pt-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold tracking-widest uppercase text-sm mb-1">Visit Us</h4>
                  <a href="https://www.google.com/maps/place/Hibachi+Coal+House/data=!4m2!3m1!1s0x0:0xde209f17efd06ec2?sa=X&ved=1t:2428&ictx=111" target="_blank" rel="noreferrer" className="text-light/70 hover:text-primary transition-colors">
                    Ground Floor, New No:3, Sivagnanam St, Pondy Bazaar, T. Nagar, Chennai, Tamil Nadu 600017
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold tracking-widest uppercase text-sm mb-1">Call Us</h4>
                  <p className="text-light/70">095143 11128</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold tracking-widest uppercase text-sm mb-1">Email Us</h4>
                  <p className="text-light/70">info@hibachicoalhouse.in</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-darker p-8 rounded-xl border border-white/5 shadow-2xl">
            <form className="space-y-6">
              <div>
                <label className="block text-light/70 text-sm font-bold mb-2 uppercase tracking-widest">Name</label>
                <input type="text" className="w-full bg-dark border border-white/10 rounded p-4 text-light focus:border-primary focus:outline-none transition-colors" placeholder="Your Name" />
              </div>
              <div>
                <label className="block text-light/70 text-sm font-bold mb-2 uppercase tracking-widest">Email</label>
                <input type="email" className="w-full bg-dark border border-white/10 rounded p-4 text-light focus:border-primary focus:outline-none transition-colors" placeholder="Your Email" />
              </div>
              <div>
                <label className="block text-light/70 text-sm font-bold mb-2 uppercase tracking-widest">Message</label>
                <textarea className="w-full bg-dark border border-white/10 rounded p-4 text-light focus:border-primary focus:outline-none transition-colors h-32" placeholder="How can we help you?"></textarea>
              </div>
              <button type="button" className="w-full bg-primary hover:bg-primary-dark text-darker font-black text-lg py-4 rounded transition uppercase tracking-widest">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
