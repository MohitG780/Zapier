"use client"

import { useState } from "react"

const faqData = [
  {
    question: "How does HookWorks integrate with my existing tools?",
    answer:
      "HookWorks connects seamlessly with over 100 popular tools and services through our pre-built integrations. For custom tools, our open API allows for easy connectivity with any system.",
  },
  {
    question: "Is there a free plan available?",
    answer:
      "Yes! We offer a generous free tier that includes up to 1,000 workflow executions per month, access to core integrations, and basic workflow templates.",
  },
  {
    question: "How secure is my data with HookWorks?",
    answer:
      "Security is our top priority. We're SOC 2 compliant, implement end-to-end encryption, and never store sensitive data unless explicitly configured to do so.",
  },
  {
    question: "Can I build custom workflows?",
    answer:
      "Our visual workflow builder makes it easy to create custom workflows without coding. For advanced users, our scripting capabilities allow for complex logic and transformations.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="mx-auto max-w-3xl divide-y divide-gray-200">
      {faqData.map((faq, index) => (
        <div key={index} className="py-6">
          <button onClick={() => toggleFAQ(index)} className="flex w-full items-start justify-between text-left">
            <span className="text-lg font-medium text-gray-800">{faq.question}</span>
            <span className="ml-6 flex h-7 items-center">
              {openIndex === index ? (
                <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              ) : (
                <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              )}
            </span>
          </button>
          {openIndex === index && (
            <div className="mt-2 pr-12">
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
