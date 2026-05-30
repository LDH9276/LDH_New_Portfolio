import React from 'react';

function Pos( {handleSlideNavigation, activeSlide} ) {
  const navItems = ['Introduce', 'About Me', 'Person Project', 'Team Project', 'Contact'];

  return (
    <nav className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-40
      flex-col items-end gap-4">
      {navItems.map((label, index) => (
        <button
          key={index}
          className={`group flex items-center gap-3 transition-all duration-300`}
          onClick={() => handleSlideNavigation(index)}
        >
          <span className={`text-[11px] font-medium uppercase tracking-wider
            transition-all duration-300
            ${activeSlide === index 
              ? 'opacity-100 text-lime translate-x-0' 
              : 'opacity-0 text-text-secondary-light dark:text-text-secondary-dark translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`}
          >
            {label}
          </span>

          {/* Dot with pulse ring on active */}
          <span className="relative flex-shrink-0">
            {activeSlide === index && (
              <span className="absolute inset-0 w-full h-full rounded-full bg-lime/30 animate-ping" />
            )}
            <span className={`block relative z-10 rounded-full transition-all duration-300
              ${activeSlide === index 
                ? 'w-3 h-3 bg-lime shadow-[0_0_10px_rgba(167,198,54,0.5)]' 
                : 'w-2 h-2 bg-text-muted-light dark:bg-text-muted-dark group-hover:bg-lime group-hover:scale-125'}`} 
            />
          </span>

          {/* Active bar */}
          <span className={`block transition-all duration-300
            ${activeSlide === index 
              ? 'w-6 h-[2px] bg-lime' 
              : 'w-3 h-[1px] bg-text-muted-light dark:bg-text-muted-dark group-hover:w-5 group-hover:bg-lime'}`} 
          />
        </button>
      ))}
    </nav>
  );
}

export default Pos;