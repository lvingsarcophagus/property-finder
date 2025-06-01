"use client"

import type React from "react"

import { useState } from "react"
import { Search, MapPin, Home, Euro, SlidersHorizontal } from "lucide-react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function SearchBar() {
  const router = useRouter()
  const [location, setLocation] = useState("")
  const [category, setCategory] = useState("")
  const [propertyType, setPropertyType] = useState("")
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(1000000)
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality
    console.log("Searching for:", { location, category, propertyType, minPrice, maxPrice })
    // Redirect to results page with query parameters
    router.push(
      `/listings?location=${location}&category=${category}&propertyType=${propertyType}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
    )
  }

  const clearFilters = () => {
    setLocation("")
    setCategory("")
    setPropertyType("")
    setMinPrice(0)
    setMaxPrice(1000000)
  }

  const activeFiltersCount = [location, category, propertyType].filter(Boolean).length + 
    (minPrice > 0 || maxPrice < 1000000 ? 1 : 0)

  return (
    <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl">
      <CardContent className="p-6">
        <form onSubmit={handleSearch}>
          {/* Main Search Row */}
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by location, property type, or keyword..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10 h-12 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <Button 
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              variant="outline"
              className="h-12 px-6 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Advanced
              {activeFiltersCount > 0 && (
                <Badge className="ml-2 bg-blue-500 text-white text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>

            <Button 
              type="submit" 
              className="h-12 px-8 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
            >
              <Search className="h-4 w-4 mr-2" />
              Search Properties
            </Button>
          </div>

          {/* Advanced Filters */}
          {showAdvanced && (
            <div className="border-t border-gray-200 dark:border-gray-600 pt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                    <Euro className="h-4 w-4 mr-1" />
                    Category
                  </Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger 
                      id="category"
                      className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                    >
                      <SelectValue placeholder="Buy or Rent" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any Category</SelectItem>
                      <SelectItem value="rent">For Rent</SelectItem>
                      <SelectItem value="sale">For Sale</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Property Type */}
                <div className="space-y-2">
                  <Label htmlFor="propertyType" className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                    <Home className="h-4 w-4 mr-1" />
                    Property Type
                  </Label>
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger 
                      id="propertyType"
                      className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                    >
                      <SelectValue placeholder="Any Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any Type</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Clear Filters */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Actions
                  </Label>
                  <Button 
                    type="button"
                    onClick={clearFilters}
                    variant="outline" 
                    className="w-full h-10 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Clear All
                  </Button>
                </div>
              </div>

              {/* Price Range */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minPrice" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Minimum Price (€)
                  </Label>
                  <Input
                    id="minPrice"
                    type="number"
                    min={0}
                    max={1000000}
                    step={1000}
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxPrice" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Maximum Price (€)
                  </Label>
                  <Input
                    id="maxPrice"
                    type="number"
                    min={0}
                    max={1000000}
                    step={1000}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                    placeholder="1,000,000"
                  />
                </div>
              </div>

              {/* Active Filters Display */}
              {activeFiltersCount > 0 && (
                <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200 dark:border-gray-600">
                  {category && (
                    <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                      {category === 'sale' ? 'For Sale' : 'For Rent'}
                    </Badge>
                  )}
                  {propertyType && (
                    <Badge variant="secondary" className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                      {propertyType}
                    </Badge>
                  )}
                  {(minPrice > 0 || maxPrice < 1000000) && (
                    <Badge variant="secondary" className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                      €{minPrice.toLocaleString()} - €{maxPrice.toLocaleString()}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
