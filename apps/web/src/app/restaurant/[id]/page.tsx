"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getRestaurantById, getMenuByRestaurantId } from "@/lib/api"
import { useCart } from "@/context/CartContext"
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
    menu_item_id: number
    item_name: string
    price: string
    img: string
    restaurant_id_fk: number
}

export default function RestaurantDetailPage() {
    const { id } = useParams()
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
    const [menuItems, setMenuItems] = useState<MenuItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const { addToCart } = useCart()

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("access_token")
            if (!token) {
                setError("Vous devez être connecté.")
                setLoading(false)
                return
            }

            try {
                const restoData = await getRestaurantById(id as string, token)
                const menuData = await getMenuByRestaurantId(id as string, token)
                setRestaurant(restoData)
                setMenuItems(menuData)
            } catch (err) {
                console.error("Erreur de récupération :", err)
                setError("Impossible de charger les données du restaurant.")
            } finally {
                setLoading(false)
            }
        }

        if (id) fetchData()
    }, [id])

    if (loading) return <div className="p-10">Chargement...</div>
    if (error) return <div className="p-10 text-red-600">{error}</div>
    if (!restaurant) return <div className="p-10">Restaurant introuvable.</div>

    return (
        <main className="px-6 md:px-16 py-10 space-y-10 bg-[var(--color-gray-6)] min-h-screen">
            {/* BANNIÈRE */}
            <div className="w-full h-60 rounded-xl overflow-hidden shadow">
                <img
                    src={`/${restaurant.restaurant_name.replace(/\s+/g, "_")}.png`}
                    alt={restaurant.restaurant_name}
                    onError={(e) => {
                        const img = e.currentTarget as HTMLImageElement
                        if (!img.dataset.fallback) {
                            img.src = "/placeholder.png"
                            img.dataset.fallback = "true"
                        }
                    }}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* INFOS */}
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-[var(--color-black-1)]">{restaurant.restaurant_name}</h1>
                <p className="text-[var(--color-gray-3)] text-lg">{restaurant.location}</p>
            </div>

            {/* MENU */}
            <div className="space-y-8">
                <h2 className="text-2xl font-bold text-[var(--color-black-1)] border-b pb-2">Menu</h2>

                {menuItems.map((item) => (
                    <div
                        key={item.menu_item_id}
                        className="flex items-center justify-between gap-4 bg-white shadow-sm border rounded-xl p-4"
                    >
                        <div className="flex items-center gap-4">
                            <img
                                src={`/${item.item_name.replace(/\s+/g, "_")}.png`}
                                alt={item.item_name}
                                onError={(e) => {
                                    const img = e.currentTarget as HTMLImageElement
                                    if (!img.dataset.fallback) {
                                        img.src = "/placeholder.png"
                                        img.dataset.fallback = "true"
                                    }
                                }}
                                className="w-16 h-16 rounded-md object-cover bg-[var(--color-gray-4)]"
                            />
                            <div>
                                <h3 className="font-semibold text-[var(--color-black-1)]">{item.item_name}</h3>
                                <p className="text-[var(--color-primary)] font-medium mt-1">
                                    {parseFloat(item.price).toFixed(2)} €
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() =>
                                addToCart({
                                    menu_item_id: item.menu_item_id,
                                    item_name: item.item_name,
                                    price: item.price,
                                    restaurant_id_fk: item.restaurant_id_fk,
                                })
                            }
                            className="bg-[var(--color-secondary)] text-white rounded-full p-3 hover:brightness-110 transition cursor-pointer"
                            title="Ajouter au panier"
                        >
                            <ShoppingCart className="w-5 h-5" />
                        </button>
                    </div>
                ))}
            </div>
        </main>
    )
}
