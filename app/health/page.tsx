"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HealthReminder } from "@/components/health/health-reminder"
import { PersonalizedTips } from "@/components/health/personalized-tips"
import { AppointmentBooking } from "@/components/health/appointment-booking"
import { VoiceConsultation } from "@/components/health/VoiceConsultation"

export default function HealthPage() {
  const [activeTab, setActiveTab] = useState("tips")

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
      <header className="bg-white dark:bg-gray-950 shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Link href="/">
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">U</span>
                </div>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Ujamaa Health</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link
                href="/"
                className="text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400"
              >
                Home
              </Link>
              <Link href="/health" className="text-green-600 dark:text-green-400 font-medium">
                Health
              </Link>
              <Link
                href="/mental-health"
                className="text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400"
              >
                Mental Health
              </Link>
              <Link
                href="/resources"
                className="text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400"
              >
                Resources
              </Link>
              <Link
                href="/emergency"
                className="text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400"
              >
                Emergency
              </Link>
            </nav>
            <Button variant="outline" className="md:hidden">
              Menu
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Health Outreach Programs</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Access health tips, book appointments, and consult with healthcare professionals
          </p>
        </div>

        <Tabs defaultValue="tips" value={activeTab} onValueChange={setActiveTab} className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="tips">Health Tips & Reminders</TabsTrigger>
            <TabsTrigger value="appointments">Appointment Booking</TabsTrigger>
            <TabsTrigger value="consultations">Voice Consultations</TabsTrigger>
            <TabsTrigger value="reminders">Health Reminders</TabsTrigger>
          </TabsList>

          <TabsContent value="tips" className="mt-6">
            <PersonalizedTips />
          </TabsContent>

          <TabsContent value="appointments" className="mt-6">
            <AppointmentBooking />
          </TabsContent>

          <TabsContent value="consultations" className="mt-6">
            <VoiceConsultation />
          </TabsContent>

          <TabsContent value="reminders" className="mt-6">
            <HealthReminder />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Ujamaa. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

