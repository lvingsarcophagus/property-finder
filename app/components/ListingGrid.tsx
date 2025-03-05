import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const listings = [
  {
    id: 1,
    title: "Modern Apartment in Downtown",
    image: "/placeholder.svg?height=400&width=600",
    price: 250000,
    location: "Downtown, City",
    beds: 2,
    baths: 2,
    sqft: 1200,
    propertyType: "apartment",
    category: "sale",
    postType: "sell",
  },
  {
    id: 2,
    title: "Spacious Family Home",
    image: "/placeholder.svg?height=400&width=600",
    price: 2500,
    location: "Suburbs, City",
    beds: 4,
    baths: 3,
    sqft: 2500,
    propertyType: "house",
    category: "rent",
    postType: "rent",
  },
  {
    id: 3,
    title: "Commercial Office Space",
    image: "/placeholder.svg?height=400&width=600",
    price: 750000,
    location: "Business District, City",
    sqft: 5000,
    propertyType: "commercial",
    category: "sale",
    postType: "sell",
  },
  {
    id: 4,
    title: "Cozy Studio Apartment",
    image: "/placeholder.svg?height=400&width=600",
    price: 1200,
    location: "City Center",
    beds: 1,
    baths: 1,
    sqft: 500,
    propertyType: "apartment",
    category: "rent",
    postType: "rent",
  },
]

interface ListingGridProps {
  filters?: {
    location?: string
    category?: string
    postType?: string
    propertyType?: string
    minPrice?: number
    maxPrice?: number
  }
}

export default function ListingGrid({ filters = {} }: ListingGridProps) {
  // Convert sqft to square meters for display
  const sqftToSqm = (sqft: number) => {
    return Math.round(sqft * 0.093); // 1 sqft is approximately 0.093 m²
  };

  const filteredListings = listings.filter((listing) => {
    if (filters.location && !listing.location.toLowerCase().includes(filters.location.toLowerCase())) return false
    if (filters.category && listing.category !== filters.category) return false
    if (filters.postType && listing.postType !== filters.postType) return false
    if (filters.propertyType && listing.propertyType !== filters.propertyType) return false
    if (filters.minPrice && listing.price < filters.minPrice) return false
    if (filters.maxPrice && listing.price > filters.maxPrice) return false
    return true
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredListings.map((listing) => (
        <Card key={listing.id} className="property-card overflow-hidden">
          <CardHeader className="p-0">
            <div className="relative h-48">
              <Image src={listing.image || "/placeholder.svg"} alt={listing.title} layout="fill" objectFit="cover" />
              <Badge className="property-card-badge absolute top-2 right-2">
                {listing.type || listing.propertyType}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <CardTitle className="text-xl mb-2 text-card-foreground">{listing.title}</CardTitle>
            <p className="text-muted-foreground mb-2">{listing.location}</p>
            <div className="mb-2">
              <span className="property-card-price px-3 py-1 rounded-md inline-block bg-primary text-white font-bold">
                €{listing.price.toLocaleString()}
                {listing.category === 'rent' && <span className="text-sm ml-1 font-normal">/month</span>}
              </span>
            </div>
            <div className="flex justify-between text-sm property-card-features">
              {listing.beds && <span>{listing.beds} beds</span>}
              {listing.baths && <span>{listing.baths} baths</span>}
              <span>{sqftToSqm(listing.sqft)} m²</span>
            </div>
          </CardContent>
          <CardFooter>
            <Link href={`/property/${listing.id}`} className="w-full">
              <Button variant="outline" className="w-full border-border hover:bg-accent">
                View Details
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

