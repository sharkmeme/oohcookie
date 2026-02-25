"use client"

import { motion } from "framer-motion"
import { MapPin, Clock } from "lucide-react"

const stores = [
  {
    name: "Store Mitte",
    address: "Dorotheenstra\u00DFe 43, 10117 Berlin",
    hours: ["Mo\u2013Fr 10\u201319", "Sa 11\u201319", "So 11\u201318"],
  },
  {
    name: "Store Europa City",
    address: "Otto-Weidt-Platz 7, 10557 Berlin",
    hours: ["Mo\u2013Fr 10\u201319", "Sa 11\u201319", "So 11\u201318"],
  },
]

export function LocationsSection() {
  return (
    <motion.section
      id="standorte"
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
          Standorte
        </span>
        <h2 className="font-serif text-[40px] md:text-[56px] lg:text-[64px] font-bold text-[#2C1810] leading-[1.05]">
          Komm vorbei.
        </h2>
        <p className="font-sans text-base text-[#9C8B80] mt-4 max-w-md mx-auto">
          {"Zwei Stores in Berlin \u2014 frisch gebacken, jeden Tag."}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-10">
        {stores.map((store, i) => (
          <motion.div
            key={store.name}
            className="bg-white rounded-3xl p-7 md:p-8 shadow-warm group hover:shadow-warm-lg transition-shadow duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EAF2E5] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-[#7C9A6B]" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-[#2C1810]">{store.name}</h3>
                <p className="font-sans text-[13px] text-[#9C8B80] mt-1.5">{store.address}</p>
                <div className="flex items-start gap-2 mt-3">
                  <Clock className="w-3.5 h-3.5 text-[#7C9A6B] shrink-0 mt-0.5" />
                  <div className="flex gap-3">
                    {store.hours.map((h) => (
                      <span key={h} className="font-sans text-[12px] text-[#9C8B80]">{h}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-warm"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <iframe
          src="https://www.openstreetmap.org/export/embed.html?bbox=13.35,52.50,13.42,52.54&layer=mapnik"
          className="w-full h-72 border-0"
          title="Karte Berlin Mitte"
          loading="lazy"
        />
      </motion.div>
    </motion.section>
  )
}
