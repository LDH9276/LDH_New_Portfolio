import React, { useState, useEffect, useRef, useCallback } from 'react';
import Scroll from '../Header/Scroll';
import Image from 'next/image';
import { Paintbrush, Code2, Layers, Monitor, Briefcase, GraduationCap } from 'lucide-react';

/* ── 3D Tilt Skill Card ── */
function SkillCard({ skill, index, isVisible }) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('');
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTransform(`perspective(600px) rotateX(${(y - 0.5) * -10}deg) rotateY(${(x - 0.5) * 10}deg) scale3d(1.03, 1.03, 1.03)`);
    setGlowPos({ x: x * 100, y: y * 100 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform('');
    setGlowPos({ x: 50, y: 50 });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`card p-4 group relative overflow-hidden cursor-default
        transition-all duration-500
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{
        transform: transform || undefined,
        transitionProperty: 'transform, opacity',
        transitionDuration: transform ? '80ms' : '500ms',
        transitionDelay: isVisible ? `${index * 80 + 300}ms` : '0ms',
      }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(250px circle at ${glowPos.x}% ${glowPos.y}%, rgba(167,198,54,0.12), transparent 70%)`
        }}
      />
      <div className="flex items-start gap-3 relative z-10">
        <div className="w-8 h-8 flex items-center justify-center flex-shrink-0
          bg-surface-muted-light dark:bg-surface-muted-dark
          group-hover:bg-lime/10 transition-colors duration-300">
          <Image src={skill.icon} alt={skill.title} width={18} height={18} className="block dark:hidden" />
          <Image src={skill.darkIcon} alt={skill.title} width={18} height={18} className="hidden dark:block" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark mb-1
            group-hover:text-lime transition-colors duration-300">{skill.title}</h4>
          <p className="text-[11px] leading-relaxed text-text-muted-light dark:text-text-muted-dark">{skill.desc}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Typing Text ── */
function TypingText({ text, isVisible, delay = 0 }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isVisible) return;
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, 40);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [isVisible, text, delay]);

  if (!isVisible) return <span className="opacity-0">{text}</span>;

  return (
    <span>
      {displayed}
      {!done && <span className="inline-block w-[2px] h-[1em] bg-lime ml-0.5 align-middle animate-pulse" />}
    </span>
  );
}

