import { NextResponse } from "next/server"
import africastalking from "africastalking"
import { ElevenLabs } from "elevenlabs-node"

// Initialize the Africa's Talking SDK
const username = process.env.AT_USERNAME || "sandbox"
const apiKey = process.env.AT_API_KEY || ""
const africasTalking = africastalking({
  username,
  apiKey,
})

// Initialize the ElevenLabs SDK
const elevenLabs = new ElevenLabs({
  apiKey: process.env.ELEVENLABS_API_KEY || "",
})

// Get the Voice service
const voiceService = africasTalking.VOICE

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { sessionId, callerId, dtmfDigits, agentType } = data

    // Process the voice call and generate a response
    const response = await processVoiceCall(sessionId, callerId, dtmfDigits, agentType)

    // Return the response
    return NextResponse.json({
      success: true,
      message: "Voice call processed successfully",
      response,
    })
  } catch (error) {
    console.error("Error processing voice call:", error)
    return NextResponse.json({ success: false, message: "Failed to process voice call" }, { status: 500 })
  }
}

async function processVoiceCall(sessionId: string, callerId: string, dtmfDigits: string, agentType: string) {
  // If no DTMF digits, this is a new call
  if (!dtmfDigits) {
    return getWelcomeMessage()
  }

  // If this is an AI voice agent call
  if (agentType === "ai") {
    return processAIVoiceAgent(sessionId, callerId, dtmfDigits)
  }

  // If this is a human agent call
  if (agentType === "human") {
    return processHumanAgent(sessionId, callerId, dtmfDigits)
  }

  // Process based on DTMF input for initial menu
  switch (dtmfDigits) {
    case "1": // AI Voice Agent
      return getAIVoiceAgentMenu()
    case "2": // Human Agent
      return getHumanAgentMenu()
    case "0": // Return to main menu
      return getWelcomeMessage()
    default:
      return getInvalidInputMessage()
  }
}

async function processAIVoiceAgent(sessionId: string, callerId: string, dtmfDigits: string) {
  // In a real implementation, this would use ElevenLabs to generate voice responses
  try {
    // Example of generating a voice response with ElevenLabs
    const voiceId = "21m00Tcm4TlvDq8ikWAM" // Rachel voice ID
    const stability = 0.5
    const similarityBoost = 0.5

    // Generate a response based on the user's input
    const responseText = generateAIResponse(dtmfDigits)

    // Convert text to speech using ElevenLabs
    const audioStream = await elevenLabs.textToSpeech({
      voiceId,
      textInput: responseText,
      stability,
      similarityBoost,
    })

    // In a real implementation, this would save the audio file and play it to the user
    // For demonstration purposes, we'll just return the text response
    return {
      voice: {
        say: {
          text: responseText,
        },
        getDigits: {
          numDigits: 1,
          timeout: 5,
        },
      },
    }
  } catch (error) {
    console.error("Error generating AI voice response:", error)
    return {
      voice: {
        say: {
          text: "I'm sorry, I'm having trouble understanding. Let me connect you to a human agent.",
        },
        redirect: getHumanAgentMenu(),
      },
    }
  }
}

function generateAIResponse(userInput: string) {
  // In a real implementation, this would use a more sophisticated AI model
  // For demonstration purposes, we'll use a simple switch statement
  switch (userInput) {
    case "1": // Health information
      return "Here's some general health information. It's important to stay hydrated, get regular exercise, and eat a balanced diet. Would you like more specific information? Press 1 for nutrition, 2 for exercise, or 3 for sleep."
    case "2": // Symptom assessment
      return "I can help assess your symptoms. Please describe what you're experiencing. For fever, press 1. For cough, press 2. For headache, press 3. For stomach pain, press 4."
    case "3": // Medication information
      return "I can provide information about medications. For dosage information, press 1. For side effects, press 2. For drug interactions, press 3."
    default:
      return "I'm not sure I understand. Please try again or press 0 to return to the main menu."
  }
}

function processHumanAgent(sessionId: string, callerId: string, dtmfDigits: string) {
  // Process human agent selection
  switch (dtmfDigits) {
    case "1": // General Medicine
      return connectToSpecialist("general")
    case "2": // Cardiology
      return connectToSpecialist("cardiology")
    case "3": // Pediatrics
      return connectToSpecialist("pediatrics")
    case "4": // Mental Health
      return connectToSpecialist("mental")
    case "5": // Women's Health
      return connectToSpecialist("womens")
    case "0": // Return to main menu
      return getWelcomeMessage()
    default:
      return getInvalidInputMessage()
  }
}

// Helper functions for generating voice responses

function getWelcomeMessage() {
  return {
    voice: {
      say: {
        text: "Welcome to Ujamaa Health Voice Consultation. Press 1 to speak with our AI voice agent, or press 2 to speak with a human healthcare professional.",
      },
      getDigits: {
        numDigits: 1,
        timeout: 5,
      },
    },
  }
}

function getAIVoiceAgentMenu() {
  return {
    voice: {
      say: {
        text: "You've selected our AI voice agent. Press 1 for health information, press 2 for symptom assessment, or press 3 for medication information. To return to the main menu, press 0.",
      },
      getDigits: {
        numDigits: 1,
        timeout: 5,
      },
    },
  }
}

function getHumanAgentMenu() {
  return {
    voice: {
      say: {
        text: "You've selected to speak with a human healthcare professional. Press 1 for General Medicine, press 2 for Cardiology, press 3 for Pediatrics, press 4 for Mental Health, or press 5 for Women's Health. To return to the main menu, press 0.",
      },
      getDigits: {
        numDigits: 1,
        timeout: 5,
      },
    },
  }
}

function getInvalidInputMessage() {
  return {
    voice: {
      say: {
        text: "Sorry, I didn't understand that input. Let's try again.",
      },
      redirect: getWelcomeMessage(),
    },
  }
}

function connectToSpecialist(type: string) {
  let message = "Please hold while we connect you to a healthcare professional"
  let phoneNumber = "+1234567890" // Default number

  switch (type) {
    case "general":
      message = "Please hold while we connect you to a general medicine specialist."
      phoneNumber = "+1234567890" // This would be the actual specialist's number
      break
    case "cardiology":
      message = "Please hold while we connect you to a cardiology specialist."
      phoneNumber = "+1234567891"
      break
    case "pediatrics":
      message = "Please hold while we connect you to a pediatrics specialist."
      phoneNumber = "+1234567892"
      break
    case "mental":
      message = "Please hold while we connect you to a mental health specialist."
      phoneNumber = "+1234567893"
      break
    case "womens":
      message = "Please hold while we connect you to a women's health specialist."
      phoneNumber = "+1234567894"
      break
  }

  // In a real implementation, this would use Africa's Talking to make a call
  // For demonstration purposes, we'll just return the message
  return {
    voice: {
      say: {
        text: message,
      },
      dial: {
        phoneNumbers: [phoneNumber],
        record: true,
        sequential: true,
        callerId: "+0987654321", // This would be the Ujamaa service number
      },
    },
  }
}

