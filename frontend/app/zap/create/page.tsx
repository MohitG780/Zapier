"use client"

import { PrimaryButton } from "@/components/Buttons/PrimaryButton"
import { ZapCell } from "@/components/ZapCell"
import { useState } from "react"

export default function CreateZap() {
  const [selectedTrigger, setSelectedTrigger] = useState("")
  const [selectedActions, setSelectedActions] = useState<{ availableActionId: string; availableActionName: string }[]>(
    [],
  )

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col items-center py-12 px-4">
      <div className="max-w-2xl w-full">
        <h1 className="text-2xl font-bold text-slate-800 mb-8 text-center">Create Automation</h1>

        <div className="relative flex flex-col items-center">
          {/* Trigger Cell */}
          <div className="mb-8 z-10">
            <ZapCell name={selectedTrigger || "Select a Trigger"} index={1} />
          </div>

          {/* Connecting lines */}
          {selectedActions.length > 0 && (
            <div className="absolute top-[4.5rem] bottom-16 w-0.5 bg-slate-200 -z-10"></div>
          )}

          {/* Action Cells */}
          <div className="w-full space-y-8 mb-8">
            {selectedActions.map((action, index) => (
              <div key={index} className="flex justify-center z-10">
                <ZapCell name={action?.availableActionName || "Select an Action"} index={index + 2} />
              </div>
            ))}
          </div>

          {/* Add Action Button */}
          <div className="z-10">
            <PrimaryButton
              onClick={() => {
                setSelectedActions((a) => [
                  ...a,
                  {
                    availableActionId: "",
                    availableActionName: "",
                  },
                ])
              }}
            >
              <div className="text-2xl">+</div>
            </PrimaryButton>
          </div>
        </div>

       
      </div>
    </div>
  )
}