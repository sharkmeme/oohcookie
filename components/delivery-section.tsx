"use client"

import { motion } from "framer-motion"
import { Zap, Package, ArrowRight } from "lucide-react"

export function DeliverySection() {
  return (
    <motion.section
      className="px-6 md:px-12 lg:px-20 py-24 md:py-32 bg-[#F0E8DF]"
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
          Lieferung
        </span>
        <h2 className="font-serif text-[40px] md:text-[56px] lg:text-[64px] font-bold text-[#2C1810] leading-[1.05]">
          So kommt dein Cookie zu dir.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <motion.div
          className="bg-[#1A0F07] rounded-3xl p-8 md:p-10 relative grain-texture overflow-hidden group"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-[#7C9A6B]/15 flex items-center justify-center mb-6">
              <Zap className="w-7 h-7 text-[#7C9A6B]" />
            </div>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#FAF6F0]">
              Sofort-Lieferung in Berlin
            </h3>
            <p className="font-sans text-[15px] text-[#FAF6F0]/50 mt-3 leading-relaxed">
              {"Warm. Gooey. In unter 30 Minuten. Bestell jetzt \u00FCber Wolt oder Uber Eats."}
            </p>
            <button className="mt-8 inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#7C9A6B] hover:bg-[#6B8A5A] text-white font-sans text-[13px] font-semibold uppercase tracking-[0.06em] transition-all hover:gap-3.5">
              Jetzt via Wolt bestellen
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="font-sans text-[11px] text-[#FAF6F0]/30 mt-4 uppercase tracking-[0.1em]">
              {"Same-Day \u00B7 Direkt an deine T\u00FCr \u00B7 Berlin"}
            </p>
          </div>
        </motion.div>

        <motion.div
          className="bg-[#FAF6F0] rounded-3xl p-8 md:p-10 shadow-warm group"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
        >
          <div className="w-14 h-14 rounded-2xl bg-[#EAF2E5] flex items-center justify-center mb-6">
            <Package className="w-7 h-7 text-[#7C9A6B]" />
          </div>
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#2C1810]">
            Deutschlandweiter Versand
          </h3>
          <p className="font-sans text-[15px] text-[#9C8B80] mt-3 leading-relaxed">
            {"Frisch gebacken. Zu dir geliefert \u2014 egal wo du bist. Versandkostenfrei ab 50\u20AC."}
          </p>
          <button className="mt-8 inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#7C9A6B] hover:bg-[#6B8A5A] text-white font-sans text-[13px] font-semibold uppercase tracking-[0.06em] transition-all hover:gap-3.5">
            Online bestellen
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="font-sans text-[11px] text-[#9C8B80]/60 mt-4 uppercase tracking-[0.1em]">
            {"Mo\u2013Mi Versandtage \u00B7 7 Tage haltbar \u00B7 Sendungsverfolgung"}
          </p>
        </motion.div>
      </div>
    </motion.section>
  )
}
