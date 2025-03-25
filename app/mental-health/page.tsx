import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PhoneCall, Users, MessageSquare, Shield } from "lucide-react"

export default function MentalHealthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
      <header className="bg-white dark:bg-gray-950 shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Link href="/">
                <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">U</span>
                </div>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Ujamaa Mental Health</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link
                href="/"
                className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
              >
                Home
              </Link>
              <Link
                href="/health"
                className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
              >
                Health
              </Link>
              <Link href="/mental-health" className="text-purple-600 dark:text-purple-400 font-medium">
                Mental Health
              </Link>
              <Link
                href="/resources"
                className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
              >
                Resources
              </Link>
              <Link
                href="/emergency"
                className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
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
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Mental Health Support</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Access confidential counseling, support groups, and real-time chat support
          </p>
        </div>

        <Tabs defaultValue="counseling" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="counseling">Anonymous Counseling</TabsTrigger>
            <TabsTrigger value="groups">Support Groups</TabsTrigger>
            <TabsTrigger value="chat">Real-Time Chat Support</TabsTrigger>
          </TabsList>

          <TabsContent value="counseling" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <PhoneCall className="h-12 w-12 text-purple-600" />
                </div>
                <CardTitle className="text-center text-2xl">Anonymous Counseling</CardTitle>
                <CardDescription className="text-center text-lg">
                  Access confidential counseling through encrypted voice calls
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">How It Works</h3>
                    <p>
                      Connect with licensed mental health professionals through anonymous, encrypted voice calls.
                      Discuss your concerns in a safe, judgment-free environment without revealing your identity.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Available Services</h4>
                      <ul className="space-y-2 text-sm">
                        <li>
                          <strong>Crisis Intervention</strong> - Immediate support during difficult times
                        </li>
                        <li>
                          <strong>Anxiety Management</strong> - Techniques to manage anxiety and stress
                        </li>
                        <li>
                          <strong>Depression Support</strong> - Guidance for coping with depression
                        </li>
                        <li>
                          <strong>Trauma Counseling</strong> - Support for processing traumatic experiences
                        </li>
                        <li>
                          <strong>General Mental Wellness</strong> - Maintaining good mental health
                        </li>
                      </ul>
                    </div>

                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <h4 className="font-medium mb-2">How to Access</h4>
                      <ol className="space-y-1 text-sm list-decimal list-inside">
                        <li>
                          Call{" "}
                          <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">0800-UJAMAA</span>
                        </li>
                        <li>Select option 3 for Mental Health Services</li>
                        <li>Choose option 1 for Anonymous Counseling</li>
                        <li>Select your preferred counseling type</li>
                        <li>You'll be connected to an available counselor</li>
                      </ol>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg flex items-start">
                    <Shield className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0 text-blue-600" />
                    <div>
                      <h4 className="font-medium mb-1">Privacy & Confidentiality</h4>
                      <p className="text-sm">
                        Your privacy is our priority. All calls are encrypted and anonymized. Counselors do not have
                        access to your phone number or personal information unless you choose to share it.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button className="w-full md:w-auto">Call for Counseling</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="groups" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Users className="h-12 w-12 text-purple-600" />
                </div>
                <CardTitle className="text-center text-2xl">Support Groups</CardTitle>
                <CardDescription className="text-center text-lg">
                  Receive notifications about support group meetings via SMS
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">How It Works</h3>
                    <p>
                      Subscribe to receive regular updates about support group sessions for issues such as anxiety,
                      depression, grief, and other mental health concerns. Connect with others who understand what
                      you're going through.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Available Groups</h4>
                      <ul className="space-y-2 text-sm">
                        <li>
                          <strong>Anxiety Support</strong> - Managing anxiety and panic disorders
                        </li>
                        <li>
                          <strong>Depression Support</strong> - Coping with depression
                        </li>
                        <li>
                          <strong>Grief & Loss</strong> - Processing grief and loss
                        </li>
                        <li>
                          <strong>Trauma Survivors</strong> - Support for trauma survivors
                        </li>
                        <li>
                          <strong>Youth Mental Health</strong> - For young people ages 15-24
                        </li>
                        <li>
                          <strong>Family Support</strong> - For families of those with mental health challenges
                        </li>
                      </ul>
                    </div>

                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <h4 className="font-medium mb-2">SMS Commands</h4>
                      <ul className="space-y-2 text-sm">
                        <li>
                          <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">GROUP LIST</span> -
                          View all available groups
                        </li>
                        <li>
                          <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                            JOIN [GROUP NAME]
                          </span>{" "}
                          - Subscribe to a group
                        </li>
                        <li>
                          <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                            LEAVE [GROUP NAME]
                          </span>{" "}
                          - Unsubscribe from a group
                        </li>
                        <li>
                          <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">MEETINGS</span> -
                          View upcoming meetings
                        </li>
                        <li>
                          <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                            REMIND [MEETING ID]
                          </span>{" "}
                          - Set reminder for a meeting
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Meeting Formats</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                      <div className="bg-white dark:bg-gray-800 p-3 rounded">
                        <h5 className="font-medium mb-1">In-Person</h5>
                        <p>Face-to-face meetings at community centers and health facilities</p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-3 rounded">
                        <h5 className="font-medium mb-1">Voice Conference</h5>
                        <p>Join via phone call with a provided access code</p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-3 rounded">
                        <h5 className="font-medium mb-1">SMS Group Chat</h5>
                        <p>Text-based group discussions via SMS</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button className="w-full md:w-auto">Subscribe to a Group</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="chat" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <MessageSquare className="h-12 w-12 text-purple-600" />
                </div>
                <CardTitle className="text-center text-2xl">Real-Time Chat Support</CardTitle>
                <CardDescription className="text-center text-lg">
                  Connect with mental health counselors through chat
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">How It Works</h3>
                    <p>
                      Access immediate support through our text-based chat feature. Connect with trained mental health
                      counselors who can provide guidance, resources, and support in real-time.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Chat Features</h4>
                      <ul className="space-y-2 text-sm">
                        <li>
                          <strong>24/7 Availability</strong> - Support whenever you need it
                        </li>
                        <li>
                          <strong>Resource Sharing</strong> - Receive helpful resources and exercises
                        </li>
                        <li>
                          <strong>Crisis Intervention</strong> - Immediate support during difficult moments
                        </li>
                        <li>
                          <strong>Follow-up Options</strong> - Schedule additional support as needed
                        </li>
                        <li>
                          <strong>Anonymous Option</strong> - Chat without sharing personal details
                        </li>
                      </ul>
                    </div>

                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <h4 className="font-medium mb-2">How to Access</h4>
                      <ul className="space-y-2 text-sm">
                        <li>
                          <strong>Via SMS</strong> - Text{" "}
                          <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">CHAT</span> to
                          *123# to start a chat session
                        </li>
                        <li>
                          <strong>Via USSD</strong> - Dial *123#, select option 3, then option 3 again for chat support
                        </li>
                        <li>
                          <strong>Via Web</strong> - Access the chat feature on the Ujamaa website when internet is
                          available
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">What to Expect</h4>
                    <ol className="space-y-1 text-sm list-decimal list-inside">
                      <li>You'll be connected with a trained counselor within minutes</li>
                      <li>The counselor will introduce themselves and ask how they can help</li>
                      <li>Share as much or as little as you feel comfortable with</li>
                      <li>The counselor will provide support, guidance, and resources</li>
                      <li>You can end the chat at any time or request a follow-up</li>
                    </ol>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button className="w-full md:w-auto">Start Chat Support</Button>
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

