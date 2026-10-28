"use client";

import { useEffect, useRef, useState, useCallback, MouseEvent, TouchEvent } from "react";

const TOTAL_FRAMES = 240;

export function InteractiveHoneyFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef(0);

  // Preload frames
  useEffect(() => {
    let loadedCount = 0;
    const imgs: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/assets/frames/ezgif-frame-${(i + 1).toString().padStart(3, "0")}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount >= 20) {
          setIsLoaded(true);
        }
      };
      imgs.push(img);
    }

    imagesRef.current = imgs;
  }, []);

  // Render specific frame to canvas
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const img = imagesRef.current[frameIdx];
    if (!img || !img.complete || !img.naturalWidth) return;

    const scale = Math.max(
      canvas.width / img.naturalWidth,
      canvas.height / img.naturalHeight
    );
    const x = canvas.width / 2 - (img.naturalWidth / 2) * scale;
    const y = canvas.height / 2 - (img.naturalHeight / 2) * scale;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
  }, []);

  // Sync canvas size
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      drawFrame(frameRef.current);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [drawFrame]);

  // Auto-play loop
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      frameRef.current = (frameRef.current + 1) % TOTAL_FRAMES;
      setCurrentFrame(frameRef.current);
      drawFrame(frameRef.current);
    }, 1000 / 30);

    return () => clearInterval(interval);
  }, [isPlaying, drawFrame]);

  // Handle Scrub on Mouse Move
  const handleScrub = (clientX: number) => {
    if (isPlaying) setIsPlaying(false);
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const targetFrame = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * TOTAL_FRAMES));
    frameRef.current = targetFrame;
    setCurrentFrame(targetFrame);
    drawFrame(targetFrame);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    handleScrub(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (e.touches[0]) {
      handleScrub(e.touches[0].clientX);
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-6xl">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="group relative h-[460px] w-full cursor-ew-resize overflow-hidden rounded-[26px] border border-white/20 bg-black shadow-[0_45px_100px_rgba(0,0,0,0.6)] md:h-[600px]"
      >
        <canvas ref={canvasRef} className="h-full w-full object-cover" />

        {/* Loading Indicator */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="flex items-center gap-3 rounded-full border border-white/20 bg-black/80 px-5 py-2.5 shadow-xl">
              <span className="h-2.5 w-2.5 animate-ping rounded-full bg-[#f5b041]" />
              <span className="text-xs font-semibold tracking-widest text-white">
                LOADING CINEMATICS...
              </span>
            </div>
          </div>
        )}

        {/* Ambient Top & Bottom Gradients */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/60 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 to-transparent" />

        {/* Top Controls Overlay */}
        <div className="absolute left-6 right-6 top-6 flex items-center justify-between">
          <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-4 py-1.5 backdrop-blur-md">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#f5b041]" />
            <span className="text-xs font-medium tracking-wider text-white">
              FRAME {String(currentFrame + 1).padStart(3, "0")} / {TOTAL_FRAMES}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsPlaying((prev) => !prev);
            }}
            className="rounded-full border border-white/25 bg-black/60 px-4 py-1.5 text-xs font-semibold tracking-wider text-white transition hover:border-white hover:bg-white hover:text-black backdrop-blur-md"
          >
            {isPlaying ? "❚❚ PAUSE" : "▶ AUTO FLOW"}
          </button>
        </div>

        {/* Bottom Interactive Prompt & Scrub Bar */}
        <div className="pointer-events-none absolute bottom-6 left-6 right-6 space-y-2">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-white/50">
            <span>DRAG OR MOVE CURSOR HORIZONTALLY TO SCRUB FLUID</span>
            <span>{Math.round(((currentFrame + 1) / TOTAL_FRAMES) * 100)}% FLOW</span>
          </div>

          {/* Progress Bar Track */}
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full bg-gradient-to-r from-[#e7b041] to-[#f5b041] transition-all duration-75"
              style={{ width: `${((currentFrame + 1) / TOTAL_FRAMES) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
