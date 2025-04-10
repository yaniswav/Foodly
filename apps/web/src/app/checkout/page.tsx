"use client"

import { useCart } from "@/context/CartContext"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { createOrder } from "@/lib/api"
import { CreditCard, HandCoins, ShoppingCart, MapPin } from "lucide-react"

const paymentMethods = [
    { value: "card", label: "Carte" },
    { value: "cash", label: "Espèces" }
]

export default function CheckoutPage() {
    const { cart, total } = useCart()
    const router = useRouter()

    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [zip, setZip] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("cash")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage("")

        try {
            const token = localStorage.getItem("access_token")
            const user_id = localStorage.getItem("user_id") || "demo-user"
            const restaurant_id = cart[0]?.item.restaurant_id_fk

            const payload = {
                user_id,
                restaurant_id,
                delivery_id: "null",
                status_restorant: "pending",
                status_delivery: "pending",
                total_price: total,
                created_at: new Date().toISOString(),
                address: {
                    address,
                    city,
                    zip,
                },
                payment: {
                    amout: total,
                    payment_method: paymentMethod,
                    status: "pending",
                },
                items: cart.map(({ item, quantity }) => ({
                    title: item.item_name,
                    price: parseFloat(item.price),
                    quantity,
                })),
            }

            const res = await createOrder(payload, token!)
            console.log("✅ Commande envoyée avec succès :", res)

            setMessage("✅ Commande enregistrée ! Redirection...")
            setTimeout(() => router.push("/"), 2000)
        } catch (err) {
            console.error("❌ Erreur création commande :", err)
            setMessage("❌ Une erreur est survenue.")
        } finally {
            setLoading(false)
        }
    }

    if (cart.length === 0) {
        return (
            <main className="p-10 text-center text-[var(--color-gray-3)]">
                Votre panier est vide.
            </main>
        )
    }

    return (
        <motion.main
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="px-6 py-10 max-w-3xl mx-auto bg-white rounded-xl shadow-lg space-y-8 mt-10"
        >
            {/* 🛒 RÉCAP */}
            <h2 className="text-xl font-bold text-[var(--color-black-1)] flex items-center gap-2 mb-4">
                <ShoppingCart className="w-5 h-5" />
                Votre commande
            </h2>

            <div className="space-y-4">
                {cart.map(({ item, quantity }) => (
                    <div key={item.menu_item_id} className="flex items-center gap-4 border-b pb-4">
                        <img
                            src={`/${item.item_name.replace(/\s+/g, "_")}.png`}
                            alt={item.item_name}
                            onError={(e) => {
                                const img = e.currentTarget as HTMLImageElement
                                img.src = "/placeholder.png"
                            }}
                            className="w-16 h-16 rounded-md object-cover bg-[var(--color-gray-4)]"
                        />
                        <div className="flex-1">
                            <p className="font-medium text-[var(--color-black-1)]">{item.item_name}</p>
                            <p className="text-sm text-[var(--color-gray-3)]">
                                {quantity} × {parseFloat(item.price).toFixed(2)} €
                            </p>
                        </div>
                        <p className="font-semibold">
                            {(quantity * parseFloat(item.price)).toFixed(2)} €
                        </p>
                    </div>
                ))}

                <div className="flex justify-between pt-4 font-bold text-lg border-t">
                    <span>Total</span>
                    <span>{total.toFixed(2)} €</span>
                </div>
            </div>

            {/* 📍 ADRESSE */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-xl font-bold text-[var(--color-black-1)] flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Adresse de livraison
                </h2>

                <div className="space-y-3">
                    <input
                        type="text"
                        placeholder="Adresse complète"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                    />
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="text"
                            placeholder="Code postal"
                            value={zip}
                            onChange={(e) => setZip(e.target.value)}
                            required
                            className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                        />
                        <input
                            type="text"
                            placeholder="Ville"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                            className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                        />
                    </div>
                </div>

                {/* 💳 PAIEMENT */}
                <h2 className="text-xl font-bold text-[var(--color-black-1)] flex items-center gap-2">
                    💳 Mode de paiement
                </h2>

                <div className="flex flex-col sm:flex-row gap-4">
                    {paymentMethods.map((method) => (
                        <label
                            key={method.value}
                            className={`flex-1 flex justify-between items-center px-5 py-4 rounded-lg text-base font-medium cursor-pointer transition border-2 ${
                                paymentMethod === method.value
                                    ? "border-[var(--color-secondary)]"
                                    : "border-gray-300 hover:border-[var(--color-secondary)]"
                            }`}
                        >
                            <div className="flex items-center gap-3 text-[var(--color-black-1)]">
                                {method.value === "card" ? (
                                    <CreditCard className="w-5 h-5" />
                                ) : (
                                    <HandCoins className="w-5 h-5" />
                                )}
                                <span>{method.label}</span>
                            </div>

                            <input
                                type="radio"
                                name="payment"
                                value={method.value}
                                checked={paymentMethod === method.value}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="hidden"
                            />
                        </label>
                    ))}
                </div>

                {/* ✅ BOUTON */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-4 bg-[var(--color-secondary)] text-white py-3 rounded-full font-semibold hover:brightness-110 transition cursor-pointer"
                >
                    {loading ? "Validation..." : "Valider la commande"}
                </button>

                {message && (
                    <p className="text-center font-medium text-[var(--color-black-2)] mt-2">{message}</p>
                )}
            </form>
        </motion.main>
    )
}
