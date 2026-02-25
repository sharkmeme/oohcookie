"use client"

import { useEffect, useRef, useState } from "react"

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    // Only enable on devices with fine pointers (no touch)
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)")
    if (!mq.matches) return
    setEnabled(true)

    // Hide default cursor
    document.documentElement.style.cursor = "none"

    const onMouseMove = (e: MouseEvent) => {
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`
        dotRef.current.style.top = `${e.clientY}px`
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${e.clientX}px`
        ringRef.current.style.top = `${e.clientY}px`
      }
    }

    const onMouseDown = () => setClicking(true)
    const onMouseUp = () => setClicking(false)

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest("a, button, [role=button], input, textarea, [data-cursor-hover]")) {
        setHovering(true)
      }
    }
    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest("a, button, [role=button], input, textarea, [data-cursor-hover]")) {
        setHovering(false)
      }
    }

    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mousedown", onMouseDown)
    window.addEventListener("mouseup", onMouseUp)
    document.addEventListener("mouseover", onMouseOver)
    document.addEventListener("mouseout", onMouseOut)

    return () => {
      document.documentElement.style.cursor = ""
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mousedown", onMouseDown)
      window.removeEventListener("mouseup", onMouseUp)
      document.removeEventListener("mouseover", onMouseOver)
      document.removeEventListener("mouseout", onMouseOut)
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: "#7C9A6B",
          transition: "transform 0.1s ease-out",
          transform: `translate(-50%, -50%) scale(${clicking ? 0.5 : 1})`,
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: hovering ? "2px solid #7C9A6B" : "2px solid rgba(124,154,107,0.5)",
          transition: "transform 0.15s ease-out, border 0.2s",
          transform: `translate(-50%, -50%) scale(${hovering ? 1.8 : 1})`,
        }}
      />
    </>
  )
}
