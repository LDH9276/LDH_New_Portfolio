import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ExternalLink, Mail, MessageCircle } from "lucide-react";

function Contact({ activeSlide }) {
  const [active, setActive] = useState("ready");

  useEffect(() => {
    if (activeSlide === 5) setActive("");
  }, [activeSlide]);

  const isVisible = active === "";

  const contactItems = [
    {
      label: "Mail",
      value: "leedh9276@naver.com",
      href: "mailto:leedh9276@naver.com",
      icon: Mail,
    },
    {
      label: "Kakao",
      value: "dhlee9207@gmail.com",
      href: "mailto:dhlee9207@gmail.com",
      icon: MessageCircle,
    },
    {
      label: "Github",
      value: "LDH9276",
      href: "https://github.com/LDH9276",
      icon: ExternalLink,
    },
  ];

  return (
    <div
      className={`relative w-full py-8 transition-opacity duration-[1.3s] ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="section-container">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(340px,0.48fr)] lg:items-end">
          <div>
            <span className="section-label">Contact</span>
            <h2 className="section-title">
              Let's
              <br />
              Connect
            </h2>
            <p className="section-copy mt-8">
              프로젝트 협업, 프론트엔드 포지션, 포트폴리오 관련 문의를
              편하게 보내주세요.
            </p>
          </div>

          <div
            className={`relative border-l border-border-light pl-6 transition-all delay-150 duration-700 dark:border-border-dark ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <Image
              src="/images/profile02-2.png"
              alt="이동헌 프로필 이미지"
              width={620}
              height={531}
              className="w-full object-contain object-bottom"
            />
          </div>
        </div>

        <div className="mt-12 border-t border-border-light dark:border-border-dark">
          {contactItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group grid gap-4 border-b border-border-light py-6 transition-all duration-700 hover:bg-surface-muted-light dark:border-border-dark dark:hover:bg-surface-muted-dark sm:grid-cols-[52px_160px_minmax(0,1fr)_40px] sm:items-center ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
                style={{ transitionDelay: isVisible ? `${index * 90}ms` : "0ms" }}
              >
                <span className="flex h-10 w-10 items-center justify-center text-lime">
                  <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <span className="text-[11px] font-black uppercase tracking-[0.16em] text-text-muted-light dark:text-text-muted-dark">
                  {item.label}
                </span>
                <span className="min-w-0 text-[clamp(1.25rem,4vw,3.3rem)] font-black leading-none text-text-primary-light transition-colors duration-300 group-hover:text-lime dark:text-text-primary-dark">
                  {item.value}
                </span>
                <span className="flex h-10 w-10 items-center justify-center justify-self-end text-text-muted-light transition-colors duration-300 group-hover:text-lime dark:text-text-muted-dark">
                  <ArrowUpRight size={19} strokeWidth={1.8} aria-hidden="true" />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Contact;
