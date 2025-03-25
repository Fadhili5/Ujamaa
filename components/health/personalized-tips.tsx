"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, ArrowRight } from "lucide-react"
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

export function PersonalizedTips() {
  const [healthProfile, setHealthProfile] = useState({
    age: "",
    gender: "",
    conditions: [],
    goals: [],
    preferences: {
      diet: "",
      exercise: "",
      sleepHours: "",
    },
  })

  const [personalizedTips, setPersonalizedTips] = useState<string[]>([])
  const [showPersonalizedTips, setShowPersonalizedTips] = useState(false)

  const handleProfileSubmit = () => {
    // In a real app, this would call an API to get personalized tips based on the profile
    const newTips = generatePersonalizedTips(healthProfile)
    setPersonalizedTips(newTips)
    setShowPersonalizedTips(true)
  }

  // Mock function to generate personalized tips based on profile
  const generatePersonalizedTips = (profile: any) => {
    const tips = []

    // Age-based tips
    if (profile.age && Number.parseInt(profile.age) > 50) {
      tips.push("Consider regular screenings for age-related conditions like colorectal cancer and osteoporosis.")
    } else if (profile.age && Number.parseInt(profile.age) > 30) {
      tips.push("At your age, regular exercise and stress management are key to preventing chronic conditions.")
    }

    // Gender-specific tips
    if (profile.gender === "female") {
      tips.push("Women should ensure adequate calcium and vitamin D intake for bone health.")
    } else if (profile.gender === "male") {
      tips.push("Men should be aware of heart health risks and consider regular cardiovascular check-ups.")
    }

    // Condition-specific tips
    if (profile.conditions.includes("diabetes")) {
      tips.push("Monitor your blood sugar levels regularly and maintain a consistent meal schedule.")
    }
    if (profile.conditions.includes("hypertension")) {
      tips.push("Reduce sodium intake and practice stress-reduction techniques to help manage blood pressure.")
    }

    // Goal-specific tips
    if (profile.goals.includes("weight_loss")) {
      tips.push("Create a calorie deficit through a combination of diet changes and increased physical activity.")
    }
    if (profile.goals.includes("better_sleep")) {
      tips.push("Establish a regular sleep schedule and avoid screens at least an hour before bedtime.")
    }

    // Diet preferences
    if (profile.preferences.diet === "vegetarian") {
      tips.push("Ensure you're getting enough protein from plant sources like beans, lentils, and tofu.")
    } else if (profile.preferences.diet === "low_carb") {
      tips.push("Focus on healthy fats and proteins while limiting refined carbohydrates.")
    }

    // Add some general tips if we don't have enough personalized ones
    if (tips.length < 3) {
      tips.push("Stay hydrated by drinking at least 8 glasses of water daily.")
      tips.push("Incorporate at least 30 minutes of moderate exercise into your daily routine.")
      tips.push("Practice mindfulness or meditation to reduce stress and improve mental wellbeing.")
    }

    return tips
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-center mb-4">
          <MessageSquare className="h-12 w-12 text-green-600" />
        </div>
        <CardTitle className="text-center text-2xl">Health Tips & Reminders</CardTitle>
        <CardDescription className="text-center text-lg">
          Receive personalized health tips and set reminders via SMS
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {!showPersonalizedTips ? (
            <>
              <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Get Personalized Health Tips</h3>
                <p className="mb-4">
                  Complete your health profile to receive tips tailored to your specific health needs, goals, and
                  preferences.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">Create Your Health Profile</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Health Profile</DialogTitle>
                      <DialogDescription>
                        Fill out your health information to receive personalized tips.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="age" className="text-right">
                          Age
                        </Label>
                        <Input
                          id="age"
                          type="number"
                          className="col-span-3"
                          value={healthProfile.age}
                          onChange={(e) => setHealthProfile({ ...healthProfile, age: e.target.value })}
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="gender" className="text-right">
                          Gender
                        </Label>
                        <Select
                          value={healthProfile.gender}
                          onValueChange={(value) => setHealthProfile({ ...healthProfile, gender: value })}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Conditions</Label>
                        <div className="col-span-3 space-y-2">
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="diabetes"
                              checked={healthProfile.conditions.includes("diabetes")}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setHealthProfile({
                                    ...healthProfile,
                                    conditions: [...healthProfile.conditions, "diabetes"],
                                  })
                                } else {
                                  setHealthProfile({
                                    ...healthProfile,
                                    conditions: healthProfile.conditions.filter((c) => c !== "diabetes"),
                                  })
                                }
                              }}
                            />
                            <Label htmlFor="diabetes">Diabetes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="hypertension"
                              checked={healthProfile.conditions.includes("hypertension")}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setHealthProfile({
                                    ...healthProfile,
                                    conditions: [...healthProfile.conditions, "hypertension"],
                                  })
                                } else {
                                  setHealthProfile({
                                    ...healthProfile,
                                    conditions: healthProfile.conditions.filter((c) => c !== "hypertension"),
                                  })
                                }
                              }}
                            />
                            <Label htmlFor="hypertension">Hypertension</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="asthma"
                              checked={healthProfile.conditions.includes("asthma")}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setHealthProfile({
                                    ...healthProfile,
                                    conditions: [...healthProfile.conditions, "asthma"],
                                  })
                                } else {
                                  setHealthProfile({
                                    ...healthProfile,
                                    conditions: healthProfile.conditions.filter((c) => c !== "asthma"),
                                  })
                                }
                              }}
                            />
                            <Label htmlFor="asthma">Asthma</Label>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Goals</Label>
                        <div className="col-span-3 space-y-2">
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="weight_loss"
                              checked={healthProfile.goals.includes("weight_loss")}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setHealthProfile({ ...healthProfile, goals: [...healthProfile.goals, "weight_loss"] })
                                } else {
                                  setHealthProfile({
                                    ...healthProfile,
                                    goals: healthProfile.goals.filter((g) => g !== "weight_loss"),
                                  })
                                }
                              }}
                            />
                            <Label htmlFor="weight_loss">Weight Loss</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="better_sleep"
                              checked={healthProfile.goals.includes("better_sleep")}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setHealthProfile({
                                    ...healthProfile,
                                    goals: [...healthProfile.goals, "better_sleep"],
                                  })
                                } else {
                                  setHealthProfile({
                                    ...healthProfile,
                                    goals: healthProfile.goals.filter((g) => g !== "better_sleep"),
                                  })
                                }
                              }}
                            />
                            <Label htmlFor="better_sleep">Better Sleep</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="stress_reduction"
                              checked={healthProfile.goals.includes("stress_reduction")}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setHealthProfile({
                                    ...healthProfile,
                                    goals: [...healthProfile.goals, "stress_reduction"],
                                  })
                                } else {
                                  setHealthProfile({
                                    ...healthProfile,
                                    goals: healthProfile.goals.filter((g) => g !== "stress_reduction"),
                                  })
                                }
                              }}
                            />
                            <Label htmlFor="stress_reduction">Stress Reduction</Label>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="diet" className="text-right">
                          Diet
                        </Label>
                        <Select
                          value={healthProfile.preferences.diet}
                          onValueChange={(value) =>
                            setHealthProfile({
                              ...healthProfile,
                              preferences: { ...healthProfile.preferences, diet: value },
                            })
                          }
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select diet" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="regular">Regular</SelectItem>
                            <SelectItem value="vegetarian">Vegetarian</SelectItem>
                            <SelectItem value="vegan">Vegan</SelectItem>
                            <SelectItem value="low_carb">Low Carb</SelectItem>
                            <SelectItem value="keto">Keto</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" onClick={handleProfileSubmit}>
                        Get Personalized Tips
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-6">
                <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">How It Works</h3>
                  <p>
                    Subscribe to receive regular SMS messages with health tips on nutrition, hygiene, exercise, and
                    preventive care. You'll also get reminders for vaccination schedules, check-ups, and prescription
                    refills.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h4 className="font-medium mb-2">SMS Commands</h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">TIP</span> - Receive
                        a random health tip
                      </li>
                      <li>
                        <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">NUTRITION</span> -
                        Get nutrition advice
                      </li>
                      <li>
                        <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">EXERCISE</span> -
                        Receive exercise tips
                      </li>
                      <li>
                        <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">REMINDER</span> - Set
                        a medication reminder
                      </li>
                    </ul>
                  </div>

                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Subscription Options</h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                          SUBSCRIBE DAILY
                        </span>{" "}
                        - Daily health tips
                      </li>
                      <li>
                        <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                          SUBSCRIBE WEEKLY
                        </span>{" "}
                        - Weekly health tips
                      </li>
                      <li>
                        <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">UNSUBSCRIBE</span> -
                        Stop receiving tips
                      </li>
                      <li>
                        <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">HELP</span> - Get
                        list of all commands
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-6">
              <div className="bg-green-100 dark:bg-green-800/30 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-4 text-green-800 dark:text-green-300">
                  Your Personalized Health Tips
                </h3>
                <ul className="space-y-4">
                  {personalizedTips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <p>{tip}</p>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-4 border-t border-green-200 dark:border-green-700">
                  <p className="text-sm text-green-700 dark:text-green-400">
                    These tips are personalized based on your health profile. Update your profile anytime to receive new
                    recommendations.
                  </p>
                </div>
              </div>

              <Button variant="outline" onClick={() => setShowPersonalizedTips(false)} className="w-full">
                View General Health Tips
              </Button>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button className="w-full md:w-auto">Subscribe to Health Tips</Button>
      </CardFooter>
    </Card>
  )
}

