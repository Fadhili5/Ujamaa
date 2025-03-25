import { NextResponse } from "next/server"

// This would be integrated with Africa's Talking Chat API
export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { sessionId, userId, message } = data

    // Process the chat message and generate a response
    const response = processChatMessage(sessionId, userId, message)

    // In a real implementation, this would use Africa's Talking SDK to respond to chat
    // For demonstration purposes, we're just returning the response
    return NextResponse.json({
      success: true,
      message: "Chat message processed successfully",
      response,
    })
  } catch (error) {
    console.error("Error processing chat message:", error)
    return NextResponse.json({ success: false, message: "Failed to process chat message" }, { status: 500 })
  }
}

function processChatMessage(sessionId: string, userId: string, message: string) {
  // Check if this is a new session
  if (!sessionId || isNewSession(sessionId)) {
    return getWelcomeMessage(userId)
  }

  // Get the current context of the conversation
  const context = getSessionContext(sessionId)

  // Process the message based on the context
  if (context.stage === "initial") {
    return processInitialMessage(message, sessionId, userId)
  } else if (context.stage === "mental_health") {
    return processMentalHealthMessage(message, context, sessionId, userId)
  } else if (context.stage === "health_support") {
    return processHealthSupportMessage(message, context, sessionId, userId)
  } else if (context.stage === "resource_support") {
    return processResourceSupportMessage(message, context, sessionId, userId)
  } else if (context.stage === "emergency") {
    return processEmergencyMessage(message, context, sessionId, userId)
  } else {
    // Default fallback
    return {
      message:
        "I'm not sure how to help with that. Would you like to talk about mental health support, health information, community resources, or report an emergency?",
      options: ["Mental Health", "Health Info", "Resources", "Emergency"],
    }
  }
}

// Helper functions

function isNewSession(sessionId: string) {
  // In a real implementation, this would check if the session exists in a database
  // For demonstration purposes, we'll assume it's a new session
  return true
}

function getSessionContext(sessionId: string) {
  // In a real implementation, this would retrieve the session context from a database
  // For demonstration purposes, we'll return a default context
  return {
    stage: "initial",
    topic: null,
    subtopic: null,
    data: {},
  }
}

function updateSessionContext(sessionId: string, context: any) {
  // In a real implementation, this would update the session context in a database
  // For demonstration purposes, we'll just log it
  console.log("Updated context for session", sessionId, context)
}

function getWelcomeMessage(userId: string) {
  return {
    message:
      "Welcome to Ujamaa Health and Community Support chat. How can I help you today? You can ask about mental health support, health information, community resources, or report an emergency.",
    options: ["Mental Health", "Health Info", "Resources", "Emergency"],
  }
}

