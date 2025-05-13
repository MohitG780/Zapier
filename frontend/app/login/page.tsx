"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

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
        }
      );

      localStorage.setItem("token", res.data.token);
      router.push("/dashboard");
    } catch (err: any) {
      if (err.response?.status === 403) {
        setErrorMessage("Invalid email or password.");
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
      console.error("Login error:", err);
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <div className="flex min-h-screen">
        {/* Left side */}
        <div className="hidden w-1/2 bg-gradient-to-br from-red-500 to-blue-600 lg:block">
          <div className="flex h-full items-center justify-center">
            <Link href="/" className="text-6xl font-bold text-purple-200">
              <span>Hook</span>
              <span>Works</span>
            </Link>
          </div>
        </div>

        {/* Right side */}
        <div className="flex w-full flex-col justify-center px-4 sm:px-6 lg:w-1/2 lg:px-8">
          <div className="mx-auto w-full max-w-sm">
            <div className="mb-8">
              <h2 className="text-3xl font-bold">Welcome back</h2>
              <p className="mt-2 text-muted-foreground">
                Log in to your HookWorks account
              </p>
            </div>

            <button className="mb-6 flex w-full items-center justify-between rounded-lg bg-[#4285f4] px-4 py-2.5 text-white hover:bg-[#4285f4]/90">
              <span>Continue with Google</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-background px-2 text-muted-foreground">
                  or continue with
                </span>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium">
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
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium">
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
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="flex items-center justify-between">
                <Link href="#" className="text-sm text-foreground underline">
                  Forgot password?
                </Link>
              </div>

              {errorMessage && (
                <p className="text-sm text-red-500">{errorMessage}</p>
              )}

              <button
                type="submit"
                className="w-full rounded-lg bg-gradient-to-r from-orange-500 to-pink-600 px-4 py-2.5 text-white hover:opacity-90"
              >
                Log in
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-foreground underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
