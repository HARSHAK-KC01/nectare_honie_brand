"use client";

import { useEffect, useRef } from "react";

export function PollenParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isCancelled = false;
    const particles: HTMLDivElement[] = [];

    import("gsap").then(({ default: gsap }) => {
      if (isCancelled || !container) return;

      const particleCount = 35;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.className = "pollen-particle";

        const size = Math.random() * 3 + 1;

        gsap.set(particle, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          width: size,
          height: size,
          opacity: Math.random() * 0.45 + 0.1,
          backgroundColor: "#F5B041",
          borderRadius: "50%",
          position: "absolute",
          willChange: "transform, opacity",
          filter: `blur(${Math.random() * 2}px)`,
        });

        container.appendChild(particle);
        particles.push(particle);

        gsap.to(particle, {
          duration: Math.random() * 10 + 10,
          x: `+=${Math.random() * 100 - 50}`,
          y: `-=${Math.random() * 150 + 50}`,
          rotation: Math.random() * 360,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }
    });

    return () => {
      isCancelled = true;
      particles.forEach((p) => p.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 6,
        overflow: "hidden",
      }}
    />
  );
}
