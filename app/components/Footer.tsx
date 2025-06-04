"use client"

import Link from "next/link"
import { useTranslation } from "../context/TranslationContext"

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border/40 text-foreground">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-calryon-teal">Calryon Group</h2>
            <p className="text-muted-foreground">Professional Consulting Services.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-calryon-teal">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-calryon-teal transition-colors">
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="text-muted-foreground hover:text-calryon-teal transition-colors">
                  {t("aboutUs")}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-calryon-teal transition-colors">
                  {t("services")}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-calryon-teal transition-colors">
                  {t("blog")}
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-muted-foreground hover:text-calryon-teal transition-colors">
                  {t("testimonials")}
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="text-muted-foreground hover:text-calryon-teal transition-colors">
                  {t("contactUs")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-calryon-teal">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-muted-foreground hover:text-calryon-teal transition-colors">
                  {t("privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link href="/gdpr" className="text-muted-foreground hover:text-calryon-teal transition-colors">
                  {t("gdpr")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            {/* Contact details can remain here or be moved to the contact page exclusively */}
            <h3 className="text-lg font-semibold mb-4 text-calryon-teal">Contact</h3>
            <p className="text-muted-foreground">Email: info@calryongroup.com</p> {/* Placeholder */}
            <p className="text-muted-foreground">Phone: +370 123 45678</p> {/* Placeholder */}
            {/* Social media links can be added here if actual links are provided */}
            {/* <h3 className="text-lg font-semibold mb-4 mt-6 text-calryon-teal">Follow Us</h3> */}
            {/* <div className="flex space-x-4"> ... social links ... </div> */}
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border/40 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Calryon Group. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
