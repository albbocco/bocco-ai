"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Sparkles } from "lucide-react"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient">Bocco.ai</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/#features"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Fonctionnalités
            </Link>
            <Link
              href="/pricing"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Tarifs
            </Link>
            <Link
              href="/formations"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Formations
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Connexion
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-gradient-to-r from-violet-600 to-indigo-600">
                Commencer gratuitement
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <Link
                href="/#features"
                className="text-sm text-muted-foreground hover:text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Fonctionnalités
              </Link>
              <Link
                href="/pricing"
                className="text-sm text-muted-foreground hover:text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Tarifs
              </Link>
              <Link
                href="/formations"
                className="text-sm text-muted-foreground hover:text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Formations
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                <Link href="/login">
                  <Button variant="outline" className="w-full">
                    Connexion
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600">
                    Commencer gratuitement
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
