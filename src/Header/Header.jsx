"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import ThemeToggle from "../../app/ThemeToggle";
import { useAppContext } from "../../app/Context";
import Menus from "./Menus";

function Header() {
  const {
    isStart,
    activeSlide,
    setActiveSlide,
    isScrolled,
    setPendingScrollIndex,
  } = useAppContext();
  const [toggle, setToggle] = useState("");
  const [menus, setMenus] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const desktopMedia = window.matchMedia("(min-width: 1024px)");
    const closeMobileMenu = (event) => {
      if (!event.matches) return;
      setToggle("");
      setMenus(false);
    };

    desktopMedia.addEventListener("change", closeMobileMenu);
    return () => desktopMedia.removeEventListener("change", closeMobileMenu);
  }, []);

  const toMainTitle = () => {
    setToggle("");
    setTimeout(() => setMenus(false), 500);
    setActiveSlide(0);
    document.querySelector('[data-index="0"]')?.scrollIntoView({ behavior: "smooth" });
    if (window.location.pathname !== "/") {
      setPendingScrollIndex(0);
      router.push("/");
    }
  };

  const handleNavClick = (index) => {
    if (window.location.pathname === "/") {
      setActiveSlide(index);
      document
        .querySelector(`[data-index="${index}"]`)
        ?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    setPendingScrollIndex(index);
    router.push("/");
  };

  const menuEvent = () => {
    if (toggle === "") {
      setMenus(true);
      setTimeout(() => setToggle("active"), 0);
      return;
    }

    setToggle("");
    setTimeout(() => setMenus(false), 500);
  };

  const navItems = [
    { name: "Introduce", index: 0 },
    { name: "About", index: 1 },
    { name: "Publishing", index: 4 },
    { name: "Projects", index: 2 },
    { name: "Contact", index: 5 },
  ];

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-50 w-full border-b transition-all duration-500
          ${
            isScrolled
              ? "border-border-light bg-surface-light/95 py-2 dark:border-border-dark dark:bg-surface-dark/95"
              : "border-transparent bg-transparent py-4"
          }
          ${isStart === "ready" ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"}
        `}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] btn-primary"
        >
          본문으로 건너뛰기
        </a>

        <div
          className={`section-container flex items-center justify-between transition-all duration-500 ${
            isScrolled ? "h-11" : "h-14 md:h-16"
          }`}
        >
          <div className="flex items-center">
            <button
              type="button"
              onClick={toMainTitle}
              className="flex flex-shrink-0 items-center transition-opacity duration-300 hover:opacity-60"
              aria-label="홈으로 이동"
            >
              <Image
                src="/images/logo.svg"
                alt=""
                width={isScrolled ? 82 : 104}
                height={40}
                className="block dark:hidden"
                style={{ width: isScrolled ? 82 : 104, height: "auto" }}
              />
              <Image
                src="/images/logo-dark.svg"
                alt=""
                width={isScrolled ? 82 : 104}
                height={40}
                className="hidden dark:block"
                style={{ width: isScrolled ? 82 : 104, height: "auto" }}
              />
            </button>
          </div>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="주요 섹션">
            {navItems.map((item) => {
              const active = activeSlide === item.index;

              return (
                <button
                  type="button"
                  key={item.name}
                  onClick={() => handleNavClick(item.index)}
                  aria-current={active ? "page" : undefined}
                  className={`relative py-2 text-[12px] font-black uppercase tracking-[0.14em] transition-colors duration-300
                    ${
                      active
                        ? "text-text-primary-light dark:text-text-primary-dark"
                        : "text-text-muted-light hover:text-text-primary-light dark:text-text-muted-dark dark:hover:text-text-primary-dark"
                    }`}
                >
                  {item.name}
                  <span
                    className={`absolute bottom-0 left-0 h-px bg-current transition-all duration-300 ${
                      active ? "w-full" : "w-0"
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <ThemeToggle />
            <a
              href="https://github.com/LDH9276"
              target="_blank"
              rel="noopener noreferrer"
              className="line-link hidden lg:inline-flex"
              aria-label="GitHub 프로필 새 창으로 열기"
            >
              GitHub
              <ArrowUpRight size={14} strokeWidth={1.8} aria-hidden="true" />
            </a>

            <button
              type="button"
              className={`flex h-10 w-10 items-center justify-center border transition-colors duration-300 lg:hidden
                ${
                  toggle === "active"
                    ? "border-lime bg-lime text-surface-dark"
                    : "border-border-light text-text-primary-light hover:border-text-primary-light dark:border-border-dark dark:text-text-primary-dark dark:hover:border-text-primary-dark"
                }`}
              onClick={menuEvent}
              aria-controls="mobile-menu"
              aria-label={toggle === "active" ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={toggle === "active"}
            >
              {toggle === "active" ? (
                <X size={19} strokeWidth={1.75} aria-hidden="true" />
              ) : (
                <Menu size={19} strokeWidth={1.75} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {menus && (
        <Menus setToggle={setToggle} toggle={toggle} menuEvent={menuEvent} />
      )}
    </>
  );
}

export default Header;
