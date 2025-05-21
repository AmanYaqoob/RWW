"use client"

import { useState, useEffect } from "react"
import { MapPin } from "lucide-react"

export default function PropertyMap({ location, address }) {
  const [mapUrl, setMapUrl] = useState("")

  useEffect(() => {
    // In a real app, you would use a proper map API like Google Maps or Mapbox
    // For this demo, we'll use a static map image
    const encodedAddress = encodeURIComponent(address || location)
    setMapUrl(
      `https://maps.googleapis.com/maps/api/staticmap?center=${encodedAddress}&zoom=14&size=600x300&markers=color:red%7C${encodedAddress}&key=YOUR_API_KEY`,
    )
  }, [location, address])

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Location</h3>
      <div className="aspect-video relative rounded-lg overflow-hidden border">
        {/* This is a placeholder for the actual map */}
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center p-6">
            <MapPin className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <h4 className="font-medium text-lg">{location}</h4>
            {address && <p className="text-muted-foreground">{address}</p>}
            <p className="mt-4 text-sm text-muted-foreground">
              Map integration would display here with a proper API key
            </p>
          </div>
        </div>
      </div>
      <p className="text-muted-foreground">
        Exact location provided after booking. Property is located in a safe and convenient area with easy access to
        local attractions.
      </p>
    </div>
  )
}
