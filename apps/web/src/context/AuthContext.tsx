"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { useCart } from "@/context/CartContext"

type AuthContextType = {
    isLoggedIn: boolean
    login: (token: string, userId?: string) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error("useAuth must be used within AuthProvider")
    return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const { clearCart } = useCart()

    useEffect(() => {
        const token = localStorage.getItem("access_token")
        setIsLoggedIn(!!token)
    }, [])

    const login = (token: string, userId?: string) => {
        localStorage.setItem("access_token", token)
        if (userId) localStorage.setItem("user_id", userId)
        setIsLoggedIn(true)
    }

    const logout = () => {
        localStorage.removeItem("access_token")
        localStorage.removeItem("user_id")
        clearCart() // ✅ Vide le panier à la déconnexion
        setIsLoggedIn(false)
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
