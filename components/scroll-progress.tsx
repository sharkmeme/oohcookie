"use client"

import { motion, useScroll } from "framer-motion"

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 bg-[#7C9A6B] origin-left z-[99999]"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
