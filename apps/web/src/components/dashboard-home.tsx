"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, ShoppingBag, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Order = {
    order_id: number;
    total_price: number;
    status_delivery: number;
    status_restaurants: number;
    restaurant_id: number;
    created_at: string;
};

export function DashboardHome() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId"); // à stocker au login

        if (!token || !userId) {
            console.warn("Token ou userId manquant");
            return;
        }

        fetch(`http://localhost:8080/orders/byUserId?id=${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setOrders(data);
            })
            .catch((err) => {
                console.error("Erreur de récupération des commandes :", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Bienvenue 👋</h1>
                    <p className="text-muted-foreground">Voici vos dernières commandes</p>
                </div>
                <Button className="bg-black text-white hover:bg-gray-800">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Commander maintenant
                </Button>
            </div>

            {/* Bloc des commandes */}
            {loading ? (
                <p>Chargement des commandes...</p>
            ) : orders.length === 0 ? (
                <p className="text-sm text-muted-foreground">Aucune commande trouvée</p>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {orders.map((order, i) => (
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
                                            <p className="text-sm text-muted-foreground">
                                                Restaurant ID : {order.restaurant_id}
                                            </p>
                                            <div className="mt-2 flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {order.total_price} €
                        </span>
                                                <span
                                                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                                        order.status_delivery === 1
                                                            ? "bg-yellow-100 text-yellow-800"
                                                            : "bg-green-100 text-green-800"
                                                    }`}
                                                >
                          {order.status_delivery === 1
                              ? "En livraison"
                              : "Livrée"}
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
    );
}
