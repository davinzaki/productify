import { AppSidebar } from "@/components/AppSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"

export default function DashboardLayout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main>
                <SidebarTrigger className="flex-1" />
                <Outlet />
            </main>
        </SidebarProvider>
    )
}