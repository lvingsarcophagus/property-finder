"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Upload, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslation } from "../../context/TranslationContext"
import { useAuth } from "../../context/AuthContext"
import { toast } from "@/components/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Checkbox } from "@/components/ui/checkbox"

export default function NewListingPage() {
  const { t } = useTranslation()
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [listingType, setListingType] = useState<"sell" | "rent">("sell")
  const [showAddressInfo, setShowAddressInfo] = useState(false)
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>(["/placeholder.svg?height=200&width=300"])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    title: "",
    propertyType: "apartment",
    // Address
    city: "",
    cityPart: "",
    street: "",
    houseNumber: "",
    // Building info
    yearBuilt: "",
    totalFloors: "",
    buildingMaterial: "",
    // Property specs
    heatingType: "",
    floor: "",
    rooms: "",
    area: "",
    // Pricing
    salePrice: "",
    rentPrice: "",
    ownerInvoice: false,
    renterInvoice: false,
    // Description
    description: "",
    amenities: [""] as string[],
  })

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-900/50 dark:to-orange-900/50 flex items-center justify-center">
              <ArrowLeft className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Access Denied</h1>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              You need to be logged in to add a new listing. Please log in to continue.
            </p>
            <Button 
              onClick={() => router.push("/login")}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
            >
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleAddressLookup = () => {
    // In a real app, this would be an API call to get building information
    // For demo purposes, we'll simulate a response
    setTimeout(() => {
      setShowAddressInfo(true)
      setFormData((prev) => ({
        ...prev,
        yearBuilt: "2010",
        totalFloors: "5",
        buildingMaterial: "Brick",
      }))
      toast({
        title: "Address information found",
        description: "Building details have been automatically filled",
      })
    }, 1000)
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      // In a real app, you would upload these to a server
      // For demo purposes, we'll use local URLs
      const newPhotos = Array.from(files).map((file) => URL.createObjectURL(file))
      setUploadedPhotos((prev) => [...prev, ...newPhotos])
      toast({
        title: "Photos uploaded",
        description: `${files.length} photo(s) added to your listing`,
      })
    }
  }

  const handleRemovePhoto = (index: number) => {
    setUploadedPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  const handleAddAmenity = () => {
    setFormData((prev) => ({
      ...prev,
      amenities: [...prev.amenities, ""],
    }))
  }

  const handleAmenityChange = (index: number, value: string) => {
    const newAmenities = [...formData.amenities]
    newAmenities[index] = value
    setFormData((prev) => ({
      ...prev,
      amenities: newAmenities,
    }))
  }

  const handleRemoveAmenity = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, you would send this data to your backend
    console.log("Submitting new listing:", {
      ...formData,
      listingType,
      photos: uploadedPhotos,
    })

    toast({
      title: "Listing created successfully",
      description: "Your new property listing has been created",
    })

    // Redirect to listings page after successful submission
    setTimeout(() => {
      router.push("/listings")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-6 py-12">
        <Toaster />
        
        {/* Back Navigation */}
        <div className="mb-8">
          <Link href="/listings" className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors group">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Listings
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="relative mb-12 p-8 rounded-3xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-green-600/5 dark:from-blue-400/5 dark:to-green-400/5" />
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="space-y-1">
                  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
                    Add New Property Listing
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    Create a comprehensive listing to attract potential buyers or renters
                  </p>
                </div>
                <div className="hidden md:flex items-center space-x-3">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-600 to-green-600 shadow-lg flex items-center justify-center">
                    <Plus className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Progress Indicator */}
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <div className="h-2 w-2 rounded-full bg-blue-600" />
                  <span>Step 1 of 6</span>
                </div>
                <span>•</span>
                <span>Basic Information</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <Tabs defaultValue="basic" className="mb-8">
              <TabsList className="mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-3 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                <TabsTrigger 
                  value="basic" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 rounded-xl font-medium"
                >
                  Basic Info
                </TabsTrigger>
                <TabsTrigger 
                  value="address"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 rounded-xl font-medium"
                >
                  Address
                </TabsTrigger>
                <TabsTrigger 
                  value="details"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 rounded-xl font-medium"
                >
                  Property Details
                </TabsTrigger>
                <TabsTrigger 
                  value="pricing"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 rounded-xl font-medium"
                >
                  Pricing
                </TabsTrigger>
                <TabsTrigger 
                  value="photos"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 rounded-xl font-medium"
                >
                  Photos
                </TabsTrigger>
                <TabsTrigger 
                  value="description"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 rounded-xl font-medium"
                >
                  Description
                </TabsTrigger>
              </TabsList>

              {/* Basic Info Tab */}
              <TabsContent value="basic">
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 shadow-2xl rounded-3xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border-b border-white/20 dark:border-gray-700/20">
                    <CardTitle className="text-xl text-gray-800 dark:text-gray-200 flex items-center">
                      <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mr-3">
                        <span className="text-white text-sm font-bold">1</span>
                      </div>
                      Basic Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8 p-8">
                    <div className="space-y-3">
                      <Label htmlFor="title" className="text-gray-700 dark:text-gray-300 font-semibold flex items-center">
                        Property Title
                        <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="e.g. Modern Apartment in City Center"
                        className="bg-white/90 dark:bg-gray-700/90 border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 rounded-xl h-12 text-lg backdrop-blur-sm"
                        required
                      />
                      <p className="text-sm text-gray-500 dark:text-gray-400">Make it descriptive and appealing to potential buyers/renters</p>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="propertyType" className="text-gray-700 dark:text-gray-300 font-semibold flex items-center">
                        Property Type
                        <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <select
                        id="propertyType"
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={(e) => setFormData((prev) => ({ ...prev, propertyType: e.target.value }))}
                        className="flex h-12 w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-white/90 dark:bg-gray-700/90 px-4 py-3 text-lg text-gray-900 dark:text-gray-100 backdrop-blur-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
                      >
                        <option value="apartment">🏢 Apartment</option>
                        <option value="house">🏠 House</option>
                        <option value="commercial">🏢 Commercial</option>
                        <option value="land">🌾 Land</option>
                      </select>
                    </div>

                    <div className="space-y-4">
                      <Label className="text-gray-700 dark:text-gray-300 font-semibold flex items-center">
                        Listing Type
                        <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <RadioGroup
                        defaultValue={listingType}
                        onValueChange={(value) => setListingType(value as "sell" | "rent")}
                        className="grid grid-cols-2 gap-4"
                      >
                        <div className="relative">
                          <RadioGroupItem value="sell" id="sell" className="peer sr-only" />
                          <Label 
                            htmlFor="sell" 
                            className="flex items-center justify-center p-6 border-2 border-gray-200 dark:border-gray-600 rounded-xl cursor-pointer transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-950/30 peer-checked:shadow-lg"
                          >
                            <div className="text-center">
                              <div className="text-2xl mb-2">💰</div>
                              <div className="font-semibold text-gray-700 dark:text-gray-300">For Sale</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">Sell your property</div>
                            </div>
                          </Label>
                        </div>
                        <div className="relative">
                          <RadioGroupItem value="rent" id="rent" className="peer sr-only" />
                          <Label 
                            htmlFor="rent" 
                            className="flex items-center justify-center p-6 border-2 border-gray-200 dark:border-gray-600 rounded-xl cursor-pointer transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-950/30 peer-checked:shadow-lg"
                          >
                            <div className="text-center">
                              <div className="text-2xl mb-2">🏠</div>
                              <div className="font-semibold text-gray-700 dark:text-gray-300">For Rent</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">Rent your property</div>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Address Tab */}
              <TabsContent value="address">
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 shadow-2xl rounded-3xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/50 dark:to-blue-950/50 border-b border-white/20 dark:border-gray-700/20">
                    <CardTitle className="text-xl text-gray-800 dark:text-gray-200 flex items-center">
                      <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-green-600 to-blue-600 flex items-center justify-center mr-3">
                        <span className="text-white text-sm font-bold">2</span>
                      </div>
                      Property Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city" className="text-gray-700 dark:text-gray-300 font-medium">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="e.g. Vilnius"
                          className="mt-2 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cityPart" className="text-gray-700 dark:text-gray-300 font-medium">City Part</Label>
                        <Input
                          id="cityPart"
                          name="cityPart"
                          value={formData.cityPart}
                          onChange={handleInputChange}
                          placeholder="e.g. City Center"
                          className="mt-2 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                      </div>
                      <div>
                        <Label htmlFor="street" className="text-gray-700 dark:text-gray-300 font-medium">Street</Label>
                        <Input
                          id="street"
                          name="street"
                          value={formData.street}
                          onChange={handleInputChange}
                          placeholder="e.g. Gedimino Avenue"
                          className="mt-2 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                      </div>
                      <div>
                        <Label htmlFor="houseNumber" className="text-gray-700 dark:text-gray-300 font-medium">House/Flat Number</Label>
                        <Input
                          id="houseNumber"
                          name="houseNumber"
                          value={formData.houseNumber}
                          onChange={handleInputChange}
                          placeholder="e.g. 15A"
                          className="mt-2 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                      </div>
                    </div>

                    <Button 
                      type="button" 
                      onClick={handleAddressLookup} 
                      className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
                    >
                      Lookup Address Info
                    </Button>

                    {showAddressInfo && (
                      <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                        <h3 className="font-medium text-green-800 dark:text-green-300 mb-3">Building Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="yearBuilt" className="text-gray-700 dark:text-gray-300 font-medium">Year Built</Label>
                            <Input
                              id="yearBuilt"
                              name="yearBuilt"
                              value={formData.yearBuilt}
                              onChange={handleInputChange}
                              className="mt-1 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                            />
                          </div>
                          <div>
                            <Label htmlFor="totalFloors" className="text-gray-700 dark:text-gray-300 font-medium">Total Floors</Label>
                            <Input
                              id="totalFloors"
                              name="totalFloors"
                              value={formData.totalFloors}
                              onChange={handleInputChange}
                              className="mt-1 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                            />
                          </div>
                          <div>
                            <Label htmlFor="buildingMaterial" className="text-gray-700 dark:text-gray-300 font-medium">Building Material</Label>
                            <Input
                              id="buildingMaterial"
                              name="buildingMaterial"
                              value={formData.buildingMaterial}
                              onChange={handleInputChange}
                              className="mt-1 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Property Details Tab */}
              <TabsContent value="details">
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-800 dark:text-gray-200">Property Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="rooms" className="text-gray-700 dark:text-gray-300 font-medium">Number of Rooms</Label>
                        <Input
                          id="rooms"
                          name="rooms"
                          type="number"
                          value={formData.rooms}
                          onChange={handleInputChange}
                          placeholder="e.g. 3"
                          className="mt-2 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                      </div>
                      <div>
                        <Label htmlFor="area" className="text-gray-700 dark:text-gray-300 font-medium">Area (m²)</Label>
                        <Input
                          id="area"
                          name="area"
                          type="number"
                          value={formData.area}
                          onChange={handleInputChange}
                          placeholder="e.g. 75"
                          className="mt-2 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                      </div>
                      <div>
                        <Label htmlFor="floor" className="text-gray-700 dark:text-gray-300 font-medium">Floor</Label>
                        <Input
                          id="floor"
                          name="floor"
                          type="number"
                          value={formData.floor}
                          onChange={handleInputChange}
                          placeholder="e.g. 3"
                          className="mt-2 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                      </div>
                      <div>
                        <Label htmlFor="heatingType" className="text-gray-700 dark:text-gray-300 font-medium">Heating Type</Label>
                        <select
                          id="heatingType"
                          name="heatingType"
                          value={formData.heatingType}
                          onChange={(e) => setFormData((prev) => ({ ...prev, heatingType: e.target.value }))}
                          className="mt-2 flex h-10 w-full rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all"
                        >
                          <option value="">Select heating type</option>
                          <option value="central">Central Heating</option>
                          <option value="gas">Gas</option>
                          <option value="electric">Electric</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Pricing Tab */}
              <TabsContent value="pricing">
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-800 dark:text-gray-200">Pricing Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {listingType === "sell" ? (
                      <div>
                        <Label htmlFor="salePrice" className="text-gray-700 dark:text-gray-300 font-medium">Sale Price (€)</Label>
                        <Input
                          id="salePrice"
                          name="salePrice"
                          type="number"
                          value={formData.salePrice}
                          onChange={handleInputChange}
                          placeholder="e.g. 150000"
                          className="mt-2 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all"
                          required
                        />
                      </div>
                    ) : (
                      <div>
                        <Label htmlFor="rentPrice" className="text-gray-700 dark:text-gray-300 font-medium">Monthly Rent (€)</Label>
                        <Input
                          id="rentPrice"
                          name="rentPrice"
                          type="number"
                          value={formData.rentPrice}
                          onChange={handleInputChange}
                          placeholder="e.g. 800"
                          className="mt-2 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all"
                          required
                        />
                      </div>
                    )}

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Additional Options</h3>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="ownerInvoice"
                          checked={formData.ownerInvoice}
                          onCheckedChange={(checked) => handleCheckboxChange("ownerInvoice", checked as boolean)}
                          className="border-gray-300 dark:border-gray-600"
                        />
                        <Label htmlFor="ownerInvoice" className="text-gray-700 dark:text-gray-300">
                          Owner provides invoice
                        </Label>
                      </div>
                      {listingType === "rent" && (
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="renterInvoice"
                            checked={formData.renterInvoice}
                            onCheckedChange={(checked) => handleCheckboxChange("renterInvoice", checked as boolean)}
                            className="border-gray-300 dark:border-gray-600"
                          />
                          <Label htmlFor="renterInvoice" className="text-gray-700 dark:text-gray-300">
                            Renter can request invoice
                          </Label>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Photos Tab */}
              <TabsContent value="photos">
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-800 dark:text-gray-200">Property Photos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label className="text-gray-700 dark:text-gray-300 font-medium">Upload Photos</Label>
                      <div className="mt-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
                        <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                        <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                          Drag and drop photos here, or click to select
                        </p>
                        <Button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
                        >
                          Select Photos
                        </Button>
                      </div>
                    </div>

                    {uploadedPhotos.length > 0 && (
                      <div>
                        <Label className="text-gray-700 dark:text-gray-300 font-medium">Uploaded Photos</Label>
                        <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-4">
                          {uploadedPhotos.map((photo, index) => (
                            <div key={index} className="relative group">
                              <Image
                                src={photo}
                                alt={`Property photo ${index + 1}`}
                                width={200}
                                height={150}
                                className="w-full h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemovePhoto(index)}
                                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Description Tab */}
              <TabsContent value="description">
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-800 dark:text-gray-200">Property Description & Amenities</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="description" className="text-gray-700 dark:text-gray-300 font-medium">Detailed Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Describe your property in detail. Include key features, recent renovations, neighborhood information, etc."
                        className="mt-2 min-h-[200px] bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </div>

                    <div>
                      <Label className="text-gray-700 dark:text-gray-300 font-medium">Amenities</Label>
                      <div className="mt-2 space-y-3">
                        {formData.amenities.map((amenity, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Input
                              value={amenity}
                              onChange={(e) => handleAmenityChange(index, e.target.value)}
                              placeholder="e.g. Parking, Balcony, Air Conditioning"
                              className="flex-1 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => handleRemoveAmenity(index)}
                              className="border-red-300 hover:bg-red-50 dark:border-red-600 dark:hover:bg-red-900/20"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleAddAmenity}
                          className="w-full border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 text-gray-600 dark:text-gray-400"
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Amenity
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Submit Section */}
            <div className="mt-12 p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-gray-700/20 shadow-2xl">
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="text-center sm:text-left">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Ready to publish?</h3>
                  <p className="text-gray-600 dark:text-gray-400">Review your listing details and publish when ready</p>
                </div>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => router.push("/listings")}
                    className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl px-6 py-3 font-medium transition-all duration-200"
                  >
                    Save as Draft
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 hover:from-blue-700 hover:via-purple-700 hover:to-green-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Plus className="mr-2 h-5 w-5" />
                    Create Listing
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
