import React, {useState} from 'react';
import { useRouter } from 'next/navigation';
import Menus from './Menus';
import { useAppContext } from '../../app/Context';
import Image from 'next/image';
import ThemeToggle from '../../app/ThemeToggle';

function Header() {
  const { isStart, setActiveSlide, reset } = useAppContext();
  const [toggle, setToggle] = useState('');
  const [menus , setMenus] = useState(false);
  const router = useRouter();

  const toMainTitle = () => {
    setToggle('');
    setTimeout(() => {
      setMenus(false);
    }, 500);
    setActiveSlide(0);
    router.push('/');
  }

  const handleNavClick = (index) => {
    setActiveSlide(index);
    router.push('/');
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
    { name: 'Contact', index: 4 },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50
      bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md
      border-b border-border-light dark:border-border-dark
      transition-all duration-500
      ${isStart === 'ready' ? 'opacity-0 -translate-y-full' : 'opacity-100 translate-y-0'}`}
    >
      <div className="section-container flex items-center justify-between h-14 md:h-16">
        
        {/* Left: Logo */}
        <div className="flex items-center">
          <h1 
            onClick={toMainTitle} 
            className="cursor-pointer transition-opacity duration-300 hover:opacity-70 flex-shrink-0"
          >
            <Image src="/images/logo.svg" alt="로고" width={90} height={35} className="dark:invert dark:brightness-200" />
          </h1>
        </div>

        {/* Center: Desktop Inline Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.index)}
              className="px-3 py-2 text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark
                hover:text-text-primary-light dark:hover:text-text-primary-dark
                hover:bg-surface-muted-light dark:hover:bg-surface-muted-dark
                transition-colors duration-200 rounded-none"
            >
              {item.name}
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
            className="hidden md:inline-flex items-center justify-center px-4 py-2 
              bg-text-primary-light dark:bg-text-primary-dark 
              text-surface-light dark:text-surface-dark 
              text-sm font-medium transition-colors hover:opacity-90 rounded-none"
          >
            GitHub
          </a>

          {/* Mobile Hamburger */}
          <button 
            className={`md:hidden relative w-9 h-9 flex flex-col items-center justify-center gap-[5px]
              border border-border-light dark:border-border-dark
              bg-surface-card-light dark:bg-surface-card-dark
              transition-all duration-300 hover:border-lime rounded-none
              ${toggle === 'active' ? 'border-lime' : ''}`}
            onClick={menuEvent}
            aria-label="Toggle menu"
          >
            <span className={`block w-4 h-[1.5px] bg-text-primary-light dark:bg-text-primary-dark
              transition-all duration-300 origin-center
              ${toggle === 'active' ? 'rotate-45 translate-y-[3.25px]' : ''}`} />
            <span className={`block w-4 h-[1.5px] bg-text-primary-light dark:bg-text-primary-dark
              transition-all duration-300 origin-center
              ${toggle === 'active' ? '-rotate-45 -translate-y-[3.25px]' : ''}`} />
          </button>
        </div>
      </div>

      {menus && <Menus setToggle={setToggle} toggle={toggle} menuEvent={menuEvent} />}
    </header>
  );
}

export default Header;