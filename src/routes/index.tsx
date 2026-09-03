import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";
import AuthLayout from "@/components/auth/layout";
import { AppLayout } from "@/components/common/AppLayout";
import VehiclesPage from "@/pages/vehicles";
import UsersPage from "@/pages/users";
import PricesPage from "@/pages/prices";
import DashboardPage from "@/pages/dashboard";

export const router = createBrowserRouter([
    {
        element: <AuthLayout />,
        children: [
            { index: true, element: <LoginPage /> },
            { path: "/register", element: <RegisterPage /> }
        ]
    },
    {
        element: <AppLayout />,
        children: [
            { path: "/vehicles", element: <VehiclesPage /> },
            { path: "/users", element: <UsersPage /> },
            { path: "/prices", element: <PricesPage /> },
            { path: "/dashboard", element: <DashboardPage /> }
        ]
    }
]);