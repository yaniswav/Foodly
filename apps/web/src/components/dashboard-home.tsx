"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, ShoppingBag, TrendingUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function DashboardHome() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Welcome back, John!</h1>
                    <p className="text-muted-foreground">Here's what's happening with your orders today.</p>
                </div>
                <Button className="bg-black text-white hover:bg-gray-800">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Order Now
                </Button>
            </div>

            {/* Active Order */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Active Order</CardTitle>
                        <CardDescription>Track your current order</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-4 md:flex-row md:items-center">
                            <div className="flex items-center gap-4">
                                <div className="relative h-16 w-16 overflow-hidden rounded-md">
                                    <Image
                                        src="/placeholder.svg?height=64&width=64"
                                        alt="Restaurant"
                                        width={64}
                                        height={64}
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Burger King</h3>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Clock className="h-3.5 w-3.5" />
                                        <span>Estimated delivery: 25-35 min</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <MapPin className="h-3.5 w-3.5" />
                                        <span>1.2 miles away</span>
                                    </div>
                                </div>
                            </div>

                            <div className="ml-auto flex-1 md:max-w-xs">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Order status:</span>
                                        <span className="font-medium text-amber-600">On the way</span>
                                    </div>
                                    <div className="overflow-hidden rounded-full bg-gray-200">
                                        <div className="h-2 w-3/4 rounded-full bg-amber-500" />
                                    </div>
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                        <span>Confirmed</span>
                                        <span>Preparing</span>
                                        <span className="font-medium text-amber-600">On the way</span>
                                        <span>Delivered</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Recent Orders */}
            <div>
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Recent Orders</h2>
                    <Link href="/dashboard/my-orders" className="text-sm font-medium text-amber-600 hover:underline">
                        View all
                    </Link>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.1 }}
                        >
                            <Card>
                                <CardContent className="p-4">
                                    <div className="flex items-start gap-4">
                                        <div className="relative h-16 w-16 overflow-hidden rounded-md">
                                            <Image
                                                src="/placeholder.svg?height=64&width=64"
                                                alt="Restaurant"
                                                width={64}
                                                height={64}
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold">{i === 1 ? "McDonald's" : i === 2 ? "Pizza Hut" : "KFC"}</h3>
                                            <p className="text-sm text-muted-foreground">
                                                {i === 1 ? "Big Mac Meal" : i === 2 ? "Pepperoni Pizza" : "Chicken Bucket"}
                                            </p>
                                            <div className="mt-2 flex items-center justify-between">
                        <span className="text-sm font-medium">
                          ${i === 1 ? "12.99" : i === 2 ? "18.50" : "24.99"}
                        </span>
                                                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                          Delivered
                        </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex justify-end">
                                        <Button variant="outline" size="sm">
                                            Reorder
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Recommended Restaurants */}
            <div>
                <h2 className="mb-4 text-xl font-semibold">Recommended For You</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.1 }}
                        >
                            <Card className="overflow-hidden">
                                <div className="relative h-40 w-full">
                                    <Image src="/placeholder.svg?height=160&width=320" alt="Restaurant" fill className="object-cover" />
                                </div>
                                <CardContent className="p-4">
                                    <div>
                                        <h3 className="font-semibold">{i === 1 ? "Taco Bell" : i === 2 ? "Subway" : "Domino's"}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            {i === 1 ? "Mexican • 1.5 mi" : i === 2 ? "Sandwiches • 0.8 mi" : "Pizza • 2.1 mi"}
                                        </p>
                                        <div className="mt-2 flex items-center gap-1">
                                            <TrendingUp className="h-4 w-4 text-amber-500" />
                                            <span className="text-xs">Popular in your area</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
