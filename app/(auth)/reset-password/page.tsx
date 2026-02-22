import { Metadata } from "next"
import Link from "next/link"
import { ResetPasswordForm } from "@/components/forms/reset-password-form"

export const metadata: Metadata = {
  title: "Réinitialisation du mot de passe - Bocco.ai",
  description: "Réinitialisez votre mot de passe Bocco.ai.",
}

export default function ResetPasswordPage() {
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
          <h1 className="mt-6 text-2xl font-bold">Mot de passe oublié ?</h1>
          <p className="mt-2 text-muted-foreground">
            Entrez votre email pour recevoir un lien de réinitialisation
          </p>
        </div>

        {/* Reset Password Form */}
        <ResetPasswordForm />

        {/* Links */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            <Link href="/login" className="text-violet-400 hover:text-violet-300">
              Retour à la connexion
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
