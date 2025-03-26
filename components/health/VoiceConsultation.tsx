import { useEffect } from "react"

export function VoiceConsultation() {
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://elevenlabs.io/convai-widget/index.js"
    script.async = true
    script.type = "text/javascript"
    document.body.appendChild(script)
  }, [])

  return (
    <div className="voice-consultation">
      <elevenlabs-convai agent-id="YeHykcdml8LW0OoML2w6"></elevenlabs-convai>
    </div>
  )
}