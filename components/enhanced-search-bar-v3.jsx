"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, MapPin, Calendar, Users, X, Home, ChevronLeft, ChevronRight, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { format, addDays, differenceInDays, isBefore, isAfter } from "date-fns"

// Unique Timeline Date Selector Component
function TimelineDateSelector({ dateRange, setDateRange }) {
  const today = new Date();
  const [selectedStartIndex, setSelectedStartIndex] = useState(null);
  const [selectedEndIndex, setSelectedEndIndex] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  
  // Generate next 14 days for the timeline
  const timelineDays = Array.from({ length: 14 }, (_, i) => addDays(today, i));
  
  // Handle timeline day click
  const handleDayClick = (index) => {
    const clickedDate = timelineDays[index];
    
    if (selectedStartIndex === null || (selectedStartIndex !== null && selectedEndIndex !== null)) {
      // Start new selection
      setSelectedStartIndex(index);
      setSelectedEndIndex(null);
      setDateRange({ 
        from: clickedDate, 
        to: undefined 
      });
    } else {
      // Complete selection
      if (index < selectedStartIndex) {
        setSelectedStartIndex(index);
        setSelectedEndIndex(selectedStartIndex);
        setDateRange({ 
          from: clickedDate, 
          to: timelineDays[selectedStartIndex]
        });
      } else {
        setSelectedEndIndex(index);
        setDateRange({ 
          from: timelineDays[selectedStartIndex], 
          to: clickedDate
        });
      }
    }
  };
  
  // Get the class for a timeline day
  const getDayClass = (index) => {
    const isStart = index === selectedStartIndex;
    const isEnd = index === selectedEndIndex;
    const isInRange = selectedStartIndex !== null && 
                      selectedEndIndex !== null && 
                      index > selectedStartIndex && 
                      index < selectedEndIndex;
    const isHovered = hoverIndex !== null && 
                      selectedStartIndex !== null && 
                      selectedEndIndex === null &&
                      ((index > selectedStartIndex && index <= hoverIndex) ||
                       (index < selectedStartIndex && index >= hoverIndex));
    
    let className = "h-full w-full flex flex-col items-center justify-center rounded-lg transition-all ";
    
    if (isStart || isEnd) {
      className += "bg-blue-600 text-white scale-110 z-10 ";
    } else if (isInRange || isHovered) {
      className += "bg-blue-100 text-blue-800 ";
    } else {
      className += "bg-white hover:bg-blue-50 ";
    }
    
    return className;
  };
  
  // Get the class for the timeline connector
  const getConnectorClass = (index) => {
    if (index >= timelineDays.length - 1) return "";
    
    const isConnected = (selectedStartIndex !== null && selectedEndIndex !== null &&
                         ((index >= selectedStartIndex && index < selectedEndIndex) ||
                          (index >= selectedEndIndex && index < selectedStartIndex))) ||
                         (selectedStartIndex !== null && selectedEndIndex === null && hoverIndex !== null &&
                         ((index >= selectedStartIndex && index < hoverIndex) ||
                          (index >= hoverIndex && index < selectedStartIndex)));
    
    return `absolute top-1/2 right-0 w-full h-1 ${isConnected ? 'bg-blue-200' : 'bg-gray-200'}`;
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="h-[180px] overflow-hidden">
        {/* Timeline header */}
        <div className="flex justify-between mb-2 px-2">
          <div className="flex items-center text-sm font-medium">
            <Sun className="h-4 w-4 text-orange-500 mr-1" />
            <span>Today</span>
          </div>
          <div className="flex items-center text-sm font-medium">
            <span>Future</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </div>
        </div>
        
        {/* Timeline */}
        <div className="relative flex overflow-x-auto pb-4 hide-scrollbar">
          <div className="flex space-x-2 px-2">
            {timelineDays.map((day, index) => (
              <div 
                key={index}
                className="relative flex-shrink-0 w-16"
                onMouseEnter={() => selectedStartIndex !== null && selectedEndIndex === null && setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <div 
                  className={getDayClass(index)}
                  onClick={() => handleDayClick(index)}
                >
                  <p className="text-xs font-medium">{format(day, "EEE")}</p>
                  <p className="text-lg font-bold">{format(day, "d")}</p>
                  <p className="text-xs">{format(day, "MMM")}</p>
                </div>
                <div className={getConnectorClass(index)}></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Quick duration buttons */}
        <div className="grid grid-cols-4 gap-2 mt-4 px-2">
          {[
            { label: "Weekend", days: 2, icon: <Sun className="h-3 w-3" /> },
            { label: "Week", days: 7, icon: <Calendar className="h-3 w-3" /> },
            { label: "2 Weeks", days: 14, icon: <Calendar className="h-3 w-3" /> },
            { label: "Month", days: 30, icon: <Moon className="h-3 w-3" /> }
          ].map((option, index) => (
            <button
              key={index}
              className="flex flex-col items-center justify-center p-2 border rounded-lg hover:bg-blue-50 transition-colors"
              onClick={() => {
                setSelectedStartIndex(0);
                const endIndex = Math.min(option.days - 1, timelineDays.length - 1);
                setSelectedEndIndex(endIndex);
                setDateRange({
                  from: today,
                  to: timelineDays[endIndex]
                });
              }}
            >
              <div className="bg-blue-100 p-1 rounded-full mb-1">
                {option.icon}
              </div>
              <span className="text-xs">{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Add CSS to hide scrollbar but keep functionality
const hideScrollbarCSS = `
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

export default function EnhancedSearchBarV3() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState("location")
  const [location, setLocation] = useState("")
  const [dateRange, setDateRange] = useState({ from: undefined, to: undefined })
  const [guests, setGuests] = useState({ adults: 1, children: 0 })
  const searchBarRef = useRef(null)

  const popularLocations = [
    "Bali, Indonesia",
    "Aspen, Colorado",
    "Tulum, Mexico",
    "Santorini, Greece",
    "Kyoto, Japan",
    "Costa Rica",
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
    console.log({ location, dateRange, guests })
    setIsExpanded(false)
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
    <div ref={searchBarRef} className="w-full max-w-4xl mx-auto relative z-50">
      <style>{hideScrollbarCSS}</style>
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
                  ? `${totalGuests} guest${totalGuests > 1 ? "s" : ""}`
                  : "Add guests"}
              </p>
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
            className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200 w-full max-w-4xl mx-auto"
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
                          key={loc}
                          className="p-3 border rounded-lg hover:bg-red-50 cursor-pointer transition-colors flex items-center"
                          onClick={() => setLocation(loc)}
                        >
                          <MapPin className="h-4 w-4 text-red-500 mr-2" />
                          <span className="text-sm">{loc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "dates" && (
                <div className="h-[250px] overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-medium">When are you traveling?</h3>
                      <p className="text-xs text-muted-foreground">Slide to select your dates</p>
                    </div>
                    {(dateRange.from || dateRange.to) && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs"
                        onClick={() => {
                          setDateRange({ from: undefined, to: undefined });
                        }}
                      >
                        Clear
                      </Button>
                    )}
                  </div>

                  {/* Timeline Date Selector */}
                  <TimelineDateSelector 
                    dateRange={dateRange}
                    setDateRange={setDateRange}
                  />

                  {/* Selected dates summary */}
                  {(dateRange.from && dateRange.to) && (
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-2 rounded-lg mt-2 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-white p-1 rounded-full shadow-sm">
                          <Calendar className="h-3 w-3 text-blue-600" />
                        </div>
                        <div className="ml-1.5">
                          <p className="text-xs font-medium">{format(dateRange.from, "MMM d")} - {format(dateRange.to, "MMM d, yyyy")}</p>
                        </div>
                      </div>
                      <div className="bg-blue-600 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                        {differenceInDays(dateRange.to, dateRange.from)} nights
                      </div>
                    </div>
                  )}
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
                <Search className="h-4 w-4 mr-2" />
                Find Retreats
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}
