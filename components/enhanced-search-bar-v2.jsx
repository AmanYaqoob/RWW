"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, MapPin, Calendar, Users, X, Sparkles, Home, PalmTree, Mountain, Waves, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format, addDays } from "date-fns"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export default function EnhancedSearchBarV2() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState("location")
  const [location, setLocation] = useState("")
  const [dateRange, setDateRange] = useState({ from: undefined, to: undefined })
  const [guests, setGuests] = useState({ adults: 1, children: 0, pets: 0 })
  const [propertyType, setPropertyType] = useState("")
  const searchBarRef = useRef(null)

  const popularLocations = [
    { name: "Bali, Indonesia", icon: <PalmTree className="h-4 w-4" /> },
    { name: "Aspen, Colorado", icon: <Mountain className="h-4 w-4" /> },
    { name: "Tulum, Mexico", icon: <Waves className="h-4 w-4" /> },
    { name: "Santorini, Greece", icon: <Building className="h-4 w-4" /> },
    { name: "Kyoto, Japan", icon: <Home className="h-4 w-4" /> },
    { name: "Costa Rica", icon: <PalmTree className="h-4 w-4" /> },
  ]

  const propertyTypes = [
    { name: "Villa", icon: <Home className="h-4 w-4" /> },
    { name: "Beachfront", icon: <Waves className="h-4 w-4" /> },
    { name: "Mountain", icon: <Mountain className="h-4 w-4" /> },
    { name: "Urban", icon: <Building className="h-4 w-4" /> },
  ]

  const handleClickOutside = (event) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
      setIsExpanded(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSearch = () => {
    console.log({ location, dateRange, guests, propertyType })
    setIsExpanded(false)
    // In a real app, you would navigate to search results page
  }

  const incrementGuest = (type) => {
    setGuests((prev) => ({ ...prev, [type]: prev[type] + 1 }))
  }

  const decrementGuest = (type) => {
    if (guests[type] > 0 && !(type === "adults" && guests[type] <= 1)) {
      setGuests((prev) => ({ ...prev, [type]: prev[type] - 1 }))
    }
  }

  const totalGuests = guests.adults + guests.children

  return (
    <div ref={searchBarRef} className="w-full max-w-5xl mx-auto relative z-50">
      {/* Compact Search Bar */}
      {!isExpanded ? (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/90 backdrop-blur-md rounded-full shadow-xl overflow-hidden flex items-center border border-gray-200"
        >
          <div
            className="flex-1 p-4 cursor-pointer flex items-center"
            onClick={() => {
              setIsExpanded(true)
              setActiveTab("location")
            }}
          >
            <div className="bg-red-100 p-2 rounded-full mr-3">
              <MapPin className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="font-medium text-sm">Where</p>
              <p className="text-sm text-muted-foreground truncate max-w-[120px]">
                {location ? location : "Search destinations"}
              </p>
            </div>
          </div>

          <div className="h-10 w-px bg-gray-200" />

          <div
            className="flex-1 p-4 cursor-pointer flex items-center"
            onClick={() => {
              setIsExpanded(true)
              setActiveTab("dates")
            }}
          >
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-sm">When</p>
              <p className="text-sm text-muted-foreground">
                {dateRange.from && dateRange.to
                  ? `${format(dateRange.from, "MMM d")} - ${format(dateRange.to, "MMM d")}`
                  : "Add dates"}
              </p>
            </div>
          </div>

          <div className="h-10 w-px bg-gray-200" />

          <div
            className="flex-1 p-4 cursor-pointer flex items-center"
            onClick={() => {
              setIsExpanded(true)
              setActiveTab("guests")
            }}
          >
            <div className="bg-green-100 p-2 rounded-full mr-3">
              <Users className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-sm">Who</p>
              <p className="text-sm text-muted-foreground">
                {totalGuests > 0
                  ? `${totalGuests} guest${totalGuests > 1 ? "s" : ""}${
                      guests.pets > 0 ? `, ${guests.pets} pet${guests.pets > 1 ? "s" : ""}` : ""
                    }`
                  : "Add guests"}
              </p>
            </div>
          </div>

          <div className="h-10 w-px bg-gray-200" />

          <div
            className="flex-1 p-4 cursor-pointer flex items-center"
            onClick={() => {
              setIsExpanded(true)
              setActiveTab("type")
            }}
          >
            <div className="bg-purple-100 p-2 rounded-full mr-3">
              <Home className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="font-medium text-sm">What</p>
              <p className="text-sm text-muted-foreground">{propertyType || "Property type"}</p>
            </div>
          </div>

          <div className="p-2 pr-3">
            <Button
              onClick={handleSearch}
              className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 rounded-full h-12 w-12 p-0"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200"
          >
            {/* Header with tabs */}
            <div className="flex border-b">
              <button
                className={`flex-1 py-4 px-6 text-center font-medium relative ${
                  activeTab === "location" ? "text-red-600" : "text-gray-600"
                }`}
                onClick={() => setActiveTab("location")}
              >
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Where</span>
                </div>
                {activeTab === "location" && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
                )}
              </button>
              <button
                className={`flex-1 py-4 px-6 text-center font-medium relative ${
                  activeTab === "dates" ? "text-blue-600" : "text-gray-600"
                }`}
                onClick={() => setActiveTab("dates")}
              >
                <div className="flex items-center justify-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>When</span>
                </div>
                {activeTab === "dates" && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </button>
              <button
                className={`flex-1 py-4 px-6 text-center font-medium relative ${
                  activeTab === "guests" ? "text-green-600" : "text-gray-600"
                }`}
                onClick={() => setActiveTab("guests")}
              >
                <div className="flex items-center justify-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Who</span>
                </div>
                {activeTab === "guests" && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600" />
                )}
              </button>
              <button
                className={`flex-1 py-4 px-6 text-center font-medium relative ${
                  activeTab === "type" ? "text-purple-600" : "text-gray-600"
                }`}
                onClick={() => setActiveTab("type")}
              >
                <div className="flex items-center justify-center gap-2">
                  <Home className="h-4 w-4" />
                  <span>What</span>
                </div>
                {activeTab === "type" && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600" />
                )}
              </button>
              <button onClick={() => setIsExpanded(false)} className="p-4 text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content based on active tab */}
            <div className="p-6">
              {activeTab === "location" && (
                <div className="space-y-6">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search destinations"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      autoFocus
                    />
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Popular destinations</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {popularLocations.map((loc) => (
                        <div
                          key={loc.name}
                          className="p-3 border rounded-lg hover:bg-red-50 cursor-pointer transition-colors flex items-center"
                          onClick={() => setLocation(loc.name)}
                        >
                          <div className="bg-red-100 p-2 rounded-full mr-2">
                            {loc.icon}
                          </div>
                          <span className="text-sm">{loc.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "dates" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Select dates</h3>
                      <p className="text-sm text-muted-foreground">Add your travel dates for exact pricing</p>
                    </div>
                    {(dateRange.from || dateRange.to) && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDateRange({ from: undefined, to: undefined })}
                      >
                        Clear dates
                      </Button>
                    )}
                  </div>

                  <div className="flex justify-center">
                    <CalendarComponent
                      mode="range"
                      selected={{
                        from: dateRange.from,
                        to: dateRange.to,
                      }}
                      onSelect={(range) => {
                        setDateRange({
                          from: range?.from,
                          to: range?.to,
                        })
                      }}
                      numberOfMonths={2}
                      className="rounded-md border"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge 
                      variant="outline" 
                      className="cursor-pointer hover:bg-blue-50"
                      onClick={() => {
                        const today = new Date()
                        setDateRange({
                          from: today,
                          to: addDays(today, 7),
                        })
                      }}
                    >
                      1 week
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className="cursor-pointer hover:bg-blue-50"
                      onClick={() => {
                        const today = new Date()
                        setDateRange({
                          from: today,
                          to: addDays(today, 14),
                        })
                      }}
                    >
                      2 weeks
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className="cursor-pointer hover:bg-blue-50"
                      onClick={() => {
                        const today = new Date()
                        setDateRange({
                          from: today,
                          to: addDays(today, 30),
                        })
                      }}
                    >
                      1 month
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className="cursor-pointer hover:bg-blue-50"
                      onClick={() => {
                        const today = new Date()
                        setDateRange({
                          from: addDays(today, 30),
                          to: addDays(today, 60),
                        })
                      }}
                    >
                      Next month
                    </Badge>
                  </div>
                </div>
              )}

              {activeTab === "guests" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-4">Who's coming?</h3>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Adults</p>
                          <p className="text-sm text-muted-foreground">Ages 13 or above</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => decrementGuest("adults")}
                            className={`h-8 w-8 rounded-full border flex items-center justify-center ${
                              guests.adults <= 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:border-green-500"
                            }`}
                            disabled={guests.adults <= 1}
                          >
                            -
                          </button>
                          <span className="w-6 text-center">{guests.adults}</span>
                          <button
                            onClick={() => incrementGuest("adults")}
                            className="h-8 w-8 rounded-full border flex items-center justify-center text-gray-600 hover:border-green-500"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Children</p>
                          <p className="text-sm text-muted-foreground">Ages 2-12</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => decrementGuest("children")}
                            className={`h-8 w-8 rounded-full border flex items-center justify-center ${
                              guests.children <= 0 ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:border-green-500"
                            }`}
                            disabled={guests.children <= 0}
                          >
                            -
                          </button>
                          <span className="w-6 text-center">{guests.children}</span>
                          <button
                            onClick={() => incrementGuest("children")}
                            className="h-8 w-8 rounded-full border flex items-center justify-center text-gray-600 hover:border-green-500"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Pets</p>
                          <p className="text-sm text-muted-foreground">Service animals always welcome</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => decrementGuest("pets")}
                            className={`h-8 w-8 rounded-full border flex items-center justify-center ${
                              guests.pets <= 0 ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:border-green-500"
                            }`}
                            disabled={guests.pets <= 0}
                          >
                            -
                          </button>
                          <span className="w-6 text-center">{guests.pets}</span>
                          <button
                            onClick={() => incrementGuest("pets")}
                            className="h-8 w-8 rounded-full border flex items-center justify-center text-gray-600 hover:border-green-500"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "type" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">Property type</h3>
                    <p className="text-sm text-muted-foreground mb-4">Select the type of retreat space you're looking for</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {propertyTypes.map((type) => (
                        <div
                          key={type.name}
                          className={cn(
                            "p-4 border rounded-lg cursor-pointer transition-all flex flex-col items-center justify-center gap-2 h-32",
                            propertyType === type.name 
                              ? "border-purple-500 bg-purple-50" 
                              : "hover:border-purple-300 hover:bg-purple-50/50"
                          )}
                          onClick={() => setPropertyType(type.name)}
                        >
                          <div className="bg-purple-100 p-3 rounded-full">
                            {type.icon}
                          </div>
                          <span>{type.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Retreat amenities</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="cursor-pointer hover:bg-purple-50">Workshop Space</Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-purple-50">Yoga Studio</Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-purple-50">Meditation Area</Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-purple-50">Pool</Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-purple-50">Kitchen</Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-purple-50">Wifi</Badge>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer with search button */}
            <div className="p-4 border-t flex justify-between items-center">
              <button className="text-red-600 font-medium flex items-center" onClick={() => setIsExpanded(false)}>
                <X className="h-4 w-4 mr-1" /> Cancel
              </button>
              <Button
                onClick={handleSearch}
                className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Find Retreats
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}
