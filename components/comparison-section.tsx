"use client"

import { motion } from "framer-motion"
import { X, Check } from "lucide-react"

const othersItems = [
  "Industriell hergestellt",
  "Voller Konservierungsstoffe",
  "Palm\u00F6l & Margarine",
  "K\u00FCnstliche Aromen & Farbstoffe",
  "Massenproduziert & tiefgek\u00FChlt",
]

const oohItems = [
  "T\u00E4glich handgebacken in Berlin",
  "100% nat\u00FCrliche Zutaten",
  "Grasgef\u00FCtterte Butter, kein Palm\u00F6l",
  "Echte Zutaten, echter Geschmack",
  "Wie von Oma \u2014 nur noch besser",
]

export function ComparisonSection() {
  return (
    <motion.section
      className="px-6 md:px-12 lg:px-20 py-24 md:py-32 bg-[#FAF6F0]"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#7C9A6B] mb-4 block">
          Der Unterschied
        </span>
        <h2 className="font-serif text-[40px] md:text-[56px] lg:text-[64px] font-bold text-[#2C1810] leading-[1.05]">
          {"Warum OOH!?"}
        </h2>
        <p className="font-sans text-base text-[#9C8B80] mt-4 max-w-md mx-auto">
          Nicht alle Cookies sind gleich. Der Unterschied steckt in den Zutaten.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Others column -- red tinted, strikethrough */}
        <motion.div
          className="rounded-3xl p-8 md:p-10"
          style={{
            background: "#FDF5F5",
            border: "2px solid #F5C5C5",
          }}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-full bg-[#FDE8E8] flex items-center justify-center">
              <span className="text-lg grayscale">{"⚠\uFE0F"}</span>
            </div>
            <h3 className="font-sans text-xl font-bold text-[#9C8B80]">Andere Cookies</h3>
          </div>
          <ul className="flex flex-col gap-3">
            {othersItems.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3.5 bg-[#FFF0F0] rounded-xl px-4 py-3"
              >
                <div className="w-6 h-6 rounded-full bg-[#FDE8E8] flex items-center justify-center shrink-0">
                  <X className="w-3.5 h-3.5 text-red-400" />
                </div>
                <span className="font-sans text-[14px] text-[#9C8B80] leading-relaxed line-through decoration-red-300/60">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* OOH column -- green gradient, bold */}
        <motion.div
          className="rounded-3xl p-8 md:p-10 relative transition-all duration-300 hover:scale-[1.02]"
          style={{
            background: "linear-gradient(135deg, #F0F7EC, #E8F5E1)",
            border: "2px solid #7C9A6B",
            boxShadow: "0 8px 32px rgba(124,154,107,0.2)",
          }}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
          whileHover={{
            boxShadow: "0 12px 48px rgba(124,154,107,0.3)",
          }}
        >
          {/* Badge */}
          <div className="absolute -top-3.5 right-8">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#7C9A6B] text-white font-sans text-[11px] font-bold uppercase tracking-[0.1em] shadow-sm">
              <Check className="w-3 h-3" />
              Das sind wir
            </span>
          </div>

          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-full bg-[#EAF2E5] flex items-center justify-center">
              <Check className="w-5 h-5 text-[#7C9A6B]" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#2C1810]">OOH! Cookies</h3>
          </div>
          <ul className="flex flex-col gap-3">
            {oohItems.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3.5 bg-white rounded-xl px-4 py-3"
              >
                <div className="w-6 h-6 rounded-full bg-[#EAF2E5] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 text-[#7C9A6B]" />
                </div>
                <span className="font-sans text-[14px] text-[#2C1810] leading-relaxed font-medium">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.section>
  )
}
