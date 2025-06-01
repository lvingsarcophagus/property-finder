"use client"

import Link from "next/link"
import { useTranslation } from "../context/TranslationContext"

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border/40 text-foreground">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-primary">PropertyFinder</h2>
            <p className="text-muted-foreground">{t("findYourDreamPropertyWithEase")}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">{t("quickLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link href="/listings" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("listings")}
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("dashboard")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">{t("contact")}</h3>
            <p className="text-muted-foreground">Email: info@propertyfinder.com</p>
            <p className="text-muted-foreground">Phone: (123) 456-7890</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">{t("followUs")}</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Facebook
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Twitter
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border/40 text-center text-muted-foreground">
          <p>&copy; 2023 PropertyFinder. {t("allRightsReserved")}</p>
        </div>
      </div>
    </footer>
  )
}

