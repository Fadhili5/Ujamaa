import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { group } = data

    // Log the data (you can replace this with database storage logic)
    console.log("Joined Group:", group)

    return NextResponse.json({
      success: true,
      message: "Joined group successfully",
    })
  } catch (error) {
    console.error("Error joining group:", error)
    return NextResponse.json({ success: false, message: "Failed to join group" }, { status: 500 })
  }
}