function processInitialMessage(message: string, sessionId: string, userId: string) {
  // Convert message to lowercase for easier matching
  const lowerMessage = message.toLowerCase()

  // Check for keywords to determine the user's intent
  if (
    lowerMessage.includes("mental") ||
    lowerMessage.includes("anxiety") ||
    lowerMessage.includes("depression") ||
    lowerMessage.includes("stress") ||
    lowerMessage.includes("counseling")
  ) {
    // Update session context
    updateSessionContext(sessionId, {
      stage: "mental_health",
      topic: null,
      subtopic: null,
      data: {},
    })

    return {
      message: "I'd be happy to help with mental health support. What specific area are you interested in?",
      options: ["Anxiety", "Depression", "Stress Management", "Trauma", "Counseling Services", "Support Groups"],
    }
  } else if (
    lowerMessage.includes("health") ||
    lowerMessage.includes("medical") ||
    lowerMessage.includes("doctor") ||
    lowerMessage.includes("appointment") ||
    lowerMessage.includes("symptom")
  ) {
    // Update session context
    updateSessionContext(sessionId, {
      stage: "health_support",
      topic: null,
      subtopic: null,
      data: {},
    })

    return {
      message: "I can help with health information and services. What would you like to know about?",
      options: ["Health Tips", "Find a Doctor", "Book Appointment", "Symptom Check", "Medication Info"],
    }
  } else if (
    lowerMessage.includes("resource") ||
    lowerMessage.includes("community") ||
    lowerMessage.includes("help") ||
    lowerMessage.includes("support") ||
    lowerMessage.includes("need")
  ) {
    // Update session context
    updateSessionContext(sessionId, {
      stage: "resource_support",
      topic: null,
      subtopic: null,
      data: {},
    })

    return {
      message: "I can help you find community resources. What type of resources are you looking for?",
      options: ["Medical Supplies", "Food & Nutrition", "Transportation", "Education", "Legal Aid", "Housing"],
    }
  } else if (
    lowerMessage.includes("emergency") ||
    lowerMessage.includes("urgent") ||
    lowerMessage.includes("crisis") ||
    lowerMessage.includes("danger")
  ) {
    // Update session context
    updateSessionContext(sessionId, {
      stage: "emergency",
      topic: null,
      subtopic: null,
      data: {},
    })

    return {
      message:
        "If this is a life-threatening emergency, please contact emergency services immediately. Otherwise, I can help you report a community emergency. What type of emergency would you like to report?",
      options: ["Medical", "Security", "Weather", "Infrastructure", "Disease Outbreak", "Other"],
    }
  } else {
    // Couldn't determine intent, ask for clarification
    return {
      message:
        "I'm not sure I understand what you're looking for. Could you please specify if you need help with mental health support, health information, community resources, or reporting an emergency?",
      options: ["Mental Health", "Health Info", "Resources", "Emergency"],
    }
  }
}

