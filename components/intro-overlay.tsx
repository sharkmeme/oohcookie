"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

const chipPositions = [
  { top: "20%", left: "25%", w: 22, h: 16 },
  { top: "45%", left: "15%", w: 26, h: 18 },
  { top: "65%", left: "30%", w: 20, h: 15 },
  { top: "15%", left: "55%", w: 24, h: 17 },
  { top: "50%", left: "45%", w: 28, h: 20 },
  { top: "75%", left: "55%", w: 18, h: 14 },
  { top: "30%", left: "70%", w: 23, h: 16 },
  { top: "60%", left: "72%", w: 21, h: 15 },
  { top: "40%", left: "80%", w: 19, h: 14 },
]

type IntroPhase = "cookie" | "sequence" | "done"

interface SequenceStep {
  text: string
  className: string
  duration: number
  type: "single" | "brand" | "stagger"
  words?: string[]
}

const sequenceSteps: SequenceStep[] = [
  {
    text: "OOH... du magst Cookies?",
    className: "font-serif italic text-[42px] md:text-[72px] text-[#FAF6F0]",
    duration: 700,
    type: "single",
  },
  {
    text: "Wir auch. \uD83C\uDF6A",
    className: "font-serif font-bold text-[52px] md:text-[88px] text-[#FAF6F0]",
    duration: 700,
    type: "single",
  },
  {
    text: "Deshalb haben wir den perfekten erschaffen.",
    className: "font-sans text-[22px] md:text-[40px] text-[#9C8B80]",
    duration: 700,
    type: "single",
  },
  {
    text: "Wir pr\u00E4sentieren stolz...",
    className: "font-sans italic text-[20px] md:text-[36px] text-[#7C9A6B] shimmer-text",
    duration: 700,
    type: "single",
  },
  {
    text: "OOH! Cookies.",
    className: "font-serif font-bold text-[64px] md:text-[120px] text-[#FAF6F0]",
    duration: 1200,
    type: "brand",
  },
  {
    text: "",
    className: "font-sans text-[15px] md:text-[24px] text-[#9C8B80] uppercase tracking-[0.1em]",
    duration: 700,
    type: "stagger",
    words: ["Handgemacht", "T\u00E4glich frisch", "Unwiderstehlich"],
  },
  {
    text: "Yummy. \uD83D\uDE0B",
    className: "font-serif italic font-bold text-[72px] md:text-[140px] text-[#FAF6F0]",
    duration: 800,
    type: "single",
  },
]

