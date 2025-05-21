"use client"

import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import EnhancedSearchBarV3 from "@/components/enhanced-search-bar-v3"
import HeroSection from "@/components/hero-section"
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/animations/fade-in"

export default function Home() {
  // Add smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth"
    return () => {
      document.documentElement.style.scrollBehavior = "auto"
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
            <span className="text-primary">Retreat</span> World Wide
          </Link>
          <nav className="ml-auto hidden md:flex gap-6">
            <Link href="/properties" className="text-sm font-medium hover:text-primary transition-colors">
              Properties
            </Link>
            <Link href="/explore" className="text-sm font-medium hover:text-primary transition-colors">
              Explore
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>
          <div className="ml-auto md:ml-4 flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" size="sm" className="transition-all hover:scale-105">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="transition-all hover:scale-105">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <FadeIn>
          <HeroSection />
        </FadeIn>

        {/* Featured Properties Section */}
        <section className="py-20 px-4 md:px-6">
          <div className="container mx-auto">
            <FadeIn>
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Featured Retreat Properties
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Discover our handpicked selection of unique retreat spaces around the world
                </p>
              </div>
            </FadeIn>

            <FadeInStagger>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "Oceanfront Villa Retreat",
                    location: "Bali, Indonesia",
                    price: 299,
                    image:
                      "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop",
                    tags: ["Beachfront", "Villa"],
                  },
                  {
                    title: "Mountain Yoga Sanctuary",
                    location: "Aspen, Colorado",
                    price: 189,
                    image:
                      "https://images.unsplash.com/photo-1518602164578-cd0074062767?q=80&w=2070&auto=format&fit=crop",
                    tags: ["Mountain", "Yoga"],
                  },
                  {
                    title: "Desert Wellness Center",
                    location: "Sedona, Arizona",
                    price: 249,
                    image:
                      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop",
                    tags: ["Wellness", "Desert"],
                  },
                  {
                    title: "Lakeside Creative Workshop",
                    location: "Lake Como, Italy",
                    price: 279,
                    image:
                      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop",
                    tags: ["Lakeside", "Workshop"],
                  },
                ].map((property, index) => (
                  <FadeInStaggerItem key={index}>
                    <Link href={`/properties/${index + 1}`} className="group block">
                      <div className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow transition-all hover:shadow-lg">
                        <div className="relative aspect-square overflow-hidden">
                          <Image
                            src={property.image || "/placeholder.svg"}
                            alt={property.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <p className="font-semibold">${property.price} / night</p>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-lg line-clamp-1">{property.title}</h3>
                          <p className="text-sm text-muted-foreground">{property.location}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {property.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </FadeInStaggerItem>
                ))}
              </div>
            </FadeInStagger>

            <div className="text-center mt-12">
              <Button asChild className="transition-transform hover:scale-105">
                <Link href="/properties">View all properties</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-4 md:px-6 bg-muted">
          <div className="container mx-auto">
            <FadeIn>
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Find and book the perfect retreat space in just a few simple steps
                </p>
              </div>
            </FadeIn>

            <FadeInStagger>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Find Your Space",
                    description:
                      "Search our curated collection of retreat spaces based on your specific needs and preferences.",
                    icon: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2074&auto=format&fit=crop",
                    step: "01",
                  },
                  {
                    title: "Book Your Dates",
                    description:
                      "Select your preferred dates and complete the booking process securely through our platform.",
                    icon: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=2068&auto=format&fit=crop",
                    step: "02",
                  },
                  {
                    title: "Enjoy Your Retreat",
                    description:
                      "Arrive at your retreat space and focus on what matters most - creating an amazing experience.",
                    icon: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop",
                    step: "03",
                  },
                ].map((step, index) => (
                  <FadeInStaggerItem key={index}>
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/50 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                      <div className="relative bg-card rounded-lg p-6 h-full flex flex-col">
                        <div className="mb-4 relative h-48 overflow-hidden rounded-md">
                          <Image
                            src={step.icon || "/placeholder.svg"}
                            alt={step.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute top-2 right-2 bg-primary text-white text-lg font-bold w-10 h-10 rounded-full flex items-center justify-center">
                            {step.step}
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  </FadeInStaggerItem>
                ))}
              </div>
            </FadeInStagger>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4 md:px-6">
          <div className="container mx-auto">
            <FadeIn>
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Customers Say</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Hear from retreat hosts and participants who have used our platform
                </p>
              </div>
            </FadeIn>

            <FadeInStagger>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    quote:
                      "Finding the perfect venue for our yoga retreat was so easy with Retreat World Wide. The booking process was seamless and our participants loved the space!",
                    author: "Sarah Johnson",
                    role: "Yoga Instructor",
                    avatar:
                      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
                  },
                  {
                    quote:
                      "As a property owner, I've been able to connect with amazing retreat leaders from around the world. The platform makes managing bookings incredibly simple.",
                    author: "Michael Chen",
                    role: "Property Owner",
                    avatar:
                      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
                  },
                  {
                    quote:
                      "Our corporate team building retreat was a huge success thanks to the amazing venue we found on Retreat World Wide. We'll definitely be booking through them again!",
                    author: "Emily Rodriguez",
                    role: "HR Director",
                    avatar:
                      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
                  },
                ].map((testimonial, index) => (
                  <FadeInStaggerItem key={index}>
                    <div className="bg-card rounded-lg p-6 shadow-sm border transition-all hover:shadow-md">
                      <div className="flex items-center mb-4">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                          <Image
                            src={testimonial.avatar || "/placeholder.svg"}
                            alt={testimonial.author}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold">{testimonial.author}</h4>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="italic text-muted-foreground">{testimonial.quote}</p>
                    </div>
                  </FadeInStaggerItem>
                ))}
              </div>
            </FadeInStagger>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 md:px-6 bg-primary text-white">
          <div className="container mx-auto">
            <FadeIn>
              <div className="text-center space-y-4 mb-8">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Host Your Retreat?
                </h2>
                <p className="mx-auto max-w-[700px] text-white/80 md:text-xl">
                  List your property on Retreat World Wide and connect with retreat leaders and participants from around
                  the globe.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  size="lg"
                  variant="secondary"
                  className="transition-transform hover:scale-105 bg-white text-primary hover:bg-white/90"
                >
                  List Your Property
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="transition-transform hover:scale-105 border-white text-black hover:bg-white/20"
                >
                  Learn More
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center gap-2 font-bold text-2xl mb-4">
                <span className="text-primary">Retreat</span> World Wide
              </Link>
              <p className="text-sm text-muted-foreground">
                Connecting retreat spaces with instructors and participants worldwide.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/press"
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    Press
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/help"
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/safety"
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    Safety Information
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cancellation"
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    Cancellation Options
                  </Link>
                </li>
                <li>
                  <Link
                    href="/covid"
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    COVID-19 Response
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/privacy"
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sitemap"
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    Sitemap
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Retreat World Wide. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                <span className="sr-only">Facebook</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                <span className="sr-only">Instagram</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
