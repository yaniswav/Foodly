"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Search, X, Star, Clock, ShoppingBag, User } from "lucide-react"

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

interface SearchOverlayProps {
    onClose: () => void
}

export default function SearchOverlay({ onClose }: SearchOverlayProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [results, setResults] = useState<typeof mockResults>([])

    useEffect(() => {
        if (searchTerm.length > 0) {
            const filtered = mockResults.filter(
                (item) =>
                    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.category.toLowerCase().includes(searchTerm.toLowerCase())
            )
            setResults(filtered)
        } else {
            setResults([])
        }
    }, [searchTerm])

    return (
        <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* HEADER */}
            <div className="w-full bg-white/90 backdrop-blur-md p-4 md:px-8 flex justify-between items-center border-b border-[var(--color-secondary)]">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[var(--color-secondary)] rounded-full flex items-center justify-center">
                        <ShoppingBag className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-[var(--color-tertiary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
            Foodly
          </span>
                </Link>

                <motion.button
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-tertiary)] text-white font-medium flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <User className="w-4 h-4" />
                    <span>Connexion</span>
                </motion.button>
            </div>

            {/* SEARCH */}
            <div className="flex-1 flex flex-col items-center pt-8 px-4 relative">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg width=\\'20\\' height=\\'20\\' viewBox=\\'0 0 20 20\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'#000000\\' fill-opacity=\\'1\\'%3E%3Ccircle cx=\\'3\\' cy=\\'3\\' r=\\'1.5\\'/%3E%3C/g%3E%3C/svg%3E')] bg-repeat bg-[length:20px_20px]" />

                <div className="w-full max-w-md z-10">
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <Search className="w-5 h-5" />
                        </div>

                        <input
                            type="text"
                            placeholder="Rechercher un plat ou un restaurant"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-4 pl-12 pr-12 border border-white/30 rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-black-1)] bg-white/90 backdrop-blur-md shadow-xl"
                            autoFocus
                        />

                        <button
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            onClick={onClose}
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* RESULTS */}
                    <AnimatePresence>
                        {results.length > 0 && (
                            <motion.div
                                className="mt-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-white/30"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                {results.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        className="flex items-center p-4 border-b last:border-b-0 hover:bg-white/50 cursor-pointer transition-colors"
                                        whileHover={{ x: 5 }}
                                    >
                                        <div className="w-20 h-20 relative rounded-xl overflow-hidden mr-4 shadow-md">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="font-bold text-[var(--color-black-1)]">
                                                {item.name}
                                            </h3>
                                            <p className="text-sm text-[var(--color-gray-3)]">{item.category}</p>

                                            <div className="flex items-center gap-4 mt-2 text-sm">
                                                <div className="flex items-center text-[var(--color-secondary)]">
                                                    <Star className="w-4 h-4 fill-[var(--color-secondary)] mr-1" />
                                                    {item.rating}
                                                </div>
                                                <div className="flex items-center text-[var(--color-gray-3)]">
                                                    <Clock className="w-4 h-4 mr-1" />
                                                    {item.deliveryTime}
                                                </div>
                                                <div className="font-medium">{item.price}</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* DECOR */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm rounded-full w-[300px] h-[300px] md:w-[400px] md:h-[400px] flex items-center justify-center opacity-50 border border-white/20">
                    <div className="text-3xl md:text-4xl font-bold tracking-tighter text-center text-white mix-blend-overlay opacity-70">
                        <div>BURGER</div>
                        <div>3D</div>
                        <div>DECOM</div>
                        <div>POSE</div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
