"use client";

import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex flex-wrap justify-between items-center">
                <Link href="/" className="text-xl font-bold">
                    Foodly
                </Link>

                <div className="flex space-x-4 mt-2 sm:mt-0">
                    <Link href="/restaurant" className="hover:underline">
                        Restaurants
                    </Link>
                    <Link href="/cart" className="hover:underline">
                        Panier
                    </Link>
                    <Link href="/profile" className="hover:underline">
                        Profil
                    </Link>
                    <Link href="/login" className="hover:underline">
                        Connexion
                    </Link>
                    <Link href="/register" className="hover:underline">
                        Inscription
                    </Link>
                </div>
            </div>
        </nav>
    );
}
