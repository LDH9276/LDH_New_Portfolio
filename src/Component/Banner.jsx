"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import IDEBackground from "./IDEBackground";
import ThreeBackground from "./ThreeBackground";

function Banner({ activeSlide }) {
  const [active, setActive] = useState("ready");

  useEffect(() => {
    if (activeSlide === 0) setActive("");
  }, [activeSlide]);

  const visible = active === "";
  const meta = ["React", "Next.js", "Publishing", "UI Design"];

  return (
    <div
      className={`relative flex h-full w-full items-stretch overflow-hidden bg-surface-light transition-opacity duration-[1.4s] dark:bg-surface-dark ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="pointer-events-none absolute inset-0" />

      <div
        className={`absolute inset-y-0 right-0 z-[1] w-full overflow-hidden bg-surface-muted-light transition-all delay-300 duration-700 dark:border-border-dark dark:bg-[#0d1117] ${
          visible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
        }`}
      >
        <IDEBackground contentClassName="pt-20 lg:pt-24" />
        <ThreeBackground />

        <div className="pointer-events-none absolute inset-0 border-l border-surface-light/60 dark:border-white/5" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-4/5 bg-gradient-to-r from-surface-light via-surface-light/85 to-transparent dark:from-surface-dark dark:via-surface-dark/80 md:w-2/3 lg:w-1/3 lg:via-surface-light/70 lg:dark:via-surface-dark/65" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-surface-light via-surface-light/65 to-transparent dark:from-surface-dark dark:via-surface-dark/55 lg:hidden" />
      </div>

      <div className="section-container relative z-10 flex h-full flex-col items-start pb-14 lg:pb-16 lg:pt-32 justify-center pt-20">
        <div className="max-w-[820px]">
          <span className="mb-6 block border-l-2 border-lime pl-4 text-sm font-black uppercase tracking-[0.16em] text-text-primary-light dark:text-text-primary-dark sm:text-base">
            Front-end <span className="text-lime">Developer</span>
          </span>

          <h1
            aria-label="Lee Dong Heon"
            className={`text-[clamp(7rem,28vw,13.4rem)] font-black uppercase leading-[0.78] text-text-primary-light transition-all delay-100 duration-700 dark:text-text-primary-dark ${
              visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <span className="block" aria-hidden="true">
              Lee
            </span>
            <span
              aria-hidden="true"
              className="my-2 ml-2 flex max-w-[760px] flex-col gap-3 leading-none sm:my-2 sm:flex-row sm:items-center sm:gap-8 lg:ml-3"
            >
              <span className="flex max-w-[390px] flex-wrap gap-x-4 gap-y-1 text-[11px] font-black uppercase tracking-[0.12em] text-text-secondary-light dark:text-text-secondary-dark">
                {meta.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </span>
            </span>
            <span className="block" aria-hidden="true">
              Dong
            </span>
            <span className="block" aria-hidden="true">
              Heon
            </span>
          </h1>
          <p className="sr-only">Main skills: {meta.join(", ")}.</p>

          <div
            className={`mt-8 max-w-[620px] border-t border-border-light pt-6 transition-all delay-200 duration-700 dark:border-border-dark ${
              visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <p className="section-copy">
              디자인 실무와 웹 퍼블리싱 경험을 바탕으로 구조가 분명한
              프론트엔드 화면을 설계하고 구현합니다.
            </p>
          </div>

          <div
            className={`mt-8 flex flex-wrap gap-3 transition-all delay-300 duration-700 ${
              visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector('[data-index="1"]')
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-primary"
            >
              Explore
            </a>
            <a
              href="https://github.com/LDH9276"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              GitHub
              <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
