'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [showIntro, setShowIntro] = useState(true);
  const [isStart, setIsStart] = useState('ready');
  const [activeSlide, setActiveSlide] = useState(0);
  const [p_slide, setP_slide] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowIntro(false);
      setIsStart('');
    }, []);
    return () => clearTimeout(timeoutId);
  }, []);

  const reset = () => {
    setP_slide(0);
  };

  return (
    <AppContext.Provider value={{
      isStart, setIsStart,
      activeSlide, setActiveSlide,
      p_slide, setP_slide,
      reset
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
