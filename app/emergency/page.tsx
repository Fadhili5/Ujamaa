import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, AlertTriangle, Users } from "lucide-react"

export default function EmergencyPage() {
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
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="alerts">Send & Receive Alerts</TabsTrigger>
            <TabsTrigger value="volunteer">Volunteer Connection</TabsTrigger>
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Send Alerts</h4>
                      <p className="text-sm mb-3">Report emergencies to notify your community.</p>
                      <h5 className="font-medium text-sm mb-1">SMS Commands:</h5>
                      <ul className="space-y-1 text-sm">
                        <li>
                          <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                            ALERT [TYPE] [LOCATION] [DETAILS]
                          </span>
                        </li>
                        <li>
                          <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                            UPDATE [ALERT-ID] [UPDATE]
                          </span>
                        </li>
                        <li>
                          <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                            RESOLVE [ALERT-ID]
                          </span>
                        </li>
                      </ul>
                      <h5 className="font-medium text-sm mt-3 mb-1">USSD:</h5>
                      <p className="text-sm">
                        Dial <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">*123#</span>,
                        select option 5, then option 1
                      </p>
                    </div>

                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Receive Alerts</h4>
                      <p className="text-sm mb-3">Subscribe to alerts in your area.</p>
                      <h5 className="font-medium text-sm mb-1">SMS Commands:</h5>
                      <ul className="space-y-1 text-sm">
                        <li>
                          <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                            SUBSCRIBE [LOCATION]
                          </span>{" "}
                          - Get alerts for an area
                        </li>
                        <li>
                          <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                            UNSUBSCRIBE [LOCATION]
                          </span>{" "}
                          - Stop alerts for an area
                        </li>
                        <li>
                          <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">VOICE ON</span> -
                          Receive voice call alerts
                        </li>
                        <li>
                          <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">VOICE OFF</span> -
                          SMS alerts only
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Alert Categories</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div className="bg-white dark:bg-gray-800 p-3 rounded text-center">
                        <h5 className="font-medium">Medical</h5>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-3 rounded text-center">
                        <h5 className="font-medium">Weather</h5>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-3 rounded text-center">
                        <h5 className="font-medium">Security</h5>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-3 rounded text-center">
                        <h5 className="font-medium">Infrastructure</h5>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-3 rounded text-center">
                        <h5 className="font-medium">Disease Outbreak</h5>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-3 rounded text-center">
                        <h5 className="font-medium">Missing Person</h5>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-3 rounded text-center">
                        <h5 className="font-medium">Resource Shortage</h5>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-3 rounded text-center">
                        <h5 className="font-medium">Other</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="destructive" className="w-full sm:w-auto">
                  Report Emergency
                </Button>
                <Button variant="outline" className="w-full sm:w-auto">
                  Subscribe to Alerts
                </Button>
              </CardFooter>
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <h4 className="font-medium mb-2">For Volunteers</h4>
                      <p className="text-sm mb-3">Register as a volunteer and get matched with opportunities.</p>
                      <h5 className="font-medium text-sm mb-1">SMS Commands:</h5>
                      <ul className="space-y-1 text-sm">
                        <li>
                          <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                            VOLUNTEER REGISTER [SKILLS]
                          </span>
                        </li>
                        <li>
                          <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                            VOLUNTEER LOCATION [AREA]
                          </span>
                        </li>
                        <li>
                          <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                            VOLUNTEER AVAILABILITY [TIMES]
                          </span>
                        </li>
                        <li>
                          <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                            VOLUNTEER STATUS
                          </span>{" "}
                          - Check your profile
                        </li>
                      </ul>
                    </div>

                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <h4 className="font-medium mb-2">For Organizations</h4>
                      <p className="text-sm mb-3">Post volunteer opportunities and find help.</p>
                      <h5 className="font-medium text-sm mb-1">SMS Commands:</h5>
                      <ul className="space-y-1 text-sm">
                        <li>
                          <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                            ORG REGISTER [NAME]
                          </span>
                        </li>
                        <li>
                          <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                            ORG POST [NEED] [LOCATION] [DETAILS]
                          </span>
                        </li>
                        <li>
                          <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                            ORG UPDATE [POST-ID] [UPDATE]
                          </span>
                        </li>
                        <li>
                          <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                            ORG CLOSE [POST-ID]
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Volunteer Categories</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                      <div className="bg-white dark:bg-gray-800 p-3 rounded">
                        <h5 className="font-medium mb-1">Medical Assistance</h5>
                        <p className="text-xs">Healthcare professionals, first aid</p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-3 rounded">
                        <h5 className="font-medium mb-1">Logistics & Transport</h5>
                        <p className="text-xs">Drivers, delivery, coordination</p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-3 rounded">
                        <h5 className="font-medium mb-1">Community Outreach</h5>
                        <p className="text-xs">Information sharing, education</p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-3 rounded">
                        <h5 className="font-medium mb-1">Resource Distribution</h5>
                        <p className="text-xs">Food, supplies, medications</p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-3 rounded">
                        <h5 className="font-medium mb-1">Technical Support</h5>
                        <p className="text-xs">IT, communications, repairs</p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-3 rounded">
                        <h5 className="font-medium mb-1">Emotional Support</h5>
                        <p className="text-xs">Counseling, check-ins, companionship</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row justify-center gap-4">
                <Button className="w-full sm:w-auto">Register as Volunteer</Button>
                <Button variant="outline" className="w-full sm:w-auto">
                  Post Volunteer Need
                </Button>
              </CardFooter>
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

