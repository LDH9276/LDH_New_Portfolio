import React, { useEffect, useState } from 'react';
import Image from 'next/image';

function Contact({ activeSlide }) {
  const [active, setActive] = useState('ready');

  useEffect(() => {
    if (activeSlide === 4) setActive('');
  }, [activeSlide]);

  const contactItems = [
    { label: 'Mail', value: 'leedh9276@naver.com', href: 'mailto:leedh9276@naver.com' },
    { label: 'Kakao', value: 'dhlee9207@gmail.com', href: 'mailto:dhlee9207@gmail.com' },
    { label: 'Github', value: 'LDH9276', href: 'https://github.com/LDH9276' },
  ];

  return (
    <div className={`relative w-full h-full flex items-center
      transition-opacity duration-[1.8s] ${active === 'ready' ? 'opacity-0' : 'opacity-100'}`}>

      <div className="section-container py-12 md:py-20">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">

          {/* Left: Contact info */}
          <div className="w-full lg:w-1/2 space-y-8 lg:space-y-10 relative z-10 flex flex-col justify-center">
            <div>
              <span className="section-label">The LDH</span>
              <h2 className="section-title text-3xl md:text-5xl">Contact</h2>
              <div className="accent-line mb-6 md:mb-8" />
            </div>

            <p className="text-sm md:text-base leading-relaxed text-text-secondary-light dark:text-text-secondary-dark">
              포트폴리오를 감상해주셔서 감사합니다.<br className="hidden sm:block" />
              궁금하신 사항이 있으시면 언제든지 연락주세요.
            </p>

            <div className="space-y-4 md:space-y-6">
              {contactItems.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-4 rounded-xl hover:bg-surface-muted-light dark:hover:bg-surface-muted-dark transition-colors duration-300 -ml-4"
                >
                  <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-text-muted-light dark:text-text-muted-dark font-medium">
                    {item.label}
                  </span>
                  <p className="text-lg md:text-2xl font-semibold text-text-primary-light dark:text-text-primary-dark
                    group-hover:text-lime transition-colors duration-300 mt-1 flex items-center">
                    {item.value}
                    <span className="inline-block ml-3 opacity-0 -translate-x-2 
                      group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-lime">
                      →
                    </span>
                  </p>
                </a>
              ))}
            </div>

            <div className="pt-6 md:pt-8 border-t border-border-light dark:border-border-dark mt-auto">
              <p className="text-[10px] md:text-xs text-text-muted-light dark:text-text-muted-dark">
                해당 포트폴리오 사이트에 저장된 이미지의 저작권은 포트폴리오 사이트에 명기했습니다.
              </p>
              <p className="text-[10px] md:text-xs text-text-muted-light dark:text-text-muted-dark mt-1 font-mono">
                COPYRIGHT © LDH 2023
              </p>
            </div>
          </div>

          {/* Right: Profile */}
          <div className="w-full max-w-[280px] sm:max-w-[350px] lg:max-w-none lg:w-5/12 relative aspect-[3/4] lg:aspect-[4/5] overflow-hidden bg-lime/20 dark:bg-lime/10 border border-lime group">
            <Image
              src="/images/profile02-2.png"
              alt="프로필"
              fill
              className="object-cover lg:object-cover scale-105 group-hover:scale-110 transition-transform duration-700 mix-blend-luminosity group-hover:mix-blend-normal"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-lime/80 via-transparent to-transparent opacity-50 dark:opacity-40" />
            
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-16 h-[2px] bg-lime" />
            <div className="absolute bottom-0 left-0 w-[2px] h-16 bg-lime" />
            <div className="absolute top-0 right-0 w-[2px] h-16 bg-lime" />
            <div className="absolute bottom-0 left-0 w-16 h-[2px] bg-lime" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;