export function IntroOverlay() {
  const [phase, setPhase] = useState<IntroPhase>("cookie")
  const [stepIndex, setStepIndex] = useState(-1)
  const [stepVisible, setStepVisible] = useState(false)
  const [underlineVisible, setUnderlineVisible] = useState(false)
  const [bgFading, setBgFading] = useState(false)

  const skip = useCallback(() => {
    setPhase("done")
  }, [])

  const startSequence = useCallback(() => {
    setPhase("sequence")
  }, [])

  useEffect(() => {
    if (phase !== "sequence") return

    let cancelled = false
    let current = 0

    const playStep = () => {
      if (cancelled || current >= sequenceSteps.length) {
        if (!cancelled) {
          setBgFading(true)
          setTimeout(() => {
            if (!cancelled) setPhase("done")
          }, 600)
        }
        return
      }
      setStepIndex(current)
      setStepVisible(true)
      setUnderlineVisible(false)

      const step = sequenceSteps[current]

      // For brand step, show underline after 200ms
      if (step.type === "brand") {
        setTimeout(() => {
          if (!cancelled) setUnderlineVisible(true)
        }, 200)
      }

      // After hold duration, fade out
      setTimeout(() => {
        if (cancelled) return
        setStepVisible(false)
        // Wait for exit animation
        setTimeout(() => {
          if (cancelled) return
          current++
          playStep()
        }, 300)
      }, step.duration + 350)
    }

    // Small initial delay
    const t = setTimeout(playStep, 200)
    return () => {
      cancelled = true
      clearTimeout(t)
    }
  }, [phase])

  if (phase === "done") return null

  return (
    <AnimatePresence>
      <motion.div
        key="intro"
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
        style={{ background: "#1A0F07" }}
        animate={bgFading ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Cookie screen */}
        {phase === "cookie" && (
          <motion.div
            className="flex flex-col items-center justify-center gap-10"
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 0.4 }}
          >
            {/* Spinning cookie */}
            <motion.div
              className="relative"
              style={{ width: 280, height: 280 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              {/* Layer 1: cookie base */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "radial-gradient(circle at 35% 35%, #D4956A, #B5722A 40%, #8B5530 75%, #6B3F20)",
                  boxShadow: "inset -8px -8px 20px rgba(0,0,0,0.25), inset 4px 4px 12px rgba(255,220,150,0.3), 0 8px 32px rgba(100,50,10,0.5)",
                }}
              />
              {/* Layer 2: texture ring */}
              <div
                className="absolute rounded-full"
                style={{
                  inset: 8,
                  border: "2px dashed rgba(180,120,60,0.3)",
                }}
              />
              {/* Layer 3: golden sheen */}
              <div
                className="absolute rounded-full"
                style={{
                  top: "15%", left: "20%", width: "30%", height: "20%",
                  background: "rgba(255,220,100,0.15)",
                  filter: "blur(8px)",
                }}
              />
              {/* Layer 4: chocolate chips */}
              {chipPositions.map((chip, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    top: chip.top,
                    left: chip.left,
                    width: chip.w,
                    height: chip.h,
                    borderRadius: "40% 60% 55% 45% / 50% 45% 55% 50%",
                    background: "#2C1010",
                    boxShadow: "inset 1px 1px 2px rgba(255,255,255,0.1)",
                  }}
                />
              ))}
              {/* Layer 5: counter-rotating button */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: -360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <button
                  onClick={startSequence}
                  className="px-5 py-2.5 rounded-full font-sans font-bold text-[14px] text-white whitespace-nowrap cursor-pointer transition-transform hover:scale-105"
                  style={{
                    background: "#7C9A6B",
                    boxShadow: "0 4px 16px rgba(124,154,107,0.5)",
                  }}
                >
                  {"Jetzt rein. \uD83C\uDF6A"}
                </button>
              </motion.div>
            </motion.div>

            <motion.p
              className="font-sans text-sm text-[#FAF6F0]"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              {"Handgemacht in Berlin \u00B7 T\u00E4glich frisch"}
            </motion.p>
          </motion.div>
        )}

        {/* Cinematic text sequence */}
        {phase === "sequence" && stepIndex >= 0 && stepIndex < sequenceSteps.length && (
          <div className="flex items-center justify-center w-full px-6">
            <AnimatePresence mode="wait">
              {stepVisible && (
                <motion.div
                  key={stepIndex}
                  className="text-center max-w-5xl"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.2 }}
                  transition={
                    stepIndex === 6
                      ? { type: "spring", stiffness: 200, damping: 12 }
                      : { duration: 0.35, ease: "backOut" }
                  }
                >
                  {sequenceSteps[stepIndex].type === "stagger" ? (
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                      {sequenceSteps[stepIndex].words?.map((word, wi) => (
                        <motion.span
                          key={wi}
                          className={sequenceSteps[stepIndex].className}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: wi * 0.15 }}
                        >
                          {wi > 0 && <span className="mx-2">{"\u00B7"}</span>}
                          {word}
                        </motion.span>
                      ))}
                    </div>
                  ) : (
                    <div className="relative inline-block">
                      <span className={sequenceSteps[stepIndex].className}>
                        {sequenceSteps[stepIndex].text}
                      </span>
                      {/* Underline for brand step */}
                      {sequenceSteps[stepIndex].type === "brand" && (
                        <motion.div
                          className="absolute -bottom-2 left-0 right-0 h-[3px] bg-[#7C9A6B] origin-left"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: underlineVisible ? 1 : 0 }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Skip button */}
        <button
          onClick={skip}
          className="fixed bottom-6 right-6 font-sans text-[13px] text-[#FAF6F0] opacity-40 hover:opacity-80 transition-opacity z-[10000] cursor-pointer"
        >
          {"\u00FCberspringen \u2192"}
        </button>
      </motion.div>
    </AnimatePresence>
  )
}
