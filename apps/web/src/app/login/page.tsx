"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { login } from "@/lib/api"

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    const handleLogin = async () => {
        try {
            const response = await login(email, password)
            const token = response.access_token

            if (!token) {
                setMessage("❌ Échec de la connexion.")
                return
            }

            localStorage.setItem("access_token", token)
            setMessage("✅ Connexion réussie !")
            router.push("/")
        } catch (err) {
            console.error("Erreur lors de la connexion :", err)
            setMessage("❌ Identifiants incorrects.")
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-[var(--color-gray-6)] px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-[var(--color-black-1)]">
                    Connexion
                </h1>

                <div className="space-y-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Adresse email"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mot de passe"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                    />
                    <button
                        onClick={handleLogin}
                        className="w-full bg-[var(--color-secondary)] text-white font-semibold py-3 rounded-full hover:brightness-110 transition cursor-pointer"
                    >
                        Se connecter
                    </button>
                </div>

                {message && (
                    <p className="mt-4 text-center text-sm font-medium text-[var(--color-black-2)]">{message}</p>
                )}

                <div className="mt-6 text-center text-sm text-[var(--color-gray-3)]">
                    Pas encore de compte ?{" "}
                    <span
                        className="text-[var(--color-secondary)] font-semibold hover:underline cursor-pointer"
                        onClick={() => router.push("/register")}
                    >Créer un compte
                    </span>
                </div>
            </div>
        </main>
    )
}