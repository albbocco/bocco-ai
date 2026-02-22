import Link from "next/link"
// Force rebuild
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AvatarGrid } from "@/components/dashboard/avatar-grid"
import { VideoGrid } from "@/components/dashboard/video-grid"
import { Plus, UserCircle, Video, Zap } from "lucide-react"

export default function DashboardPage() {
  // Mock data - à remplacer par des données réelles
  const credits = {
    total: 30,
    used: 12,
    remaining: 18,
  }

  const stats = [
    { label: "Avatars créés", value: 3, icon: UserCircle },
    { label: "Vidéos générées", value: 8, icon: Video },
    { label: "Crédits utilisés", value: 12, icon: Zap },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h2 className="text-3xl font-bold">Bienvenue sur Bocco.ai</h2>
        <p className="text-muted-foreground mt-1">
          Créez des avatars et générez des vidéos professionnelles
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Credits Card */}
        <Card className="col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Crédits disponibles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold">{credits.remaining}</span>
              <span className="text-muted-foreground">/ {credits.total} crédits</span>
            </div>
            <Progress
              value={(credits.used / credits.total) * 100}
              className="mt-3"
            />
            <p className="text-xs text-muted-foreground mt-2">
              {credits.used} crédits utilisés ce mois-ci
            </p>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-violet-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4">
        <Link href="/dashboard/avatar/new">
          <Button className="bg-gradient-to-r from-violet-600 to-indigo-600">
            <Plus className="w-4 h-4 mr-2" />
            Nouvel avatar
          </Button>
        </Link>
        <Link href="/dashboard/video/new">
          <Button variant="outline">
            <Video className="w-4 h-4 mr-2" />
            Nouvelle vidéo
          </Button>
        </Link>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="avatars" className="w-full">
        <TabsList>
          <TabsTrigger value="avatars">Mes avatars</TabsTrigger>
          <TabsTrigger value="videos">Mes vidéos</TabsTrigger>
        </TabsList>
        <TabsContent value="avatars" className="mt-6">
          <AvatarGrid />
        </TabsContent>
        <TabsContent value="videos" className="mt-6">
          <VideoGrid />
        </TabsContent>
      </Tabs>
    </div>
  )
}
