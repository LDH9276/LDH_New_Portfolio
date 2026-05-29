'use client';
import React, { useEffect, useRef } from "react";
import Banner from '../src/Component/Banner';
import About from '../src/Component/About';
import PersonProject from '../src/Component/PersonProject';
import TeamProject from '../src/Component/TeamProject';
import Contact from "../src/Component/Contact";
import Pos from '../src/Header/Pos';
import { useAppContext } from './Context';

export default function Page() {
  const { isStart, activeSlide, setActiveSlide, setIsScrolled, pendingScrollIndex, setPendingScrollIndex, reset } = useAppContext();
  const containerRef = useRef(null);

  useEffect(() => {
    if (pendingScrollIndex !== null) {
      setTimeout(() => {
        setActiveSlide(pendingScrollIndex);
        const section = containerRef.current?.querySelector(`[data-index="${pendingScrollIndex}"]`);
        if (section) {
          section.scrollIntoView({ behavior: 'instant' });
        }
        setPendingScrollIndex(null);
      }, 50);
    }
  }, [pendingScrollIndex, setActiveSlide, setPendingScrollIndex]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setActiveSlide(index);
          }
        });
      },
      {
        root: containerRef.current,
        threshold: 0.5,
      }
    );

    const sections = containerRef.current.querySelectorAll('.scroll-section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [setActiveSlide]);

  const handleSlideNavigation = (index) => {
    setActiveSlide(index);
    const sections = containerRef.current.querySelectorAll('.scroll-section');
    if (sections[index]) {
      sections[index].scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`transition-opacity duration-[2.5s] ${isStart === 'ready' ? 'opacity-0' : 'opacity-100'}`}>
      <Pos handleSlideNavigation={handleSlideNavigation} activeSlide={activeSlide} />
      
      <div 
        ref={containerRef}
        onScroll={(e) => {
          if (e.target.scrollTop > 50) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }
        }}
        className="h-screen w-full overflow-y-auto scroll-smooth"
      >
        <section data-index="0" className="scroll-section h-screen w-full relative">
          <Banner activeSlide={activeSlide} />
        </section>
        <section data-index="1" className="scroll-section min-h-screen w-full relative">
          <About activeSlide={activeSlide} />
        </section>
        <section data-index="2" className="scroll-section min-h-screen w-full relative">
          <PersonProject activeSlide={activeSlide} reset={reset} />
        </section>
        <section data-index="3" className="scroll-section min-h-screen w-full relative">
          <TeamProject activeSlide={activeSlide} reset={reset} />
        </section>
        <section data-index="4" className="scroll-section min-h-screen w-full relative">
          <Contact activeSlide={activeSlide} />
        </section>
      </div>
    </div>
  );
}
