"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Header() {
    const pathname = usePathname()

    const links = [
        { href: "/restaurant", label: "Restaurants" },
        { href: "/cart", label: "Panier" },
        { href: "/profile", label: "Profil" },
        { href: "/login", label: "Connexion" },
        { href: "/register", label: "Inscription" },
    ]

    return (
        <header className="bg-white text-[var(--color-black-1)] shadow-md sticky top-0 z-50">
            <motion.div
                initial={{ y: -80 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl mx-auto px-12 py-4 flex items-center justify-between"
            >
                {/* Logo à gauche */}
                <Link href="/" className="flex items-center gap-3">
                    <Image
                        src="/logo-foodly.png"
                        alt="Foodly Logo"
                        width={48}
                        height={48}
                        className="object-contain"
                    />
                    <span className="text-xl font-bold bg-gradient-to-r from-[var(--color-tertiary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
            Foodly
          </span>
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-8 text-base font-semibold">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={clsx(
                                "hover:text-[var(--color-secondary)] transition",
                                pathname === link.href ? "text-[var(--color-secondary)] underline" : ""
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </motion.div>
        </header>
    )
}
