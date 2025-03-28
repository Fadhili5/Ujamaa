"use client"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PhoneCall, Users, MessageSquare, Shield } from "lucide-react"
import { JaaSMeeting } from "@/components/mental-health/JaaSMeeting"

export default function MentalHealthPage() {
  const { register, handleSubmit, reset } = useForm()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [currentGroup, setCurrentGroup] = useState(null)
  const [chatMessages, setChatMessages] = useState([])

  const onJoinGroup = async (data: any) => {
    setLoading(true)
    setMessage("")
    try {
      const response = await fetch("/api/join-group", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (result.success) {
        setMessage("Joined group successfully!")
        setCurrentGroup(data.group)
        reset()
      } else {
        setMessage("Failed to join group.")
      }
    } catch (error) {
      setMessage("An error occurred.")
    } finally {
      setLoading(false)
    }
  }

  const onSendMessage = async (data: any) => {
    setLoading(true)
    setMessage("")
    try {
      const response = await fetch("/api/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, group: currentGroup }),
      })
      const result = await response.json()
      if (result.success) {
        setChatMessages([...chatMessages, { message: data.message, sender: "You" }])
        reset()
      } else {
        setMessage("Failed to send message.")
      }
    } catch (error) {
      setMessage("An error occurred.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    console.log('Component mounted')
  }, [])

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
              <Link href="/" className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400">
                Home
              </Link>
              <Link href="/health" className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400">
                Health
              </Link>
              <Link href="/mental-health" className="text-purple-600 dark:text-purple-400 font-medium">
                Mental Health
              </Link>
              <Link href="/resources" className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400">
                Resources
              </Link>
              <Link href="/emergency" className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400">
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

                  <div className="mt-6">
                    <JaaSMeeting
                      appId="vpaas-magic-cookie-e4cf906708564344b7de31914d78c35e"
                      roomName="PleaseUseAGoodRoomName"
                      jwt="eyJraWQiOiJ2cGFhcy1tYWdpYy1jb29raWUtZTRjZjkwNjcwODU2NDM0NGI3ZGUzMTkxNGQ3OGMzNWUvY2NjY2E5LVNBTVBMRV9BUFAiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJqaXRzaSIsImlzcyI6ImNoYXQiLCJpYXQiOjE3NDI5OTU2NTUsImV4cCI6MTc0MzAwMjg1NSwibmJmIjoxNzQyOTk1NjUwLCJzdWIiOiJ2cGFhcy1tYWdpYy1jb29raWUtZTRjZjkwNjcwODU2NDM0NGI3ZGUzMTkxNGQ3OGMzNWUiLCJjb250ZXh0Ijp7ImZlYXR1cmVzIjp7ImxpdmVzdHJlYW1pbmciOnRydWUsIm91dGJvdW5kLWNhbGwiOnRydWUsInNpcC1vdXRib3VuZC1jYWxsIjpmYWxzZSwidHJhbnNjcmlwdGlvbiI6dHJ1ZSwicmVjb3JkaW5nIjp0cnVlfSwidXNlciI6eyJoaWRkZW4tZnJvbS1yZWNvcmRlciI6ZmFsc2UsIm1vZGVyYXRvciI6dHJ1ZSwibmFtZSI6ImRlbmlzZmFkaGlsaTUiLCJpZCI6Imdvb2dsZS1vYXV0aDJ8MTA3NDg0MjgwMDAxMjM1ODI4NTM0IiwiYXZhdGFyIjoiIiwiZW1haWwiOiJkZW5pc2ZhZGhpbGk1QGdtYWlsLmNvbSJ9fSwicm9vbSI6IioifQ.fnZfgsJdgCucn_wACiex0BlyG20vCJ2Y1NCw0koO8LzztgL5DHDN2Wypph72CFTSFCLbplIS4P786AfFTS4U1Dg-ri2C3OM0glVo2WPdqz2xa6Me9HJnDbbJjVnW8ddPfBjDwy8smnMZeJ54j2EmGLKRFlWtp2lIEzZ5a5MsOehNPok_HrhFv5WQqf6QjoVkdUyTYnOmYtXX2xCcOmpun21_D47UZlkCezQXcAzI4HEnEZCk_SXZZ1oYHN7tiGWOR3RkzBMqDlHS1uFbamBijnpnqQsS9G0snuruPeIaCItR1SOFRyzcCj9ce4I_fkl-W_kpJVVx0vj_v3zKWpzpCQ"
                      configOverwrite={{
                        disableLocalVideoFlip: true,
                        backgroundAlpha: 0.5,
                      }}
                      interfaceConfigOverwrite={{
                        VIDEO_LAYOUT_FIT: "nocrop",
                        MOBILE_APP_PROMO: false,
                        TILE_VIEW_MAX_COLUMNS: 4,
                      }}
                      spinner={<div>Loading...</div>}
                      onApiReady={(externalApi) => {
                        console.log("JitsiMeetExternalAPI is ready", externalApi)
                      }}
                    />
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
                      <h4 className="font-medium mb-2">Join a Group</h4>
                      <form onSubmit={handleSubmit(onJoinGroup)} className="space-y-4">
                        <select
                          {...register("group", { required: true })}
                          className="w-full p-2 border border-gray-300 rounded"
                        >
                          <option value="">Select a group</option>
                          <option value="Anxiety Support">Anxiety Support</option>
                          <option value="Depression Support">Depression Support</option>
                          <option value="Grief & Loss">Grief & Loss</option>
                          <option value="Trauma Survivors">Trauma Survivors</option>
                          <option value="Youth Mental Health">Youth Mental Health</option>
                          <option value="Family Support">Family Support</option>
                        </select>
                        <Button type="submit" className="w-full sm:w-auto" disabled={loading}>
                          {loading ? "Joining..." : "Join Group"}
                        </Button>
                      </form>
                      {message && <p className="text-center mt-4">{message}</p>}
                    </div>
                  </div>

                  {currentGroup && (
                    <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Group Chat - {currentGroup}</h4>
                      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4 h-64 overflow-y-auto">
                        {chatMessages.map((msg, index) => (
                          <div key={index} className="mb-2">
                            <strong>{msg.sender}:</strong> {msg.message}
                          </div>
                        ))}
                      </div>
                      <form onSubmit={handleSubmit(onSendMessage)} className="space-y-4">
                        <textarea
                          {...register("message", { required: true })}
                          placeholder="Type your message..."
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                        <Button type="submit" className="w-full sm:w-auto" disabled={loading}>
                          {loading ? "Sending..." : "Send Message"}
                        </Button>
                      </form>
                    </div>
                  )}
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