'use client';
import React, { useEffect, useState, useRef } from 'react';
import Scroll from '../Header/Scroll';
import IDEBackground from './IDEBackground';

function Banner({ activeSlide }) {
  const [active, setActive] = useState('ready');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    if (activeSlide === 0) setActive('');
  }, [activeSlide]);

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-surface-light dark:bg-surface-dark
        transition-opacity duration-[1.8s] ${active === 'ready' ? 'opacity-0' : 'opacity-100'}`}
    >
      <IDEBackground />

      {/* Interactive Spotlight */}
      <div 
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 opacity-0 md:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(167, 198, 54, 0.15), transparent 80%)`
        }}
      />
      
      {/* Ambient static glow for mobile or fallback */}
      <div className="absolute inset-0 md:hidden bg-[radial-gradient(circle_at_center,rgba(167,198,54,0.1)_0%,transparent_100%)]" />

      {/* Content */}
      <div className="relative z-10 section-container flex flex-col items-center justify-center h-full py-20 text-center">
        
        {/* Animated Badge */}
        <div className={`mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-lime/30 bg-lime/5 backdrop-blur-md
          transform transition-all duration-[1s] delay-300
          ${active === 'ready' ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
          <span className="text-xs font-medium text-lime tracking-wide">Available for Work</span>
        </div>

        <div className="space-y-4 md:space-y-6 max-w-4xl mx-auto flex flex-col items-center">
          <p className={`text-xs md:text-sm font-medium uppercase tracking-[0.3em] text-text-secondary-light dark:text-text-secondary-dark
            transform transition-all duration-[1s] delay-500
            ${active === 'ready' ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            Front-end Developer
          </p>
          
          <h2 className={`text-[clamp(3.5rem,10vw,8rem)] font-bold leading-[1.1] tracking-tighter text-text-primary-light dark:text-text-primary-dark
            transform transition-all duration-[1s] delay-700
            ${active === 'ready' ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
            Build & <span className="text-gradient">Ship</span>
          </h2>
          
          <p className={`text-base md:text-xl text-text-secondary-light dark:text-text-secondary-dark max-w-xl mx-auto font-medium
            transform transition-all duration-[1s] delay-[900ms]
            ${active === 'ready' ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            디자인과 개발의 경계를 허무는 프론트엔드 포트폴리오. <br className="hidden sm:block" />
            사용자 중심의 인터랙션과 최적화된 경험을 설계합니다.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className={`mt-10 flex flex-col sm:flex-row items-center gap-4
          transform transition-all duration-[1s] delay-[1100ms]
          ${active === 'ready' ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          <a href="#about" onClick={(e) => {
            e.preventDefault();
            document.querySelector('[data-index="1"]').scrollIntoView({ behavior: 'smooth' });
          }} className="btn-primary w-full sm:w-auto rounded-none">
            Explore Work
          </a>
          <a href="https://github.com/LDH9276" target="_blank" rel="noopener noreferrer" className="btn-outline w-full sm:w-auto rounded-none flex items-center gap-2">
            View GitHub
          </a>
        </div>
      </div>

      <Scroll />
    </div>
  );
}

export default Banner;