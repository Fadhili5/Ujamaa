"use client"

import { Bell, Search, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTheme } from "next-themes"

export function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between bg-gray-900 px-4 md:px-6">
      <div className="hidden md:block">
        <h2 className="text-xl font-bold text-white">Dashboard</h2>
      </div>

      <div className="flex flex-1 items-center justify-end space-x-4">
        <div className="relative hidden md:block w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full bg-gray-800 border-gray-700 pl-8 text-white placeholder:text-gray-400 focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
          <Bell className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="text-gray-300 hover:text-white"
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
    </header>
  )
}

