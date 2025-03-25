import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { healthProfile } = data

    // Generate personalized health tips based on the user's health profile
    const tips = await generatePersonalizedTips(healthProfile)

    return NextResponse.json({
      success: true,
      tips,
    })
  } catch (error) {
    console.error("Error generating personalized tips:", error)
    return NextResponse.json({ success: false, message: "Failed to generate personalized tips" }, { status: 500 })
  }
}

async function generatePersonalizedTips(healthProfile: any) {
  try {
    // Use AI SDK to generate personalized health tips
    const prompt = `
      Generate 5 personalized health tips for a person with the following health profile:
      
      Age: ${healthProfile.age || "Not specified"}
      Gender: ${healthProfile.gender || "Not specified"}
      Health Conditions: ${healthProfile.conditions?.join(", ") || "None specified"}
      Health Goals: ${healthProfile.goals?.join(", ") || "None specified"}
      Diet Preferences: ${healthProfile.preferences?.diet || "Not specified"}
      
      Each tip should be specific to their profile and provide actionable advice.
      Format the response as a JSON array of strings, with each string being a health tip.
    `

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      temperature: 0.7,
      maxTokens: 1000,
    })

    // Parse the response as JSON
    try {
      const tipsArray = JSON.parse(text)
      return Array.isArray(tipsArray) ? tipsArray : []
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError)

      // Fallback to basic tips if parsing fails
      return [
        "Stay hydrated by drinking at least 8 glasses of water daily.",
        "Aim for at least 30 minutes of moderate exercise most days of the week.",
        "Include a variety of fruits and vegetables in your diet for essential nutrients.",
        "Practice stress-reduction techniques like meditation or deep breathing.",
        "Ensure you get 7-8 hours of quality sleep each night.",
      ]
    }
  } catch (error) {
    console.error("Error in AI tip generation:", error)

    // Fallback to basic tips if AI generation fails
    return [
      "Stay hydrated by drinking at least 8 glasses of water daily.",
      "Aim for at least 30 minutes of moderate exercise most days of the week.",
      "Include a variety of fruits and vegetables in your diet for essential nutrients.",
      "Practice stress-reduction techniques like meditation or deep breathing.",
      "Ensure you get 7-8 hours of quality sleep each night.",
    ]
  }
}

