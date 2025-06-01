"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, ArrowLeft, Play } from "lucide-react"

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Building2 className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              PropertyPro Demo
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the power of PropertyPro with our interactive demo
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Play className="mr-2 h-5 w-5 text-blue-600" />
                Interactive Demo
              </CardTitle>
              <CardDescription>Try out PropertyPro's features with sample data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-blue-700">
                  <Link href="/login">Launch Demo Dashboard</Link>
                </Button>
                <p className="text-sm text-gray-500 text-center">Use demo@example.com / demo123 to login</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Demo Features</CardTitle>
              <CardDescription>What you'll experience in the demo</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="h-2 w-2 bg-blue-600 rounded-full mr-3" />
                  Property listing management
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 bg-green-600 rounded-full mr-3" />
                  Interactive dashboard
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 bg-purple-600 rounded-full mr-3" />
                  Client management tools
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 bg-orange-600 rounded-full mr-3" />
                  Analytics and reporting
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 bg-red-600 rounded-full mr-3" />
                  Calendar scheduling
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Ready to get started with your own account?</p>
          <Button asChild variant="outline" size="lg">
            <Link href="/login">Sign Up for Free</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
