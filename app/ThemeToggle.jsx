'use client';
import React from 'react';
import { useTheme } from './Context';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="group relative w-9 h-9 flex items-center justify-center rounded-none
                 border border-border-light dark:border-border-dark
                 bg-surface-card-light dark:bg-surface-card-dark
                 transition-all duration-300
                 hover:border-lime"
      aria-label="테마 전환"
    >
      <Sun
        aria-hidden="true"
        className={`absolute w-4 h-4 transition-all duration-300 text-text-primary-light dark:text-text-primary-dark
          ${theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-0'}`}
        strokeWidth={1.5}
      />
      {/* Moon icon */}
      <Moon
        aria-hidden="true"
        className={`absolute w-4 h-4 transition-all duration-300 text-text-primary-light dark:text-text-primary-dark
          ${theme === 'light' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`}
        strokeWidth={1.5}
      />
    </button>
  );
}
