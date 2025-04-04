"use client"

import { useParams } from "next/navigation"
import Image from "next/image"

const mockDetails = {
    "rest-1": {
        name: "Burger King",
        description: "Des burgers savoureux livrés en un éclair.",
        image: "/placeholder.svg",
        rating: 4.2,
        cuisine: "Fast Food",
        deliveryTime: "15-25 min",
        address: "12 Rue des Burgers, Paris",
    },
    "rest-2": {
        name: "Pizza Hut",
        description: "Des pizzas fondantes comme en Italie.",
        image: "/placeholder.svg",
        rating: 4.5,
        cuisine: "Pizza",
        deliveryTime: "20-30 min",
        address: "78 Avenue Napolitaine, Lyon",
    },
    "rest-3": {
        name: "Sushi Yama",
        description: "Sushis frais et délicieux préparés à la minute.",
        image: "/placeholder.svg",
        rating: 4.7,
        cuisine: "Asiatique",
        deliveryTime: "30-40 min",
        address: "5 Rue Tokyo, Marseille",
    },
    // ➕ Ajoute d'autres mocks ici si besoin
}

export default function RestaurantDetailPage() {
    const { id } = useParams()
    const restaurant = mockDetails[id as keyof typeof mockDetails]

    if (!restaurant) {
        return (
            <div className="p-10 text-center text-[var(--color-error)]">
                Restaurant introuvable.
            </div>
        )
    }

    return (
        <main className="px-6 md:px-16 py-16 space-y-8 max-w-4xl mx-auto">
            <div className="rounded-xl overflow-hidden shadow-md">
                <Image
                    src={restaurant.image}
                    alt={restaurant.name}
                    width={800}
                    height={400}
                    className="w-full h-64 object-cover"
                />
            </div>

            <h1 className="text-[40px] leading-[44px] font-bold text-[var(--color-black-1)]">
                {restaurant.name}
            </h1>

            <p className="text-[18px] leading-[25.2px] text-[var(--color-gray-2)]">
                {restaurant.description}
            </p>

            <ul className="space-y-2 text-[var(--color-black-2)] text-[16px]">
                <li><strong>⭐ Note :</strong> {restaurant.rating}</li>
                <li><strong>🍽️ Cuisine :</strong> {restaurant.cuisine}</li>
                <li><strong>🚚 Livraison :</strong> {restaurant.deliveryTime}</li>
                <li><strong>📍 Adresse :</strong> {restaurant.address}</li>
            </ul>
        </main>
    )
}
