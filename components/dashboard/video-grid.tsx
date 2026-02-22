"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Download, Trash2 } from "lucide-react"
import Link from "next/link"

interface VideoItem {
  id: string
  title: string
  thumbnail_url: string
  status: "pending" | "processing" | "completed" | "failed"
  created_at: string
}

export function VideoGrid() {
  const [videos, setVideos] = useState<VideoItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Fetch from API
    setVideos([])
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="h-32 bg-muted rounded-lg" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (videos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">Tu n'as pas encore créé de vidéo</p>
        <Link href="/dashboard/video/new">
          <Button>Créer ma première vidéo</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {videos.map((video) => (
        <Card key={video.id}>
          <CardContent className="p-4">
            <div className="aspect-video bg-muted rounded-lg mb-4 relative overflow-hidden">
              {video.thumbnail_url ? (
                <img
                  src={video.thumbnail_url}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Play className="h-12 w-12 text-muted-foreground" />
                </div>
              )}
              {video.status === "processing" && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white">Traitement...</span>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{video.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(video.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                {video.status === "completed" && (
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                )}
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
