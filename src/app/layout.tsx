import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AvatarStudio - Crée ton Influenceur IA",
  description: "Crée ton avatar IA anonyme, génère 10 vidéos pro automatiquement, et vends tes formations avec l'argument Abo IA 10€/mois imbattable.",
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
      <body className="bg-black text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
