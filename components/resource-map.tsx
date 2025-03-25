"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

type Resource = {
  id: string
  name: string
  type: string
  address: string
  lat: number
  lng: number
  phone?: string
  services?: string[]
}

export default function ResourceMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const leafletMapRef = useRef<any>(null)
  const [loading, setLoading] = useState(true)
  const [resources, setResources] = useState<Resource[]>([])
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [leafletLoaded, setLeafletLoaded] = useState(false)

  // Sample resource data - in a real app, this would come from an API
  const sampleResources: Resource[] = [
    {
      id: "1",
      name: "Central Community Hospital",
      type: "Medical Clinics",
      address: "123 Health St, Nairobi",
      lat: -1.2921,
      lng: 36.8219,
      phone: "+254 123 456 789",
      services: ["General check-up", "Vaccination", "Prenatal care"],
    },
    {
      id: "2",
      name: "Wellness Pharmacy",
      type: "Pharmacies",
      address: "456 Medicine Ave, Nairobi",
      lat: -1.298,
      lng: 36.812,
      phone: "+254 987 654 321",
      services: ["Prescription filling", "Health consultations", "First aid supplies"],
    },
    {
      id: "3",
      name: "Legal Aid Center",
      type: "Legal Aid",
      address: "789 Justice Rd, Nairobi",
      lat: -1.285,
      lng: 36.825,
      phone: "+254 456 789 123",
      services: ["Legal consultations", "Document assistance", "Rights education"],
    },
    {
      id: "4",
      name: "Community Learning Center",
      type: "Education",
      address: "101 Knowledge Blvd, Nairobi",
      lat: -1.305,
      lng: 36.818,
      phone: "+254 789 123 456",
      services: ["Adult education", "Youth programs", "Computer training"],
    },
    {
      id: "5",
      name: "Nourish Food Bank",
      type: "Food Banks",
      address: "202 Sustenance St, Nairobi",
      lat: -1.29,
      lng: 36.83,
      phone: "+254 321 654 987",
      services: ["Food distribution", "Nutrition education", "Community garden"],
    },
  ]

  // Load Leaflet library
  useEffect(() => {
    setResources(sampleResources)

    if (typeof window !== "undefined") {
      // Check if Leaflet is already loaded
      if (window.L) {
        setLeafletLoaded(true)
        return
      }

      // Load Leaflet CSS
      const linkElement = document.createElement("link")
      linkElement.rel = "stylesheet"
      linkElement.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      linkElement.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
      linkElement.crossOrigin = ""
      document.head.appendChild(linkElement)

      // Load Leaflet JS
      const script = document.createElement("script")
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
      script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
      script.crossOrigin = ""
      script.onload = () => {
        setLeafletLoaded(true)
      }
      document.body.appendChild(script)
    }

    // Cleanup function
    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove()
        leafletMapRef.current = null
      }
    }
  }, [])

  // Initialize map once Leaflet is loaded
  useEffect(() => {
    if (!leafletLoaded || !mapRef.current || leafletMapRef.current) return

    try {
      const L = window.L
      const map = L.map(mapRef.current).setView([-1.2921, 36.8219], 13)

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map)

      leafletMapRef.current = map
      setLoading(false)
    } catch (error) {
      console.error("Error initializing map:", error)
      setLoading(false)
    }
  }, [leafletLoaded])

  // Add markers when map is ready or filter changes
  useEffect(() => {
    if (!leafletLoaded || !leafletMapRef.current) return

    try {
      const map = leafletMapRef.current
      const L = window.L

      // Clear existing markers
      map.eachLayer((layer: any) => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer)
        }
      })

      // Filter resources if a filter is active
      const filteredResources = activeFilter
        ? resources.filter((resource) => resource.type === activeFilter)
        : resources

      // Add markers for each resource
      filteredResources.forEach((resource) => {
        const marker = L.marker([resource.lat, resource.lng])
          .addTo(map)
          .bindPopup(`<b>${resource.name}</b><br>${resource.type}<br>${resource.address}`)
          .on("click", () => {
            setSelectedResource(resource)
          })
      })

      // If we have filtered resources, adjust the map view
      if (filteredResources.length > 0) {
        const bounds = L.latLngBounds(filteredResources.map((r) => [r.lat, r.lng]))
        if (bounds.isValid()) {
          map.fitBounds(bounds)
        }
      }
    } catch (error) {
      console.error("Error adding markers:", error)
    }
  }, [leafletLoaded, resources, activeFilter])

  const filterResources = (type: string) => {
    setActiveFilter(activeFilter === type ? null : type)
  }

  const resourceTypes = [...new Set(resources.map((r) => r.type))]

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 mb-4">
        {resourceTypes.map((type) => (
          <Button
            key={type}
            variant={activeFilter === type ? "default" : "outline"}
            size="sm"
            onClick={() => filterResources(type)}
            className={`text-xs md:text-sm ${activeFilter === type ? "bg-green-600 hover:bg-green-700" : "border-gray-600 hover:bg-gray-700"}`}
          >
            {type}
          </Button>
        ))}
        {activeFilter && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveFilter(null)}
            className="text-xs md:text-sm text-gray-300 hover:text-white hover:bg-gray-700"
          >
            Clear Filter
          </Button>
        )}
      </div>

      <div className="relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50 z-10 rounded-lg">
            <Loader2 className="h-8 w-8 animate-spin text-green-500" />
          </div>
        )}
        <div ref={mapRef} className="h-[400px] rounded-lg border border-gray-700"></div>
      </div>

      {selectedResource && (
        <Card className="mt-4 bg-gray-800 border-gray-700">
          <CardContent className="pt-6">
            <div className="flex items-start gap-2">
              <MapPin className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white">{selectedResource.name}</h3>
                <p className="text-sm text-gray-400">{selectedResource.type}</p>
                <p className="text-sm text-gray-300">{selectedResource.address}</p>
                {selectedResource.phone && <p className="text-sm text-gray-300">Phone: {selectedResource.phone}</p>}
                {selectedResource.services && selectedResource.services.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium text-white">Services:</p>
                    <ul className="text-sm list-disc list-inside text-gray-300">
                      {selectedResource.services.map((service, index) => (
                        <li key={index}>{service}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="bg-gray-700/50 p-4 rounded-lg text-sm">
        <h4 className="font-medium mb-2 text-white">Offline Access</h4>
        <p className="text-gray-300">
          This map can be accessed offline by saving this page before going to areas with limited connectivity. Resource
          data will be cached for offline viewing. For the most up-to-date information, connect to the internet or use
          our USSD service by dialing *123#.
        </p>
      </div>
    </div>
  )
}

