"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Flame, Pizza, UtensilsCrossed, Salad, Soup, Cookie } from "lucide-react"

const allRestaurants = [
    {
        id: "rest-1",
        name: "Burger King",
        image: "/placeholder.svg",
        rating: 4.2,
        cuisine: "Fast Food",
        deliveryTime: "15-25 min",
        distance: "1.2 km",
    },
    {
        id: "rest-2",
        name: "Pizza Hut",
        image: "/placeholder.svg",
        rating: 4.5,
        cuisine: "Pizza",
        deliveryTime: "20-30 min",
        distance: "0.8 km",
    },
    {
        id: "rest-3",
        name: "Sushi Yama",
        image: "/placeholder.svg",
        rating: 4.7,
        cuisine: "Asiatique",
        deliveryTime: "30-40 min",
        distance: "2.1 km",
    },
    {
        id: "rest-4",
        name: "Tacos Avenue",
        image: "/placeholder.svg",
        rating: 4.1,
        cuisine: "Fast Food",
        deliveryTime: "20-25 min",
        distance: "1.6 km",
    },
    {
        id: "rest-5",
        name: "Healthy Bowl",
        image: "/placeholder.svg",
        rating: 4.6,
        cuisine: "Healthy",
        deliveryTime: "25-35 min",
        distance: "0.9 km",
    },
    {
        id: "rest-6",
        name: "Pasta Nova",
        image: "/placeholder.svg",
        rating: 4.3,
        cuisine: "Italien",
        deliveryTime: "20-30 min",
        distance: "1.3 km",
    },
]

const filters = [
    { icon: Pizza, label: "Pizza" },
    { icon: UtensilsCrossed, label: "Fast Food" },
    { icon: Salad, label: "Healthy" },
    { icon: Soup, label: "Asiatique" },
    { icon: Cookie, label: "Desserts" },
    { icon: Flame, label: "Populaires" },
]

export default function RestaurantPage() {
    const [loading, setLoading] = useState(true)
    const [activeFilter, setActiveFilter] = useState<string | null>(null)

    const filteredRestaurants = activeFilter
        ? allRestaurants.filter((r) =>
            r.cuisine.toLowerCase().includes(activeFilter.toLowerCase())
        )
        : allRestaurants

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <main className="px-6 md:px-16 py-16 space-y-10">
            <div>
                <h1 className="text-[var(--heading-1)] leading-[var(--lh-heading-1)] font-bold text-[var(--color-black-1)]">
                    Nos restaurants
                </h1>
                <p className="text-[var(--text-lg)] leading-[var(--lh-lg)] text-[var(--color-gray-2)] mt-2">
                    Trouvez votre bonheur culinaire en quelques clics !
                </p>
            </div>

            <div className="flex flex-wrap gap-6 justify-center">
                {filters.map(({ icon: Icon, label }) => {
                    const isActive = activeFilter === label
                    return (
                        <div key={label} className="flex flex-col items-center gap-2">
                            <button
                                onClick={() => setActiveFilter(isActive ? null : label)}
                                className={`flex items-center justify-center w-20 h-20 rounded-full transition shadow 
                  ${isActive
                                    ? "bg-[var(--color-tertiary)]"
                                    : "bg-[var(--color-secondary)] hover:brightness-110"}`}
                            >
                                <Icon className="w-6 h-6 text-white" />
                            </button>
                            <span className="text-sm text-center text-[var(--color-black-1)]">{label}</span>
                        </div>
                    )
                })}
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {loading ? (
                    [...Array(6)].map((_, i) => (
                        <div key={i} className="h-56 bg-[var(--color-gray-5)] animate-pulse rounded-xl" />
                    ))
                ) : (
                    filteredRestaurants.map((rest) => (
                        <Link
                            href={`/restaurant/${rest.id}`}
                            key={rest.id}
                            className="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden border"
                        >
                            <div className="h-40 w-full relative">
                                <img src={rest.image} alt={rest.name} className="object-cover w-full h-full" />
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-[var(--color-black-1)]">{rest.name}</h3>
                                <p className="text-sm text-[var(--color-gray-3)]">{rest.cuisine}</p>
                                <div className="mt-2 flex flex-wrap text-sm text-[var(--color-gray-2)] gap-2">
                                    <span>{rest.rating}★</span>
                                    <span>•</span>
                                    <span>{rest.deliveryTime}</span>
                                    <span>•</span>
                                    <span>{rest.distance}</span>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </main>
    )
}
