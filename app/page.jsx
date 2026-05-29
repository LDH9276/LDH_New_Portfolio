'use client';
import React, { useEffect, useRef } from "react";
import '../src/Route/css/main.css';
import Banner from '../src/Component/Banner';
import About from '../src/Component/About';
import PersonProject from '../src/Component/PersonProject';
import TeamProject from '../src/Component/TeamProject';
import Contact from "../src/Component/Contact";
import Pos from '../src/Header/Pos';
import { useAppContext } from './Context';

export default function Page() {
  const { isStart, activeSlide, setActiveSlide, reset } = useAppContext();
  const containerRef = useRef(null);

  // Use IntersectionObserver to update activeSlide as the user scrolls
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
    <div className={`main ${isStart}`}>
      <Pos handleSlideNavigation={handleSlideNavigation} activeSlide={activeSlide} />
      
      {/* Native scroll container using Tailwind snap scroll utilities */}
      <div 
        ref={containerRef}
        className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth"
      >
        <section data-index="0" className="snap-start h-screen w-full relative">
          <Banner activeSlide={activeSlide} />
        </section>
        <section data-index="1" className="snap-start h-screen w-full relative">
          <About activeSlide={activeSlide} />
        </section>
        <section data-index="2" className="snap-start h-screen w-full relative">
          <PersonProject activeSlide={activeSlide} reset={reset} />
        </section>
        <section data-index="3" className="snap-start h-screen w-full relative">
          <TeamProject activeSlide={activeSlide} reset={reset} />
        </section>
        <section data-index="4" className="snap-start h-screen w-full relative">
          <Contact activeSlide={activeSlide} />
        </section>
      </div>
    </div>
  );
}
