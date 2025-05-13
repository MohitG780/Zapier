"use client"

import { useState } from "react"
import type React from "react"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface WorkflowStepProps {
  icon: React.ReactNode
  title: string
  description: string
  isCompleted?: boolean
  isFirst?: boolean
  isLast?: boolean
}

export default function WorkflowStep({
  icon,
  title,
  description,
  isCompleted = false,
  isFirst = false,
  isLast = false,
}: WorkflowStepProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-xl border border-orange-500/20 bg-black/40 p-6 backdrop-blur-sm transition-all hover:bg-black/60",
          isFirst && "border-t-orange-500",
          isLast && "border-b-orange-500",
          isExpanded && "ring-2 ring-orange-500/50",
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-800 text-slate-300">
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <p className="text-slate-400">{description}</p>
          </div>
          {isCompleted ? (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20 text-green-500">
              <Check className="h-6 w-6" />
            </div>
          ) : (
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 text-slate-400 hover:bg-slate-800"
              onClick={(e) => {
                e.stopPropagation()
                setIsExpanded(!isExpanded)
              }}
            >
              {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
          )}
        </div>

        {isExpanded && (
          <div className="mt-6 animate-fadeIn border-t border-slate-800 pt-4">
            <div className="rounded-lg bg-slate-900 p-4">
              <h4 className="mb-2 font-medium text-white">Step Configuration</h4>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm text-slate-400">Input Data</label>
                  <div className="rounded border border-slate-700 bg-slate-800 p-2 text-sm text-slate-300">
                    {`{ "data": "from previous step" }`}
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm text-slate-400">Output Format</label>
                  <div className="rounded border border-slate-700 bg-slate-800 p-2 text-sm text-slate-300">
                    {`{ "status": "success", "message": "Operation completed" }`}
                  </div>
                </div>
                <div className="flex justify-end">
                  <button className="rounded bg-orange-500 px-3 py-1 text-sm font-medium text-white hover:bg-orange-600">
                    Configure
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {!isLast && (
        <div className="my-2 flex h-10 w-10 items-center justify-center text-orange-500">
          <ChevronDown className="h-8 w-8" />
        </div>
      )}
    </div>
  )
}
