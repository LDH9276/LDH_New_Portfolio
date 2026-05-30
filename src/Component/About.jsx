import React, { useState, useEffect, useRef, useCallback } from 'react';
import Scroll from '../Header/Scroll';
import Image from 'next/image';
import { Paintbrush, Code2, Layers, Monitor } from 'lucide-react';

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

  const Icon = skill.lucide;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`card p-5 group relative overflow-hidden cursor-default
        transition-all duration-500
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{
        transform: transform || undefined,
        transitionProperty: 'transform, opacity',
        transitionDuration: transform ? '80ms' : '500ms',
        transitionDelay: isVisible ? `${index * 120}ms` : '0ms',
      }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(250px circle at ${glowPos.x}% ${glowPos.y}%, rgba(167,198,54,0.12), transparent 70%)`
        }}
      />
      <div className="flex items-start gap-4 relative z-10">
        <div className="w-10 h-10 flex items-center justify-center flex-shrink-0
          bg-surface-muted-light dark:bg-surface-muted-dark
          group-hover:bg-lime/10 transition-colors duration-300">
          <Image src={skill.icon} alt={skill.title} width={24} height={24} className="block dark:hidden" />
          <Image src={skill.darkIcon} alt={skill.title} width={24} height={24} className="hidden dark:block" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark mb-1
            group-hover:text-lime transition-colors duration-300">{skill.title}</h4>
          <p className="text-xs leading-relaxed text-text-muted-light dark:text-text-muted-dark">{skill.desc}</p>
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

/* ── Role Badge Carousel ── */
function RoleBadges({ isVisible }) {
  const roles = [
    { icon: Paintbrush, label: '디자이너', color: 'text-pink-400' },
    { icon: Layers,     label: '퍼블리셔', color: 'text-blue-400' },
    { icon: Code2,      label: '프론트엔드', color: 'text-lime' },
    { icon: Monitor,    label: '개발자', color: 'text-amber-400' },
  ];
  const [activeRole, setActiveRole] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setActiveRole(prev => (prev + 1) % roles.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [isVisible, roles.length]);

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {roles.map((role, i) => {
        const Icon = role.icon;
        const isActive = i === activeRole;
        return (
          <button
            key={i}
            onClick={() => setActiveRole(i)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium uppercase tracking-wider
              border transition-all duration-500 cursor-pointer select-none
              ${isActive
                ? `border-lime bg-lime/10 ${role.color} scale-105 shadow-[0_0_12px_rgba(167,198,54,0.2)]`
                : 'border-border-light dark:border-border-dark text-text-muted-light dark:text-text-muted-dark hover:border-lime/50'}
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: isVisible ? `${i * 80 + 500}ms` : '0ms' }}
          >
            <Icon size={13} strokeWidth={1.5} />
            {role.label}
          </button>
        );
      })}
    </div>
  );
}

