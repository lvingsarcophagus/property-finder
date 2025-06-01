"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Check, CreditCard, BanknoteIcon, ArrowRight, CheckCircle, TrendingUp, Award, Eye, Building2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useTranslation } from "../context/TranslationContext"
import { useAuth } from "../context/AuthContext"
import { toast } from "@/components/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { getBrowserClient } from "@/lib/supabase"

interface SubscriptionPlan {
  id: string
  name: string
  description: string
  price: number
  currency: string
  duration_days: number
  features: string[]
  is_active: boolean
}

interface UserSubscription {
  id: string
  plan_id: string
  start_date: string
  end_date: string
  is_active: boolean
  payment_status: string
}

export default function SubscriptionsPage() {
  const { t } = useTranslation()
  const { isAuthenticated, user, loading } = useAuth()
  const router = useRouter()
  const [billingCycle, setBillingCycle] = useState<"month" | "year">("month")
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal" | "bank">("card")
  const [plans, setPlans] = useState<SubscriptionPlan[]>([])
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [userSubscription, setUserSubscription] = useState<UserSubscription | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = getBrowserClient()

  // Fetch subscription plans and user's current subscription
  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated || !user) return

      try {
        // Fetch subscription plans
        const { data: plansData, error: plansError } = await supabase
          .from("subscription_plans")
          .select("*")
          .eq("is_active", true)
          .order("price", { ascending: true })

        if (plansError) {
          console.error("Error fetching plans:", plansError)
          return
        }

        setPlans(plansData || [])

        // Fetch user's current subscription
        const { data: subscriptionData, error: subscriptionError } = await supabase
          .from("user_subscriptions")
          .select("*")
          .eq("user_id", user.id)
          .eq("is_active", true)
          .order("created_at", { ascending: false })
          .limit(1)
          .single()

        if (subscriptionError && subscriptionError.code !== "PGRST116") {
          console.error("Error fetching subscription:", subscriptionError)
        } else if (subscriptionData) {
          setUserSubscription(subscriptionData)
          setSelectedPlan(subscriptionData.plan_id)
        }
      } catch (error) {
        console.error("Error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (!loading) {
      fetchData()
    }
  }, [isAuthenticated, user, loading])

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login?redirect=/subscriptions")
    }
  }, [isAuthenticated, router, loading])

  const handleSubscribe = async () => {
    if (!selectedPlan || !user) {
      toast({
        title: "Error",
        description: "Please select a plan",
        variant: "destructive",
      })
      return
    }

    try {
      // In a real app, you would integrate with a payment provider here
      // For demo purposes, we'll just create a subscription record

      // Calculate end date based on plan duration
      const selectedPlanData = plans.find((plan) => plan.id === selectedPlan)
      if (!selectedPlanData) {
        throw new Error("Selected plan not found")
      }

      const startDate = new Date()
      const endDate = new Date(startDate)
      endDate.setDate(endDate.getDate() + selectedPlanData.duration_days)

      // If user already has an active subscription, deactivate it
      if (userSubscription) {
        await supabase.from("user_subscriptions").update({ is_active: false }).eq("id", userSubscription.id)
      }

      // Create new subscription
      const { data, error } = await supabase
        .from("user_subscriptions")
        .insert([
          {
            user_id: user.id,
            plan_id: selectedPlan,
            start_date: startDate.toISOString(),
            end_date: endDate.toISOString(),
            is_active: true,
            payment_status: "completed",
          },
        ])
        .select()

      if (error) {
        throw error
      }

      setUserSubscription(data[0])

      toast({
        title: "Subscription successful",
        description: "Your subscription has been activated",
      })
    } catch (error) {
      console.error("Error subscribing:", error)
      toast({
        title: "Subscription failed",
        description: "There was an error processing your subscription",
        variant: "destructive",
      })
    }
  }

  const handleCancelSubscription = async () => {
    if (!userSubscription || !user) return

    try {
      const { error } = await supabase
        .from("user_subscriptions")
        .update({ is_active: false })
        .eq("id", userSubscription.id)

      if (error) {
        throw error
      }

      setUserSubscription(null)

      toast({
        title: "Subscription cancelled",
        description: "Your subscription has been cancelled",
      })
    } catch (error) {
      console.error("Error cancelling subscription:", error)
      toast({
        title: "Error",
        description: "There was an error cancelling your subscription",
        variant: "destructive",
      })
    }
  }

  if (loading || isLoading) {
    return <div className="container mx-auto px-6 py-12 text-center">Loading...</div>
  }

  if (!isAuthenticated) {
    return null // Will redirect in useEffect
  }

  // Mock subscription plans if none are found in the database
  const displayPlans =
    plans.length > 0
      ? plans
      : [
          {
            id: "basic",
            name: "Basic",
            description: "Perfect for individuals",
            price: 0,
            currency: "EUR",
            duration_days: 30,
            features: ["Up to 3 listings", "Basic analytics", "Email support"],
            is_active: true,
          },
          {
            id: "premium",
            name: "Premium",
            description: "Great for professionals",
            price: billingCycle === "month" ? 29.99 : 299.99,
            currency: "EUR",
            duration_days: billingCycle === "month" ? 30 : 365,
            features: ["Up to 10 listings", "Advanced analytics", "Priority support", "Featured listings"],
            is_active: true,
          },
          {
            id: "professional",
            name: "Professional",
            description: "For real estate agencies",
            price: billingCycle === "month" ? 99.99 : 999.99,
            currency: "EUR",
            duration_days: billingCycle === "month" ? 30 : 365,
            features: [
              "Unlimited listings",
              "Advanced analytics",
              "Priority support",
              "Featured listings",
              "API access",
            ],
            is_active: true,
          },
        ]

  // Find current plan if user has a subscription
  const currentPlan = userSubscription ? displayPlans.find((plan) => plan.id === userSubscription.plan_id) : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950">
      <Toaster />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-blue-800 dark:via-purple-800 dark:to-blue-900">
        <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />
        <div className="relative container mx-auto px-6 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">{t("subscriptions")}</h1>
            <p className="text-xl text-white/80 mb-8">Choose the perfect plan to elevate your property business</p>
            
            {userSubscription && currentPlan && (
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white">
                <CheckCircle className="h-5 w-5 mr-2" />
                Currently on {currentPlan.name} plan
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <Tabs defaultValue={userSubscription ? "current" : "plans"} className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 mb-12">
            <TabsTrigger value="plans" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
              {t("choosePlan")}
            </TabsTrigger>
            <TabsTrigger value="current" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
              {t("mySubscription")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="plans" className="space-y-8">
            {/* Billing Toggle */}
            <div className="flex justify-center">
              <div className="relative bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-1 border border-gray-200/50 dark:border-gray-700/50">
                <div className="flex">
                  <button
                    onClick={() => setBillingCycle("month")}
                    className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                      billingCycle === "month"
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingCycle("year")}
                    className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                      billingCycle === "year"
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                    }`}
                  >
                    Yearly
                    <Badge className="ml-2 bg-green-500 hover:bg-green-600 text-white text-xs">
                      Save 20%
                    </Badge>
                  </button>
                </div>
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {displayPlans.map((plan, index) => {
                const isPopular = plan.name === "Premium"
                const isSelected = selectedPlan === plan.id
                
                return (
                  <Card
                    key={plan.id}
                    className={`relative overflow-hidden transition-all duration-300 hover:scale-105 ${
                      isSelected
                        ? "ring-2 ring-blue-500 dark:ring-blue-400 shadow-xl"
                        : "bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
                    } ${isPopular ? "shadow-2xl border-blue-200 dark:border-blue-800" : ""}`}
                  >
                    {isPopular && (
                      <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 text-sm font-medium">
                        Most Popular
                      </div>
                    )}
                    
                    <CardHeader className={isPopular ? "pt-12" : ""}>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">{t(plan.name.toLowerCase() as any)}</CardTitle>
                        {isSelected && (
                          <Badge className="bg-blue-600 hover:bg-blue-700 text-white">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Selected
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">{plan.description}</p>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      <div className="text-center">
                        <div className="flex items-baseline justify-center">
                          <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                            {plan.price === 0 ? "Free" : `€${plan.price.toFixed(2)}`}
                          </span>
                          {plan.price > 0 && (
                            <span className="text-gray-500 dark:text-gray-400 ml-2">
                              /{billingCycle === "month" ? "month" : "year"}
                            </span>
                          )}
                        </div>
                        {billingCycle === "year" && plan.price > 0 && (
                          <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                            Save €{((plan.price * 12 * 0.2) / 12).toFixed(2)} per month
                          </p>
                        )}
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100">Features included:</h4>
                        <ul className="space-y-3">
                          {plan.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                    
                    <CardFooter>
                      <Button
                        className={`w-full ${
                          isSelected
                            ? "bg-blue-600 hover:bg-blue-700"
                            : plan.price === 0
                            ? "bg-gray-600 hover:bg-gray-700"
                            : isPopular
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                        onClick={() => setSelectedPlan(plan.id)}
                        disabled={isSelected}
                      >
                        {isSelected ? "Current Selection" : plan.price === 0 ? "Get Started" : "Choose Plan"}
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>

            {/* Payment Section */}
            {selectedPlan && (
              <Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                    {t("paymentMethods")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as any)}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Label
                        htmlFor="card"
                        className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          paymentMethod === "card"
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-950/50"
                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                        }`}
                      >
                        <RadioGroupItem value="card" id="card" className="mr-3" />
                        <div className="flex items-center">
                          <CreditCard className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                          <span className="font-medium">Credit Card</span>
                        </div>
                      </Label>
                      
                      <Label
                        htmlFor="paypal"
                        className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          paymentMethod === "paypal"
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-950/50"
                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                        }`}
                      >
                        <RadioGroupItem value="paypal" id="paypal" className="mr-3" />
                        <div className="flex items-center">
                          <div className="h-5 w-5 mr-2 bg-blue-600 rounded flex items-center justify-center">
                            <span className="text-white text-xs font-bold">P</span>
                          </div>
                          <span className="font-medium">PayPal</span>
                        </div>
                      </Label>
                      
                      <Label
                        htmlFor="bank"
                        className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          paymentMethod === "bank"
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-950/50"
                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                        }`}
                      >
                        <RadioGroupItem value="bank" id="bank" className="mr-3" />
                        <div className="flex items-center">
                          <BanknoteIcon className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
                          <span className="font-medium">Bank Transfer</span>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSubscribe} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    Continue to Payment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="current" className="space-y-8">
            {userSubscription && currentPlan ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Current Plan Card */}
                <Card className="lg:col-span-2 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl">
                          {t("currentPlan")}: {t(currentPlan.name.toLowerCase() as any)}
                        </CardTitle>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                          {t("expiresOn")}: {new Date(userSubscription.end_date).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className="bg-green-500 hover:bg-green-600 text-white">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Active
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Plan Price</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                          {currentPlan.price === 0 ? "Free" : `€${currentPlan.price.toFixed(2)}`}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Next Billing</p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {new Date(userSubscription.end_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">Plan Features</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {currentPlan.features.map((feature, index) => (
                          <div key={index} className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col sm:flex-row gap-4">
                    <Button variant="outline" onClick={() => router.push("/subscriptions")} className="flex-1">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      {t("upgradeSubscription")}
                    </Button>
                    <Button variant="destructive" onClick={handleCancelSubscription} className="flex-1">
                      <X className="h-4 w-4 mr-2" />
                      {t("cancelSubscription")}
                    </Button>
                  </CardFooter>
                </Card>

                {/* Usage Stats */}
                <Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                      Usage Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Listings Used</span>
                          <span>5 / {currentPlan.name === "Basic" ? "3" : currentPlan.name === "Premium" ? "10" : "∞"}</span>
                        </div>
                        <Progress value={currentPlan.name === "Basic" ? 100 : 50} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Storage Used</span>
                          <span>2.3GB / 10GB</span>
                        </div>
                        <Progress value={23} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>API Calls</span>
                          <span>890 / 1000</span>
                        </div>
                        <Progress value={89} className="h-2" />
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <Button variant="outline" className="w-full">
                        <Eye className="h-4 w-4 mr-2" />
                        View Detailed Analytics
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="text-center py-16 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                <CardContent>
                  <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mb-6">
                    <Building2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    No Active Subscription
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                    Subscribe to a plan to unlock premium features and take your property business to the next level.
                  </p>
                  <Button onClick={() => router.push("/subscriptions")} className="bg-blue-600 hover:bg-blue-700">
                    <Award className="h-4 w-4 mr-2" />
                    View Available Plans
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
