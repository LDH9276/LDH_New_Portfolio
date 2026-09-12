"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, LayoutGrid, List } from "lucide-react";
import { getTextPreview } from "../data/portfolio";
import MotionSurface from "./MotionSurface";
import Reveal from "./Reveal";

const technologies = ["Next.js", "React", "PHP"];

export default function ProjectExplorer({
  items,
  reset,
  id,
  filterable = false,
}) {
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState("list");
  const matches = (item, technology) =>
    item.stackLabel.toLowerCase().includes(technology.toLowerCase());
  const filtered =
    filter === "all" ? items : items.filter((item) => matches(item, filter));
  const filters = [
    { id: "all", label: "전체", count: items.length },
    ...technologies
      .map((technology) => ({
        id: technology,
        label: technology,
        count: items.filter((item) => matches(item, technology)).length,
      }))
      .filter((entry) => entry.count > 0),
  ];

  return (
    <div className="project-explorer" data-view={view}>
      <div className="project-toolbar">
        {filterable ? (
          <div
            className="flex flex-wrap gap-1"
            role="group"
            aria-label="프로젝트 기술 필터"
          >
            {filters.map((entry) => (
              <button
                key={entry.id}
                type="button"
                className="project-filter"
                aria-pressed={filter === entry.id}
                aria-controls={`${id}-results`}
                onClick={() => setFilter(entry.id)}
              >
                {entry.label}
                <span className="ml-2 text-[10px] tabular-nums opacity-70">
                  {String(entry.count).padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <span className="text-xs font-bold uppercase tracking-[0.16em]">
            Work archive{" "}
            <span className="ml-2 text-lime-contrast dark:text-lime">
              {String(items.length).padStart(2, "0")}
            </span>
          </span>
        )}
        <div
          className="project-view-toggle"
          role="group"
          aria-label={
            filterable ? "개인 프로젝트 보기 방식" : "퍼블리싱 보기 방식"
          }
        >
          {[
            { value: "list", label: "목록 보기", Icon: List },
            { value: "grid", label: "갤러리 보기", Icon: LayoutGrid },
          ].map(({ value, label, Icon }) => (
            <button
              key={value}
              type="button"
              aria-label={label}
              title={label}
              aria-pressed={view === value}
              aria-controls={`${id}-results`}
              onClick={() => setView(value)}
            >
              <Icon size={17} strokeWidth={1.6} aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
      <p className="sr-only" role="status">
        {filter === "all" ? "전체" : filter} 프로젝트 {filtered.length}개,{" "}
        {view === "list" ? "목록" : "갤러리"} 보기
      </p>
      <div
        id={`${id}-results`}
        className={view === "list" ? "work-list" : "project-grid"}
      >
        {filtered.map((item, index) => (
          <Reveal key={`${view}-${filter}-${item.id}`} delay={(index % 3) * 55}>
            <MotionSurface className="project-surface">
              <article className="project-entry group">
                <div className="project-layout">
                  <span className="work-index">
                    {String(items.indexOf(item) + 1).padStart(2, "0")}
                  </span>
                  <div className="project-info min-w-0">
                    <strong className="work-title block">{item.title}</strong>
                    <span className="work-meta">
                      {item.role && <span>{item.role}</span>}
                      <span>{item.stackLabel}</span>
                      {item.period && <span>{item.period}</span>}
                      {filterable && item.listDescription && (
                        <span>{getTextPreview(item.listDescription)}</span>
                      )}
                    </span>
                    <div className="project-actions">
                      <Link
                        href={item.route}
                        onClick={reset}
                        className="project-open"
                        aria-label={`${item.title}${filterable ? "" : " 회사"} 포트폴리오 상세 보기`}
                      >
                        자세히 보기
                        <ArrowRight size={15} strokeWidth={1.8} aria-hidden="true" />
                      </Link>
                      {!filterable && item.links.homepage && (
                        <a
                          className="project-external"
                          href={item.links.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${item.title} 웹사이트 새 창으로 열기`}
                        >
                          웹사이트
                          <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </div>
                  <span className="media-strip">
                    <Image
                      src={item.assets.thumb}
                      alt={`${item.title} 썸네일`}
                      fill
                      sizes={
                        view === "grid"
                          ? "(min-width: 1024px) 44vw, 90vw"
                          : "(min-width: 1024px) 220px, (min-width: 640px) 132px, 90vw"
                      }
                      className="object-cover"
                    />
                  </span>
                </div>
              </article>
            </MotionSurface>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
