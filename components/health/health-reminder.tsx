"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Plus, Trash2, Calendar, Clock } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

type Reminder = {
  id: string
  title: string
  type: string
  time: string
  days: string[]
  active: boolean
}

export function HealthReminder() {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: "1",
      title: "Take Blood Pressure Medication",
      type: "medication",
      time: "08:00",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      active: true,
    },
    {
      id: "2",
      title: "Check Blood Sugar",
      type: "checkup",
      time: "07:30",
      days: ["Monday", "Wednesday", "Friday"],
      active: true,
    },
  ])

  const [newReminder, setNewReminder] = useState<Omit<Reminder, "id" | "active">>({
    title: "",
    type: "medication",
    time: "08:00",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddReminder = () => {
    const reminder: Reminder = {
      ...newReminder,
      id: Date.now().toString(),
      active: true,
    }

    setReminders([...reminders, reminder])
    setNewReminder({
      title: "",
      type: "medication",
      time: "08:00",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    })
    setIsDialogOpen(false)
  }

  const handleDeleteReminder = (id: string) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id))
  }

  const handleToggleReminder = (id: string) => {
    setReminders(
      reminders.map((reminder) => (reminder.id === id ? { ...reminder, active: !reminder.active } : reminder)),
    )
  }

  const getDayLabel = (day: string) => day.substring(0, 3)

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "medication":
        return "Medication"
      case "checkup":
        return "Check-up"
      case "appointment":
        return "Appointment"
      case "exercise":
        return "Exercise"
      case "water":
        return "Water Intake"
      default:
        return type
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "medication":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "checkup":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "appointment":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "exercise":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "water":
        return "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-center mb-4">
          <Bell className="h-12 w-12 text-green-600" />
        </div>
        <CardTitle className="text-center text-2xl">Health Reminders</CardTitle>
        <CardDescription className="text-center text-lg">
          Set up personalized reminders for medications, check-ups, and healthy habits
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Your Health Reminders</h3>
            <p className="mb-4">
              Create reminders for medications, check-ups, and healthy habits. You'll receive SMS notifications at your
              scheduled times.
            </p>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full flex items-center justify-center">
                  <Plus className="mr-2 h-4 w-4" /> Add New Reminder
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create Health Reminder</DialogTitle>
                  <DialogDescription>
                    Set up a new health reminder. You'll receive SMS notifications at the scheduled times.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="title"
                      placeholder="Take medication"
                      className="col-span-3"
                      value={newReminder.title}
                      onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      Type
                    </Label>
                    <Select
                      value={newReminder.type}
                      onValueChange={(value) => setNewReminder({ ...newReminder, type: value })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="medication">Medication</SelectItem>
                        <SelectItem value="checkup">Check-up</SelectItem>
                        <SelectItem value="appointment">Appointment</SelectItem>
                        <SelectItem value="exercise">Exercise</SelectItem>
                        <SelectItem value="water">Water Intake</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="time" className="text-right">
                      Time
                    </Label>
                    <Input
                      id="time"
                      type="time"
                      className="col-span-3"
                      value={newReminder.time}
                      onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label className="text-right pt-2">Days</Label>
                    <div className="col-span-3 space-y-2">
                      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                        <div key={day} className="flex items-center space-x-2">
                          <Switch
                            id={`day-${day}`}
                            checked={newReminder.days.includes(day)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setNewReminder({ ...newReminder, days: [...newReminder.days, day] })
                              } else {
                                setNewReminder({ ...newReminder, days: newReminder.days.filter((d) => d !== day) })
                              }
                            }}
                          />
                          <Label htmlFor={`day-${day}`}>{day}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleAddReminder}>
                    Create Reminder
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {reminders.length === 0 ? (
              <div className="text-center p-6 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400">No reminders yet. Add your first reminder above.</p>
              </div>
            ) : (
              reminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className={`p-4 border rounded-lg ${reminder.active ? "border-green-200 dark:border-green-800" : "border-gray-200 dark:border-gray-700 opacity-60"}`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h4
                          className={`font-medium ${reminder.active ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}
                        >
                          {reminder.title}
                        </h4>
                        <Badge className={`${getTypeColor(reminder.type)}`}>{getTypeLabel(reminder.type)}</Badge>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {reminder.time}
                        </div>
                        <div className="flex items-center flex-wrap">
                          <Calendar className="h-4 w-4 mr-1" />
                          {reminder.days.length === 7 ? (
                            <span>Every day</span>
                          ) : (
                            <div className="flex flex-wrap">
                              {reminder.days.map((day) => (
                                <span key={day} className="mr-1">
                                  {getDayLabel(day)}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch checked={reminder.active} onCheckedChange={() => handleToggleReminder(reminder.id)} />
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteReminder(reminder.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
            <h4 className="font-medium mb-2">SMS Reminder Commands</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">LIST REMINDERS</span> - View
                all your active reminders
              </li>
              <li>
                <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">PAUSE [REMINDER ID]</span> -
                Temporarily pause a reminder
              </li>
              <li>
                <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">RESUME [REMINDER ID]</span> -
                Resume a paused reminder
              </li>
              <li>
                <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">DELETE [REMINDER ID]</span> -
                Delete a reminder
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button className="w-full md:w-auto">Sync Reminders with Calendar</Button>
      </CardFooter>
    </Card>
  )
}

