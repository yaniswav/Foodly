"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getRestaurantById } from "@/lib/api"

type RestaurantDetails = {
    restaurant_id: number
    restaurant_name: string
    location: string
    keywords: string
    siret: string
    user_id: number
}

export default function RestaurantDetailPage() {
    const { id } = useParams()
    const [restaurant, setRestaurant] = useState<RestaurantDetails | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const token = localStorage.getItem("access_token")

        if (!token) {
            setError("🔒 Vous devez être connecté.")
            setLoading(false)
            return
        }

        const fetchRestaurant = async () => {
            try {
                const data = await getRestaurantById(id as string, token)
                console.log("✅ Restaurant reçu :", data)
                setRestaurant(data)
            } catch (err) {
                console.error("❌ Erreur récupération restaurant :", err)
                setError("Impossible de récupérer le restaurant.")
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            fetchRestaurant()
        }
    }, [id])

    if (loading) return <div className="p-10">⏳ Chargement...</div>
    if (error) return <div className="p-10 text-red-600">{error}</div>
    if (!restaurant) return <div className="p-10">❌ Restaurant introuvable.</div>

    return (
        <main className="p-10 space-y-4 max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-[var(--color-black-1)]">
                {restaurant.restaurant_name}
            </h1>
            <p><strong>📍 Localisation :</strong> {restaurant.location}</p>
            <p><strong>🔑 Mots-clés :</strong> {restaurant.keywords}</p>
            <p><strong>🧾 SIRET :</strong> {restaurant.siret}</p>
            <p><strong>👤 ID utilisateur :</strong> {restaurant.user_id}</p>
        </main>
    )
}
