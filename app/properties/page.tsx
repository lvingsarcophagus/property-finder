"use client"

import { useState, useEffect, Suspense } from "react"
import { Search, Grid, List, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import PropertyCard from "../components/PropertyCard"
import { useAuth } from "../context/AuthContext"

// Mock data - replace with actual API call
const mockProperties = [
  {
    id: "1",
    title: "Modern Apartment in Vilnius Old Town",
    price: 250000,
    area: 85,
    bedrooms: 2,
    bathrooms: 1,
    location: "Vilnius Old Town, Lithuania",
    image: "/placeholder.svg?height=300&width=400",
    listing_type: "sale" as const,
    is_foreigners_friendly: true,
    is_pet_friendly: false,
    is_children_friendly: true,
    broker_name: "Jonas Petraitis",
  },
  {
    id: "2",
    title: "Luxury Villa with Garden",
    price: 1200,
    area: 150,
    bedrooms: 3,
    bathrooms: 2,
    location: "Kaunas, Lithuania",
    image: "/placeholder.svg?height=300&width=400",
    listing_type: "rent" as const,
    rent_deposit: 2400,
    is_foreigners_friendly: true,
    is_pet_friendly: true,
    is_children_friendly: true,
    broker_name: "Marija Kazlauskienė",
  },
  {
    id: "3",
    title: "Cozy Studio Near University",
    price: 800,
    area: 45,
    bedrooms: 1,
    bathrooms: 1,
    location: "Klaipėda, Lithuania",
    image: "/placeholder.svg?height=300&width=400",
    listing_type: "rent" as const,
    rent_deposit: 800,
    is_foreigners_friendly: true,
    is_pet_friendly: false,
    is_children_friendly: false,
    broker_name: "Petras Jonaitis",
  },
]

export default function PropertiesPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const [properties, setProperties] = useState(mockProperties)
  const [filteredProperties, setFilteredProperties] = useState(mockProperties)
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filters, setFilters] = useState({
    listingType: "all",
    minPrice: "",
    maxPrice: "",
    bedrooms: "all",
    foreignersFriendly: false,
    petFriendly: false,
    childrenFriendly: false,
  })

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      window.location.href = "/login"
    }
  }, [isAuthenticated, isLoading])

  useEffect(() => {
    let filtered = properties

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (property) =>
          property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.location.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Listing type filter
    if (filters.listingType !== "all") {
      filtered = filtered.filter((property) => property.listing_type === filters.listingType)
    }

    // Price filter
    if (filters.minPrice) {
      filtered = filtered.filter((property) => property.price >= Number.parseInt(filters.minPrice))
    }
    if (filters.maxPrice) {
      filtered = filtered.filter((property) => property.price <= Number.parseInt(filters.maxPrice))
    }

    // Bedrooms filter
    if (filters.bedrooms !== "all") {
      filtered = filtered.filter((property) => property.bedrooms >= Number.parseInt(filters.bedrooms))
    }

    // Feature filters
    if (filters.foreignersFriendly) {
      filtered = filtered.filter((property) => property.is_foreigners_friendly)
    }
    if (filters.petFriendly) {
      filtered = filtered.filter((property) => property.is_pet_friendly)
    }
    if (filters.childrenFriendly) {
      filtered = filtered.filter((property) => property.is_children_friendly)
    }

    setFilteredProperties(filtered)
  }, [searchTerm, filters, properties])

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Properties</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Discover {filteredProperties.length} properties available
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search properties by title or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="sm:hidden">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Properties</SheetTitle>
                  <SheetDescription>Refine your search with these filters</SheetDescription>
                </SheetHeader>
                <FilterContent filters={filters} onFilterChange={handleFilterChange} />
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Filters */}
          <Card className="hidden sm:block">
            <CardHeader>
              <CardTitle className="text-lg">Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <FilterContent filters={filters} onFilterChange={handleFilterChange} />
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-slate-600 dark:text-slate-400">{filteredProperties.length} properties found</p>
          <div className="flex gap-2">
            {filters.foreignersFriendly && <Badge variant="secondary">Foreigners Friendly</Badge>}
            {filters.petFriendly && <Badge variant="secondary">Pet Friendly</Badge>}
            {filters.childrenFriendly && <Badge variant="secondary">Family Friendly</Badge>}
          </div>
        </div>

        {/* Properties Grid */}
        <Suspense fallback={<div>Loading properties...</div>}>
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} className={viewMode === "list" ? "max-w-none" : ""} />
            ))}
          </div>
        </Suspense>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg mb-4">No properties found matching your criteria</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setFilters({
                  listingType: "all",
                  minPrice: "",
                  maxPrice: "",
                  bedrooms: "all",
                  foreignersFriendly: false,
                  petFriendly: false,
                  childrenFriendly: false,
                })
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

function FilterContent({
  filters,
  onFilterChange,
}: {
  filters: any
  onFilterChange: (key: string, value: any) => void
}) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Listing Type */}
        <div className="space-y-2">
          <Label>Listing Type</Label>
          <Select value={filters.listingType} onValueChange={(value) => onFilterChange("listingType", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="sale">For Sale</SelectItem>
              <SelectItem value="rent">For Rent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bedrooms */}
        <div className="space-y-2">
          <Label>Bedrooms</Label>
          <Select value={filters.bedrooms} onValueChange={(value) => onFilterChange("bedrooms", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <Label>Min Price (€)</Label>
          <Input
            type="number"
            placeholder="0"
            value={filters.minPrice}
            onChange={(e) => onFilterChange("minPrice", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Max Price (€)</Label>
          <Input
            type="number"
            placeholder="No limit"
            value={filters.maxPrice}
            onChange={(e) => onFilterChange("maxPrice", e.target.value)}
          />
        </div>
      </div>

      {/* Feature Checkboxes */}
      <div className="space-y-3">
        <Label className="text-base font-medium">Property Features</Label>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="foreigners"
              checked={filters.foreignersFriendly}
              onCheckedChange={(checked) => onFilterChange("foreignersFriendly", checked)}
            />
            <Label htmlFor="foreigners" className="text-sm font-normal">
              Foreigners Friendly
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="pets"
              checked={filters.petFriendly}
              onCheckedChange={(checked) => onFilterChange("petFriendly", checked)}
            />
            <Label htmlFor="pets" className="text-sm font-normal">
              Pet Friendly
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="children"
              checked={filters.childrenFriendly}
              onCheckedChange={(checked) => onFilterChange("childrenFriendly", checked)}
            />
            <Label htmlFor="children" className="text-sm font-normal">
              Family Friendly
            </Label>
          </div>
        </div>
      </div>
    </div>
  )
}
