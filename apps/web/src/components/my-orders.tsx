"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import Image from "next/image"

type Order = {
    order_id: number
    restaurant_id: number
    total_price: number
    created_at: string
    status_delivery: number // 0 = delivered, 1 = in progress
    items?: string[] // to map if available
}

export function MyOrders() {
    const [token, setToken] = useState<string | null | undefined>(undefined)
    const [userId, setUserId] = useState<string | null | undefined>(undefined)
    const [orders, setOrders] = useState<Order[]>([])
    const [activeTab, setActiveTab] = useState("all")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const t = localStorage.getItem("token")
        const uid = localStorage.getItem("userId")

        setToken(t)
        setUserId(uid)
    }, [])

    useEffect(() => {
        if (!token || !userId) return

        fetch(`http://localhost:8080/orders/byUserId?id=${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setOrders(data)
            })
            .catch((err) => console.error("Error fetching orders:", err))
            .finally(() => setLoading(false))
    }, [token, userId])

    if (token === undefined || userId === undefined) return null

    if (!token || !userId) {
        return (
            <div className="p-6 rounded-xl bg-red-50 border border-red-200 text-red-800 space-y-4 max-w-md mx-auto mt-10 shadow">
                <h2 className="text-lg font-semibold">Vous devez être connecté</h2>
                <p>
                    Cette page est réservée aux utilisateurs connectés. Veuillez vous authentifier pour consulter vos commandes.
                </p>
                <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={() => (window.location.href = "/login")}>
                    Se connecter
                </Button>
            </div>
        )
    }

    const filteredOrders =
        activeTab === "all"
            ? orders
            : orders.filter((order) => (activeTab === "active" ? order.status_delivery === 1 : order.status_delivery === 0))

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Mes commandes</h1>
                <p className="text-muted-foreground">Consultez votre historique de commandes</p>
            </div>

            <Tabs defaultValue="all" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3 md:w-auto">
                    <TabsTrigger value="all">Toutes</TabsTrigger>
                    <TabsTrigger value="active">En cours</TabsTrigger>
                    <TabsTrigger value="delivered">Livrées</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="mt-4">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg">
                                {activeTab === "all"
                                    ? "Toutes les commandes"
                                    : activeTab === "active"
                                        ? "Commandes en cours"
                                        : "Commandes livrées"}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {loading ? (
                                    <p className="text-center text-muted-foreground py-4">Chargement...</p>
                                ) : filteredOrders.length === 0 ? (
                                    <p className="text-center text-muted-foreground py-4">Aucune commande trouvée</p>
                                ) : (
                                    filteredOrders.map((order, index) => (
                                        <motion.div
                                            key={order.order_id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                        >
                                            <Card>
                                                <CardContent className="p-4">
                                                    <div className="flex flex-col gap-4 md:flex-row md:items-center">
                                                        <div className="flex items-center gap-4">
                                                            <div className="relative h-20 w-20 overflow-hidden rounded-md">
                                                                <Image
                                                                    src="/placeholder.svg?height=80&width=80"
                                                                    alt="Restaurant"
                                                                    width={80}
                                                                    height={80}
                                                                    className="object-cover"
                                                                />
                                                            </div>
                                                            <div>
                                                                <h3 className="font-semibold">Restaurant #{order.restaurant_id}</h3>
                                                                <p className="text-sm text-muted-foreground">Total : {order.total_price} €</p>
                                                                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                                                                    <Calendar className="h-3.5 w-3.5" />
                                                                    <span>{new Date(order.created_at).toLocaleString("fr-FR")}</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="ml-auto flex flex-col items-end gap-2">
                                                            <span className="font-medium">{order.total_price.toFixed(2)} €</span>
                                                            <span
                                                                className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                                                    order.status_delivery === 0
                                                                        ? "bg-green-100 text-green-800"
                                                                        : "bg-amber-100 text-amber-800"
                                                                }`}
                                                            >
                                {order.status_delivery === 0 ? "Livrée" : "En cours"}
                              </span>
                                                            <Button variant="outline" size="sm">
                                                                Recommander
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
