"use client";

import React, { useEffect, useState } from "react";
import { getCompanyWorks } from "../data/portfolio";

import ProjectExplorer from "./ProjectExplorer";

function PubProject({ activeSlide, reset, titleId = "publishing-title" }) {
  const [active, setActive] = useState("ready");

  useEffect(() => {
    if (activeSlide === 4) setActive("");
  }, [activeSlide]);

  const isVisible = active === "";
  const items = getCompanyWorks();

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

        <ProjectExplorer items={items} reset={reset} id="company" />
      </div>
    </div>
  );
}

export default PubProject;
