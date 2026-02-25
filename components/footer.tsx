"use client"

import { Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#1A0F07] px-6 md:px-12 lg:px-20 pt-20 pb-10 relative grain-texture overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-3xl font-bold text-[#FAF6F0]">OOH! Cookies</h3>
            <p className="font-sans text-[13px] text-[#FAF6F0]/40 mt-3 max-w-[220px] leading-relaxed">
              NYC-Style Cookies, handgemacht in Berlin. Taeglich frisch. Ohne Kompromisse.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#FAF6F0]/30 mb-5">
              Navigation
            </h4>
            <ul className="flex flex-col gap-3">
              {["Shop", "Standorte", "Ueber uns", "Kontakt"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-sans text-[14px] text-[#FAF6F0]/50 hover:text-[#FAF6F0] transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#FAF6F0]/30 mb-5">
              Rechtliches
            </h4>
            <ul className="flex flex-col gap-3">
              {["Impressum", "Datenschutz", "AGB", "Versand", "Widerrufsrecht"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-sans text-[14px] text-[#FAF6F0]/50 hover:text-[#FAF6F0] transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#FAF6F0]/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-[12px] text-[#FAF6F0]/25 tracking-wide">
            {"\u00A9 2026 OOH! Cookies \u00B7 Berlin"}
          </p>
          <div className="flex items-center gap-5">
            <a
              href="#"
              className="text-[#FAF6F0]/30 hover:text-[#FAF6F0] transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-[#FAF6F0]/30 hover:text-[#FAF6F0] transition-colors"
              aria-label="TikTok"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9a6.33 6.33 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.3a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.26 8.26 0 0 0 4.76 1.5V6.82a4.83 4.83 0 0 1-1-.13z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
