"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Calendar, Check, Loader2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { InlineWidget } from "react-calendly"

type Facility = {
  id: string
  name: string
  type: string
  address: string
  services: string[]
}

type TimeSlot = {
  id: string
  time: string
  available: boolean
}

export function AppointmentBooking() {
  const [bookingStep, setBookingStep] = useState(1)
  const [selectedFacilityType, setSelectedFacilityType] = useState<string>("")
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null)
  const [selectedService, setSelectedService] = useState<string>("")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleCalendarLinked, setIsGoogleCalendarLinked] = useState(false)
  const [isBookingComplete, setIsBookingComplete] = useState(false)

  // Mock data for facilities
  const facilities: Facility[] = [
    {
      id: "1",
      name: "Central Community Hospital",
      type: "hospital",
      address: "123 Health St, Nairobi",
      services: ["General check-up", "Vaccination", "Prenatal care", "Child health", "Chronic disease management"],
    },
    {
      id: "2",
      name: "Family Health Clinic",
      type: "clinic",
      address: "456 Wellness Ave, Nairobi",
      services: ["General check-up", "Vaccination", "Women's health", "Pediatrics"],
    },
    {
      id: "3",
      name: "Specialized Care Center",
      type: "specialized",
      address: "789 Specialist Blvd, Nairobi",
      services: ["Cardiology", "Dermatology", "Orthopedics", "Ophthalmology", "ENT"],
    },
  ]

  // Mock time slots
  const timeSlots: TimeSlot[] = [
    { id: "1", time: "09:00 AM", available: true },
    { id: "2", time: "10:00 AM", available: true },
    { id: "3", time: "11:00 AM", available: false },
    { id: "4", time: "12:00 PM", available: true },
    { id: "5", time: "02:00 PM", available: true },
    { id: "6", time: "03:00 PM", available: true },
    { id: "7", time: "04:00 PM", available: false },
    { id: "8", time: "05:00 PM", available: true },
  ]

  const filteredFacilities = selectedFacilityType
    ? facilities.filter((facility) => facility.type === selectedFacilityType)
    : facilities

  const handleFacilitySelect = (facility: Facility) => {
    setSelectedFacility(facility)
    setSelectedService("")
    setBookingStep(2)
  }

  const handleServiceSelect = (service: string) => {
    setSelectedService(service)
    setBookingStep(3)
  }

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    if (date) {
      setBookingStep(4)
    }
  }

  const handleTimeSelect = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot)
    setBookingStep(5)
  }

  const handleConfirmBooking = () => {
    setIsLoading(true)

    // Simulate API call to book appointment
    setTimeout(() => {
      setIsLoading(false)
      setIsBookingComplete(true)
    }, 1500)
  }

  const handleLinkGoogleCalendar = () => {
    // In a real app, this would initiate OAuth flow with Google Calendar API
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsGoogleCalendarLinked(true)
    }, 1500)
  }

  const resetBooking = () => {
    setBookingStep(1)
    setSelectedFacilityType("")
    setSelectedFacility(null)
    setSelectedService("")
    setSelectedDate(undefined)
    setSelectedTimeSlot("")
    setIsBookingComplete(false)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-center mb-4">
          <Calendar className="h-12 w-12 text-green-600" />
        </div>
        <CardTitle className="text-center text-2xl">Appointment Booking</CardTitle>
        <CardDescription className="text-center text-lg">
          Book medical appointments using our guided booking system
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isBookingComplete ? (
          <div className="space-y-6">
            <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">How It Works</h3>
              <p className="mb-4">
                Our system will guide you through selecting a facility, service, and available time slot. You can also
                save your appointment to Google Calendar.
              </p>

              <div className="flex justify-between items-center mt-4">
                <div className={`flex flex-col items-center ${bookingStep >= 1 ? "text-green-600" : "text-gray-400"}`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${bookingStep >= 1 ? "bg-green-100 dark:bg-green-900" : "bg-gray-100 dark:bg-gray-800"}`}
                  >
                    {bookingStep > 1 ? <Check className="h-4 w-4" /> : "1"}
                  </div>
                  <span className="text-xs">Facility</span>
                </div>
                <div className="w-12 h-0.5 bg-gray-200 dark:bg-gray-700"></div>
                <div className={`flex flex-col items-center ${bookingStep >= 2 ? "text-green-600" : "text-gray-400"}`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${bookingStep >= 2 ? "bg-green-100 dark:bg-green-900" : "bg-gray-100 dark:bg-gray-800"}`}
                  >
                    {bookingStep > 2 ? <Check className="h-4 w-4" /> : "2"}
                  </div>
                  <span className="text-xs">Service</span>
                </div>
                <div className="w-12 h-0.5 bg-gray-200 dark:bg-gray-700"></div>
                <div className={`flex flex-col items-center ${bookingStep >= 3 ? "text-green-600" : "text-gray-400"}`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${bookingStep >= 3 ? "bg-green-100 dark:bg-green-900" : "bg-gray-100 dark:bg-gray-800"}`}
                  >
                    {bookingStep > 3 ? <Check className="h-4 w-4" /> : "3"}
                  </div>
                  <span className="text-xs">Date</span>
                </div>
                <div className="w-12 h-0.5 bg-gray-200 dark:bg-gray-700"></div>
                <div className={`flex flex-col items-center ${bookingStep >= 4 ? "text-green-600" : "text-gray-400"}`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${bookingStep >= 4 ? "bg-green-100 dark:bg-green-900" : "bg-gray-100 dark:bg-gray-800"}`}
                  >
                    {bookingStep > 4 ? <Check className="h-4 w-4" /> : "4"}
                  </div>
                  <span className="text-xs">Time</span>
                </div>
                <div className="w-12 h-0.5 bg-gray-200 dark:bg-gray-700"></div>
                <div className={`flex flex-col items-center ${bookingStep >= 5 ? "text-green-600" : "text-gray-400"}`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${bookingStep >= 5 ? "bg-green-100 dark:bg-green-900" : "bg-gray-100 dark:bg-gray-800"}`}
                  >
                    "5"
                  </div>
                  <span className="text-xs">Confirm</span>
                </div>
              </div>
            </div>

            {/* Step 1: Select Facility */}
            {bookingStep === 1 && (
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Step 1: Select a Facility</h3>

                <div className="mb-4">
                  <Label htmlFor="facility-type">Facility Type</Label>
                  <Select value={selectedFacilityType} onValueChange={setSelectedFacilityType}>
                    <SelectTrigger id="facility-type">
                      <SelectValue placeholder="Select facility type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Facilities</SelectItem>
                      <SelectItem value="hospital">Hospital</SelectItem>
                      <SelectItem value="clinic">Clinic</SelectItem>
                      <SelectItem value="specialized">Specialized Care</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  {filteredFacilities.map((facility) => (
                    <div
                      key={facility.id}
                      className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:border-green-500 dark:hover:border-green-500"
                      onClick={() => handleFacilitySelect(facility)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{facility.name}</h4>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            {facility.address}
                          </div>
                        </div>
                        <Badge className="capitalize">{facility.type}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Select Service */}
            {bookingStep === 2 && selectedFacility && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-lg">Step 2: Select a Service</h3>
                  <Button variant="ghost" size="sm" onClick={() => setBookingStep(1)}>
                    Change Facility
                  </Button>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4">
                  <h4 className="font-medium">{selectedFacility.name}</h4>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {selectedFacility.address}
                  </div>
                </div>

                <div className="space-y-3">
                  {selectedFacility.services.map((service) => (
                    <div
                      key={service}
                      className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:border-green-500 dark:hover:border-green-500"
                      onClick={() => handleServiceSelect(service)}
                    >
                      <h4 className="font-medium">{service}</h4>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Select Date */}
            {bookingStep === 3 && selectedFacility && selectedService && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-lg">Step 3: Select a Date</h3>
                  <Button variant="ghost" size="sm" onClick={() => setBookingStep(2)}>
                    Change Service
                  </Button>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4">
                  <h4 className="font-medium">{selectedFacility.name}</h4>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Service: {selectedService}</div>
                </div>

                <div className="flex justify-center">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    disabled={
                      (date) =>
                        date < new Date() ||
                        date.getDay() === 0 || // Sunday
                        date.getDay() === 6 // Saturday
                    }
                    className="rounded-md border"
                  />
                </div>
              </div>
            )}

            {/* Step 4: Select Time */}
            {bookingStep === 4 && selectedDate && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-lg">Step 4: Select a Time</h3>
                  <Button variant="ghost" size="sm" onClick={() => setBookingStep(3)}>
                    Change Date
                  </Button>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4">
                  <h4 className="font-medium">{selectedFacility?.name}</h4>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Service: {selectedService}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Date: {format(selectedDate, "PPP")}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map((slot) => (
                    <div
                      key={slot.id}
                      className={cn(
                        "p-3 border rounded-lg text-center",
                        slot.available
                          ? "cursor-pointer hover:border-green-500 dark:hover:border-green-500"
                          : "opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-800",
                        selectedTimeSlot === slot.time && "border-green-500 bg-green-50 dark:bg-green-900/30",
                      )}
                      onClick={() => slot.available && handleTimeSelect(slot.time)}
                    >
                      <div className="flex items-center justify-center">
                        <Clock className="h-4 w-4 mr-2" />
                        {slot.time}
                      </div>
                      {!slot.available && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Not available</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Confirm Booking */}
            {bookingStep === 5 && selectedTimeSlot && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-lg">Step 5: Confirm Booking</h3>
                  <Button variant="ghost" size="sm" onClick={() => setBookingStep(4)}>
                    Change Time
                  </Button>
                </div>

                <div className="p-6 border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-medium text-lg mb-4">Appointment Details</h4>

                  <div className="space-y-3">
                    <div className="flex">
                      <div className="w-24 font-medium">Facility:</div>
                      <div>{selectedFacility?.name}</div>
                    </div>
                    <div className="flex">
                      <div className="w-24 font-medium">Address:</div>
                      <div>{selectedFacility?.address}</div>
                    </div>
                    <div className="flex">
                      <div className="w-24 font-medium">Service:</div>
                      <div>{selectedService}</div>
                    </div>
                    <div className="flex">
                      <div className="w-24 font-medium">Date:</div>
                      <div>{selectedDate ? format(selectedDate, "PPP") : ""}</div>
                    </div>
                    <div className="flex">
                      <div className="w-24 font-medium">Time:</div>
                      <div>{selectedTimeSlot}</div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-green-200 dark:border-green-800">
                    <div className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        id="google-calendar"
                        className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                        checked={isGoogleCalendarLinked}
                        onChange={() => !isGoogleCalendarLinked && handleLinkGoogleCalendar()}
                        disabled={isGoogleCalendarLinked || isLoading}
                      />
                      <label htmlFor="google-calendar" className="ml-2 block text-sm">
                        Add to Google Calendar
                      </label>
                      {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                    </div>

                    <Button onClick={handleConfirmBooking} className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        "Confirm Appointment"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="p-6 border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>

              <h3 className="text-xl font-medium text-green-800 dark:text-green-300 mb-2">Appointment Confirmed!</h3>
              <p className="mb-6">Your appointment has been successfully booked.</p>

              <div className="space-y-3 text-left mb-6">
                <div className="flex">
                  <div className="w-24 font-medium">Facility:</div>
                  <div>{selectedFacility?.name}</div>
                </div>
                <div className="flex">
                  <div className="w-24 font-medium">Service:</div>
                  <div>{selectedService}</div>
                </div>
                <div className="flex">
                  <div className="w-24 font-medium">Date:</div>
                  <div>{selectedDate ? format(selectedDate, "PPP") : ""}</div>
                </div>
                <div className="flex">
                  <div className="w-24 font-medium">Time:</div>
                  <div>{selectedTimeSlot}</div>
                </div>
              </div>

              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p>A confirmation SMS has been sent to your phone.</p>
                {isGoogleCalendarLinked && (
                  <p className="mt-1">This appointment has been added to your Google Calendar.</p>
                )}
              </div>
            </div>

            <Button onClick={resetBooking} className="w-full">
              Book Another Appointment
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <div className="text-sm text-center text-gray-500 dark:text-gray-400">
          Need to cancel or reschedule? Text{" "}
          <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">CANCEL</span> or{" "}
          <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">RESCHEDULE</span> to 12345
        </div>
      </CardFooter>
    </Card>
  )
}

