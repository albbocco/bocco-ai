import { Metadata } from "next"
import Link from "next/link"
import { AuthForm } from "@/components/forms/auth-form"

export const metadata: Metadata = {
  title: "Connexion - Bocco.ai",
  description: "Connectez-vous à votre compte Bocco.ai pour accéder à votre dashboard et créer des avatars IA.",
}

export default function LoginPage() {
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
          <h1 className="mt-6 text-2xl font-bold">Content de vous revoir</h1>
          <p className="mt-2 text-muted-foreground">
            Connectez-vous pour accéder à votre dashboard
          </p>
        </div>

        {/* Auth Form */}
        <AuthForm mode="login" />

        {/* Links */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Pas encore de compte ?{" "}
            <Link href="/signup" className="text-violet-400 hover:text-violet-300">
              Créer un compte
            </Link>
          </p>
          <p className="text-sm">
            <Link href="/reset-password" className="text-violet-400 hover:text-violet-300">
              Mot de passe oublié ?
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
