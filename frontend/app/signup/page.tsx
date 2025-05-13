"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/user/signup`,
        {
          username: email,
          password,
          name,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      router.push("/login");
      console.log(res.data);
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <div className="flex min-h-screen">
        {/* Left Side */}
        <div className="hidden w-1/2 bg-gradient-to-br from-red-800 to-blue-600 p-12 lg:block">
          <Link href="/" className="text-2xl font-bold text-white">
            <span>Hook</span>
            <span>Works</span>
          </Link>

          <div className="mt-24">
            <h1 className="text-4xl font-bold text-white">
              Join millions worldwide who automate their work using HookWorks
            </h1>

            <div className="mt-12 space-y-6">
              {[
                "Easy setup, no coding required",
                "Free forever for core features",
                "14-day trial of premium features",
              ].map((text, idx) => (
                <div key={idx} className="flex items-center space-x-3">
                  <div className="rounded-full bg-white/20 p-1">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-lg text-white">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="flex w-full flex-col justify-center px-4 sm:px-6 lg:w-1/2 lg:px-8">
          <div className="mx-auto w-full max-w-sm">
            <div className="mb-8">
              <h2 className="text-3xl font-bold">Create your account</h2>
              <p className="mt-2 text-muted-foreground">
                Get started with HookWorks today
              </p>
            </div>

            <button className="mb-6 flex w-full items-center justify-between rounded-lg bg-[#4285f4] px-4 py-2.5 text-white hover:bg-[#4285f4]/90">
              <span>Sign up with Google</span>
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

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium">
                  Email
                </label>
                <input
                  suppressHydrationWarning
                  id="email"
                  type="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                  Name
                </label>
                <input
                  suppressHydrationWarning
                  id="name"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
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
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-gradient-to-r from-orange-500 to-pink-600 px-4 py-2.5 text-white hover:opacity-90"
              >
                Get started free
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              By signing up, you agree to our{" "}
              <Link href="#" className="text-foreground underline">
                terms of service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-foreground underline">
                privacy policy
              </Link>
              .
            </p>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-foreground underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
