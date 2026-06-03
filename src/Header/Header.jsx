import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Menus from './Menus';
import { useAppContext } from '../../app/Context';
import Image from 'next/image';
import ThemeToggle from '../../app/ThemeToggle';
import { Menu, X } from 'lucide-react';

function Header() {
  const { isStart, activeSlide, setActiveSlide, isScrolled, setPendingScrollIndex } = useAppContext();
  const [toggle, setToggle] = useState('');
  const [menus, setMenus] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const desktopMedia = window.matchMedia('(min-width: 1024px)');
    const closeMobileMenu = (event) => {
      if (!event.matches) return;
      setToggle('');
      setMenus(false);
    };

    desktopMedia.addEventListener('change', closeMobileMenu);
    return () => desktopMedia.removeEventListener('change', closeMobileMenu);
  }, []);

  const toMainTitle = () => {
    setToggle('');
    setTimeout(() => {
      setMenus(false);
    }, 500);
    setActiveSlide(0);
    const section = document.querySelector(`[data-index="0"]`);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
    if (window.location.pathname !== '/') {
      setPendingScrollIndex(0);
      router.push('/');
    }
  }

  const handleNavClick = (index) => {
    if (window.location.pathname === '/') {
      setActiveSlide(index);
      const section = document.querySelector(`[data-index="${index}"]`);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setPendingScrollIndex(index);
      router.push('/');
    }
  };

  const menuEvent = () => {
    if (toggle === '') {
      setMenus(true);
      setTimeout(() => {
        setToggle('active');
      }, 0);
    } else {
      setToggle('');
      setTimeout(() => {
        setMenus(false);
      }, 500);
    }
  }

  const navItems = [
    { name: 'Introduce', index: 0 },
    { name: 'About Me', index: 1 },
    { name: 'Person Project', index: 2 },
    { name: 'Team Project', index: 3 },
    { name: 'Publishing Works', index: 4 },
    { name: 'Contact', index: 5 },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500
        ${isScrolled
          ? 'bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-border-light dark:border-border-dark py-2'
          : 'bg-transparent border-b border-transparent py-4'}
        ${isStart === 'ready' ? 'opacity-0 -translate-y-full' : 'opacity-100 translate-y-0'}
      `}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] btn-primary"
        >
          본문으로 건너뛰기
        </a>
        <div className={`section-container flex items-center justify-between transition-all duration-500 ${isScrolled ? 'h-10 md:h-12' : 'h-14 md:h-16'}`}>
        
        {/* Left: Logo */}
        <div className="flex items-center">
          <h1 className="flex items-center">
            <button
              type="button"
              onClick={toMainTitle}
              className="cursor-pointer transition-opacity duration-300 hover:opacity-70 flex-shrink-0 flex items-center"
              aria-label="홈으로 이동"
            >
              <Image src="/images/logo.svg" alt="" width={isScrolled ? 80 : 100} height={isScrolled ? 30 : 40} className="block dark:hidden transition-all duration-500" />
              <Image src="/images/logo-dark.svg" alt="" width={isScrolled ? 80 : 100} height={isScrolled ? 30 : 40} className="hidden dark:block transition-all duration-500" />
            </button>
          </h1>
        </div>

        {/* Center: Desktop Inline Navigation */}
        <nav className="hidden lg:flex items-center gap-0.5 relative" aria-label="주요 섹션">
          {navItems.map((item) => (
            <button
              type="button"
              key={item.name}
              onClick={() => handleNavClick(item.index)}
              aria-current={activeSlide === item.index ? 'page' : undefined}
              className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 rounded-none
                ${activeSlide === item.index 
                  ? 'text-lime' 
                  : 'text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark'}`}
            >
              {item.name}
              {/* Active indicator bar */}
              <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-lime
                transition-all duration-300
                ${activeSlide === item.index ? 'w-full opacity-100' : 'w-0 opacity-0'}`} />
              {/* Hover underline */}
              <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] bg-text-muted-light dark:bg-text-muted-dark
                transition-all duration-300
                ${activeSlide === item.index ? 'w-0 opacity-0' : 'w-0 opacity-0 group-hover:w-3/4 group-hover:opacity-100'}`} />
            </button>
          ))}
        </nav>

        {/* Right: Actions & Mobile Toggle */}
        <div className="flex items-center gap-2 md:gap-3">
          
          <ThemeToggle />

          <a 
            href="https://github.com/LDH9276" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="GitHub 프로필 새 창으로 열기"
            className="hidden lg:inline-flex items-center justify-center px-4 py-2
              bg-text-primary-light dark:bg-text-primary-dark 
              text-surface-light dark:text-surface-dark 
              text-sm font-medium transition-all duration-300
              hover:bg-lime hover:text-surface-dark
              rounded-none"
          >
            GitHub
          </a>

          {/* Mobile Hamburger */}
            <button
              type="button"
              className={`lg:hidden relative z-50 w-9 h-9 flex flex-col items-center justify-center gap-[5px]
                border transition-all duration-300 hover:border-lime rounded-none
                ${toggle === 'active'
                  ? 'border-lime bg-lime'
                  : 'border-border-light dark:border-border-dark bg-surface-card-light dark:bg-surface-card-dark'}`}
              onClick={menuEvent}
              aria-controls="mobile-menu"
              aria-label={toggle === 'active' ? 'Close menu' : 'Open menu'}
              aria-expanded={toggle === 'active'}
            >
              {toggle === 'active' ? (
                <X size={18} aria-hidden="true" strokeWidth={1.75} className="text-surface-dark" />
              ) : (
                <Menu size={18} aria-hidden="true" strokeWidth={1.75} className="text-text-primary-light dark:text-text-primary-dark" />
              )}
            </button>
          </div>
        </div>
      </header>

      {menus && <Menus setToggle={setToggle} toggle={toggle} menuEvent={menuEvent} />}
    </>
  );
}

export default Header;
