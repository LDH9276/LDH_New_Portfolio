import React, {useEffect, useState} from 'react';
import Image from 'next/image';

function Contact({activeSlide}) {
  const [active, setActive] = useState('ready');

  useEffect(() => {
    if (activeSlide === 4) setActive('');
    else setActive('ready');
  }, [activeSlide]);

  const contactItems = [
    { label: 'Mail', value: 'leedh9276@naver.com', href: 'mailto:leedh9276@naver.com' },
    { label: 'Kakao', value: 'dhlee9207@gmail.com', href: 'mailto:dhlee9207@gmail.com' },
    { label: 'Github', value: 'LDH9276', href: 'https://github.com/LDH9276' },
  ];

  return (
    <div className={`relative w-full h-full flex items-center
      transition-opacity duration-[1.8s] ${active === 'ready' ? 'opacity-0' : 'opacity-100'}`}>
      
      <div className="section-container py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: Contact info */}
          <div className="space-y-10">
            <div>
              <span className="section-label">The LDH</span>
              <h2 className="section-title">Contact</h2>
              <div className="accent-line mb-8" />
            </div>

            <p className="text-sm md:text-base leading-relaxed text-text-secondary-light dark:text-text-secondary-dark">
              포트폴리오를 감상해주셔서 감사합니다.<br/>
              궁금하신 사항이 있으시면 언제든지 연락주세요.
            </p>

            <div className="space-y-6">
              {contactItems.map((item, i) => (
                <a 
                  key={i} 
                  href={item.href}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted-light dark:text-text-muted-dark">
                    {item.label}
                  </span>
                  <p className="text-lg md:text-xl font-semibold text-text-primary-light dark:text-text-primary-dark
                    group-hover:text-lime transition-colors duration-300 mt-1">
                    {item.value}
                    <span className="inline-block ml-2 opacity-0 -translate-x-2 
                      group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      →
                    </span>
                  </p>
                </a>
              ))}
            </div>

            <div className="pt-6 border-t border-border-light dark:border-border-dark">
              <p className="text-[10px] text-text-muted-light dark:text-text-muted-dark">
                해당 포트폴리오 사이트에 저장된 이미지의 저작권은 포트폴리오 사이트에 명기했습니다.
              </p>
              <p className="text-[10px] text-text-muted-light dark:text-text-muted-dark mt-1">
                COPYRIGHT © LDH 2023
              </p>
            </div>
          </div>

          {/* Right: Profile */}
          <div className="relative aspect-[3/4] w-full max-w-sm mx-auto lg:max-w-none overflow-hidden">
            <Image 
              src="/images/profile.webp" 
              alt="프로필" 
              fill
              className="object-cover" 
            />
            <div className="absolute bottom-0 left-0 w-full h-1/4 
              bg-gradient-to-t from-surface-light dark:from-surface-dark to-transparent" />
            {/* Decorative line */}
            <div className="absolute top-0 right-0 w-[2px] h-20 bg-lime" />
            <div className="absolute bottom-0 left-0 w-20 h-[2px] bg-lime" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;