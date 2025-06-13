import { ReactNode } from "react"

interface WorkflowStepProps {
  icon: ReactNode
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
  return (
    <div className="relative flex items-start">
      {/* Connector Line */}
      {!isFirst && (
        <div
          className="absolute left-6 top-0 h-6 w-0.5 -translate-x-1/2 bg-gray-200"
          aria-hidden="true"
        ></div>
      )}
      {!isLast && (
        <div
          className="absolute bottom-0 left-6 top-12 w-0.5 -translate-x-1/2 bg-gray-200"
          aria-hidden="true"
        ></div>
      )}

      {/* Icon */}
      <div
        className={`relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${
          isCompleted
            ? "bg-blue-100 text-blue-600"
            : "bg-gray-100 text-gray-500"
        }`}
      >
        {icon}
      </div>

      {/* Content */}
      <div className="ml-4 mt-1">
        <h3 className="text-lg font-medium text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  )
}
