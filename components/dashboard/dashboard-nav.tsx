"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  LayoutDashboard,
  UserCircle,
  Video,
  CreditCard,
  Settings,
  Menu,
  Sparkles,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Avatars", href: "/dashboard/avatars", icon: UserCircle },
  { name: "Vidéos", href: "/dashboard/videos", icon: Video },
  { name: "Crédits", href: "/dashboard/credits", icon: CreditCard },
  { name: "Paramètres", href: "/dashboard/settings", icon: Settings },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-64 flex-col border-r border-border/50 bg-card/50 backdrop-blur-sm">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-border/50">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gradient">Bocco.ai</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-violet-500/10 text-violet-400"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="absolute top-4 left-4 z-50">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="h-16 flex items-center px-6 border-b border-border/50">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-gradient">Bocco.ai</span>
              </Link>
            </div>
            <nav className="px-4 py-6 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-violet-500/10 text-violet-400"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
