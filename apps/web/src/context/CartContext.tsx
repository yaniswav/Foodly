"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"

export type CartItem = {
    item: {
        menu_item_id: number
        item_name: string
        price: string
        restaurant_id_fk: number
    }
    quantity: number
}

type CartContextType = {
    cart: CartItem[]
    addToCart: (item: CartItem["item"]) => void
    removeFromCart: (id: number) => void
    updateQuantity: (id: number, delta: number) => void
    clearCart: () => void
    total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) throw new Error("CartContext must be used within CartProvider")
    return context
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([])

    useEffect(() => {
        const saved = localStorage.getItem("cart")
        if (saved) setCart(JSON.parse(saved))
    }, [])

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

    const addToCart = (item: CartItem["item"]) => {
        setCart((prev) => {
            const existing = prev.find((i) => i.item.menu_item_id === item.menu_item_id)
            if (existing) {
                return prev.map((i) =>
                    i.item.menu_item_id === item.menu_item_id
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                )
            }
            return [...prev, { item, quantity: 1 }]
        })
    }

    const removeFromCart = (id: number) => {
        setCart((prev) => prev.filter((i) => i.item.menu_item_id !== id))
    }

    const updateQuantity = (id: number, delta: number) => {
        setCart((prev) =>
            prev.map((i) =>
                i.item.menu_item_id === id
                    ? { ...i, quantity: Math.max(1, i.quantity + delta) }
                    : i
            )
        )
    }

    const clearCart = () => {
        setCart([])
        localStorage.removeItem("cart")
    }

    const total = cart.reduce((sum, i) => sum + parseFloat(i.item.price) * i.quantity, 0)

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total }}>
            {children}
        </CartContext.Provider>
    )
}
