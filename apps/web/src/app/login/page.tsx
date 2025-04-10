"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { login } from "@/lib/api"
import { motion } from "framer-motion"

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
    const [loading, setLoading] = useState(false)

    const validate = () => {
        const newErrors: { email?: string; password?: string } = {}
        if (!email.trim()) newErrors.email = "Email requis"
        if (!password.trim()) newErrors.password = "Mot de passe requis"
        return newErrors
    }

    const handleLogin = async () => {
        const validationErrors = validate()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        setLoading(true)
        setMessage("")
        try {
            const response = await login(email, password)
            const token = response.access_token

            if (!token) {
                setMessage("❌ Identifiants incorrects.")
                setLoading(false)
                return
            }

            localStorage.setItem("access_token", token)
            setMessage("✅ Connexion réussie ! Redirection...")

            setTimeout(() => {
                router.push("/")
            }, 1500)
        } catch (err) {
            console.error("Erreur lors de la connexion :", err)
            setMessage("❌ Identifiants incorrects.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="min-h-screen flex items-start justify-center bg-[var(--color-gray-6)] pt-32 px-4">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-md bg-white p-10 rounded-2xl shadow-2xl space-y-6"
            >
                <h1 className="text-3xl font-bold text-center text-[var(--color-black-1)]">Connexion</h1>
                <p className="text-[var(--color-gray-2)] text-center text-base">
                    Connecte-toi pour accéder à ton espace personnel.
                </p>

                <div className="space-y-4">
                    <div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                                setErrors((prev) => ({ ...prev, email: "" }))
                            }}
                            placeholder="Adresse email"
                            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                                errors.email
                                    ? "border-[var(--color-error)] ring-[var(--color-error)]"
                                    : "border-gray-300 focus:ring-[var(--color-secondary)]"
                            }`}
                        />
                        {errors.email && (
                            <p className="text-sm text-[var(--color-error)] mt-1">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                                setErrors((prev) => ({ ...prev, password: "" }))
                            }}
                            placeholder="Mot de passe"
                            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                                errors.password
                                    ? "border-[var(--color-error)] ring-[var(--color-error)]"
                                    : "border-gray-300 focus:ring-[var(--color-secondary)]"
                            }`}
                        />
                        {errors.password && (
                            <p className="text-sm text-[var(--color-error)] mt-1">{errors.password}</p>
                        )}
                    </div>

                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        className={`w-full bg-[var(--color-secondary)] text-white font-semibold py-3 rounded-full transition cursor-pointer hover:brightness-110 ${
                            loading && "opacity-50 cursor-not-allowed"
                        }`}
                    >
                        {loading ? "Connexion..." : "Se connecter"}
                    </button>
                </div>

                {message && (
                    <p className="mt-4 text-center text-sm font-medium text-[var(--color-black-2)]">{message}</p>
                )}

                <div className="text-center text-sm text-[var(--color-gray-3)] pt-2">
                    Pas encore de compte ?{" "}
                    <span
                        onClick={() => router.push("/register")}
                        className="text-[var(--color-secondary)] font-semibold hover:underline cursor-pointer"
                    >
                        Créer un compte
                    </span>
                </div>
            </motion.div>
        </main>
    )
}
