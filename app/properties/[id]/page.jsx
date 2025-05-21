import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Star, MapPin, Share, Heart, Calendar, Users, Wifi, Utensils, Car, Tv } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import PropertyMap from "@/components/property-map"

export default function PropertyPage({ params }) {
  // This would normally be fetched from a database
  const property = {
    id: params.id,
    title: "Oceanfront Villa Retreat",
    description:
      "A stunning oceanfront villa perfect for yoga retreats, corporate workshops, or creative gatherings. This spacious property offers breathtaking views, multiple workshop spaces, and luxurious accommodations for up to 20 guests.",
    location: "Bali, Indonesia",
    price: 299,
    rating: 4.9,
    reviews: 128,
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    tags: ["Beachfront", "Villa", "Workshop Space"],
    type: "Property",
    amenities: [
      { name: "Free WiFi", icon: <Wifi className="h-4 w-4" /> },
      { name: "Kitchen", icon: <Utensils className="h-4 w-4" /> },
      { name: "Free parking", icon: <Car className="h-4 w-4" /> },
      { name: "TV", icon: <Tv className="h-4 w-4" /> },
    ],
    host: {
      name: "Maria Garcia",
      role: "Property Owner",
      avatar: "/placeholder.svg?height=100&width=100",
      response_rate: 98,
      response_time: "within an hour",
    },
    capacity: 20,
    bedrooms: 10,
    bathrooms: 8,
    workshop_spaces: 3,
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
            <span className="text-primary">Retreat</span> World Wide
          </Link>
          <nav className="ml-auto hidden md:flex gap-6">
            <Link href="/properties" className="text-sm font-medium hover:text-primary">
              Properties
            </Link>
            <Link href="/explore" className="text-sm font-medium hover:text-primary">
              Explore
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary">
              Contact
            </Link>
          </nav>
          <div className="ml-auto md:ml-4 flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="flex items-center mb-6">
            <Button variant="ghost" size="sm" asChild className="mr-auto">
              <Link href="/properties">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to properties
              </Link>
            </Button>
            <Button variant="ghost" size="icon">
              <Share className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-red-600 text-red-600 mr-1" />
              <span className="font-medium">{property.rating}</span>
              <span className="text-muted-foreground ml-1">({property.reviews} reviews)</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              {property.location}
            </div>
            {property.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-8">
            <div className="relative aspect-[4/3] md:col-span-2 md:row-span-2 rounded-tl-lg rounded-bl-lg overflow-hidden">
              <Image
                src={property.images[0] || "/placeholder.svg"}
                alt={property.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] rounded-tr-lg overflow-hidden hidden md:block">
              <Image
                src={property.images[1] || "/placeholder.svg"}
                alt={property.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden hidden md:block">
              <Image
                src={property.images[2] || "/placeholder.svg"}
                alt={property.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] rounded-br-lg overflow-hidden hidden md:block">
              <Image
                src={property.images[3] || "/placeholder.svg"}
                alt={property.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden hidden md:block">
              <Image
                src={property.images[4] || "/placeholder.svg"}
                alt={property.title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">
                    Hosted by {property.host.name}, {property.host.role}
                  </h2>
                  <p className="text-muted-foreground">
                    {property.capacity} guests · {property.bedrooms} bedrooms · {property.bathrooms} bathrooms ·{" "}
                    {property.workshop_spaces} workshop spaces
                  </p>
                </div>
                <Avatar className="h-12 w-12">
                  <AvatarImage src={property.host.avatar || "/placeholder.svg"} alt={property.host.name} />
                  <AvatarFallback>{property.host.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>

              <div className="border-t border-b py-6 mb-6">
                <p className="text-lg mb-4">{property.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {amenity.icon}
                      <span>{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Tabs defaultValue="details">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="amenities">Amenities</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="py-4">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">About this property</h3>
                    <p>
                      This stunning oceanfront villa is designed specifically for retreats and workshops. With multiple
                      dedicated spaces for activities, breathtaking views, and comfortable accommodations, it's the
                      perfect venue for your next event.
                    </p>
                    <p>
                      The property features three dedicated workshop spaces, including an open-air yoga pavilion
                      overlooking the ocean, a fully-equipped indoor conference room, and a creative studio space
                      perfect for art or cooking workshops.
                    </p>
                    <h3 className="text-xl font-semibold mt-6">The space</h3>
                    <p>
                      The main villa has 10 bedrooms, each with en-suite bathrooms. The property can comfortably
                      accommodate up to 20 guests. The spacious common areas include a large dining room that can seat
                      all guests, a fully equipped kitchen, and multiple lounge areas.
                    </p>
                    <p>
                      The outdoor spaces include an infinity pool, garden meditation areas, and direct access to a
                      private beach. The property is surrounded by lush tropical gardens ensuring privacy and
                      tranquility.
                    </p>
                    
                    {/* Map integration */}
                    <div className="mt-8">
                      <PropertyMap location={property.location} />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="amenities" className="py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Workshop Spaces</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                          <span>Ocean-view yoga pavilion (200 sqm)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                          <span>Conference room with A/V equipment (100 sqm)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                          <span>Creative studio space (80 sqm)</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Property Amenities</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                          <span>Infinity pool</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                          <span>Private beach access</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                          <span>Fully equipped kitchen</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                          <span>Meditation garden</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                          <span>Free WiFi throughout property</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                          <span>Air conditioning in all rooms</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="reviews" className="py-4">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-red-50 rounded-full p-2">
                        <Star className="h-6 w-6 fill-red-600 text-red-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{property.rating} out of 5</div>
                        <div className="text-muted-foreground">{property.reviews} reviews</div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {[1, 2, 3].map((review) => (
                        <div key={review} className="border-b pb-6">
                          <div className="flex items-center gap-4 mb-4">
                            <Avatar>
                              <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                              <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-semibold">Jane Doe</h4>
                              <p className="text-sm text-muted-foreground">March 2023</p>
                            </div>
                          </div>
                          <div className="flex mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < 5 ? "fill-red-600 text-red-600" : "text-muted-foreground"}`}
                              />
                            ))}
                          </div>
                          <p>
                            This property was perfect for our yoga retreat. The spaces were exactly as described, and
                            our participants loved the ocean views during morning practice. The host was incredibly
                            helpful with local arrangements.
                          </p>
                        </div>
                      ))}
                    </div>

                    <Button variant="outline" className="w-full">
                      Show all {property.reviews} reviews
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>${property.price}</span>
                    <span className="text-base font-normal text-muted-foreground">night</span>
                  </CardTitle>
                  <CardDescription>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-red-600 text-red-600 mr-1" />
                      <span className="font-medium">{property.rating}</span>
                      <span className="text-muted-foreground ml-1">({property.reviews} reviews)</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Check-in</label>
                      <div className="flex items-center border rounded-md pl-3">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="Add date"
                          className="flex h-10 w-full rounded-md bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Check-out</label>
                      <div className="flex items-center border rounded-md pl-3">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="Add date"
                          className="flex h-10 w-full rounded-md bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Guests</label>
                    <div className="flex items-center border rounded-md pl-3">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Add guests"
                        className="flex h-10 w-full rounded-md bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  </div>
                  <Button className="w-full">Reserve</Button>
                  <div className="text-center text-sm text-muted-foreground">You won't be charged yet</div>
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>${property.price} x 7 nights</span>
                      <span>${property.price * 7}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cleaning fee</span>
                      <span>$150</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service fee</span>
                      <span>$289</span>
                    </div>
                    <div className="flex justify-between font-semibold border-t pt-2">
                      <span>Total</span>
                      <span>${property.price * 7 + 150 + 289}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t bg-muted mt-12">
        <div className="container mx-auto px-4 md:px-6 py-6">
          <div className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Retreat World Wide. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}