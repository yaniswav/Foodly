"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, Search, Star, Clock } from "lucide-react"
import clsx from "clsx"

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

    // ⌨️ ESC
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
        }
        window.addEventListener("keydown", handleKey)
        return () => window.removeEventListener("keydown", handleKey)
    }, [onClose])

    // 🖱️ clic extérieur
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                onClose()
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [onClose])

    // 🔍 Résultats dynamiques
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
            <motion.div
                className="fixed inset-0 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {/* 👇 Fond flouté cliquable */}
                <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />

                {/* 👇 Barre centrée sous header */}
                <div className="relative w-full h-full flex flex-col items-center pt-[100px] px-4 overflow-y-auto">
                    <motion.div
                        ref={containerRef}
                        className="w-full max-w-xl"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                    >
                        {/* 🔍 Barre de recherche */}
                        <div className="relative bg-white/90 backdrop-blur-md shadow-xl rounded-full p-4 flex items-center border border-[var(--color-secondary)]">
                            <Search className="w-5 h-5 text-[var(--color-gray-3)] mr-3" />
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    id="search"
                                    placeholder=" "
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="peer w-full bg-transparent focus:outline-none text-[var(--color-black-1)] placeholder-transparent"
                                    autoFocus
                                />
                                <label
                                    htmlFor="search"
                                    className={clsx(
                                        "absolute left-0 top-1/2 -translate-y-1/2 text-[var(--color-gray-3)] pointer-events-none transition-all",
                                        "peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base",
                                        "peer-focus:top-[-1.2rem] peer-focus:text-sm peer-focus:text-[var(--color-primary)]"
                                    )}
                                >
                                    Rechercher un plat ou un restaurant
                                </label>
                            </div>
                            <button
                                onClick={onClose}
                                className="ml-3 text-[var(--color-gray-3)] hover:text-[var(--color-black-1)] transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* 🧾 Résultats */}
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
