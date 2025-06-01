"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "../context/AuthContext"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { useTranslation } from "@/app/context/TranslationContext"; // Added import

const plansData = [
  {
    id: "basic", // Added id for key prop
    nameKey: "basicPlanName" as const, // Use 'as const' for stricter typing with t() keys
    price: "€9.99", // Price can remain hardcoded or be a translation key if it varies by region significantly
    priceKey: "basicPlanPrice" as const,
    intervalKey: "priceMonth" as const,
    descriptionKey: "basicPlanDescription" as const,
    featuresKeys: [
      "basicPlanFeature1",
      "basicPlanFeature2",
      "basicPlanFeature3",
      "basicPlanFeature4",
    ] as const,
    buttonKey: "upgradeToBasic" as const,
    highlight: false, // Added highlight for professional plan
  },
  {
    id: "professional", // Added id
    nameKey: "premiumPlanName" as const, // Note: Key was 'premiumPlanName' in translations
    price: "€24.99",
    priceKey: "premiumPlanPrice" as const,
    intervalKey: "priceMonth" as const,
    descriptionKey: "premiumPlanDescription" as const,
    featuresKeys: [
      "premiumPlanFeature1",
      "premiumPlanFeature2",
      "premiumPlanFeature3",
      "premiumPlanFeature4",
      "premiumPlanFeature5",
    ] as const,
    buttonKey: "upgradeToPremium" as const,
    highlight: true, // Highlight this plan
  },
  {
    id: "enterprise", // Added id
    nameKey: "freePlanName" as const, // Assuming 'Enterprise' maps to a 'Free' tier for now, adjust if needed
    price: "€0", // Or make this a translation key
    priceKey: "freePlanPrice" as const,
    intervalKey: "priceMonth" as const,
    descriptionKey: "freePlanDescription" as const,
    featuresKeys: [
      "freePlanFeature1",
      "freePlanFeature2",
      "freePlanFeature3",
    ] as const,
    buttonKey: "getStarted" as const,
    highlight: false,
  },
];

export default function SubscriptionsPage() {
  const { isAuthenticated } = useAuth();
  const { t } = useTranslation(); // Added useTranslation hook
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null); // Changed to track by ID

  const handleSubscribe = (planId: string, planNameKey: string) => {
    if (!isAuthenticated) {
      toast({
        title: t("authenticationRequired"), // Assuming this key exists or add it
        description: t("loginToSubscribe"), // Assuming this key exists or add it
        variant: "destructive",
      });
      return;
    }

    setSelectedPlanId(planId);
    toast({
      title: t("subscriptionActivatedTitle"), // Assuming this key exists or add it
      description: `${t("subscriptionActivatedDescription")} ${t(planNameKey as any)}`, // Added 'as any' to bypass strict key check if planNameKey is dynamic
    });
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <Toaster />
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">{t("chooseYourPlanTitle")}</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t("chooseYourPlanSubtitle")}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plansData.map((plan) => (
          <Card key={plan.id} className={plan.highlight ? "border-primary shadow-lg" : ""}>
            <CardHeader>
              <CardTitle>{t(plan.nameKey)}</CardTitle>
              <CardDescription>{t(plan.descriptionKey)}</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">{t(plan.priceKey)}</span>
                <span className="text-muted-foreground">/{t(plan.intervalKey)}</span>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow">
              <ul className="space-y-3 mb-6 flex-grow">
                {plan.featuresKeys.map((featureKey) => (
                  <li key={featureKey} className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                    <span>{t(featureKey as any)}</span>{/* Added 'as any' for dynamic keys */}
                  </li>
                ))}
              </ul>
              <Button
                className="w-full mt-auto"
                variant={plan.highlight ? "default" : "outline"}
                onClick={() => handleSubscribe(plan.id, plan.nameKey)}
                disabled={selectedPlanId === plan.id} // Disable if it's the currently selected plan
              >
                {selectedPlanId === plan.id ? t("currentPlanButton") : t(plan.buttonKey as any) /* Added 'as any' */}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground">
          {t("trialInfo")}
          <br />
          {t("needCustomPlanPrompt")} <Button variant="link" className="p-0 h-auto">{t("contactSalesLinkText")}</Button>
        </p>
      </div>
    </div>
  );
}
