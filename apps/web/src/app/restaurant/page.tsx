"use client"

import { useEffect, useState } from "react"
import { searchRestaurants } from "@/lib/api"

type Restaurant = {
    restaurant_id: number
    restaurant_name: string
    location: string
    keywords: string
}

export default function RestaurantPage() {
    const [token, setToken] = useState<string | null>(null)
    const [keywords, setKeywords] = useState("")
    const [restaurants, setRestaurants] = useState<Restaurant[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const storedToken = localStorage.getItem("access_token")
        if (!storedToken) {
            setError("Vous devez être connecté pour voir les restaurants.")
        } else {
            setToken(storedToken)
        }
    }, [])

    const handleSearch = async () => {
        if (!token || !keywords) return

        setLoading(true)
        setError(null)

        try {
            const result = await searchRestaurants(token, keywords)
            setRestaurants(result)
        } catch (err) {
            console.error(err)
            setError("Erreur lors de la récupération des restaurants.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="p-10 max-w-3xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">🔍 Recherche de restaurants</h1>

            <div className="flex gap-2">
                <input
                    type="text"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="Ex: sushi, burger, pizza"
                    className="border px-4 py-2 rounded w-full"
                />
                <button
                    onClick={handleSearch}
                    className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                >
                    Rechercher
                </button>
            </div>

            {loading && <p className="text-gray-500">Chargement...</p>}
            {error && <p className="text-red-600">{error}</p>}

            {restaurants.length > 0 && (
                <ul className="divide-y">
                    {restaurants.map((resto) => (
                        <li key={resto.restaurant_id} className="py-4">
                            <h2 className="text-lg font-semibold">{resto.restaurant_name}</h2>
                            <p className="text-sm text-gray-600">📍 {resto.location}</p>
                            <p className="text-sm text-gray-500">🔑 {resto.keywords}</p>
                        </li>
                    ))}
                </ul>
            )}

            {!loading && restaurants.length === 0 && !error && (
                <p className="text-gray-400">Aucun restaurant à afficher pour l’instant.</p>
            )}
        </main>
    )
}
