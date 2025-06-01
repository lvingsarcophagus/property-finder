"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useTranslation } from "../context/TranslationContext"
import { MapPin, Bed, Bath, Square, Heart, Share2, Eye, Search } from "lucide-react"
import { useState } from "react"

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
    featured: true,
    views: 127,
    saved: false,
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
    featured: false,
    views: 89,
    saved: true,
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
    featured: true,
    views: 234,
    saved: false,
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
    featured: false,
    views: 45,
    saved: false,
  },
  {
    id: 5,
    title: "Luxury Penthouse",
    image: "/placeholder.svg?height=400&width=600",
    price: 1200000,
    location: "City Center",
    beds: 3,
    baths: 3,
    sqft: 2000,
    propertyType: "apartment",
    category: "sale",
    postType: "sell",
    featured: true,
    views: 456,
    saved: true,
  },
  {
    id: 6,
    title: "Garden House",
    image: "/placeholder.svg?height=400&width=600",
    price: 3200,
    location: "Suburbs",
    beds: 5,
    baths: 4,
    sqft: 3200,
    propertyType: "house",
    category: "rent",
    postType: "rent",
    featured: false,
    views: 178,
    saved: false,
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
  searchQuery?: string
}

export default function ListingGrid({ filters = {}, searchQuery = "" }: ListingGridProps) {
  const { t } = useTranslation()
  const [savedListings, setSavedListings] = useState<number[]>(
    listings.filter(l => l.saved).map(l => l.id)
  )

  const filteredListings = listings.filter((listing) => {
    // Search query filter
    if (searchQuery && !listing.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !listing.location.toLowerCase().includes(searchQuery.toLowerCase())) return false
    
    // Location filter
    if (filters.location && !listing.location.toLowerCase().includes(filters.location.toLowerCase())) return false
    
    // Category filter
    if (filters.category && listing.category !== filters.category) return false
    
    // Post type filter
    if (filters.postType && listing.postType !== filters.postType) return false
    
    // Property type filter
    if (filters.propertyType && listing.propertyType !== filters.propertyType) return false
    
    // Price filters
    if (filters.minPrice && listing.price < filters.minPrice) return false
    if (filters.maxPrice && filters.maxPrice < 1000000 && listing.price > filters.maxPrice) return false
    
    return true
  })

  const toggleSaved = (listingId: number) => {
    setSavedListings(prev => 
      prev.includes(listingId) 
        ? prev.filter(id => id !== listingId)
        : [...prev, listingId]
    )
  }

  if (filteredListings.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900 flex items-center justify-center">
          <Search className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">No properties found</h3>
        <p className="text-gray-600 dark:text-gray-400">Try adjusting your search criteria or filters</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600 dark:text-gray-400">
          Showing {filteredListings.length} {filteredListings.length === 1 ? 'property' : 'properties'}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">Sort by:</span>
          <select className="text-sm bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md px-3 py-1">
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest First</option>
            <option>Most Popular</option>
          </select>
        </div>
      </div>

      {/* Property Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredListings.map((listing) => (
          <Card 
            key={listing.id} 
            className="group overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
          >
            <CardHeader className="p-0 relative">
              <div className="relative h-56 overflow-hidden">
                <Image 
                  src={listing.image || "/placeholder.svg"} 
                  alt={listing.title} 
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                
                {/* Overlay Actions */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                  <div className="flex flex-col gap-2">
                    <Badge className={`
                      ${listing.category === 'sale' 
                        ? 'bg-blue-500 hover:bg-blue-600' 
                        : 'bg-green-500 hover:bg-green-600'
                      } text-white
                    `}>
                      {listing.category === "sale" ? "For Sale" : "For Rent"}
                    </Badge>
                    {listing.featured && (
                      <Badge className="bg-gradient-to-r from-orange-500 to-pink-500 text-white">
                        Featured
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 w-8 p-0 bg-white/90 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800"
                      onClick={() => toggleSaved(listing.id)}
                    >
                      <Heart 
                        className={`h-4 w-4 ${
                          savedListings.includes(listing.id) 
                            ? 'text-red-500 fill-red-500' 
                            : 'text-gray-600 dark:text-gray-400'
                        }`} 
                      />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 w-8 p-0 bg-white/90 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800"
                    >
                      <Share2 className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </Button>
                  </div>
                </div>

                {/* View Count */}
                <div className="absolute bottom-4 right-4">
                  <div className="flex items-center gap-1 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                    <Eye className="h-3 w-3" />
                    {listing.views}
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <CardTitle className="text-xl mb-3 text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {listing.title}
              </CardTitle>
              
              <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{listing.location}</span>
              </div>
              
              <div className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                {t("euro")}{listing.price.toLocaleString()}
                {listing.category === "rent" && <span className="text-sm text-gray-500 dark:text-gray-400">/month</span>}
              </div>
              
              <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-4">
                  {listing.beds && (
                    <div className="flex items-center gap-1">
                      <Bed className="h-4 w-4" />
                      <span>{listing.beds}</span>
                    </div>
                  )}
                  {listing.baths && (
                    <div className="flex items-center gap-1">
                      <Bath className="h-4 w-4" />
                      <span>{listing.baths}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Square className="h-4 w-4" />
                    <span>{listing.sqft} sqft</span>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-6 pt-0">
              <Link href={`/property/${listing.id}`} className="w-full">
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
                >
                  {t("viewDetails")}
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
