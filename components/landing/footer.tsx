import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Sparkles, Twitter, Github, Linkedin } from "lucide-react"

const footerLinks = {
  produit: [
    { label: "Fonctionnalités", href: "/#features" },
    { label: "Tarifs", href: "/pricing" },
    { label: "Formations", href: "/formations" },
  ],
  entreprise: [
    { label: "À propos", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  légal: [
    { label: "Confidentialité", href: "/privacy" },
    { label: "CGU", href: "/terms" },
    { label: "Mentions légales", href: "/legal" },
  ],
}

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/boccoai", label: "Twitter" },
  { icon: Github, href: "https://github.com/boccoai", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/company/boccoai", label: "LinkedIn" },
]

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">Bocco.ai</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              Créez des avatars IA et vidéos faceless professionnelles pour booster vos ventes de formations.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-3">Produit</h3>
            <ul className="space-y-2">
              {footerLinks.produit.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Entreprise</h3>
            <ul className="space-y-2">
              {footerLinks.entreprise.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Légal</h3>
            <ul className="space-y-2">
              {footerLinks.légal.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Bocco.ai. Tous droits réservés.
          </p>
          <p className="text-sm text-muted-foreground">
            Conçu avec passion en France 🇫🇷
          </p>
        </div>
      </div>
    </footer>
  )
}
