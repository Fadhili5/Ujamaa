import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarComponent } from "@/components/ui/sidebar-component"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ujamaa - Health & Community Support",
  description: "Comprehensive health and community support application",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-950`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen">
            <SidebarComponent />
            <div className="flex-1 md:ml-64">{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'