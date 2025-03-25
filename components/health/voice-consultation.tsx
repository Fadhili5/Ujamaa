"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PhoneCall, User, BotIcon as Robot, MessageSquare, Loader2, Check } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Specialist = {
  id: string
  name: string
  specialty: string
  experience: string
  availability: string
  avatar: string
}

export function VoiceConsultation() {
  const [consultationType, setConsultationType] = useState<"voice-agent" | "human-agent" | null>(null)
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("")
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist | null>(null)
  const [consultationReason, setConsultationReason] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [isConsultationScheduled, setIsConsultationScheduled] = useState(false)
  const [contactMethod, setContactMethod] = useState<"phone" | "chat" | null>(null)

  // Mock data for specialists
  const specialists: Specialist[] = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      specialty: "General Medicine",
      experience: "10 years",
      availability: "Mon, Wed, Fri",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      specialty: "Cardiology",
      experience: "15 years",
      availability: "Tue, Thu",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "3",
      name: "Dr. Amina Osei",
      specialty: "Pediatrics",
      experience: "8 years",
      availability: "Mon, Tue, Thu",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "4",
      name: "Dr. James Mwangi",
      specialty: "Mental Health",
      experience: "12 years",
      availability: "Wed, Fri",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "5",
      name: "Dr. Fatima Hassan",
      specialty: "Women's Health",
      experience: "9 years",
      availability: "Mon, Wed, Fri",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  ]

  const filteredSpecialists = selectedSpecialty
    ? specialists.filter((specialist) => specialist.specialty === selectedSpecialty)
    : specialists

  const handleVoiceAgentConsultation = () => {
    setConsultationType("voice-agent")
  }

  const handleHumanAgentConsultation = () => {
    setConsultationType("human-agent")
  }

  const handleSpecialistSelect = (specialist: Specialist) => {
    setSelectedSpecialist(specialist)
  }

  const handleScheduleConsultation = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsConsultationScheduled(true)
    }, 1500)
  }

  const resetConsultation = () => {
    setConsultationType(null)
    setSelectedSpecialty("")
    setSelectedSpecialist(null)
    setConsultationReason("")
    setIsConsultationScheduled(false)
    setContactMethod(null)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-center mb-4">
          <PhoneCall className="h-12 w-12 text-green-600" />
        </div>
        <CardTitle className="text-center text-2xl">Voice Call Consultations</CardTitle>
        <CardDescription className="text-center text-lg">
          Speak with healthcare professionals via voice calls or chat
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!consultationType ? (
          <div className="space-y-6">
            <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">How It Works</h3>
              <p>
                Choose between an AI voice agent for basic health questions or a human healthcare professional for
                personalized consultations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:border-green-500 dark:hover:border-green-500 transition-colors"
                onClick={handleVoiceAgentConsultation}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                    <Robot className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                <h4 className="font-medium text-lg text-center mb-2">AI Voice Agent</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>Available 24/7 for immediate assistance</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>Get answers to general health questions</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>Symptom assessment and guidance</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>Medication information and reminders</span>
                  </li>
                </ul>
              </div>

              <div
                className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:border-green-500 dark:hover:border-green-500 transition-colors"
                onClick={handleHumanAgentConsultation}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <h4 className="font-medium text-lg text-center mb-2">Human Specialist</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>Consult with licensed healthcare professionals</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>Personalized medical advice</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>Choose your preferred specialist</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>Option for voice call or chat consultation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : consultationType === "voice-agent" ? (
          <div className="space-y-6">
            {!isConsultationScheduled ? (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-lg">AI Voice Agent Consultation</h3>
                  <Button variant="ghost" size="sm" onClick={resetConsultation}>
                    Back
                  </Button>
                </div>

                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 rounded-lg">
                  <h4 className="font-medium mb-2 flex items-center">
                    <Robot className="h-5 w-5 mr-2 text-purple-600" />
                    About AI Voice Agent
                  </h4>
                  <p className="text-sm mb-4">
                    Our AI voice agent uses advanced technology from Eleven Labs to provide natural-sounding voice
                    interactions. It can help with general health questions, symptom assessment, and medication
                    information.
                  </p>
                  <div className="text-sm text-purple-700 dark:text-purple-300">
                    <p className="font-medium">
                      Note: The AI voice agent is not a substitute for professional medical advice. For serious health
                      concerns, please consult with a human healthcare professional.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="consultation-reason">What would you like to discuss?</Label>
                    <Textarea
                      id="consultation-reason"
                      placeholder="Describe your health concern or question..."
                      className="mt-1"
                      rows={4}
                      value={consultationReason}
                      onChange={(e) => setConsultationReason(e.target.value)}
                    />
                  </div>

                  <Button
                    onClick={handleScheduleConsultation}
                    className="w-full"
                    disabled={!consultationReason || isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      "Start Voice Consultation Now"
                    )}
                  </Button>
                </div>
              </>
            ) : (
              <div className="space-y-6">
                <div className="p-6 border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>

                  <h3 className="text-xl font-medium text-green-800 dark:text-green-300 mb-2">
                    Voice Consultation Ready!
                  </h3>
                  <p className="mb-6">Your AI voice agent is ready to assist you.</p>

                  <div className="space-y-3 text-left mb-6">
                    <div className="flex">
                      <div className="w-24 font-medium">Topic:</div>
                      <div>{consultationReason}</div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <p>You can start speaking after the tone. The AI will respond to your questions in real-time.</p>
                  </div>

                  <Button className="w-full">Call Now (0800-UJAMAA)</Button>
                </div>

                <Button variant="outline" onClick={resetConsultation} className="w-full">
                  Start Over
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {!isConsultationScheduled ? (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-lg">Human Specialist Consultation</h3>
                  <Button variant="ghost" size="sm" onClick={resetConsultation}>
                    Back
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="specialty">Select Specialty</Label>
                    <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                      <SelectTrigger id="specialty">
                        <SelectValue placeholder="Select specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Specialties</SelectItem>
                        <SelectItem value="General Medicine">General Medicine</SelectItem>
                        <SelectItem value="Cardiology">Cardiology</SelectItem>
                        <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                        <SelectItem value="Mental Health">Mental Health</SelectItem>
                        <SelectItem value="Women's Health">Women's Health</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label>Select a Specialist</Label>
                    {filteredSpecialists.map((specialist) => (
                      <div
                        key={specialist.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedSpecialist?.id === specialist.id
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                            : "border-gray-200 dark:border-gray-700 hover:border-blue-500"
                        }`}
                        onClick={() => handleSpecialistSelect(specialist)}
                      >
                        <div className="flex items-center">
                          <Avatar className="h-12 w-12 mr-4">
                            <AvatarImage src={specialist.avatar} alt={specialist.name} />
                            <AvatarFallback>
                              {specialist.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{specialist.name}</h4>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {specialist.specialty} • {specialist.experience} experience
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              Available: {specialist.availability}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedSpecialist && (
                    <>
                      <div>
                        <Label htmlFor="consultation-reason">Reason for Consultation</Label>
                        <Textarea
                          id="consultation-reason"
                          placeholder="Describe your health concern or question..."
                          className="mt-1"
                          rows={3}
                          value={consultationReason}
                          onChange={(e) => setConsultationReason(e.target.value)}
                        />
                      </div>

                      <div>
                        <Label>Contact Method</Label>
                        <RadioGroup
                          value={contactMethod || ""}
                          onValueChange={(value) => setContactMethod(value as "phone" | "chat")}
                          className="mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="phone" id="phone" />
                            <Label htmlFor="phone" className="flex items-center">
                              <PhoneCall className="h-4 w-4 mr-2" />
                              Voice Call
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="chat" id="chat" />
                            <Label htmlFor="chat" className="flex items-center">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Chat
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <Button
                        onClick={handleScheduleConsultation}
                        className="w-full"
                        disabled={!consultationReason || !contactMethod || isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Scheduling...
                          </>
                        ) : (
                          "Schedule Consultation"
                        )}
                      </Button>
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className="space-y-6">
                <div className="p-6 border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>

                  <h3 className="text-xl font-medium text-green-800 dark:text-green-300 mb-2">
                    Consultation Scheduled!
                  </h3>
                  <p className="mb-6">Your consultation with a specialist has been scheduled.</p>

                  <div className="space-y-3 text-left mb-6">
                    <div className="flex">
                      <div className="w-24 font-medium">Specialist:</div>
                      <div>{selectedSpecialist?.name}</div>
                    </div>
                    <div className="flex">
                      <div className="w-24 font-medium">Specialty:</div>
                      <div>{selectedSpecialist?.specialty}</div>
                    </div>
                    <div className="flex">
                      <div className="w-24 font-medium">Method:</div>
                      <div>{contactMethod === "phone" ? "Voice Call" : "Chat"}</div>
                    </div>
                    <div className="flex">
                      <div className="w-24 font-medium">Reason:</div>
                      <div>{consultationReason}</div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {contactMethod === "phone" ? (
                      <p>You will receive a call from the specialist within the next 30 minutes.</p>
                    ) : (
                      <p>You can start chatting with the specialist by clicking the button below.</p>
                    )}
                  </div>

                  {contactMethod === "phone" ? (
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                      <p className="font-medium text-blue-800 dark:text-blue-300 text-lg">
                        {selectedSpecialist?.name}'s Contact
                      </p>
                      <p className="text-blue-700 dark:text-blue-400 text-xl font-mono mt-1">+254 712 345 678</p>
                    </div>
                  ) : (
                    <Button className="w-full">Start Chat Now</Button>
                  )}
                </div>

                <Button variant="outline" onClick={resetConsultation} className="w-full">
                  Schedule Another Consultation
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <div className="text-sm text-center text-gray-500 dark:text-gray-400">
          For emergencies, please call your local emergency services immediately.
        </div>
      </CardFooter>
    </Card>
  )
}

