"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Building2, 
  Search, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Heart, 
  Filter,
  TrendingUp,
  Star,
  ArrowRight,
  Eye,
  Users
} from "lucide-react"

// Featured properties data
const featuredProperties = [
  {
    id: 1,
    title: "Modern Luxury Apartment",
    image: "/placeholder.svg?height=400&width=600",
    price: 250000,
    category: "sale",
    location: "Downtown, Vilnius",
    beds: 2,
    baths: 2,
    sqft: 1200,
    featured: true,
    views: 127,
  },
  {
    id: 2,
    title: "Spacious Family Home",
    image: "/placeholder.svg?height=400&width=600",
    price: 2500,
    category: "rent",
    location: "Suburbs, Kaunas",
    beds: 4,
    baths: 3,
    sqft: 2500,
    featured: true,
    views: 89,
  },
  {
    id: 3,
    title: "Luxury Penthouse",
    image: "/placeholder.svg?height=400&width=600",
    price: 1200000,
    category: "sale",
    location: "City Center, Vilnius",
    beds: 3,
    baths: 3,
    sqft: 2000,
    featured: true,
    views: 456,
  },
  {
    id: 4,
    title: "Cozy Studio Apartment",
    image: "/placeholder.svg?height=400&width=600",
    price: 800,
    category: "rent",
    location: "Old Town, Vilnius",
    beds: 1,
    baths: 1,
    sqft: 500,
    featured: true,
    views: 45,
  },
  {
    id: 5,
    title: "Garden House",
    image: "/placeholder.svg?height=400&width=600",
    price: 3200,
    category: "rent",
    location: "Suburbs, Klaipėda",
    beds: 5,
    baths: 4,
    sqft: 3200,
    featured: true,
    views: 178,
  },
  {
    id: 6,
    title: "Commercial Office Space",
    image: "/placeholder.svg?height=400&width=600",
    price: 750000,
    category: "sale",
    location: "Business District, Vilnius",
    sqft: 5000,
    featured: true,
    views: 234,
  },
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchLocation, setSearchLocation] = useState("")
  const [searchCategory, setSearchCategory] = useState("")
  const [savedProperties, setSavedProperties] = useState<number[]>([])

  const toggleSaved = (propertyId: number) => {
    setSavedProperties(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    )
  }

  const handleSearch = () => {
    // Build search URL with query parameters
    const params = new URLSearchParams()
    if (searchQuery) params.set('search', searchQuery)
    if (searchLocation) params.set('location', searchLocation)
    if (searchCategory) params.set('category', searchCategory)
    
    // Navigate to listings page with search parameters
    window.location.href = `/listings?${params.toString()}`
  }

  const filteredProperties = featuredProperties.filter(property => {
    const matchesQuery = !searchQuery || 
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesLocation = !searchLocation || 
      property.location.toLowerCase().includes(searchLocation.toLowerCase())
    
    const matchesCategory = !searchCategory || property.category === searchCategory
    
    return matchesQuery && matchesLocation && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section with Search */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-green-600/10 dark:from-blue-600/5 dark:to-green-600/5" />
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-6xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Building2 className="h-12 w-12 text-blue-600 dark:text-blue-400 mr-3" />
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-green-600 dark:from-blue-400 dark:to-green-400 bg-clip-text text-transparent">
                PropertyPro
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Discover Your Dream Property with Advanced Search & Premium Listings
            </p>
            
            {/* Advanced Search Bar */}
            <Card className="max-w-4xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-2xl">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search properties..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Location"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className="pl-10 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <Select value={searchCategory} onValueChange={setSearchCategory}>
                    <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                      <SelectValue placeholder="Buy or Rent" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any category</SelectItem>
                      <SelectItem value="sale">For Sale</SelectItem>
                      <SelectItem value="rent">For Rent</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button 
                    onClick={handleSearch}
                    className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
                <div className="flex justify-center mt-4">
                  <Link href="/listings">
                    <Button variant="outline" className="border-blue-200 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950">
                      <Filter className="h-4 w-4 mr-2" />
                      Advanced Filters
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Properties
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover handpicked premium properties with exceptional value and stunning features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <Card key={property.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-800">
                  <div className="relative overflow-hidden">
                    <Image
                      src={property.image}
                      alt={property.title}
                      width={600}
                      height={400}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge 
                        variant={property.category === 'sale' ? 'default' : 'secondary'}
                        className={`${
                          property.category === 'sale' 
                            ? 'bg-green-500 hover:bg-green-600' 
                            : 'bg-blue-500 hover:bg-blue-600'
                        } text-white border-0`}
                      >
                        {property.category === 'sale' ? 'For Sale' : 'For Rent'}
                      </Badge>
                      {property.featured && (
                        <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white border-0">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                    </div>
                    <button
                      onClick={() => toggleSaved(property.id)}
                      className="absolute top-4 right-4 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
                    >
                      <Heart 
                        className={`h-5 w-5 ${
                          savedProperties.includes(property.id) 
                            ? 'fill-red-500 text-red-500' 
                            : 'text-gray-600 dark:text-gray-300'
                        }`} 
                      />
                    </button>
                    <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-black/50 text-white px-2 py-1 rounded text-sm">
                      <Eye className="h-3 w-3" />
                      {property.views}
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {property.title}
                      </h3>
                      <div className="flex items-center text-gray-600 dark:text-gray-300 mb-3">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{property.location}</span>
                      </div>
                      <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                        €{property.price.toLocaleString()}
                        {property.category === 'rent' && <span className="text-lg text-gray-600 dark:text-gray-400">/month</span>}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-gray-600 dark:text-gray-300 mb-4">
                      {property.beds && (
                        <div className="flex items-center">
                          <Bed className="h-4 w-4 mr-1" />
                          <span className="text-sm">{property.beds} beds</span>
                        </div>
                      )}
                      {property.baths && (
                        <div className="flex items-center">
                          <Bath className="h-4 w-4 mr-1" />
                          <span className="text-sm">{property.baths} baths</span>
                        </div>
                      )}
                      <div className="flex items-center">
                        <Square className="h-4 w-4 mr-1" />
                        <span className="text-sm">{property.sqft} sq ft</span>
                      </div>
                    </div>
                    
                    <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white">
                      <Link href={`/property/${property.id}`}>
                        View Details
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No properties found</h3>
                <p className="text-gray-600 dark:text-gray-300">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="border-blue-200 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950">
              <Link href="/listings">
                View All Properties
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                {featuredProperties.length}k+
              </div>
              <div className="text-xl opacity-90">Properties Listed</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                850+
              </div>
              <div className="text-xl opacity-90">Active Brokers</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                98%
              </div>
              <div className="text-xl opacity-90">Customer Satisfaction</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                24/7
              </div>
              <div className="text-xl opacity-90">Premium Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to find your 
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"> dream property</span>?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of satisfied customers who found their perfect home through PropertyPro's comprehensive platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-4 text-lg"
              >
                <Link href="/listings">
                  Browse Properties <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg dark:border-blue-400 dark:text-blue-400"
              >
                <Link href="/signup">
                  Start Free Trial
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-6">
                <Building2 className="h-10 w-10 text-blue-400 mr-3" />
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                  PropertyPro
                </span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                The ultimate platform for finding, buying, and renting premium properties. 
                Your dream home is just a click away.
              </p>
              <div className="flex space-x-4">
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-400 hover:border-blue-400 hover:text-blue-400">
                  Follow Us
                </Button>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Explore</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="/listings" className="hover:text-blue-400 transition-colors">
                    Browse Properties
                  </Link>
                </li>
                <li>
                  <Link href="/listings?category=sale" className="hover:text-blue-400 transition-colors">
                    Properties for Sale
                  </Link>
                </li>
                <li>
                  <Link href="/listings?category=rent" className="hover:text-blue-400 transition-colors">
                    Properties for Rent
                  </Link>
                </li>
                <li>
                  <Link href="/saved" className="hover:text-blue-400 transition-colors">
                    Saved Properties
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Support</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-blue-400 transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-blue-400 transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-blue-400 transition-colors">
                    About PropertyPro
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-blue-400 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; 2024 PropertyPro. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm mt-4 md:mt-0">
              Made with ❤️ for property seekers worldwide
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
