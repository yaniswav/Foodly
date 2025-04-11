"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import clsx from "clsx"
import { motion } from "framer-motion"
import Image from "next/image"
import {
    UserCircle,
    ShoppingCart,
    Search,
    Utensils,
    Gift
} from "lucide-react"
import { useAuth } from "@/context/AuthContext"

export default function Header() {
    const pathname = usePathname()
    const router = useRouter()
    const { isLoggedIn } = useAuth()
    const [search, setSearch] = useState("")

    return (
        <header className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50">
            <motion.div
                initial={{ y: -80 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full px-6 md:px-20 py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
                {/* Logo + Foodly */}
                <Link href="/" className="flex items-center gap-3">
                    <Image
                        src="/logo-foodly.png"
                        alt="Foodly Logo"
                        width={48}
                        height={48}
                        className="object-contain"
                    />
                    <span className="text-2xl font-bold bg-gradient-to-r from-[var(--color-tertiary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
                        Foodly
                    </span>
                </Link>

                {/* Navigation centrale */}
                <nav className="flex-1 flex justify-center gap-8 text-[var(--color-black-1)] font-medium text-base">
                    {/* Lien Restaurants */}
                    <Link
                        href="/restaurant"
                        className={clsx(
                            "flex items-center gap-2 hover:text-[var(--color-secondary)] transition",
                            pathname === "/restaurant" ? "text-[var(--color-secondary)] underline" : ""
                        )}
                    >
                        <Utensils className="w-4 h-4" />
                        Restaurants
                    </Link>

                    {/* Bouton Parrainer (pas de redirection) */}
                    <button
                        onClick={() => {}}
                        className="flex items-center gap-2 hover:text-[var(--color-secondary)] transition cursor-pointer"
                    >
                        <Gift className="w-4 h-4" />
                        Parrainer un ami
                    </button>

                    {/* Lien Checkout */}
                    <Link
                        href="/checkout"
                        className={clsx(
                            "flex items-center gap-2 hover:text-[var(--color-secondary)] transition",
                            pathname === "/checkout" ? "text-[var(--color-secondary)] underline" : ""
                        )}
                    >
                        <ShoppingCart className="w-4 h-4" />
                        Panier
                    </Link>
                </nav>

                {/* Recherche + Profil */}
                <div className="flex items-center gap-4 w-full lg:w-auto">
                    {/* Barre de recherche */}
                    <div className="relative flex-1 lg:flex-none">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-gray-3)]" />
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] text-sm"
                        />
                    </div>

                    {/* Icone Profil */}
                    <div className="relative">
                        <button
                            onClick={() => router.push(isLoggedIn ? "/profile" : "/login")}
                            title={isLoggedIn ? "Profil" : "Connexion"}
                            className="hover:text-[var(--color-secondary)] transition cursor-pointer"
                        >
                            <UserCircle className="w-7 h-7 text-[var(--color-primary)]" />
                        </button>

                        {isLoggedIn && (
                            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-white" />
                        )}
                    </div>
                </div>
            </motion.div>
        </header>
    )
}
