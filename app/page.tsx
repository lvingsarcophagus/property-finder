"use client"

import Link from "next/link"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTranslation } from "./context/TranslationContext"
import { MapPin, Search, Building, Home, EuroIcon } from "lucide-react"
import FeaturedProperties from "./components/FeaturedProperties"
import MapComponent from "@/components/ui/MapComponent"

// Featured properties data
const featuredProperties = [
  {
    id: 1,
    title: "Luxury Waterfront Villa",
    image: "/images/villa1.jpg", // Updated image path
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
    image: "/images/house2.jpg", // Updated image path
    price: "$450,000",
    location: "Suburbs, City",
    beds: 4,
    baths: 3,
    sqft: 2500,
  },
  {
    id: 3,
    title: "Luxury Condo with Ocean View",
    image: "/images/condo1.jpg", // Updated image path
    price: "$750,000",
    location: "Beachfront, City",
    beds: 3,
    baths: 2,
    sqft: 1800,
  },
]

export default function HomePage() {
  const { t } = useTranslation()
  const [filters, setFilters] = useState({
    location: "",
    propertyType: "",
    category: "",
    minPrice: "",
    maxPrice: ""
  })

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }))
  }

  return (
    <>
      {/* Hero section */}
      <section className="relative py-24 md:py-32 bg-secondary/30 dark:bg-secondary/10">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("findYourDreamProperty")}</h1>
            <p className="text-xl text-muted-foreground mb-8">
              {t("searchPropertyTagline")}
            </p>
          </div>

          {/* Property search form */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-card dark:bg-card border border-border shadow-lg rounded-2xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Location input */}
                <div className="col-span-full md:col-span-2">
                  <div className="flex items-center border-b border-border pb-2 mb-2">
                    <MapPin className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{t("location")}</span>
                  </div>
                  <Input 
                    placeholder={t("enterLocation")}
                    value={filters.location}
                    onChange={(e) => handleFilterChange("location", e.target.value)}
                    className="bg-background dark:bg-card"
                  />
                </div>

                {/* Price Range */}
                <div className="col-span-full">
                  <div className="flex items-center border-b border-border pb-2 mb-2">
                    <EuroIcon className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{t("priceRange")}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                      <Input 
                        type="number"
                        min="0"
                        placeholder={t("minPrice")}
                        value={filters.minPrice}
                        onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                        className="pl-7 bg-background dark:bg-card"
                      />
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                      <Input 
                        type="number"
                        min="0"
                        placeholder={t("maxPrice")}
                        value={filters.maxPrice}
                        onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                        className="pl-7 bg-background dark:bg-card"
                      />
                    </div>
                  </div>
                </div>

                {/* Property Type */}
                <div>
                  <div className="flex items-center border-b border-border pb-2 mb-2">
                    <Building className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{t("propertyType")}</span>
                  </div>
                  <Select 
                    value={filters.propertyType} 
                    onValueChange={(value) => handleFilterChange("propertyType", value)}
                  >
                    <SelectTrigger className="bg-background dark:bg-card">
                      <SelectValue placeholder={t("selectType")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("allTypes")}</SelectItem>
                      <SelectItem value="house">{t("house")}</SelectItem>
                      <SelectItem value="apartment">{t("apartment")}</SelectItem>
                      <SelectItem value="commercial">{t("commercial")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Category */}
                <div>
                  <div className="flex items-center border-b border-border pb-2 mb-2">
                    <Home className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{t("category")}</span>
                  </div>
                  <Select 
                    value={filters.category} 
                    onValueChange={(value) => handleFilterChange("category", value)}
                  >
                    <SelectTrigger className="bg-background dark:bg-card">
                      <SelectValue placeholder={t("selectCategory")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("all")}</SelectItem>
                      <SelectItem value="sale">{t("sale")}</SelectItem>
                      <SelectItem value="rent">{t("rent")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-6">
                <Button 
                  className="w-full" 
                  onClick={() => {
                    const params = new URLSearchParams()
                    if (filters.location) params.append("location", filters.location)
                    if (filters.propertyType) params.append("propertyType", filters.propertyType)
                    if (filters.category) params.append("category", filters.category)
                    if (filters.minPrice) params.append("minPrice", filters.minPrice)
                    if (filters.maxPrice) params.append("maxPrice", filters.maxPrice)
                    window.location.href = `/listings?${params.toString()}`
                  }}
                >
                  <Search className="mr-2 h-4 w-4" />
                  {t("searchProperties")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured properties */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <FeaturedProperties />
        </div>
      </section>

      {/* Map section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t("exploreProperties")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("explorePropertiesTagline")}
            </p>
          </div>
          <div className="h-[500px] rounded-xl overflow-hidden border border-border">
            <MapComponent />
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-16 bg-secondary/30 dark:bg-secondary/10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">{t("readyToFind")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            {t("readyToFindTagline")}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/listings">{t("browseProperties")}</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">{t("contactUs")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}

