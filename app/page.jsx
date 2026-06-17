'use client';
import React, { useEffect, useRef } from "react";
import Banner from '../src/Component/Banner';
import About from '../src/Component/About';
import PersonProject from '../src/Component/PersonProject';
import PubProject from '../src/Component/PubProject';
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
        rootMargin: '-45% 0px -45% 0px',
        threshold: 0,
      }
    );

    const sections = containerRef.current.querySelectorAll('.scroll-section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [setActiveSlide]);

  const handleSlideNavigation = (index) => {
    setActiveSlide(index);
    const section = containerRef.current?.querySelector(`[data-index="${index}"]`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
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
        <section
          id="intro"
          data-index="0"
          aria-labelledby="intro-title"
          className="scroll-section h-screen w-full relative"
        >
          <Banner activeSlide={activeSlide} titleId="intro-title" />
        </section>

        {/* Section divider */}
        <div className="section-divider" />

        <section
          id="about"
          data-index="1"
          aria-labelledby="about-title"
          className="scroll-section min-h-screen py-24 md:py-28 lg:py-32 w-full relative"
        >
          <About activeSlide={activeSlide} titleId="about-title" />
        </section>

        <div className="section-divider" />

        <section
          id="publishing"
          data-index="4"
          aria-labelledby="publishing-title"
          className="scroll-section min-h-screen py-24 md:py-28 lg:py-32 w-full relative"
        >
          <PubProject activeSlide={activeSlide} reset={reset} titleId="publishing-title" />
        </section>

        <div className="section-divider" />

        <section
          id="projects"
          data-index="2"
          aria-labelledby="projects-title"
          className="scroll-section min-h-screen py-24 md:py-28 lg:py-32 w-full relative"
        >
          <PersonProject activeSlide={activeSlide} reset={reset} titleId="projects-title" />
        </section>

        <div className="section-divider" />

        <section
          id="contact"
          data-index="5"
          aria-labelledby="contact-title"
          className="scroll-section min-h-screen py-24 md:py-28 lg:py-32 w-full relative"
        >
          <Contact activeSlide={activeSlide} titleId="contact-title" />
        </section>
      </div>
    </div>
  );
}
