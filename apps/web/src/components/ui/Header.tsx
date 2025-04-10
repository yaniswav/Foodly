"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import clsx from "clsx"
import { motion } from "framer-motion"
import Image from "next/image"
import {UserCircle } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

export default function Header() {
    const pathname = usePathname()
    const router = useRouter()
    const { isLoggedIn } = useAuth()

    return (
        <header className="bg-white text-[var(--color-black-1)] shadow-md sticky top-0 z-50">
            <motion.div
                initial={{ y: -80 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full px-6 md:px-20 py-6 flex items-center justify-between"
            >
                {/* Logo + Foodly */}
                <Link href="/" className="flex items-center gap-4">
                    <Image
                        src="/logo-foodly.png"
                        alt="Foodly Logo"
                        width={56}
                        height={56}
                        className="object-contain"
                    />
                    <span className="text-2xl font-bold bg-gradient-to-r from-[var(--color-tertiary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
                        Foodly
                    </span>
                </Link>

                {/* Navigation */}
                <nav className="hidden lg:flex items-center gap-10 text-lg font-semibold">
                    <Link
                        href="/restaurant"
                        className={clsx(
                            "hover:text-[var(--color-secondary)] transition",
                            pathname === "/restaurant" ? "text-[var(--color-secondary)] underline" : ""
                        )}
                    >
                        Restaurants
                    </Link>
                </nav>

                {/* Profil */}
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <button
                            onClick={() =>
                                router.push(isLoggedIn ? "/profile" : "/login")
                            }
                            title={isLoggedIn ? "Profil" : "Connexion"}
                            className="hover:text-[var(--color-secondary)] transition cursor-pointer"
                        >
                            <UserCircle className="w-7 h-7 text-[var(--color-primary)]" />
                        </button>

                        {/* Petite bulle verte si connecté */}
                        {isLoggedIn && (
                            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-white" />
                        )}
                    </div>
                </div>
            </motion.div>
        </header>
    )
}
