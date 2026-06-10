import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../../app/Context';
import { ChevronDown } from 'lucide-react';
import projectdata from '../Component/projectdata.json';

function Menus( {toggle, setToggle, menuEvent} ) {
  const { setActiveSlide, setPendingScrollIndex, reset } = useAppContext();
  const [projectMenu, setProjectMenu] = useState('');
  const firstButtonRef = useRef(null);
  const projectMenuTabIndex = projectMenu === 'active' ? 0 : -1;
  const projects = projectdata.projects.slice(0).sort((a, b) => b.id - a.id);
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

  const menuOpen = () => {
    setProjectMenu(projectMenu === '' ? 'active' : '');
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
      className={`fixed inset-0 z-40 bg-surface-light text-text-primary-light transition-all duration-500 dark:bg-surface-dark dark:text-text-primary-dark
      ${toggle === 'active' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <nav className="section-container flex h-full items-center overflow-y-auto py-24" aria-label="모바일 주요 메뉴">
        <ul className="w-full border-t border-border-light text-left dark:border-border-dark">
          {/* Introduce */}
          <li>
            <button
              ref={firstButtonRef}
              type="button"
              onClick={() => gnbHandleEvent(0)}
              className="block w-full border-b border-border-light py-5 text-[clamp(2.2rem,12vw,5rem)] font-black uppercase leading-none tracking-normal transition-colors duration-300 hover:text-lime dark:border-border-dark"
            >
              Introduce
            </button>
          </li>

          {/* About Me */}
          <li>
            <button
              type="button"
              onClick={() => gnbHandleEvent(1)} 
              className="block w-full border-b border-border-light py-5 text-[clamp(2.2rem,12vw,5rem)] font-black uppercase leading-none tracking-normal transition-colors duration-300 hover:text-lime dark:border-border-dark"
            >
              About
            </button>
          </li>

          {/* Publishing Works */}
          <li>
            <button
              type="button"
              onClick={() => gnbHandleEvent(4)}
              className="block w-full border-b border-border-light py-5 text-[clamp(2.2rem,12vw,5rem)] font-black uppercase leading-none tracking-normal transition-colors duration-300 hover:text-lime dark:border-border-dark"
            >
              Publishing
            </button>
          </li>

          {/* Projects */}
          <li>
            <button
              type="button"
              onClick={menuOpen}
              aria-expanded={projectMenu === 'active'}
              aria-controls="mobile-projects"
              className="flex w-full items-center justify-between border-b border-border-light py-5 text-[clamp(2.2rem,12vw,5rem)] font-black uppercase leading-none tracking-normal transition-colors duration-300 hover:text-lime dark:border-border-dark"
            >
              Projects
              <ChevronDown
                size={18}
                aria-hidden="true"
                strokeWidth={1.75}
                className={`transition-transform duration-300 ${projectMenu === 'active' ? 'rotate-180' : ''}`}
              />
            </button>
            <ul
              id="mobile-projects"
              aria-hidden={projectMenu !== 'active'}
              className={`overflow-hidden border-b border-border-light transition-all duration-500 dark:border-border-dark
              ${projectMenu === 'active' ? 'max-h-[32rem] opacity-100 py-4' : 'max-h-0 opacity-0'}`}>
              <li><button type="button" tabIndex={projectMenuTabIndex} onClick={() => gnbHandleEvent(2)} className="block w-full py-2 text-left text-sm font-bold uppercase tracking-[0.14em] text-text-muted-light transition-colors hover:text-lime dark:text-text-muted-dark">프로젝트 한 눈에 보기</button></li>
              {projects.map((project) => (
                <li key={project.id}>
                  <button type="button" tabIndex={projectMenuTabIndex} onClick={() => toPortfolio(project.id)} className="block w-full py-2 text-left text-sm font-bold uppercase tracking-[0.14em] text-text-muted-light transition-colors hover:text-lime dark:text-text-muted-dark">
                    {project.name}
                  </button>
                </li>
              ))}
            </ul>
          </li>

          {/* Contact */}
          <li>
            <button
              type="button"
              onClick={() => gnbHandleEvent(5)}
              className="block w-full border-b border-border-light py-5 text-[clamp(2.2rem,12vw,5rem)] font-black uppercase leading-none tracking-normal transition-colors duration-300 hover:text-lime dark:border-border-dark"
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
