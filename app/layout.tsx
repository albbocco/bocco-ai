import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Bocco.ai - Créez votre avatar IA en 5 minutes",
  description: "SaaS de création d'avatars IA et vidéos faceless pour vendeurs de formations MRR. Transformez votre présence en ligne avec l'intelligence artificielle.",
  keywords: ["avatar IA", "vidéo faceless", "formation MRR", "intelligence artificielle", "marketing digital"],
  authors: [{ name: "Bocco.ai" }],
  openGraph: {
    title: "Bocco.ai - Créez votre avatar IA en 5 minutes",
    description: "SaaS de création d'avatars IA et vidéos faceless pour vendeurs de formations MRR.",
    url: "https://bocco.org",
    siteName: "Bocco.ai",
    locale: "fr_FR",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
