"use client"

import type { ButtonHTMLAttributes, ReactNode } from "react"

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export function PrimaryButton({ children, ...props }: PrimaryButtonProps) {
  return (
    <button
      className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      {...props}
    >
      {children}
    </button>
  )
}
