import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

import Header from "@/components/ui/Header"
import CartFloatingPanel from "@/components/CartFloatingPanel"

import { CartProvider } from "@/context/CartContext"
import { AuthProvider } from "@/context/AuthContext"

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
})

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
})

export const metadata: Metadata = {
    title: "Foodly App",
    description: "Plateforme de restauration",
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="fr">
        <body
            className={`${geistSans.variable} ${geistMono.variable} font-sans bg-white text-black`}
        >
        <CartProvider>
            <AuthProvider>
                <Header />
                {children}
                <CartFloatingPanel />
            </AuthProvider>
        </CartProvider>
        </body>
        </html>
    )
}
