"use client"

import { motion } from "framer-motion"

const stats = [
  { number: "100%", label: "Natürliche Zutaten" },
  { number: "Täglich", label: "Frisch Gebacken" },
  { number: "0", label: "Kompromisse" },
]

export function VibeStrip() {
  return (
    <section className="bg-[#1A0F07] px-6 md:px-12 lg:px-20 py-16 relative grain-texture overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12 lg:gap-20">
        {/* Left: quote */}
        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-6xl leading-none text-[#7C9A6B] font-serif block mb-2">{"\u201C"}</span>
          <p className="font-serif italic text-[32px] md:text-[42px] text-white leading-[1.2]">
            Nicht einfach ein Cookie. Ein Erlebnis.
          </p>
        </motion.div>

        {/* Right: stat rows */}
        <motion.div
          className="w-full md:w-1/2 flex flex-col gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex items-baseline gap-5"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <span className="font-serif font-bold text-[40px] md:text-[48px] text-[#7C9A6B] leading-none min-w-[120px]">
                {stat.number}
              </span>
              <span className="font-sans text-[13px] md:text-[14px] uppercase tracking-[0.15em] text-[#FAF6F0]/50">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
