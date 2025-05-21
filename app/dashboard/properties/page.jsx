import Image from "next/image"
import {
  Search,
  Filter,
  ChevronDown,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Star,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PropertiesPage() {
  const properties = [
    {
      id: 1,
      title: "Oceanfront Villa Retreat",
      location: "Bali, Indonesia",
      price: 299,
      rating: 4.9,
      reviews: 128,
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Beachfront", "Villa"],
      type: "Property",
      status: "active",
      bookings: 24,
    },
    {
      id: 2,
      title: "Mountain Yoga Sanctuary",
      location: "Aspen, Colorado",
      price: 189,
      rating: 4.8,
      reviews: 94,
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Mountain", "Yoga"],
      type: "Retreat",
      status: "active",
      bookings: 18,
    },
    {
      id: 3,
      title: "Desert Wellness Center",
      location: "Sedona, Arizona",
      price: 249,
      rating: 4.7,
      reviews: 76,
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Wellness", "Desert"],
      type: "Center",
      status: "inactive",
      bookings: 12,
    },
    {
      id: 4,
      title: "Lakeside Creative Workshop",
      location: "Lake Como, Italy",
      price: 279,
      rating: 4.9,
      reviews: 112,
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Lakeside", "Workshop"],
      type: "Workshop",
      status: "pending",
      bookings: 8,
    },
    {
      id: 5,
      title: "Forest Meditation Retreat",
      location: "Kyoto, Japan",
      price: 199,
      rating: 4.8,
      reviews: 87,
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Forest", "Meditation"],
      type: "Retreat",
      status: "active",
      bookings: 15,
    },
    {
      id: 6,
      title: "Urban Art Studio",
      location: "Barcelona, Spain",
      price: 159,
      rating: 4.6,
      reviews: 64,
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Urban", "Art"],
      type: "Studio",
      status: "active",
      bookings: 10,
    },
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-900">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Active
          </Badge>
        )
      case "inactive":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200 hover:text-red-900">
            <XCircle className="mr-1 h-3 w-3" />
            Inactive
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 hover:text-yellow-900">
            <Clock className="mr-1 h-3 w-3" />
            Pending
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
          <h1 className="text-3xl font-bold tracking-tight">Properties</h1>
          <p className="text-muted-foreground">Manage your retreat properties</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Property
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Properties</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search properties..." className="pl-8 w-full sm:w-[200px] md:w-[300px]" />
          </div>
          <Button variant="outline" className="hover:bg-muted">
            <Filter className="mr-2 h-4 w-4" />
            Filter
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <Card key={property.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative aspect-video">
              <Image src={property.image || "/placeholder.svg"} alt={property.title} fill className="object-cover" />
              <div className="absolute top-2 right-2">{getStatusBadge(property.status)}</div>
              <div className="absolute top-2 left-2">
                <Badge variant="secondary" className="bg-black/60 text-white hover:bg-black/70">
                  {property.type}
                </Badge>
              </div>
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{property.title}</CardTitle>
                  <CardDescription>{property.location}</CardDescription>
                </div>
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
                      View Property
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Property
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Property
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm">
                <div>
                  <p className="text-muted-foreground">Price per night</p>
                  <p className="font-medium">${property.price}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Rating</p>
                  <p className="font-medium flex items-center">
                    {property.rating} <Star className="h-3 w-3 fill-red-500 text-red-500 ml-1" />
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Bookings</p>
                  <p className="font-medium">{property.bookings}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mt-3">
                {property.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="font-normal">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" className="hover:bg-muted">
                Edit
              </Button>
              <Button size="sm" className="hover:bg-primary/90">
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium">1</span> to <span className="font-medium">6</span> of{" "}
          <span className="font-medium">12</span> results
        </div>
        <Button variant="outline" size="sm" className="hover:bg-muted">
          Previous
        </Button>
        <Button variant="outline" size="sm" className="hover:bg-muted">
          Next
        </Button>
      </div>
    </div>
  )
}
