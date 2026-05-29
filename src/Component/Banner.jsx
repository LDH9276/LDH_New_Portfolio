import React, {useEffect, useState} from 'react';
import Scroll from '../Header/Scroll';

function Banner({activeSlide}) {
  const [active, setActive] = useState('ready');

  useEffect(() => {
    if (activeSlide === 0) setActive('');
    else setActive('ready');
  }, [activeSlide]);

  return (
    <div className={`relative w-full h-full flex items-center justify-center overflow-hidden
      transition-opacity duration-[1.8s] ${active === 'ready' ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* Video Background */}
      <video 
        src="/videos/introduce.mp4" 
        autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 section-container flex flex-col items-start justify-center h-full py-20">
        <div className="space-y-4 md:space-y-6">
          <div className="accent-line" />
          <p className="text-xs md:text-sm font-medium uppercase tracking-[0.3em] text-white/60">
            Front-end Developer
          </p>
          <h2 className="text-display text-white leading-none">
            Portfolio
          </h2>
          <p className="text-sm md:text-base text-white/50 max-w-md">
            디자인을 넘어서 — The Frontier
          </p>
        </div>
      </div>

      <Scroll />
    </div>
  );
}

export default Banner;