"use client";

import { useState, useRef, MouseEvent } from "react";
import Image from "next/image";
import { JarShowcase } from "@/components/jar-showcase";
import { useHasWebGL } from "@/components/webgl-boundary";

export function HeroVisual() {
  const [mode, setMode] = useState<"visual" | "specs" | "3d">("visual");
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const webGLOk = useHasWebGL();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || mode === "3d") return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotate({
      x: -(y / (rect.height / 2)) * 6,
      y: (x / (rect.width / 2)) * 6,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div className="relative flex h-full w-full flex-col">
      {/* Mode Switcher */}
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-1 rounded-full border border-white/20 bg-black/60 p-1 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setMode("visual")}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider transition-all duration-300 ${
              mode === "visual"
                ? "bg-white text-black shadow-lg"
                : "text-white/60 hover:text-white"
            }`}
          >
            CINEMATIC STUDIO
          </button>
          <button
            type="button"
            onClick={() => setMode("specs")}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider transition-all duration-300 ${
              mode === "specs"
                ? "bg-white text-black shadow-lg"
                : "text-white/60 hover:text-white"
            }`}
          >
            PURITY SPECS
          </button>
          {webGLOk && (
            <button
              type="button"
              onClick={() => setMode("3d")}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider transition-all duration-300 ${
                mode === "3d"
                  ? "bg-white text-black shadow-lg"
                  : "text-white/60 hover:text-white"
              }`}
            >
              3D ORBIT
            </button>
          )}
        </div>

        <span className="hidden text-[11px] uppercase tracking-widest text-white/40 sm:inline">
          {mode === "visual" ? "HOVER TO TILT" : mode === "specs" ? "LAB CERTIFIED" : "DRAG TO ROTATE"}
        </span>
      </div>

      {/* Main Visual Container */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative h-[520px] w-full overflow-hidden rounded-[28px] border border-white/20 bg-[#080808] shadow-[0_50px_110px_rgba(0,0,0,0.7)] transition-transform duration-300 ease-out md:h-[620px]"
        style={{
          perspective: 1200,
          transform:
            mode === "visual"
              ? `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`
              : "none",
        }}
      >
        {mode === "visual" && (
          <>
            {/* Ambient Radial Golden Glow behind jar */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[380px] w-[380px] rounded-full bg-[#f5b041]/20 blur-[100px]" />

            {/* High-Resolution Hero Visual */}
            <Image
              src="/hero-honey-luxury.jpg"
              alt="Nectare Honie Luxury Raw Honey"
              fill
              priority
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* Bottom Gradient Overlay */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black via-black/40 to-transparent" />

            {/* Floating Badges */}
            <div className="pointer-events-none absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-3">
              <div className="rounded-xl border border-white/20 bg-black/60 px-4 py-2 backdrop-blur-md">
                <p className="text-[10px] tracking-widest text-white/50">HARVEST RESERVE</p>
                <p className="text-xs font-semibold text-white">Cold Extracted • 100% Raw</p>
              </div>

              <div className="rounded-xl border border-[#f5b041]/40 bg-black/60 px-4 py-2 backdrop-blur-md">
                <p className="text-[10px] tracking-widest text-[#f5b041]">PURITY GRADE</p>
                <p className="text-xs font-semibold text-white">Single Origin Flora</p>
              </div>
            </div>
          </>
        )}

        {mode === "specs" && (
          <div className="relative flex h-full w-full flex-col justify-between p-8 md:p-10">
            <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-[#f5b041]/10 blur-[90px]" />
            <div>
              <p className="text-xs font-semibold tracking-[0.3em] text-[#f5b041]">LAB ANALYSIS & PURITY</p>
              <h3 className="mt-2 text-3xl font-bold text-white md:text-4xl">Wild Reserve Profile</h3>
              <p className="mt-3 max-w-md text-sm leading-6 text-white/70">
                Independent spectrometry and laboratory analysis ensuring our honey retains active living enzymes without thermal degradation.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <p className="text-xs text-white/50">Moisture Content</p>
                  <p className="mt-1 text-2xl font-bold text-white">17.2%</p>
                  <p className="mt-0.5 text-[11px] text-[#f5b041]">Optimal Viscosity</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <p className="text-xs text-white/50">Diastase Activity</p>
                  <p className="mt-1 text-2xl font-bold text-white">28.4 DN</p>
                  <p className="mt-0.5 text-[#f5b041]">Natural Enzymes Intact</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <p className="text-xs text-white/50">HMF Index</p>
                  <p className="mt-1 text-2xl font-bold text-white">&lt; 8 mg/kg</p>
                  <p className="mt-0.5 text-[#f5b041]">Zero Heat Treatment</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <p className="text-xs text-white/50">Pollen Count</p>
                  <p className="mt-1 text-2xl font-bold text-white">98.6%</p>
                  <p className="mt-0.5 text-[#f5b041]">Single Floral Origin</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-white/60 backdrop-blur">
              ✓ Tested according to FSSAI & Codex Alimentarius international raw honey standards.
            </div>
          </div>
        )}

        {mode === "3d" && (
          <div className="relative flex h-full w-full flex-col">
            <JarShowcase />
            <div className="pointer-events-none absolute bottom-5 inset-x-0 text-center text-xs tracking-widest text-white/50">
              CLICK & DRAG TO ROTATE 3D JAR
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
