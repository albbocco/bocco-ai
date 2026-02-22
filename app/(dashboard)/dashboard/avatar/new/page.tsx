"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Upload, User, Loader2, Sparkles } from "lucide-react"

export default function NewAvatarPage() {
  const router = useRouter()
  const [step, setStep] = useState<1 | 2>(1)
  const [description, setDescription] = useState("")
  const [gender, setGender] = useState<"male" | "female">("female")
  const [photo, setPhoto] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPhoto(file)
    }
  }

  const handleSubmit = async () => {
    if (!photo) return
    
    setIsLoading(true)
    
    try {
      const formData = new FormData()
      formData.append("photo", photo)
      formData.append("description", description)
      formData.append("gender", gender)
      
      const response = await fetch("/api/avatar/create", {
        method: "POST",
        body: formData,
      })
      
      if (response.ok) {
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Error creating avatar:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Créer un nouvel avatar</h2>
        <p className="text-muted-foreground mt-1">
          Décrivez votre avatar idéal ou téléchargez une photo de référence
        </p>
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-violet-500/10 flex items-center justify-center text-violet-500 text-sm font-bold">
                1
              </span>
              Description de l&apos;avatar
            </CardTitle>
            <CardDescription>
              Décrivez l&apos;apparence de votre avatar ou téléchargez une photo de référence
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Photo de référence (optionnel)</Label>
              <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center hover:border-violet-500/50 transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload" className="cursor-pointer">
                  {photo ? (
                    <div className="flex items-center justify-center gap-2">
                      <User className="w-5 h-5 text-violet-500" />
                      <span>{photo.name}</span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Glissez une photo ou cliquez pour sélectionner
                      </p>
                      <p className="text-xs text-muted-foreground">
                        JPG, PNG jusqu&apos;à 10MB
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description détaillée</Label>
              <Textarea
                id="description"
                placeholder="Ex: Une femme d'affaires professionnelle, 35 ans, cheveux bruns mi-longs, souriante..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
              <p className="text-xs text-muted-foreground">
                Plus la description est détaillée, plus l&apos;avatar sera fidèle à vos attentes.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-violet-500/10 flex items-center justify-center text-violet-500 text-sm font-bold">
                2
              </span>
              Voix de l&apos;avatar
            </CardTitle>
            <CardDescription>
              Choisissez la voix qui correspond à votre avatar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={gender}
              onValueChange={(value) => setGender(value as "male" | "female")}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem
                  value="female"
                  id="female"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="female"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-violet-500 peer-data-[state=checked]:bg-violet-500/5 cursor-pointer"
                >
                  <User className="mb-3 h-6 w-6" />
                  <span className="font-medium">Voix féminine</span>
                  <span className="text-xs text-muted-foreground">Française</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="male"
                  id="male"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="male"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-violet-500 peer-data-[state=checked]:bg-violet-500/5 cursor-pointer"
                >
                  <User className="mb-3 h-6 w-6" />
                  <span className="font-medium">Voix masculine</span>
                  <span className="text-xs text-muted-foreground">Française</span>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      )}

      <Card className="bg-violet-500/5 border-violet-500/20">
        <CardContent className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-violet-500" />
            <div>
              <p className="font-medium">Coût de la création</p>
              <p className="text-sm text-muted-foreground">1 crédit sera déduit</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-violet-500">1</p>
            <p className="text-xs text-muted-foreground">crédit</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        {step === 2 && (
          <Button
            variant="outline"
            onClick={() => setStep(1)}
            disabled={isLoading}
          >
            Retour
          </Button>
        )}
        {step === 1 ? (
          <Button
            onClick={() => setStep(2)}
            disabled={!description && !photo}
            className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600"
          >
            Continuer
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Création en cours...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Créer mon avatar
              </>
            )}
          </Button>
        )}
        <Button
          variant="ghost"
          onClick={() => router.push("/dashboard")}
          disabled={isLoading}
        >
          Annuler
        </Button>
      </div>
    </div>
  )
}
