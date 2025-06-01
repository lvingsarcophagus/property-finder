"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, MapPin, Bed, Bath, Square, Calendar, Phone, Mail, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// Mock property data
const mockProperty = {
  id: "1",
  title: "Modern Apartment in Downtown",
  images: [
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
  ],
  price: 250000,
  rentPrice: 1200,
  category: "sale",
  city: "Vilnius",
  cityPart: "City Center",
  street: "Gedimino Avenue",
  houseNumber: "15A",
  heatingType: "Central",
  floor: 3,
  totalFloors: 5,
  rooms: 3,
  bedrooms: 2,
  bathrooms: 1,
  area: 75,
  description:
    "This beautiful modern apartment is located in the heart of the city. It features high ceilings, large windows that allow plenty of natural light, and a recently renovated kitchen with high-end appliances. The building has an elevator and secure parking. Perfect for professionals or small families looking for comfort and convenience in a central location.",
  amenities: ["Elevator", "Parking", "Balcony", "Security System"],
  yearBuilt: 2015,
  buildingMaterial: "Brick",
  propertyType: "apartment",
  status: "available",
  owner: {
    name: "John Smith",
    phone: "+370 612 34567",
    email: "john@propertyfinder.com",
    description:
      "Experienced property owner with multiple listings in the city center area. Quick to respond and flexible with viewing times.",
    rating: 4.8,
    totalReviews: 24,
  },
}

export default function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [property, setProperty] = useState(mockProperty)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
              <div className="space-y-4">
                <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-6 py-12">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link href="/listings" className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Listings
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="relative h-96 mb-6 rounded-xl overflow-hidden shadow-xl">
              <Image
                src={property.images[activeImageIndex] || "/placeholder.svg"}
                alt={property.title}
                fill
                className="object-cover"
              />
              <Badge className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white">
                {property.category === "sale" ? "For Sale" : "For Rent"}
              </Badge>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
              {property.images.map((image, index) => (
                <button
                  key={index}
                  className={`relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImageIndex === index 
                      ? "border-blue-500 shadow-md ring-2 ring-blue-200 dark:ring-blue-700" 
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Property Details */}
            <Card className="mb-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800 dark:text-gray-200">{property.title}</CardTitle>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>
                    {property.street} {property.houseNumber}, {property.cityPart}, {property.city}
                  </span>
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  €
                  {property.category === "sale"
                    ? property.price.toLocaleString()
                    : `${property.rentPrice.toLocaleString()}/month`}
                </div>
              </CardHeader>
              <CardContent>
                {/* Property Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center space-x-2 p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/50 dark:to-blue-800/50 rounded-xl">
                    <Bed className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <div className="font-semibold text-gray-800 dark:text-gray-200">{property.bedrooms}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Bedrooms</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/50 dark:to-green-800/50 rounded-xl">
                    <Bath className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <div>
                      <div className="font-semibold text-gray-800 dark:text-gray-200">{property.bathrooms}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Bathrooms</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/50 dark:to-purple-800/50 rounded-xl">
                    <Square className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    <div>
                      <div className="font-semibold text-gray-800 dark:text-gray-200">{property.area}m²</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Area</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 p-4 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/50 dark:to-orange-800/50 rounded-xl">
                    <Calendar className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    <div>
                      <div className="font-semibold text-gray-800 dark:text-gray-200">{property.yearBuilt}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Built</div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Description</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{property.description}</p>
                </div>

                {/* Amenities */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.map((amenity, index) => (
                      <Badge key={index} variant="secondary" className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Property Details */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Property Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-400">Property Type:</span>
                      <span className="font-medium text-gray-800 dark:text-gray-200 capitalize">{property.propertyType}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-400">Floor:</span>
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        {property.floor} of {property.totalFloors}
                      </span>
                    </div>
                    <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-400">Heating:</span>
                      <span className="font-medium text-gray-800 dark:text-gray-200">{property.heatingType}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-400">Building Material:</span>
                      <span className="font-medium text-gray-800 dark:text-gray-200">{property.buildingMaterial}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Owner */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 dark:text-gray-200">Contact Owner</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      {property.owner.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 dark:text-gray-200">{property.owner.name}</div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Star className="h-3 w-3 text-yellow-500 mr-1 fill-yellow-500" />
                        {property.owner.rating} ({property.owner.totalReviews} reviews)
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400">{property.owner.description}</p>

                  <Separator className="bg-gray-200 dark:bg-gray-700" />

                  <div className="space-y-3">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white">
                      <Phone className="h-4 w-4 mr-2" />
                      Call {property.owner.phone}
                    </Button>
                    <Button variant="outline" className="w-full border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Schedule Viewing */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 dark:text-gray-200">Schedule Viewing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Book a viewing to see this property in person</p>
                  <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white">
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Viewing
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 dark:text-gray-200">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between p-2">
                    <span className="text-gray-600 dark:text-gray-400">Listed:</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">2 days ago</span>
                  </div>
                  <div className="flex justify-between p-2">
                    <span className="text-gray-600 dark:text-gray-400">Views:</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">127</span>
                  </div>
                  <div className="flex justify-between p-2">
                    <span className="text-gray-600 dark:text-gray-400">Inquiries:</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">8</span>
                  </div>
                  <div className="flex justify-between p-2">
                    <span className="text-gray-600 dark:text-gray-400">Status:</span>
                    <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">Available</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
