"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Camera, 
  Save, 
  X, 
  Edit3, 
  Shield, 
  Settings,
  Building2,
  Eye,
  MessageCircle,
  Calendar,
  TrendingUp,
  Award,
  CheckCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { useTranslation } from "../context/TranslationContext"
import { useAuth } from "../context/AuthContext"
import { toast } from "@/components/use-toast"
import { Toaster } from "@/components/ui/toaster"

// Mock user data - in a real app, this would come from your backend
const mockUserData = {
  name: "John Smith",
  email: "john@example.com",
  phone: "+370 612 34567",
  address: "Vilnius, Lithuania",
  bio: "Real estate professional with over 10 years of experience in the Lithuanian property market. Specializing in residential properties in Vilnius and surrounding areas.",
  profilePicture: "/placeholder.svg?height=200&width=200",
  listings: 5,
  viewsThisMonth: 320,
  inquiriesThisMonth: 15,
  verificationLevel: "Premium",
  joinDate: "March 2020",
  completedDeals: 42,
  responseRate: 98,
  averageRating: 4.8,
}

export default function ProfilePage() {
  const { t } = useTranslation()
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()
  const [userData, setUserData] = useState(mockUserData)
  const [isEditing, setIsEditing] = useState(false)
  const [editedData, setEditedData] = useState(mockUserData)
  const [profileCompletion, setProfileCompletion] = useState(85)
  const [showPasswordChange, setShowPasswordChange] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    propertyAlerts: true,
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null // Will redirect in the useEffect
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedData((prev) => ({ ...prev, [name]: value }))
  }

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload this to a server
      // For demo purposes, we'll use a local URL
      const imageUrl = URL.createObjectURL(file)
      setEditedData((prev) => ({ ...prev, profilePicture: imageUrl }))
    }
  }

  const handleSaveChanges = () => {
    setUserData(editedData)
    setIsEditing(false)
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully",
    })
  }

  const handleCancelEdit = () => {
    setEditedData(userData)
    setIsEditing(false)
  }

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive",
      })
      return
    }
    
    if (newPassword.length < 6) {
      toast({
        title: "Error", 
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      })
      return
    }

    // In a real app, you would send this to your backend
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully",
    })
    
    setShowPasswordChange(false)
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  const handleNotificationChange = (setting: string, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: value
    }))
    
    toast({
      title: "Settings updated",
      description: "Your notification preferences have been saved",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950">
      <Toaster />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-blue-800 dark:via-purple-800 dark:to-blue-900">
        <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />
        <div className="relative container mx-auto px-6 py-16">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative group">
                <div className="relative h-24 w-24 rounded-full overflow-hidden ring-4 ring-white/20 dark:ring-gray-300/20">
                  <Image
                    src={isEditing ? editedData.profilePicture : userData.profilePicture || "/placeholder.svg"}
                    alt="Profile picture"
                    fill
                    className="object-cover"
                  />
                  {isEditing && (
                    <div 
                      className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Camera className="h-6 w-6 text-white" />
                    </div>
                  )}
                </div>
                <Badge className="absolute -bottom-2 -right-2 bg-green-500 hover:bg-green-600 text-white border-0">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {userData.verificationLevel}
                </Badge>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{userData.name}</h1>
                <div className="flex items-center space-x-4 text-white/80">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {userData.address}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Member since {userData.joinDate}
                  </div>
                </div>
              </div>
            </div>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant="secondary"
              className="bg-white/20 hover:bg-white/30 text-white border-white/20 backdrop-blur-sm"
            >
              {isEditing ? <X className="h-4 w-4 mr-2" /> : <Edit3 className="h-4 w-4 mr-2" />}
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
              <TabsTrigger value="overview" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
                Overview
              </TabsTrigger>
              <TabsTrigger value="details" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
                Details
              </TabsTrigger>
              <TabsTrigger value="statistics" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
                Statistics
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {/* Stats Cards */}
                <Card className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
                  <div className="absolute inset-0 bg-white/10" />
                  <CardContent className="relative p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm font-medium">Active Listings</p>
                        <p className="text-3xl font-bold">{userData.listings}</p>
                      </div>
                      <Building2 className="h-8 w-8 text-blue-100" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="relative overflow-hidden bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
                  <div className="absolute inset-0 bg-white/10" />
                  <CardContent className="relative p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100 text-sm font-medium">Profile Views</p>
                        <p className="text-3xl font-bold">{userData.viewsThisMonth}</p>
                      </div>
                      <Eye className="h-8 w-8 text-green-100" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="relative overflow-hidden bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
                  <div className="absolute inset-0 bg-white/10" />
                  <CardContent className="relative p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100 text-sm font-medium">Inquiries</p>
                        <p className="text-3xl font-bold">{userData.inquiriesThisMonth}</p>
                      </div>
                      <MessageCircle className="h-8 w-8 text-purple-100" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="relative overflow-hidden bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
                  <div className="absolute inset-0 bg-white/10" />
                  <CardContent className="relative p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-100 text-sm font-medium">Completed Deals</p>
                        <p className="text-3xl font-bold">{userData.completedDeals}</p>
                      </div>
                      <Award className="h-8 w-8 text-orange-100" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Completion */}
                <Card className="lg:col-span-2 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                      Profile Completion
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600 dark:text-gray-400">Progress</span>
                        <span className="font-medium">{profileCompletion}%</span>
                      </div>
                      <Progress value={profileCompletion} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-sm">Basic Information</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-sm">Profile Photo</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-sm">Contact Details</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <X className="h-5 w-5 text-red-500" />
                        <span className="text-sm">Professional Bio</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <Building2 className="h-4 w-4 mr-2" />
                      Create New Listing
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      View Messages
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Analytics Dashboard
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Shield className="h-4 w-4 mr-2" />
                      Verify Account
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-8">
              <Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={isEditing ? editedData.name : userData.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="bg-white/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={isEditing ? editedData.email : userData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="bg-white/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={isEditing ? editedData.phone : userData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="bg-white/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={isEditing ? editedData.address : userData.address}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="bg-white/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Professional Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={isEditing ? editedData.bio : userData.bio}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      rows={4}
                      className="bg-white/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50"
                    />
                  </div>
                  {isEditing && (
                    <div className="flex space-x-4">
                      <Button onClick={handleSaveChanges} className="bg-blue-600 hover:bg-blue-700">
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                      <Button onClick={handleCancelEdit} variant="outline">
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="statistics" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                        {userData.averageRating}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Average Rating</p>
                      <div className="flex justify-center mt-2">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-yellow-400">★</span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                        {userData.responseRate}%
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Response Rate</p>
                      <Progress value={userData.responseRate} className="mt-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                        {userData.completedDeals}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Successful Deals</p>
                      <Badge className="mt-2" variant="secondary">
                        <Award className="h-3 w-3 mr-1" />
                        Top Performer
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-8">
              <Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center py-8">
                    <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                      Settings Coming Soon
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Account settings and preferences will be available in a future update.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Password Change Form */}
              <Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input
                        id="current-password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="bg-white/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="bg-white/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="bg-white/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50"
                      />
                    </div>
                  </div>
                  <Button
                    onClick={handlePasswordChange}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Update Password
                  </Button>
                </CardContent>
              </Card>

              {/* Notification Settings */}
              <Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center justify-between">
                      <span>Email Notifications</span>
                      <Switch
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={(value) => handleNotificationChange('emailNotifications', value)}
                        className="bg-gray-200 dark:bg-gray-700"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>SMS Notifications</span>
                      <Switch
                        checked={notificationSettings.smsNotifications}
                        onCheckedChange={(value) => handleNotificationChange('smsNotifications', value)}
                        className="bg-gray-200 dark:bg-gray-700"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Marketing Emails</span>
                      <Switch
                        checked={notificationSettings.marketingEmails}
                        onCheckedChange={(value) => handleNotificationChange('marketingEmails', value)}
                        className="bg-gray-200 dark:bg-gray-700"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Property Alerts</span>
                      <Switch
                        checked={notificationSettings.propertyAlerts}
                        onCheckedChange={(value) => handleNotificationChange('propertyAlerts', value)}
                        className="bg-gray-200 dark:bg-gray-700"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Hidden file input for profile picture upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleProfilePictureChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  )
}
