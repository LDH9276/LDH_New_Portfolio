import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../../app/Context';
import { ChevronDown } from 'lucide-react';

function Menus( {toggle, setToggle, menuEvent} ) {
  const { setActiveSlide, setPendingScrollIndex, reset } = useAppContext();
  const [menu01, setMenu01] = useState('');
  const [menu02, setMenu02] = useState('');
  const firstButtonRef = useRef(null);
  const personMenuTabIndex = menu01 === 'active' ? 0 : -1;
  const teamMenuTabIndex = menu02 === 'active' ? 0 : -1;
  const router = useRouter();

  useEffect(() => {
    if (toggle === 'active') firstButtonRef.current?.focus();
  }, [toggle]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && toggle === 'active') menuEvent();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuEvent, toggle]);

  const menuOpen01 = () => {
    setMenu01(menu01 === '' ? 'active' : '');
    setMenu02('');
  }
  const menuOpen02 = () => {
    setMenu02(menu02 === '' ? 'active' : '');
    setMenu01('');
  }

  const gnbHandleEvent = (index) => {
    setToggle('');
    menuEvent();
    setActiveSlide(index);
    setPendingScrollIndex(index);
    router.push('/');
  }

  const toPortfolio = (index) => {
    setToggle('');
    menuEvent();
    reset();
    router.push(`/portfolio/${index}`);
  }

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="모바일 전체 메뉴"
      className={`fixed inset-0 z-40
      bg-surface-dark/95 backdrop-blur-sm
      transition-all duration-500
      ${toggle === 'active' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <nav className="h-full flex items-center justify-center overflow-y-auto py-24" aria-label="모바일 주요 메뉴">
        <ul className="flex flex-col gap-1 text-center">
          {/* Introduce */}
          <li>
            <button
              ref={firstButtonRef}
              type="button"
              onClick={() => gnbHandleEvent(0)}
              className="block w-full py-3 px-8 text-2xl md:text-4xl font-bold text-white/60
                hover:text-lime transition-colors duration-300 tracking-tight"
            >
              Introduce
            </button>
          </li>

          {/* About Me */}
          <li>
            <button
              type="button"
              onClick={() => gnbHandleEvent(1)} 
              className="block w-full py-3 px-8 text-2xl md:text-4xl font-bold text-white/60
                hover:text-lime transition-colors duration-300 tracking-tight"
            >
              About Me
            </button>
          </li>

          {/* Publishing Works */}
          <li>
            <button
              type="button"
              onClick={() => gnbHandleEvent(4)}
              className="block w-full py-3 px-8 text-2xl md:text-4xl font-bold text-white/60
                hover:text-lime transition-colors duration-300 tracking-tight"
            >
              Publishing Works
            </button>
          </li>

          {/* Team Project */}
          <li>
            <button
              type="button"
              onClick={menuOpen02}
              aria-expanded={menu02 === 'active'}
              aria-controls="mobile-team-projects"
              className="flex items-center justify-center gap-2 w-full py-3 px-8
                text-2xl md:text-4xl font-bold text-white/60
                hover:text-lime transition-colors duration-300 tracking-tight"
            >
              Team Project
              <ChevronDown
                size={18}
                aria-hidden="true"
                strokeWidth={1.75}
                className={`transition-transform duration-300 ${menu02 === 'active' ? 'rotate-180' : ''}`}
              />
            </button>
            <ul
              id="mobile-team-projects"
              aria-hidden={menu02 !== 'active'}
              className={`overflow-hidden transition-all duration-500
              ${menu02 === 'active' ? 'max-h-60 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
              <li><button type="button" tabIndex={teamMenuTabIndex} onClick={() => gnbHandleEvent(3)} className="block w-full py-2 text-sm text-white/40 hover:text-lime transition-colors">팀 프로젝트 한 눈에 보기</button></li>
              <li><button type="button" tabIndex={teamMenuTabIndex} onClick={() => toPortfolio(8)} className="block w-full py-2 text-sm text-white/40 hover:text-lime transition-colors">LMS프로젝트 - 유저</button></li>
              <li><button type="button" tabIndex={teamMenuTabIndex} onClick={() => toPortfolio(7)} className="block w-full py-2 text-sm text-white/40 hover:text-lime transition-colors">LMS프로젝트 - 관리자</button></li>
              <li><button type="button" tabIndex={teamMenuTabIndex} onClick={() => toPortfolio(6)} className="block w-full py-2 text-sm text-white/40 hover:text-lime transition-colors">넷마블 브랜드 프로젝트</button></li>
              <li><button type="button" tabIndex={teamMenuTabIndex} onClick={() => toPortfolio(5)} className="block w-full py-2 text-sm text-white/40 hover:text-lime transition-colors">시드물 반응형 프로젝트</button></li>
            </ul>
          </li>

          {/* Person Project */}
          <li>
            <button
              type="button"
              onClick={menuOpen01}
              aria-expanded={menu01 === 'active'}
              aria-controls="mobile-person-projects"
              className="flex items-center justify-center gap-2 w-full py-3 px-8
                text-2xl md:text-4xl font-bold text-white/60
                hover:text-lime transition-colors duration-300 tracking-tight"
            >
              Person Project
              <ChevronDown
                size={18}
                aria-hidden="true"
                strokeWidth={1.75}
                className={`transition-transform duration-300 ${menu01 === 'active' ? 'rotate-180' : ''}`}
              />
            </button>
            <ul
              id="mobile-person-projects"
              aria-hidden={menu01 !== 'active'}
              className={`overflow-hidden transition-all duration-500
              ${menu01 === 'active' ? 'max-h-60 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
              <li><button type="button" tabIndex={personMenuTabIndex} onClick={() => gnbHandleEvent(2)} className="block w-full py-2 text-sm text-white/40 hover:text-lime transition-colors">개인 프로젝트 한 눈에 보기</button></li>
              <li><button type="button" tabIndex={personMenuTabIndex} onClick={() => toPortfolio(4)} className="block w-full py-2 text-sm text-white/40 hover:text-lime transition-colors">무인양품 프로젝트</button></li>
              <li><button type="button" tabIndex={personMenuTabIndex} onClick={() => toPortfolio(3)} className="block w-full py-2 text-sm text-white/40 hover:text-lime transition-colors">나만의 가계부 프로젝트</button></li>
              <li><button type="button" tabIndex={personMenuTabIndex} onClick={() => toPortfolio(2)} className="block w-full py-2 text-sm text-white/40 hover:text-lime transition-colors">B&O 리뉴얼 프로젝트</button></li>
              <li><button type="button" tabIndex={personMenuTabIndex} onClick={() => toPortfolio(1)} className="block w-full py-2 text-sm text-white/40 hover:text-lime transition-colors">사세 적응형 프로젝트</button></li>
            </ul>
          </li>

          {/* Contact */}
          <li>
            <button
              type="button"
              onClick={() => gnbHandleEvent(5)}
              className="block w-full py-3 px-8 text-2xl md:text-4xl font-bold text-white/60
                hover:text-lime transition-colors duration-300 tracking-tight"
            >
              Contact
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Menus;
