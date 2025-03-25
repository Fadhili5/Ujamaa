import { NextResponse } from "next/server"

// This would be integrated with Africa's Talking SMS API
export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { message, phoneNumber } = data

    // Process the incoming SMS command
    const response = processSmsCommand(message, phoneNumber)

    // In a real implementation, this would use Africa's Talking SDK to send SMS
    // For demonstration purposes, we're just returning the response
    return NextResponse.json({
      success: true,
      message: "SMS processed successfully",
      response,
    })
  } catch (error) {
    console.error("Error processing SMS:", error)
    return NextResponse.json({ success: false, message: "Failed to process SMS" }, { status: 500 })
  }
}

function processSmsCommand(message: string, phoneNumber: string) {
  // Convert message to uppercase and trim for consistent processing
  const command = message.toUpperCase().trim()

  // Health Tips Commands
  if (command === "TIP") {
    return getRandomHealthTip()
  } else if (command === "NUTRITION") {
    return getNutritionTip()
  } else if (command === "EXERCISE") {
    return getExerciseTip()
  } else if (command.startsWith("REMINDER")) {
    return setMedicationReminder(command, phoneNumber)
  }

  // Subscription Commands
  else if (command === "SUBSCRIBE DAILY") {
    return subscribeUser(phoneNumber, "daily")
  } else if (command === "SUBSCRIBE WEEKLY") {
    return subscribeUser(phoneNumber, "weekly")
  } else if (command === "UNSUBSCRIBE") {
    return unsubscribeUser(phoneNumber)
  } else if (command === "HELP") {
    return getHelpCommands()
  }

  // Resource Finding Commands
  else if (command.startsWith("FIND")) {
    return findResource(command)
  }

  // Resource Sharing Commands
  else if (command.startsWith("NEED")) {
    return requestResource(command, phoneNumber)
  } else if (command.startsWith("OFFER")) {
    return offerResource(command, phoneNumber)
  } else if (command === "CHECK REQUEST") {
    return checkRequestStatus(phoneNumber)
  } else if (command === "CHECK OFFER") {
    return checkOfferStatus(phoneNumber)
  }

  // Emergency Alert Commands
  else if (command.startsWith("ALERT")) {
    return createAlert(command, phoneNumber)
  } else if (command.startsWith("SUBSCRIBE") && !command.includes("DAILY") && !command.includes("WEEKLY")) {
    return subscribeToAlerts(command, phoneNumber)
  } else if (command.startsWith("UNSUBSCRIBE") && command.length > 11) {
    return unsubscribeFromAlerts(command, phoneNumber)
  }

  // Volunteer Commands
  else if (command.startsWith("VOLUNTEER")) {
    return processVolunteerCommand(command, phoneNumber)
  } else if (command.startsWith("ORG")) {
    return processOrganizationCommand(command, phoneNumber)
  }

  // Default response for unrecognized commands
  else {
    return "Command not recognized. Text HELP for a list of available commands."
  }
}

// Helper functions for processing different types of commands

function getRandomHealthTip() {
  const tips = [
    "Drink at least 8 glasses of water daily to stay hydrated.",
    "Include fruits and vegetables in every meal for essential vitamins.",
    "Regular handwashing helps prevent the spread of diseases.",
    "Aim for at least 30 minutes of physical activity daily.",
    "Ensure you get 7-8 hours of sleep for proper rest and recovery.",
  ]
  return tips[Math.floor(Math.random() * tips.length)]
}

function getNutritionTip() {
  const tips = [
    "Eat a variety of colorful fruits and vegetables daily.",
    "Choose whole grains over refined grains for more nutrients.",
    "Include protein sources like beans, fish, or lean meat in your diet.",
    "Limit processed foods high in salt, sugar, and unhealthy fats.",
    "Small, frequent meals can help maintain energy throughout the day.",
  ]
  return tips[Math.floor(Math.random() * tips.length)]
}

function getExerciseTip() {
  const tips = [
    "Start with a 10-minute walk daily and gradually increase duration.",
    "Incorporate strength training exercises at least twice a week.",
    "Stretching improves flexibility and reduces risk of injury.",
    "Find activities you enjoy to make exercise a sustainable habit.",
    "Exercise with friends or family to stay motivated and accountable.",
  ]
  return tips[Math.floor(Math.random() * tips.length)]
}

