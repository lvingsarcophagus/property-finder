"use client"

import { useState, useEffect } from "react"
import { Check, Crown, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "../context/AuthContext"

export default function SubscriptionPage() {
  const { isAuthenticated, isLoading, profile } = useAuth()
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      window.location.href = "/login"
    }
  }, [isAuthenticated, isLoading])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const plans = [
    {
      name: "Individual Broker",
      description: "Perfect for independent real estate professionals",
      monthlyPrice: 29,
      yearlyPrice: 290,
      features: [
        "Up to 50 property listings",
        "Basic analytics dashboard",
        "Email support",
        "Mobile app access",
        "Lead management",
        "Calendar scheduling",
        "Photo uploads (up to 20 per listing)",
        "Basic SEO optimization",
      ],
      popular: false,
      icon: Crown,
    },
    {
      name: "Enterprise Agency",
      description: "Designed for real estate agencies and teams",
      monthlyPrice: 99,
      yearlyPrice: 990,
      features: [
        "Unlimited property listings",
        "Advanced analytics & reporting",
        "Priority support",
        "Multi-user accounts (up to 10 brokers)",
        "Advanced lead management",
        "Team calendar & scheduling",
        "Unlimited photo uploads",
        "Advanced SEO optimization",
        "Custom branding",
        "API access",
        "White-label options",
        "Dedicated account manager",
      ],
      popular: true,
      icon: Building2,
    },
  ]

  const getPrice = (plan: (typeof plans)[0]) => {
    return billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice
  }

  const getSavings = (plan: (typeof plans)[0]) => {
    const monthlyTotal = plan.monthlyPrice * 12
    const yearlyPrice = plan.yearlyPrice
    const savings = monthlyTotal - yearlyPrice
    const percentage = Math.round((savings / monthlyTotal) * 100)
    return { amount: savings, percentage }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">Choose Your Plan</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
            Scale your real estate business with the right tools
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white dark:bg-slate-800 rounded-lg p-1 shadow-sm border">
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                billingCycle === "monthly"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                billingCycle === "yearly"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
              onClick={() => setBillingCycle("yearly")}
            >
              Yearly
              <Badge variant="secondary" className="ml-2">
                Save 17%
              </Badge>
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => {
            const savings = getSavings(plan)
            return (
              <Card
                key={plan.name}
                className={`relative transition-all duration-300 hover:shadow-xl ${
                  plan.popular ? "ring-2 ring-primary shadow-lg scale-105" : "hover:shadow-lg hover:-translate-y-1"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">Most Popular</Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <plan.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="text-base">{plan.description}</CardDescription>

                  <div className="mt-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-slate-900 dark:text-slate-100">€{getPrice(plan)}</span>
                      <span className="text-slate-500 ml-2">/{billingCycle === "monthly" ? "month" : "year"}</span>
                    </div>
                    {billingCycle === "yearly" && (
                      <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                        Save €{savings.amount} ({savings.percentage}%) annually
                      </p>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-600 dark:text-slate-400">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-primary hover:bg-primary/90"
                        : "bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900"
                    }`}
                    size="lg"
                  >
                    {profile?.broker_type === "individual" && plan.name === "Individual Broker"
                      ? "Current Plan"
                      : profile?.broker_type === "company" && plan.name === "Enterprise Agency"
                        ? "Current Plan"
                        : "Get Started"}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-slate-100 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I change my plan anytime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">
                  Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next
                  billing cycle.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What payment methods do you accept?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">
                  We accept all major credit cards, PayPal, and bank transfers for annual subscriptions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is there a free trial?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">
                  Yes, we offer a 14-day free trial for all new users. No credit card required to start.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
