import React from 'react';

function Pos({ handleSlideNavigation, activeSlide }) {
  const navItems = [
    { label: 'Introduce', index: 0 },
    { label: 'About Me', index: 1 },
    { label: 'Publishing Works', index: 4 },
    { label: 'Projects', index: 2 },
    { label: 'Contact', index: 5 },
  ];

  return (
    <nav
      className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-40
      flex-col items-end gap-5"
      aria-label="섹션 바로가기"
    >
      {navItems.map(({ label, index }) => (
        <button
          type="button"
          key={label}
          className="group flex items-center gap-3 transition-all duration-300"
          onClick={() => handleSlideNavigation(index)}
          aria-label={`${label} 섹션으로 이동`}
          aria-current={activeSlide === index ? 'page' : undefined}
        >
          {/* Label text */}
          <span className={`text-[10px] font-semibold uppercase tracking-[0.15em]
            transition-all duration-300
            ${activeSlide === index
              ? 'opacity-100 text-lime translate-x-0'
              : 'opacity-0 text-text-secondary-light dark:text-text-secondary-dark translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`}
          >
            {label}
          </span>

          {/* Bar indicator — angular, no rounded shapes */}
          <span className={`block transition-all duration-300
            ${activeSlide === index
              ? 'w-8 h-[2px] bg-lime shadow-[0_0_8px_rgba(167,198,54,0.4)]'
              : 'w-3 h-[1px] bg-text-muted-light dark:bg-text-muted-dark group-hover:w-6 group-hover:bg-lime/70'}`}
          />
        </button>
      ))}
    </nav>
  );
}

export default Pos;
