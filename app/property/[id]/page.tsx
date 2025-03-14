"use client"

import Image from "next/image"
import { useParams } from "next/navigation"
import { ArrowLeft, Share2, Heart, Bed, Bath, Ruler, MapPin, Phone, Mail, Download } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslation } from "../../context/TranslationContext"
import { cn } from "@/lib/utils"
import MapComponent from "@/components/ui/MapComponent"

// Mock property data - in a real app this would come from an API
const properties = [
  {
    id: "1",
    title: "Modern Apartment in Downtown",
    description: "A beautiful modern apartment located in the heart of downtown. This property features state-of-the-art appliances, hardwood floors, and large windows providing plenty of natural light.",
    longDescription: `
      This exquisite apartment offers luxury living in the heart of the city. Located just minutes away from popular restaurants, shopping centers, and entertainment venues, this property is perfect for urban dwellers who appreciate convenience and style.
      
      The open-concept living space is perfect for entertaining, with a gourmet kitchen featuring granite countertops and stainless steel appliances. The spacious master bedroom includes a walk-in closet and an en-suite bathroom with a rainfall shower.
    `,
    images: [
      "/images/studio1.jpg",
      "/images/studio2.jpg",
      "/images/studio3.jpg",
    ],
    price: 250000,
    currency: "EUR",
    location: "Downtown, City",
    address: "123 Main Street, Apt 4B",
    beds: 2,
    baths: 2,
    size: 1200,
    sizeUnit: "sqft",
    propertyType: "apartment",
    features: ["Central Air", "Hardwood Floors", "In-Unit Laundry", "Balcony", "Gym", "Elevator", "Pet Friendly"],
    yearBuilt: 2015,
    parkingSpots: 1,
    agent: {
      name: "Jane Doe",
      phone: "+1 234 567 8901",
      email: "jane@example.com",
      image: "/images/agent1.jpg",
    },
    coordinates: {
      lat: 54.8985,
      lng: 23.9036,
    },
    category: "sale",
  },
  {
    id: "2",
    title: "Spacious Family Home",
    description: "A charming family home in a quiet suburban neighborhood. With 4 bedrooms and 3 bathrooms, this house is perfect for a growing family.",
    longDescription: `
      This stunning family home offers plenty of space for everyone. The large living room features a cozy fireplace, perfect for family gatherings. The modern kitchen includes a breakfast bar and high-end appliances.
      
      Upstairs, you'll find 4 spacious bedrooms including a master suite with a walk-in closet and luxury bathroom. The fenced backyard features a covered patio, perfect for outdoor entertaining.
      
      Located in a family-friendly neighborhood with excellent schools nearby, this home combines comfort with convenience.
    `,
    images: [
      "/images/studio2.jpg",
      "/images/studio3.jpg",
      "/images/studio4.jpg",
    ],
    price: 2500,
    currency: "EUR",
    location: "Suburbs, City",
    address: "456 Oak Avenue",
    beds: 4,
    baths: 3,
    size: 2500,
    sizeUnit: "sqft",
    propertyType: "house",
    features: ["Fireplace", "Backyard", "Garage", "Basement", "Central Heating", "Air Conditioning"],
    yearBuilt: 2000,
    parkingSpots: 2,
    agent: {
      name: "John Smith",
      phone: "+1 123 456 7890",
      email: "john@example.com",
      image: "/images/agent2.jpg",
    },
    coordinates: {
      lat: 54.9027,
      lng: 23.9096,
    },
    category: "rent",
  }
]

export default function PropertyDetailPage() {
  const params = useParams()
  const propertyId = params.id as string
  const property = properties.find(p => p.id === propertyId) || properties[0]
  const { t } = useTranslation()
  
  // Convert sqft to square meters for display
  const sqftToSqm = (sqft: number) => {
    return Math.round(sqft * 0.093) // 1 sqft is approximately 0.093 m²
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/listings" className="inline-flex items-center text-primary hover:underline mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("listings")}
        </Link>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{property.title}</h1>
            <p className="flex items-center text-muted-foreground mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {property.address}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              {t("share")}
            </Button>
            <Button variant="outline" size="sm">
              <Heart className="h-4 w-4 mr-2" />
              {t("save")}
            </Button>
          </div>
        </div>
      </div>

      {/* Property images */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="col-span-1 md:col-span-2 relative rounded-lg overflow-hidden h-[400px]">
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            className="object-cover"
          />
        </div>
        {property.images.slice(1, 3).map((image, index) => (
          <div key={index} className="hidden md:block relative rounded-lg overflow-hidden h-[400px]">
            <Image src={image} alt={`${property.title} ${index + 2}`} fill className="object-cover" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Property details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  {property.category === 'rent' ? t('rent') : t('sale')}
                </Badge>
                <h2 className="text-3xl font-bold">
                  €{property.price.toLocaleString()}
                  {property.category === 'rent' && <span className="text-base font-normal ml-1">/month</span>}
                </h2>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6 text-muted-foreground">
                {property.beds && (
                  <div className="flex items-center">
                    <Bed className="h-5 w-5 mr-2 text-primary" />
                    <span>{property.beds} {t('beds')}</span>
                  </div>
                )}
                {property.baths && (
                  <div className="flex items-center">
                    <Bath className="h-5 w-5 mr-2 text-primary" />
                    <span>{property.baths} {t('baths')}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <Ruler className="h-5 w-5 mr-2 text-primary" />
                  <span>{sqftToSqm(property.size)} {t('sqrm')}</span>
                </div>
              </div>

              <div className="border-t border-border pt-4 mb-6">
                <h3 className="font-medium text-lg mb-2">{t('description')}</h3>
                <p className="text-muted-foreground whitespace-pre-line">{property.longDescription}</p>
              </div>

              <div className="border-t border-border pt-4">
                <h3 className="font-medium text-lg mb-3">{t('features')}</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {property.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="map" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="map">{t('map')}</TabsTrigger>
              <TabsTrigger value="streetView">{t('streetView')}</TabsTrigger>
            </TabsList>
            <TabsContent value="map" className="border rounded-md mt-2">
              <div className="h-[400px] w-full">
                <MapComponent />
              </div>
            </TabsContent>
            <TabsContent value="streetView" className="border rounded-md mt-2">
              <div className="h-[400px] w-full bg-muted flex items-center justify-center">
                <p className="text-muted-foreground">{t('streetViewNotAvailable')}</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right column - Contact agent */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative h-16 w-16 rounded-full overflow-hidden">
                  <Image
                    src={property.agent.image}
                    alt={property.agent.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{property.agent.name}</h3>
                  <p className="text-sm text-muted-foreground">{t('realEstateAgent')}</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-2 text-primary" />
                  <span>{property.agent.phone}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2 text-primary" />
                  <span>{property.agent.email}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full">{t('contactAgent')}</Button>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  {t('downloadBrochure')}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium mb-3">{t('propertyDetails')}</h3>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">{t('propertyType')}</dt>
                  <dd className="font-medium">{property.propertyType}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">{t('yearBuilt')}</dt>
                  <dd className="font-medium">{property.yearBuilt}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">{t('size')}</dt>
                  <dd className="font-medium">
                    {sqftToSqm(property.size)} {t('sqrm')} ({property.size} sqft)
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">{t('parking')}</dt>
                  <dd className="font-medium">{property.parkingSpots} {t('spots')}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

