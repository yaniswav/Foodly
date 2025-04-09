"use client"

import { useEffect, useState } from "react"
import { Search } from "lucide-react"
import Link from "next/link"
import { searchRestaurants } from "@/lib/api"

type Restaurant = {
    restaurant_id: number
    restaurant_name: string
    location: string
    keywords: string
    siret: string
    user_id: number
}

export default function RestaurantPage() {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const [page, setPage] = useState(1)
    const [limit] = useState(6) // nombre de restos par page
    const [hasMore, setHasMore] = useState(true)

    const fetchRestaurants = async (keywords = "", currentPage = 1) => {
        try {
            const token = localStorage.getItem("access_token")
            if (!token) {
                setError("Vous devez être connecté.")
                setLoading(false)
                return
            }

            const data = await searchRestaurants(keywords, currentPage, limit, token)
            setRestaurants(data)
            setHasMore(data.length === limit)

            // ✅ Affiche l'erreur seulement si la recherche ne retourne aucun résultat
            if (keywords && data.length === 0) {
                setError(``)
            } else {
                setError(null)
            }

        } catch (err) {
            console.error("Erreur fetch restaurants :", err)
            setError(`Aucun résultat trouvé pour : "${keywords}". Attention aux majuscules. Retrouvez ci-dessous la liste de tous les restaurants.`)
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        setLoading(true)
        fetchRestaurants("", page)
    }, [page])

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            setPage(1)
            fetchRestaurants(searchQuery, 1)
        }, 500)
        return () => clearTimeout(delayDebounce)
    }, [searchQuery])

    return (
        <main className="px-6 md:px-16 py-12 space-y-10">
            {/* Barre de recherche */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative w-full md:w-1/2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-gray-3)]" />
                    <input
                        type="text"
                        placeholder="Rechercher un restaurant..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-full border border-[var(--color-gray-5)] bg-white text-[var(--color-black-1)] placeholder-[var(--color-gray-3)] shadow-sm"
                    />
                </div>
            </div>

            {/* Message d’erreur */}
            {error && <div className="text-red-600 font-semibold">{error}</div>}

            {/* Liste restaurants */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {loading ? (
                    [...Array(limit)].map((_, i) => (
                        <div key={i} className="h-56 bg-[var(--color-gray-5)] animate-pulse rounded-xl" />
                    ))
                ) : restaurants.length > 0 ? (
                    restaurants.map((rest) => (
                        <Link
                            href={`/restaurant/${rest.restaurant_id}`}
                            key={rest.restaurant_id}
                            className="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden border"
                        >
                            <div className="h-40 w-full relative">
                                <img
                                    src={`/${rest.restaurant_name.replace(/\s+/g, "_")}.png`}
                                    alt={rest.restaurant_name}
                                    onError={(e) => {
                                        const img = e.currentTarget as HTMLImageElement
                                        if (!img.dataset.fallback) {
                                            img.src = "/placeholder.png"
                                            img.dataset.fallback = "true"
                                        }
                                    }}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-[var(--color-black-1)]">{rest.restaurant_name}</h3>
                                <p className="text-sm text-[var(--color-gray-3)]">{rest.keywords || "Type inconnu"}</p>
                                <div className="mt-2 flex flex-wrap text-sm text-[var(--color-gray-2)] gap-2">
                                    <span>🚚 20-30 min</span>
                                    <span>•</span>
                                    <span>📍 {rest.location || "non précisée"}</span>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className="text-[var(--color-gray-3)]">Aucun restaurant trouvé.</p>
                )}
            </div>

            {/* Pagination améliorée */}
            {!loading && restaurants.length > 0 && (
                <div className="flex justify-center gap-4 pt-8">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                        className="min-w-[120px] px-5 py-2 rounded-full font-semibold transition
                 bg-[var(--color-secondary)] text-white
                 hover:brightness-110 cursor-pointer
                 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        ◀ Précédent
                    </button>
                    <button
                        disabled={!hasMore}
                        onClick={() => setPage((prev) => prev + 1)}
                        className="min-w-[120px] px-5 py-2 rounded-full font-semibold transition
                 bg-[var(--color-secondary)] text-white
                 hover:brightness-110 cursor-pointer
                 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        Suivant ▶
                    </button>
                </div>
            )}

        </main>
    )
}
