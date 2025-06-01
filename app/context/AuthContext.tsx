"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface Profile {
  id: string
  name: string
  email: string
  avatar_url?: string
  phone?: string
  role: string
  broker_type: "individual" | "company"
  company_name?: string
  company_id?: string
  license_number?: string
  bio?: string
}

interface AuthContextType {
  isAuthenticated: boolean
  user: any | null
  profile: Profile | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  updateProfile: (data: Partial<Profile>) => Promise<{ success: boolean; error?: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo users database
const DEMO_USERS = [
  {
    email: "demo@example.com",
    password: "demo123",
    profile: {
      id: "demo-user-123",
      name: "Demo User",
      email: "demo@example.com",
      role: "user",
      broker_type: "individual" as const,
      avatar_url: "/placeholder.svg?height=40&width=40",
      bio: "Real estate professional with 5+ years of experience",
    },
  },
  {
    email: "admin@example.com",
    password: "admin123",
    profile: {
      id: "admin-user-456",
      name: "Admin User",
      email: "admin@example.com",
      role: "admin",
      broker_type: "company" as const,
      company_name: "PropertyPro Real Estate",
      avatar_url: "/placeholder.svg?height=40&width=40",
      bio: "Platform administrator",
    },
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const checkExistingSession = () => {
      try {
        const savedUser = localStorage.getItem("propertyPro_user")
        const savedProfile = localStorage.getItem("propertyPro_profile")
        const sessionExpiry = localStorage.getItem("propertyPro_session_expiry")

        if (savedUser && savedProfile && sessionExpiry) {
          const expiryTime = Number.parseInt(sessionExpiry)
          const currentTime = Date.now()

          // Check if session is still valid (24 hours)
          if (currentTime < expiryTime) {
            const userData = JSON.parse(savedUser)
            const profileData = JSON.parse(savedProfile)

            setUser(userData)
            setProfile(profileData)
            setIsAuthenticated(true)
            console.log("Restored existing session for:", userData.email)
          } else {
            // Session expired, clear storage
            clearSession()
            console.log("Session expired, cleared storage")
          }
        }
      } catch (error) {
        console.error("Error checking existing session:", error)
        clearSession()
      } finally {
        setIsLoading(false)
      }
    }

    // Small delay to prevent flash
    setTimeout(checkExistingSession, 100)
  }, [])

  const clearSession = () => {
    localStorage.removeItem("propertyPro_user")
    localStorage.removeItem("propertyPro_profile")
    localStorage.removeItem("propertyPro_session_expiry")
    setUser(null)
    setProfile(null)
    setIsAuthenticated(false)
  }

  const saveSession = (userData: any, profileData: Profile) => {
    try {
      // Set session to expire in 24 hours
      const expiryTime = Date.now() + 24 * 60 * 60 * 1000

      localStorage.setItem("propertyPro_user", JSON.stringify(userData))
      localStorage.setItem("propertyPro_profile", JSON.stringify(profileData))
      localStorage.setItem("propertyPro_session_expiry", expiryTime.toString())

      setUser(userData)
      setProfile(profileData)
      setIsAuthenticated(true)

      console.log("Session saved for:", userData.email)
    } catch (error) {
      console.error("Error saving session:", error)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      console.log("Attempting login for:", email)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Find user in demo database
      const demoUser = DEMO_USERS.find(
        (user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password,
      )

      if (demoUser) {
        const userData = {
          id: demoUser.profile.id,
          email: demoUser.email,
          user_metadata: {
            full_name: demoUser.profile.name,
          },
        }

        saveSession(userData, demoUser.profile)
        console.log("Login successful for:", email)
        return { success: true }
      } else {
        console.log("Login failed - invalid credentials for:", email)
        return { success: false, error: "Invalid email or password" }
      }
    } catch (error: any) {
      console.error("Login error:", error)
      return { success: false, error: error.message || "Login failed" }
    }
  }

  const loginWithGoogle = async () => {
    try {
      console.log("Attempting Google login")

      // Simulate Google OAuth delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Use the demo user for Google login simulation
      const googleUser = DEMO_USERS[0] // Use first demo user
      const userData = {
        id: googleUser.profile.id,
        email: googleUser.email,
        user_metadata: {
          full_name: googleUser.profile.name,
        },
      }

      saveSession(userData, googleUser.profile)
      console.log("Google login successful")
      return { success: true }
    } catch (error: any) {
      console.error("Google login error:", error)
      return { success: false, error: error.message || "Google login failed" }
    }
  }

  const logout = async () => {
    try {
      console.log("Logging out user:", user?.email)
      clearSession()

      // Force redirect to login page
      window.location.href = "/login"
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const updateProfile = async (data: Partial<Profile>) => {
    if (!user || !profile) return { success: false, error: "Not authenticated" }

    try {
      console.log("Updating profile for:", user.email)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      const updatedProfile = { ...profile, ...data }

      // Update localStorage
      localStorage.setItem("propertyPro_profile", JSON.stringify(updatedProfile))
      setProfile(updatedProfile)

      console.log("Profile updated successfully")
      return { success: true }
    } catch (error: any) {
      console.error("Update profile error:", error)
      return { success: false, error: error.message || "Profile update failed" }
    }
  }

  const contextValue = {
    user,
    profile,
    isAuthenticated,
    isLoading,
    login,
    loginWithGoogle,
    logout,
    updateProfile,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
