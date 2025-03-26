import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { name, phone, skills } = data

    // Log the data (you can replace this with database storage logic)
    console.log("Volunteer Registration:", { name, phone, skills })

    return NextResponse.json({
      success: true,
      message: "Volunteer registered successfully",
    })
  } catch (error) {
    console.error("Error registering volunteer:", error)
    return NextResponse.json({ success: false, message: "Failed to register volunteer" }, { status: 500 })
  }
}