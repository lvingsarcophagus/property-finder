"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useTranslation } from "../context/TranslationContext"

// Featured properties data
const featuredProperties = [
  {
    id: 1,
    title: "Luxury Waterfront Villa",
    image: "/images/villa1.jpg",
    price: 1250000,
    location: "Beachfront, Malibu",
    beds: 5,
    baths: 4,
    sqft: 4200,
    propertyType: "villa",
    category: "sale",
    featured: true,
  },
  {
    id: 2,
    title: "Spacious Family Home",
    image: "/images/house2_1.jpg",
    price: 450000,
    location: "Suburbs, City",
    beds: 4,
    baths: 3,
    sqft: 2500,
  },
  {
    id: 3,
    title: "Luxury Condo with Ocean View",
    image: "/images/condo1.jpg",
    price: 750000,
    location: "Beachfront, City",
    beds: 3,
    baths: 2,
    sqft: 1800,
  },
]

export default function FeaturedProperties() {
  const { t } = useTranslation()
  
  // Convert sqft to square meters for display
  const sqftToSqm = (sqft: number) => {
    return Math.round(sqft * 0.093); // 1 sqft is approximately 0.093 m²
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8">{t("featuredProperties")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <Card key={property.id} className="property-card overflow-hidden dark:bg-card dark:border-border dark:text-card-foreground">
              <CardHeader className="p-0">
                <div className="relative h-48">
                  <Image src={property.image} alt={property.title} layout="fill" objectFit="cover" />
                  <Badge className="property-card-badge absolute top-2 right-2">
                    {t(property.propertyType)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-xl mb-2">{property.title}</CardTitle>
                <p className="text-muted-foreground mb-2">{property.location}</p>
                <div className="mb-2">
                  <span className="property-card-price px-3 py-1 rounded-md inline-block">
                    €{property.price.toLocaleString()}
                    {property.category === 'rent' && <span className="text-xs ml-1 font-normal">/{t("rent")}</span>}
                  </span>
                </div>
                <div className="flex justify-between text-sm property-card-features">
                  {property.beds && <span>{property.beds} {t("beds")}</span>}
                  {property.baths && <span>{property.baths} {t("baths")}</span>}
                  <span>{sqftToSqm(property.sqft)} {t("sqrm")}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/property/${property.id}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    {t("viewDetails")}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

