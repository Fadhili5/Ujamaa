import { NextResponse } from "next/server"
import { google } from "googleapis"
import { OAuth2Client } from "google-auth-library"

// Initialize the OAuth2 client
const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI,
)

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { action, appointmentData, authCode } = data

    // Handle different actions
    switch (action) {
      case "authorize":
        return handleAuthorize()
      case "callback":
        return handleCallback(authCode)
      case "createEvent":
        return handleCreateEvent(appointmentData)
      default:
        return NextResponse.json({ success: false, message: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error processing calendar request:", error)
    return NextResponse.json({ success: false, message: "Failed to process calendar request" }, { status: 500 })
  }
}

// Generate authorization URL for Google Calendar
function handleAuthorize() {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/calendar"],
  })

  return NextResponse.json({ success: true, authUrl })
}

// Handle OAuth callback and get tokens
async function handleCallback(authCode: string) {
  try {
    const { tokens } = await oauth2Client.getToken(authCode)
    oauth2Client.setCredentials(tokens)

    // In a real app, you would store these tokens securely for the user
    // For demonstration purposes, we'll just return success
    return NextResponse.json({ success: true, message: "Successfully authenticated with Google Calendar" })
  } catch (error) {
    console.error("Error getting tokens:", error)
    return NextResponse.json(
      { success: false, message: "Failed to authenticate with Google Calendar" },
      { status: 500 },
    )
  }
}

// Create a calendar event
async function handleCreateEvent(appointmentData: any) {
  try {
    // Make sure we have valid credentials
    if (!oauth2Client.credentials.access_token) {
      return NextResponse.json({ success: false, message: "Not authenticated with Google Calendar" }, { status: 401 })
    }

    const calendar = google.calendar({ version: "v3", auth: oauth2Client })

    // Format the appointment data for Google Calendar
    const { facility, service, date, time, notes } = appointmentData

    // Parse the date and time
    const [hours, minutes] = time.split(":").map(Number)
    const startDate = new Date(date)
    startDate.setHours(hours, minutes, 0, 0)

    // End time is 30 minutes after start time
    const endDate = new Date(startDate)
    endDate.setMinutes(endDate.getMinutes() + 30)

    // Create the event
    const event = {
      summary: `Medical Appointment: ${service}`,
      location: facility.name + ", " + facility.address,
      description: notes || `Appointment for ${service} at ${facility.name}`,
      start: {
        dateTime: startDate.toISOString(),
        timeZone: "Africa/Nairobi",
      },
      end: {
        dateTime: endDate.toISOString(),
        timeZone: "Africa/Nairobi",
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 }, // 1 day before
          { method: "popup", minutes: 60 }, // 1 hour before
        ],
      },
    }

    // Insert the event into the calendar
    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
    })

    return NextResponse.json({
      success: true,
      message: "Appointment added to Google Calendar",
      eventId: response.data.id,
      eventLink: response.data.htmlLink,
    })
  } catch (error) {
    console.error("Error creating calendar event:", error)
    return NextResponse.json({ success: false, message: "Failed to create calendar event" }, { status: 500 })
  }
}

