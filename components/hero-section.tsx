"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  const { scrollY } = useScroll()
  const heroImageY = useTransform(scrollY, [0, 500], [0, -60])
  const heroTextY = useTransform(scrollY, [0, 500], [0, 30])

  return (
    <section className="min-h-[95vh] bg-[#FAF6F0] px-6 md:px-12 lg:px-20 flex items-center overflow-visible">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-20 py-16 md:py-0">
        {/* Left content -- 55% with parallax */}
        <motion.div
          className="w-full md:w-[55%] flex flex-col gap-7"
          style={{ y: heroTextY }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.span
            className="inline-flex items-center w-fit px-5 py-2 rounded-full bg-[#EAF2E5] text-[#5A7D4A] font-sans text-[11px] font-bold uppercase tracking-[0.15em]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {"NYC Style \u00B7 Handgemacht in Berlin"}
          </motion.span>

          <h1 className="leading-none text-balance">
            <motion.span
              className="block font-sans text-[18px] md:text-[22px] font-medium uppercase tracking-[0.2em] text-[#9C8B80] mb-3"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Der ultimative
            </motion.span>
            <motion.span
              className="block font-serif italic font-bold text-[64px] md:text-[80px] lg:text-[100px] text-[#7C9A6B]"
              style={{ lineHeight: 0.9 }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              Cookie.
            </motion.span>
            <motion.span
              className="block font-serif font-bold text-[32px] md:text-[40px] lg:text-[48px] text-[#2C1810] mt-2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Neu erfunden.
            </motion.span>
          </h1>

          <motion.p
            className="font-sans text-lg md:text-xl text-[#9C8B80] leading-relaxed max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Handgebacken in Berlin. Saubere Zutaten. Jeder Biss ein Erlebnis.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <a
              href="#shop"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#7C9A6B] hover:bg-[#6B8A5A] text-white font-sans text-[14px] font-semibold uppercase tracking-[0.06em] transition-all hover:gap-3.5 hover:shadow-lg"
            >
              Jetzt Bestellen
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#shop"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-[#2C1810]/15 text-[#2C1810] font-sans text-[14px] font-semibold uppercase tracking-[0.06em] hover:border-[#2C1810]/40 hover:bg-[#2C1810]/[0.03] transition-all"
            >
              Unsere Sorten entdecken
            </a>
          </motion.div>

          {/* FIX 4: Social proof row */}
          <motion.div
            className="flex items-center gap-4 flex-wrap mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div className="flex items-center gap-1.5 bg-white rounded-full px-4 py-2 shadow-sm">
              <span className="text-amber-400">{"⭐"}</span>
              <span className="font-semibold text-sm text-[#2C1810]">4.9/5</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white rounded-full px-4 py-2 shadow-sm">
              <span className="text-sm text-[#2C1810] font-semibold">10.000+ Kunden</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white rounded-full px-4 py-2 shadow-sm">
              <span className="text-sm text-[#2C1810] font-semibold">{"🏆 Berlins beste Cookies"}</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right side -- 45% hero card with parallax */}
        <motion.div
          className="w-full md:w-[45%] relative overflow-visible"
          style={{ y: heroImageY }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
        >
          {/* Cookie card with slow rocking rotation */}
          <motion.div
            animate={{ rotate: [0, 3, 0, -3, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div
              className="aspect-[4/5] rounded-3xl overflow-hidden relative glow-matcha"
              style={{
                background: "linear-gradient(145deg, #C4956A 0%, #8B5E3C 50%, #6B4530 100%)",
              }}
            >
              <div className="absolute inset-0 opacity-30" style={{
                background: "radial-gradient(circle at 50% 40%, rgba(250,246,240,0.4) 0%, transparent 60%)"
              }} />
              {/* FIX 5: No product name, just big cookie + tagline */}
              <div className="w-full h-full flex flex-col items-center justify-center relative z-10 gap-4">
                <span className="text-[100px] drop-shadow-2xl">{"🍪"}</span>
                <p className="font-sans text-sm italic text-white/60">Dein neues Lieblingsstück.</p>
              </div>
            </div>
          </motion.div>

          {/* Floating animated badges */}
          <motion.div
            animate={{ y: [0, -12, 0], rotate: [-2, 2, -2] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-4 -right-5 bg-white rounded-2xl px-3 py-2 shadow-lg text-sm font-semibold text-[#2C1810] flex items-center gap-1.5 z-10"
          >
            {"🌿 Handgemacht"}
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0], rotate: [1, -1, 1] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            className="absolute bottom-16 -right-8 bg-[#7C9A6B] rounded-2xl px-3 py-2 shadow-lg text-sm font-semibold text-white flex items-center gap-1.5 z-10"
          >
            {"🍫 Gooey Guaranteed"}
          </motion.div>

          <motion.div
            animate={{ y: [0, -8, 0], rotate: [2, -2, 2] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
            className="absolute top-1/3 -left-8 bg-[#FAF6F0] border border-stone-200 rounded-2xl px-3 py-2 shadow-lg text-sm font-semibold text-[#2C1810] flex items-center gap-1.5 z-10"
          >
            {"✨ Täglich Frisch"}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
