"use client"

import { useState, useRef, useEffect, useCallback } from "react";
import { Search, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button"; // Assuming these are ShadCN UI components
import { cn } from "@/lib/utils"; // Assuming this is a utility for classnames
import {
    format, addMonths, startOfMonth, endOfMonth, getDaysInMonth,
    isSameDay, isWithinInterval, startOfDay, eachDayOfInterval,
    isBefore, isAfter
} from "date-fns";

// Static data defined outside the component
const POPULAR_LOCATIONS = [
    "Bali, Indonesia", "Tulum, Mexico", "Sedona, Arizona",
    "Costa Rica", "Santorini, Greece", "Kyoto, Japan",
];

const TAB_CONTENT_HEIGHT_CLASS = "h-[400px]"; // Adjusted height for dual calendar, can be tuned

export function CustomSearchBar() {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("which");
  const [location, setLocation] = useState("");
  const [dateRange, setDateRange] = useState({ from: undefined, to: undefined });
  const [guests, setGuests] = useState({ adults: 1, children: 0, pets: 0 });
  const searchBarRef = useRef(null);

  // --- NEW "When" tab UI State ---
  const [currentDisplayMonthStart, setCurrentDisplayMonthStart] = useState(startOfMonth(new Date()));
  const [hoveredDate, setHoveredDate] = useState(null); // For showing range preview on hover
  // 'from' means user is selecting the check-in date, 'to' means selecting check-out date.
  // This helps manage the selection logic.
  const [selectingState, setSelectingState] = useState('from');


  // Fallback direct date entry state (retained)
  const [showDirectDateEntry, setShowDirectDateEntry] = useState(false);
  const [customStartDateInput, setCustomStartDateInput] = useState("");
  const [customEndDateInput, setCustomEndDateInput] = useState("");
  const [dateInputError, setDateInputError] = useState("");

  const totalGuests = guests.adults + guests.children;

  const handleSearch = useCallback(() => {
    console.log("Search Parameters:", {
        which: location,
        when: dateRange,
        who: guests
    });
    setExpanded(false);
  }, [location, dateRange, guests]);

  const updateGuests = useCallback((type, value) => {
    setGuests((prev) => ({
      ...prev,
      [type]: Math.max(type === "adults" ? 1 : 0, value),
    }));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- MODIFIED "When" tab functions ---
  const clearAllDates = useCallback(() => {
    setDateRange({ from: undefined, to: undefined });
    setHoveredDate(null);
    setSelectingState('from');
    setCustomStartDateInput("");
    setCustomEndDateInput("");
    setShowDirectDateEntry(false);
    setDateInputError("");
  }, []);

  const handleCalendarDayClick = useCallback((dayDate) => {
    const today = startOfDay(new Date());
    if (isBefore(dayDate, today) && !isSameDay(dayDate, today)) return; // Ignore past dates

    if (selectingState === 'from' || (dateRange.from && dateRange.to)) {
      // Start new selection (either initial, or after a full range was selected)
      setDateRange({ from: dayDate, to: undefined });
      setHoveredDate(null);
      setSelectingState('to');
    } else if (selectingState === 'to' && dateRange.from) {
      // Selecting the 'to' date
      if (isAfter(dayDate, dateRange.from) || isSameDay(dayDate, dateRange.from)) {
        setDateRange({ from: dateRange.from, to: dayDate });
        setSelectingState('from'); // Reset for next potential selection cycle
      } else {
        // Clicked date is before current 'from' date, so make it the new 'from'
        setDateRange({ from: dayDate, to: undefined });
        setHoveredDate(null);
        setSelectingState('to'); // Still need to select 'to' date for this new 'from'
      }
    }
  }, [selectingState, dateRange.from, dateRange.to]);

  const handleDayMouseEnter = useCallback((dayDate) => {
    if (dateRange.from && !dateRange.to && selectingState === 'to') {
        if (isAfter(dayDate, dateRange.from) || isSameDay(dayDate, dateRange.from)) {
            setHoveredDate(dayDate);
        } else {
            setHoveredDate(null); // Don't hover if before 'from' date
        }
    }
  }, [dateRange.from, dateRange.to, selectingState]);

  const handleDayMouseLeave = useCallback(() => {
    // setHoveredDate(null); // Can cause flickering, better to manage hover within mouse enter
  }, []);


  const generateMonthDays = (monthToDisplay) => {
    const days = [];
    const start = startOfMonth(monthToDisplay);
    const end = endOfMonth(monthToDisplay);
    const numDaysInMonth = getDaysInMonth(monthToDisplay);

    // Add empty cells for days before the first of the month
    for (let i = 0; i < start.getDay(); i++) {
        days.push({ key: `empty-${format(start, 'yyyy-MM')}-${i}`, isEmpty: true });
    }
    // Add actual days
    for (let i = 1; i <= numDaysInMonth; i++) {
        const dayDate = new Date(start.getFullYear(), start.getMonth(), i);
        days.push({
            key: format(dayDate, 'yyyy-MM-dd'),
            day: i,
            date: dayDate,
            isEmpty: false
        });
    }
    return days;
  };

  const handleDirectDateEntryApply = useCallback(() => {
    setDateInputError("");
    const [sm, sd, sy] = customStartDateInput.split('/').map(Number);
    const [em, ed, ey] = customEndDateInput.split('/').map(Number);
    
    // Basic validation for year, month, day numbers
    const isValidDate = (y, m, d) => y && m && d && m >= 1 && m <= 12 && d >= 1 && d <= 31;

    const fromDate = isValidDate(sy,sm,sd) ? startOfDay(new Date(sy, sm - 1, sd)) : undefined;
    const toDate = isValidDate(ey,em,ed) ? startOfDay(new Date(ey, em - 1, ed)) : undefined;

    if (fromDate && toDate && !isNaN(fromDate.getTime()) && !isNaN(toDate.getTime()) && (isAfter(toDate, fromDate) || isSameDay(toDate, fromDate))) {
      setDateRange({ from: fromDate, to: toDate });
      setSelectingState('from'); // Reset selection state
      setShowDirectDateEntry(false);
    } else {
      setDateInputError("Invalid dates. Use MM/DD/YYYY & ensure end date is on or after start date.");
    }
  }, [customStartDateInput, customEndDateInput]);

  // --- Render function for a single month grid ---
  const renderMonthGrid = (monthToDisplay) => {
    const days = generateMonthDays(monthToDisplay);
    const today = startOfDay(new Date());

    return (
      <div className="w-1/2 px-2"> {/* Each calendar takes half width */}
        <h4 className="text-lg font-semibold text-center mb-2">{format(monthToDisplay, "MMMM yyyy")}</h4>
        <div className="grid grid-cols-7 gap-1 text-center">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(day => (
            <div key={`${format(monthToDisplay, 'MM')}-${day}`} className="text-xs text-muted-foreground font-medium">{day}</div>
          ))}
          {days.map(dayObj => {
            if (dayObj.isEmpty) return <div key={dayObj.key}></div>;

            const currentDate = dayObj.date;
            const isDisabled = isBefore(currentDate, today) && !isSameDay(currentDate, today);

            let isSelectedStart = false;
            let isSelectedEnd = false;
            let isInRange = false;
            let isHoveredInRange = false;

            if (dateRange.from) {
              isSelectedStart = isSameDay(currentDate, dateRange.from);
            }
            if (dateRange.to) {
              isSelectedEnd = isSameDay(currentDate, dateRange.to);
            }
            if (dateRange.from && dateRange.to) {
              isInRange = isWithinInterval(currentDate, { start: dateRange.from, end: dateRange.to });
            } else if (dateRange.from && hoveredDate && selectingState === 'to') {
              // Hover effect only if selecting 'to' date and hoveredDate is after or same as 'from'
              if (isAfter(hoveredDate, dateRange.from) || isSameDay(hoveredDate, dateRange.from)) {
                 isHoveredInRange = isWithinInterval(currentDate, {
                    start: dateRange.from,
                    end: hoveredDate
                 }) && !isSameDay(currentDate, dateRange.from); // Don't highlight 'from' date itself as hovered
              }
            }
            
            const isHighlighted = isSelectedStart || isSelectedEnd;

            return (
              <Button
                key={dayObj.key}
                variant={isHighlighted ? "default" : (isInRange || isHoveredInRange ? "secondary" : "ghost")}
                size="icon"
                disabled={isDisabled}
                className={cn(
                  "h-9 w-9 p-0 font-normal rounded-full",
                  isDisabled && "text-muted-foreground/50 cursor-not-allowed",
                  isHighlighted && "bg-red-600 text-white hover:bg-red-700",
                  isInRange && !isHighlighted && "bg-red-100 text-red-700 rounded-none",
                  isHoveredInRange && !isHighlighted && "bg-red-50 text-red-600 rounded-none", // Hover range style
                  !isDisabled && !isHighlighted && !isInRange && !isHoveredInRange && "hover:bg-gray-200"
                )}
                onClick={() => handleCalendarDayClick(currentDate)}
                onMouseEnter={() => handleDayMouseEnter(currentDate)}
                onMouseLeave={handleDayMouseLeave}
              >
                {dayObj.day}
              </Button>
            );
          })}
        </div>
      </div>
    );
  };


  return (
    <div
      ref={searchBarRef}
      className={cn(
        "w-full max-w-4xl mx-auto transition-all duration-300 ease-in-out",
        expanded
          ? "bg-white shadow-xl border border-gray-200 rounded-2xl"
          : "bg-white shadow-lg border border-gray-200 rounded-full",
      )}
    >
      {!expanded ? (
        <div className="flex items-center h-16">
          <div className="flex flex-1 items-center h-full cursor-pointer" onClick={() => { setExpanded(true); setActiveTab("which"); }}>
            <div className="px-6 py-2 h-full flex flex-col justify-center border-r border-gray-200">
                <span className="text-sm font-medium">Which</span>
                <span className="text-sm text-muted-foreground">{location || "Search destinations"}</span>
            </div>
            <div className="px-6 py-2 h-full flex flex-col justify-center border-r border-gray-200" onClick={(e) => { e.stopPropagation(); setExpanded(true); setActiveTab("when"); }}>
                <span className="text-sm font-medium">When</span>
                <span className="text-sm text-muted-foreground">{dateRange?.from && dateRange?.to ? `${format(dateRange.from, "MMM d")} - ${format(dateRange.to, "MMM d")}` : "Add dates"}</span>
            </div>
            <div className="px-6 py-2 h-full flex flex-col justify-center" onClick={(e) => { e.stopPropagation(); setExpanded(true); setActiveTab("who"); }}>
                <span className="text-sm font-medium">Who</span>
                <span className="text-sm text-muted-foreground">{totalGuests > 0 ? `${totalGuests} guest${totalGuests !== 1 ? "s" : ""}` : "Add guests"}</span>
            </div>
          </div>
          <div className="px-4">
            <Button onClick={handleSearch} size="icon" className="rounded-full h-10 w-10 bg-red-600 hover:bg-red-700">
                <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden">
          <div className="flex border-b">
            <button className={cn("flex-1 px-6 py-4 text-sm font-medium text-center relative", activeTab === "which" ? "text-black" : "text-muted-foreground")} onClick={() => setActiveTab("which")}>
                Which
                {activeTab === "which" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></div>}
            </button>
            <button className={cn("flex-1 px-6 py-4 text-sm font-medium text-center relative", activeTab === "when" ? "text-black" : "text-muted-foreground")} onClick={() => setActiveTab("when")}>
                When
                {activeTab === "when" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></div>}
            </button>
            <button className={cn("flex-1 px-6 py-4 text-sm font-medium text-center relative", activeTab === "who" ? "text-black" : "text-muted-foreground")} onClick={() => setActiveTab("who")}>
                Who
                {activeTab === "who" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></div>}
            </button>
          </div>

          {activeTab === "which" && (
            <div className={cn("p-6 overflow-y-auto h-[320px]")}> {/* Original height for this tab */}
              <div className="flex items-center mb-4">
                <MapPin className="h-5 w-5 text-muted-foreground mr-2" />
                <input
                  type="text"
                  placeholder="Search destinations"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border-none outline-none text-lg"
                  autoFocus
                />
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Popular destinations</h3>
                <div className="grid grid-cols-2 gap-2">
                  {POPULAR_LOCATIONS.map((loc) => (
                    <div key={loc} className="flex items-center p-3 hover:bg-muted rounded cursor-pointer" onClick={() => setLocation(loc)}>
                      <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                      <span>{loc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* --- NEW "When" Section UI --- */}
          {activeTab === "when" && (
            <div className={cn("p-6 overflow-y-auto flex flex-col", TAB_CONTENT_HEIGHT_CLASS)}>
              {!showDirectDateEntry ? (
                <>
                  <div className="flex justify-between items-center mb-3">
                    <div>
                        <h3 className="text-xl font-semibold">
                            {selectingState === 'from' || !dateRange.from ? "Select check-in date" : "Select check-out date"}
                        </h3>
                        {dateRange.from && (
                            <p className="text-sm text-muted-foreground">
                                {dateRange.to 
                                 ? `Selected: ${format(dateRange.from, "EEE, MMM d, yyyy")} - ${format(dateRange.to, "EEE, MMM d, yyyy")}`
                                 : `Check-in: ${format(dateRange.from, "EEE, MMM d, yyyy")}`
                                }
                            </p>
                        )}
                    </div>
                    {(dateRange.from) && (
                      <Button variant="link" size="sm" className="p-0 h-auto text-xs text-red-600 hover:text-red-700 font-medium" onClick={clearAllDates}>
                        Clear dates
                      </Button>
                    )}
                  </div>

                  <div className="flex items-center justify-between mb-3 px-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setCurrentDisplayMonthStart(prev => addMonths(prev, -1))}>
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    {/* Optionally display combined month range here if desired, for now month names are in each grid */}
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setCurrentDisplayMonthStart(prev => addMonths(prev, 1))}>
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="flex flex-row justify-center"> {/* Container for two calendars */}
                    {renderMonthGrid(currentDisplayMonthStart)}
                    {renderMonthGrid(addMonths(currentDisplayMonthStart, 1))}
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <Button variant="outline" className="w-full text-sm" onClick={() => { setShowDirectDateEntry(true); setCustomStartDateInput(dateRange.from ? format(dateRange.from, "MM/dd/yyyy") : ""); setCustomEndDateInput(dateRange.to ? format(dateRange.to, "MM/dd/yyyy") : ""); setDateInputError(""); }}>
                      Enter Dates Manually
                    </Button>
                  </div>
                </>
              ) : (
                // --- Direct Date Entry UI (mostly unchanged) ---
                <div className="space-y-3 flex flex-col h-full">
                    <h3 className="text-xl font-semibold mb-1">Enter Specific Dates</h3>
                    <div className="flex-grow space-y-3">
                        <div>
                            <label htmlFor="startDateDirect" className="block text-xs font-medium text-muted-foreground mb-1">Check-in date (MM/DD/YYYY)</label>
                            <input type="text" id="startDateDirect" value={customStartDateInput} onChange={(e) => setCustomStartDateInput(e.target.value)} placeholder="MM/DD/YYYY" className="w-full p-2.5 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div>
                            <label htmlFor="endDateDirect" className="block text-xs font-medium text-muted-foreground mb-1">Check-out date (MM/DD/YYYY)</label>
                            <input type="text" id="endDateDirect" value={customEndDateInput} onChange={(e) => setCustomEndDateInput(e.target.value)} placeholder="MM/DD/YYYY" className="w-full p-2.5 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        {dateInputError && <p className="text-xs text-red-600">{dateInputError}</p>}
                    </div>
                    <div className="flex gap-2 pt-2">
                        <Button variant="outline" className="w-full text-sm" onClick={() => { setShowDirectDateEntry(false); setDateInputError(""); }}>Back to Calendar</Button>
                        <Button variant="default" className="w-full text-sm bg-red-600 hover:bg-red-700" onClick={handleDirectDateEntryApply}>Apply Dates</Button>
                    </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "who" && (
             <div className={cn("p-6 overflow-y-auto h-[320px]")}> {/* Original height for this tab */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Adults</h3>
                    <p className="text-sm text-muted-foreground">Ages 13+</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => updateGuests("adults", guests.adults - 1)} disabled={guests.adults <= 1}>-</Button>
                    <span className="w-4 text-center">{guests.adults}</span>
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => updateGuests("adults", guests.adults + 1)}>+</Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Children</h3>
                    <p className="text-sm text-muted-foreground">Ages 2-12</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => updateGuests("children", guests.children - 1)} disabled={guests.children <= 0}>-</Button>
                    <span className="w-4 text-center">{guests.children}</span>
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => updateGuests("children", guests.children + 1)}>+</Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Pets</h3>
                    <p className="text-sm text-muted-foreground">Bringing a service animal?</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => updateGuests("pets", guests.pets - 1)} disabled={guests.pets <= 0}>-</Button>
                    <span className="w-4 text-center">{guests.pets}</span>
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => updateGuests("pets", guests.pets + 1)}>+</Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center p-4 border-t">
            <Button variant="ghost" onClick={() => setExpanded(false)}>Cancel</Button>
            <Button onClick={handleSearch} className="bg-red-600 hover:bg-red-700">
                <Search className="mr-2 h-4 w-4" />Search
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}