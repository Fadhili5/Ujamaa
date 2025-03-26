import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { organization, need, location, details } = data

    // Log the data (you can replace this with database storage logic)
    console.log("Volunteer Need:", { organization, need, location, details })

    return NextResponse.json({
      success: true,
      message: "Volunteer need posted successfully",
    })
  } catch (error) {
    console.error("Error posting volunteer need:", error)
    return NextResponse.json({ success: false, message: "Failed to post volunteer need" }, { status: 500 })
  }
}