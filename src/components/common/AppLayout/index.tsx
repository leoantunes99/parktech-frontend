import { Navigate, Outlet } from "react-router-dom";
import { Header } from "../Header";
import { SideBar } from "../SideBar";
import { useAuth } from "@/providers/AuthProvider";

export function AppLayout() {

    const {isAuthenticated, isLoading} = useAuth()

    if (!isAuthenticated && !isLoading) {
        return <Navigate to="/" replace />
    }

    return (
        <div className="bg-background h-full">
            <SideBar />

            <div className="ml-65">
                <Header />

                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}