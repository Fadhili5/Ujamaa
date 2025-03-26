// filepath: c:\Users\HP\Downloads\ujamaa-health-app (3)\app\api\emergency-alerts\route.ts
import { NextResponse } from "next/server"
import africastalking from "africastalking"

// Initialize the Africa's Talking SDK
const username = process.env.AT_USERNAME || "sandbox"
const apiKey = process.env.AT_API_KEY || ""
console.log("AT_USERNAME:", username)
console.log("AT_API_KEY:", apiKey)
const africasTalking = africastalking({
  username,
  apiKey,
})

// Get the SMS service
const smsService = africasTalking.SMS

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { phoneNumber, type, location, details } = data

    console.log("Received data:", data)

    // Construct the message
    const message = `Emergency Alert: ${type}\nLocation: ${location}\nDetails: ${details}`

    // Send the SMS
    const response = await smsService.send({
      to: [phoneNumber], // Use the phone number provided by the user
      message,
      from: "AFTKNG", // Use a valid sender ID
    })

    console.log("SMS Response:", response)

    return NextResponse.json({
      success: true,
      message: "Alert sent successfully",
      smsResponse: response,
    })
  } catch (error) {
    console.error("Error sending alert:", error)
    return NextResponse.json({ success: false, message: "Failed to send alert" }, { status: 500 })
  }
}