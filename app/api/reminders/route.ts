import { NextResponse } from "next/server"
import africastalking from "africastalking"

// Initialize the Africa's Talking SDK
const username = process.env.AT_USERNAME || "sandbox"
const apiKey = process.env.AT_API_KEY || ""
const africasTalking = africastalking({
  username,
  apiKey,
})

// Get the SMS service
const smsService = africasTalking.SMS

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { action, reminderData, phoneNumber } = data

    // Handle different actions
    switch (action) {
      case "create":
        return handleCreateReminder(reminderData, phoneNumber)
      case "update":
        return handleUpdateReminder(reminderData, phoneNumber)
      case "delete":
        return handleDeleteReminder(reminderData.id, phoneNumber)
      case "list":
        return handleListReminders(phoneNumber)
      default:
        return NextResponse.json({ success: false, message: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error processing reminder request:", error)
    return NextResponse.json({ success: false, message: "Failed to process reminder request" }, { status: 500 })
  }
}

// Create a new reminder
async function handleCreateReminder(reminderData: any, phoneNumber: string) {
  try {
    // In a real implementation, this would store the reminder in a database
    // and set up a scheduled task to send reminders via SMS

    // For demonstration purposes, we'll just send a confirmation SMS
    const message = `Your reminder "${reminderData.title}" has been created. You will receive reminders at ${reminderData.time} on your selected days.`

    const response = await smsService.send({
      to: [phoneNumber],
      message,
      from: "UJAMAA",
    })

    return NextResponse.json({
      success: true,
      message: "Reminder created successfully",
      reminderData,
      smsResponse: response,
    })
  } catch (error) {
    console.error("Error creating reminder:", error)
    return NextResponse.json({ success: false, message: "Failed to create reminder" }, { status: 500 })
  }
}

// Update an existing reminder
async function handleUpdateReminder(reminderData: any, phoneNumber: string) {
  try {
    // In a real implementation, this would update the reminder in a database

    // For demonstration purposes, we'll just send a confirmation SMS
    const message = `Your reminder "${reminderData.title}" has been updated. You will now receive reminders at ${reminderData.time} on your selected days.`

    const response = await smsService.send({
      to: [phoneNumber],
      message,
      from: "UJAMAA",
    })

    return NextResponse.json({
      success: true,
      message: "Reminder updated successfully",
      reminderData,
      smsResponse: response,
    })
  } catch (error) {
    console.error("Error updating reminder:", error)
    return NextResponse.json({ success: false, message: "Failed to update reminder" }, { status: 500 })
  }
}

// Delete a reminder
async function handleDeleteReminder(reminderId: string, phoneNumber: string) {
  try {
    // In a real implementation, this would delete the reminder from a database

    // For demonstration purposes, we'll just send a confirmation SMS
    const message = `Your reminder has been deleted.`

    const response = await smsService.send({
      to: [phoneNumber],
      message,
      from: "UJAMAA",
    })

    return NextResponse.json({
      success: true,
      message: "Reminder deleted successfully",
      smsResponse: response,
    })
  } catch (error) {
    console.error("Error deleting reminder:", error)
    return NextResponse.json({ success: false, message: "Failed to delete reminder" }, { status: 500 })
  }
}

// List all reminders for a user
async function handleListReminders(phoneNumber: string) {
  try {
    // In a real implementation, this would fetch reminders from a database

    // For demonstration purposes, we'll return mock data
    const reminders = [
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
    ]

    return NextResponse.json({
      success: true,
      reminders,
    })
  } catch (error) {
    console.error("Error listing reminders:", error)
    return NextResponse.json({ success: false, message: "Failed to list reminders" }, { status: 500 })
  }
}

