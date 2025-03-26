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
    const { type, location, details } = data

    // Construct the message
    const message = `Emergency Alert: ${type}\nLocation: ${location}\nDetails: ${details}`

    // Send the SMS
    const response = await smsService.send({
      to: ["+254707548787"], // Replace with the recipient's phone number
      message,
      from: "20880",
    })

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