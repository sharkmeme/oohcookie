"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion"
import { ShoppingBag, Menu, X, Check, ChevronDown, MapPin, Zap, Package, Wheat, Droplets, Leaf, Hand, Ban, Instagram, Music } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

/* ─── HELPERS ─── */

function SectionBadge({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <div className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest mb-4 ${dark ? "bg-[#7C9A6B]/20 text-[#7C9A6B]" : "bg-[#EAF2E5] text-[#4A7C59]"}`}>
      {label}
    </div>
  )
}

function useCountUp(target: number, inView: boolean, duration = 2000) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let current = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      current += step
      if (current >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(current))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target, duration])
  return count
}

const sectionAnim = {
  initial: { opacity: 0, y: 40 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  transition: { duration: 0.7, ease: "easeOut" } as const,
  viewport: { once: true, margin: "-80px" } as const,
}

/* ─── DATA ─── */

const products = [
  { id: 1, name: "Spekulatius Biscoff", desc: "Cremige Spekulatiusfüllung mit zarter weißer Schokolade.", taste: "Würzig, karamellisiert, butterweich.", price: "4,90 €", badge: "Bestseller", badgeColor: "bg-[#7C9A6B] text-white", gradient: "linear-gradient(145deg, #D4956A 0%, #B5722A 50%, #8B5530 100%)", ingredients: ["Bio-Mehl", "Grasgefütterte Butter", "Ohne Konservierungsstoffe"] },
  { id: 2, name: "Pistachio Dream", desc: "Cremige Pistazienfüllung mit zartschmelzender weißer Schokolade.", taste: "Nussig, cremig, leicht salzig.", price: "4,90 €", badge: "Neu", badgeColor: "bg-amber-400 text-white", gradient: "linear-gradient(145deg, #8FBC8F 0%, #5A9060 50%, #3D6B42 100%)", ingredients: ["Bio-Mehl", "Echte Pistazien", "Ohne Farbstoffe"] },
  { id: 3, name: "White Choc Macadamia", desc: "Knusprige Macadamia. Zartschmelzende weiße Schokolade.", taste: "Buttrig, süß, leicht knusprig.", price: "4,50 €", badge: null, badgeColor: "", gradient: "linear-gradient(145deg, #F5E6D3 0%, #D4A57A 50%, #B8845A 100%)", ingredients: ["Grasgefütterte Butter", "Echte Macadamia", "Kein Palmöl"] },
  { id: 4, name: "Chocolate Chip Classic", desc: "Der NYC Klassiker — außen knusprig, innen gooey.", taste: "Schokoladig, vollmundig, perfekt gesalzen.", price: "4,20 €", badge: "Fan-Favorit", badgeColor: "bg-[#2C1810] text-white", gradient: "linear-gradient(145deg, #6B4226 0%, #4A2C18 50%, #2C1810 100%)", ingredients: ["Bio-Schokolade", "Grasgefütterte Butter", "Handgemacht"] },
]

const chips = [
  { top: "18%", left: "22%", w: 22, h: 16 }, { top: "44%", left: "12%", w: 26, h: 18 },
  { top: "66%", left: "28%", w: 20, h: 15 }, { top: "14%", left: "58%", w: 24, h: 17 },
  { top: "48%", left: "48%", w: 28, h: 20 }, { top: "74%", left: "52%", w: 18, h: 14 },
  { top: "28%", left: "72%", w: 22, h: 16 }, { top: "62%", left: "70%", w: 24, h: 18 },
  { top: "38%", left: "82%", w: 20, h: 15 },
]

const faqs = [
  { q: "Was macht OOH! Cookies besonders?", a: "Wir gehören zu den ersten Cookie-Shops in Deutschland, die NYC-Style Cookies etabliert haben. Alles wird täglich frisch in unserer eigenen Bäckerei in Berlin-Mitte gebacken — mit ausgewählten, natürlichen Zutaten ohne Kompromisse." },
  { q: "Gibt es neue Sorten?", a: "Jeden Monat gibt es einen neuen Monthly Special — saisonal inspiriert und streng limitiert. Zwischendrin überraschen wir euch auch zu besonderen Anlässen wie Valentinstag oder besonderen Events." },
  { q: "Gibt es vegane Cookies?", a: "Ja! Unsere veganen Sorten sind im Shop entsprechend gekennzeichnet. Schau einfach auf die Produktbeschreibung — dort findest du alle Hinweise zu Zutaten und Allergenen." },
  { q: "Wie läuft die Online-Bestellung ab?", a: "Einfach Cookies aussuchen, in die Box legen und bestellen. Versandtage sind Montag bis Mittwoch — deine Cookies werden am selben Tag frisch gebacken und verschickt. Du erhältst eine Bestätigung mit Sendungsverfolgung." },
  { q: "Wie lange sind die Cookies haltbar?", a: "Nach dem Versand bleiben deine Cookies 7 Tage frisch. Am besten luftdicht verpackt bei Raumtemperatur aufbewahren — so behalten sie ihre weiche, chewy Konsistenz am längsten." },
]

const othersItems = ["Industriell hergestellt", "Voller Konservierungsstoffe", "Palmöl & Margarine", "Künstliche Aromen & Farbstoffe", "Massenproduziert & tiefgekühlt"]
const oohItems = ["Täglich handgebacken in Berlin", "100% natürliche Zutaten", "Grasgefütterte Butter, kein Palmöl", "Echte Zutaten, echter Geschmack", "Wie von Oma — nur noch besser"]

/* ─── INTRO OVERLAY ─── */

function IntroOverlay({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"cookie" | "sequence" | "done">("cookie")
  const [seqStep, setSeqStep] = useState(0)
  const [seqVisible, setSeqVisible] = useState(true)

  useEffect(() => {
    document.body.style.overflow = phase === "done" ? "unset" : "hidden"
    return () => { document.body.style.overflow = "unset" }
  }, [phase])

  useEffect(() => {
    if (phase === "done") onDone()
  }, [phase, onDone])

  const steps = [
    { text: "OOH... du magst Cookies?", font: "font-serif italic", size: "text-[40px] md:text-[68px]", color: "text-[#FAF6F0]", ms: 800 },
    { text: "Wir auch. 🍪", font: "font-serif font-bold", size: "text-[52px] md:text-[88px]", color: "text-[#FAF6F0]", ms: 700 },
    { text: "Deshalb haben wir den perfekten erschaffen.", font: "font-sans", size: "text-[24px] md:text-[36px]", color: "text-[#9C8B80]", ms: 800 },
    { text: "Wir präsentieren stolz...", font: "font-sans italic", size: "text-[22px] md:text-[32px]", color: "text-[#7C9A6B]", ms: 700 },
    { text: "OOH! Cookies.", font: "font-serif font-bold", size: "text-[72px] md:text-[120px]", color: "text-[#FAF6F0]", ms: 1200, underline: true },
    { text: "Handgemacht. Täglich frisch. Unwiderstehlich.", font: "font-sans uppercase tracking-widest", size: "text-[14px] md:text-[20px]", color: "text-[#9C8B80]", ms: 800, staggerWords: true },
    { text: "Yummy. 😋", font: "font-serif font-bold italic", size: "text-[80px] md:text-[140px]", color: "text-[#FAF6F0]", ms: 800, spring: true },
  ]

  useEffect(() => {
    if (phase !== "sequence") return
    if (seqStep >= steps.length) {
      const t = setTimeout(() => setPhase("done"), 600)
      return () => clearTimeout(t)
    }
    setSeqVisible(true)
    const t1 = setTimeout(() => {
      setSeqVisible(false)
      const t2 = setTimeout(() => setSeqStep(s => s + 1), 300)
      return () => clearTimeout(t2)
    }, steps[seqStep].ms)
    return () => clearTimeout(t1)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, seqStep])

  const skip = useCallback(() => setPhase("done"), [])

  if (phase === "done") return null

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#1A0F07] flex flex-col items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {phase === "cookie" && (
            <>
              {/* Repeating COOKIES text */}
              <div className="absolute top-12 left-0 right-0 flex items-center justify-center gap-8 overflow-hidden">
                {[0, 1, 2, 3].map(ri => (
                  <motion.div key={ri} className="flex" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.04, delayChildren: ri * 0.15 } } }}>
                    {"COOKIES".split("").map((ch, ci) => (
                      <motion.span
                        key={`${ri}-${ci}`}
                        className="font-serif italic text-[36px] md:text-[64px] text-[#FAF6F0]"
                        style={{ letterSpacing: "-0.02em" }}
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 0.15, y: 0 } }}
                      >
                        {ch}
                      </motion.span>
                    ))}
                    {ri < 3 && <span className="w-4 md:w-6" />}
                  </motion.div>
                ))}
              </div>

              {/* Spinning cookie */}
              <motion.div
                className="relative"
                style={{ width: 280, height: 280 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle at 38% 35%, #D4956A, #B5722A 40%, #8B5530 70%, #6B3F20)", boxShadow: "inset -10px -10px 25px rgba(0,0,0,0.3), inset 5px 5px 15px rgba(255,220,150,0.25), 0 10px 40px rgba(100,50,10,0.6)" }} />
                <div className="absolute rounded-full" style={{ inset: 6, border: "2px dashed rgba(180,120,60,0.35)" }} />
                <div className="absolute rounded-full" style={{ top: "18%", left: "22%", width: "28%", height: "18%", background: "rgba(255,220,100,0.18)", filter: "blur(10px)" }} />
                {chips.map((c, i) => (
                  <div key={i} className="absolute" style={{ top: c.top, left: c.left, width: c.w, height: c.h, background: "#1E0E08", borderRadius: "42% 58% 55% 45% / 48% 46% 54% 52%", boxShadow: "inset 1px 1px 2px rgba(255,255,255,0.08)" }} />
                ))}
                <motion.div
                  className="absolute top-1/2 left-1/2"
                  style={{ transform: "translate(-50%, -50%)" }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <button
                    onClick={() => setPhase("sequence")}
                    className="bg-[#7C9A6B] text-white rounded-full px-5 py-2.5 text-sm font-bold font-sans whitespace-nowrap cursor-pointer hover:bg-[#6B8A5A] transition-colors"
                    style={{ boxShadow: "0 4px 20px rgba(124,154,107,0.6)" }}
                  >
                    {"Jetzt rein. 🍪"}
                  </button>
                </motion.div>
              </motion.div>

              <motion.p
                className="font-sans text-sm text-[#9C8B80] mt-12"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                Handgemacht in Berlin · Täglich frisch
              </motion.p>
            </>
          )}

          {phase === "sequence" && seqStep < steps.length && (
            <div className="flex items-center justify-center px-6 text-center">
              <AnimatePresence mode="wait">
                {seqVisible && (
                  <motion.div
                    key={seqStep}
                    initial={steps[seqStep].spring ? { opacity: 0, scale: 0.3 } : { opacity: 0, scale: 0.75 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.15 }}
                    transition={steps[seqStep].spring ? { type: "spring", stiffness: 200, damping: 12 } : { duration: 0.35, ease: "backOut" }}
                    className="relative"
                  >
                    {steps[seqStep].staggerWords ? (
                      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
                        {steps[seqStep].text.split(". ").map((word, wi, arr) => (
                          <motion.span
                            key={wi}
                            className={`${steps[seqStep].font} ${steps[seqStep].size} ${steps[seqStep].color}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: wi * 0.15 }}
                          >
                            {word}{wi < arr.length - 1 ? "." : ""}
                          </motion.span>
                        ))}
                      </div>
                    ) : (
                      <span className={`${steps[seqStep].font} ${steps[seqStep].size} ${steps[seqStep].color} leading-none`}>
                        {steps[seqStep].text}
                      </span>
                    )}
                    {steps[seqStep].underline && (
                      <motion.div
                        className="h-[3px] bg-[#7C9A6B] mt-2 rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        style={{ transformOrigin: "left" }}
                      />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          <button onClick={skip} className="fixed bottom-6 right-6 font-sans text-xs text-[#9C8B80]/60 cursor-pointer hover:text-[#9C8B80] transition-colors z-[10000]">
            {"überspringen →"}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ─── CUSTOM CURSOR ─── */

function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const [pressed, setPressed] = useState(false)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return
    setActive(true)
    document.body.style.cursor = "none"

    const move = (e: MouseEvent) => {
      if (dotRef.current) { dotRef.current.style.left = `${e.clientX}px`; dotRef.current.style.top = `${e.clientY}px` }
      if (ringRef.current) { ringRef.current.style.left = `${e.clientX}px`; ringRef.current.style.top = `${e.clientY}px` }
    }
    const down = () => setPressed(true)
    const up = () => setPressed(false)
    const over = (e: MouseEvent) => { if ((e.target as HTMLElement).closest("a, button, [role=button]")) setHovering(true) }
    const out = (e: MouseEvent) => { if ((e.target as HTMLElement).closest("a, button, [role=button]")) setHovering(false) }

    window.addEventListener("mousemove", move)
    window.addEventListener("mousedown", down)
    window.addEventListener("mouseup", up)
    document.addEventListener("mouseover", over)
    document.addEventListener("mouseout", out)
    return () => {
      document.body.style.cursor = ""
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mousedown", down)
      window.removeEventListener("mouseup", up)
      document.removeEventListener("mouseover", over)
      document.removeEventListener("mouseout", out)
    }
  }, [])

  if (!active) return null
  return (
    <>
      <div ref={dotRef} className="fixed pointer-events-none z-[99999]" style={{ width: 10, height: 10, borderRadius: "50%", background: "#7C9A6B", transition: "transform 0.1s", transform: `translate(-50%, -50%) scale(${pressed ? 0.5 : 1})` }} />
      <div ref={ringRef} className="fixed pointer-events-none z-[99999]" style={{ width: 36, height: 36, borderRadius: "50%", border: hovering ? "2px solid rgba(124,154,107,0.8)" : "2px solid rgba(124,154,107,0.5)", transition: "transform 0.15s, border 0.15s", transform: `translate(-50%, -50%) scale(${hovering ? 1.8 : 1})` }} />
    </>
  )
}

