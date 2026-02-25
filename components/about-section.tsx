"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"

function useCountUp(target: number, duration: number = 2000, inView: boolean = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target, duration])
  return count
}

export function AboutSection() {
  const statsRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(statsRef, { once: true, margin: "-100px" })
  const customerCount = useCountUp(10000, 2000, isInView)

  const formattedCount = customerCount.toLocaleString("de-DE") + "+"

  return (
    <motion.section
      id="about"
      className="bg-[#1A0F07] px-6 md:px-12 lg:px-20 py-24 md:py-32 relative grain-texture overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Giant decorative watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        <span
          className="font-serif font-bold italic whitespace-nowrap"
          style={{ fontSize: "180px", color: "rgba(124,154,107,0.06)" }}
        >
          BERLIN
        </span>
      </div>

      <motion.div
        className="max-w-2xl mx-auto text-center relative z-[1]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="inline-flex items-center gap-1.5 bg-[#EAF2E5] text-[#4A7C59] rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest mb-8">
          Über uns
        </div>

        <h2 className="font-serif text-[32px] md:text-[44px] lg:text-[52px] italic font-bold text-[#FAF6F0] leading-[1.15] text-balance">
          {"\u201EWir backen Cookies, die Berlin süchtig machen.\u201C"}
        </h2>

        <p className="font-sans text-base text-[#FAF6F0]/50 mt-8 leading-relaxed max-w-lg mx-auto">
          OOH! Cookies ist eine der ersten Adressen in Deutschland für echte NYC-Style Cookies {"\u2014"} handgebacken in Berlin-Mitte. Täglich frisch. Mit Liebe und ohne Kompromisse bei den Zutaten.
        </p>

        <div ref={statsRef} className="flex items-center justify-center gap-12 md:gap-16 mt-14">
          <motion.div
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="font-serif text-[48px] md:text-[64px] lg:text-[80px] font-bold text-[#7C9A6B] leading-none tabular-nums">
              {formattedCount}
            </span>
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.15em] text-[#FAF6F0]/40">
              Zufriedene Kunden
            </span>
          </motion.div>

          <motion.div
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span className="font-serif text-[48px] md:text-[64px] lg:text-[80px] font-bold text-[#7C9A6B] leading-none">
              2
            </span>
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.15em] text-[#FAF6F0]/40">
              Stores in Berlin
            </span>
          </motion.div>

          <motion.div
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <span className="font-serif text-[48px] md:text-[64px] lg:text-[80px] font-bold text-[#7C9A6B] leading-none">
              Täglich
            </span>
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.15em] text-[#FAF6F0]/40">
              Frisch gebacken
            </span>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  )
}
