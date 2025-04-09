"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Clock, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type Order = {
    order_id: number
    total_price: number
    status_delivery: number
    status_restaurants: number
    restaurant_id: number
    created_at: string
}

type Restaurant = {
    restaurant_id: number
    restaurant_name: string
    location: string
    keywords: string
}

export function DashboardHome() {
    const [orders, setOrders] = useState<Order[]>([])
    const [restaurants, setRestaurants] = useState<Restaurant[]>([])
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState<string | null>(null)
    const [userId, setUserId] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        // Only run on client-side
        const storedToken = localStorage.getItem("token")
        const storedUserId = localStorage.getItem("userId")
        if (storedToken && storedUserId) {
            setToken(storedToken)
            setUserId(storedUserId)
        }
    }, [])

    useEffect(() => {
        if (!token || !userId) return

        // Fetch user's orders
        const fetchOrders = async () => {
            try {
                const response = await fetch(`http://localhost:8080/orders/byUserId?id=${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (!response.ok) throw new Error("Failed to fetch orders")

                const data = await response.json()
                setOrders(data)
            } catch (err) {
                setError("Unable to load orders")
                console.error(err)
            }
        }

        // Fetch recommended restaurants
        const fetchRestaurants = async () => {
            try {
                const response = await fetch(`http://localhost:8080/restaurants/research`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        keywords: "popular,recommended",
                        page: 1,
                        limit: 3,
                    }),
                })

                if (!response.ok) throw new Error("Failed to fetch restaurants")

                const data = await response.json()
                setRestaurants(data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchOrders()
        fetchRestaurants()
    }, [token, userId])

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Bienvenue sur Foodly 👋</h1>
                    <p className="text-muted-foreground">Commandez vos plats préférés en quelques clics</p>
                </div>
                <Link
                    href="/restaurants"
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-orange-500 text-white hover:bg-orange-600 px-4 py-2"
                >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Commander maintenant
                </Link>
            </div>

            {/* Recent Orders Section */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Commandes récentes</h2>
                    <Link href="/orders" className="text-sm text-orange-500 hover:underline flex items-center">
                        Voir toutes <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                </div>

                {loading ? (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3].map((i) => (
                            <Card key={i} className="animate-pulse">
                                <CardContent className="p-4">
                                    <div className="h-24 bg-gray-200 rounded-md"></div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : error ? (
                    <Card>
                        <CardContent className="p-6 text-center">
                            <p className="text-red-500">{error}</p>
                        </CardContent>
                    </Card>
                ) : orders.length === 0 ? (
                    <Card>
                        <CardContent className="p-6 text-center">
                            <p className="text-muted-foreground">Vous n'avez pas encore de commandes.</p>
                            <Button
                                className="mt-4 bg-orange-500 hover:bg-orange-600"
                                onClick={() => (window.location.href = "/restaurants")}
                            >
                                Découvrir des restaurants
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {orders.slice(0, 3).map((order, i) => (
                            <motion.div
                                key={order.order_id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: i * 0.1 }}
                            >
                                <Card>
                                    <CardContent className="p-4">
                                        <div className="flex items-start gap-4">
                                            <div className="relative h-16 w-16 overflow-hidden rounded-md bg-gray-200">
                                                <Image
                                                    src="/placeholder.svg?height=64&width=64"
                                                    alt="Restaurant"
                                                    width={64}
                                                    height={64}
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold">Commande #{order.order_id}</h3>
                                                <p className="text-sm text-muted-foreground">Restaurant ID: {order.restaurant_id}</p>
                                                <div className="mt-2 flex items-center justify-between">
                                                    <span className="text-sm font-medium">{order.total_price.toFixed(2)} €</span>
                                                    <span
                                                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                                            order.status_delivery === 1
                                                                ? "bg-yellow-100 text-yellow-800"
                                                                : "bg-green-100 text-green-800"
                                                        }`}
                                                    >
                            {order.status_delivery === 1 ? "En livraison" : "Livrée"}
                          </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex justify-end">
                                            <Button variant="outline" size="sm">
                                                Détails
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Recommended Restaurants */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Restaurants recommandés</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {loading
                        ? [1, 2, 3].map((i) => (
                            <Card key={i} className="animate-pulse">
                                <CardContent className="p-0">
                                    <div className="h-40 bg-gray-200 rounded-t-md"></div>
                                    <div className="p-4 space-y-2">
                                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                        : restaurants.length > 0
                            ? restaurants.map((restaurant, i) => (
                                <motion.div
                                    key={restaurant.restaurant_id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: i * 0.1 }}
                                >
                                    <Card className="overflow-hidden">
                                        <div className="relative h-40 w-full">
                                            <Image
                                                src="/placeholder.svg?height=160&width=320"
                                                alt={restaurant.restaurant_name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <CardContent className="p-4">
                                            <h3 className="font-semibold">{restaurant.restaurant_name}</h3>
                                            <p className="text-sm text-muted-foreground">{restaurant.location}</p>
                                            <div className="mt-2 flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <Clock className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                                                    <span className="text-xs text-muted-foreground">30-45 min</span>
                                                </div>
                                                <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                                                    Commander
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))
                            : [1, 2, 3].map((i) => (
                                <Card key={i}>
                                    <div className="relative h-40 w-full">
                                        <Image
                                            src="/placeholder.svg?height=160&width=320"
                                            alt="Restaurant"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <CardContent className="p-4">
                                        <h3 className="font-semibold">Restaurant exemple {i}</h3>
                                        <p className="text-sm text-muted-foreground">123 rue de Paris</p>
                                        <div className="mt-2 flex items-center justify-between">
                                            <div className="flex items-center">
                                                <Clock className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                                                <span className="text-xs text-muted-foreground">30-45 min</span>
                                            </div>
                                            <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                                                Commander
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                </div>
            </div>
        </div>
    )
}
