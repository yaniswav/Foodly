"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState("bob88@gmail.com")
    const [password, setPassword] = useState("mdp")
    const [error, setError] = useState("")

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        try {
            const res = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            })

            if (!res.ok) {
                const msg = await res.text()
                throw new Error(msg || "Identifiants incorrects.")
            }

            const result = await res.json()
            console.log("Réponse backend :", result)

            const token = result?.access_tocken //TEMPORAIRE
            if (!token) {
                throw new Error("Aucun token reçu.")
            }

            localStorage.setItem("access_token", token)
            router.push("/restaurant")
        } catch (err: any) {
            setError(err.message || "Erreur lors de la connexion.")
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <form
                onSubmit={handleLogin}
                className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md space-y-6"
            >
                <h1 className="text-2xl font-bold text-center">Connexion</h1>

                <div>
                    <label className="block mb-1 font-medium">Email</label>
                    <input
                        type="email"
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Mot de passe</label>
                    <input
                        type="password"
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {error && (
                    <p className="text-red-500 text-sm text-center">{error}</p>
                )}

                <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-amber-500 text-white font-semibold hover:bg-amber-600 transition"
                >
                    Se connecter
                </button>
            </form>
        </main>
    )
}
