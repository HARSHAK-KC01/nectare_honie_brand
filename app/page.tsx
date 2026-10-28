import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { HeroVisual } from "@/components/hero-visual";
import { InteractiveHoneyFlow } from "@/components/interactive-honey-flow";
import { ZeroGravityHoney } from "@/components/zero-gravity-honey";
import { CinematicSequenceSection } from "@/components/cinematic-sequence-section";
import { Spotlight } from "@/components/spotlight";
import { PollenParticles } from "@/components/pollen-particles";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Spotlight />
      <PollenParticles />
      <Navbar dark floating />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pb-16 pt-10 md:pb-24 md:pt-14">
          <div className="lux-bg-orb lux-bg-orb-left" />
          <div className="lux-bg-orb lux-bg-orb-right" />

          <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 md:grid-cols-[1.05fr_1fr] md:px-10">
            <div className="space-y-7">
              <p className="text-xs font-semibold tracking-[0.42em] text-white/60">RAW . REAL . REMARKABLE.</p>
              <h1 className="max-w-2xl text-5xl leading-[1.04] md:text-7xl">
                Honey, Reimagined as
                <span className="block text-white/80">an Interactive Luxury Story</span>
              </h1>
              <p className="max-w-xl text-base text-white/75 md:text-lg">
                A cinematic D2C experience inspired by modern product showcases, engineered with premium
                monochrome visual language and fluid interaction design.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/shop"
                  className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
                >
                  Shop Collection
                </Link>
                <a
                  href="#signature"
                  className="rounded-xl border border-white/35 px-6 py-3 text-sm font-semibold text-white transition hover:border-white"
                >
                  Explore Signature
                </a>
              </div>

              <div className="grid max-w-lg grid-cols-3 gap-3 pt-2 text-center">
                <div className="luxe-stat-card">
                  <p className="text-2xl font-semibold">100%</p>
                  <p className="mt-1 text-xs text-white/60">Raw</p>
                </div>
                <div className="luxe-stat-card">
                  <p className="text-2xl font-semibold">3</p>
                  <p className="mt-1 text-xs text-white/60">Size Variants</p>
                </div>
                <div className="luxe-stat-card">
                  <p className="text-2xl font-semibold">5%</p>
                  <p className="mt-1 text-xs text-white/60">Tax Logic Ready</p>
                </div>
              </div>
            </div>

            <div className="w-full">
              <HeroVisual />
            </div>
          </div>
        </section>

        {/* Mid-page Interactive Section */}
        <section id="signature" className="border-y border-white/10 bg-[#0a0a0a] py-20">
          <div className="mx-auto mb-14 max-w-7xl px-6 md:px-10">
            <div className="mb-8 text-center">
              <p className="text-xs tracking-[0.32em] text-[#f5b041]">HONEY INTERACTION</p>
              <h2 className="mt-3 text-4xl md:text-5xl font-bold">Touch the Flow of Raw Honey</h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/65 md:text-base">
                Move your cursor horizontally across the frame or toggle Auto Flow to control the 240-frame
                burst dynamics and viscous honey flow in real time.
              </p>
            </div>
            
            <InteractiveHoneyFlow />
          </div>

          <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-3 md:px-10">
            <article className="luxe-info-card">
              <p className="text-xs tracking-[0.25em] text-white/50">MATERIAL LANGUAGE</p>
              <h3 className="mt-3 text-2xl">Monochrome First</h3>
              <p className="mt-3 text-sm leading-6 text-white/65">
                Premium black-white surfaces, controlled contrast, and restrained typography to communicate quality.
              </p>
            </article>
            <article className="luxe-info-card">
              <p className="text-xs tracking-[0.25em] text-white/50">INTERACTION MODEL</p>
              <h3 className="mt-3 text-2xl">Scroll Cinematics</h3>
              <p className="mt-3 text-sm leading-6 text-white/65">
                Hero motion and reveal pacing are tuned for narrative immersion with mobile-safe progressive behavior.
              </p>
            </article>
            <article className="luxe-info-card">
              <p className="text-xs tracking-[0.25em] text-white/50">COMMERCE FOUNDATION</p>
              <h3 className="mt-3 text-2xl">Checkout-Ready UI</h3>
              <p className="mt-3 text-sm leading-6 text-white/65">
                Variant pricing, persistent cart memory, COD and prepaid logic are already implemented in the storefront.
              </p>
            </article>
          </div>
        </section>

        {/* 240-Frame Blender Cinematic Sequence */}
        <CinematicSequenceSection />

        {/* Next Action Callout */}
        <section className="bg-black py-20 text-white">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 text-center md:flex-row md:px-10 md:text-left">
            <div>
              <p className="text-xs tracking-[0.28em] text-white/60">NEXT ACTION</p>
              <h3 className="mt-2 text-3xl md:text-4xl">Enter the Storefront Experience</h3>
            </div>
            <Link
              href="/shop"
              className="rounded-xl border border-white px-6 py-3 text-sm font-semibold transition hover:bg-white hover:text-black"
            >
              Open Shop
            </Link>
          </div>
        </section>

        {/* Finale 3D Suspension */}
        <ZeroGravityHoney />
      </main>
    </div>
  );
}
