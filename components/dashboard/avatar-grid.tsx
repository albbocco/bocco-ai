"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Trash2 } from "lucide-react"
import Link from "next/link"

interface AvatarItem {
  id: string
  name: string
  image_url: string
  gender: string
  created_at: string
}

export function AvatarGrid() {
  const [avatars, setAvatars] = useState<AvatarItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Fetch from API
    setAvatars([])
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="h-48 bg-muted rounded-lg" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (avatars.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">Tu n'as pas encore créé d'avatar</p>
        <Link href="/dashboard/avatar/new">
          <Button>Créer mon premier avatar</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {avatars.map((avatar) => (
        <Card key={avatar.id}>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={avatar.image_url} />
                <AvatarFallback>{avatar.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-medium">{avatar.name}</h3>
                <p className="text-sm text-muted-foreground capitalize">{avatar.gender}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Play className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
