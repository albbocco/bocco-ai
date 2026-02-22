import { Metadata } from "next"
import Link from "next/link"
import { AuthForm } from "@/components/forms/auth-form"

export const metadata: Metadata = {
  title: "Inscription - Bocco.ai",
  description: "Créez votre compte Bocco.ai et commencez à générer des avatars IA et vidéos faceless professionnelles.",
}

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-violet-950/5 to-background">
      <div className="w-full max-w-md p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="text-2xl font-bold text-gradient">Bocco.ai</span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold">Créez votre compte</h1>
          <p className="mt-2 text-muted-foreground">
            Commencez à créer des avatars IA en quelques minutes
          </p>
        </div>

        {/* Auth Form */}
        <AuthForm mode="signup" />

        {/* Links */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Déjà un compte ?{" "}
            <Link href="/login" className="text-violet-400 hover:text-violet-300">
              Se connecter
            </Link>
          </p>
        </div>

        {/* Terms */}
        <p className="mt-8 text-xs text-center text-muted-foreground">
          En créant un compte, vous acceptez nos{" "}
          <Link href="/terms" className="text-violet-400 hover:underline">
            Conditions d&apos;utilisation
          </Link>{" "}
          et notre{" "}
          <Link href="/privacy" className="text-violet-400 hover:underline">
            Politique de confidentialité
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
