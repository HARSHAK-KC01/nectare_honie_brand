"use client";

import { ZeroGravityCanvas } from "@/components/zero-gravity-canvas";

export function ZeroGravityHoney() {
  return (
    <section className="border-t border-white/10 bg-[#050505] py-20 text-white md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold tracking-[0.35em] text-[#f5b041]">
            ZERO GRAVITY HONEY SIMULATION
          </p>
          <h2 className="mt-3 text-4xl font-bold md:text-6xl">Honey Objects in Suspension</h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-white/65 md:text-base">
            An interactive 3D weightless simulation showcasing authentic honey elements: our raw honey jar,
            handcrafted honey dipper, golden hexagonal honeycomb, and floating amber droplets suspended in space.
          </p>
        </div>

        <div className="relative h-[520px] overflow-hidden rounded-[26px] border border-white/20 bg-black shadow-[0_50px_120px_rgba(0,0,0,0.8)] md:h-[680px]">
          <ZeroGravityCanvas />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="pointer-events-none absolute bottom-5 inset-x-0 text-center text-xs tracking-widest text-white/40">
            DRAG TO ROTATE 360° ZERO-GRAVITY HONEY SCENE
          </div>
        </div>

        <div className="mt-6 grid gap-3 text-center text-xs uppercase tracking-[0.2em] text-white/60 md:grid-cols-4">
          <span className="rounded-full border border-white/20 bg-white/5 px-4 py-2">🍯 Raw Honey Jar</span>
          <span className="rounded-full border border-white/20 bg-white/5 px-4 py-2">🪵 Honey Dipper & Drip</span>
          <span className="rounded-full border border-white/20 bg-white/5 px-4 py-2">⬡ Golden Honeycomb</span>
          <span className="rounded-full border border-white/20 bg-white/5 px-4 py-2">✨ Suspended Amber Droplets</span>
        </div>
      </div>
    </section>
  );
}
