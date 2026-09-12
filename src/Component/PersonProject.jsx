"use client";

import React, { useEffect, useState } from "react";
import { getPersonalProjects } from "../data/portfolio";

import ProjectExplorer from "./ProjectExplorer";

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

        <ProjectExplorer items={items} reset={reset} id="personal" filterable />
      </div>
    </div>
  );
}

export default PersonProject;
