"use client"

import { useState } from "react"
import ListingGrid from "../components/ListingGrid"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "../context/TranslationContext"
import { Search, Filter, MapPin, Home, Euro, SlidersHorizontal } from "lucide-react"

export default function ListingsPage() {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    location: "",
    category: "",
    propertyType: "",
    minPrice: 0,
    maxPrice: 1000000
  })
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  const handleFilterChange = (key: string, value: string | number) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      location: "",
      category: "",
      propertyType: "",
      minPrice: 0,
      maxPrice: 1000000
    })
    setSearchQuery("")
  }

  const activeFiltersCount = Object.values(filters).filter(value => 
    value !== "" && value !== 0 && value !== 1000000
  ).length + (searchQuery ? 1 : 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            {t("propertyListings")}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Discover your perfect property from our extensive collection
          </p>
        </div>

        {/* Advanced Search Card */}
        <Card className="mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
          <CardContent className="p-6">
            {/* Main Search Bar */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder={t("searchProperties")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button 
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                variant="outline"
                className="h-12 px-6 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge className="ml-2 bg-blue-500 text-white text-xs">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
              <Button className="h-12 px-8 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>

            {/* Advanced Filters */}
            {showAdvancedFilters && (
              <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  {/* Location Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      Location
                    </label>
                    <Select value={filters.location} onValueChange={(value) => handleFilterChange('location', value)}>
                      <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                        <SelectValue placeholder="Any location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any location</SelectItem>
                        <SelectItem value="downtown">Downtown</SelectItem>
                        <SelectItem value="suburbs">Suburbs</SelectItem>
                        <SelectItem value="city-center">City Center</SelectItem>
                        <SelectItem value="business-district">Business District</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Category Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                      <Euro className="h-4 w-4 mr-1" />
                      Category
                    </label>
                    <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
                      <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                        <SelectValue placeholder="Buy or Rent" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any category</SelectItem>
                        <SelectItem value="sale">For Sale</SelectItem>
                        <SelectItem value="rent">For Rent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Property Type Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                      <Home className="h-4 w-4 mr-1" />
                      Property Type
                    </label>
                    <Select value={filters.propertyType} onValueChange={(value) => handleFilterChange('propertyType', value)}>
                      <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                        <SelectValue placeholder="Any type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any type</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Clear Filters */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Actions
                    </label>
                    <Button 
                      onClick={clearFilters}
                      variant="outline" 
                      className="w-full border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Clear All
                    </Button>
                  </div>
                </div>

                {/* Price Range */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Min Price (€)
                    </label>
                    <Input
                      type="number"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', Number(e.target.value))}
                      className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Max Price (€)
                    </label>
                    <Input
                      type="number"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', Number(e.target.value))}
                      className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                      placeholder="1,000,000"
                    />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Active Filters Display */}
        {activeFiltersCount > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {searchQuery && (
                <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                  Search: {searchQuery}
                </Badge>
              )}
              {filters.location && (
                <Badge variant="secondary" className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                  Location: {filters.location}
                </Badge>
              )}
              {filters.category && (
                <Badge variant="secondary" className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                  {filters.category === 'sale' ? 'For Sale' : 'For Rent'}
                </Badge>
              )}
              {filters.propertyType && (
                <Badge variant="secondary" className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200">
                  {filters.propertyType}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Results Grid */}
        <ListingGrid filters={filters} searchQuery={searchQuery} />
      </div>
    </div>
  )
}

