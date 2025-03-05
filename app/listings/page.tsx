import { Metadata } from 'next'
import ListingGrid from '../components/ListingGrid'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: 'Property Listings | PropertyFinder',
  description: 'Browse our available properties',
}

export default function ListingsPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Property Listings</h1>
      <div className="flex gap-4 mb-8">
        <Input placeholder="Search properties..." className="flex-grow" />
        <Button>Search</Button>
      </div>
      <ListingGrid />
    </div>
  )
}

