"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Activity, Users, MapPin, Bell, MessageSquare, Settings, HelpCircle, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface SidebarComponentProps {
  className?: string
}

export function SidebarComponent({ className }: SidebarComponentProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const routes = [
    {
      href: "/",
      icon: Home,
      label: "Home",
    },
    {
      href: "/health",
      icon: Activity,
      label: "Health",
    },
    {
      href: "/mental-health",
      icon: Users,
      label: "Mental Health",
    },
    {
      href: "/resources",
      icon: MapPin,
      label: "Resources",
    },
    {
      href: "/emergency",
      icon: Bell,
      label: "Emergency",
    },
  ]

  const bottomRoutes = [
    {
      href: "/messages",
      icon: MessageSquare,
      label: "Messages",
    },
    {
      href: "/settings",
      icon: Settings,
      label: "Settings",
    },
    {
      href: "/help",
      icon: HelpCircle,
      label: "Help Center",
    },
  ]

  return (
    <>
      {/* Mobile menu button */}
      <Button variant="ghost" size="icon" onClick={toggleSidebar} className="fixed top-4 left-4 z-50 md:hidden">
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col w-64 bg-gray-900 text-white transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          className,
        )}
      >
        <div className="flex items-center justify-center h-16 border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <h1 className="text-xl font-bold">Ujamaa</h1>
          </div>
        </div>

        <div className="flex flex-col justify-between flex-1 overflow-y-auto">
          <div className="px-4 py-6 space-y-6">
            <div className="space-y-1">
              <p className="px-2 text-xs font-semibold text-gray-400 uppercase">Main</p>
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center px-2 py-2 text-sm font-medium rounded-lg",
                    pathname === route.href
                      ? "bg-gray-800 text-green-500"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white",
                  )}
                >
                  <route.icon className="w-5 h-5 mr-3" />
                  {route.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="px-4 py-6 border-t border-gray-800 space-y-6">
            <div className="space-y-1">
              <p className="px-2 text-xs font-semibold text-gray-400 uppercase">Support</p>
              {bottomRoutes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center px-2 py-2 text-sm font-medium rounded-lg",
                    pathname === route.href
                      ? "bg-gray-800 text-green-500"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white",
                  )}
                >
                  <route.icon className="w-5 h-5 mr-3" />
                  {route.label}
                </Link>
              ))}
            </div>

            <div className="pt-4">
              <div className="flex items-center px-2 py-2">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                    <span className="text-white font-medium text-sm">GH</span>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">Guest User</p>
                  <p className="text-xs text-gray-400">guest@ujamaa.org</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

