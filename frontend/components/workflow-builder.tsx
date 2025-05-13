"use client"

import type React from "react"

import { useState } from "react"
import { Check, ChevronRight, Mail, UserCircle } from "lucide-react"
import { cn } from "@/lib/utils"

type Step = {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  completed: boolean
  active: boolean
}

export default function WorkflowBuilder() {
  const [steps, setSteps] = useState<Step[]>([
    {
      id: 1,
      title: "Find Contact",
      description: "Step 2",
      icon: <UserCircle className="h-8 w-8" />,
      completed: true,
      active: false,
    },
    {
      id: 2,
      title: "Update Status",
      description: "Step 3",
      icon: <Check className="h-8 w-8" />,
      completed: true,
      active: false,
    },
    {
      id: 3,
      title: "Send Email",
      description: "Step 4",
      icon: <Mail className="h-8 w-8" />,
      completed: false,
      active: true,
    },
  ])

  const handleStepClick = (id: number) => {
    setSteps(
      steps.map((step) => ({
        ...step,
        active: step.id === id,
      })),
    )
  }

  return (
    <div className="space-y-6">
      {steps.map((step, index) => (
        <div key={step.id} className="flex flex-col items-center">
          <div
            className={cn(
              "relative w-full cursor-pointer overflow-hidden rounded-xl border border-orange-500/20 bg-black/40 p-6 backdrop-blur-sm transition-all hover:bg-black/60",
              step.active && "ring-2 ring-orange-500 ring-offset-2 ring-offset-slate-950",
            )}
            onClick={() => handleStepClick(step.id)}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-800 text-slate-300">
                {step.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                <p className="text-slate-400">{step.description}</p>
              </div>
              {step.completed && (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20 text-green-500">
                  <Check className="h-6 w-6" />
                </div>
              )}
            </div>
          </div>

          {index < steps.length - 1 && (
            <div className="my-2 flex h-10 w-10 items-center justify-center text-orange-500">
              <ChevronRight className="h-8 w-8" />
            </div>
          )}
        </div>
      ))}

      <div className="mt-8 flex justify-center">
        <button className="rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 px-6 py-3 font-medium text-white shadow-lg transition-all hover:opacity-90">
          Run Workflow
        </button>
      </div>
    </div>
  )
}
