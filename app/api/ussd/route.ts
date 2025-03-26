import { NextResponse } from "next/server"
import africastalking from "africastalking"

// Initialize the SDK with your credentials
const username = process.env.AT_USERNAME || "sandbox"
const apiKey = process.env.AT_API_KEY || ""
const africasTalking = africastalking({
  username,
  apiKey,
})

// Get the USSD service
const ussdService = africasTalking.USSD

export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    // Africa's Talking sends these parameters for USSD requests
    const sessionId = formData.get("sessionId") as string
    const serviceCode = formData.get("serviceCode") as string
    const phoneNumber = formData.get("phoneNumber") as string
    const text = formData.get("text") as string

    // Process the USSD request and generate a response
    const response = await processUssdRequest(sessionId, phoneNumber, text)

    // Return the response in the format expected by Africa's Talking
    return new Response(response)
  } catch (error) {
    console.error("Error processing USSD:", error)
    return new Response("END An error occurred. Please try again later.", {
      status: 500,
    })
  }
}

async function processUssdRequest(sessionId: string, phoneNumber: string, text: string) {
  // Check if this is a new session
  if (!text) {
    return getMainMenu()
  }

  // Process based on user input
  const inputs = text.split("*")
  const level = inputs.length
  const currentInput = inputs[level - 1]

  // Main menu selection
  if (level === 1) {
    switch (currentInput) {
      case "1": // Health Services
        return getHealthServicesMenu()
      case "2": // Mental Health
        return getMentalHealthMenu()
      case "3": // Community Resources
        return getCommunityResourcesMenu()
      case "4": // Emergency Services
        return getEmergencyServicesMenu()
      case "5": // Volunteer Services
        return getVolunteerServicesMenu()
      default:
        return "CON Invalid selection. " + getMainMenu()
    }
  }

  // Health Services submenu
  if (level === 2 && inputs[0] === "1") {
    switch (currentInput) {
      case "1": // Health Tips
        return getHealthTipsMenu()
      case "2": // Appointment Booking
        return getAppointmentBookingMenu()
      case "3": // Find Health Facility
        return "CON Enter your district or area:"
      default:
        return "CON Invalid selection. " + getHealthServicesMenu()
    }
  }

  // Mental Health submenu
  if (level === 2 && inputs[0] === "2") {
    switch (currentInput) {
      case "1": // Counseling Services
        return getCounselingServicesMenu()
      case "2": // Support Groups
        return getSupportGroupsMenu()
      case "3": // Crisis Support
        return getCrisisSupportMenu()
      default:
        return "CON Invalid selection. " + getMentalHealthMenu()
    }
  }

  // Community Resources submenu
  if (level === 2 && inputs[0] === "3") {
    switch (currentInput) {
      case "1": // Find Resources
        return "CON Enter your district or area:"
      case "2": // Request Resources
        return getRequestResourcesMenu()
      case "3": // Offer Resources
        return getOfferResourcesMenu()
      default:
        return "CON Invalid selection. " + getCommunityResourcesMenu()
    }
  }

  // Emergency Services submenu
  if (level === 2 && inputs[0] === "4") {
    switch (currentInput) {
      case "1": // Report Emergency
        return getReportEmergencyMenu()
      case "2": // Emergency Contacts
        return getEmergencyContactsMenu()
      default:
        return "CON Invalid selection. " + getEmergencyServicesMenu()
    }
  }

  // Volunteer Services submenu
  if (level === 2 && inputs[0] === "5") {
    switch (currentInput) {
      case "1": // Register as Volunteer
        return getVolunteerRegistrationMenu()
      case "2": // View Opportunities
        return "CON Enter your district or area:"
      case "3": // Organization Services
        return getOrganizationServicesMenu()
      default:
        return "CON Invalid selection. " + getVolunteerServicesMenu()
    }
  }

  // Health Tips selection
  if (level === 3 && inputs[0] === "1" && inputs[1] === "1") {
    switch (currentInput) {
      case "1": // General Health
        return "CON General Health Tips:\n1. Stay hydrated by drinking at least 8 glasses of water daily\n2. Eat a balanced diet with fruits and vegetables\n3. Exercise regularly for at least 30 minutes daily\n4. Get 7-8 hours of sleep each night\n5. Wash hands frequently to prevent infections\n\n0. Back to Main Menu"
      case "2": // Nutrition
        return "CON Nutrition Tips:\n1. Eat a variety of colorful fruits and vegetables\n2. Choose whole grains over refined grains\n3. Include protein in every meal\n4. Limit processed foods and added sugars\n5. Stay hydrated with water instead of sugary drinks\n\n0. Back to Main Menu"
      case "3": // Exercise
        return "CON Exercise Tips:\n1. Start with a 10-minute walk daily\n2. Gradually increase exercise duration\n3. Include both cardio and strength training\n4. Stretch before and after exercise\n5. Find activities you enjoy to stay motivated\n\n0. Back to Main Menu"
      case "4": // Disease Prevention
        return "CON Disease Prevention Tips:\n1. Wash hands frequently with soap and water\n2. Cover coughs and sneezes with elbow\n3. Stay up to date with vaccinations\n4. Practice safe food handling\n5. Get regular health check-ups\n\n0. Back to Main Menu"
      default:
        return "CON Invalid selection. " + getHealthTipsMenu()
    }
  }

  // Appointment Booking process
  if (inputs[0] === "1" && inputs[1] === "2") {
    if (level === 3) {
      // Select facility type
      switch (currentInput) {
        case "1": // Hospital
          return "CON Select hospital:\n1. Central Hospital\n2. Community Hospital\n3. District Hospital\n4. Regional Hospital\n\n0. Back"
        case "2": // Clinic
          return "CON Select clinic:\n1. Family Health Clinic\n2. Community Clinic\n3. Primary Care Clinic\n4. Wellness Center\n\n0. Back"
        case "3": // Specialized Care
          return "CON Select specialty:\n1. Pediatrics\n2. Obstetrics & Gynecology\n3. Cardiology\n4. Orthopedics\n5. Dermatology\n\n0. Back"
        default:
          return "CON Invalid selection. " + getAppointmentBookingMenu()
      }
    } else if (level === 4) {
      // Facility selected, now select service
      return "CON Select service:\n1. General check-up\n2. Vaccination\n3. Prenatal care\n4. Child health\n5. Chronic disease management\n\n0. Back"
    } else if (level === 5) {
      // Service selected, now select date
      return "CON Select appointment date:\n1. Tomorrow\n2. This week\n3. Next week\n4. Specific date (MM/DD)\n\n0. Back"
    } else if (level === 6) {
      // Date selected, now select time
      if (currentInput === "4") {
        return "CON Enter date (MM/DD):"
      } else {
        return "CON Select appointment time:\n1. Morning (8AM-12PM)\n2. Afternoon (12PM-4PM)\n3. Evening (4PM-8PM)\n\n0. Back"
      }
    } else if (level === 7 || (level === 8 && inputs[5] === "4")) {
      // Confirm appointment
      return "CON Appointment details:\nFacility: [Facility Name]\nService: [Selected Service]\nDate: [Selected Date]\nTime: [Selected Time]\n\n1. Confirm appointment\n2. Cancel\n\n0. Back to Main Menu"
    } else if (level === 8 || (level === 9 && inputs[5] === "4")) {
      if (currentInput === "1") {
        // Appointment confirmed
        // In a real implementation, this would save the appointment to a database
        // and potentially send an SMS confirmation
        return "END Your appointment has been scheduled. You will receive an SMS confirmation with details. Thank you for using Ujamaa Health Services."
      } else {
        // Appointment canceled
        return "END Appointment booking canceled. Thank you for using Ujamaa Health Services."
      }
    }
  }

  // If we reach here, it means we couldn't process the request
  return "CON We couldn't process your request. Please try again.\n\n0. Back to Main Menu"
}