function processMentalHealthMessage(message: string, context: any, sessionId: string, userId: string) {
  const lowerMessage = message.toLowerCase()

  // If topic is not set, determine the topic based on the message
  if (!context.topic) {
    let topic = null

    if (lowerMessage.includes("anxiety")) {
      topic = "anxiety"
    } else if (lowerMessage.includes("depression")) {
      topic = "depression"
    } else if (lowerMessage.includes("stress")) {
      topic = "stress"
    } else if (lowerMessage.includes("trauma")) {
      topic = "trauma"
    } else if (lowerMessage.includes("counseling") || lowerMessage.includes("service")) {
      topic = "counseling"
    } else if (lowerMessage.includes("group") || lowerMessage.includes("support group")) {
      topic = "support_groups"
    } else {
      // Couldn't determine topic, ask for clarification
      return {
        message:
          "I'd like to help with your mental health concerns. Could you please specify which area you're interested in?",
        options: ["Anxiety", "Depression", "Stress Management", "Trauma", "Counseling Services", "Support Groups"],
      }
    }

    // Update context with the determined topic
    context.topic = topic
    updateSessionContext(sessionId, context)

    // Provide information based on the topic
    switch (topic) {
      case "anxiety":
        return {
          message:
            "Anxiety is a common mental health concern. Here are some resources that might help:\n\n1. Breathing exercises and mindfulness techniques\n2. Information about anxiety disorders\n3. Connect with an anxiety counselor\n4. Join an anxiety support group\n\nWhat would you like to explore?",
          options: ["Techniques", "Information", "Counselor", "Support Group"],
        }
      case "depression":
        return {
          message:
            "Depression can be challenging to deal with, but support is available. Here are some resources that might help:\n\n1. Understanding depression symptoms\n2. Self-care strategies for depression\n3. Connect with a depression counselor\n4. Join a depression support group\n\nWhat would you like to explore?",
          options: ["Symptoms", "Self-care", "Counselor", "Support Group"],
        }
      case "stress":
        return {
          message:
            "Managing stress is important for mental wellbeing. Here are some resources that might help:\n\n1. Stress reduction techniques\n2. Understanding stress triggers\n3. Connect with a stress management counselor\n4. Join a stress management workshop\n\nWhat would you like to explore?",
          options: ["Techniques", "Triggers", "Counselor", "Workshop"],
        }
      case "trauma":
        return {
          message:
            "Trauma can have lasting effects, but healing is possible. Here are some resources that might help:\n\n1. Understanding trauma responses\n2. Coping strategies for trauma\n3. Connect with a trauma counselor\n4. Join a trauma support group\n\nWhat would you like to explore?",
          options: ["Information", "Coping", "Counselor", "Support Group"],
        }
      case "counseling":
        return {
          message:
            "We offer various counseling services for mental health support. Options include:\n\n1. One-on-one counseling via voice call\n2. Text-based counseling\n3. Group counseling sessions\n4. Family counseling\n\nWhat type of counseling are you interested in?",
          options: ["Voice Call", "Text", "Group", "Family"],
        }
      case "support_groups":
        return {
          message:
            "Support groups can provide community and understanding. We have groups for:\n\n1. Anxiety and panic disorders\n2. Depression and mood disorders\n3. Grief and loss\n4. Trauma survivors\n5. General mental wellness\n\nWhich type of support group are you interested in?",
          options: ["Anxiety", "Depression", "Grief", "Trauma", "Wellness"],
        }
    }
  } else {
    // Topic is already set, process subtopic or provide more specific information
    const topic = context.topic

    // If this is a request to connect with a counselor
    if (
      lowerMessage.includes("counselor") ||
      lowerMessage.includes("connect") ||
      lowerMessage.includes("talk to someone")
    ) {
      return {
        message:
          "I'd be happy to help you connect with a mental health counselor. You can:\n\n1. Call our counseling line at 0800-UJAMAA\n2. Schedule a callback from a counselor\n3. Start a text-based counseling session\n\nHow would you prefer to connect?",
        options: ["Call Now", "Schedule Callback", "Text Counseling"],
      }
    }

    // If this is a request to join a support group
    if (lowerMessage.includes("group") || lowerMessage.includes("join")) {
      return {
        message:
          "Great! To join a support group, you can:\n\n1. Receive SMS notifications about upcoming meetings\n2. Join a voice conference group session\n3. Participate in a text-based group chat\n\nHow would you like to participate?",
        options: ["SMS Notifications", "Voice Conference", "Text Group"],
      }
    }

    // If this is a request for techniques or information
    if (
      lowerMessage.includes("technique") ||
      lowerMessage.includes("information") ||
      lowerMessage.includes("tip") ||
      lowerMessage.includes("help")
    ) {
      switch (topic) {
        case "anxiety":
          return {
            message:
              "Here are some techniques that can help with anxiety:\n\n1. Deep breathing: Inhale for 4 counts, hold for 2, exhale for 6\n2. Progressive muscle relaxation: Tense and release muscle groups\n3. Grounding technique: Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste\n4. Mindfulness meditation: Focus on the present moment\n\nWould you like more information on any of these techniques?",
            options: ["Deep Breathing", "Muscle Relaxation", "Grounding", "Mindfulness", "Connect with Counselor"],
          }
        case "depression":
          return {
            message:
              "Here are some self-care strategies for depression:\n\n1. Establish a daily routine\n2. Set small, achievable goals\n3. Physical activity, even just a short walk\n4. Connect with supportive people\n5. Practice self-compassion\n\nWould you like more information on any of these strategies?",
            options: [
              "Daily Routine",
              "Goal Setting",
              "Physical Activity",
              "Social Connection",
              "Connect with Counselor",
            ],
          }
        case "stress":
          return {
            message:
              "Here are some stress reduction techniques:\n\n1. Time management and prioritization\n2. Setting boundaries\n3. Regular physical activity\n4. Mindfulness and meditation\n5. Adequate sleep and nutrition\n\nWould you like more information on any of these techniques?",
            options: ["Time Management", "Boundaries", "Exercise", "Mindfulness", "Connect with Counselor"],
          }
        case "trauma":
          return {
            message:
              "Here are some coping strategies for trauma:\n\n1. Grounding techniques to stay present\n2. Creating safety in your environment\n3. Self-care and self-compassion\n4. Connecting with support systems\n5. Professional trauma-informed therapy\n\nWould you like more information on any of these strategies?",
            options: ["Grounding", "Safety", "Self-care", "Support", "Connect with Counselor"],
          }
      }
    }

    // Default response if we can't determine the specific request
    return {
      message:
        "Is there something specific about " +
        topic.replace("_", " ") +
        " that you'd like to know more about? Or would you like to connect with a counselor or support group?",
      options: ["More Information", "Connect with Counselor", "Join Support Group", "Different Topic"],
    }
  }
}