/* ── Main About Component ── */
function About({ activeSlide }) {
  const [active, setActive] = useState('ready');

  useEffect(() => {
    if (activeSlide === 1) setActive('');
  }, [activeSlide]);

  const isVisible = active === '';

  const skills = [
    { icon: '/images/item03.svg', darkIcon: '/images/item03-dark.svg', title: 'HTML / CSS', desc: '프론트엔드 기본 중의 기본. 퍼블리싱 경험을 바탕으로 탄탄한 마크업이 가능합니다.' },
    { icon: '/images/item04.svg', darkIcon: '/images/item04-dark.svg', title: 'JavaScript', desc: 'ES6+ 문법을 활용한 동적 인터랙션 구현. 모던 프레임워크 기반 개발이 가능합니다.' },
    { icon: '/images/item02.svg', darkIcon: '/images/item02-dark.svg', title: 'PHP / SQL', desc: '서버사이드 연동 및 DB 출력. 리액트와의 데이터 통신 경험을 보유하고 있습니다.' },
    { icon: '/images/item01.svg', darkIcon: '/images/item01-dark.svg', title: 'React.js', desc: '컴포넌트 기반 SPA 개발. 상태관리와 라우팅까지 실무 수준의 역량을 갖추고 있습니다.' },
  ];

  const timeline = [
    { year: '2016 – 2020', role: '책나무출판사', desc: '북디자이너' },
    { year: '2020 – 2022', role: '케이패밀리코퍼레이션', desc: '영상디자이너' },
    { year: '2023 – 2025', role: '히어앤나우', desc: '웹 퍼블리셔' },
    { year: 'LICENSE',     role: '웹디자인기능사', desc: '자격증' },
  ];

  return (
    <div className={`relative w-full h-full flex items-center
      transition-opacity duration-[1.8s] ${active === 'ready' ? 'opacity-0' : 'opacity-100'}`}>

      <div className="section-container py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── Left: Identity ── */}
          <div className="space-y-6">
            <div>
              <span className="section-label">The LDH</span>
              <h2 className="section-title">About Me</h2>
              <div className="accent-line mb-4" />
            </div>

            {/* Typing intro */}
            <div className="space-y-2">
              <h3 className="text-subheading text-text-primary-light dark:text-text-primary-dark leading-snug">
                <TypingText text="디자이너에서 개발자로," isVisible={isVisible} delay={300} />
                <br />
                <TypingText text="이동헌입니다." isVisible={isVisible} delay={1200} />
              </h3>
              <p className={`text-sm md:text-base leading-relaxed text-text-secondary-light dark:text-text-secondary-dark
                transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: isVisible ? '1800ms' : '0ms' }}>
                북디자인 → 영상 → 퍼블리싱 → 프론트엔드.<br className="hidden sm:block" />
                디자인 감각 위에 코드를 쌓아올리고 있습니다.
              </p>
            </div>

            {/* Role Badges */}
            <RoleBadges isVisible={isVisible} />

            {/* ── Timeline ── */}
            <div className="mt-6 space-y-0 relative pl-6">
              {/* Vertical line — pinned to dot center */}
              <div className={`absolute left-[7px] top-4 bottom-4 w-[1px] bg-border-light dark:bg-border-dark
                transition-all duration-1000 origin-top
                ${isVisible ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`} />

              {timeline.map((item, i) => (
                <div
                  key={i}
                  className={`group relative flex items-start gap-4 py-3 cursor-default
                    transition-all duration-500
                    ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                  style={{ transitionDelay: isVisible ? `${i * 150 + 600}ms` : '0ms' }}
                >
                  {/* Dot */}
                  <span className="absolute left-0 top-[18px] -translate-x-1/2 w-[15px] h-[15px] flex items-center justify-center">
                    <span className="block w-2 h-2 rounded-full bg-border-light dark:bg-border-dark
                      group-hover:bg-lime group-hover:scale-[1.8] group-hover:shadow-[0_0_10px_rgba(167,198,54,0.5)]
                      transition-all duration-300" />
                  </span>

                  {/* Content */}
                  <div className="ml-4 flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-lime">
                      {item.year}
                    </span>
                    <p className="text-sm font-semibold text-text-primary-light dark:text-text-primary-dark mt-0.5
                      group-hover:text-lime transition-colors duration-300">
                      {item.role}
                    </p>
                    <p className="text-xs text-text-muted-light dark:text-text-muted-dark">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Profile image — mobile */}
            <div className="block lg:hidden relative aspect-[4/3] w-full overflow-hidden">
              <Image src="/images/profile1-1.png" alt="프로필" fill className="object-contain" />
              <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-surface-light dark:from-surface-dark to-transparent" />
            </div>
          </div>

          {/* ── Right: Skills ── */}
          <div className="space-y-6">
            {/* Profile image — desktop */}
            <div className="hidden lg:block relative aspect-[4/3] w-full overflow-hidden mb-6 group">
              <Image src="/images/profile1-1.png" alt="프로필" fill
                className="object-contain transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-surface-light dark:from-surface-dark to-transparent" />
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-8 h-[2px] bg-lime opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 left-0 w-[2px] h-8 bg-lime opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 right-0 w-8 h-[2px] bg-lime opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 right-0 w-[2px] h-8 bg-lime opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map((skill, i) => (
                <SkillCard key={i} skill={skill} index={i} isVisible={isVisible} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Scroll />
    </div>
  );
}

export default About;