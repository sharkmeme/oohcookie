"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function MonthlyDrop() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const calculate = () => {
      const now = new Date()
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59)
      const diff = Math.max(0, end.getTime() - now.getTime())
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }
    calculate()
    const interval = setInterval(calculate, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  return (
    <motion.section
      className="bg-[#1A0F07] px-6 md:px-12 lg:px-20 py-24 md:py-32 relative grain-texture overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          {/* Left: cookie card */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div
              className="aspect-square rounded-3xl flex flex-col items-center justify-center relative overflow-hidden glow-matcha"
              style={{
                background: "linear-gradient(145deg, #2C1810 0%, #3D2815 40%, #1A0F07 100%)",
              }}
            >
              <div className="absolute inset-0 opacity-20" style={{
                background: "radial-gradient(circle at 50% 40%, rgba(124,154,107,0.3) 0%, transparent 60%)"
              }} />
              <span className="text-[120px] md:text-[160px] relative z-10 drop-shadow-2xl">{"🍪"}</span>
              <div className="absolute bottom-8 left-8 right-8 z-10">
                <p className="font-serif text-2xl md:text-3xl italic text-[#FAF6F0]/90">
                  Black Forest Cake Cookie
                </p>
                <p className="font-sans text-[13px] text-[#FAF6F0]/50 mt-2">
                  Schwarzwälder Kirschtorte trifft NYC Cookie.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: content */}
          <motion.div
            className="w-full md:w-1/2 flex flex-col gap-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
          >
            <div className="flex flex-col gap-5">
              <div className="inline-flex items-center gap-1.5 bg-[#EAF2E5] text-[#4A7C59] rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest w-fit">
                Monthly Drop
              </div>

              <h2 className="font-serif text-[44px] md:text-[56px] lg:text-[64px] font-bold text-[#FAF6F0] leading-[1.05]">
                Cookie des Monats.
              </h2>

              <p className="font-serif text-lg italic text-[#FAF6F0]/60 leading-relaxed">
                Jeden Monat eine neue Kreation. Saisonal. Limitiert. Unwiderstehlich.
              </p>
            </div>

            {/* Countdown */}
            <div>
              <p className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#9C8B80] mb-5">
                Noch verfügbar:
              </p>
              <div className="flex gap-4">
                {Object.entries(timeLeft).map(([label, value]) => (
                  <div key={label} className="flex flex-col items-center bg-white/10 rounded-2xl px-5 py-4 min-w-[70px]">
                    <AnimatePresence mode="popLayout">
                      <motion.span
                        key={value}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-5xl font-bold text-[#7C9A6B] font-serif tabular-nums"
                      >
                        {String(value).padStart(2, "0")}
                      </motion.span>
                    </AnimatePresence>
                    <span className="text-xs uppercase tracking-widest text-[#FAF6F0]/40 mt-1">
                      {label === "days" ? "Tage" : label === "hours" ? "Std" : label === "minutes" ? "Min" : "Sek"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Email notify */}
            <div className="mt-2">
              <p className="font-sans text-sm text-[#FAF6F0]/50 mb-3">
                Beim nächsten Drop dabei sein
              </p>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="Deine E-Mail"
                  className="flex-1 px-5 py-3.5 rounded-full bg-[#2C1810] border border-[#3D2815]/60 text-[#FAF6F0] font-sans text-sm placeholder:text-[#9C8B80]/60 focus:outline-none focus:ring-2 focus:ring-[#7C9A6B] transition-shadow"
                />
                <button className="px-7 py-3.5 rounded-full bg-[#7C9A6B] hover:bg-[#6B8A5A] text-white font-sans text-[13px] font-semibold uppercase tracking-[0.06em] transition-all hover:shadow-lg whitespace-nowrap">
                  Erinnere mich
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
