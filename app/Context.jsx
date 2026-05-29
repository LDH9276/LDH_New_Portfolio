'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

// App state context
const AppContext = createContext({
  isStart: '',
  setIsStart: () => {},
  activeSlide: 0,
  setActiveSlide: () => {},
  p_slide: 0,
  isScrolled: false,
  setIsScrolled: () => {},
  reset: () => {}
});

// Theme context
const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

export function AppProvider({ children }) {
  const [showIntro, setShowIntro] = useState(true);
  const [isStart, setIsStart] = useState('ready');
  const [activeSlide, setActiveSlide] = useState(0);
  const [p_slide, setP_slide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowIntro(false);
      setIsStart('');
    }, []);
    return () => clearTimeout(timeoutId);
  }, []);

  // Theme persistence
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) {
      setTheme(saved);
      document.documentElement.classList.toggle('dark', saved === 'dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  };

  const reset = () => {
    setP_slide(0);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <AppContext.Provider value={{
        isStart, setIsStart,
        activeSlide, setActiveSlide,
        p_slide, setP_slide,
        isScrolled, setIsScrolled,
        reset
      }}>
        {children}
      </AppContext.Provider>
    </ThemeContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}

export function useTheme() {
  return useContext(ThemeContext);
}
