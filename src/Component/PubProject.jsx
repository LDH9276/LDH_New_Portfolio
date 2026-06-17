import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import portfolio from "./companydata.json";

function WorkRow({ item, index, isVisible, reset }) {
  return (
    <Link
      href={`/publishing/${item.id}`}
      aria-label={`${item.name} 회사 포트폴리오 상세 보기`}
      onClick={reset}
      className={`work-row group ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
      style={{ transitionDelay: isVisible ? `${index * 70}ms` : "0ms" }}
    >
      <span className="work-index">{String(index + 1).padStart(2, "0")}</span>

      <span className="min-w-0">
        <strong className="work-title block">{item.name}</strong>
        <span className="work-meta">
          <span>{item.responsibility}</span>
          <span>{item.family}</span>
          <span>{item.duration}</span>
        </span>
      </span>

      <span className="media-strip">
        <Image
          src={item.thumb}
          alt={`${item.name} 썸네일`}
          fill
          sizes="(min-width: 1024px) 220px, (min-width: 640px) 132px, 90vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </span>

      <span className="flex h-10 w-10 items-center justify-center justify-self-end text-text-muted-light transition-colors duration-300 group-hover:text-lime-hover dark:text-text-muted-dark dark:group-hover:text-lime">
        <ArrowUpRight size={19} strokeWidth={1.8} aria-hidden="true" />
      </span>
    </Link>
  );
}

function PubProject({ activeSlide, reset, titleId = "publishing-title" }) {
  const [active, setActive] = useState("ready");

  useEffect(() => {
    if (activeSlide === 4) setActive("");
  }, [activeSlide]);

  const isVisible = active === "";
  const items = portfolio.portfolio.slice().sort((a, b) => b.id - a.id);

  return (
    <div
      className={`relative w-full py-8 transition-opacity duration-[1.3s] ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="section-container">
        <div className="mb-10 grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(360px,0.5fr)] lg:items-end">
          <div>
            <span className="section-label">Selected Works</span>
            <h2 id={titleId} className="section-title">
              Publishing
              <br />
              Works
            </h2>
          </div>
          <p className="section-copy lg:justify-self-end">
            기업 웹사이트, 분양 홈페이지, 운영 중인 서비스 화면을 실제 일정과
            요구사항 안에서 구축한 작업입니다.
          </p>
        </div>

        <div className="work-list">
          {items.map((item, index) => (
            <WorkRow
              key={item.id}
              item={item}
              index={index}
              isVisible={isVisible}
              reset={reset}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PubProject;
