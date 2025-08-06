import AppSidebar from "@/components/AppSidebar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"

export default function DashboardLayout() {
    return (
        <>
            <AppSidebar />
            <main className="p-2 w-full">
                <SidebarTrigger />
                <Outlet />
            </main>
        </>
    )
}