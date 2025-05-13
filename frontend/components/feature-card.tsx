"use client"

import { useState } from "react"
import type React from "react"
import { cn } from "@/lib/utils"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={cn(
        "group rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-300",
        isHovered && "border-orange-500/50 bg-slate-900 shadow-lg shadow-orange-500/10",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-slate-800 text-orange-500 transition-all duration-300",
          isHovered && "bg-orange-500 text-white",
        )}
      >
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
      <p className="text-slate-400">{description}</p>
    </div>
  )
}
