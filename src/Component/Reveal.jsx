"use client";

import { useEffect, useRef } from "react";
import useReducedMotion from "../hooks/useReducedMotion";

export default function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (reducedMotion || !("IntersectionObserver" in window)) return;
    element.dataset.reveal = "pending";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        element.dataset.reveal = "visible";
        observer.disconnect();
      },
      { threshold: 0.08 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      delete element.dataset.reveal;
    };
  }, [reducedMotion]);

  return (
    <div
      ref={ref}
      className={`reveal-item ${className}`}
      style={{ "--reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
}
