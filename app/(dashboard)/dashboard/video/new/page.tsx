"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Link, Video, Loader2, Clock, Film, Sparkles } from "lucide-react"

const FORMATIONS = [
  { id: "none", name: "Aucune (contenu général)", price: 0 },
  { id: "dsa", name: "DSA - Digital Success Academy", price: 997 },
  { id: "asa", name: "ASA", price: 497 },
  { id: "code", name: "Code Liberté", price: 350 },
  { id: "custom", name: "Ma propre formation", price: 0 },
]

export default function NewVideoPage() {
  const router = useRouter()
  const [sourceType, setSourceType] = useState<"url" | "upload">("url")
  const [videoUrl, setVideoUrl] = useState("")
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [format, setFormat] = useState<"short" | "long">("short")
  const [formation, setFormation] = useState("none")
  const [customScript, setCustomScript] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setVideoFile(file)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    
    try {
      const formData = new FormData()
      if (sourceType === "url") {
        formData.append("videoUrl", videoUrl)
      } else if (videoFile) {
        formData.append("videoFile", videoFile)
      }
      formData.append("format", format)
      formData.append("formation", formation)
      formData.append("customScript", customScript)
      
      const response = await fetch("/api/video/create", {
        method: "POST",
        body: formData,
      })
      
      if (response.ok) {
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Error creating video:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const creditsCost = format === "short" ? 1 : 2

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Créer une nouvelle vidéo</h2>
        <p className="text-muted-foreground mt-1">
          Importez une vidéo source et nous la recréerons avec votre avatar
        </p>
      </div>

      {/* Step 1: Source */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-violet-500/10 flex items-center justify-center text-violet-500 text-sm font-bold">1</span>
            Source vidéo
          </CardTitle>
          <CardDescription>
            Importez une vidéo à partir d'une URL ou téléchargez un fichier
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup
            value={sourceType}
            onValueChange={(value) => setSourceType(value as "url" | "upload")}
            className="grid grid-cols-2 gap-4"
          >
            <div>
              <RadioGroupItem value="url" id="url" className="peer sr-only" />
              <Label
                htmlFor="url"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-violet-500 peer-data-[state=checked]:bg-violet-500/5 cursor-pointer"
              >
                <Link className="mb-3 h-6 w-6" />
                <span className="font-medium">URL YouTube/TikTok</span>
              </Label>
            </div>
            <div>
              <RadioGroupItem value="upload" id="upload" className="peer sr-only" />
              <Label
                htmlFor="upload"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-violet-500 peer-data-[state=checked]:bg-violet-500/5 cursor-pointer"
              >
                <Upload className="mb-3 h-6 w-6" />
                <span className="font-medium">Télécharger un fichier</span>
              </Label>
            </div>
          </RadioGroup>

          {sourceType === "url" ? (
            <div className="space-y-2">
              <Label htmlFor="video-url">URL de la vidéo</Label>
              <Input
                id="video-url"
                placeholder="https://youtube.com/watch?v=..."
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Supporte YouTube, TikTok, Instagram Reels
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <Label>Fichier vidéo</Label>
              <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center hover:border-violet-500/50 transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="video-upload"
                />
                <label htmlFor="video-upload" className="cursor-pointer">
                  {videoFile ? (
                    <div className="flex items-center justify-center gap-2">
                      <Video className="w-5 h-5 text-violet-500" />
                      <span>{videoFile.name}</span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Glissez une vidéo ou cliquez pour sélectionner
                      </p>
                      <p className="text-xs text-muted-foreground">
                        MP4, MOV jusqu'à 500MB
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Step 2: Format */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-violet-500/10 flex items-center justify-center text-violet-500 text-sm font-bold">2</span>
            Format de sortie
          </CardTitle>
          <CardDescription>
            Choisissez la durée de votre vidéo finale
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={format}
            onValueChange={(value) => setFormat(value as "short" | "long")}
            className="grid grid-cols-2 gap-4"
          >
            <div>
              <RadioGroupItem value="short" id="short" className="peer sr-only" />
              <Label
                htmlFor="short"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-violet-500 peer-data-[state=checked]:bg-violet-500/5 cursor-pointer"
              >
                <Clock className="mb-3 h-6 w-6" />
                <span className="font-medium">Format Court</span>
                <span className="text-xs text-muted-foreground">&lt; 1 minute</span>
                <span className="text-sm font-bold text-violet-500 mt-2">1 crédit</span>
              </Label>
            </div>
            <div>
              <RadioGroupItem value="long" id="long" className="peer sr-only" />
              <Label
                htmlFor="long"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-violet-500 peer-data-[state=checked]:bg-violet-500/5 cursor-pointer"
              >
                <Film className="mb-3 h-6 w-6" />
                <span className="font-medium">Format Long</span>
                <span className="text-xs text-muted-foreground">1-2 minutes</span>
                <span className="text-sm font-bold text-violet-500 mt-2">2 crédits</span>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Step 3: Formation & Script */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-violet-500/10 flex items-center justify-center text-violet-500 text-sm font-bold">3</span>
            Formation à vendre
          </CardTitle>
          <CardDescription>
            Choisissez la formation que vous souhaitez promouvoir dans la vidéo
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Formation</Label>
            <Select value={formation} onValueChange={setFormation}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez une formation" />
              </SelectTrigger>
              <SelectContent>
                {FORMATIONS.map((f) => (
                  <SelectItem key={f.id} value={f.id}>
                    {f.name} {f.price > 0 && `- ${f.price}€`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="custom-script">Personnalisation du script (optionnel)</Label>
            <textarea
              id="custom-script"
              placeholder="Ajoutez des éléments spécifiques à mentionner dans la vidéo..."
              value={customScript}
              onChange={(e) => setCustomScript(e.target.value)}
              className="w-full min-h-[100px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
            <p className="text-xs text-muted-foreground">
              Nous intégrerons ces éléments dans le script généré tout en conservant la structure de la vidéo originale.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Cost Info */}
      <Card className="bg-violet-500/5 border-violet-500/20">
        <CardContent className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-violet-500" />
            <div>
              <p className="font-medium">Coût de la création</p>
              <p className="text-sm text-muted-foreground">
                {format === "short" ? "Vidéo courte" : "Vidéo longue"} - {creditsCost} crédit(s) seront déduits
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-violet-500">{creditsCost}</p>
            <p className="text-xs text-muted-foreground">crédit{format === "long" ? "s" : ""}</p>
          </div>
        </CardContent>
      </Card>

      {/* Submit */}
      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard")}
          disabled={isLoading}
        >
          Annuler
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isLoading || (!videoUrl && !videoFile)}
          className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Création en cours...
            </>
          ) : (
            <>
              <Film className="w-4 h-4 mr-2" />
              Créer ma vidéo
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
