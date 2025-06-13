"use client"

import { ChevronRight } from "lucide-react"

interface ZapCellProps {
  name: string
  index: number
}

export function ZapCell({ name, index }: ZapCellProps) {
  return (
    <div className="relative group">
      <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg shadow-sm border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all w-64">
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
          {index}
        </div>
        <span className="font-medium text-slate-700">{name}</span>
        <ChevronRight className="ml-auto h-4 w-4 text-slate-400" />
      </div>

      {/* Selection indicator that appears on hover */}
      <div className="absolute inset-0 rounded-lg border-2 border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
    </div>
  )
}