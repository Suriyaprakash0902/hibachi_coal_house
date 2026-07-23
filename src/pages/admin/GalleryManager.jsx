import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

const GalleryManager = () => {
  return (
    <div className="bg-darker/90 backdrop-blur-md border border-gray rounded-xl p-8 shadow-xl">
      <div className="flex flex-col items-center justify-center h-96 border-2 border-dashed border-gray rounded-lg text-light/40">
        <ImageIcon size={64} className="mb-6 opacity-30 text-primary" />
        <p className="font-bold text-2xl text-light/70">Gallery Management</p>
        <p className="text-md mt-2 text-center max-w-md">This section is ready to be connected to your backend API to dynamically upload and manage your premium gallery images and videos.</p>
      </div>
    </div>
  );
};

export default GalleryManager;
