import {
  Calendar,
  Search,
  Filter,
  ChevronDown,
  MoreHorizontal,
  Eye,
  MessageSquare,
  Ban,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BookingsChart } from "@/components/dashboard/charts/bookings-chart"

export default function BookingsPage() {
  const bookings = [
    {
      id: "B-1234",
      guest: {
        name: "Sarah Johnson",
        email: "sarah.j@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      property: "Oceanfront Villa Retreat",
      dates: "May 20 - May 27, 2023",
      amount: "$2,093",
      status: "confirmed",
    },
    {
      id: "B-1235",
      guest: {
        name: "Michael Brown",
        email: "michael.b@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      property: "Mountain Yoga Sanctuary",
      dates: "June 5 - June 12, 2023",
      amount: "$1,325",
      status: "pending",
    },
    {
      id: "B-1236",
      guest: {
        name: "Emma Rodriguez",
        email: "emma.r@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      property: "Desert Wellness Center",
      dates: "July 10 - July 17, 2023",
      amount: "$1,743",
      status: "confirmed",
    },
    {
      id: "B-1237",
      guest: {
        name: "David Wilson",
        email: "david.w@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      property: "Lakeside Creative Workshop",
      dates: "August 3 - August 10, 2023",
      amount: "$1,953",
      status: "cancelled",
    },
    {
      id: "B-1238",
      guest: {
        name: "Jennifer Lee",
        email: "jennifer.l@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      property: "Oceanfront Villa Retreat",
      dates: "September 15 - September 22, 2023",
      amount: "$2,093",
      status: "completed",
    },
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-900">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Confirmed
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 hover:text-yellow-900">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        )
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200 hover:text-red-900">
            <XCircle className="mr-1 h-3 w-3" />
            Cancelled
          </Badge>
        )
      case "completed":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 hover:text-blue-900">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Completed
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
          <p className="text-muted-foreground">Manage your property bookings</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="hover:bg-muted">
            <Calendar className="mr-2 h-4 w-4" />
            Calendar View
          </Button>
          <Button>Export</Button>
        </div>
      </div>

      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle>Booking Trends</CardTitle>
          <CardDescription>Monthly bookings for the current year</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <BookingsChart />
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <CardTitle>All Bookings</CardTitle>
              <CardDescription>Manage and view booking details</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search bookings..."
                  className="pl-8 w-full sm:w-[200px] md:w-[300px]"
                />
              </div>
              <Button variant="outline" className="hover:bg-muted">
                <Filter className="mr-2 h-4 w-4" />
                Filter
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Guest</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{booking.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={booking.guest.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{booking.guest.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{booking.guest.name}</div>
                          <div className="text-xs text-muted-foreground">{booking.guest.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{booking.property}</TableCell>
                    <TableCell>{booking.dates}</TableCell>
                    <TableCell>{booking.amount}</TableCell>
                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="hover:bg-muted">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="cursor-pointer">
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Message Guest
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                            <Ban className="mr-2 h-4 w-4" />
                            Cancel Booking
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{" "}
              <span className="font-medium">25</span> results
            </div>
            <Button variant="outline" size="sm" className="hover:bg-muted">
              Previous
            </Button>
            <Button variant="outline" size="sm" className="hover:bg-muted">
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
