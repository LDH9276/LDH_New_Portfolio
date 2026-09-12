"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import useReducedMotion from "../hooks/useReducedMotion";

export default function ScrollProgress({ containerRef }) {
  const barRef = useRef(null);
  const [showTop, setShowTop] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let frame;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const available = container.scrollHeight - container.clientHeight;
        const progress =
          available > 0
            ? Math.min(1, Math.max(0, container.scrollTop / available))
            : 0;
        if (barRef.current)
          barRef.current.style.transform = `scaleX(${progress})`;
        setShowTop(container.scrollTop > container.clientHeight * 0.6);
      });
    };
    const resize = new ResizeObserver(update);
    resize.observe(container);
    container
      .querySelectorAll(".scroll-section")
      .forEach((section) => resize.observe(section));
    container.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      container.removeEventListener("scroll", update);
    };
  }, [containerRef]);

  return (
    <>
      <div className="reading-progress" aria-hidden="true">
        <div ref={barRef} />
      </div>
      {showTop && (
        <button
          type="button"
          className="back-to-top"
          aria-label="맨 위로 이동"
          onClick={() => {
            containerRef.current?.scrollTo({
              top: 0,
              behavior: reducedMotion ? "instant" : "smooth",
            });
          }}
        >
          <ArrowUp size={18} strokeWidth={1.8} aria-hidden="true" />
          <span>TOP</span>
        </button>
      )}
    </>
  );
}
