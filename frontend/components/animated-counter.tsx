"use client"

import { useState, useEffect, useRef } from "react"

interface AnimatedCounterProps {
  value: number
  suffix?: string
}

export default function AnimatedCounter({ value, suffix = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const countRef = useRef(0)
  const frameRef = useRef(0)

  useEffect(() => {
    const duration = 2000 // 2 seconds
    const startTime = Date.now()

    const animate = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)
      const currentCount = Math.floor(progress * value)

      if (countRef.current !== currentCount) {
        countRef.current = currentCount
        setCount(currentCount)
      }

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      } else {
        setCount(value)
      }
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(frameRef.current)
  }, [value])

  // Format the number with commas
  const formattedCount = count.toLocaleString()

  return (
    <div className="text-3xl font-bold text-white md:text-4xl">
      {formattedCount}
      {suffix}
    </div>
  )
}
