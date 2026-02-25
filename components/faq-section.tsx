"use client"

import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Was macht OOH! Cookies besonders?",
    answer:
      "Wir geh\u00F6ren zu den ersten Cookie-Shops in Deutschland, die NYC-Style Cookies etabliert haben. Alles wird t\u00E4glich frisch in unserer eigenen B\u00E4ckerei in Berlin-Mitte gebacken.",
  },
  {
    question: "Gibt es neue Sorten?",
    answer:
      "Jeden Monat gibt es einen neuen Monthly Special \u2014 saisonal inspiriert und streng limitiert. Zwischendrin \u00FCberraschen wir euch auch zu besonderen Anl\u00E4ssen.",
  },
  {
    question: "Gibt es vegane Cookies?",
    answer:
      "Ja! Unsere veganen Sorten sind im Shop entsprechend gekennzeichnet.",
  },
  {
    question: "Wie l\u00E4uft die Online-Bestellung ab?",
    answer:
      "Einfach Cookies aussuchen, in die Box legen und bestellen. Versandtage sind Montag bis Mittwoch \u2014 deine Cookies werden am selben Tag frisch gebacken und verschickt.",
  },
  {
    question: "Wie lange sind die Cookies haltbar?",
    answer:
      "Nach dem Versand bleiben deine Cookies 7 Tage frisch. Luftdicht verpackt bei Raumtemperatur behalten sie ihre weiche, chewy Konsistenz.",
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
        <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#7C9A6B] mb-4 block">
          FAQ
        </span>
        <h2 className="font-serif text-[40px] md:text-[56px] lg:text-[64px] font-bold text-[#2C1810]">
          {"Kurz erkl\u00E4rt."}
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
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b border-[#E8DFD4]">
              <AccordionTrigger className="font-sans text-[15px] font-semibold text-[#2C1810] hover:no-underline py-6 text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="font-sans text-[14px] text-[#9C8B80] leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </motion.section>
  )
}
