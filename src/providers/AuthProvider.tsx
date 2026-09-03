import { getAuthUser } from "@/services/auth/get-user.service";
import type { User } from "@/types/users.types";
import { createContext, useContext, useEffect, useState } from "react";

interface SaveUserProps {
    token: string;
    user: Omit<User, "createdAt" | "updatedAt">;
}

type AuthContextData = {
    user: SaveUserProps["user"] | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    saveUser: (data: SaveUserProps) => void;
    logOut: () => void;
};

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<SaveUserProps["user"] | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function checkAuth() {
            setIsLoading(true);
            try {
                const localStorage = window.localStorage;
                const user = localStorage.getItem("@ParkTech:user");
                if (user) {
                    setUser(JSON.parse(user));
                }
                await getAuthUser()
                setIsAuthenticated(true);
            } catch {
                setIsAuthenticated(false);
                setUser(null);
                localStorage.removeItem("@ParkTech:user");
                localStorage.removeItem("@ParkTech:token");
            } finally {
                setIsLoading(false);
            }
        }

        checkAuth();
    }, [])

    function saveUser(data: SaveUserProps) {
        setUser(data.user);
        handleSetStorage(data);
        setIsAuthenticated(true);
    }

    function logOut() {
        setIsAuthenticated(false);
        setIsLoading(false);
        setUser(null);
        localStorage.removeItem("@ParkTech:user");
        localStorage.removeItem("@ParkTech:token");
        window.location.replace("/");
    }

    function handleSetStorage({ user, token }: SaveUserProps) {
        const localStorage = window.localStorage;
        localStorage.setItem("@ParkTech:user", JSON.stringify(user));
        localStorage.setItem("@ParkTech:token", token);
    }

    return (
        <AuthContext.Provider value={{ user, isLoading, isAuthenticated, saveUser, logOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw Error("useAuth must be used within the context AuthProvider");
    }

    return context;
};