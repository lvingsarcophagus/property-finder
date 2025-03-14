"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useTranslation } from "../context/TranslationContext"

const listings = [
  {
    id: 1,
    title: "Modern Apartment in Downtown",
    image: "/images/studio1.jpg",
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
    image: "/images/studio2.jpg",
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
    image: "/images/studio3.jpg",
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
    image: "/images/studio4.jpg",
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
    propertyType?: string
    minPrice?: number
    maxPrice?: number
  }
}

export default function ListingGrid({ filters = {} }: ListingGridProps) {
  const { t } = useTranslation()
  
  // Convert sqft to square meters for display
  const sqftToSqm = (sqft: number) => {
    return Math.round(sqft * 0.093); // 1 sqft is approximately 0.093 m²
  };

  const filteredListings = listings.filter((listing) => {
    // Filter by location
    if (filters.location && !listing.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false
    }
    
    // Filter by category
    if (filters.category && listing.category !== filters.category) {
      return false
    }
    
    // Filter by property type
    if (filters.propertyType && listing.propertyType !== filters.propertyType) {
      return false
    }
    
    // Filter by price range
    if (filters.minPrice && listing.price < filters.minPrice) {
      return false
    }
    if (filters.maxPrice && listing.price > filters.maxPrice) {
      return false
    }
    
    return true
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredListings.map((listing) => (
        <Card key={listing.id} className="property-card overflow-hidden dark:bg-card dark:border-border dark:text-card-foreground">
          <CardHeader className="p-0">
            <div className="relative h-48">
              <Image src={listing.image || "/placeholder.svg"} alt={listing.title} layout="fill" objectFit="cover" />
              <Badge className="property-card-badge absolute top-2 right-2">
                {t(listing.type || listing.propertyType)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <CardTitle className="text-xl mb-2">{listing.title}</CardTitle>
            <p className="text-muted-foreground mb-2">{listing.location}</p>
            <div className="mb-2">
              <span className="property-card-price px-3 py-1 rounded-md inline-block">
                €{listing.price.toLocaleString()}
                {listing.category === 'rent' && <span className="text-xs ml-1 font-normal">/{t("rent")}</span>}
              </span>
            </div>
            <div className="flex justify-between text-sm property-card-features">
              {listing.beds && <span>{listing.beds} {t("beds")}</span>}
              {listing.baths && <span>{listing.baths} {t("baths")}</span>}
              <span>{sqftToSqm(listing.sqft)} {t("sqrm")}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Link href={`/property/${listing.id}`} className="w-full">
              <Button variant="outline" className="w-full">
                {t("viewDetails")}
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

