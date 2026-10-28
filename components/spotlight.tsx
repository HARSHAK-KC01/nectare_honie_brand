"use client";

import { useEffect, useRef } from "react";

export function Spotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrame: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        if (spotlightRef.current) {
          spotlightRef.current.style.transform = `translate3d(${e.clientX - 600}px, ${e.clientY - 600}px, 0)`;
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 5,
        overflow: "hidden",
        mixBlendMode: "screen",
      }}
    >
      <div
        ref={spotlightRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "1200px",
          height: "1200px",
          background: "radial-gradient(circle, rgba(245, 176, 65, 0.08) 0%, transparent 60%)",
          willChange: "transform",
          transform: "translate3d(-600px, -600px, 0)",
        }}
      />
    </div>
  );
}
