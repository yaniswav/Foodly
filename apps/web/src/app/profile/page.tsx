"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"


export default function ProfilePage() {
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")

    const [token, setToken] = useState("")

    useEffect(() => {
        const t = localStorage.getItem("access_token")
        if (t) {
            setToken(t)

            // Tentative de fetch si on a un ID en local (facultatif)
            const userId = localStorage.getItem("user_id")
            if (userId) {
                fetch(`http://localhost:8080/users?id=${userId}`, {
                    headers: {
                        Authorization: `Bearer ${t}`
                    }
                })
                    .then((res) => res.json())
                    .then((data) => {
                        setFirstname(data.firstname || "")
                        setLastname(data.lastname || "")
                        setEmail(data.email || "")
                    })
                    .catch((err) => console.error("Erreur user:", err))
            }
        }
    }, [])

    const router = useRouter()

    const { logout } = useAuth()

    const handleLogout = () => {
        logout()
        router.push("/")
    }


    return (
        <main className="max-w-xl mx-auto px-6 py-10 space-y-6">
            <h1 className="text-3xl font-bold text-[var(--color-black-1)]">👤 Mon profil</h1>

            <div className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Prénom</label>
                    <input
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        className="w-full p-3 border rounded-md"
                        placeholder="Non renseigné"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Nom</label>
                    <input
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        className="w-full p-3 border rounded-md"
                        placeholder="Non renseigné"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Email</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border rounded-md"
                        placeholder="Non renseigné"
                    />
                </div>

                <div className="pt-6">
                    <button
                        onClick={handleLogout}
                        className="w-full bg-[var(--color-gray-4)] text-black font-semibold py-3 rounded-md hover:brightness-95 transition"
                    >
                        Se déconnecter
                    </button>
                </div>
            </div>
        </main>
    )
}
