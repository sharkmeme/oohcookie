"use client"

import { useState } from "react"
import { ShoppingBag, Menu, X, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet"

export function Header() {
  const [cartOpen, setCartOpen] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 border-b border-[#E8DFD4]/60">
        <div className="flex items-center justify-between px-6 md:px-12 lg:px-20 py-4">
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 -ml-2 rounded-full hover:bg-[#F0E8DF] transition-colors"
            onClick={() => setMobileNavOpen(true)}
            aria-label="Menu oeffnen"
          >
            <Menu className="w-5 h-5 text-[#2C1810]" />
          </button>

          {/* Logo */}
          <a href="#" className="font-serif text-2xl md:text-[26px] font-bold text-[#2C1810] tracking-tight">
            OOH! Cookies
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10" aria-label="Hauptnavigation">
            {[
              { label: "Shop", href: "#shop" },
              { label: "Standorte", href: "#standorte" },
              { label: "Ueber uns", href: "#ueber-uns" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-sans text-[13px] font-semibold uppercase tracking-[0.08em] text-[#2C1810] hover:text-[#7C9A6B] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Cart button */}
          <button
            onClick={() => setCartOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#7C9A6B] hover:bg-[#6B8A5A] text-white transition-colors"
            aria-label="Warenkorb oeffnen"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="font-sans text-[13px] font-semibold">0</span>
          </button>
        </div>
      </header>

      {/* Mobile Full Screen Nav */}
      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-[#1A0F07] grain-texture flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => setMobileNavOpen(false)}
              className="absolute top-5 right-5 p-3 text-[#FAF6F0]/70 hover:text-[#FAF6F0] transition-colors"
              aria-label="Menu schliessen"
            >
              <X className="w-7 h-7" />
            </button>
            <nav className="flex flex-col items-center gap-10" aria-label="Mobile Navigation">
              {[
                { label: "Shop", href: "#shop" },
                { label: "Standorte", href: "#standorte" },
                { label: "Ueber uns", href: "#ueber-uns" },
              ].map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileNavOpen(false)}
                  className="font-serif text-4xl md:text-5xl font-bold text-[#FAF6F0] hover:text-[#7C9A6B] transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <motion.div
              className="absolute bottom-12 flex items-center gap-2 text-[#9C8B80]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="font-sans text-xs uppercase tracking-[0.15em]">Handgemacht in Berlin</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Sheet */}
      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent side="right" className="bg-[#FAF6F0] border-l border-[#E8DFD4]/60 flex flex-col">
          <SheetHeader className="border-b border-[#E8DFD4] pb-5">
            <SheetTitle className="font-serif text-2xl text-[#2C1810]">Deine Box</SheetTitle>
            <SheetDescription className="font-sans text-[13px] text-[#9C8B80]">
              {"Fuege Cookies hinzu, um deine Box zu fuellen."}
            </SheetDescription>
          </SheetHeader>
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
            <div className="w-24 h-24 rounded-full bg-[#F0E8DF] flex items-center justify-center mb-6">
              <span className="text-5xl">{"🍪"}</span>
            </div>
            <p className="font-serif text-xl font-bold text-[#2C1810]">
              Deine Box ist noch leer.
            </p>
            <p className="font-sans text-sm text-[#9C8B80] mt-2 max-w-[200px]">
              {"Entdecke unsere Sorten und fuege deine Favoriten hinzu."}
            </p>
            <a href="#shop" onClick={() => setCartOpen(false)} className="mt-6 inline-flex items-center gap-2 text-[#7C9A6B] font-sans text-sm font-semibold hover:gap-3 transition-all">
              Jetzt stöbern <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <SheetFooter className="border-t border-[#E8DFD4] pt-5">
            <div className="w-full flex flex-col gap-3">
              <div className="flex justify-between font-sans text-sm text-[#2C1810]">
                <span className="font-medium">Zwischensumme</span>
                <span className="font-bold">{"0,00 \u20AC"}</span>
              </div>
              <button
                disabled
                className="w-full py-4 rounded-full bg-[#9C8B80]/20 text-[#9C8B80] font-sans text-[14px] font-semibold uppercase tracking-[0.08em] cursor-not-allowed"
              >
                Zur Kasse
              </button>
              <p className="text-[11px] text-center text-[#9C8B80] font-sans">
                {"Mindestbestellwert: 20\u20AC"}
              </p>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  )
}
