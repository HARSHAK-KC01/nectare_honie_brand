"use client";

import { useEffect, useRef } from "react";

const TOTAL_FRAMES = 160;

export function HoneyCanvasSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let isCancelled = false;
    let tweenRef: { kill: () => void; scrollTrigger?: { kill: () => void } } | null = null;
    let handleResize: (() => void) | null = null;

    async function init() {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      if (isCancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      const canvas = canvasRef.current;
      if (!section || !canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const setSize = () => {
        const rect = section.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvas.width = Math.floor(rect.width * dpr);
        canvas.height = Math.floor(Math.min(window.innerHeight * 0.75, 560) * dpr);
        canvas.style.width = "100%";
        canvas.style.height = "min(75vh, 560px)";
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };

      const drawFrame = (frame: number) => {
        const progress = frame / TOTAL_FRAMES;
        const dpr = window.devicePixelRatio || 1;
        const width = canvas.width / dpr;
        const height = canvas.height / dpr;

        ctx.clearRect(0, 0, width, height);

        ctx.fillStyle = "#0a0a0a";
        ctx.fillRect(0, 0, width, height);

        const bottleX = width * 0.5;
        const bottleY = height * 0.14;
        const bottleW = Math.min(width * 0.24, 180);
        const bottleH = Math.min(height * 0.72, 390);

        ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
        ctx.lineWidth = 3;
        ctx.strokeRect(bottleX - bottleW / 2, bottleY, bottleW, bottleH);

        const fillHeight = bottleH * Math.min(progress * 1.15, 1);
        const fillY = bottleY + bottleH - fillHeight;

        const honeyGradient = ctx.createLinearGradient(0, fillY, 0, bottleY + bottleH);
        honeyGradient.addColorStop(0, "#f0be54");
        honeyGradient.addColorStop(1, "#c88217");

        ctx.fillStyle = honeyGradient;
        ctx.fillRect(bottleX - bottleW / 2 + 2, fillY, bottleW - 4, fillHeight - 2);

        const dropletY = bottleY - 60 + progress * 120;
        ctx.beginPath();
        ctx.ellipse(bottleX, dropletY, 16, 24, 0, 0, Math.PI * 2);
        ctx.fillStyle = progress > 0.95 ? "rgba(0,0,0,0)" : "#e7b041";
        ctx.fill();

        ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
        ctx.font = "600 16px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Raw Honey Extraction & Fill Sequence", width / 2, height - 20);
      };

      setSize();
      drawFrame(0);

      const progressState = { frame: 0 };

      const tween = gsap.to(progressState, {
        frame: TOTAL_FRAMES,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          scrub: true,
          start: "top center",
          end: "+=1000",
        },
        onUpdate: () => drawFrame(progressState.frame),
      });

      tweenRef = tween;

      handleResize = () => {
        setSize();
        drawFrame(progressState.frame);
      };

      window.addEventListener("resize", handleResize);
    }

    init();

    return () => {
      isCancelled = true;
      if (tweenRef?.scrollTrigger) tweenRef.scrollTrigger.kill();
      if (tweenRef) tweenRef.kill();
      if (handleResize) window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section ref={sectionRef} className="mx-auto w-full max-w-6xl px-6 py-20 text-white md:px-10">
      <div className="text-center">
        <p className="text-xs tracking-[0.32em] text-white/50">PHYSICS SIMULATION</p>
        <h2 className="mt-2 text-4xl font-bold md:text-5xl">Scroll-Scrubbed Honey Dynamics</h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-white/70">
          Interactive real-time canvas sequencing simulating the visceral extraction and bottle filling viscosity.
        </p>
      </div>
      <div className="mt-10 overflow-hidden rounded-2xl border border-white/15 bg-[#0a0a0a] p-4 shadow-2xl md:p-6">
        <canvas ref={canvasRef} className="w-full" />
      </div>
    </section>
  );
}
