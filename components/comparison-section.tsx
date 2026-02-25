"use client"

import { motion } from "framer-motion"
import { X, Check } from "lucide-react"

const othersItems = [
  "Industriell hergestellt",
  "Voller Konservierungsstoffe",
  "Palmöl & Margarine",
  "Künstliche Aromen & Farbstoffe",
  "Massenproduziert & tiefgekühlt",
]

const oohItems = [
  "Täglich handgebacken in Berlin",
  "100% natürliche Zutaten",
  "Grasgefütterte Butter, kein Palmöl",
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
        <div className="inline-flex items-center gap-1.5 bg-[#EAF2E5] text-[#4A7C59] rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest mb-4">
          Der Unterschied
        </div>
        <h2 className="font-serif text-[40px] md:text-[56px] lg:text-[64px] font-bold text-[#2C1810] leading-[1.05]">
          {"Warum OOH!?"}
        </h2>
        <p className="font-sans text-base text-[#9C8B80] mt-4 max-w-md mx-auto">
          Nicht alle Cookies sind gleich. Der Unterschied steckt in den Zutaten.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Others column */}
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
              <span className="text-lg grayscale">{"⚠️"}</span>
            </div>
            <h3 className="font-sans text-xl font-bold text-[#9C8B80]">Andere Cookies</h3>
          </div>
          <div className="flex flex-col gap-2">
            {othersItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3 bg-red-50 rounded-xl px-4 py-3"
              >
                <X size={16} className="text-red-400 shrink-0" />
                <span className="text-sm text-stone-400 line-through">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* OOH column */}
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
          <div className="flex flex-col gap-2">
            {oohItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm"
              >
                <Check size={16} className="text-[#7C9A6B] shrink-0" />
                <span className="text-sm font-medium text-[#2C1810]">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
