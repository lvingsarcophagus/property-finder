"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, MapPin, Bed, Bath, Square, Users, PawPrint, Baby } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Property {
  id: string
  title: string
  price: number
  area: number
  bedrooms: number
  bathrooms: number
  location: string
  image: string
  listing_type: "sale" | "rent"
  rent_deposit?: number
  is_foreigners_friendly: boolean
  is_pet_friendly: boolean
  is_children_friendly: boolean
  broker_name: string
  broker_avatar?: string
}

interface PropertyCardProps {
  property: Property
  className?: string
}

export default function PropertyCard({ property, className }: PropertyCardProps) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("lt-LT", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Card
      className={cn(
        "group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.image || "/placeholder.svg"}
          alt={property.title}
          fill
          className={cn(
            "object-cover transition-all duration-300 group-hover:scale-105",
            imageLoading ? "blur-sm" : "blur-0",
          )}
          onLoad={() => setImageLoading(false)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Overlay badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <Badge variant={property.listing_type === "sale" ? "default" : "secondary"} className="text-xs font-medium">
            {property.listing_type === "sale" ? "For Sale" : "For Rent"}
          </Badge>
          {property.is_foreigners_friendly && (
            <Badge variant="outline" className="text-xs bg-white/90 text-slate-700">
              <Users className="w-3 h-3 mr-1" />
              Foreigners OK
            </Badge>
          )}
          {property.is_pet_friendly && (
            <Badge variant="outline" className="text-xs bg-white/90 text-slate-700">
              <PawPrint className="w-3 h-3 mr-1" />
              Pet Friendly
            </Badge>
          )}
          {property.is_children_friendly && (
            <Badge variant="outline" className="text-xs bg-white/90 text-slate-700">
              <Baby className="w-3 h-3 mr-1" />
              Family Friendly
            </Badge>
          )}
        </div>

        {/* Favorite button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 h-8 w-8 bg-white/90 hover:bg-white transition-colors"
          onClick={(e) => {
            e.preventDefault()
            setIsFavorited(!isFavorited)
          }}
        >
          <Heart className={cn("h-4 w-4", isFavorited ? "fill-red-500 text-red-500" : "text-slate-600")} />
        </Button>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Price */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {formatPrice(property.price)}
                {property.listing_type === "rent" && <span className="text-sm font-normal text-slate-500">/month</span>}
              </p>
              {property.listing_type === "rent" && property.rent_deposit && (
                <p className="text-sm text-slate-500">Deposit: {formatPrice(property.rent_deposit)}</p>
              )}
            </div>
          </div>

          {/* Title */}
          <Link href={`/property/${property.id}`} className="block">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 line-clamp-2 group-hover:text-primary transition-colors">
              {property.title}
            </h3>
          </Link>

          {/* Location */}
          <div className="flex items-center text-slate-500 text-sm">
            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>

          {/* Property details */}
          <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              <span>{property.bedrooms}</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              <span>{property.bathrooms}</span>
            </div>
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1" />
              <span>{property.area} m²</span>
            </div>
          </div>

          {/* Broker info */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-medium text-primary">{property.broker_name.charAt(0).toUpperCase()}</span>
              </div>
              <span className="text-sm text-slate-600 dark:text-slate-400">{property.broker_name}</span>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/property/${property.id}`}>View Details</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
