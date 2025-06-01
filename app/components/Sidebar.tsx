"use client"

import type React from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { Home, Search, PlusCircle, User, LogOut, LayoutDashboard, Building, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/app/context/TranslationContext"
import { useAuth } from "@/app/context/AuthContext"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  const { t } = useTranslation()
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = async () => {
    await logout()
    router.push("/login")
  }

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <Building className="h-6 w-6" />
          <span className="text-lg font-bold">PropertyListing</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/"}>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                <span>{t("home")}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/listings"}>
              <Link href="/listings">
                <Search className="mr-2 h-4 w-4" />
                <span>{t("search")}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {user && (
            <>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard"}>
                  <Link href="/dashboard">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>{t("dashboard")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/listings/new"}>
                  <Link href="/listings/new">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    <span>{t("addListing")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/subscriptions"}>
                  <Link href="/subscriptions">
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>{t("subscriptions")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/profile"}>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>{t("profile")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </>
          )}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4">
        {user ? (
          <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            {t("logout")}
          </Button>
        ) : (
          <Button variant="default" className="w-full" onClick={() => router.push("/login")}>
            {t("login")}
          </Button>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}

export default function SidebarWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex-1">{children}</main>
      </div>
    </SidebarProvider>
  )
}