/* ─── PRODUCT CARD ─── */

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <div className="aspect-square relative overflow-hidden" style={{ background: product.gradient }}>
        <div className="flex items-center justify-center h-full text-[80px]">🍪</div>
        <div className="absolute bottom-0 left-0 right-0 h-2/5" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)" }} />
        <span className="absolute bottom-4 left-4 font-serif italic font-bold text-white text-[19px]">{product.name}</span>
        {product.badge && (
          <span className={`absolute top-3 right-3 rounded-full text-xs px-2.5 py-1 font-bold font-sans ${product.badgeColor}`}>{product.badge}</span>
        )}
      </div>
      <div className="px-5 py-4">
        <p className="font-sans text-[13px] text-[#9C8B80] mb-3">{product.desc}</p>
        <div className="flex justify-between items-center mb-3">
          <span className="font-sans font-bold text-[20px] text-[#2C1810]">{product.price}</span>
          <button className="bg-[#7C9A6B] text-white rounded-full px-4 py-2 text-sm font-bold font-sans hover:bg-[#6B8A5A] transition-colors cursor-pointer">In die Box legen</button>
        </div>
        <button onClick={() => setOpen(!open)} className="font-sans text-[13px] text-[#9C8B80] flex items-center gap-1 cursor-pointer hover:text-[#7C9A6B] transition-colors">
          {"Zutaten & Geschmack"}
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={14} />
          </motion.span>
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="font-sans text-[13px] text-[#2C1810] mt-2 mb-2">{product.taste}</p>
              <div className="flex flex-wrap gap-1.5">
                {product.ingredients.map(ing => (
                  <span key={ing} className="bg-[#EAF2E5] text-[#4A7C59] rounded-full text-xs px-2.5 py-1 font-medium">{ing}</span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

/* ─── MAIN PAGE ─── */

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [, setIntroDone] = useState(false)
  const { scrollYProgress } = useScroll()
  const heroTextY = useTransform(scrollYProgress, [0, 0.15], [0, 30])
  const heroImageY = useTransform(scrollYProgress, [0, 0.15], [0, -60])

  // Countdown — SSR safe
  const [mounted, setMounted] = useState(false)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  useEffect(() => {
    setMounted(true)
    const calc = () => {
      const now = new Date()
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59)
      const d = Math.max(0, end.getTime() - now.getTime())
      setTimeLeft({
        days: Math.floor(d / 86400000),
        hours: Math.floor((d % 86400000) / 3600000),
        minutes: Math.floor((d % 3600000) / 60000),
        seconds: Math.floor((d % 60000) / 1000),
      })
    }
    calc()
    const t = setInterval(calc, 1000)
    return () => clearInterval(t)
  }, [])

  // Count-up stats
  const statsRef = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" })
  const customerCount = useCountUp(10000, statsInView)

  const handleIntroDone = useCallback(() => setIntroDone(true), [])

  return (
    <main className="pb-20 md:pb-0">
      <IntroOverlay onDone={handleIntroDone} />
      <CustomCursor />

      {/* Scroll Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-0.5 bg-[#7C9A6B] origin-left z-[99998]" style={{ scaleX: scrollYProgress }} />

      {/* ══════ ANNOUNCEMENT BAR ══════ */}
      <div className="bg-[#2C1810] text-[#FAF6F0] py-2 text-xs font-sans font-medium overflow-hidden">
        <div className="whitespace-nowrap" style={{ animation: "marquee 25s linear infinite" }}>
          {"100% Natürliche Zutaten • Mindestbestellwert 20€ • Kostenloser Versand ab 50€ • Deutschlandweite Lieferung • Täglich Frisch Gebacken • 100% Natürliche Zutaten • Mindestbestellwert 20€ • Kostenloser Versand ab 50€ • Deutschlandweite Lieferung • Täglich Frisch Gebacken • "}
        </div>
      </div>

      {/* ══════ HEADER ══════ */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 border-b border-stone-100 shadow-sm">
        <div className="flex items-center justify-between px-6 md:px-12 py-4">
          <span className="font-serif font-bold text-2xl text-[#2C1810]">OOH! Cookies</span>
          <nav className="hidden md:flex items-center gap-8">
            {[["Shop", "#shop"], ["Standorte", "#standorte"], ["Über uns", "#about"]].map(([label, href]) => (
              <a key={href} href={href} className="font-sans text-sm font-medium text-[#2C1810]/70 hover:text-[#2C1810] transition-colors">{label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCartOpen(true)}
              className="bg-[#7C9A6B] hover:bg-[#6B8A5A] text-white rounded-full px-5 py-2.5 flex items-center gap-2 font-semibold text-sm shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ShoppingBag size={18} />
              <span>Box</span>
              <span className="bg-white text-[#7C9A6B] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">0</span>
            </button>
            <button onClick={() => setMobileNavOpen(true)} className="md:hidden text-[#2C1810] cursor-pointer" aria-label="Navigation öffnen">
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-[#1A0F07] flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button onClick={() => setMobileNavOpen(false)} className="absolute top-5 right-5 text-white cursor-pointer" aria-label="Navigation schließen"><X size={28} /></button>
            {[["Shop", "#shop"], ["Standorte", "#standorte"], ["Über uns", "#about"]].map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMobileNavOpen(false)} className="font-serif text-white text-3xl hover:text-[#7C9A6B] transition-colors">{label}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════ HERO ══════ */}
      <motion.section {...sectionAnim} className="min-h-[95vh] bg-[#FAF6F0] flex items-center px-6 md:px-16 py-20">
        <div className="w-full grid md:grid-cols-[55%_45%] gap-12 items-center max-w-7xl mx-auto">
          {/* Left */}
          <motion.div style={{ y: heroTextY }}>
            <SectionBadge label="NYC Style · Handgemacht in Berlin" />
            <div className="mt-2">
              <span className="font-sans text-[20px] uppercase tracking-[0.2em] text-[#9C8B80] block mb-1">Der ultimative</span>
              <motion.span
                className="font-serif italic font-bold text-[#7C9A6B] text-[64px] md:text-[100px] block mb-2"
                style={{ lineHeight: 0.85 }}
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                Cookie.
              </motion.span>
              <span className="font-serif font-bold text-[#2C1810] text-[34px] md:text-[52px] block">Neu erfunden.</span>
            </div>
            <p className="font-sans text-[18px] text-[#9C8B80] mt-4 max-w-md leading-relaxed">
              Handgebacken in Berlin. Saubere Zutaten. Jeder Biss ein Erlebnis.
            </p>
            <div className="mt-8 flex gap-3 flex-wrap">
              <button className="bg-[#7C9A6B] text-white rounded-full px-8 py-4 font-sans font-bold hover:bg-[#6B8A5A] shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer">
                {"Jetzt Bestellen →"}
              </button>
              <button className="border-2 border-[#2C1810]/20 text-[#2C1810] rounded-full px-8 py-4 font-sans hover:border-[#7C9A6B] hover:text-[#7C9A6B] transition-all cursor-pointer">
                Unsere Sorten entdecken
              </button>
            </div>
            <div className="mt-6 flex items-center gap-3 flex-wrap">
              {["⭐ 4.9 / 5", "10.000+ Kunden", "🏆 Berlins beste Cookies"].map(pill => (
                <span key={pill} className="bg-white rounded-full px-4 py-2 shadow-sm text-sm font-semibold text-[#2C1810]">{pill}</span>
              ))}
            </div>
          </motion.div>

          {/* Right — Cookie visual */}
          <motion.div style={{ y: heroImageY }} className="relative flex justify-center">
            <div className="overflow-visible relative">
              <motion.div
                className="w-full max-w-md aspect-square rounded-3xl overflow-hidden relative"
                style={{ background: "radial-gradient(circle at 40% 35%, #D4956A, #B5722A 45%, #8B5530 75%, #3D1F0A)", boxShadow: "0 25px 60px rgba(44,24,16,0.3)" }}
                animate={{ rotate: [0, 2, 0, -2, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center justify-center h-full text-[100px]">🍪</div>
                <div className="absolute bottom-0 left-0 right-0 h-1/3" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)" }} />
                <span className="absolute bottom-5 left-5 font-serif italic text-white text-[18px]">Dein neues Lieblingsstück.</span>
              </motion.div>

              {/* Floating badges */}
              <motion.div
                className="absolute top-4 -right-6 bg-white rounded-2xl px-3 py-2 shadow-lg text-sm font-semibold text-[#2C1810] z-10"
                animate={{ y: [0, -14, 0], rotate: [-2, 2, -2] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              >
                {"🌿 Handgemacht"}
              </motion.div>
              <motion.div
                className="absolute bottom-16 -right-10 bg-[#7C9A6B] rounded-2xl px-3 py-2 shadow-lg text-sm font-semibold text-white z-10"
                animate={{ y: [0, 12, 0], rotate: [1, -2, 1] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
              >
                {"🍫 Gooey Guaranteed"}
              </motion.div>
              <motion.div
                className="absolute top-1/3 -left-10 bg-[#FAF6F0] border border-stone-200 rounded-2xl px-3 py-2 shadow-lg text-sm font-semibold text-[#2C1810] z-10"
                animate={{ y: [0, -10, 0], rotate: [2, -1, 2] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              >
                {"✨ Täglich Frisch"}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ══════ TRUST MARQUEE ══════ */}
      <div className="bg-[#F0E8DF] py-4 overflow-hidden">
        <div className="whitespace-nowrap flex items-center" style={{ animation: "marquee 35s linear infinite" }}>
          {[0, 1].map(ri => (
            <div key={ri} className="flex items-center gap-6 mr-6">
              {[
                [<Wheat key="w" size={16} className="text-[#7C9A6B]" />, "Bio-Mehl"],
                [<Droplets key="d" size={16} className="text-[#7C9A6B]" />, "Grasgefütterte Butter"],
                [<Leaf key="l" size={16} className="text-[#7C9A6B]" />, "Kein Palmöl"],
                [<Hand key="h" size={16} className="text-[#7C9A6B]" />, "Handgemacht"],
                [<Ban key="b" size={16} className="text-[#7C9A6B]" />, "Keine Kunstaromen"],
                [<Package key="p" size={16} className="text-[#7C9A6B]" />, "Täglich Frisch"],
              ].map(([icon, text], i) => (
                <span key={`${ri}-${i}`} className="flex items-center gap-2 font-sans text-sm font-medium text-[#2C1810]/70">
                  {icon} {text} <span className="text-[#7C9A6B] ml-2">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ══════ PRODUCT GRID ══════ */}
      <motion.section {...sectionAnim} id="shop" className="relative bg-[#FAF6F0] py-24 px-6 md:px-16">
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-0">
          <span className="font-serif font-bold italic text-[200px] whitespace-nowrap" style={{ color: "rgba(124,154,107,0.055)" }}>COOKIES</span>
        </div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <SectionBadge label="Unsere Sorten" />
          <h2 className="font-serif font-bold text-[32px] md:text-[48px] text-[#2C1810]">Die Favoriten</h2>
          <p className="font-sans text-[18px] text-[#9C8B80] mt-2">Unsere meistgeliebten Sorten — immer frisch, immer gooey.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
            {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </motion.section>

      {/* ══════ VIBE STRIP ══════ */}
      <motion.section {...sectionAnim} className="bg-[#1A0F07] py-20 px-6 md:px-16 relative grain-texture">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
            <span className="font-serif text-[80px] text-[#7C9A6B] leading-none select-none block">{"„"}</span>
            <p className="font-serif italic text-white text-[32px] md:text-5xl leading-tight mt-[-20px]">Nicht einfach ein Cookie. Ein Erlebnis.</p>
            <p className="font-sans text-[15px] text-[#9C8B80] mt-4">Handgebacken in Berlin-Mitte, seit dem ersten Tag.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }} viewport={{ once: true }}>
            {[["100%", "Natürliche Zutaten"], ["Täglich", "Frisch Gebacken"], ["0", "Kompromisse"]].map(([num, label], i) => (
              <div key={i} className={`flex items-end gap-3 pb-6 mb-6 ${i < 2 ? "border-b border-white/10" : ""}`}>
                <span className="font-serif font-bold text-[#7C9A6B] text-6xl leading-none">{num}</span>
                <span className="font-sans text-white/60 text-sm uppercase tracking-widest leading-tight">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ══════ MONTHLY DROP ══════ */}
      <motion.section {...sectionAnim} id="monthly-drop" className="bg-[#1A0F07] py-24 px-6 md:px-16 relative grain-texture">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto relative z-10">
          {/* Left card */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
            <div className="bg-gradient-to-br from-[#3D1F0A] to-[#1A0F07] rounded-3xl p-8 border border-white/10">
              <SectionBadge label="Monthly Drop" dark />
              <div className="text-[100px] text-center my-4">🍪</div>
              <h3 className="font-serif italic text-white text-[28px] mt-4">Black Forest Cake Cookie</h3>
              <p className="font-sans text-[15px] text-white/60 mt-1">Schwarzwälder Kirschtorte trifft NYC Cookie.</p>
              <span className="inline-flex border border-[#7C9A6B]/40 text-[#7C9A6B] rounded-full px-3 py-1 text-xs mt-4">Limitiert verfügbar</span>
            </div>
          </motion.div>

          {/* Right content */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15 }} viewport={{ once: true }}>
            <SectionBadge label="Nur diesen Monat" dark />
            <h2 className="font-serif font-bold text-white text-[36px] md:text-[52px]">Cookie des Monats.</h2>
            <p className="font-sans text-white/60 text-[18px] mt-3">Jeden Monat eine neue Kreation. Saisonal. Limitiert. Unwiderstehlich.</p>

            {/* Countdown */}
            {mounted && (
              <div className="flex gap-3 mt-6">
                {([["days", "Tage"], ["hours", "Std"], ["minutes", "Min"], ["seconds", "Sek"]] as const).map(([key, label]) => (
                  <div key={key} className="bg-white/10 rounded-2xl px-5 py-4 text-center min-w-[72px]">
                    <AnimatePresence mode="popLayout">
                      <motion.div
                        key={timeLeft[key]}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="font-serif font-bold text-[#7C9A6B] text-5xl" style={{ fontVariantNumeric: "tabular-nums" }}>{String(timeLeft[key]).padStart(2, "0")}</span>
                      </motion.div>
                    </AnimatePresence>
                    <span className="font-sans text-white/50 text-xs uppercase tracking-widest mt-1 block">{label}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Email */}
            <div className="flex gap-2 mt-8">
              <input type="email" placeholder="deine@email.de" className="font-sans rounded-full px-5 py-3 bg-white/10 border border-white/20 text-white placeholder-white/40 flex-1 focus:outline-none focus:border-[#7C9A6B] transition-colors" />
              <button className="bg-[#7C9A6B] text-white rounded-full px-6 py-3 font-bold text-sm font-sans hover:bg-[#6B8A5A] cursor-pointer transition-colors">Erinnere mich</button>
            </div>
            <p className="font-sans text-xs text-white/40 mt-2">Kein Spam. Nur ein Cookie-Drop pro Monat.</p>
          </motion.div>
        </div>
      </motion.section>

      {/* ══════ COMPARISON ══════ */}
      <motion.section {...sectionAnim} className="bg-[#FAF6F0] py-24 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <SectionBadge label="Der Unterschied" />
          <h2 className="font-serif font-bold text-[32px] md:text-[48px] text-[#2C1810]">Warum OOH!?</h2>
          <p className="font-sans text-[18px] text-[#9C8B80] mt-2">Nicht alle Cookies sind gleich. Der Unterschied steckt in den Zutaten.</p>
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {/* Others */}
            <motion.div className="bg-[#FDF5F5] border-2 border-red-200 rounded-3xl p-8" initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <div className="flex items-center gap-2 mb-6">
                <span className="text-xl">⚠️</span>
                <h3 className="font-sans font-bold text-[20px] text-stone-400">Andere Cookies</h3>
              </div>
              {othersItems.map((item, i) => (
                <motion.div key={item} className="flex items-center gap-3 bg-red-50 rounded-xl px-4 py-3 mb-2" initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} viewport={{ once: true }}>
                  <X size={16} className="text-red-400 shrink-0" />
                  <span className="font-sans text-sm text-stone-400 line-through">{item}</span>
                </motion.div>
              ))}
            </motion.div>
            {/* OOH! */}
            <motion.div
              className="bg-gradient-to-br from-[#F0F7EC] to-[#E8F5E1] border-2 border-[#7C9A6B] rounded-3xl p-8"
              style={{ boxShadow: "0 8px 40px rgba(124,154,107,0.2)" }}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <SectionBadge label="Das sind wir" />
                <h3 className="font-serif font-bold text-[22px] text-[#2C1810]">OOH! Cookies</h3>
              </div>
              {oohItems.map((item, i) => (
                <motion.div key={item} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 mb-2 shadow-sm" initial={{ opacity: 0, x: 15 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} viewport={{ once: true }}>
                  <Check size={16} className="text-[#7C9A6B] shrink-0" />
                  <span className="font-sans text-sm font-medium text-[#2C1810]">{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ══════ DELIVERY ══════ */}
      <motion.section {...sectionAnim} className="bg-[#2C1810] py-24 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <SectionBadge label="Lieferung" dark />
          <h2 className="font-serif font-bold text-white text-[32px] md:text-[48px]">So kommt dein Cookie zu dir.</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <motion.div className="bg-[#1A0F07] border border-white/10 rounded-3xl p-8" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <Zap size={32} className="text-[#7C9A6B] mb-4" />
              <h3 className="font-serif text-white text-[28px]">Sofort-Lieferung in Berlin</h3>
              <p className="font-sans text-white/60 text-[16px] mt-2 mb-6">Warm. Gooey. In unter 30 Minuten. Bestell jetzt über Wolt oder Uber Eats.</p>
              <button className="bg-[#7C9A6B] text-white rounded-full px-6 py-3 font-bold text-sm font-sans hover:bg-[#6B8A5A] cursor-pointer transition-colors">Jetzt via Wolt bestellen</button>
              <p className="font-sans text-[13px] text-white/40 mt-4">Same-Day · Direkt an deine Tür · Berlin</p>
            </motion.div>
            <motion.div className="bg-[#FAF6F0] rounded-3xl p-8" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} viewport={{ once: true }}>
              <Package size={32} className="text-[#7C9A6B] mb-4" />
              <h3 className="font-serif text-[#2C1810] text-[28px]">Deutschlandweiter Versand</h3>
              <p className="font-sans text-[#9C8B80] text-[16px] mt-2 mb-6">Frisch gebacken. Zu dir geliefert — egal wo du bist. Versandkostenfrei ab 50€. Lieferzeit 1–2 Werktage.</p>
              <button className="bg-[#7C9A6B] text-white rounded-full px-6 py-3 font-bold text-sm font-sans hover:bg-[#6B8A5A] cursor-pointer transition-colors">Online bestellen</button>
              <p className="font-sans text-[13px] text-[#9C8B80] mt-4">Mo–Mi Versandtage · 7 Tage haltbar · Sendungsverfolgung</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ══════ LOCATIONS ══════ */}
      <motion.section {...sectionAnim} id="standorte" className="bg-[#FAF6F0] py-24 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <SectionBadge label="Standorte" />
          <h2 className="font-serif font-bold text-[32px] md:text-[48px] text-[#2C1810]">Komm vorbei.</h2>
          <p className="font-sans text-[18px] text-[#9C8B80] mt-2">Zwei Stores in Berlin — frisch gebacken, jeden Tag.</p>
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            {[
              { name: "Store Mitte", address: "Dorotheenstraße 43, 10117 Berlin" },
              { name: "Store Europa City", address: "Otto-Weidt-Platz 7, 10557 Berlin" },
            ].map(store => (
              <div key={store.name} className="bg-white rounded-3xl p-7 shadow-md">
                <MapPin size={24} className="text-[#7C9A6B] mb-3" />
                <h3 className="font-serif font-bold text-[22px] text-[#2C1810]">{store.name}</h3>
                <p className="font-sans text-[15px] text-[#9C8B80] mt-1">{store.address}</p>
                <div className="border-t border-stone-100 mt-4 mb-4" />
                <div className="grid grid-cols-2 gap-y-1 font-sans text-sm">
                  <span className="text-[#9C8B80]">Mo–Fr</span><span className="text-[#2C1810] font-medium">10:00–19:00</span>
                  <span className="text-[#9C8B80]">Samstag</span><span className="text-[#2C1810] font-medium">11:00–19:00</span>
                  <span className="text-[#9C8B80]">Sonntag</span><span className="text-[#2C1810] font-medium">11:00–18:00</span>
                </div>
              </div>
            ))}
          </div>
          <iframe
            className="w-full h-72 rounded-3xl overflow-hidden shadow-md border-0 mt-8"
            src="https://www.openstreetmap.org/export/embed.html?bbox=13.35,52.50,13.42,52.54&layer=mapnik"
            loading="lazy"
            title="OOH! Cookies Standorte"
          />
        </div>
      </motion.section>

      {/* ══════ ABOUT ══════ */}
      <motion.section {...sectionAnim} id="about" className="bg-[#1A0F07] py-24 px-6 md:px-16 relative overflow-hidden grain-texture">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span className="font-serif font-bold italic text-[220px] whitespace-nowrap" style={{ color: "rgba(255,255,255,0.025)" }}>BERLIN</span>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <SectionBadge label="Über uns" dark />
          <h2 className="font-serif italic text-white text-[36px] md:text-[52px] mt-4 text-balance">
            {"„Wir backen Cookies, die Berlin süchtig machen.""}
          </h2>
          <p className="font-sans text-white/60 text-[18px] mt-6 max-w-xl mx-auto leading-relaxed">
            OOH! Cookies ist eine der ersten Adressen in Deutschland für echte NYC-Style Cookies — handgebacken in Berlin-Mitte. Täglich frisch. Mit Liebe und ohne Kompromisse bei den Zutaten.
          </p>
          <div ref={statsRef} className="mt-14 grid grid-cols-3 gap-6 text-center">
            <div>
              <span className="font-serif font-bold text-[#7C9A6B] text-6xl">{customerCount > 0 ? `${customerCount.toLocaleString("de-DE")}+` : "0"}</span>
              <span className="font-sans text-white/50 text-sm uppercase tracking-widest mt-2 block">Zufriedene Kunden</span>
            </div>
            <div>
              <span className="font-serif font-bold text-[#7C9A6B] text-6xl">2</span>
              <span className="font-sans text-white/50 text-sm uppercase tracking-widest mt-2 block">Stores in Berlin</span>
            </div>
            <div>
              <span className="font-serif font-bold text-[#7C9A6B] text-6xl">Täglich</span>
              <span className="font-sans text-white/50 text-sm uppercase tracking-widest mt-2 block">Frisch gebacken</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ══════ FAQ ══════ */}
      <motion.section {...sectionAnim} className="bg-[#FAF6F0] py-24 px-6 md:px-16">
        <div className="max-w-3xl mx-auto">
          <SectionBadge label="FAQ" />
          <h2 className="font-serif font-bold text-[32px] md:text-[48px] text-[#2C1810]">Kurz erklärt.</h2>
          <Accordion type="single" collapsible className="mt-8 space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-white rounded-2xl px-6 overflow-hidden border-none shadow-sm">
                <AccordionTrigger className="font-sans font-semibold text-[16px] text-[#2C1810] py-5 hover:text-[#7C9A6B] hover:no-underline">{faq.q}</AccordionTrigger>
                <AccordionContent className="font-sans text-[15px] text-[#9C8B80] pb-5 leading-relaxed">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </motion.section>

      {/* ══════ FOOTER ══════ */}
      <footer className="bg-[#1A0F07] pt-16 pb-8 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 mb-12">
          <div>
            <span className="font-serif font-bold text-white text-[28px]">OOH! Cookies</span>
            <p className="font-sans text-white/50 text-sm mt-2">NYC-Style Cookies, handgemacht in Berlin.</p>
            <div className="mt-6 flex gap-4">
              {[<Instagram key="ig" size={18} className="text-white" />, <Music key="tt" size={18} className="text-white" />].map((icon, i) => (
                <button key={i} className="bg-white/10 hover:bg-[#7C9A6B] w-10 h-10 flex items-center justify-center rounded-full transition-colors cursor-pointer">{icon}</button>
              ))}
            </div>
          </div>
          <div>
            <span className="font-sans text-white/40 text-xs uppercase tracking-widest mb-4 block">Navigation</span>
            <div className="space-y-2.5">
              {["Shop", "Standorte", "Über uns", "Kontakt"].map(link => (
                <a key={link} href="#" className="font-sans text-white/70 hover:text-white text-sm block transition-colors">{link}</a>
              ))}
            </div>
          </div>
          <div>
            <span className="font-sans text-white/40 text-xs uppercase tracking-widest mb-4 block">Rechtliches</span>
            <div className="space-y-2.5">
              {["Impressum", "Datenschutz", "AGB", "Versand", "Widerrufsrecht"].map(link => (
                <a key={link} href="#" className="font-sans text-white/70 hover:text-white text-sm block transition-colors">{link}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-8 flex justify-between items-center flex-wrap gap-4 max-w-6xl mx-auto">
          <span className="font-sans text-white/40 text-sm">© 2026 OOH! Cookies · Berlin</span>
          <span className="font-sans text-white/30 text-xs italic">{"Mit 🍪 gemacht in Berlin"}</span>
        </div>
      </footer>

      {/* ══════ CART SHEET ══════ */}
      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md bg-[#FAF6F0]">
          <SheetHeader>
            <SheetTitle className="font-serif font-bold text-2xl">{"Deine Box 🍪"}</SheetTitle>
            <SheetDescription className="sr-only">Warenkorb</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col items-center justify-center mt-20">
            <span className="text-[72px]">🍪</span>
            <p className="font-serif text-[22px] text-[#2C1810] mt-4">Deine Box ist noch leer.</p>
            <p className="font-sans text-[15px] text-[#9C8B80] mt-2">Füge deine Lieblingscookies hinzu.</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-stone-100">
            <div className="flex justify-between mb-3">
              <span className="font-sans text-[15px] text-[#9C8B80]">Gesamt</span>
              <span className="font-sans font-bold text-[20px] text-[#2C1810]">{"0,00 €"}</span>
            </div>
            <button className="bg-stone-200 text-stone-400 rounded-full py-4 font-bold w-full cursor-not-allowed">Zur Kasse</button>
            <p className="font-sans text-xs text-center text-[#9C8B80] mt-2">{"Mindestbestellwert: 20€"}</p>
          </div>
        </SheetContent>
      </Sheet>

      {/* ══════ MOBILE BOTTOM BAR ══════ */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden p-4 bg-white/90 backdrop-blur-md border-t border-stone-100 shadow-2xl">
        <button
          onClick={() => setCartOpen(true)}
          className="bg-[#7C9A6B] text-white rounded-full py-4 font-bold text-base w-full flex items-center justify-center gap-2 cursor-pointer"
        >
          <ShoppingBag size={20} />
          Warenkorb ansehen
        </button>
      </div>
    </main>
  )
}
