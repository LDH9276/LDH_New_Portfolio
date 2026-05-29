import React, {useState} from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../../app/Context';
import Image from 'next/image';

function Menus( {toggle, setToggle, menuEvent} ) {
  const { setActiveSlide, reset } = useAppContext();
  const [menu01, setMenu01] = useState('');
  const [menu02, setMenu02] = useState('');
  const router = useRouter();

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
    router.push('/');
  }

  const toPortfolio = (index) => {
    setToggle('');
    menuEvent();
    reset();
    router.push(`/portfolio/${index}`);
  }

  return (
    <div className={`fixed inset-0 z-40 
      bg-surface-dark/95 backdrop-blur-sm
      transition-all duration-500
      ${toggle === 'active' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <nav className="h-full flex items-center justify-center">
        <ul className="flex flex-col gap-1 text-center">
          {/* Introduce */}
          <li>
            <button 
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
              onClick={() => gnbHandleEvent(1)} 
              className="block w-full py-3 px-8 text-2xl md:text-4xl font-bold text-white/60
                hover:text-lime transition-colors duration-300 tracking-tight"
            >
              About Me
            </button>
          </li>

          {/* Person Project */}
          <li>
            <button
              onClick={menuOpen01}
              className="flex items-center justify-center gap-2 w-full py-3 px-8 
                text-2xl md:text-4xl font-bold text-white/60
                hover:text-lime transition-colors duration-300 tracking-tight"
            >
              Person Project
              <svg className={`w-4 h-4 transition-transform duration-300 ${menu01 === 'active' ? 'rotate-180' : ''}`} 
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="square" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <ul className={`overflow-hidden transition-all duration-500 
              ${menu01 === 'active' ? 'max-h-60 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
              <li><button onClick={() => gnbHandleEvent(2)} className="block w-full py-2 text-sm text-white/40 hover:text-lime transition-colors">개인 프로젝트 한 눈에 보기</button></li>
              <li><button onClick={() => toPortfolio(4)} className="block w-full py-2 text-sm text-white/40 hover:text-lime transition-colors">무인양품 프로젝트</button></li>
              <li><button onClick={() => toPortfolio(3)} className="block w-full py-2 text-sm text-white/40 hover:text-lime transition-colors">나만의 가계부 프로젝트</button></li>
              <li><button onClick={() => toPortfolio(2)} className="block w-full py-2 text-sm text-white/40 hover:text-lime transition-colors">B&O 리뉴얼 프로젝트</button></li>
              <li><button onClick={() => toPortfolio(1)} className="block w-full py-2 text-sm text-white/40 hover:text-lime transition-colors">사세 적응형 프로젝트</button></li>
            </ul>
          </li>

          {/* Team Project */}
          <li>
            <button
              onClick={menuOpen02}
              className="flex items-center justify-center gap-2 w-full py-3 px-8 
                text-2xl md:text-4xl font-bold text-white/60
                hover:text-lime transition-colors duration-300 tracking-tight"
            >
              Team Project
              <svg className={`w-4 h-4 transition-transform duration-300 ${menu02 === 'active' ? 'rotate-180' : ''}`} 
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="square" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <ul className={`overflow-hidden transition-all duration-500
              ${menu02 === 'active' ? 'max-h-60 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
              <li><button onClick={() => gnbHandleEvent(3)} className="block w-full py-2 text-sm text-white/40 hover:text-lime transition-colors">팀 프로젝트 한 눈에 보기</button></li>
              <li><button onClick={() => toPortfolio(8)} className="block w-full py-2 text-sm text-white/40 hover:text-lime transition-colors">LMS프로젝트 - 유저</button></li>
              <li><button onClick={() => toPortfolio(7)} className="block w-full py-2 text-sm text-white/40 hover:text-lime transition-colors">LMS프로젝트 - 관리자</button></li>
              <li><button onClick={() => toPortfolio(6)} className="block w-full py-2 text-sm text-white/40 hover:text-lime transition-colors">넷마블 브랜드 프로젝트</button></li>
              <li><button onClick={() => toPortfolio(5)} className="block w-full py-2 text-sm text-white/40 hover:text-lime transition-colors">시드물 반응형 프로젝트</button></li>
            </ul>
          </li>

          {/* Contact */}
          <li>
            <button
              onClick={() => gnbHandleEvent(4)}
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