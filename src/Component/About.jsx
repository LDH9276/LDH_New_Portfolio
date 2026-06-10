import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Briefcase, GraduationCap } from "lucide-react";

function About({ activeSlide }) {
  const [active, setActive] = useState("ready");
  const [tab, setTab] = useState("experience");

  useEffect(() => {
    if (activeSlide === 1) setActive("");
  }, [activeSlide]);

  const isVisible = active === "";

  const skills = [
    {
      title: "UI Structure",
      stack: "HTML5 / CSS3 / Tailwind CSS",
      desc: "시맨틱 마크업, 반응형 그리드, 공통 스타일 규칙을 기준으로 오래 수정 가능한 화면을 만듭니다.",
    },
    {
      title: "Interaction",
      stack: "JavaScript / GSAP / Swiper",
      desc: "스크롤, 탭, 슬라이더, 모션을 상태와 이벤트 흐름으로 정리해 자연스럽게 작동하도록 구현합니다.",
    },
    {
      title: "Frontend",
      stack: "React / Next.js / Component Design",
      desc: "페이지를 컴포넌트와 데이터 흐름 단위로 나누고, CSR/SSR 특성에 맞춰 유지보수성을 높입니다.",
    },
    {
      title: "Service Flow",
      stack: "Supabase / PHP / MySQL / REST API",
      desc: "인증, CRUD, 업로드, 게시판처럼 실제 서비스에 필요한 데이터 흐름을 화면까지 연결합니다.",
    },
  ];

  const experiences = [
    {
      period: "2023.08 ~ 2025.08",
      company: "히어앤나우",
      role: "프로그램팀 주임 / 웹개발",
      desc: "아임에코몰, 볼빅, 미래DSN 등 10개 이상의 기업 웹사이트 신규 구축 및 전체 리뉴얼 프로젝트와 아파트 분양 홈페이지 퍼블리싱을 주도했습니다.",
      points: [
        "레거시 리팩토링 및 CSS 모듈화",
        "Swiper.js, GSAP 기반 UI 인터랙션 구현",
      ],
    },
    {
      period: "2020.12 ~ 2022.06",
      company: "케이패밀리코퍼레이션",
      role: "디자인팀 사원 / 영상, 콘텐츠 디자인",
      desc: "제품 홍보 영상, 상세페이지, 사내 콘텐츠 기획 및 제작을 수행했습니다.",
      points: [
        "상세 페이지 정보 계층 재설계",
        "이미지 압축 및 에셋 최적화 업무 경험",
      ],
    },
    {
      period: "2016.06 ~ 2020.01",
      company: "책나무출판사",
      role: "디자인팀 사원 / 북디자인",
      desc: "도서 브랜딩 및 임프린트 브랜드 아이덴티티 작업 등 디자인 전반을 맡았습니다.",
      points: [
        "주요 메시지를 반영한 시각 콘텐츠 제작",
        "기획, 마케팅 부서와의 협업 커뮤니케이션",
      ],
    },
  ];

  const educations = [
    {
      period: "2025.11 ~ 2026.05",
      company: "멋쟁이사자처럼 프론트엔드 16기",
      role: "부트캠프 수료",
      desc: "HTML 웹표준, 접근성, JavaScript 중급, React, Next.js 실무 교육 이수.",
      points: [
        "API 서버 제작, CORS 해결, fetch API 기반 CRUD 구현",
        "Next.js 16, Supabase, PR 기반 협업 흐름 경험",
      ],
    },
    {
      period: "2022.11 ~ 2023.05",
      company: "그린아트컴퓨터학원",
      role: "과정 이수",
      desc: "프론트엔드 및 백엔드 기초 역량 함양.",
      points: [
        "HTML, CSS, ES6 JavaScript, jQuery, React 기초",
        "PHP 및 DB 설계 학습",
      ],
    },
  ];

  const currentList = tab === "experience" ? experiences : educations;

  return (
    <div
      className={`relative w-full break-keep transition-opacity duration-[1.3s] ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="section-container">
        <header className="grid gap-10 border-b border-border-light pb-14 dark:border-border-dark lg:grid-cols-12 lg:items-end lg:gap-16 lg:pb-16">
          <div
            className={`lg:col-span-7 transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <span className="section-label">About</span>
            <h2 className="section-title">
              Design
              <br />
              to Code
            </h2>
          </div>

          <div
            className={`lg:col-span-5 transition-all delay-100 duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <p className="section-copy max-w-none">
              5년간의 디자인 실무와 2년간의 웹 퍼블리싱 경험을 바탕으로
              프론트엔드 개발로 커리어를 전환했습니다. 화면을 예쁘게 만드는
              것보다 오래 유지되는 구조와 사용자 흐름을 먼저 봅니다.
            </p>
            <div className="meta-row mt-10">
              <span>7+ Years Experience</span>
              <span>10+ Web Projects</span>
              <span>Frontend / UI</span>
            </div>
          </div>
        </header>

        <div className="mt-14 flex flex-col gap-14 lg:mt-18 lg:flex-row lg:items-start lg:gap-20">
          <aside
            className={`w-full shrink-0 transition-all delay-150 duration-700 sm:max-w-[420px] lg:w-[360px] xl:w-[420px] ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <div className="relative aspect-[3/4] overflow-hidden border border-border-light bg-surface-muted-light dark:border-border-dark dark:bg-surface-muted-dark">
              <Image
                src="/images/profile1-1.png"
                alt="이동헌 프로필 이미지"
                fill
                sizes="(min-width: 1024px) 32vw, 100vw"
                className="object-cover object-[48%_42%]"
                priority={false}
              />
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            <section>
              <div className="flex flex-col gap-5 pb-8 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <span className="section-label">Core Stack</span>
                  <h3 className="text-[clamp(2rem,4vw,4rem)] font-black uppercase leading-none text-text-primary-light dark:text-text-primary-dark">
                    Stack
                  </h3>
                </div>
                <p className="max-w-xl text-base leading-[1.85] text-text-secondary-light dark:text-text-secondary-dark">
                  실제 서비스 화면을 만들 때 반복해서 쓰는 구현 기준입니다.
                </p>
              </div>

              <ul className="grid gap-x-12 border-t border-border-light dark:border-border-dark md:grid-cols-2">
                {skills.map((skill, index) => (
                  <li
                    key={skill.title}
                    className={`border-b border-border-light py-8 transition-all duration-700 dark:border-border-dark ${
                      isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
                    }`}
                    style={{ transitionDelay: isVisible ? `${index * 70 + 180}ms` : "0ms" }}
                  >
                    <div className="mb-4 flex items-baseline justify-between gap-4">
                      <strong className="text-xl font-black uppercase text-text-primary-light dark:text-text-primary-dark">
                        {skill.title}
                      </strong>
                      <span className="text-xs font-black text-text-muted-light dark:text-text-muted-dark">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="block text-[11px] font-black uppercase tracking-[0.13em] text-lime">
                      {skill.stack}
                    </span>
                    <p className="mt-5 text-[15px] leading-[1.9] text-text-secondary-light dark:text-text-secondary-dark">
                      {skill.desc}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-20">
              <div className="flex gap-8">
                <button
                  type="button"
                  onClick={() => setTab("experience")}
                  aria-pressed={tab === "experience"}
                  className={`flex items-center gap-2 pb-4 text-sm font-black uppercase tracking-[0.15em] transition-colors duration-300 ${
                    tab === "experience"
                      ? "border-b-2 border-lime text-lime"
                      : "text-text-muted-light hover:text-text-primary-light dark:text-text-muted-dark dark:hover:text-text-primary-dark"
                  }`}
                >
                  <Briefcase size={15} strokeWidth={1.8} aria-hidden="true" />
                  Experience
                </button>
                <button
                  type="button"
                  onClick={() => setTab("education")}
                  aria-pressed={tab === "education"}
                  className={`flex items-center gap-2 pb-4 text-sm font-black uppercase tracking-[0.15em] transition-colors duration-300 ${
                    tab === "education"
                      ? "border-b-2 border-lime text-lime"
                      : "text-text-muted-light hover:text-text-primary-light dark:text-text-muted-dark dark:hover:text-text-primary-dark"
                  }`}
                >
                  <GraduationCap size={15} strokeWidth={1.8} aria-hidden="true" />
                  Education
                </button>
              </div>

              <ol className="border-t border-border-light dark:border-border-dark">
                {currentList.map((item) => (
                  <li
                    key={`${tab}-${item.company}`}
                    className="border-b border-border-light py-9 dark:border-border-dark"
                  >
                    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h4 className="text-2xl font-black text-text-primary-light dark:text-text-primary-dark">
                          {item.company}
                        </h4>
                        <p className="mt-2 text-base font-bold text-text-secondary-light dark:text-text-secondary-dark">
                          {item.role}
                        </p>
                      </div>
                      <span className="shrink-0 pt-1 text-xs font-black uppercase tracking-[0.14em] text-text-muted-light dark:text-text-muted-dark">
                        {item.period}
                      </span>
                    </div>
                    <p className="max-w-3xl text-[15px] leading-[1.95] text-text-secondary-light dark:text-text-secondary-dark">
                      {item.desc}
                    </p>
                    <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                      {item.points.map((point) => (
                        <li
                          key={point}
                          className="border-l border-border-light pl-3 text-[12px] font-bold uppercase tracking-[0.08em] text-text-muted-light dark:border-border-dark dark:text-text-muted-dark"
                        >
                          {point}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
