import React from 'react';
import { PHOTOS } from '../constants';
import { Camera, Maximize2, Aperture } from 'lucide-react';

interface PhotoGalleryProps {
  labels: { title: string; subtitle: string };
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ labels }) => {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex items-center justify-between mb-16">
        <div>
           <h2 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
             <Camera className="text-secondary" />
             {labels.title}
           </h2>
           <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest opacity-60 ml-9">{labels.subtitle}</p>
        </div>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {PHOTOS.map((photo) => (
          <div key={photo.id} className="break-inside-avoid relative group rounded-xl overflow-hidden glass-neo hover:shadow-neon transition-all duration-500">
            
            <div className="relative overflow-hidden">
               <img 
                 src={photo.url} 
                 alt={photo.title}
                 className="w-full h-auto transform group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
               />
               
               {/* Neon Overlay */}
               <div className="absolute inset-0 bg-gradient-to-t from-brand/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                 <h3 className="text-white font-bold text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{photo.title}</h3>
                 <div className="flex items-center gap-2 text-white/80 text-xs font-mono mt-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                   <Aperture size={12} />
                   <span>{photo.exif}</span>
                 </div>
               </div>

               <button className="absolute top-4 right-4 bg-black/50 backdrop-blur p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-brand hover:text-white border border-white/20">
                 <Maximize2 size={16} />
               </button>
            </div>
            
          </div>
        ))}
      </div>
    </section>
  );
};

export default PhotoGallery;