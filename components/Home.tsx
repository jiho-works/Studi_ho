
import React from 'react';
import { FeaturedContent } from '../types';

interface HomeProps {
  featured: FeaturedContent;
}

const Home: React.FC<HomeProps> = ({ featured }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-in fade-in duration-700">
      <div className="flex flex-col space-y-8">
        <div className="aspect-[4/5] bg-gray-50 overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
          <img 
            src={featured.imageUrl} 
            alt="Featured" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-light tracking-tight">Focus of the moment</h2>
          <p className="text-gray-500 leading-relaxed text-sm max-w-md">
            Capturing the silence between moments. A collection of visual and auditory textures that define the present.
          </p>
        </div>
      </div>

      <div className="flex flex-col space-y-8">
        <div className="aspect-video bg-black overflow-hidden shadow-2xl">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${featured.youtubeId}?autoplay=0&mute=0&controls=1`}
            title="Music Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="border-t border-black pt-6">
          <span className="text-xs uppercase tracking-[0.2em] font-bold">Now Playing</span>
          <p className="text-sm mt-2 text-gray-600">Selected tracks for contemplation and flow.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
