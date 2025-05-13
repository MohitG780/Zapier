import Link from "next/link"
import { ArrowRight, LinkIcon, UserCircle, CheckCircle, Mail, Layers, Database, Lock } from "lucide-react"
import WorkflowStep from "@/components/workflow-step"
import FeatureCard from "@/components/feature-card"
import FAQ from "@/components/faq"
import AnimatedCounter from "@/components/animated-counter"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-black/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-white">
              <span className="bg-gradient-to-r from-orange-400 to-pink-600 bg-clip-text text-transparent">Hook</span>
              <span>Works</span>
            </Link>
          </div>
          <nav className="hidden space-x-8 md:flex">
            <Link href="#features" className="text-sm text-slate-300 hover:text-white">
              Features
            </Link>
            <Link href="#integrations" className="text-sm text-slate-300 hover:text-white">
              Integrations
            </Link>
      
            <Link href="#faq" className="text-sm text-slate-300 hover:text-white">
              FAQ
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="#" className="hidden text-sm text-slate-300 hover:text-white md:block">
              Sign in
            </Link>
            <Link
              href="#"
              className="rounded-lg bg-gradient-to-r from-orange-500 to-pink-600 px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 py-24 text-center md:py-32">
        <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-7xl">
          <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            The most connected AI
          </span>
          <br />
          <span className="text-white">orchestration platform</span>
        </h1>

        <p className="mb-12 max-w-3xl text-xl text-slate-400">
          Build and ship AI workflows in minutes—no IT bottlenecks, no complexity.
          <span className="block mt-2 text-2xl text-white">Just results.</span>
        </p>

        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Link
            href="#"
            className="flex h-14 items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-8 font-medium text-white transition-all hover:opacity-90"
          >
            Start free with email
          </Link>
          <Link
            href="#"
            className="flex h-14 items-center justify-center rounded-lg border border-slate-700 bg-black px-8 font-medium text-white transition-all hover:bg-slate-900"
          >
            Start free with Google <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mx-auto w-full max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center rounded-xl border border-slate-800 bg-slate-900/50 p-6 text-center">
            <AnimatedCounter value={5000} suffix="+" />
            <p className="text-slate-400">Active Users</p>
          </div>
          <div className="flex flex-col items-center rounded-xl border border-slate-800 bg-slate-900/50 p-6 text-center">
            <AnimatedCounter value={100} suffix="+" />
            <p className="text-slate-400">Integrations</p>
          </div>
          <div className="flex flex-col items-center rounded-xl border border-slate-800 bg-slate-900/50 p-6 text-center">
            <AnimatedCounter value={1000000} suffix="+" />
            <p className="text-slate-400">Workflows Executed</p>
          </div>
        </div>
      </section>

      {/* Workflow Demo Section */}
      <section className="mx-auto w-full max-w-4xl px-4 py-16">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold text-slate-300">My First Workflow</h2>
        </div>

        <div className="space-y-6">
          <WorkflowStep
            icon={<LinkIcon className="h-6 w-6" />}
            title="Webhook Trigger"
            description="Step 1"
            isCompleted={true}
            isFirst={true}
          />

          <WorkflowStep
            icon={<UserCircle className="h-6 w-6" />}
            title="Find Contact"
            description="Step 2"
            isCompleted={true}
          />

          <WorkflowStep
            icon={<CheckCircle className="h-6 w-6" />}
            title="Update Status"
            description="Step 3"
            isCompleted={true}
          />

          <WorkflowStep
            icon={<Mail className="h-6 w-6" />}
            title="Send Email"
            description="Step 4"
            isCompleted={false}
            isLast={true}
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="mx-auto w-full max-w-7xl px-4 py-16 ">
        <div className="mb-12 text-center ">
          <h2 className="mb-4 text-4xl font-bold">Powerful Features</h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Everything you need to build, deploy, and manage AI workflows at scale
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          
          <FeatureCard
            icon={<Layers className="h-6 w-6" />}
            title="100+ Integrations"
            description="Connect with all your favorite tools and services"
          />
          <FeatureCard
            icon={<Database className="h-6 w-6" />}
            title="Data Orchestration"
            description="Move and transform data between systems effortlessly"
          />
          <FeatureCard
            icon={<Lock className="h-6 w-6" />}
            title="Enterprise Security"
            description="SOC 2 compliant with end-to-end encryption"
          />
        </div>
      </section>

      
    

      

      {/* FAQ Section */}
      <section id="faq" className="mx-auto w-full max-w-7xl px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold">Frequently Asked Questions</h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">Everything you need to know about our platform</p>
        </div>

        <FAQ />
      </section>

      {/* CTA Section */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16">
        <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 p-8 md:p-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Ready to transform your workflows?</h2>
            <p className="mb-8 text-lg text-slate-300">
              Join thousands of teams automating their work with our platform
            </p>
            <Link
              href="#"
              className="inline-flex h-14 items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-pink-600 px-8 font-medium text-white transition-all hover:opacity-90"
            >
              Get Started for Free
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
