"use client"

import Image from "next/image"
import Link from "next/link"
import { useTranslation } from "../context/TranslationContext"

const featuredProperties = [
  {
    id: 1,
    title: "Modern Apartment in Downtown",
    image: "/placeholder.svg?height=400&width=600",
    price: "$250,000",
    location: "Downtown, City",
    beds: 2,
    baths: 2,
    sqft: 1200,
  },
  {
    id: 2,
    title: "Spacious Family Home",
    image: "/placeholder.svg?height=400&width=600",
    price: "$450,000",
    location: "Suburbs, City",
    beds: 4,
    baths: 3,
    sqft: 2500,
  },
  {
    id: 3,
    title: "Luxury Condo with Ocean View",
    image: "/placeholder.svg?height=400&width=600",
    price: "$750,000",
    location: "Beachfront, City",
    beds: 3,
    baths: 2,
    sqft: 1800,
  },
]

export default function FeaturedProperties() {
  const { t } = useTranslation()

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">{t("featuredProperties")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredProperties.map((property) => (
          <Link
            href={`/property/${property.id}`}
            key={property.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-lg"
          >
            <div className="relative h-48">
              <Image src={property.image || "/placeholder.svg"} alt={property.title} layout="fill" objectFit="cover" />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
              <p className="text-gray-600 mb-2">{property.location}</p>
              <p className="text-blue-500 font-bold mb-2">{property.price}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{property.beds} beds</span>
                <span>{property.baths} baths</span>
                <span>{property.sqft} sqft</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
