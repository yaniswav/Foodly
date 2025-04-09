"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { motion } from "framer-motion";
import Image from "next/image";
import { Search } from "lucide-react";
import { useState } from "react";
import SearchOverlay from "@/components/ui/SearchOverlay";

export default function Header() {
    const pathname = usePathname();
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const links = [
        { href: "/restaurant", label: "Restaurants" },
        { href: "/cart", label: "Panier" },
        { href: "/profile", label: "Profil" },
        { href: "/login", label: "Connexion" },
        { href: "/register", label: "Inscription" },
    ];

    return (
        <header className="bg-white text-[var(--color-black-1)] shadow-md sticky top-0 z-50">
            <motion.div
                initial={{ y: -80 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full px-6 md:px-16 lg:px-32 py-4 flex items-center justify-between"
            >
                {/* Logo + Foodly */}
                <Link href="/" className="flex items-center gap-3">
                    <Image
                        src="/logo-foodly.png"
                        alt="Logo Foodly"
                        width={48}
                        height={48}
                        className="object-contain"
                        priority
                    />
                    <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[var(--color-tertiary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
                        Foodly
                    </span>
                </Link>

                {/* Navigation */}
                <nav className="hidden lg:flex items-center gap-10 text-base font-semibold">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={clsx(
                                "hover:text-[var(--color-secondary)] transition-colors",
                                pathname === link.href && "text-[var(--color-secondary)] underline"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Bouton recherche */}
                <button
                    aria-label="Rechercher"
                    onClick={() => setIsSearchOpen(true)}
                    className="ml-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <Search className="w-6 h-6 text-[var(--color-primary)]" />
                </button>
            </motion.div>

            {/* Overlay recherche */}
            {isSearchOpen && (
                <SearchOverlay onClose={() => setIsSearchOpen(false)} />
            )}
        </header>
    );
}
