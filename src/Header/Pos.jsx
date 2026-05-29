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
          <span className={`block transition-all duration-300
            ${activeSlide === index 
              ? 'w-8 h-[2px] bg-lime' 
              : 'w-4 h-[1px] bg-text-muted-light dark:bg-text-muted-dark group-hover:w-6 group-hover:bg-lime'}`} 
          />
        </button>
      ))}
    </nav>
  );
}

export default Pos;