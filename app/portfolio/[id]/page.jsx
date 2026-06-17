'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Scroll from '../../../src/Header/Scroll';
import ScrollPf from '../../../src/Header/ScrollPf';
import { useAppContext } from '../../../app/Context';
import Image from 'next/image';
import PortfolioCodeBlock from '../../../src/Component/PortfolioCodeBlock';
import { getPersonalProjectByLegacyId } from '../../../src/data/portfolio';

const getCodeLanguage = (item) => {
  const source = `${item.programLabel || ''} ${item.stackLabel || ''}`.toLowerCase();
  if (source.includes('php')) return 'php';
  if (source.includes('react') || source.includes('next')) return 'jsx';
  if (source.includes('css')) return 'css';
  if (source.includes('html')) return 'html';
  return 'javascript';
};

const getNextTabIndex = (event, currentIndex, length) => {
  const lastIndex = length - 1;

  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    return currentIndex === lastIndex ? 0 : currentIndex + 1;
  }

  if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    return currentIndex === 0 ? lastIndex : currentIndex - 1;
  }

  if (event.key === 'Home') return 0;
  if (event.key === 'End') return lastIndex;
  return null;
};

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
  const portfolioItem = getPersonalProjectByLegacyId(productID);

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
    const galleryLength = portfolioItem?.assets.gallery.length || 0;
    if (galleryLength <= 1) return undefined;

    const interval = setInterval(() => {
      setImg((prev) => (prev + 1) % galleryLength);
    }, 4500);
    return () => clearInterval(interval);
  }, [portfolioItem]);

  const toList = () => { setActiveSlide(2); router.push('/'); }

  if (!portfolioItem) return (
    <div className="h-screen flex items-center justify-center">
      <p className="text-text-muted-light dark:text-text-muted-dark">해당 프로젝트를 찾을 수 없습니다.</p>
    </div>
  );

  const galleryImages = portfolioItem.assets.gallery;
  const chapters = portfolioItem.detail.chapters;
  const codeSnippets = chapters.map((chapter) => chapter.code);
  const codeTitles = chapters.map((chapter) => chapter.title);
  const codeDescriptions = chapters.map((chapter) => chapter.description);
  const codeLanguage = getCodeLanguage(portfolioItem);
  const hasRotatingImages = portfolioItem.detail.rotateGallery && galleryImages.length > 0;
  const designTabs = [
    {
      label: 'UI / UX',
      tabId: 'portfolio-design-ui-tab',
      panelId: 'portfolio-design-ui-panel',
      content: portfolioItem.detail.design,
    },
    {
      label: 'Library',
      tabId: 'portfolio-design-library-tab',
      panelId: 'portfolio-design-library-panel',
      content: portfolioItem.detail.library,
    },
  ];
  const developTabs = chapters.map((chapter, index) => ({
    label: `Chapter${String(index + 1).padStart(2, '0')}`,
    tabId: `portfolio-develop-${index + 1}-tab`,
    panelId: `portfolio-develop-${index + 1}-panel`,
  }));
  const handleTabKeyDown = (event, currentIndex, tabs, setSelected) => {
    const nextIndex = getNextTabIndex(event, currentIndex, tabs.length);
    if (nextIndex === null) return;

    event.preventDefault();
    setSelected(nextIndex);
    requestAnimationFrame(() => {
      document.getElementById(tabs[nextIndex].tabId)?.focus();
    });
  };

  return (
    <div className={`transition-opacity duration-[2.5s] ${isStart === 'ready' ? 'opacity-0' : 'opacity-100'}`}>
      <div 
        ref={containerRef}
        className="h-screen w-full overflow-y-auto scroll-smooth"
      >
        {/* Slide 0: Intro */}
        <section data-index="0" className="scroll-section h-screen w-full relative">
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <Image src={portfolioItem.assets.hero} alt={portfolioItem.title} fill className="z-0 object-cover" />
            <div className="pointer-events-none absolute inset-0 z-[1] bg-black/70" />
            <div className="relative z-10 section-container text-center space-y-4">
              <span className="text-xs uppercase tracking-[0.3em] text-white/50">{portfolioItem.stackLabel}</span>
              <h1 className="text-display text-white">{portfolioItem.title}</h1>
              <p className="text-sm text-white/40">{portfolioItem.period}</p>
              <p className="text-xs text-white/30">{portfolioItem.programLabel}</p>
              {portfolioItem.links.homepage && (
                <a href={portfolioItem.links.homepage} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6 inline-flex">
                  GitHub 이동 →
                </a>
              )}
            </div>
            <ScrollPf />
          </div>
        </section>

        {/* Slide 1: Introduce */}
        <section data-index="1" className="scroll-section w-full relative flex items-center">
          <div className="section-container py-20">
            <span className="section-label">{portfolioItem.title}</span>
            <h2 className="section-title">Introduce</h2>
            <div className="accent-line mb-10" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="relative aspect-video overflow-hidden">
                <Image src={portfolioItem.assets.intro} alt={portfolioItem.title} fill className="object-cover" />
              </div>
              <div>
                <h3 className="text-subheading text-text-primary-light dark:text-text-primary-dark mb-4">{portfolioItem.detail.headline}</h3>
                <pre className="text-sm leading-relaxed text-text-secondary-light dark:text-text-secondary-dark whitespace-pre-wrap font-sans">
                  {portfolioItem.detail.intro}
                </pre>
              </div>
            </div>
          </div>
          <Scroll />
        </section>

        {/* Slide 2: Design */}
        <section data-index="2" className="scroll-section w-full relative flex items-center">
          <div className="section-container py-20">
            <span className="section-label">{portfolioItem.title}</span>
            <h2 className="section-title">개발환경 및 디자인</h2>
            <div className="accent-line mb-10" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <div className="flex gap-0 mb-6" role="tablist" aria-label="디자인 정보">
                  {designTabs.map((item, i) => (
                    <button
                      key={item.tabId}
                      id={item.tabId}
                      type="button"
                      role="tab"
                      onClick={() => setTab01(i)}
                      onKeyDown={(event) => handleTabKeyDown(event, i, designTabs, setTab01)}
                      aria-selected={tab01 === i}
                      aria-controls={item.panelId}
                      tabIndex={tab01 === i ? 0 : -1}
                      className={`px-5 py-2 text-sm font-medium transition-all duration-300 border
                        ${tab01 === i 
                          ? 'bg-lime text-surface-dark border-lime' 
                          : 'bg-transparent text-text-secondary-light dark:text-text-secondary-dark border-border-light dark:border-border-dark hover:border-lime'}`}
                    >{item.label}</button>
                  ))}
                </div>
                {designTabs.map((item, i) => (
                  <div
                    key={item.panelId}
                    id={item.panelId}
                    role="tabpanel"
                    aria-labelledby={item.tabId}
                    hidden={tab01 !== i}
                  >
                    <pre className="text-sm leading-relaxed text-text-secondary-light dark:text-text-secondary-dark whitespace-pre-wrap font-sans">
                      {item.content}
                    </pre>
                  </div>
                ))}
              </div>

              {/* Images */}
              {hasRotatingImages && (
                <div className="relative aspect-video overflow-hidden">
                  {galleryImages.map((imgSrc, i) => (
                    <Image key={imgSrc} src={imgSrc} alt="" fill
                      className={`object-cover transition-opacity duration-700 ${img === i ? 'opacity-100' : 'opacity-0'}`} />
                  ))}
                </div>
              )}
              {!hasRotatingImages && galleryImages[0] && (
                <div className="relative aspect-video overflow-hidden">
                  <Image src={galleryImages[0]} alt="" fill className="object-cover" />
                </div>
              )}
            </div>
          </div>
          <Scroll />
        </section>

        {/* Slide 3: Develop */}
        <section data-index="3" className="scroll-section w-full relative flex items-center">
          <div className="section-container py-20">
            <span className="section-label">{portfolioItem.title}</span>
            <h2 className="section-title">Develop</h2>
            <div className="accent-line mb-10" />

            <div className="flex gap-0 mb-6 flex-wrap" role="tablist" aria-label="개발 챕터">
              {developTabs.map((item, i) => (
                <button
                  key={item.tabId}
                  id={item.tabId}
                  type="button"
                  role="tab"
                  onClick={() => setTab(i)}
                  onKeyDown={(event) => handleTabKeyDown(event, i, developTabs, setTab)}
                  aria-selected={tab === i}
                  aria-controls={item.panelId}
                  tabIndex={tab === i ? 0 : -1}
                  className={`px-5 py-2 text-sm font-medium transition-all duration-300 border
                    ${tab === i 
                      ? 'bg-lime text-surface-dark border-lime' 
                      : 'bg-transparent text-text-secondary-light dark:text-text-secondary-dark border-border-light dark:border-border-dark hover:border-lime'}`}
                >{item.label}</button>
              ))}
            </div>

            {developTabs.map((item, i) => (
              <div
                key={item.panelId}
                id={item.panelId}
                role="tabpanel"
                aria-labelledby={item.tabId}
                hidden={tab !== i}
              >
                {tab === i && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <PortfolioCodeBlock
                      code={codeSnippets[i]}
                      language={codeLanguage}
                      fileName={`chapter-${String(i + 1).padStart(2, '0')}`}
                    />
                    <div>
                      <h3 className="text-subheading text-text-primary-light dark:text-text-primary-dark mb-4">
                        {codeTitles[i]}
                      </h3>
                      <pre className="text-sm leading-relaxed text-text-secondary-light dark:text-text-secondary-dark whitespace-pre-wrap font-sans">
                        {codeDescriptions[i]}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <Scroll />
        </section>

        {/* Slide 4: Review */}
        <section data-index="4" className="scroll-section w-full relative flex items-center">
          <div className="section-container py-20">
            <span className="section-label">{portfolioItem.title}</span>
            <h2 className="section-title">후기 및 느낀점</h2>
            <div className="accent-line mb-10" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h3 className="text-subheading text-text-primary-light dark:text-text-primary-dark mb-4">총평 및 후기</h3>
                <pre className="text-sm leading-relaxed text-text-secondary-light dark:text-text-secondary-dark whitespace-pre-wrap font-sans">
                  {portfolioItem.detail.review}
                </pre>
              </div>
              <div className="relative aspect-video overflow-hidden">
                <Image src={portfolioItem.assets.intro} alt={portfolioItem.title} fill className="object-cover" />
              </div>
            </div>

            <div className="mt-12">
              <button type="button" className="btn-outline" onClick={toList}>← 목록으로</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default PortfolioPage;
