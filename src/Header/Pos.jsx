import React from "react";

function Pos({ handleSlideNavigation, activeSlide }) {
  const navItems = [
    { label: "Intro", index: 0 },
    { label: "About", index: 1 },
    { label: "Publishing", index: 4 },
    { label: "Projects", index: 2 },
    { label: "Contact", index: 5 },
  ];

  return (
    <nav
      className="fixed right-7 top-1/2 z-40 hidden w-[180px] -translate-y-1/2 lg:block"
      aria-label="섹션 바로가기"
    >
      <ol className="flex flex-col items-end gap-3">
        {navItems.map(({ label, index }, itemIndex) => {
          const isActive = activeSlide === index;

          return (
            <li key={label}>
              <button
                type="button"
                className="group grid w-[180px] grid-cols-[1fr_40px_24px] items-center gap-3 text-right"
                onClick={() => handleSlideNavigation(index)}
                aria-label={`${label} 섹션으로 이동`}
                aria-current={isActive ? "page" : undefined}
              >
                <span
                  className={`justify-self-end text-right text-[10px] font-black uppercase tracking-[0.16em] transition-all duration-300 ${
                    isActive
                      ? "text-lime-contrast dark:text-lime"
                      : "translate-x-2 text-text-muted-light opacity-0 group-hover:translate-x-0 group-hover:opacity-100 dark:text-text-muted-dark"
                  }`}
                >
                  {label}
                </span>
                <span
                  className={`block h-px justify-self-end transition-all duration-300 ${
                    isActive
                      ? "w-10 bg-lime-contrast dark:bg-lime"
                      : "w-5 bg-border-light group-hover:w-8 group-hover:bg-text-primary-light dark:bg-border-dark dark:group-hover:bg-text-primary-dark"
                  }`}
                />
                <span className="w-5 text-right text-[10px] font-black text-text-muted-light dark:text-text-muted-dark">
                  {String(itemIndex + 1).padStart(2, "0")}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Pos;
