"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useRouter } from "next/navigation"

interface Zap {
  id: string
  triggerId: string
  userId: number
  actions: {
    id: string
    zapId: string
    actionId: string
    sortingOrder: number
    type: {
      id: string
      name: string
    }
  }[]
  trigger: {
    id: string
    zapId: string
    triggerId: string
    type: {
      id: string
      name: string
    }
  }
}

function useZaps() {
  const [zaps, setZaps] = useState<Zap[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/zap`, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        setZaps(res.data.zaps)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Failed to fetch zaps:", err)
        setZaps([])
        setLoading(false)
      })
  }, [])

  return {
    loading,
    zaps,
  }
}

export default function ZapierDashboard() {
  const [theme, setTheme] = useState("light")
  const { loading, zaps } = useZaps()
  const router = useRouter()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      {/* Header */}
      <header
        className={`px-6 py-4 flex justify-between items-center border-b ${
          theme === "dark" ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
          HookWork
        </h1>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${
              theme === "dark" ? "bg-gray-800 text-yellow-300" : "bg-gray-100 text-gray-700"
            }`}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">My Zaps</h2>
          <button   onClick={() => {
                        router.push("/zap/create") //+z.id
                      }} className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-2 rounded-md transition-all shadow-md hover:shadow-lg flex items-center">
            <span className="mr-1">+</span> Create
          </button>
        </div>

        {/* Table */}
        <div className={`overflow-hidden rounded-xl shadow-md ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
          <table className="w-full border-collapse">
            <thead className={theme === "dark" ? "bg-gray-700" : "bg-gray-50"}>
              <tr className="text-left">
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Id</th>
                <th className="px-6 py-4 font-medium">Last Edit</th>
                <th className="px-6 py-4 font-medium">Go</th>
              </tr>
            </thead>
            <tbody>
              {zaps.map((z) => (
                <tr
                  key={z.id}
                  className={`border-t ${
                    theme === "dark" ? "border-gray-700 hover:bg-gray-700" : "border-gray-100 hover:bg-gray-50"
                  } transition-colors`}
                >
                  <td className="px-6 py-4">{z.trigger?.type?.name} {z.actions.map(x=>x.type.name+" ")}</td>
                  <td className="px-6 py-4">{z.id}</td>
                  <td className={`px-6 py-4 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>May 13, 2025</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        router.push("/zap/create") //+z.id
                      }}
                      className={`px-4 py-2 rounded-md text-sm transition-colors ${
                        theme === "dark"
                          ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                      }`}
                    >
                      Go
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ZapTable (shown after loading is done) */}
        {loading?"Loading....":<ZapTable zaps={zaps}/>}
      </main>
    </div>
  )
}

function ZapTable({ zaps }: { zaps: Zap[] }) {
  return (
    <div className="mt-6">
      <p className="text-sm text-gray-500">Total Zaps: {zaps.length}</p>
      {/* You can extend this component to show more zap details */}
    </div>
  )
}
