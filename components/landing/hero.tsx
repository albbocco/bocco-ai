"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Zap, Video, Coins } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
            <span className="text-sm text-violet-300">Nouveau : Création de vidéos faceless</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight">
            <span className="text-gradient">Créez votre avatar IA</span>
            <br />
            <span className="text-foreground">en 5 minutes</span>
          </h1>

          {/* Subheadline */}
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground">
            Transformez votre présence en ligne avec des avatars IA réalistes et des vidéos 
            faceless professionnelles. Le compagnon idéal pour les vendeurs de formations MRR.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-lg px-8 py-6 glow-hover"
              >
                Commencer gratuitement
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              <Play className="mr-2 w-5 h-5" />
              Voir la démo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-violet-500" />
              <span>Mise en ligne en 5 min</span>
            </div>
            <div className="flex items-center space-x-2">
              <Video className="w-4 h-4 text-violet-500" />
              <span>Vidéos HD illimitées</span>
            </div>
            <div className="flex items-center space-x-2">
              <Coins className="w-4 h-4 text-violet-500" />
              <span>Payez à l'usage</span>
            </div>
          </div>

          {/* Preview Image */}
          <div className="relative mt-16 mx-auto max-w-5xl">
            <div className="relative rounded-2xl overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm p-2">
              <div className="aspect-video rounded-xl bg-gradient-to-br from-violet-900/20 to-indigo-900/20 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl flex items-center justify-center glow">
                    <Video className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-muted-foreground">Interface de création d&apos;avatars</p>
                </div>
              </div>
            </div>
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 rounded-2xl blur-xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}
