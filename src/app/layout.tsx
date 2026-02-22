import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Bocco.ai - Créez votre avatar IA en 5 minutes",
  description: "SaaS de création d'avatars IA et vidéos faceless pour vendeurs de formations MRR.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
