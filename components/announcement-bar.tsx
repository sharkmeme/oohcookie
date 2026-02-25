"use client"

export function AnnouncementBar() {
  const text =
    "100% Natürliche Zutaten  \u00B7  Mindestbestellwert 20\u20AC  \u00B7  Kostenloser Versand ab 50\u20AC  \u00B7  Deutschlandweite Lieferung  \u00B7  Täglich Frisch Gebacken  \u00B7  "

  return (
    <div className="bg-[#2C1810] text-[#FAF6F0]/90 py-2.5 overflow-hidden relative select-none">
      <div className="animate-marquee flex whitespace-nowrap">
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className="mx-4 font-sans text-[11px] font-medium uppercase tracking-[0.15em]"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}
