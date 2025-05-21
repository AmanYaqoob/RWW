"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CreativeSidebarWrapper } from "@/components/dashboard/creative-sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { SidebarProvider } from "@/components/ui/sidebar"
// app/dashboard/layout.jsx


export default function DashboardLayout({ children }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user")
    if (!user) {
      router.push("/login")
    } else {
      setLoading(false)
    }
  }, [router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <CreativeSidebarWrapper>
      <DashboardHeader />
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </CreativeSidebarWrapper>
  )
}
