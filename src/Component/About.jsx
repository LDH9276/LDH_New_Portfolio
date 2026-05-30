import React, { useState, useEffect, useRef, useCallback } from 'react';
import Scroll from '../Header/Scroll';
import Image from 'next/image';

function SkillCard({ skill, index, isVisible }) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('');
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const tiltX = (y - 0.5) * -12;
    const tiltY = (x - 0.5) * 12;
    setTransform(`perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.03, 1.03, 1.03)`);
    setGlowPos({ x: x * 100, y: y * 100 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform('perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlowPos({ x: 50, y: 50 });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`card p-5 group relative overflow-hidden cursor-default
        transition-all duration-500
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{
        transform,
        transitionProperty: 'transform, opacity',
        transitionDuration: transform.includes('scale3d(1.03') ? '100ms' : '500ms',
        transitionDelay: isVisible ? `${index * 120}ms` : '0ms',
      }}
    >
      {/* Interactive glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(300px circle at ${glowPos.x}% ${glowPos.y}%, rgba(167, 198, 54, 0.12), transparent 70%)`
        }}
      />
      <div className="flex items-start gap-4 relative z-10">
        <div className="w-10 h-10 flex items-center justify-center
          bg-surface-muted-light dark:bg-surface-muted-dark flex-shrink-0
          group-hover:bg-lime/10 transition-colors duration-300">
          <Image src={skill.icon} alt={skill.title} width={24} height={24}
            className="block dark:hidden" />
          <Image src={skill.darkIcon} alt={skill.title} width={24} height={24}
            className="hidden dark:block" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark mb-1
            group-hover:text-lime transition-colors duration-300">
            {skill.title}
          </h4>
          <p className="text-xs leading-relaxed text-text-muted-light dark:text-text-muted-dark">
            {skill.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

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
    { year: '2016 – 2020', role: '책나무출판사 (북디자이너)' },
    { year: '2020 – 2022', role: '케이패밀리코퍼레이션 (영상디자이너)' },
    { year: '2023 – 2025', role: '히어앤나우 (웹 퍼블리셔)' },
    { year: 'LICENSE', role: '웹디자인기능사' },
  ];

  return (
    <div className={`relative w-full h-full flex items-center
      transition-opacity duration-[1.8s] ${active === 'ready' ? 'opacity-0' : 'opacity-100'}`}>

      <div className="section-container py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left: Info */}
          <div className="space-y-8">
            <div>
              <span className="section-label">The LDH</span>
              <h2 className="section-title">About Me</h2>
              <div className="accent-line mb-6" />
            </div>

            <div className="space-y-4">
              <h3 className="text-subheading text-text-primary-light dark:text-text-primary-dark">
                프론트엔드 개발자<br />이동헌입니다.
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-text-secondary-light dark:text-text-secondary-dark">
                웹 퍼블리셔를 넘어 프론트엔드 영역까지 열심히 달려왔습니다.
                이제 프론트엔드에서의 더 큰 영역에서 뛰어들 준비가 끝났습니다.
              </p>
            </div>

            {/* Interactive Timeline */}
            <ul className="space-y-0 relative">
              {/* Vertical line */}
              <div className={`absolute left-[59px] top-2 bottom-2 w-[1px] bg-border-light dark:bg-border-dark
                transition-all duration-1000 origin-top
                ${isVisible ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`} />
              {timeline.map((item, i) => (
                <li
                  key={i}
                  className={`group flex gap-4 text-sm py-3 relative cursor-default
                    transition-all duration-500
                    ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                  style={{ transitionDelay: isVisible ? `${i * 150 + 200}ms` : '0ms' }}
                >
                  <span className="font-semibold text-lime min-w-[120px] text-right
                    group-hover:tracking-wider transition-all duration-300">
                    {item.year}
                  </span>
                  {/* Dot */}
                  <span className="relative flex-shrink-0 w-2 h-2 mt-[6px] rounded-full bg-border-light dark:bg-border-dark
                    group-hover:bg-lime group-hover:scale-150 group-hover:shadow-[0_0_8px_rgba(167,198,54,0.6)]
                    transition-all duration-300" />
                  <span className="text-text-secondary-light dark:text-text-secondary-dark
                    group-hover:text-text-primary-light dark:group-hover:text-text-primary-dark
                    transition-colors duration-300">
                    {item.role}
                  </span>
                </li>
              ))}
            </ul>

            {/* Profile image - mobile */}
            <div className="block lg:hidden relative aspect-[4/3] w-full overflow-hidden">
              <Image src="/images/profile1-1.png" alt="프로필" fill className="object-contain" />
              <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-surface-light dark:from-surface-dark to-transparent" />
            </div>
          </div>

          {/* Right: Skills */}
          <div className="space-y-6">
            {/* Profile image - desktop */}
            <div className="hidden lg:block relative aspect-[4/3] w-full overflow-hidden mb-8">
              <Image src="/images/profile1-1.png" alt="프로필" fill className="object-contain" />
              <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-surface-light dark:from-surface-dark to-transparent" />
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