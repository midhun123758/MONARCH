import React, { useEffect, useState, useCallback } from 'react';
import Footer from '../../Footer/Footer';

export default function VideoBackground() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Video loaded handler
  const handleVideoLoad = useCallback(() => {
    setIsVideoLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-black relative">
      {/* Hero Section with Video */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Preload video for better performance */}
        <link rel="preload" as="video" href="/assets/Myvideo.mp4" />

        {/* Video Element */}
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
          <source src="/assets/Myvideo.mp4" type="video/mp4" />
          <img 
            src="/assets/place.jpg" 
            alt="Fallback background" 
            className="w-full h-full object-cover"
          />
        </video>

        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Centered text */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
          <h1 className="font-cinzel text-white uppercase text-4xl sm:text-6xl md:text-8xl tracking-[0.2em] md:tracking-[0.3em] drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)]">
            MONARCH'
          </h1>
        </div>

        {/* Small Instagram Follow Button */}
        <a
          href="https://www.instagram.com/__midhun_________?igsh=b3RzYno4Z2FyeGd6"
          target="_blank"
          rel="noopener noreferrer"
          className="
            absolute bottom-10 right-10 z-20
            bg-black/70 text-white
            px-4 py-2 rounded-full
            text-sm font-medium
            hover:bg-black/90
            transition-colors duration-300
            flex items-center gap-2
          "
        >
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
          </svg>
          Follow
        </a>

        {/* Loading indicator */}
        {!isVideoLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="text-white text-lg">Loading...</div>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
