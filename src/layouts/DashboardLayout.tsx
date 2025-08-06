import AppSidebar from "@/components/AppSidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"

export default function DashboardLayout() {
    return (
        <>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <div className="flex items-center gap-2">
                        <h1 className="text-lg font-semibold">Dashboard</h1>
                    </div>
                </header>
                <main className="flex-1 p-2">
                    <Outlet />
                </main>
            </SidebarInset>
        </>
    )
}