/* ── Main About Component ── */
function About({ activeSlide }) {
  const [active, setActive] = useState('ready');
  const [tab, setTab] = useState('experience');

  useEffect(() => {
    if (activeSlide === 1) setActive('');
  }, [activeSlide]);

  const isVisible = active === '';

  const skills = [
    { icon: '/images/item03.svg', darkIcon: '/images/item03-dark.svg', title: 'HTML / CSS', desc: '웹 표준 및 접근성을 준수하는 탄탄한 마크업 및 스타일링.' },
    { icon: '/images/item04.svg', darkIcon: '/images/item04-dark.svg', title: 'JavaScript', desc: 'ES6+ 활용 동적 인터랙션 및 GSAP, Swiper 등 고도화된 UI 구현.' },
    { icon: '/images/item01.svg', darkIcon: '/images/item01-dark.svg', title: 'React / Next.js', desc: '컴포넌트 기반 SPA 설계, 서버사이드 렌더링 및 상태 관리.' },
    { icon: '/images/item02.svg', darkIcon: '/images/item02-dark.svg', title: 'Supabase / PHP', desc: 'API 통신, 데이터 CRUD 및 간소화된 백엔드 로직 연동.' },
  ];

  const experiences = [
    {
      period: '2023.08 ~ 2025.08 (2년 1개월)',
      company: '히어앤나우',
      role: '프로그램팀 주임 · 웹개발',
      desc: '아임에코몰, 볼빅, 미래DSN 등 10개 이상의 기업 웹사이트 신규 구축 및 전체 리뉴얼 프로젝트와, 아파트 분양 홈페이지 퍼블리싱을 주도하며 실서비스 환경의 개발 역량을 검증했습니다.',
      points: [
        '레거시 리팩토링 및 CSS 모듈화: 파편화된 CSS 코드를 모듈형 아키텍처로 개편 및 구형 사이트 HTML5 표준 리팩토링.',
        '인터랙티브 요소 구현: 레이아웃 안정성 확보 및 Swiper.js, GSAP을 활용한 고도화된 UI/UX 인터랙션 구현.'
      ]
    },
    {
      period: '2020.12 ~ 2022.06 (1년 7개월)',
      company: '케이패밀리코퍼레이션',
      role: '디자인팀 사원 · 영상/콘텐츠 디자인',
      desc: '제품 홍보 영상, 상세페이지, 사내 콘텐츠 기획 및 제작을 수행했습니다.',
      points: [
        '데이터 기반 UI 개선: 상세 페이지 정보 계층(IA) 재설계를 통한 사용자 체류 시간 증대 프로젝트 참여.',
        '최적화 이해: 이미지 압축 및 에셋 최적화로 초기 로딩 속도 개선 기여, 프론트엔드 렌더링 최적화 개념 학습.'
      ]
    },
    {
      period: '2016.06 ~ 2020.01 (3년 8개월)',
      company: '책나무출판사',
      role: '디자인팀 사원 · 북디자인',
      desc: '도서 브랜딩 및 임프린트 브랜드 아이덴티티 작업 등 디자인 전반을 맡았습니다.',
      points: [
        '브랜드 시각화: 주요 메시지를 반영한 웹 상세페이지 및 홍보 영상물 전담 기획/제작.',
        '협업 경험: 기획/마케팅 부서와의 지속적인 커뮤니케이션으로 사용자 니즈를 파악하고 시각적 UI로 구현.'
      ]
    }
  ];

  const educations = [
    {
      period: '2025.11 ~ 2026.05',
      company: '멋쟁이사자처럼 프론트엔드 16기',
      role: '부트캠프 수료',
      desc: 'HTML 웹표준, 접근성, JavaScript 중급, React, Next.js 실무 교육 이수.',
      points: [
        '[사자들의 공부방] API 서버 제작, CORS 에러 해결, 순수 fetch API 이용 CRUD, Git 브랜치 전략 및 JWT 인증 구현.',
        '[행쇼마켓] Next.js 16 기반 CSR/SSR 적용, PR 형상관리, Vercel 배포, Supabase 활용 간소화된 인증 및 백엔드 로직 연동.'
      ]
    },
    {
      period: '2022.11 ~ 2023.05',
      company: '그린아트컴퓨터학원',
      role: '과정 이수',
      desc: '프론트엔드 및 백엔드 기초 역량 함양.',
      points: [
        '[개인 프로젝트] 기초 HTML/CSS, ES6 JS, jQuery, React 기반 프론트엔드 기초.',
        '[팀 프로젝트] PHP 및 DB 설계 학습.'
      ]
    }
  ];

  const currentList = tab === 'experience' ? experiences : educations;

  return (
    <div className={`relative w-full h-full flex items-center
      transition-opacity duration-[1.5s] ${active === 'ready' ? 'opacity-0' : 'opacity-100'}`}>

      <div className="section-container py-16 md:py-20 h-full flex flex-col justify-center max-h-screen overflow-hidden">
        
        {/* Top Header */}
        <div className="mb-8">
          <span className="section-label">The LDH</span>
          <h2 className="section-title mb-4">About Me</h2>
          <div className="accent-line mb-6" />
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-start justify-between">
            <div className="flex-1 space-y-3">
              <h3 className="text-subheading text-text-primary-light dark:text-text-primary-dark leading-snug">
                <TypingText text="단순한 화면을 넘어, 구조를 설계하는" isVisible={isVisible} delay={200} />
                <br />
                <TypingText text="개발자 이동헌입니다." isVisible={isVisible} delay={1500} />
              </h3>
              <p className={`text-sm leading-relaxed text-text-secondary-light dark:text-text-secondary-dark
                transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: isVisible ? '1800ms' : '0ms' }}>
                5년간의 디자인 실무와 2년간의 웹 퍼블리싱 경험을 바탕으로 프론트엔드 개발로 커리어를 전환했습니다.<br className="hidden md:block"/>
                유지보수와 확장성을 고려한 아키텍처로 서비스를 탄탄하게 구축합니다.
              </p>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 flex-1 min-h-0 overflow-hidden">
          
          {/* Left: Profile & Skills */}
          <div className="col-span-1 lg:col-span-5 flex flex-col gap-6 overflow-y-auto pr-2 pb-4 scrollbar-hide lg:border-r border-border-light dark:border-border-dark">
            <div className="relative aspect-[3/4] w-full overflow-hidden group bg-surface-muted-light dark:bg-surface-muted-dark border border-border-light dark:border-border-dark">
              <Image src="/images/profile1-1.png" alt="프로필" fill
                className="object-contain scale-100 transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-lime/0 group-hover:bg-lime/10 transition-colors duration-500 mix-blend-overlay" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {skills.map((skill, i) => (
                <SkillCard key={i} skill={skill} index={i} isVisible={isVisible} />
              ))}
            </div>
          </div>

          {/* Right: Timeline (Interactive Tabs + Custom Scrollable Area) */}
          <div className="col-span-1 lg:col-span-7 flex flex-col min-h-0 relative">
            
            {/* Tabs */}
            <div className={`flex gap-6 mb-6 border-b border-border-light dark:border-border-dark
              transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '500ms' }}>
              <button
                onClick={() => setTab('experience')}
                className={`pb-3 text-sm font-bold uppercase tracking-wider transition-all duration-300 relative flex items-center gap-2
                  ${tab === 'experience' ? 'text-lime' : 'text-text-muted-light dark:text-text-muted-dark hover:text-text-primary-light dark:hover:text-text-primary-dark'}`}
              >
                <Briefcase size={16} /> Experience
                {tab === 'experience' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-lime" />}
              </button>
              <button
                onClick={() => setTab('education')}
                className={`pb-3 text-sm font-bold uppercase tracking-wider transition-all duration-300 relative flex items-center gap-2
                  ${tab === 'education' ? 'text-lime' : 'text-text-muted-light dark:text-text-muted-dark hover:text-text-primary-light dark:hover:text-text-primary-dark'}`}
              >
                <GraduationCap size={16} /> Education
                {tab === 'education' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-lime" />}
              </button>
            </div>

            {/* Scrollable Timeline */}
            <div className="flex-1 overflow-y-auto pr-4 relative custom-scrollbar pb-10">

              <div className="space-y-10 relative">
                {currentList.map((item, i) => (
                  <div
                    key={`${tab}-${i}`}
                    className={`group relative flex flex-col items-start gap-3
                      animate-slideInUp opacity-0 border-l-4 border-lime/30 pl-4 py-1 hover:border-lime transition-colors duration-300`}
                    style={{ 
                      animationFillMode: 'forwards',
                      animationDelay: `${i * 150}ms` 
                    }}
                  >
                    {/* The Content */}
                    <div className="flex-1 w-full">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                        <h4 className="text-base font-bold text-text-primary-light dark:text-text-primary-dark
                          group-hover:text-lime transition-colors duration-300">
                          {item.company}
                        </h4>
                        <span className="text-[11px] font-mono text-lime bg-lime/10 px-2 py-0.5 rounded-sm self-start sm:self-auto">
                          {item.period}
                        </span>
                      </div>
                      <span className="block text-sm font-semibold text-text-secondary-light dark:text-text-secondary-dark mb-4">
                        {item.role}
                      </span>
                      {item.desc && (
                        <p className="text-[13px] leading-relaxed text-text-secondary-light dark:text-text-secondary-dark mb-4">
                          {item.desc}
                        </p>
                      )}
                      <ul className="space-y-2">
                        {item.points.map((point, ptIdx) => (
                          <li key={ptIdx} className="text-[13px] text-text-muted-light dark:text-text-muted-dark leading-relaxed flex items-start gap-2">
                            <span className="text-lime mt-0.5 text-[10px]">■</span>
                            <span className="flex-1">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
      <Scroll />
    </div>
  );
}

export default About;