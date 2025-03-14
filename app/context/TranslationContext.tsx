"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type Language = "en" | "lt"

type TranslationsType = {
  [key: string]: string
}

export type TranslationKey = string

interface Translations {
  [key: string]: TranslationsType
}

// Complete translations dictionary
export const translations: Translations = {
  en: {
    // Navigation
    "home": "Home",
    "listings": "Listings",
    "dashboard": "Dashboard",
    "login": "Login",
    "signup": "Sign Up",
    "logout": "Logout",
    
    // Property listings
    "propertyListings": "Property Listings",
    "searchProperties": "Search Properties",
    "featuredProperties": "Featured Properties",
    "viewDetails": "View Details",
    "location": "Location",
    "category": "Category",
    "propertyType": "Property Type",
    "rent": "Rent",
    "sale": "Sale",
    "house": "House",
    "apartment": "Apartment",
    "commercial": "Commercial",
    "beds": "beds",
    "baths": "baths",
    "sqrm": "m²",
    
    // Property filters
    "minPrice": "Minimum Price",
    "maxPrice": "Maximum Price",
    "search": "Search",
    "filter": "Filter",
    "filterByType": "Filter by property type",
    "allTypes": "All Types",
    
    // User Dashboard
    "myListings": "My Listings",
    "favorites": "Favorites",
    "addNewListing": "Add New Listing",
    "calendar": "Calendar",
    "notifications": "Notifications",
    "totalListings": "Total Listings",
    "approvedListings": "Approved Listings",
    "pendingListings": "Pending Listings",
    "welcome": "Welcome back",
    "edit": "Edit",
    "delete": "Delete",
    "save": "Save",
    "cancel": "Cancel",
    
    // Footer
    "quickLinks": "Quick Links",
    "contact": "Contact",
    "followUs": "Follow Us",
    "allRightsReserved": "All rights reserved",

    // Property details page
    "map": "Map",
    "streetView": "Street View",
    "streetViewNotAvailable": "Street view not available for this property",
    "features": "Features & Amenities",
    "description": "Description",
    "realEstateAgent": "Real Estate Agent",
    "contactAgent": "Contact Agent",
    "downloadBrochure": "Download Brochure",
    "propertyDetails": "Property Details",
    "yearBuilt": "Year Built",
    "size": "Size",
    "parking": "Parking",
    "spots": "Spots",
    "share": "Share",
    "save": "Save",
    
    // Homepage
    "findYourDreamProperty": "Find Your Dream Property",
    "searchPropertyTagline": "Search thousands of properties for sale and for rent across the country",
    "enterLocation": "Enter location",
    "selectType": "Select type",
    "selectCategory": "Select category",
    "all": "All",
    "downtown": "Downtown",
    "priceRange": "Price Range",
    "exploreProperties": "Explore Properties on Map",
    "explorePropertiesTagline": "Discover properties in your preferred locations with our interactive map",
    "readyToFind": "Ready to Find Your Perfect Property?",
    "readyToFindTagline": "Start your journey to finding your dream property today",
    "browseProperties": "Browse Properties",
    "contactUs": "Contact Us",
  },
  lt: {
    // Navigation
    "home": "Pagrindinis",
    "listings": "Skelbimai",
    "dashboard": "Valdymo Skydelis",
    "login": "Prisijungti",
    "signup": "Registruotis",
    "logout": "Atsijungti",
    
    // Property listings
    "propertyListings": "Nekilnojamojo Turto Skelbimai",
    "searchProperties": "Ieškoti Nekilnojamojo Turto",
    "featuredProperties": "Išskirtiniai Pasiūlymai",
    "viewDetails": "Žiūrėti Detaliau",
    "location": "Vieta",
    "category": "Kategorija",
    "propertyType": "Turto Tipas",
    "rent": "Nuoma",
    "sale": "Pardavimas",
    "house": "Namas",
    "apartment": "Butas",
    "commercial": "Komercinis",
    "beds": "mieg.",
    "baths": "vonios",
    "sqrm": "m²",
    
    // Property filters
    "minPrice": "Minimali Kaina",
    "maxPrice": "Maksimali Kaina",
    "search": "Ieškoti",
    "filter": "Filtruoti",
    "filterByType": "Filtruoti pagal turto tipą",
    "allTypes": "Visi Tipai",
    
    // User Dashboard
    "myListings": "Mano Skelbimai",
    "favorites": "Mėgstami",
    "addNewListing": "Pridėti Naują Skelbimą",
    "calendar": "Kalendorius",
    "notifications": "Pranešimai",
    "totalListings": "Iš Viso Skelbimų",
    "approvedListings": "Patvirtinti Skelbimai",
    "pendingListings": "Laukiantys Skelbimai",
    "welcome": "Sveiki sugrįžę",
    "edit": "Redaguoti",
    "delete": "Ištrinti",
    "save": "Išsaugoti",
    "cancel": "Atšaukti",
    
    // Footer
    "quickLinks": "Greitos Nuorodos",
    "contact": "Kontaktai",
    "followUs": "Sekite Mus",
    "allRightsReserved": "Visos teisės saugomos",

    // Property details page
    "map": "Žemėlapis",
    "streetView": "Gatvės vaizdas",
    "streetViewNotAvailable": "Gatvės vaizdas šiam objektui nepasiekiamas",
    "features": "Ypatybės ir patogumai",
    "description": "Aprašymas",
    "realEstateAgent": "Nekilnojamojo turto agentas",
    "contactAgent": "Susisiekti su agentu",
    "downloadBrochure": "Atsisiųsti brošiūrą",
    "propertyDetails": "Turto informacija",
    "yearBuilt": "Statybos metai",
    "size": "Dydis",
    "parking": "Automobilių stovėjimo vietos",
    "spots": "Vietos",
    "share": "Dalintis",
    "save": "Išsaugoti",
    
    // Homepage
    "findYourDreamProperty": "Raskite savo svajonių būstą",
    "searchPropertyTagline": "Ieškokite tūkstančių parduodamų ir nuomojamų nekilnojamojo turto objektų visoje šalyje",
    "enterLocation": "Įveskite vietą",
    "selectType": "Pasirinkite tipą",
    "selectCategory": "Pasirinkite kategoriją",
    "all": "Visi",
    "downtown": "Miesto centras",
    "priceRange": "Kainų diapazonas",
    "exploreProperties": "Tyrinėkite nekilnojamąjį turtą žemėlapyje",
    "explorePropertiesTagline": "Atraskite nekilnojamąjį turtą jūsų pasirinktose vietose su mūsų interaktyviu žemėlapiu",
    "readyToFind": "Pasiruošę rasti savo tobulą nekilnojamąjį turtą?",
    "readyToFindTagline": "Pradėkite kelionę į savo svajonių būstą jau šiandien",
    "browseProperties": "Naršyti objektus",
    "contactUs": "Susisiekite su mumis",
  },
}

type TranslationContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: TranslationKey) => string
}

const TranslationContext = createContext<TranslationContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
})

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  // Only run on client side
  useEffect(() => {
    setMounted(true)
    const savedLanguage = localStorage.getItem("preferredLanguage") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "lt")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage when it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("preferredLanguage", language)
      document.documentElement.lang = language
    }
  }, [language, mounted])

  // Translation function
  const t = (key: TranslationKey): string => {
    if (!translations[language]) return key
    return translations[language][key] || key
  }

  return <TranslationContext.Provider value={{ language, setLanguage, t }}>{children}</TranslationContext.Provider>
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  return context
}

