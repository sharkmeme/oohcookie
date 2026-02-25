"use client"

const items = [
  { emoji: "🌾", text: "Bio-Mehl" },
  { emoji: "🧈", text: "Grasgefütterte Butter" },
  { emoji: "🌿", text: "Kein Palmöl" },
  { emoji: "✋", text: "Handgemacht" },
  { emoji: "🚫", text: "Keine Kunststoffe" },
  { emoji: "📦", text: "Täglich Frisch" },
]

export function TrustBar() {
  return (
    <div className="bg-[#F0E8DF] py-5 overflow-hidden border-y border-[#E8DFD4]/50">
      <div className="animate-marquee-trust flex whitespace-nowrap">
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <div key={i} className="inline-flex items-center gap-2.5 mx-5">
            <span className="text-base">{item.emoji}</span>
            <span className="font-sans text-[13px] font-semibold uppercase tracking-[0.08em] text-[#2C1810]">
              {item.text}
            </span>
            <span className="text-[#7C9A6B] text-lg ml-3">{"\u2022"}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
