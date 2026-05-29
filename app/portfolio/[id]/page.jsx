'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import portfoliodata from '../../../src/Component/portfoliodata.json';
import Scroll from '../../../src/Header/Scroll';
import ScrollPf from '../../../src/Header/ScrollPf';
import { useAppContext } from '../../../app/Context';
import Image from 'next/image';
import Link from 'next/link';

function PortfolioPage() {
  const { p_slide, setP_slide, isStart, setActiveSlide } = useAppContext();
  const containerRef = useRef(null);
  
  const [tab, setTab] = useState(0);
  const [tab01, setTab01] = useState(0);
  const [img, setImg] = useState(0);
  
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const productID = Number(id);

  const data = JSON.stringify(portfoliodata.portfolio);
  const totaldata = data.replace(/\n/g, "<br>");
  const portfolio = JSON.parse(totaldata);
  const portfolioItem = portfolio.find(item => item.id === productID);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setP_slide(index);
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

  const reset = () => {
    setP_slide(0);
    if (containerRef.current) containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setImg((prev) => (prev + 1) % 3);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const toList = () => { setActiveSlide(2); router.push('/'); }
  const toList2 = () => { setActiveSlide(3); router.push('/'); }

  if (!portfolioItem) return (
    <div className="h-screen flex items-center justify-center">
      <p className="text-text-muted-light dark:text-text-muted-dark">Loading...</p>
    </div>
  );

  return (
    <div className={`transition-opacity duration-[2.5s] ${isStart === 'ready' ? 'opacity-0' : 'opacity-100'}`}>
      <div 
        ref={containerRef}
        className="h-screen w-full overflow-y-auto scroll-smooth"
      >
        {/* Slide 0: Intro */}
        <section data-index="0" className="scroll-section h-screen w-full relative">
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <Image src={`/portfolio/${portfolioItem.main_img}`} alt={portfolioItem.name} fill className="object-cover" />
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10 section-container text-center space-y-4">
              <span className="text-xs uppercase tracking-[0.3em] text-white/50">{portfolioItem.family}</span>
              <h1 className="text-display text-white">{portfolioItem.name}</h1>
              <p className="text-sm text-white/40">{portfolioItem.project_date}</p>
              <p className="text-xs text-white/30">{portfolioItem.project_program}</p>
              <a href={portfolioItem.homepage} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6 inline-flex">
                페이지 이동 →
              </a>
            </div>
            <ScrollPf />
          </div>
        </section>

        {/* Slide 1: Introduce */}
        <section data-index="1" className="scroll-section min-h-screen w-full relative flex items-center">
          <div className="section-container py-20">
            <span className="section-label">{portfolioItem.name}</span>
            <h2 className="section-title">Introduce</h2>
            <div className="accent-line mb-10" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="relative aspect-video overflow-hidden">
                <Image src={`/images/${portfolioItem.textimg01}`} alt={portfolioItem.name} fill className="object-cover" />
              </div>
              <div>
                <h3 className="text-subheading text-text-primary-light dark:text-text-primary-dark mb-4">{portfolioItem.Headtitle}</h3>
                <pre className="text-sm leading-relaxed text-text-secondary-light dark:text-text-secondary-dark whitespace-pre-wrap font-sans">
                  {portfolioItem.text01}
                </pre>
              </div>
            </div>
          </div>
          <Scroll />
        </section>

        {/* Slide 2: Design */}
        <section data-index="2" className="scroll-section min-h-screen w-full relative flex items-center">
          <div className="section-container py-20">
            <span className="section-label">{portfolioItem.name}</span>
            <h2 className="section-title">개발환경 및 디자인</h2>
            <div className="accent-line mb-10" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                {/* Tabs */}
                <div className="flex gap-0 mb-6">
                  {['UI / UX', 'Library'].map((label, i) => (
                    <button key={i}
                      onClick={() => setTab01(i)}
                      className={`px-5 py-2 text-sm font-medium transition-all duration-300 border
                        ${tab01 === i 
                          ? 'bg-lime text-surface-dark border-lime' 
                          : 'bg-transparent text-text-secondary-light dark:text-text-secondary-dark border-border-light dark:border-border-dark hover:border-lime'}`}
                    >{label}</button>
                  ))}
                </div>
                <pre className="text-sm leading-relaxed text-text-secondary-light dark:text-text-secondary-dark whitespace-pre-wrap font-sans">
                  {tab01 === 0 ? portfolioItem.design : portfolioItem.text03}
                </pre>
              </div>

              {/* Images */}
              {(id === '1' || id === '4' || id === '2' || id === '7') && (
                <div className="relative aspect-video overflow-hidden">
                  {[portfolioItem.textimg02, portfolioItem.textimg03, portfolioItem.textimg04].map((imgSrc, i) => (
                    <Image key={i} src={`/images/${imgSrc}`} alt="" fill
                      className={`object-cover transition-opacity duration-700 ${img === i ? 'opacity-100' : 'opacity-0'}`} />
                  ))}
                </div>
              )}
              {(id === '3' || id === '6' || id === '5' || id === '8') && (
                <div className="relative aspect-video overflow-hidden">
                  <Image src={`/images/${portfolioItem.textimg02}`} alt="" fill className="object-cover" />
                </div>
              )}
            </div>
          </div>
          <Scroll />
        </section>

        {/* Slide 3: Develop */}
        <section data-index="3" className="scroll-section min-h-screen w-full relative flex items-center">
          <div className="section-container py-20">
            <span className="section-label">{portfolioItem.name}</span>
            <h2 className="section-title">Develop</h2>
            <div className="accent-line mb-10" />

            <div className="flex gap-0 mb-6 flex-wrap">
              {['Chapter01', 'Chapter02', 'Chapter03', 'Chapter04'].map((label, i) => (
                <button key={i}
                  onClick={() => setTab(i)}
                  className={`px-5 py-2 text-sm font-medium transition-all duration-300 border
                    ${tab === i 
                      ? 'bg-lime text-surface-dark border-lime' 
                      : 'bg-transparent text-text-secondary-light dark:text-text-secondary-dark border-border-light dark:border-border-dark hover:border-lime'}`}
                >{label}</button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="card p-6 bg-surface-muted-light dark:bg-surface-muted-dark border-none overflow-x-auto">
                <pre className="text-xs leading-relaxed text-lime font-mono whitespace-pre-wrap">
                  {[portfolioItem.code1, portfolioItem.code2, portfolioItem.code3, portfolioItem.code4][tab]}
                </pre>
              </div>
              <div>
                <h3 className="text-subheading text-text-primary-light dark:text-text-primary-dark mb-4">
                  {[portfolioItem.title01, portfolioItem.title02, portfolioItem.title03, portfolioItem.title04][tab]}
                </h3>
                <pre className="text-sm leading-relaxed text-text-secondary-light dark:text-text-secondary-dark whitespace-pre-wrap font-sans">
                  {[portfolioItem.text02_1, portfolioItem.text02_2, portfolioItem.text02_3, portfolioItem.text02_4][tab]}
                </pre>
              </div>
            </div>
          </div>
          <Scroll />
        </section>

        {/* Slide 4: Review */}
        <section data-index="4" className="scroll-section min-h-screen w-full relative flex items-center">
          <div className="section-container py-20">
            <span className="section-label">{portfolioItem.name}</span>
            <h2 className="section-title">후기 및 느낀점</h2>
            <div className="accent-line mb-10" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h3 className="text-subheading text-text-primary-light dark:text-text-primary-dark mb-4">총평 및 후기</h3>
                <pre className="text-sm leading-relaxed text-text-secondary-light dark:text-text-secondary-dark whitespace-pre-wrap font-sans">
                  {portfolioItem.text04}
                </pre>
              </div>
              <div className="relative aspect-video overflow-hidden">
                <Image src={`/images/${portfolioItem.textimg01}`} alt={portfolioItem.name} fill className="object-cover" />
              </div>
            </div>

            <div className="mt-12">
              {productID < 5 
                ? <button className="btn-outline" onClick={toList}>← 목록으로</button>
                : <button className="btn-outline" onClick={toList2}>← 목록으로</button>
              }
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default PortfolioPage;