function setMedicationReminder(command: string, phoneNumber: string) {
  // In a real implementation, this would store the reminder in a database
  // and set up a scheduled task to send reminders
  return "Medication reminder set. You will receive reminders as scheduled."
}

function subscribeUser(phoneNumber: string, frequency: string) {
  // In a real implementation, this would add the user to a subscription database
  return `You have been subscribed to ${frequency} health tips. Reply UNSUBSCRIBE to stop receiving tips.`
}

function unsubscribeUser(phoneNumber: string) {
  // In a real implementation, this would remove the user from the subscription database
  return "You have been unsubscribed from health tips. Text SUBSCRIBE DAILY or SUBSCRIBE WEEKLY to resubscribe."
}

function getHelpCommands() {
  return "Available commands: TIP, NUTRITION, EXERCISE, REMINDER, SUBSCRIBE DAILY, SUBSCRIBE WEEKLY, UNSUBSCRIBE, FIND, NEED, OFFER, ALERT, VOLUNTEER, ORG"
}

function findResource(command: string) {
  // Parse the command to extract resource type and location
  const parts = command.split(" ")
  if (parts.length < 3) {
    return "Please specify what to find and your location. Example: FIND CLINIC NAIROBI"
  }

  const resourceType = parts[1]
  const location = parts.slice(2).join(" ")

  // In a real implementation, this would query a database of resources
  return `Here are ${resourceType} resources in ${location}: [List would be populated from database]`
}

function requestResource(command: string, phoneNumber: string) {
  // Parse the command to extract resource type and details
  const parts = command.split(" ")
  if (parts.length < 3) {
    return "Please specify what you need and your location. Example: NEED MEDICATION NAIROBI"
  }

  const resourceType = parts[1]
  const details = parts.slice(2).join(" ")

  // In a real implementation, this would store the request in a database
  // and match with available offers
  return `Your request for ${resourceType} in ${details} has been registered. You will be notified when a match is found.`
}

function offerResource(command: string, phoneNumber: string) {
  // Parse the command to extract resource type and details
  const parts = command.split(" ")
  if (parts.length < 3) {
    return "Please specify what you're offering and your location. Example: OFFER FOOD NAIROBI"
  }

  const resourceType = parts[1]
  const details = parts.slice(2).join(" ")

  // In a real implementation, this would store the offer in a database
  // and match with existing requests
  return `Your offer of ${resourceType} in ${details} has been registered. You will be notified when someone needs this resource.`
}

function checkRequestStatus(phoneNumber: string) {
  // In a real implementation, this would query the database for the user's requests
  return "You have no active requests. Text NEED [RESOURCE] [LOCATION] to request a resource."
}

function checkOfferStatus(phoneNumber: string) {
  // In a real implementation, this would query the database for the user's offers
  return "You have no active offers. Text OFFER [RESOURCE] [LOCATION] to offer a resource."
}

function createAlert(command: string, phoneNumber: string) {
  // Parse the command to extract alert type, location, and details
  const parts = command.split(" ")
  if (parts.length < 4) {
    return "Please specify alert type, location, and details. Example: ALERT MEDICAL NAIROBI AMBULANCE NEEDED"
  }

  const alertType = parts[1]
  const location = parts[2]
  const details = parts.slice(3).join(" ")

  // Generate a unique alert ID
  const alertId = `ALT${Math.floor(Math.random() * 10000)}`

  // In a real implementation, this would store the alert in a database
  // and send notifications to subscribed users
  return `Alert created (ID: ${alertId}). Your ${alertType} alert for ${location} has been sent to subscribers. Text UPDATE ${alertId} [UPDATE] to provide updates.`
}

function subscribeToAlerts(command: string, phoneNumber: string) {
  // Parse the command to extract location
  const parts = command.split(" ")
  if (parts.length < 2) {
    return "Please specify a location to subscribe to. Example: SUBSCRIBE NAIROBI"
  }

  const location = parts[1]

  // In a real implementation, this would add the user to a subscription database
  return `You have subscribed to alerts for ${location}. Text UNSUBSCRIBE ${location} to stop receiving alerts.`
}

