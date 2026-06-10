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

      <div className="section-container relative z-10 flex h-full flex-col items-start justify-between pb-14 pt-28 lg:pb-16 lg:pt-32">
        <div className="max-w-[820px]">
          <p
            className={`section-label transition-all duration-700 ${
              visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Front-end Developer
          </p>

          <h2
            className={`text-[clamp(4.4rem,15vw,13.4rem)] font-black uppercase leading-[0.78] text-text-primary-light transition-all delay-100 duration-700 dark:text-text-primary-dark ${
              visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            Lee
            <br />
            Dong
            <br />
            Heon
          </h2>

          <div
            className={`mt-8 grid gap-6 border-t pt-6 transition-all delay-200 duration-700 dark:border-border-dark md:grid-cols-[minmax(0,0.8fr)_minmax(280px,0.5fr)] ${
              visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <p className="section-copy">
              디자인 실무와 웹 퍼블리싱 경험을 바탕으로 구조가 분명한
              프론트엔드 화면을 설계하고 구현합니다.
            </p>

            <div className="grid content-start gap-5">
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-black uppercase tracking-[0.14em] text-text-muted-light dark:text-text-muted-dark">
                {meta.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex w-full flex-wrap justify-end gap-3">
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
  );
}

export default Banner;
