"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, Search, Star, Clock } from "lucide-react"

interface Props {
    onClose: () => void
}

const mockResults = [
    {
        id: 1,
        name: "Pepe Chicken Burger",
        category: "Burger - FastFood",
        rating: 4.8,
        deliveryTime: "15-25 min",
        price: "€12.90",
        image: "/placeholder.svg",
    },
    {
        id: 2,
        name: "Super Cheese Burger",
        category: "Burger - FastFood",
        rating: 4.6,
        deliveryTime: "20-30 min",
        price: "€14.50",
        image: "/placeholder.svg",
    },
    {
        id: 3,
        name: "Crispy Chicken Wings",
        category: "Chicken - FastFood",
        rating: 4.7,
        deliveryTime: "25-35 min",
        price: "€10.90",
        image: "/placeholder.svg",
    },
]

export default function SearchOverlay({ onClose }: Props) {
    const [searchTerm, setSearchTerm] = useState("")
    const [results, setResults] = useState<typeof mockResults>([])
    const containerRef = useRef<HTMLDivElement>(null)

    // Fermer avec ESC
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
        }
        window.addEventListener("keydown", handleEsc)
        return () => window.removeEventListener("keydown", handleEsc)
    }, [onClose])

    // Fermer avec clic hors barre
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                onClose()
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [onClose])

    // Simulation recherche
    useEffect(() => {
        if (searchTerm.length > 0) {
            setResults(
                mockResults.filter(
                    (item) =>
                        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.category.toLowerCase().includes(searchTerm.toLowerCase())
                )
            )
        } else {
            setResults([])
        }
    }, [searchTerm])

    return (
        <AnimatePresence>
            <motion.div className="fixed inset-0 z-50">
                <div className="absolute inset-0 backdrop-blur-[2px] bg-black/10 z-0" />


                {/* ✅ Barre + résultats au-dessus du flou */}
                <div className="relative z-20 w-full h-full flex flex-col items-center pt-[100px] px-4 overflow-y-auto">
                    <motion.div
                        ref={containerRef}
                        className="w-full max-w-xl"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                    >
                        {/* ✅ Barre de recherche avec icônes */}
                        <div className="relative bg-white/90 backdrop-blur-md shadow-xl rounded-full p-4 flex items-center border border-[var(--color-secondary)]">
                            {/* Icône de recherche */}
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-gray-3)]">
                                <Search className="w-5 h-5" />
                            </div>

                            {/* Champ de recherche */}
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Rechercher un plat ou un restaurant"
                                autoComplete="off"
                                autoCorrect="off"
                                spellCheck={false}
                                name="search-input"
                                className="w-full pl-12 pr-12 bg-transparent focus:outline-none text-[var(--color-black-1)] placeholder-[var(--color-gray-3)]"
                                autoFocus
                            />

                            {/* Bouton de fermeture */}
                            <button
                                onClick={onClose}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-gray-3)] hover:text-[var(--color-black-1)] transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* ✅ Résultats mock */}
                        {results.length > 0 && (
                            <motion.div
                                className="mt-6 bg-white/90 backdrop-blur-md rounded-xl shadow-xl overflow-hidden border border-white/30 max-h-[60vh] overflow-y-auto"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                {results.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center p-4 border-b last:border-none hover:bg-white/70 transition-colors cursor-pointer"
                                    >
                                        <div className="w-20 h-20 relative rounded-xl overflow-hidden mr-4">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-[var(--color-black-1)]">{item.name}</h3>
                                            <p className="text-sm text-[var(--color-gray-3)]">{item.category}</p>
                                            <div className="flex items-center gap-4 mt-2 text-sm">
                        <span className="text-[var(--color-secondary)] flex items-center">
                          <Star className="w-4 h-4 fill-[var(--color-secondary)] mr-1" />
                            {item.rating}
                        </span>
                                                <span className="text-[var(--color-gray-3)] flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                                                    {item.deliveryTime}
                        </span>
                                                <span className="font-medium">{item.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
