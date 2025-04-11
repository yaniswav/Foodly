"use client"

import { useCart } from "@/context/CartContext"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Plus, Minus, X, ShoppingCart, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function CartFloatingPanel() {
    const { cart, removeFromCart, updateQuantity, total } = useCart()
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)

    const toggleCart = () => setIsOpen((prev) => !prev)
    const itemCount = cart.reduce((sum, i) => sum + i.quantity, 0)

    if (cart.length === 0) return null

    return (
        <>
            {/* ✅ BOUTON FLOTTANT RÉDUIT */}
            {!isOpen && (
                <button
                    onClick={toggleCart}
                    className="fixed bottom-6 right-6 bg-[var(--color-tertiary)] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-xl z-50 cursor-pointer"
                    title="Voir le panier"
                >
                    <div className="relative">
                        <ShoppingCart className="w-6 h-6" />
                        {itemCount > 0 && (
                            <span className="absolute -top-2 -right-3 text-xs bg-white text-[var(--color-tertiary)] font-bold rounded-full px-2 py-[2px] shadow">
                                {itemCount}
                            </span>
                        )}
                    </div>
                </button>
            )}

            {/* ✅ PANIER ANIMÉ */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed bottom-0 left-0 right-0 md:right-10 md:bottom-10 md:left-auto md:w-96 bg-white border shadow-2xl rounded-t-2xl md:rounded-xl p-6 space-y-4 z-50"
                    >
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold text-[var(--color-black-1)]">🛒 Panier</h3>
                            <button
                                onClick={toggleCart}
                                className="text-[var(--color-gray-3)] hover:text-[var(--color-black-2)] cursor-pointer"
                                title="Réduire le panier"
                            >
                                <ChevronDown size={22} />
                            </button>
                        </div>

                        {cart.map(({ item, quantity }) => (
                            <div key={item.menu_item_id} className="flex justify-between items-center gap-2">
                                <div>
                                    <p className="font-medium text-[var(--color-black-1)]">{item.item_name}</p>
                                    <p className="text-sm text-[var(--color-gray-3)]">
                                        {(parseFloat(item.price) * quantity).toFixed(2)} €
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => updateQuantity(item.menu_item_id, -1)}
                                        className="p-1 border rounded hover:bg-[var(--color-gray-5)] cursor-pointer"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span>{quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.menu_item_id, 1)}
                                        className="p-1 border rounded hover:bg-[var(--color-gray-5)] cursor-pointer"
                                    >
                                        <Plus size={16} />
                                    </button>
                                    <button
                                        onClick={() => removeFromCart(item.menu_item_id)}
                                        className="p-1 text-[var(--color-error)] hover:bg-[var(--color-gray-5)] rounded cursor-pointer"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}

                        <div className="flex justify-between font-semibold border-t pt-4">
                            <span>Total</span>
                            <span>{total.toFixed(2)} €</span>
                        </div>

                        <button
                            onClick={() => router.push("/checkout")}
                            className="w-full mt-2 bg-[var(--color-secondary)] text-white py-3 rounded-full font-semibold hover:brightness-110 transition cursor-pointer"
                        >
                            Commander
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
