"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const res = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            })

            if (!res.ok) {
                const msg = await res.text()
                throw new Error(msg || "Identifiants incorrects")
            }

            const data = await res.json()
            console.log("✅ Réponse backend :", data)


            localStorage.setItem("access_token", data.access_token)


            router.push("/")

        } catch (err: any) {
            console.error("Erreur login :", err)
            setError(err.message || "Erreur inconnue")
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center px-6">
            <form
                onSubmit={handleLogin}
                className="bg-white shadow-md rounded-xl p-8 max-w-md w-full space-y-6 border border-gray-200"
            >
                <h1 className="text-2xl font-bold text-center text-[var(--color-secondary)]">
                    Connexion
                </h1>

                {error && (
                    <p className="text-sm text-[var(--color-error)] text-center">
                        {error}
                    </p>
                )}

                <div className="flex flex-col space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <label htmlFor="password" className="text-sm font-medium text-gray-700">
                        Mot de passe
                    </label>
                    <input
                        type="password"
                        id="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[var(--color-secondary)] text-white font-semibold py-2 px-4 rounded-md hover:bg-opacity-90 transition"
                >
                    {loading ? "Connexion..." : "Se connecter"}
                </button>
            </form>
        </main>
    )
}
