"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Building,
  Calendar,
  Users,
  Settings,
  LogOut,
  BarChart3,
  MessageSquare,
  CreditCard,
  HelpCircle,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarProvider,
} from "@/components/ui/sidebar"

export function DashboardSidebar() {
  const pathname = usePathname()

  const isActive = (path) => {
    return pathname === path
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b px-6 py-3">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <span className="text-primary">Retreat</span>{" "}
          <span className="group-data-[collapsible=icon]:hidden">World Wide</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-xs font-semibold tracking-tight">Dashboard</h2>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/dashboard")} tooltip="Overview">
                <Link href="/dashboard">
                  <Home className="h-4 w-4" />
                  <span>Overview</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/dashboard/properties")} tooltip="Properties">
                <Link href="/dashboard/properties">
                  <Building className="h-4 w-4" />
                  <span>Properties</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/dashboard/bookings")} tooltip="Bookings">
                <Link href="/dashboard/bookings">
                  <Calendar className="h-4 w-4" />
                  <span>Bookings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/dashboard/guests")} tooltip="Guests">
                <Link href="/dashboard/guests">
                  <Users className="h-4 w-4" />
                  <span>Guests</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/dashboard/analytics")} tooltip="Analytics">
                <Link href="/dashboard/analytics">
                  <BarChart3 className="h-4 w-4" />
                  <span>Analytics</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/dashboard/messages")} tooltip="Messages">
                <Link href="/dashboard/messages">
                  <MessageSquare className="h-4 w-4" />
                  <span>Messages</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/dashboard/payments")} tooltip="Payments">
                <Link href="/dashboard/payments">
                  <CreditCard className="h-4 w-4" />
                  <span>Payments</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-xs font-semibold tracking-tight">Settings</h2>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/dashboard/profile")} tooltip="Profile">
                <Link href="/dashboard/profile">
                  <Settings className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/dashboard/help")} tooltip="Help">
                <Link href="/dashboard/help">
                  <HelpCircle className="h-4 w-4" />
                  <span>Help & Support</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton className="text-red-600 hover:text-red-700 hover:bg-red-50" tooltip="Logout">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="group-data-[collapsible=icon]:hidden">
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-muted-foreground">Property Owner</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

export function DashboardSidebarTrigger() {
  return <SidebarTrigger />
}

export function DashboardSidebarWrapper({ children }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">{children}</div>
      </div>
    </SidebarProvider>
  )
}
