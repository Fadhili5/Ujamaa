import { useEffect } from "react"

export function JitsiMeet() {
  useEffect(() => {
    const domain = "meet.jit.si"
    const options = {
      roomName: "UjamaaMentalHealthCounseling",
      width: "100%",
      height: 600,
      parentNode: document.getElementById("jitsi-container"),
      configOverwrite: {
        enableWelcomePage: false,
      },
      interfaceConfigOverwrite: {
        filmStripOnly: false,
        SHOW_JITSI_WATERMARK: false,
      },
    }
    const api = new window.JitsiMeetExternalAPI(domain, options)
    return () => api.dispose()
  }, [])

  return <div id="jitsi-container" style={{ width: "100%", height: "600px" }}></div>
}