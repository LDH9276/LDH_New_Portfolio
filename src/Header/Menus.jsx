import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../../app/Context';

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function Menus({ toggle, onClose }) {
  const { setActiveSlide, setPendingScrollIndex } = useAppContext();
  const dialogRef = useRef(null);
  const firstButtonRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (toggle === 'active') firstButtonRef.current?.focus();
  }, [toggle]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (toggle !== 'active') return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key !== 'Tab') return;

      const focusableElements = Array.from(
        dialogRef.current?.querySelectorAll(focusableSelector) ?? []
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) {
        e.preventDefault();
        dialogRef.current?.focus();
        return;
      }

      if (!dialogRef.current?.contains(document.activeElement)) {
        e.preventDefault();
        firstElement.focus();
        return;
      }

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
        return;
      }

      if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, toggle]);

  const gnbHandleEvent = (index) => {
    onClose();
    setActiveSlide(index);
    setPendingScrollIndex(index);
    router.push('/');
  }

  return (
    <div
      ref={dialogRef}
      id="mobile-menu"
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-menu-title"
      className={`fixed inset-0 z-40 bg-surface-light text-text-primary-light transition-all duration-500 dark:bg-surface-dark dark:text-text-primary-dark
      ${toggle === 'active' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <h2 id="mobile-menu-title" className="sr-only">
        모바일 전체 메뉴
      </h2>
      <nav className="section-container flex h-full items-center overflow-y-auto py-24" aria-label="모바일 주요 메뉴">
        <ul className="w-full border-t border-border-light text-left dark:border-border-dark">
          {/* Introduce */}
          <li>
            <button
              ref={firstButtonRef}
              type="button"
              onClick={() => gnbHandleEvent(0)}
              className="block w-full border-b border-border-light py-5 text-[clamp(2.2rem,12vw,5rem)] font-black uppercase leading-none tracking-normal transition-colors duration-300 hover:text-lime-contrast dark:border-border-dark dark:hover:text-lime"
            >
              Introduce
            </button>
          </li>

          {/* About Me */}
          <li>
            <button
              type="button"
              onClick={() => gnbHandleEvent(1)} 
              className="block w-full border-b border-border-light py-5 text-[clamp(2.2rem,12vw,5rem)] font-black uppercase leading-none tracking-normal transition-colors duration-300 hover:text-lime-contrast dark:border-border-dark dark:hover:text-lime"
            >
              About
            </button>
          </li>

          {/* Publishing Works */}
          <li>
            <button
              type="button"
              onClick={() => gnbHandleEvent(4)}
              className="block w-full border-b border-border-light py-5 text-[clamp(2.2rem,12vw,5rem)] font-black uppercase leading-none tracking-normal transition-colors duration-300 hover:text-lime-contrast dark:border-border-dark dark:hover:text-lime"
            >
              Publishing
            </button>
          </li>

          {/* Projects */}
          <li>
            <button
              type="button"
              onClick={() => gnbHandleEvent(2)}
              className="block w-full border-b border-border-light py-5 text-[clamp(2.2rem,12vw,5rem)] font-black uppercase leading-none tracking-normal transition-colors duration-300 hover:text-lime-contrast dark:border-border-dark dark:hover:text-lime"
            >
              Projects
            </button>
          </li>

          {/* Contact */}
          <li>
            <button
              type="button"
              onClick={() => gnbHandleEvent(5)}
              className="block w-full border-b border-border-light py-5 text-[clamp(2.2rem,12vw,5rem)] font-black uppercase leading-none tracking-normal transition-colors duration-300 hover:text-lime-contrast dark:border-border-dark dark:hover:text-lime"
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
