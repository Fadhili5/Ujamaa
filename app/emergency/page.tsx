"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, AlertTriangle, Users } from "lucide-react"

export default function EmergencyPage() {
  const { register, handleSubmit, reset } = useForm()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const onSubmit = async (data: any) => {
    setLoading(true)
    setMessage("")
    try {
      const response = await fetch("/api/emergency-alerts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (result.success) {
        setMessage("Alert sent successfully!")
        reset()
      } else {
        setMessage("Failed to send alert.")
      }
    } catch (error) {
      setMessage("An error occurred.")
    } finally {
      setLoading(false)
    }
  }

  const onVolunteerSubmit = async (data: any) => {
    setLoading(true)
    setMessage("")
    try {
      const response = await fetch("/api/volunteer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (result.success) {
        setMessage("Volunteer registered successfully!")
        reset()
      } else {
        setMessage("Failed to register volunteer.")
      }
    } catch (error) {
      setMessage("An error occurred.")
    } finally {
      setLoading(false)
    }
  }

  const onPostNeedSubmit = async (data: any) => {
    setLoading(true)
    setMessage("")
    try {
      const response = await fetch("/api/post-need", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (result.success) {
        setMessage("Volunteer need posted successfully!")
        reset()
      } else {
        setMessage("Failed to post volunteer need.")
      }
    } catch (error) {
      setMessage("An error occurred.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-red-100 dark:from-red-950 dark:to-red-900">
      <header className="bg-white dark:bg-gray-950 shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Link href="/">
                <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">U</span>
                </div>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Ujamaa Emergency</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400">
                Home
              </Link>
              <Link
                href="/health"
                className="text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400"
              >
                Health
              </Link>
              <Link
                href="/mental-health"
                className="text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400"
              >
                Mental Health
              </Link>
              <Link
                href="/resources"
                className="text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400"
              >
                Resources
              </Link>
              <Link href="/emergency" className="text-red-600 dark:text-red-400 font-medium">
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
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Emergency Alert System</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Send and receive emergency alerts for critical situations via SMS or voice calls
          </p>
        </div>

        <div className="bg-red-100 dark:bg-red-900/50 border-l-4 border-red-500 p-4 mb-8 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-red-800 dark:text-red-200">Emergency Services</h3>
              <p className="mt-2 text-red-700 dark:text-red-300">
                For immediate life-threatening emergencies, please contact your local emergency services directly. This
                system is designed to complement, not replace, official emergency services.
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="alerts" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="alerts">Send & Receive Alerts</TabsTrigger>
            <TabsTrigger value="volunteer">Volunteer Connection</TabsTrigger>
            <TabsTrigger value="map">Emergency Map</TabsTrigger>
          </TabsList>

          <TabsContent value="alerts" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Bell className="h-12 w-12 text-red-600" />
                </div>
                <CardTitle className="text-center text-2xl">Emergency Alert System</CardTitle>
                <CardDescription className="text-center text-lg">
                  Send and receive emergency alerts for critical situations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">How It Works</h3>
                    <p>
                      Users can both send and subscribe to emergency alerts in their community, with options to receive
                      notifications via SMS or automated voice calls. This system helps communities respond quickly to
                      emergencies and coordinate assistance.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <h4 className="font-medium mb-2">Send Alerts</h4>
                        <p className="text-sm mb-3">Report emergencies to notify your community.</p>
                        <div className="space-y-2">
                          <input
                            type="text"
                            placeholder="Phone Number"
                            {...register("phoneNumber", { required: true })}
                            className="w-full p-2 border border-gray-300 rounded"
                          />
                          <input
                            type="text"
                            placeholder="Type"
                            {...register("type", { required: true })}
                            className="w-full p-2 border border-gray-300 rounded"
                          />
                          <input
                            type="text"
                            placeholder="Location"
                            {...register("location", { required: true })}
                            className="w-full p-2 border border-gray-300 rounded"
                          />
                          <textarea
                            placeholder="Details"
                            {...register("details", { required: true })}
                            className="w-full p-2 border border-gray-300 rounded"
                          />
                        </div>
                      </div>
                    </div>
                    <Button type="submit" className="w-full sm:w-auto" disabled={loading}>
                      {loading ? "Sending..." : "Send Alert"}
                    </Button>
                  </form>
                  {message && <p className="text-center mt-4">{message}</p>}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="volunteer" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Users className="h-12 w-12 text-red-600" />
                </div>
                <CardTitle className="text-center text-2xl">Volunteer & Service Connection</CardTitle>
                <CardDescription className="text-center text-lg">
                  Connect volunteers with service opportunities via SMS
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">How It Works</h3>
                    <p>
                      A platform to link volunteers with local organizations' needs, with notifications sent via SMS.
                      This system helps mobilize community resources during emergencies and for ongoing community
                      support.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit(onVolunteerSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <h4 className="font-medium mb-2">Register as Volunteer</h4>
                        <p className="text-sm mb-3">Sign up to offer your skills and assistance.</p>
                        <div className="space-y-2">
                          <input
                            type="text"
                            placeholder="Name"
                            {...register("name", { required: true })}
                            className="w-full p-2 border border-gray-300 rounded"
                          />
                          <input
                            type="text"
                            placeholder="Phone Number"
                            {...register("phone", { required: true })}
                            className="w-full p-2 border border-gray-300 rounded"
                          />
                          <input
                            type="text"
                            placeholder="Skills"
                            {...register("skills", { required: true })}
                            className="w-full p-2 border border-gray-300 rounded"
                          />
                        </div>
                      </div>
                    </div>
                    <Button type="submit" className="w-full sm:w-auto" disabled={loading}>
                      {loading ? "Registering..." : "Register as Volunteer"}
                    </Button>
                  </form>
                  {message && <p className="text-center mt-4">{message}</p>}

                  <form onSubmit={handleSubmit(onPostNeedSubmit)} className="space-y-6 mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <h4 className="font-medium mb-2">Post Volunteer Need</h4>
                        <p className="text-sm mb-3">Request assistance from volunteers.</p>
                        <div className="space-y-2">
                          <input
                            type="text"
                            placeholder="Organization Name"
                            {...register("organization", { required: true })}
                            className="w-full p-2 border border-gray-300 rounded"
                          />
                          <input
                            type="text"
                            placeholder="Need"
                            {...register("need", { required: true })}
                            className="w-full p-2 border border-gray-300 rounded"
                          />
                          <input
                            type="text"
                            placeholder="Location"
                            {...register("location", { required: true })}
                            className="w-full p-2 border border-gray-300 rounded"
                          />
                          <textarea
                            placeholder="Details"
                            {...register("details", { required: true })}
                            className="w-full p-2 border border-gray-300 rounded"
                          />
                        </div>
                      </div>
                    </div>
                    <Button type="submit" className="w-full sm:w-auto" disabled={loading}>
                      {loading ? "Posting..." : "Post Volunteer Need"}
                    </Button>
                  </form>
                  {message && <p className="text-center mt-4">{message}</p>}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="map" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <AlertTriangle className="h-12 w-12 text-red-600" />
                </div>
                <CardTitle className="text-center text-2xl">Emergency Map</CardTitle>
                <CardDescription className="text-center text-lg">
                  View emergency locations and resources on the map
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-w-16 aspect-h-9 h-[600px]">
                  <iframe
                    src="https://gengeo.maps.arcgis.com/apps/mapviewer/index.html?webmap=079628c4a33f45f68e3eef5328dc5254"
                    frameBorder="0"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              </CardContent>
            </Card>
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