import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Featured properties data
const featuredProperties = [
  {
    id: 1,
    title: "Luxury Waterfront Villa",
    image: "/placeholder.svg?height=400&width=600",
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
    title: "Modern Downtown Penthouse",
    image: "/placeholder.svg?height=400&width=600",
    price: 8500,
    location: "City Center",
    beds: 3,
    baths: 2,
    sqft: 2100,
    propertyType: "penthouse",
    category: "rent",
    featured: true,
  },
  {
    id: 3,
    title: "Historic Countryside Manor",
    image: "/placeholder.svg?height=400&width=600",
    price: 950000,
    location: "Rural Countryside",
    beds: 7,
    baths: 5,
    sqft: 6500,
    propertyType: "manor",
    category: "sale",
    featured: true,
  },
]

export default function FeaturedProperties() {
  // Convert sqft to square meters for display
  const sqftToSqm = (sqft: number) => {
    return Math.round(sqft * 0.093); // 1 sqft is approximately 0.093 m²
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <Card key={property.id} className="property-card overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative h-48">
                  <Image src={property.image} alt={property.title} layout="fill" objectFit="cover" />
                  <Badge className="property-card-badge absolute top-2 right-2">
                    {property.propertyType}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-xl mb-2">{property.title}</CardTitle>
                <p className="text-muted-foreground mb-2">{property.location}</p>
                <div className="mb-2">
                  <span className="property-card-price px-3 py-1 rounded-md inline-block bg-primary text-white font-bold">
                    €{property.price.toLocaleString()}
                    {property.category === 'rent' && <span className="text-sm ml-1 font-normal">/month</span>}
                  </span>
                </div>
                <div className="flex justify-between text-sm property-card-features">
                  {property.beds && <span>{property.beds} beds</span>}
                  {property.baths && <span>{property.baths} baths</span>}
                  <span>{sqftToSqm(property.sqft)} m²</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/property/${property.id}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    View Details
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