function unsubscribeFromAlerts(command: string, phoneNumber: string) {
  // Parse the command to extract location
  const parts = command.split(" ")
  if (parts.length < 2) {
    return "Please specify a location to unsubscribe from. Example: UNSUBSCRIBE NAIROBI"
  }

  const location = parts[1]

  // In a real implementation, this would remove the user from the subscription database
  return `You have unsubscribed from alerts for ${location}.`
}

function processVolunteerCommand(command: string, phoneNumber: string) {
  // Parse the command to determine the volunteer action
  const parts = command.split(" ")
  if (parts.length < 2) {
    return "Please specify a volunteer action. Available commands: VOLUNTEER REGISTER, VOLUNTEER LOCATION, VOLUNTEER AVAILABILITY, VOLUNTEER STATUS"
  }

  const action = parts[1]

  if (action === "REGISTER") {
    // Register a new volunteer with skills
    const skills = parts.slice(2).join(" ")
    // In a real implementation, this would store the volunteer in a database
    return `You have been registered as a volunteer with skills: ${skills || "None specified"}. Text VOLUNTEER LOCATION to set your location.`
  } else if (action === "LOCATION") {
    // Set volunteer location
    const location = parts.slice(2).join(" ")
    // In a real implementation, this would update the volunteer's location in the database
    return `Your volunteer location has been set to: ${location || "None specified"}.`
  } else if (action === "AVAILABILITY") {
    // Set volunteer availability
    const availability = parts.slice(2).join(" ")
    // In a real implementation, this would update the volunteer's availability in the database
    return `Your availability has been set to: ${availability || "None specified"}.`
  } else if (action === "STATUS") {
    // Check volunteer status
    // In a real implementation, this would query the database for the volunteer's profile
    return "Your volunteer profile is active. You will be notified of matching opportunities."
  } else {
    return "Volunteer command not recognized. Available commands: VOLUNTEER REGISTER, VOLUNTEER LOCATION, VOLUNTEER AVAILABILITY, VOLUNTEER STATUS"
  }
}

function processOrganizationCommand(command: string, phoneNumber: string) {
  // Parse the command to determine the organization action
  const parts = command.split(" ")
  if (parts.length < 2) {
    return "Please specify an organization action. Available commands: ORG REGISTER, ORG POST, ORG UPDATE, ORG CLOSE"
  }

  const action = parts[1]

  if (action === "REGISTER") {
    // Register a new organization
    const name = parts.slice(2).join(" ")
    // In a real implementation, this would store the organization in a database
    return `Organization "${name || "Unnamed"}" has been registered. Text ORG POST to create volunteer opportunities.`
  } else if (action === "POST") {
    // Post a new volunteer opportunity
    if (parts.length < 5) {
      return "Please specify need, location, and details. Example: ORG POST DRIVERS NAIROBI NEED 3 DRIVERS FOR MEDICAL DELIVERIES"
    }

    const need = parts[2]
    const location = parts[3]
    const details = parts.slice(4).join(" ")

    // Generate a unique post ID
    const postId = `POST${Math.floor(Math.random() * 10000)}`

    // In a real implementation, this would store the post in a database
    // and match with available volunteers
    return `Volunteer opportunity created (ID: ${postId}). Your need for ${need} in ${location} has been posted. Text ORG UPDATE ${postId} [UPDATE] to provide updates.`
  } else if (action === "UPDATE") {
    // Update an existing post
    if (parts.length < 4) {
      return "Please specify post ID and update. Example: ORG UPDATE POST1234 NEED 2 MORE VOLUNTEERS"
    }

    const postId = parts[2]
    const update = parts.slice(3).join(" ")

    // In a real implementation, this would update the post in the database
    return `Post ${postId} has been updated with: ${update}`
  } else if (action === "CLOSE") {
    // Close an existing post
    if (parts.length < 3) {
      return "Please specify post ID. Example: ORG CLOSE POST1234"
    }

    const postId = parts[2]

    // In a real implementation, this would mark the post as closed in the database
    return `Post ${postId} has been closed. No more volunteers will be matched to this opportunity.`
  } else {
    return "Organization command not recognized. Available commands: ORG REGISTER, ORG POST, ORG UPDATE, ORG CLOSE"
  }
}

