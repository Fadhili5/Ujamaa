import { Header } from "@/components/ui/header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Share, Wifi, Search } from "lucide-react"
import ResourceMap from "@/components/resource-map"
import { Button } from "@/components/ui/button"

export default function ResourcesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 p-4 md:p-6 space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">Community Resource Locator</h2>
          <p className="text-gray-400">
            Find health resources, share community resources, and access information even when offline
          </p>
        </div>

        <Tabs defaultValue="mapping" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800">
            <TabsTrigger value="mapping" className="data-[state=active]:bg-gray-700">
              Health Resource Mapping
            </TabsTrigger>
            <TabsTrigger value="sharing" className="data-[state=active]:bg-gray-700">
              Resource Sharing
            </TabsTrigger>
            <TabsTrigger value="offline" className="data-[state=active]:bg-gray-700">
              Offline Access
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mapping" className="mt-6">
            <Card className="bg-gray-800 border-gray-700 text-white">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <MapPin className="h-12 w-12 text-green-500" />
                </div>
                <CardTitle className="text-center text-2xl">Health Resource Mapping</CardTitle>
                <CardDescription className="text-center text-lg text-gray-400">
                  Locate health resources such as medical clinics, legal aid, and educational workshops
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2 text-white">How It Works</h3>
                    <p className="text-gray-300">
                      Use our interactive map to find health resources in your area. You can filter by resource type and
                      click on markers to view detailed information. For areas with limited connectivity, you can also
                      use USSD or SMS to find resources.
                    </p>
                  </div>

                  <ResourceMap />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-700 rounded-lg p-4">
                      <h4 className="font-medium mb-2 text-white">USSD Process</h4>
                      <ol className="space-y-2 text-sm list-decimal list-inside text-gray-300">
                        <li>
                          Dial <span className="font-mono bg-gray-700 px-2 py-1 rounded">*123#</span>
                        </li>
                        <li>
                          Select option <span className="font-mono bg-gray-700 px-2 py-1 rounded">4</span> for Resources
                        </li>
                        <li>
                          Select option <span className="font-mono bg-gray-700 px-2 py-1 rounded">1</span> for Resource
                          Mapping
                        </li>
                        <li>Enter your location (district or area)</li>
                        <li>Select the type of resource you need</li>
                        <li>Receive a list of available resources</li>
                      </ol>
                    </div>

                    <div className="border border-gray-700 rounded-lg p-4">
                      <h4 className="font-medium mb-2 text-white">SMS Commands</h4>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li>
                          <span className="font-mono bg-gray-700 px-2 py-1 rounded">FIND CLINIC [LOCATION]</span> - Find
                          medical clinics
                        </li>
                        <li>
                          <span className="font-mono bg-gray-700 px-2 py-1 rounded">FIND LEGAL [LOCATION]</span> - Find
                          legal aid services
                        </li>
                        <li>
                          <span className="font-mono bg-gray-700 px-2 py-1 rounded">FIND EDUCATION [LOCATION]</span> -
                          Find educational workshops
                        </li>
                        <li>
                          <span className="font-mono bg-gray-700 px-2 py-1 rounded">FIND PHARMACY [LOCATION]</span> -
                          Find pharmacies
                        </li>
                        <li>
                          <span className="font-mono bg-gray-700 px-2 py-1 rounded">FIND ALL [LOCATION]</span> - List
                          all resources
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 text-white">Available Resource Types</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div className="bg-gray-800 p-3 rounded text-center">
                        <h5 className="font-medium text-white">Medical Clinics</h5>
                      </div>
                      <div className="bg-gray-800 p-3 rounded text-center">
                        <h5 className="font-medium text-white">Pharmacies</h5>
                      </div>
                      <div className="bg-gray-800 p-3 rounded text-center">
                        <h5 className="font-medium text-white">Legal Aid</h5>
                      </div>
                      <div className="bg-gray-800 p-3 rounded text-center">
                        <h5 className="font-medium text-white">Education</h5>
                      </div>
                      <div className="bg-gray-800 p-3 rounded text-center">
                        <h5 className="font-medium text-white">Food Banks</h5>
                      </div>
                      <div className="bg-gray-800 p-3 rounded text-center">
                        <h5 className="font-medium text-white">Counseling</h5>
                      </div>
                      <div className="bg-gray-800 p-3 rounded text-center">
                        <h5 className="font-medium text-white">Support Groups</h5>
                      </div>
                      <div className="bg-gray-800 p-3 rounded text-center">
                        <h5 className="font-medium text-white">Shelters</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button className="bg-green-500 hover:bg-green-600 text-white">Find Resources Near Me</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="sharing" className="mt-6">
            <Card className="bg-gray-800 border-gray-700 text-white">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Share className="h-12 w-12 text-green-500" />
                </div>
                <CardTitle className="text-center text-2xl">Resource Sharing Platform</CardTitle>
                <CardDescription className="text-center text-lg text-gray-400">
                  Request or offer community resources with SMS notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2 text-white">How It Works</h3>
                    <p className="text-gray-300">
                      A community-driven platform where users can post requests for resources or offer resources they
                      have available. The system matches needs with offers and facilitates connections via SMS
                      notifications.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-700 rounded-lg p-4">
                      <h4 className="font-medium mb-2 text-white">Request Resources</h4>
                      <p className="text-sm mb-3 text-gray-300">
                        Need something? Submit a request and get matched with available resources.
                      </p>
                      <h5 className="font-medium text-sm mb-1 text-white">SMS Commands:</h5>
                      <ul className="space-y-1 text-sm text-gray-300">
                        <li>
                          <span className="font-mono bg-gray-700 px-2 py-1 rounded">NEED [RESOURCE] [LOCATION]</span> -
                          Request a resource
                        </li>
                        <li>
                          <span className="font-mono bg-gray-700 px-2 py-1 rounded">CHECK REQUEST</span> - Check status
                          of your request
                        </li>
                        <li>
                          <span className="font-mono bg-gray-700 px-2 py-1 rounded">CANCEL REQUEST</span> - Cancel your
                          request
                        </li>
                      </ul>
                    </div>

                    <div className="border border-gray-700 rounded-lg p-4">
                      <h4 className="font-medium mb-2 text-white">Offer Resources</h4>
                      <p className="text-sm mb-3 text-gray-300">
                        Have something to share? Let others know what you can offer.
                      </p>
                      <h5 className="font-medium text-sm mb-1 text-white">SMS Commands:</h5>
                      <ul className="space-y-1 text-sm text-gray-300">
                        <li>
                          <span className="font-mono bg-gray-700 px-2 py-1 rounded">OFFER [RESOURCE] [LOCATION]</span> -
                          Offer a resource
                        </li>
                        <li>
                          <span className="font-mono bg-gray-700 px-2 py-1 rounded">CHECK OFFER</span> - Check status of
                          your offer
                        </li>
                        <li>
                          <span className="font-mono bg-gray-700 px-2 py-1 rounded">CANCEL OFFER</span> - Cancel your
                          offer
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 text-white">Resource Categories</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                      <div className="bg-gray-800 p-3 rounded">
                        <h5 className="font-medium mb-1 text-white">Medical Supplies</h5>
                        <p className="text-xs text-gray-400">Medications, first aid, mobility aids</p>
                      </div>
                      <div className="bg-gray-800 p-3 rounded">
                        <h5 className="font-medium mb-1 text-white">Food & Nutrition</h5>
                        <p className="text-xs text-gray-400">Food donations, meal services</p>
                      </div>
                      <div className="bg-gray-800 p-3 rounded">
                        <h5 className="font-medium mb-1 text-white">Transportation</h5>
                        <p className="text-xs text-gray-400">Rides to appointments, deliveries</p>
                      </div>
                      <div className="bg-gray-800 p-3 rounded">
                        <h5 className="font-medium mb-1 text-white">Childcare</h5>
                        <p className="text-xs text-gray-400">Babysitting, school supplies</p>
                      </div>
                      <div className="bg-gray-800 p-3 rounded">
                        <h5 className="font-medium mb-1 text-white">Education</h5>
                        <p className="text-xs text-gray-400">Tutoring, books, school fees</p>
                      </div>
                      <div className="bg-gray-800 p-3 rounded">
                        <h5 className="font-medium mb-1 text-white">Skills & Services</h5>
                        <p className="text-xs text-gray-400">Professional services, repairs</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center gap-4">
                <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
                  Request Resource
                </Button>
                <Button className="bg-green-500 hover:bg-green-600 text-white">Offer Resource</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="offline" className="mt-6">
            <Card className="bg-gray-800 border-gray-700 text-white">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Wifi className="h-12 w-12 text-green-500" />
                </div>
                <CardTitle className="text-center text-2xl">Offline Access</CardTitle>
                <CardDescription className="text-center text-lg text-gray-400">
                  Access information even when offline through USSD services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2 text-white">How It Works</h3>
                    <p className="text-gray-300">
                      Our USSD service allows users without internet access to request information and receive
                      responses. This ensures that vital health and community resources are accessible to everyone,
                      regardless of connectivity.
                    </p>
                  </div>

                  <div className="border border-gray-700 rounded-lg p-4">
                    <h4 className="font-medium mb-2 text-white">USSD Menu Structure</h4>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li>
                        <strong>1. Health Services</strong>
                        <ul className="ml-4 mt-1 space-y-1">
                          <li>1.1. Health Tips</li>
                          <li>1.2. Appointment Booking</li>
                          <li>1.3. Find Health Facility</li>
                        </ul>
                      </li>
                      <li>
                        <strong>2. Mental Health</strong>
                        <ul className="ml-4 mt-1 space-y-1">
                          <li>2.1. Counseling Services</li>
                          <li>2.2. Support Groups</li>
                          <li>2.3. Crisis Support</li>
                        </ul>
                      </li>
                      <li>
                        <strong>3. Community Resources</strong>
                        <ul className="ml-4 mt-1 space-y-1">
                          <li>3.1. Find Resources</li>
                          <li>3.2. Request Resources</li>
                          <li>3.3. Offer Resources</li>
                        </ul>
                      </li>
                      <li>
                        <strong>4. Emergency Services</strong>
                        <ul className="ml-4 mt-1 space-y-1">
                          <li>4.1. Report Emergency</li>
                          <li>4.2. Emergency Contacts</li>
                        </ul>
                      </li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                      <h4 className="font-medium flex items-center mb-2 text-white">
                        <Search className="h-5 w-5 mr-2" />
                        Information Retrieval
                      </h4>
                      <p className="text-sm text-gray-300">
                        Access key health information, facility locations, and resource directories without internet
                        connectivity.
                      </p>
                    </div>

                    <div className="bg-gray-700/50 p-4 rounded-lg">
                      <h4 className="font-medium flex items-center mb-2 text-white">
                        <Share className="h-5 w-5 mr-2" />
                        Service Requests
                      </h4>
                      <p className="text-sm text-gray-300">
                        Submit requests for appointments, resources, or assistance through the USSD menu system.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button className="bg-green-500 hover:bg-green-600 text-white">Dial *123# for Offline Access</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

