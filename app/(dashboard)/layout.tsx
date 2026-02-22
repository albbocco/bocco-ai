import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { UserNav } from "@/components/dashboard/user-nav"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("id", session.user.id)
    .single()

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Sidebar */}
        <DashboardNav />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="h-16 border-b border-border/50 flex items-center justify-between px-6 bg-card/50 backdrop-blur-sm">
            <div>
              <h1 className="text-lg font-semibold">Dashboard</h1>
            </div>
            <UserNav user={user} />
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
