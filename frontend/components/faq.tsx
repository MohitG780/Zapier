"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "How does the platform work?",
    answer:
      "Our platform allows you to connect different apps and services through a visual interface. You can create workflows that automate tasks between these services without writing any code. Simply select your trigger, add actions, and deploy your workflow in minutes.",
  },
  {
    question: "Do I need technical skills to use the platform?",
    answer:
      "No technical skills are required! Our visual workflow builder is designed for anyone to use. You can create complex automations through our drag-and-drop interface without writing a single line of code.",
  },
  {
    question: "Which apps and services can I integrate?",
    answer:
      "We support 100+ integrations including popular services like Slack, Google Workspace, Microsoft 365, Salesforce, HubSpot, Jira, GitHub, and many more. We're constantly adding new integrations based on user requests.",
  },
  {
    question: "Is there a limit to how many workflows I can create?",
    answer:
      "Free accounts can create up to 5 workflows. Pro accounts have unlimited workflows with higher execution limits. Enterprise accounts have unlimited everything with dedicated support.",
  },
  {
    question: "How secure is my data?",
    answer:
      "Security is our top priority. We're SOC 2 compliant, use end-to-end encryption for all data transfers, and never store your credentials in plain text. We also offer enterprise-grade security features like SSO and SAML.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="mx-auto max-w-3xl divide-y divide-slate-800">
      {faqs.map((faq, index) => (
        <div key={index} className="py-6">
          <button className="flex w-full items-center justify-between text-left" onClick={() => toggleFaq(index)}>
            <h3 className="text-lg font-medium text-white">{faq.question}</h3>
            {openIndex === index ? (
              <ChevronUp className="h-5 w-5 text-slate-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-slate-400" />
            )}
          </button>
          {openIndex === index && (
            <div className="mt-3 animate-fadeIn">
              <p className="text-slate-400">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
