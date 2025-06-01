"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import {
  Building2,
  Menu,
  X,
  User,
  Settings,
  LogOut,
  Bell,
  Search,
  Sun,
  Moon,
  Monitor,
  Globe,
  ChevronDown,
  Zap,
  BarChart3,
  Users,
  Calendar,
  MessageSquare,
  Home,
  Plus,
  HelpCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "next-themes"
import { useTranslation } from "../context/TranslationContext"
import { useAuth } from "../context/AuthContext"
import { cn } from "@/lib/utils"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useTranslation()
  const { isAuthenticated, user, logout } = useAuth()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigation = [
    {
      name: t("dashboard"),
      href: "/dashboard",
      icon: BarChart3,
      description: "Overview & Analytics",
    },
    {
      name: t("properties"),
      href: "/properties",
      icon: Building2,
      description: "Manage Listings",
    },
    {
      name: t("clients"),
      href: "/clients",
      icon: Users,
      description: "Client Management",
    },
    {
      name: t("calendar"),
      href: "/calendar",
      icon: Calendar,
      description: "Schedule & Events",
    },
    {
      name: t("messages"),
      href: "/messages",
      icon: MessageSquare,
      description: "Communications",
    },
  ]

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "lt", name: "Lietuvių", flag: "🇱🇹" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
  ]

  const handleLogout = async () => {
    setIsLoggingOut(true)
    // Simulate logout
    setTimeout(() => {
      window.location.href = "/login"
    }, 1000)
  }

  if (!mounted) {
    return null // Prevent hydration mismatch
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-500 ease-out",
        isScrolled
          ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 shadow-lg shadow-gray-900/5"
          : "bg-white/60 dark:bg-gray-950/60 backdrop-blur-md",
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Building2 className="h-9 w-9 text-blue-600 dark:text-blue-400 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" />
              <div className="absolute -inset-1 bg-blue-600/20 dark:bg-blue-400/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-blue-400 dark:via-purple-400 dark:to-blue-300 bg-clip-text text-transparent">
                PropertyPro
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Real Estate Platform</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          {isAuthenticated && (
            <nav className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                      pathname === item.href
                        ? "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 shadow-sm"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-100",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                    {pathname === item.href && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full" />
                    )}
                  </Link>
                )
              })}
            </nav>
          )}

          {/* Search Bar */}
          {isAuthenticated && (
            <div className="hidden xl:flex items-center space-x-4 flex-1 max-w-md mx-8">
              <div className="relative w-full group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <Input
                  placeholder={t("searchProperties")}
                  className="pl-10 bg-gray-50/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50 focus:bg-white dark:focus:bg-gray-800 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200"
                />
              </div>
            </div>
          )}

          {/* Right Side */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl">
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="mr-2 h-4 w-4" />
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="mr-2 h-4 w-4" />
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <Monitor className="mr-2 h-4 w-4" />
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Language Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl">
                  <Globe className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as any)}
                    className={cn(
                      "flex items-center space-x-2",
                      language === lang.code && "bg-blue-50 dark:bg-blue-950/50",
                    )}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span>{lang.name}</span>
                    {language === lang.code && (
                      <div className="ml-auto w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-xl">
                  <Bell className="h-4 w-4" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 hover:bg-red-500">
                    3
                  </Badge>
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-3 px-3 h-10 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200">
                      <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-green-500 flex items-center justify-center shadow-lg ring-2 ring-white dark:ring-gray-900">
                        <span className="text-white font-semibold text-sm">{user?.name?.charAt(0).toUpperCase() || 'U'}</span>
                      </div>
                      <div className="hidden md:block text-left">
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{user?.name || 'User'}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{user?.role || 'Member'}</p>
                      </div>
                      <ChevronDown className="h-3 w-3 text-gray-400 transition-transform duration-200" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-72 p-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl rounded-2xl">
                    {/* User Info Header */}
                    <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 rounded-xl mb-2">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-green-500 flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-lg">{user?.name?.charAt(0).toUpperCase() || 'U'}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 dark:text-gray-100 truncate">{user?.name || 'User Name'}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{user?.email || 'user@example.com'}</p>
                        <div className="flex items-center mt-1">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">Online</span>
                        </div>
                      </div>
                    </div>
                    
                    <DropdownMenuSeparator className="my-2" />
                    
                    {/* Profile Actions */}
                    <div className="space-y-1">
                      <DropdownMenuItem asChild>
                        <Link href="/profile" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-all duration-200 group">
                          <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-gray-100">View Profile</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Manage your profile information</p>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                      
                      <DropdownMenuItem asChild>
                        <Link href="/profile?edit=true" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-green-50 dark:hover:bg-green-950/50 transition-all duration-200 group">
                          <div className="h-8 w-8 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Settings className="h-4 w-4 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-gray-100">Edit Profile</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Update your personal details</p>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                      
                      <DropdownMenuItem asChild>
                        <Link href="/settings" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-950/50 transition-all duration-200 group">
                          <div className="h-8 w-8 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Settings className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-gray-100">Account Settings</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Privacy & security settings</p>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                      
                      <DropdownMenuItem asChild>
                        <Link href="/subscriptions" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-yellow-50 dark:hover:bg-yellow-950/50 transition-all duration-200 group">
                          <div className="h-8 w-8 rounded-lg bg-yellow-100 dark:bg-yellow-900/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Zap className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-gray-100">Subscription</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Manage your plan & billing</p>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                    </div>
                    
                    <DropdownMenuSeparator className="my-2" />
                    
                    {/* Logout */}
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="flex items-center space-x-3 p-3 rounded-xl text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 transition-all duration-200 group"
                      disabled={isLoggingOut}
                    >
                      <div className="h-8 w-8 rounded-lg bg-red-100 dark:bg-red-900/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <LogOut className="h-4 w-4 text-red-600 dark:text-red-400" />
                      </div>
                      <div>
                        <p className="font-medium">{isLoggingOut ? "Logging out..." : "Sign Out"}</p>
                        <p className="text-xs text-red-500/70 dark:text-red-400/70">Exit your account securely</p>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild className="rounded-xl">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button
                  asChild
                  className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Link href="/signup">Get Started</Link>
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-9 w-9 rounded-xl"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && isAuthenticated && (
          <div className="lg:hidden py-4 space-y-2 border-t border-gray-200/50 dark:border-gray-800/50 backdrop-blur-xl">
            {/* Mobile Search */}
            <div className="px-3 pb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder={t("searchProperties")}
                  className="pl-10 bg-gray-50/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50"
                />
              </div>
            </div>

            {/* Mobile Navigation Items */}
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-3 mx-3 rounded-xl text-sm font-medium transition-all duration-200",
                    pathname === item.href
                      ? "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50",
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <div>
                    <div>{item.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{item.description}</div>
                  </div>
                </Link>
              )
            })}

            <div className="pt-3 mt-3 border-t border-gray-200/50 dark:border-gray-800/50">
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="w-full justify-start text-red-600 dark:text-red-400 px-3 rounded-xl"
                disabled={isLoggingOut}
              >
                <LogOut className="mr-3 h-5 w-5" />
                {isLoggingOut ? "Logging out..." : "Logout"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
