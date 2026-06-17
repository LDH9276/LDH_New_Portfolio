import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getPersonalProjects, getTextPreview } from "../data/portfolio";

function WorkRow({ item, index, isVisible, reset }) {
  return (
    <Link
      href={item.route}
      aria-label={`${item.title} 포트폴리오 상세 보기`}
      onClick={reset}
      className={`work-row group ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
      style={{ transitionDelay: isVisible ? `${index * 70}ms` : "0ms" }}
    >
      <span className="work-index">{String(index + 1).padStart(2, "0")}</span>

      <span className="min-w-0">
        <strong className="work-title block">{item.title}</strong>
        <span className="work-meta">
          <span>{item.stackLabel}</span>
          {item.listDescription && <span>{getTextPreview(item.listDescription)}</span>}
        </span>
      </span>

      <span className="media-strip">
        <Image
          src={item.assets.thumb}
          alt={`${item.title} 썸네일`}
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

function PersonProject({ activeSlide, reset, titleId = "projects-title" }) {
  const [active, setActive] = useState("ready");

  useEffect(() => {
    if (activeSlide === 2) setActive("");
  }, [activeSlide]);

  const isVisible = active === "";
  const items = getPersonalProjects();

  return (
    <div
      className={`relative w-full py-8 transition-opacity duration-[1.3s] ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="section-container">
        <div className="mb-10 grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(360px,0.5fr)] lg:items-end">
          <div>
            <span className="section-label">Personal Projects</span>
            <h2 id={titleId} className="section-title">Projects</h2>
          </div>
          <p className="section-copy lg:justify-self-end">
            학습 과정과 팀 프로젝트에서 만든 화면입니다. 구현 역할, 데이터
            흐름, UI 구조가 드러나는 프로젝트를 중심으로 정리했습니다.
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

export default PersonProject;
