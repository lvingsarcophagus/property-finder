"use client"

import { useState } from 'react'
import ListingGrid from "../components/ListingGrid"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useTranslation } from "../context/TranslationContext"
import { MapPin, Search, Building, Home, EuroIcon } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ListingsPage() {
  const { t } = useTranslation()
  const [filters, setFilters] = useState({
    location: "",
    propertyType: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  })

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission is not needed as filtering is done in real-time
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">{t("propertyListings")}</h1>
      
      {/* Filter section */}
      <div className="bg-card dark:bg-card border border-border rounded-lg shadow-sm mb-8">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Location Filter */}
            <div>
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

            {/* Price Range Inputs */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center border-b border-border pb-2 mb-2">
                  <EuroIcon className="mr-2 h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{t("priceRange")}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
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
            </div>

            {/* Property Type Filter */}
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

            {/* Category Filter */}
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
        </form>
      </div>
      
      {/* Property Grid */}
      <ListingGrid filters={{
        ...filters,
        minPrice: filters.minPrice ? parseFloat(filters.minPrice) : undefined,
        maxPrice: filters.maxPrice ? parseFloat(filters.maxPrice) : undefined,
      }} />
    </div>
  )
}

