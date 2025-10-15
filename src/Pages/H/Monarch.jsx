import React, { useEffect, useState, useCallback } from 'react';
import Footer from '../../Footer/Footer';

const images = [
  '/assets/1.jpg',
  '/assets/2.jpg',
  '/assets/3.jpg',
  '/assets/4.jpg'
];

export default function VideoBackground() {
  const [current, setCurrent] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Preload images for smooth transitions
  useEffect(() => {
    images.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Optimized interval with useCallback
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [images.length]);

  // Video loaded handler
  const handleVideoLoad = useCallback(() => {
    setIsVideoLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section with Video */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Preload video for better performance */}
        <link rel="preload" as="video" href="/assets/Myvideo.mp4" />
        
        {/* Optimized video element */}
        <video
          className={`absolute top-0 left-0 w-full h-full object-cover pointer-events-none transition-opacity duration-1000 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          src="/assets/Myvideo.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={handleVideoLoad}
          onError={() => console.error('Video failed to load')}
        >
          {/* Fallback image if video fails to load */}
          <source src="/assets/Myvideo.mp4" type="video/mp4" />
          <img 
            src="/assets/place.jpg" 
            alt="Fallback background" 
            className="w-full h-full object-cover"
          />
        </video>

        {/* Performance optimized overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="font-cinzel text-white uppercase text-4xl sm:text-6xl md:text-8xl tracking-[0.2em] md:tracking-[0.3em] drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)] px-4 text-center">
            MONARCH'
          </h1>
        </div>

        {/* Loading indicator */}
        {!isVideoLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="text-white text-lg">Loading...</div>
          </div>
        )}
      </div>

      {/* Image Comparison Section */}
      <div className="flex flex-col md:flex-row">
        {/* Left Fixed Image */}
        <div className="md:w-1/2 w-full h-64 md:h-screen bg-gray-100 overflow-hidden">
          <img
            src="/assets/p1.jpg"
            alt="Fixed Model"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Right Transitioning Image */}
        <div className="md:w-1/2 w-full h-64 md:h-screen bg-black overflow-hidden relative">
          {/* Preload all images in the background */}
          {images.map((src, index) => (
            <img
              key={src}
              src={src}
              alt={`Look ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                index === current ? 'opacity-100' : 'opacity-0'
              }`}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          ))}
          
          {/* Optional caption */}
          <div className="absolute bottom-4 left-4 text-white text-sm bg-black/50 px-3 py-1 rounded backdrop-blur-sm">
            Look {current + 1}
          </div>
        </div>
      </div>

      {/* Footer */}
   
    </div>
  );
}