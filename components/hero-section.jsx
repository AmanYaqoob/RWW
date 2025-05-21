import Image from "next/image"
import EnhancedSearchBarV3 from "@/components/enhanced-search-bar-v3"

export default function HeroSection() {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/50 to-background z-10" />
      <div className="relative h-[350px] sm:h-[500px] md:h-[650px] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury retreat by the ocean"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-2 sm:px-4 md:px-6">
        <div className="max-w-3xl space-y-4 sm:space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white drop-shadow-md">
            Find Your Perfect <span className="text-red-500">Retreat</span> Worldwide
          </h1>
          <p className="mx-auto max-w-[700px] text-white text-base sm:text-lg md:text-xl drop-shadow-md">
            Discover unique properties for workshops, events, and getaways
          </p>
        </div>
      </div>
      <div className="absolute left-0 right-0 z-30 px-2 sm:px-4" style={{ bottom: '1rem', '@screen md': { bottom: '4rem' } }}>
        {/* Use Tailwind for bottom on mobile/desktop */}
        <div className="block md:hidden">
          <div className="absolute left-0 right-0 bottom-4 z-30 px-2 sm:px-4">
            <EnhancedSearchBarV3 />
          </div>
        </div>
        <div className="hidden md:block">
          <div className="absolute left-0 right-0 bottom-16 z-30 px-2 sm:px-4">
            <EnhancedSearchBarV3 />
          </div>
        </div>
      </div>
    </section>
  )
}