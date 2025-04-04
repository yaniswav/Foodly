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
        menu: [
            {
                id: 1,
                item_name: "Double Cheese Burger",
                price: 7.90,
                img: "/burger.png",
            },
            {
                id: 2,
                item_name: "Chicken Nuggets (6 pcs)",
                price: 4.50,
                img: "/nuggets.png",
            },
            {
                id: 3,
                item_name: "Frites Classiques",
                price: 2.90,
                img: "/fries.png",
            },
        ],
    },
    "rest-2": {
        name: "Pizza Hut",
        description: "Des pizzas fondantes comme en Italie.",
        image: "/placeholder.svg",
        rating: 4.5,
        cuisine: "Pizza",
        deliveryTime: "20-30 min",
        address: "78 Avenue Napolitaine, Lyon",
        menu: [
            {
                id: 1,
                item_name: "Pizza Margherita",
                price: 9.90,
                img: "/pizza.png",
            },
            {
                id: 2,
                item_name: "Pizza 4 Fromages",
                price: 11.90,
                img: "/pizza4cheese.png",
            },
        ],
    },
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
        <main className="px-6 md:px-16 py-16 space-y-10 max-w-5xl mx-auto">
            {/* 🧾 Détail restaurant */}
            <div className="rounded-xl overflow-hidden shadow-md">
                <Image
                    src={restaurant.image}
                    alt={restaurant.name}
                    width={800}
                    height={400}
                    className="w-full h-64 object-cover"
                />
            </div>

            <div>
                <h1 className="text-[40px] leading-[44px] font-bold text-[var(--color-black-1)]">
                    {restaurant.name}
                </h1>
                <p className="text-[18px] leading-[25.2px] text-[var(--color-gray-2)] mb-2">
                    {restaurant.description}
                </p>
                <ul className="text-[var(--color-black-2)] space-y-1">
                    <li><strong>⭐ Note :</strong> {restaurant.rating}</li>
                    <li><strong>🍽️ Cuisine :</strong> {restaurant.cuisine}</li>
                    <li><strong>🚚 Livraison :</strong> {restaurant.deliveryTime}</li>
                    <li><strong>📍 Adresse :</strong> {restaurant.address}</li>
                </ul>
            </div>

            {/* 🍔 Menu du restaurant */}
            <section>
                <h2 className="text-[32px] leading-[35.2px] font-bold text-[var(--color-black-1)] mb-4">
                    Menu du restaurant
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {restaurant.menu.map((item) => (
                        <div key={item.id} className="bg-white rounded-xl shadow border overflow-hidden">
                            <div className="h-40 w-full relative">
                                <Image
                                    src={item.img}
                                    alt={item.item_name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-4 space-y-1">
                                <h3 className="font-bold text-[var(--color-black-1)]">
                                    {item.item_name}
                                </h3>
                                <p className="text-[var(--color-gray-2)] font-medium">
                                    {item.price.toFixed(2)} €
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}
