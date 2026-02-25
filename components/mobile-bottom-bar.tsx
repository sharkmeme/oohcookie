"use client"

import { useState } from "react"
import { ShoppingBag, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet"

export function MobileBottomBar() {
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <>
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden p-3"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.6 }}
      >
        <button
          onClick={() => setCartOpen(true)}
          className="w-full bg-[#7C9A6B] hover:bg-[#6B8A5A] text-white py-4 px-6 rounded-full font-sans text-[14px] font-semibold uppercase tracking-[0.06em] flex items-center justify-center gap-2.5 shadow-lg transition-colors"
        >
          <ShoppingBag className="w-4 h-4" />
          {"Warenkorb ansehen"}
        </button>
      </motion.div>

      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent side="right" className="bg-[#FAF6F0] border-l border-[#E8DFD4]/60 flex flex-col">
          <SheetHeader className="border-b border-[#E8DFD4] pb-5">
            <SheetTitle className="font-serif text-2xl text-[#2C1810]">Deine Box</SheetTitle>
            <SheetDescription className="font-sans text-[13px] text-[#9C8B80]">
              Füge Cookies hinzu, um deine Box zu füllen.
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
              Entdecke unsere Sorten und füge deine Favoriten hinzu.
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
