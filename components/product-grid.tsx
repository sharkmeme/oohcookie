"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Leaf, Wheat, Check } from "lucide-react"

const products = [
  {
    name: "Spekulatius Biscoff",
    price: "4,90 \u20AC",
    description: "Würzig, karamellisiert, butterweich.",
    taste: "Würzig, karamellisiert, butterweich.",
    badges: ["Bio-Mehl", "Grasgefütterte Butter", "Ohne Konservierungsstoffe"],
    gradient: "linear-gradient(145deg, #D4956A 0%, #B5722A 50%, #8B5530 100%)",
    overlayName: "Spekulatius",
    tag: "Bestseller",
  },
  {
    name: "Pistachio Dream",
    price: "4,90 \u20AC",
    description: "Nussig, cremig, leicht salzig.",
    taste: "Nussig, cremig, leicht salzig.",
    badges: ["Bio-Mehl", "Echte Pistazien", "Ohne Farbstoffe"],
    gradient: "linear-gradient(145deg, #8FBC8F 0%, #5A9060 50%, #3D6B42 100%)",
    overlayName: "Pistachio",
    tag: "Neu",
  },
  {
    name: "White Choc Macadamia",
    price: "4,50 \u20AC",
    description: "Buttrig, süß, leicht knusprig.",
    taste: "Buttrig, süß, leicht knusprig.",
    badges: ["Grasgefütterte Butter", "Echte Macadamia", "Kein Palmöl"],
    gradient: "linear-gradient(145deg, #F5E6D3 0%, #D4A57A 50%, #B8845A 100%)",
    overlayName: "Macadamia",
    tag: null,
  },
  {
    name: "Chocolate Chip Classic",
    price: "4,20 \u20AC",
    description: "Schokoladig, vollmundig, perfekt gesalzen.",
    taste: "Schokoladig, vollmundig, perfekt gesalzen.",
    badges: ["Bio-Schokolade", "Grasgefütterte Butter", "Handgemacht"],
    gradient: "linear-gradient(145deg, #6B4226 0%, #4A2C18 50%, #2C1810 100%)",
    overlayName: "Classic",
    tag: null,
  },
]

function ProductCard({
  product,
  index,
}: {
  product: (typeof products)[0]
  index: number
}) {
  const [ingredientsOpen, setIngredientsOpen] = useState(false)

  return (
    <motion.div
      className="bg-white rounded-3xl shadow-warm overflow-hidden group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
    >
      {/* FIX 8: Image area - bigger, bolder */}
      <div
        className="aspect-square min-h-[200px] flex items-center justify-center relative overflow-hidden rounded-t-3xl"
        style={{ background: product.gradient }}
      >
        <div className="absolute inset-0 opacity-20" style={{
          background: "radial-gradient(circle at 50% 40%, rgba(250,246,240,0.5) 0%, transparent 60%)"
        }} />

        {/* Tag badge */}
        {product.tag && (
          <span className="absolute top-3 right-3 z-20 bg-[#7C9A6B] text-white rounded-full text-xs px-3 py-1 font-sans font-bold">
            {product.tag}
          </span>
        )}

        <span className="text-[72px] relative z-10 drop-shadow-lg group-hover:scale-110 transition-transform duration-500">{"🍪"}</span>

        {/* Bottom gradient overlay with product name */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-5 pb-4 pt-12" style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)"
        }}>
          <p className="font-serif text-lg italic font-bold text-white">
            {product.name}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-5 flex flex-col gap-3">
        <div>
          <h3 className="font-serif text-xl font-bold text-[#2C1810]">{product.name}</h3>
          <p className="font-sans text-[13px] text-[#9C8B80] mt-1.5 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-1">
          <p className="font-serif text-2xl font-bold text-[#2C1810]">{product.price}</p>
          <button className="px-6 py-2.5 rounded-full bg-[#7C9A6B] hover:bg-[#6B8A5A] text-white font-sans text-[12px] font-semibold uppercase tracking-[0.08em] transition-all hover:shadow-lg">
            In die Box
          </button>
        </div>

        {/* Ingredients toggle */}
        <button
          onClick={() => setIngredientsOpen(!ingredientsOpen)}
          className="flex items-center justify-center gap-1.5 font-sans text-[12px] font-medium text-[#9C8B80] hover:text-[#2C1810] transition-colors mt-1 uppercase tracking-[0.06em]"
        >
          {"Zutaten & Geschmack"}
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-300 ${ingredientsOpen ? "rotate-180" : ""}`}
          />
        </button>

        <AnimatePresence>
          {ingredientsOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden"
            >
              <div className="pt-3 pb-1 border-t border-[#E8DFD4]">
                <p className="font-sans text-[13px] text-[#2C1810] mb-3">
                  <span className="font-semibold">Geschmack:</span> {product.taste}
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.badges.map((badge) => (
                    <span
                      key={badge}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EAF2E5] text-[#5A7D4A] font-sans text-[11px] font-semibold"
                    >
                      {badge.includes("Bio") ? (
                        <Wheat className="w-3 h-3" />
                      ) : badge.includes("Butter") || badge.includes("Palm") ? (
                        <Leaf className="w-3 h-3" />
                      ) : (
                        <Check className="w-3 h-3" />
                      )}
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export function ProductGrid() {
  return (
    <motion.section
      id="shop"
      className="px-6 md:px-12 lg:px-20 py-24 md:py-32 bg-[#FAF6F0] relative overflow-hidden"
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
          COOKIES
        </span>
      </div>

      <div className="relative z-[1]">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-1.5 bg-[#EAF2E5] text-[#4A7C59] rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest mb-4">
            Unsere Sorten
          </div>
          <h2 className="font-serif text-[40px] md:text-[56px] lg:text-[64px] font-bold text-[#2C1810] leading-[1.05]">
            Die Favoriten
          </h2>
          <p className="font-serif text-lg md:text-xl italic text-[#9C8B80] mt-4 max-w-md mx-auto">
            {"Unsere meistgeliebten Sorten \u2014 immer frisch, immer gooey."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {products.map((product, index) => (
            <ProductCard key={product.name} product={product} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  )
}
