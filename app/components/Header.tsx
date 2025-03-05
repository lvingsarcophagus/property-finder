import Link from "next/link"
import { UserCircle, Home, List, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border/40">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Home className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-primary">PropertyFinder</span>
          </Link>
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link href="/" className="text-foreground/60 hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/listings" className="text-foreground/60 hover:text-primary transition-colors">
              Listings
            </Link>
            <Link href="/dashboard" className="text-foreground/60 hover:text-primary transition-colors">
              Dashboard
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-foreground/60 hover:text-primary" asChild>
              <Link href="/login">
                <UserCircle className="w-5 h-5 mr-2" />
                Login
              </Link>
            </Button>
            <Button variant="default" size="sm" asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
        <div className="md:hidden flex justify-around py-2 border-t border-border/40">
          <Link href="/" className="text-foreground/60 hover:text-primary transition-colors flex flex-col items-center">
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link
            href="/listings"
            className="text-foreground/60 hover:text-primary transition-colors flex flex-col items-center"
          >
            <List className="h-5 w-5" />
            <span className="text-xs mt-1">Listings</span>
          </Link>
          <Link
            href="/dashboard"
            className="text-foreground/60 hover:text-primary transition-colors flex flex-col items-center"
          >
            <LayoutDashboard className="h-5 w-5" />
            <span className="text-xs mt-1">Dashboard</span>
          </Link>
        </div>
      </nav>
    </header>
  )
}

