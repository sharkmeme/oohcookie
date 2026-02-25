"use client"

import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqItems = [
  {
    question: "Was macht OOH! Cookies besonders?",
    answer:
      "Wir gehören zu den ersten Cookie-Shops in Deutschland, die NYC-Style Cookies etabliert haben. Alles wird täglich frisch in unserer eigenen Bäckerei in Berlin-Mitte gebacken \u2014 mit ausgewählten, natürlichen Zutaten ohne Kompromisse.",
  },
  {
    question: "Gibt es neue Sorten?",
    answer:
      "Jeden Monat gibt es einen neuen Monthly Special \u2014 saisonal inspiriert und streng limitiert. Zwischendrin überraschen wir euch auch zu besonderen Anlässen wie Valentinstag oder besonderen Events.",
  },
  {
    question: "Gibt es vegane Cookies?",
    answer:
      "Ja! Unsere veganen Sorten sind im Shop entsprechend gekennzeichnet. Schau einfach auf die Produktbeschreibung \u2014 dort findest du alle Hinweise zu Zutaten und Allergenen.",
  },
  {
    question: "Wie läuft die Online-Bestellung ab?",
    answer:
      "Einfach Cookies aussuchen, in die Box legen und bestellen. Versandtage sind Montag bis Mittwoch \u2014 deine Cookies werden am selben Tag frisch gebacken und verschickt. Nach dem Versand erhältst du eine Bestätigung mit Sendungsverfolgung.",
  },
  {
    question: "Wie lange sind die Cookies haltbar?",
    answer:
      "Nach dem Versand bleiben deine Cookies 7 Tage frisch. Am besten luftdicht verpackt bei Raumtemperatur aufbewahren \u2014 so behalten sie ihre weiche, chewy Konsistenz am längsten.",
  },
]

export function FaqSection() {
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
          FAQ
        </div>
        <h2 className="font-serif text-[40px] md:text-[56px] lg:text-[64px] font-bold text-[#2C1810]">
          Kurz erklärt.
        </h2>
      </motion.div>

      <motion.div
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      >
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b border-stone-100 py-1">
              <AccordionTrigger className="font-sans text-[17px] font-semibold text-[#2C1810] hover:no-underline py-5 text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="font-sans text-[15px] text-stone-500 leading-relaxed pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </motion.section>
  )
}
