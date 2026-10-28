"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { JarShowcase } from "@/components/jar-showcase";

gsap.registerPlugin(ScrollTrigger);

export function CinematicHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const visual = visualRef.current;
    if (!section || !visual) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-copy",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
        },
      );

      gsap.to(visual, {
        scale: 1.08,
        rotation: 2,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          scrub: true,
          start: "top top",
          end: "+=900",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-grid relative overflow-hidden bg-[linear-gradient(135deg,#000000,#2b2b2b)] text-white"
    >
      <div className="mx-auto grid min-h-[88vh] max-w-7xl items-center gap-10 px-6 py-20 md:grid-cols-2 md:px-10">
        <div className="space-y-6">
          <p className="hero-copy text-xs tracking-[0.4em] text-white/70">RAW . REAL . REMARKABLE.</p>
          <h1 className="hero-copy text-5xl font-bold leading-tight md:text-7xl">Nectare Honie</h1>
          <p className="hero-copy max-w-xl text-base text-white/80 md:text-lg">
            Premium raw honey crafted with cinematic precision, natural integrity, and minimalist luxury.
          </p>
          <div className="hero-copy flex flex-wrap gap-3 pt-2">
            <Link href="/shop" className="premium-btn px-6 py-3 text-sm font-medium">
              Explore Collection
            </Link>
            <a
              href="#experience"
              className="rounded-[10px] border border-white/40 px-6 py-3 text-sm font-medium transition hover:bg-white hover:text-[#111111]"
            >
              Scroll Story
            </a>
          </div>
        </div>
        <div ref={visualRef} className="hero-copy">
          <JarShowcase />
        </div>
      </div>
    </section>
  );
}
