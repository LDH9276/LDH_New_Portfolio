"use client";

import { useEffect, useRef } from "react";
import useReducedMotion from "../hooks/useReducedMotion";

export default function MotionSurface({
  children,
  className = "",
  disabled = false,
  ...props
}) {
  const surfaceRef = useRef(null);
  const frameRef = useRef(null);
  const reducedMotion = useReducedMotion();

  const reset = () => {
    cancelAnimationFrame(frameRef.current);
    const surface = surfaceRef.current;
    if (!surface) return;
    surface.style.setProperty("--pointer-x", "50%");
    surface.style.setProperty("--pointer-y", "50%");
    surface.style.setProperty("--shift-x", "0px");
    surface.style.setProperty("--shift-y", "0px");
    surface.style.setProperty("--pointer-active", "0");
  };

  useEffect(() => {
    reset();
    return () => cancelAnimationFrame(frameRef.current);
  }, [disabled, reducedMotion]);

  const handlePointerMove = (event) => {
    if (disabled || reducedMotion || event.pointerType !== "mouse") return;
    const surface = surfaceRef.current;
    const bounds = surface.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      surface.style.setProperty("--pointer-x", `${x * 100}%`);
      surface.style.setProperty("--pointer-y", `${y * 100}%`);
      surface.style.setProperty("--shift-x", `${(x - 0.5) * 28}px`);
      surface.style.setProperty("--shift-y", `${(y - 0.5) * 20}px`);
      surface.style.setProperty("--pointer-active", "1");
    });
  };

  return (
    <div
      ref={surfaceRef}
      className={`motion-surface ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      {...props}
    >
      {children}
    </div>
  );
}
