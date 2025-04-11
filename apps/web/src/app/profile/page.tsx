"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { getCurrentUser, updateCurrentUser } from "@/lib/api"
import { User, Mail, LogOut, Save } from "lucide-react"

export default function ProfilePage() {
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(true)

    const { logout } = useAuth()
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem("access_token")
        if (!token) return

        getCurrentUser(token)
            .then((data) => {
                setFirstname(data.firstname || "")
                setLastname(data.lastname || "")
                setEmail(data.email || "")
            })
            .catch((err) => console.error("Erreur user:", err))
            .finally(() => setLoading(false))
    }, [])

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        setMessage("")
        const token = localStorage.getItem("access_token")

        try {
            await updateCurrentUser({ firstname, lastname, email }, token!)
            setMessage("✅ Profil mis à jour avec succès")

            setTimeout(() => {
                router.push("/")
            }, 1500)
        } catch (err) {
            console.error(err)
            setMessage("❌ Une erreur est survenue.")
        }
    }

    const handleLogout = () => {
        logout()
        router.push("/")
    }

    if (loading) {
        return (
            <main className="p-10 text-center text-[var(--color-gray-3)]">
                Chargement du profil...
            </main>
        )
    }

    return (
        <main className="px-4 py-10 flex justify-center bg-[var(--color-gray-6)] min-h-screen">
            <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8 space-y-8">
                <h1 className="text-3xl font-bold text-[var(--color-black-1)] text-center">
                    👤 Mon profil
                </h1>

                <form onSubmit={handleUpdate} className="space-y-5">
                    <div>
                        <label className="block mb-1 font-medium text-[var(--color-black-1)]">Prénom</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-gray-3)]" />
                            <input
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-[var(--color-black-1)]">Nom</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-gray-3)]" />
                            <input
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-[var(--color-black-1)]">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-gray-3)]" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-[var(--color-secondary)] text-white font-semibold py-3 rounded-full hover:brightness-110 transition cursor-pointer"
                    >
                        <Save className="w-5 h-5" />
                        Sauvegarder
                    </button>
                </form>

                {message && (
                    <p className="text-center mt-2 text-sm font-medium text-[var(--color-black-2)]">
                        {message}
                    </p>
                )}

                <hr className="my-6" />

                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 bg-[var(--color-gray-4)] text-black font-semibold py-3 rounded-full hover:brightness-95 transition cursor-pointer"
                >
                    <LogOut className="w-5 h-5" />
                    Se déconnecter
                </button>
            </div>
        </main>
    )
}
