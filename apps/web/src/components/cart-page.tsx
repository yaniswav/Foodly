"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Trash2, ShoppingBag, Plus, Minus, AlertCircle } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"

interface CartItem {
    id: number
    menu_item_id: number
    quantity: number
    name: string
    price: number
    image: string
}

export function CartPage() {
    const router = useRouter()
    const { toast } = useToast()
    const [mounted, setMounted] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (!mounted) return

        const token = localStorage.getItem("token")

        if (!token) {
            setIsAuthenticated(false)
            setIsLoading(false)
            return
        }

        setIsAuthenticated(true)

        const fetchCart = async () => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 1000))

                const mockCartItems: CartItem[] = [
                    {
                        id: 1,
                        menu_item_id: 101,
                        quantity: 2,
                        name: "Whopper Burger",
                        price: 8.99,
                        image: "/placeholder.svg?height=80&width=80",
                    },
                    {
                        id: 2,
                        menu_item_id: 102,
                        quantity: 1,
                        name: "Chicken Nuggets (10pc)",
                        price: 5.99,
                        image: "/placeholder.svg?height=80&width=80",
                    },
                    {
                        id: 3,
                        menu_item_id: 103,
                        quantity: 1,
                        name: "Large Fries",
                        price: 3.49,
                        image: "/placeholder.svg?height=80&width=80",
                    },
                ]

                setCartItems(mockCartItems)
            } catch (error) {
                toast({
                    title: "Erreur",
                    description: "Impossible de charger le panier",
                    variant: "destructive",
                })
            } finally {
                setIsLoading(false)
            }
        }

        fetchCart()
    }, [mounted, toast])

    if (!mounted) return null

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const updateQuantity = (id: number, newQty: number) => {
        if (newQty < 1) return
        setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQty } : item)))
        toast({
            title: "Panier mis à jour",
            description: "Quantité modifiée.",
            className: "bg-amber-50 border-amber-200",
        })
    }

    const removeItem = (id: number) => {
        setCartItems((items) => items.filter((item) => item.id !== id))
        toast({
            title: "Article supprimé",
            description: "Retiré du panier.",
            className: "bg-amber-50 border-amber-200",
        })
    }

    const handleProceedToPayment = () => {
        router.push("/payment")
    }

    if (!isAuthenticated && !isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <Card className="w-full max-w-md">
                        <CardHeader className="text-center">
                            <CardTitle className="text-xl">Authentification requise</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center gap-4 text-center">
                            <AlertCircle className="h-12 w-12 text-amber-500" />
                            <p className="text-muted-foreground">Veuillez vous connecter pour consulter votre panier.</p>
                        </CardContent>
                        <CardFooter className="flex justify-center">
                            <Button className="bg-orange-500 text-white hover:bg-orange-600" onClick={() => router.push("/login")}>
                                Se connecter
                            </Button>
                        </CardFooter>
                    </Card>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Votre panier</h1>
                <p className="text-muted-foreground">Vérifiez vos articles avant de commander</p>
            </div>

            {isLoading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <Card key={i}>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-4">
                                    <Skeleton className="h-20 w-20 rounded-md" />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-4 w-1/3" />
                                        <Skeleton className="h-4 w-1/4" />
                                    </div>
                                    <Skeleton className="h-8 w-24" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : cartItems.length === 0 ? (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                            <ShoppingBag className="mb-4 h-12 w-12 text-amber-500" />
                            <h3 className="mb-2 text-xl font-semibold">Panier vide</h3>
                            <p className="mb-6 text-muted-foreground">Ajoutez des articles pour finaliser votre commande.</p>
                            <Button
                                className="bg-orange-500 text-white hover:bg-orange-600"
                                onClick={() => router.push("/restaurants")}
                            >
                                Voir les restaurants
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            ) : (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <div className="space-y-4">
                        <AnimatePresence>
                            {cartItems.map((item) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Card>
                                        <CardContent className="p-4">
                                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative h-20 w-20 overflow-hidden rounded-md">
                                                        <Image
                                                            src={item.image || "/placeholder.svg"}
                                                            alt={item.name}
                                                            width={80}
                                                            height={80}
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold">{item.name}</h3>
                                                        <p className="text-sm text-muted-foreground">{item.price.toFixed(2)} €</p>
                                                    </div>
                                                </div>
                                                <div className="ml-auto flex flex-col gap-2 sm:flex-row sm:items-center">
                                                    <div className="flex items-center">
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="h-8 w-8 rounded-r-none"
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            <Minus className="h-3 w-3" />
                                                        </Button>
                                                        <div className="flex h-8 w-10 items-center justify-center border-y text-sm">
                                                            {item.quantity}
                                                        </div>
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="h-8 w-8 rounded-l-none"
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        >
                                                            <Plus className="h-3 w-3" />
                                                        </Button>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="ml-4 font-medium">{(item.price * item.quantity).toFixed(2)} €</span>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="text-red-500 hover:bg-red-50 hover:text-red-600"
                                                            onClick={() => removeItem(item.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        <Card>
                            <CardContent className="p-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between border-b pb-2">
                                        <span className="font-medium">Sous-total</span>
                                        <span>{totalPrice.toFixed(2)} €</span>
                                    </div>
                                    <div className="flex justify-between border-b pb-2">
                                        <span className="font-medium">Frais de livraison</span>
                                        <span>2.99 €</span>
                                    </div>
                                    <div className="flex justify-between pt-2">
                                        <span className="text-lg font-bold">Total</span>
                                        <span className="text-lg font-bold">{(totalPrice + 2.99).toFixed(2)} €</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    className="w-full bg-orange-500 text-white hover:bg-orange-600"
                                    onClick={handleProceedToPayment}
                                >
                                    Procéder au paiement
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </motion.div>
            )}
        </div>
    )
}
