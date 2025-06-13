"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { BACKEND_URL } from "../config"
import { useRouter } from "next/navigation"
import axios, { AxiosError } from "axios"

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("")

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/user/signin`,
        {
          username: email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )

      localStorage.setItem("token", res.data.token)
      router.push("/dashboard")
    }catch (err: unknown) {
  const error = err as AxiosError

  if (error.response?.status === 403) {
    setErrorMessage("Invalid email or password.")
  } else {
    setErrorMessage("Something went wrong. Please try again.")
  }

  console.error("Login error:", error)
}

   
    
  }

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <div className="flex min-h-screen">
        {/* Left side */}
        <div className="hidden w-1/2 bg-gradient-to-br to-blue-600 lg:block relative overflow-hidden">
          {/* Abstract shapes for visual interest */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-white blur-3xl"></div>
            <div className="absolute bottom-40 right-10 w-80 h-80 rounded-full bg-white blur-3xl"></div>
          </div>

          <div className="flex h-full items-center justify-center relative z-10">
            <Link href="/" className="flex items-center text-6xl font-bold">
              <span className="text-white">Hook</span>
              <span className="text-orange-300">Works</span>
            </Link>
          </div>
        </div>

        {/* Right side */}
        <div className="flex w-full flex-col justify-center px-4 sm:px-6 lg:w-1/2 lg:px-8 bg-white">
          <div className="mx-auto w-full max-w-md py-12">
            <div className="mb-10">
              <h2 className="text-4xl font-bold text-gray-800">Welcome back</h2>
              <p className="mt-3 text-lg text-gray-600">Log in to your HookWorks account</p>
            </div>

            <button className="mb-8 flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-5 py-3 text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:shadow">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="font-medium">Continue with Google</span>
            </button>

            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-gray-500 font-medium">or continue with email</span>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  suppressHydrationWarning
                  id="email"
                  type="email"
                  required
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 shadow-sm transition-all focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  suppressHydrationWarning
                  id="password"
                  type="password"
                  required
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 shadow-sm transition-all focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-end">
                <Link href="#" className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                  Forgot password?
                </Link>
              </div>

              {errorMessage && (
                <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 border border-red-200">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-5 py-3.5 text-white font-medium shadow-lg shadow-orange-500/30 transition-all hover:shadow-xl hover:shadow-orange-500/40 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
              >
                Log in
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-orange-600 hover:text-orange-700 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
