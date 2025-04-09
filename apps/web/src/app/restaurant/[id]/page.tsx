"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getRestaurantById, getMenuByRestaurantId } from "@/lib/api"
import { ShoppingCart } from "lucide-react"

type Restaurant = {
    restaurant_id: number
    restaurant_name: string
    location: string
    keywords: string
    siret: string
    user_id: number
}

type MenuItem = {
    item_id: number
    name: string
    description: string
    price: number
    image_url?: string
    category: string
}

export default function RestaurantDetailPage() {
    const { id } = useParams()
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
    const [menu, setMenu] = useState<MenuItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const token = localStorage.getItem("access_token")
        if (!token) {
            setError("Vous devez être connecté.")
            setLoading(false)
            return
        }

        const fetchData = async () => {
            try {
                const r = await getRestaurantById(id as string, token)
                const m = await getMenuByRestaurantId(id as string, token)
                setRestaurant(r)
                setMenu(m)
            } catch (err) {
                console.error("Erreur récupération restaurant :", err)
                setError("Impossible de récupérer les données du restaurant.")
            } finally {
                setLoading(false)
            }
        }

        if (id) fetchData()
    }, [id])

    const addToCart = (item: MenuItem) => {
        const currentCart = JSON.parse(localStorage.getItem("cart") || "[]")
        const updatedCart = [...currentCart, item]
        localStorage.setItem("cart", JSON.stringify(updatedCart))
        alert(`Ajouté au panier : ${item.name}`)
    }

    const menuByCategory = menu.reduce((acc: Record<string, MenuItem[]>, item) => {
        if (!acc[item.category]) acc[item.category] = []
        acc[item.category].push(item)
        return acc
    }, {})

    if (loading) return <div className="p-10">Chargement...</div>
    if (error) return <div className="p-10 text-red-600">{error}</div>
    if (!restaurant) return <div className="p-10">Restaurant introuvable.</div>

    return (
        <main className="px-6 md:px-16 py-12 max-w-5xl mx-auto space-y-10">
            {/* Image du restaurant */}
            <div className="h-72 md:h-96 rounded-xl overflow-hidden shadow border bg-white">
                <img
                    src="/placeholder.svg"
                    alt={restaurant.restaurant_name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Nom et localisation */}
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-[var(--color-black-1)]">
                    {restaurant.restaurant_name}
                </h1>
                <p className="text-[var(--color-gray-3)]">{restaurant.location || "Localisation inconnue"}</p>
            </div>

            {/* Menu par catégories */}
            <div className="space-y-12">
                {Object.entries(menuByCategory).map(([category, items]) => (
                    <section key={category} className="space-y-6">
                        <h2 className="text-2xl font-bold text-[var(--color-black-1)] border-b pb-2">{category}</h2>
                        <div className="space-y-4">
                            {items.map((item) => (
                                <div
                                    key={item.menu_item_id}
                                    className="flex gap-4 items-center bg-white shadow-sm border rounded-xl p-4"
                                >
                                    <div className="min-w-[80px] h-[80px] rounded-lg overflow-hidden">
                                        <img
                                            src={item.image_url || "/placeholder.svg"}
                                            alt={item.name}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-[var(--color-black-1)]">{item.name}</h3>
                                        <p className="text-sm text-[var(--color-gray-3)]">{item.description}</p>
                                        <p className="text-[var(--color-secondary)] font-semibold mt-1">
                                            {Number(item.price || 0).toFixed(2)} €
                                        </p>

                                    </div>
                                    <button
                                        onClick={() => addToCart(item)}
                                        className="p-2 rounded-full bg-[var(--color-secondary)] text-white hover:brightness-110 transition"
                                        title="Ajouter au panier"
                                    >
                                        <ShoppingCart className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </main>
    )
}
