"use client"

import { motion } from "framer-motion"

const stats = [
  { number: "10.000+", label: "Zufriedene Kunden" },
  { number: "2", label: "Stores in Berlin" },
  { number: "T\u00E4glich", label: "Frisch gebacken" },
]

export function AboutSection() {
  return (
    <motion.section
      id="ueber-uns"
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
        <span className="font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-[#7C9A6B] mb-8 block">
          {"\u00DCber uns"}
        </span>

        <h2 className="font-serif text-[32px] md:text-[44px] lg:text-[52px] italic font-bold text-[#FAF6F0] leading-[1.15] text-balance">
          {"\u201EWir backen Cookies, die Berlin s\u00FCchtig machen.\u201C"}
        </h2>

        <p className="font-sans text-base text-[#FAF6F0]/50 mt-8 leading-relaxed max-w-lg mx-auto">
          {"OOH! Cookies ist eine der ersten Adressen in Deutschland f\u00FCr echte NYC-Style Cookies \u2014 handgebacken in Berlin-Mitte. T\u00E4glich frisch. Mit Liebe und ohne Kompromisse bei den Zutaten."}
        </p>

        <div className="flex items-center justify-center gap-12 md:gap-16 mt-14">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
            >
              <span className="font-serif text-[48px] md:text-[64px] lg:text-[80px] font-bold text-[#7C9A6B] leading-none">
                {stat.number}
              </span>
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.15em] text-[#FAF6F0]/40">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  )
}
