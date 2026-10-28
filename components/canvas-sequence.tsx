"use client";

import { useEffect, useRef, useState } from "react";

interface CanvasSequenceProps {
  className?: string;
  triggerSelector?: string;
  frameCount?: number;
}

export function CanvasSequence({
  className = "",
  triggerSelector = ".content",
  frameCount = 240,
}: CanvasSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [, setLoadedCount] = useState(0);

  useEffect(() => {
    let isCancelled = false;
    let tweenRef: { kill: () => void; scrollTrigger?: { kill: () => void } } | null = null;
    let resizeHandler: (() => void) | null = null;

    async function init() {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      if (isCancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext("2d", { alpha: false });
      if (!context) return;

      const currentFrame = (index: number) =>
        `/assets/frames/ezgif-frame-${(index + 1).toString().padStart(3, "0")}.jpg`;

      const images: HTMLImageElement[] = [];
      const imageSequence = { frame: 0 };

      const render = () => {
        const currentIdx = Math.round(imageSequence.frame);
        const img = images[currentIdx];
        if (!img || !img.complete || !img.naturalWidth) return;

        const scale = Math.max(
          canvas.width / img.naturalWidth,
          canvas.height / img.naturalHeight
        );
        const x = canvas.width / 2 - (img.naturalWidth / 2) * scale;
        const y = canvas.height / 2 - (img.naturalHeight / 2) * scale;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
      };

      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);

        const onImageLoad = () => {
          if (isCancelled) return;
          setLoadedCount((prev) => prev + 1);

          if (i === Math.round(imageSequence.frame)) {
            render();
          }
        };

        if (img.complete) {
          onImageLoad();
        } else {
          img.onload = onImageLoad;
        }

        images.push(img);
      }

      const resizeCanvas = () => {
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        render();
      };

      window.addEventListener("resize", resizeCanvas);
      resizeHandler = resizeCanvas;
      resizeCanvas();

      const triggerElement = document.querySelector(triggerSelector) || canvas;

      const trigger = gsap.to(imageSequence, {
        frame: frameCount - 1,
        snap: "frame",
        roundProps: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: triggerElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
        onUpdate: () => {
          requestAnimationFrame(render);
        },
      });

      tweenRef = trigger;
    }

    init();

    return () => {
      isCancelled = true;
      if (resizeHandler) window.removeEventListener("resize", resizeHandler);
      if (tweenRef?.scrollTrigger) tweenRef.scrollTrigger.kill();
      if (tweenRef) tweenRef.kill();
    };
  }, [frameCount, triggerSelector]);

  return (
    <div className={`canvas-container ${className}`}>
      <canvas ref={canvasRef} className="h-full w-full object-cover" />
    </div>
  );
}