function processHealthSupportMessage(message: string, context: any, sessionId: string, userId: string) {
  const lowerMessage = message.toLowerCase();
  
  // If topic is not set, determine the topic based on the message
  if (!context.topic) {
    let topic = null;
    
    if (lowerMessage.includes("tip") || lowerMessage.includes("advice")) {
      topic = "health_tips";
    } else if (lowerMessage.includes("doctor") || lowerMessage.includes("find") || lowerMessage.includes("facility")) {
      topic = "find_doctor";
    } else if (lowerMessage.includes("appointment") || lowerMessage.includes("book")) {
      topic = "appointment";
    } else if (lowerMessage.includes("symptom") || lowerMessage.includes("check")) {
      topic = "symptom_check";
    } else if (lowerMessage.includes("medication") || lowerMessage.includes("drug") || lowerMessage.includes("medicine")) {
      topic = "medication";
    } else {
      // Couldn't determine topic, ask for clarification
      return {
        message: "I'd like to help with your health concerns. Could you please specify what you're looking for?",
        options: ["Health Tips", "Find a Doctor", "Book Appointment", "Symptom Check", "Medication Info"]
      };
    }
    
    // Update context with the determined topic
    context.topic = topic;
    updateSessionContext(sessionId, context);
    
    // Provide information based on the topic
    switch (topic) {
      case "health_tips":
        return {
          message: "I can provide health tips on various topics. What are you interested in?",
          options: ["General Health", "Nutrition", "Exercise", "Disease Prevention", "Maternal Health", "Child Health"]
        };
      case "find_doctor":
        return {
          message: "I can help you find healthcare facilities. What type of facility are you looking for?",
          options: ["Hospital", "Clinic", "Pharmacy", "Specialized Care", "Emergency Services"]
        };
      case "appointment":
        return {
          message: "I can help you book a medical appointment. What type of appointment do you need?",
          options: ["General Check-up", "Vaccination", "Prenatal Care", "Child Health", "Chronic Disease", "Dental"]
        };
      case "symptom_check":
        return {
          message: "I can help with basic symptom assessment. Please note this is not a substitute for professional medical advice. What symptoms are you experiencing?",
          options: ["Fever", "Cough", "Headache", "Stomach Pain", "Skin Issues", "Other"]
        };
      case "medication":
        return {
          message: "I can provide general information about medications. What would you like to know?",
          options: ["Medication Usage", "Side Effects", "Drug Interactions", "Storage", "Generic vs. Brand"]
        };
    }
  } else {
    // Topic is already set, process subtopic or provide more specific information
    const topic = context.topic;
    
    // Process based on the topic
    switch (topic) {
      case "health_tips":
        // Determine which health tip category they're interested in
        let tipCategory = null;
        if (lowerMessage.includes("general")) {
          tipCategory = "general";
        } else if (lowerMessage.includes("nutrition")) {
          tipCategory = "nutrition";
        } else if (lowerMessage.includes("exercise")) {
          tipCategory = "exercise";
        } else if (lowerMessage.includes("disease") || lowerMessage.includes("prevention")) {
          tipCategory = "disease";
        } else if (lowerMessage.includes("maternal") || lowerMessage.includes("pregnancy")) {
          tipCategory = "maternal";
        } else if (lowerMessage.includes("child") || lowerMessage.includes("baby")) {
          tipCategory = "child";
        }
        
        // Provide tips based on the category
        if (tipCategory === "general") {
          return {
            message

