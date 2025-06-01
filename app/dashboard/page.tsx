"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Building2,
  Users,
  Calendar,
  TrendingUp,
  MessageSquare,
  Bell,
  LogOut,
  Search,
  Home,
  Settings,
  Plus,
  ArrowUp,
  ArrowDown,
  Eye,
  Filter,
  Download,
  MoreVertical,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useAuth } from "../context/AuthContext"
import { cn } from "@/lib/utils"

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const { theme } = useTheme()
  const { user } = useAuth()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    router.push("/")
    setIsLoading(false)
  }

  if (!mounted) {
    return null // Prevent hydration mismatch
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex flex-col w-64 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-800/50 h-screen sticky top-0">
          <div className="flex items-center p-4 border-b border-gray-200/50 dark:border-gray-800/50">
            <div className="relative">
              <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              <div className="absolute -inset-1 bg-blue-600/20 dark:bg-blue-400/20 rounded-lg blur opacity-75" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-blue-400 dark:via-purple-400 dark:to-blue-300 bg-clip-text text-transparent">
              PropertyPro
            </span>
          </div>
          
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-2 space-y-1">
              <Link
                href="/dashboard"
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200",
                  "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 shadow-sm border border-blue-200/50 dark:border-blue-800/50"
                )}
              >
                <Home className="mr-3 h-5 w-5" />
                Dashboard
              </Link>
              <Link
                href="/properties"
                className="flex items-center px-3 py-2 text-sm font-medium rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200"
              >
                <Building2 className="mr-3 h-5 w-5" />
                Properties
              </Link>
              <Link
                href="/clients"
                className="flex items-center px-3 py-2 text-sm font-medium rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200"
              >
                <Users className="mr-3 h-5 w-5" />
                Clients
              </Link>
              <Link
                href="/calendar"
                className="flex items-center px-3 py-2 text-sm font-medium rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200"
              >
                <Calendar className="mr-3 h-5 w-5" />
                Calendar
              </Link>
              <Link
                href="/analytics"
                className="flex items-center px-3 py-2 text-sm font-medium rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200"
              >
                <TrendingUp className="mr-3 h-5 w-5" />
                Analytics
              </Link>
              <Link
                href="/messages"
                className="flex items-center px-3 py-2 text-sm font-medium rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200"
              >
                <MessageSquare className="mr-3 h-5 w-5" />
                Messages
              </Link>
              <Link
                href="/settings"
                className="flex items-center px-3 py-2 text-sm font-medium rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200"
              >
                <Settings className="mr-3 h-5 w-5" />
                Settings
              </Link>
            </nav>
          </div>
          
          <div className="p-4 border-t border-gray-200/50 dark:border-gray-800/50">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-xl transition-all duration-200"
              onClick={handleLogout}
              disabled={isLoading}
            >
              <LogOut className="mr-3 h-5 w-5" />
              {isLoading ? "Logging out..." : "Logout"}
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <header className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl shadow-sm border-b border-gray-200/50 dark:border-gray-800/50 sticky top-0 z-10">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="md:hidden flex items-center">
                <div className="relative">
                  <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
                  <div className="absolute -inset-1 bg-blue-600/20 dark:bg-blue-400/20 rounded-lg blur opacity-75" />
                </div>
                <span className="font-bold text-lg bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-blue-400 dark:via-purple-400 dark:to-blue-300 bg-clip-text text-transparent">
                  PropertyPro
                </span>
              </div>
              
              {/* Search Bar */}
              <div className="hidden md:flex items-center bg-gray-100/50 dark:bg-gray-800/50 rounded-xl px-3 py-2 flex-1 max-w-lg mx-4 border border-gray-200/50 dark:border-gray-700/50 focus-within:border-blue-500 dark:focus-within:border-blue-400 transition-all duration-200">
                <Search className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-2" />
                <Input
                  type="text"
                  placeholder="Search properties, clients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none focus:outline-none flex-1 text-sm placeholder:text-gray-500 dark:placeholder:text-gray-400"
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
                  <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 hover:bg-red-500 border-2 border-white dark:border-gray-950">
                    3
                  </Badge>
                </Button>
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-medium shadow-lg">
                  {user?.name?.charAt(0).toUpperCase() || 'JD'}
                </div>
              </div>
            </div>
          </header>

          {/* Main Dashboard Content */}
          <main className="p-6">
            {/* Welcome Hero Section */}
            <div className="relative mb-12 p-8 rounded-3xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-green-600/5 dark:from-blue-400/5 dark:via-purple-400/5 dark:to-green-400/5" />
              <div className="relative">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
                  <div className="mb-6 lg:mb-0">
                    <div className="flex items-center mb-4">
                      <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center font-bold text-lg shadow-lg mr-4">
                        {user?.name?.charAt(0).toUpperCase() || 'JD'}
                      </div>
                      <div>
                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100">
                          Welcome back, {user?.name || 'John Doe'}! 👋
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                          Here's what's happening with your properties today.
                        </p>
                      </div>
                    </div>
                    
                    {/* Quick Stats */}
                    <div className="flex flex-wrap gap-6 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        <span className="text-gray-600 dark:text-gray-400">24 Active Listings</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 rounded-full bg-blue-500" />
                        <span className="text-gray-600 dark:text-gray-400">3 Pending Viewings</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 rounded-full bg-purple-500" />
                        <span className="text-gray-600 dark:text-gray-400">89% Occupancy Rate</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3">
                    <Button variant="outline" size="sm" className="rounded-xl border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 backdrop-blur-sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-xl border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 backdrop-blur-sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button size="sm" className="rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 hover:from-blue-700 hover:via-purple-700 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Property
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="border-0 shadow-lg shadow-gray-900/5 dark:shadow-gray-900/20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 hover:shadow-xl hover:shadow-gray-900/10 dark:hover:shadow-gray-900/30 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Listings</p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">24</p>
                    </div>
                    <div className="h-12 w-12 bg-blue-100 dark:bg-blue-950/50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <div className="flex items-center text-green-600 dark:text-green-400">
                      <ArrowUp className="h-4 w-4 mr-1" />
                      <span className="font-medium">12%</span>
                    </div>
                    <span className="text-gray-500 dark:text-gray-400 ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg shadow-gray-900/5 dark:shadow-gray-900/20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 hover:shadow-xl hover:shadow-gray-900/10 dark:hover:shadow-gray-900/30 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Clients</p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">36</p>
                    </div>
                    <div className="h-12 w-12 bg-green-100 dark:bg-green-950/50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <div className="flex items-center text-green-600 dark:text-green-400">
                      <ArrowUp className="h-4 w-4 mr-1" />
                      <span className="font-medium">8%</span>
                    </div>
                    <span className="text-gray-500 dark:text-gray-400 ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg shadow-gray-900/5 dark:shadow-gray-900/20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 hover:shadow-xl hover:shadow-gray-900/10 dark:hover:shadow-gray-900/30 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Upcoming Viewings</p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">12</p>
                    </div>
                    <div className="h-12 w-12 bg-purple-100 dark:bg-purple-950/50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <div className="flex items-center text-green-600 dark:text-green-400">
                      <ArrowUp className="h-4 w-4 mr-1" />
                      <span className="font-medium">24%</span>
                    </div>
                    <span className="text-gray-500 dark:text-gray-400 ml-1">from last week</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg shadow-gray-900/5 dark:shadow-gray-900/20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 hover:shadow-xl hover:shadow-gray-900/10 dark:hover:shadow-gray-900/30 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">New Messages</p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">8</p>
                    </div>
                    <div className="h-12 w-12 bg-orange-100 dark:bg-orange-950/50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <MessageSquare className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-gray-500 dark:text-gray-400">4 unread messages</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="border-0 shadow-lg shadow-gray-900/5 dark:shadow-gray-900/20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 mb-8">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-gray-900 dark:text-gray-100">Recent Activity</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">Your latest actions and updates</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-xl border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <Eye className="h-4 w-4 mr-2" />
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start group">
                    <div className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200">
                      <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 dark:text-gray-100">New property listed</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">You added a new property: Modern Apartment in Downtown</p>
                      <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>2 hours ago</span>
                        <span className="mx-2">•</span>
                        <span className="text-blue-600 dark:text-blue-400">Property Management</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-start group">
                    <div className="h-10 w-10 rounded-xl bg-green-100 dark:bg-green-950/50 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200">
                      <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 dark:text-gray-100">New client registered</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Sarah Johnson registered as a new client</p>
                      <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>5 hours ago</span>
                        <span className="mx-2">•</span>
                        <span className="text-green-600 dark:text-green-400">Client Management</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-start group">
                    <div className="h-10 w-10 rounded-xl bg-purple-100 dark:bg-purple-950/50 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200">
                      <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 dark:text-gray-100">Viewing scheduled</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Property viewing with Alex Thompson tomorrow at 3:00 PM</p>
                      <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>1 day ago</span>
                        <span className="mx-2">•</span>
                        <span className="text-purple-600 dark:text-purple-400">Calendar</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Quick Actions */}
              <Card className="border-0 shadow-lg shadow-gray-900/5 dark:shadow-gray-900/20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50">
                <CardHeader className="pb-4">
                  <CardTitle className="text-gray-900 dark:text-gray-100 flex items-center">
                    <Plus className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200" asChild>
                    <Link href="/listings/new">
                      <Building2 className="h-4 w-4 mr-2" />
                      Add New Property
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full rounded-xl border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200" asChild>
                    <Link href="/clients/new">
                      <Users className="h-4 w-4 mr-2" />
                      Add New Client
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full rounded-xl border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200" asChild>
                    <Link href="/calendar/new">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Viewing
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full rounded-xl border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200" asChild>
                    <Link href="/analytics">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      View Analytics
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Upcoming Viewings */}
              <Card className="lg:col-span-2 border-0 shadow-lg shadow-gray-900/5 dark:shadow-gray-900/20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-gray-900 dark:text-gray-100 flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-400" />
                      Upcoming Viewings
                    </CardTitle>
                    <Button variant="outline" size="sm" className="rounded-xl border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                      View Calendar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-all duration-200 group">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                          <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-gray-100">Modern Apartment</p>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">Client: John Smith</p>
                          <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>Today, 2:00 PM</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800">
                          Confirmed
                        </Badge>
                        <Button variant="link" size="sm" className="p-0 h-auto text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                          View details
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-all duration-200 group">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-xl bg-purple-100 dark:bg-purple-950/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                          <Building2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-gray-100">Luxury Villa</p>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">Client: David Miller</p>
                          <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>Tomorrow, 10:00 AM</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="bg-yellow-100 dark:bg-yellow-950/50 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800">
                          Pending
                        </Badge>
                        <Button variant="link" size="sm" className="p-0 h-auto text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                          View details
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-all duration-200 group">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-xl bg-green-100 dark:bg-green-950/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                          <Building2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-gray-100">Cozy Studio</p>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">Client: Emma Wilson</p>
                          <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>Wednesday, 3:30 PM</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                          Scheduled
                        </Badge>
                        <Button variant="link" size="sm" className="p-0 h-auto text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                          View details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
