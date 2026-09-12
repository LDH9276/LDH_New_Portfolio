"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Check,
  Copy,
  ExternalLink,
  Mail,
  MessageCircle,
} from "lucide-react";

function Contact({ activeSlide, titleId = "contact-title" }) {
  const [active, setActive] = useState("ready");
  const [copied, setCopied] = useState(null);
  const [copyStatus, setCopyStatus] = useState("");
  const copyTimerRef = useRef(null);
  const copyRequestRef = useRef(0);

  useEffect(
    () => () => {
      clearTimeout(copyTimerRef.current);
      copyRequestRef.current += 1;
    },
    [],
  );

  const copyAddress = async (item) => {
    const request = ++copyRequestRef.current;
    clearTimeout(copyTimerRef.current);
    try {
      await navigator.clipboard.writeText(item.value);
      if (request !== copyRequestRef.current) return;
      setCopied(item.label);
      setCopyStatus(`${item.label} 주소를 복사했습니다.`);
      copyTimerRef.current = setTimeout(() => {
        setCopied(null);
        setCopyStatus("");
      }, 2400);
    } catch {
      if (request !== copyRequestRef.current) return;
      setCopied(null);
      setCopyStatus("복사하지 못했습니다. 아래 주소를 선택해서 복사해주세요.");
    }
  };

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
            <h2 id={titleId} className="section-title">
              Let's
              <br />
              Connect
            </h2>
            <p className="section-copy mt-8">
              프로젝트 협업, 프론트엔드 포지션, 포트폴리오 관련 문의를 편하게
              보내주세요.
            </p>
          </div>

          <div
            className={`relative border-l border-border-light pl-6 transition-all delay-150 duration-700 dark:border-border-dark ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
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
              <div key={item.label} className="contact-interaction-row">
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group grid gap-4 border-b border-border-light py-6 transition-all duration-700 hover:bg-surface-muted-light dark:border-border-dark dark:hover:bg-surface-muted-dark sm:grid-cols-[52px_160px_minmax(0,1fr)_40px] sm:items-center ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-6 opacity-0"
                  }`}
                  style={{
                    transitionDelay: isVisible ? `${index * 90}ms` : "0ms",
                  }}
                >
                  <span className="flex h-10 w-10 items-center justify-center text-lime-contrast dark:text-lime">
                    <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span className="text-[11px] font-black uppercase tracking-[0.16em] text-text-muted-light dark:text-text-muted-dark">
                    {item.label}
                  </span>
                  <span className="min-w-0 text-[clamp(1.25rem,4vw,3.3rem)] font-black leading-none text-text-primary-light transition-colors duration-300 group-hover:text-lime-contrast dark:text-text-primary-dark dark:group-hover:text-lime">
                    {item.value}
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center justify-self-end text-text-muted-light transition-colors duration-300 group-hover:text-lime-contrast dark:text-text-muted-dark dark:group-hover:text-lime">
                    <ArrowUpRight
                      size={19}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </span>
                </a>
                {item.href.startsWith("mailto:") && (
                  <button
                    type="button"
                    className="contact-copy"
                    onClick={() => copyAddress(item)}
                    aria-label={`${item.label} 주소 복사`}
                  >
                    {copied === item.label ? (
                      <Check size={15} aria-hidden="true" />
                    ) : (
                      <Copy size={15} aria-hidden="true" />
                    )}
                    <span>
                      {copied === item.label ? "복사 완료" : "주소 복사"}
                    </span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
        <p
          className="mt-4 min-h-[24px] text-sm text-lime-contrast dark:text-lime"
          role="status"
        >
          {copyStatus}
        </p>
      </div>
    </div>
  );
}

export default Contact;
