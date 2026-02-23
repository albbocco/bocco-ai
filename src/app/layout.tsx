import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "bocco.ai - Crée ton Influenceur IA",
  description: "Crée ton avatar IA anonyme, génère des vidéos pro automatiquement, et vends tes formations avec un abonnement qui s'adapte à ton investissement.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