// Helper functions for generating USSD menus

function getMainMenu() {
  return "CON Welcome to Ujamaa Health & Community Support\n\n1. Health Services\n2. Mental Health\n3. Community Resources\n4. Emergency Services\n5. Volunteer Services"
}

function getHealthServicesMenu() {
  return "CON Health Services:\n1. Health Tips\n2. Appointment Booking\n3. Find Health Facility\n\n0. Back to Main Menu"
}

function getMentalHealthMenu() {
  return "CON Mental Health Services:\n1. Counseling Services\n2. Support Groups\n3. Crisis Support\n\n0. Back to Main Menu"
}

function getCommunityResourcesMenu() {
  return "CON Community Resources:\n1. Find Resources\n2. Request Resources\n3. Offer Resources\n\n0. Back to Main Menu"
}

function getEmergencyServicesMenu() {
  return "CON Emergency Services:\n1. Report Emergency\n2. Emergency Contacts\n\n0. Back to Main Menu"
}

function getVolunteerServicesMenu() {
  return "CON Volunteer Services:\n1. Register as Volunteer\n2. View Opportunities\n3. Organization Services\n\n0. Back to Main Menu"
}

function getHealthTipsMenu() {
  return "CON Health Tips Categories:\n1. General Health\n2. Nutrition\n3. Exercise\n4. Disease Prevention\n\n0. Back"
}

function getAppointmentBookingMenu() {
  return "CON Appointment Booking:\n1. Hospital\n2. Clinic\n3. Specialized Care\n\n0. Back"
}

function getCounselingServicesMenu() {
  return "CON Counseling Services:\n1. Anonymous Phone Counseling\n2. Crisis Support\n3. Specialized Counseling\n\n0. Back"
}

function getSupportGroupsMenu() {
  return "CON Support Groups:\n1. Find Support Groups\n2. Join a Group\n3. Meeting Schedule\n\n0. Back"
}

function getCrisisSupportMenu() {
  return "CON Crisis Support:\n1. Immediate Phone Support\n2. Crisis Text Line\n3. Find Crisis Center\n\n0. Back"
}

function getRequestResourcesMenu() {
  return "CON Request Resources:\n1. Medical Supplies\n2. Food & Nutrition\n3. Transportation\n4. Childcare\n5. Education\n6. Skills & Services\n\n0. Back"
}

function getOfferResourcesMenu() {
  return "CON Offer Resources:\n1. Medical Supplies\n2. Food & Nutrition\n3. Transportation\n4. Childcare\n5. Education\n6. Skills & Services\n\n0. Back"
}

function getReportEmergencyMenu() {
  return "CON Report Emergency:\n1. Medical\n2. Security\n3. Weather\n4. Infrastructure\n5. Disease Outbreak\n6. Other\n\n0. Back"
}

function getEmergencyContactsMenu() {
  return "CON Emergency Contacts:\n1. Medical Emergency\n2. Police\n3. Fire Department\n4. Disaster Response\n5. Poison Control\n6. Mental Health Crisis\n\n0. Back"
}

function getVolunteerRegistrationMenu() {
  return "CON Volunteer Registration:\n1. Medical Assistance\n2. Logistics & Transport\n3. Community Outreach\n4. Resource Distribution\n5. Technical Support\n6. Emotional Support\n\n0. Back"
}

function getOrganizationServicesMenu() {
  return "CON Organization Services:\n1. Register Organization\n2. Post Volunteer Need\n3. Update Existing Post\n4. View Volunteer Responses\n\n0. Back"
}

