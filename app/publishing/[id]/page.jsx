'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { Briefcase, Clock3, PanelsTopLeft } from 'lucide-react';
import companydata from '../../../src/Component/companydata.json';
import Scroll from '../../../src/Header/Scroll';
import ScrollPf from '../../../src/Header/ScrollPf';
import { useAppContext } from '../../Context';

function PublishingPage() {
  const { isStart, setP_slide, setPendingScrollIndex } = useAppContext();
  const containerRef = useRef(null);
  const params = useParams();
  const router = useRouter();
  const portfolioItem = companydata.portfolio.find((item) => item.id === Number(params.id));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setP_slide(Number(entry.target.dataset.index));
          }
        });
      },
      { root: containerRef.current, threshold: 0.5 }
    );

    if (containerRef.current) {
      const sections = containerRef.current.querySelectorAll('.scroll-section');
      sections.forEach((section) => observer.observe(section));
    }

    return () => observer.disconnect();
  }, [setP_slide]);

  const toList = () => {
    setPendingScrollIndex(4);
    router.push('/');
  };

  if (!portfolioItem) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-text-muted-light dark:text-text-muted-dark">해당 작업을 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className={`transition-opacity duration-[2.5s] ${isStart === 'ready' ? 'opacity-0' : 'opacity-100'}`}>
      <div ref={containerRef} className="h-screen w-full overflow-y-auto scroll-smooth">
        {/* Slide 0: Intro */}
        <section data-index="0" className="scroll-section h-screen w-full relative">
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <Image src={portfolioItem.thumb} alt={portfolioItem.name} fill className="z-0 object-cover" priority />
            <div className="pointer-events-none absolute inset-0 z-[1] bg-black/70" />
            <div className="relative z-10 section-container text-center space-y-4">
              <span className="text-xs uppercase tracking-[0.3em] text-white/50">{portfolioItem.family}</span>
              <h1 className="text-display text-white">{portfolioItem.name}</h1>
              <p className="text-sm text-white/90">{portfolioItem.responsibility}</p>
              <p className="text-xs text-white/50">{portfolioItem.duration}</p>
            </div>
            <ScrollPf />
          </div>
        </section>

        {/* Slide 1: Overview */}
        <section data-index="1" className="scroll-section w-full relative flex items-center">
          <div className="section-container py-20">
            <span className="section-label">{portfolioItem.name}</span>
            <h2 className="section-title">작업 정보</h2>
            <div className="accent-line mb-10" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="card p-6">
                <Briefcase size={20} className="text-lime-contrast mb-5 dark:text-lime" />
                <span className="block text-[11px] uppercase tracking-[0.2em] text-text-muted-light dark:text-text-muted-dark mb-2">
                  담당 업무
                </span>
                <p className="text-base font-semibold text-text-primary-light dark:text-text-primary-dark">
                  {portfolioItem.responsibility}
                </p>
              </div>

              <div className="card p-6">
                <Clock3 size={20} className="text-lime-contrast mb-5 dark:text-lime" />
                <span className="block text-[11px] uppercase tracking-[0.2em] text-text-muted-light dark:text-text-muted-dark mb-2">
                  Duration
                </span>
                <p className="text-base font-semibold text-text-primary-light dark:text-text-primary-dark">
                  {portfolioItem.duration}
                </p>
              </div>

              <div className="card p-6">
                <PanelsTopLeft size={20} className="text-lime-contrast mb-5 dark:text-lime" />
                <span className="block text-[11px] uppercase tracking-[0.2em] text-text-muted-light dark:text-text-muted-dark mb-2">
                  Stack
                </span>
                <p className="text-base font-semibold text-text-primary-light dark:text-text-primary-dark">
                  {portfolioItem.family}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 2: Pages */}
        <section data-index="2" className="scroll-section w-full relative flex items-center">
          <div className="section-container py-20">
            <span className="section-label">{portfolioItem.name}</span>
            <h2 className="section-title">담당 페이지</h2>
            <div className="accent-line mb-10" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h3 className="text-subheading text-text-primary-light dark:text-text-primary-dark mb-4">
                  Publishing Scope
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary-light dark:text-text-secondary-dark">
                  퍼블리싱 실무에서 담당한 페이지 범위입니다.
                </p>
              </div>

              <ul className="space-y-3">
                {portfolioItem.pages.map((page, index) => (
                  <li key={page} className="card flex items-center gap-4 p-5">
                    <span className="text-xs font-mono text-lime-contrast dark:text-lime">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-semibold text-text-primary-light dark:text-text-primary-dark">
                      {page}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Slide 3: Samples */}
        <section data-index="3" className="scroll-section w-full relative flex items-center">
          <div className="section-container py-20">
            <span className="section-label">{portfolioItem.name}</span>
            <h2 className="section-title">이미지 샘플</h2>
            <div className="accent-line mb-10" />

            <div className="space-y-6">
              {portfolioItem.samples.map((sample) => (
                <div key={sample.src} className="card p-2">
                  <Image
                    src={sample.src}
                    alt={sample.alt}
                    width={1880}
                    height={866}
                    className="block w-full h-auto"
                  />
                </div>
              ))}
            </div>

            <div className="mt-12">
              <button type="button" className="btn-outline" onClick={toList}>
                ← 목록으로
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default PublishingPage;
