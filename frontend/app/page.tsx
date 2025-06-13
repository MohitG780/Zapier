import Link from "next/link"
import { ArrowRight, LinkIcon, UserCircle, CheckCircle, Mail, Layers, Database, Lock } from "lucide-react"
import WorkflowStep from "@/components/workflow-step"
import FeatureCard from "@/components/feature-card"
import FAQ from "@/components/faq"
import AnimatedCounter from "@/components/animated-counter"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white text-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Hook</span>
              <span className="text-gray-800">Works</span>
            </Link>
          </div>
          <nav className="hidden space-x-8 md:flex">
            <Link href="#features" className=" font-bold text-medium text-gray-600 hover:text-gray-900">
              Features
            </Link>
            <Link href="#integrations" className="font-bold text-medium text-gray-600 hover:text-gray-900">
              Integrations
            </Link>

            <Link href="#faq" className="font-bold text-medium text-gray-600 hover:text-gray-900">
              FAQ
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            
            <Link
              href="/login"
              className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              Login
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 py-24 text-center md:py-32 bg-gradient-to-b from-white to-gray-50">
        <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-7xl">
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
            The most connected AI
          </span>
          <br />
          <span className="text-gray-800">orchestration platform</span>
        </h1>

        <p className="font-bold text-medium mb-12 max-w-3xl text-xl text-gray-600">
          Build and ship AI workflows in minutes—no IT bottlenecks, no complexity.
          <span className="block mt-2 text-2xl text-gray-800">Just results.</span>
        </p>

        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Link
            href="/signup"
            className=" text-medium flex h-14 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-8 font-medium text-white transition-all hover:opacity-90"
          >
            Start free with email
          </Link>
          
        </div>
      </section>

      {/* Stats Section */}
      <section className="mx-auto w-full max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm">
            <AnimatedCounter value={5000} suffix="+" className="text-blue-600" />
            <p className="text-gray-600">Active Users</p>
          </div>
          <div className="flex flex-col items-center rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm">
            <AnimatedCounter value={100} suffix="+" className="text-blue-600" />
            <p className="text-gray-600">Integrations</p>
          </div>
          <div className="flex flex-col items-center rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm">
            <AnimatedCounter value={1000000} suffix="+" className="text-blue-600" />
            <p className="text-gray-600">Workflows Executed</p>
          </div>
        </div>
      </section>

      {/* Workflow Demo Section */}
      <section className="mx-auto w-full max-w-4xl px-4 py-16 bg-gray-50">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">My First Workflow</h2>
        </div>

        <div className="space-y-6">
          <WorkflowStep
            icon={<LinkIcon className="h-6 w-6 text-blue-500" />}
            title="Webhook Trigger"
            description="Step 1"
            isCompleted={true}
            isFirst={true}
          />

          <WorkflowStep
            icon={<UserCircle className="h-6 w-6 text-blue-500" />}
            title="Find Contact"
            description="Step 2"
            isCompleted={true}
          />

          <WorkflowStep
            icon={<CheckCircle className="h-6 w-6 text-blue-500" />}
            title="Update Status"
            description="Step 3"
            isCompleted={true}
          />

          <WorkflowStep
            icon={<Mail className="h-6 w-6 text-blue-500" />}
            title="Send Email"
            description="Step 4"
            isCompleted={false}
            isLast={true}
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="mx-auto w-full max-w-7xl px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-800">Powerful Features</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Everything you need to build, deploy, and manage AI workflows at scale
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<Layers className="h-6 w-6 text-blue-500" />}
            title="100+ Integrations"
            description="Connect with all your favorite tools and services"
          />
          <FeatureCard
            icon={<Database className="h-6 w-6 text-blue-500" />}
            title="Data Orchestration"
            description="Move and transform data between systems effortlessly"
          />
          <FeatureCard
            icon={<Lock className="h-6 w-6 text-blue-500" />}
            title="Enterprise Security"
            description="SOC 2 compliant with end-to-end encryption"
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="mx-auto w-full max-w-7xl px-4 py-16 bg-gray-50">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-800">Frequently Asked Questions</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">Everything you need to know about our platform</p>
        </div>

        <FAQ />
      </section>

      {/* CTA Section */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16">
        <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 p-8 md:p-16 border border-gray-100">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl text-gray-800">Ready to transform your workflows?</h2>
            <p className="mb-8 text-lg text-gray-600">
              Join thousands of teams automating their work with our platform
            </p>
            <Link
              href="#"
              className="inline-flex h-14 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-8 font-medium text-white transition-all hover:opacity-90"
            >
              Get Started for Free
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
