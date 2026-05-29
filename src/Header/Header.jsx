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

  const toggleHandleClick = () => {
    menuEvent();
  }

  return (
    <header className={`fixed top-0 left-0 w-full z-50
      bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md
      border-b border-border-light dark:border-border-dark
      transition-all duration-500
      ${isStart === 'ready' ? 'opacity-0 -translate-y-full' : 'opacity-100 translate-y-0'}`}
    >
      <div className="section-container flex items-center justify-between h-16">
        {/* Logo */}
        <h1 
          onClick={toMainTitle} 
          className="cursor-pointer transition-opacity duration-300 hover:opacity-70"
        >
          <Image src="/images/logo.svg" alt="로고" width={90} height={35} className="dark:invert dark:brightness-200" />
        </h1>

        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Hamburger */}
          <button 
            className={`relative w-10 h-10 flex flex-col items-center justify-center gap-[6px]
              border border-border-light dark:border-border-dark
              bg-surface-card-light dark:bg-surface-card-dark
              transition-all duration-300 hover:border-lime
              ${toggle === 'active' ? 'border-lime' : ''}`}
            onClick={toggleHandleClick}
          >
            <span className={`block w-5 h-[1.5px] bg-text-primary-light dark:bg-text-primary-dark
              transition-all duration-300 origin-center
              ${toggle === 'active' ? 'rotate-45 translate-y-[3.75px]' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-text-primary-light dark:bg-text-primary-dark
              transition-all duration-300 origin-center
              ${toggle === 'active' ? '-rotate-45 -translate-y-[3.75px]' : ''}`} />
          </button>
        </div>
      </div>

      {menus && <Menus setToggle={setToggle} toggle={toggle} menuEvent={menuEvent} />}
    </header>
  );
}

export default Header;