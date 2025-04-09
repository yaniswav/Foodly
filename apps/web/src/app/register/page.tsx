"use client"

import { useState } from "react"
import { registerUser } from "@/lib/api"
import { useRouter } from "next/navigation"

export default function SimpleRegisterPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        sponsorship_code: "",
        role: 0, // 0 = client
    })

    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setMessage("")
        setLoading(true)
        try {
            await registerUser(formData)
            setMessage("✅ Inscription réussie ! Redirection...")
            setTimeout(() => router.push("/login"), 1500)
        } catch (err: any) {
            console.error(err)
            setMessage("❌ Une erreur est survenue.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="max-w-md mx-auto mt-10 p-6 border rounded-xl bg-white shadow space-y-6">
            <h1 className="text-3xl font-bold text-[var(--color-black-1)]">Créer un compte</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="firstname"
                    placeholder="Prénom"
                    value={formData.firstname}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-md"
                />
                <input
                    type="text"
                    name="lastname"
                    placeholder="Nom"
                    value={formData.lastname}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-md"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-md"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-md"
                />
                <input
                    type="text"
                    name="sponsorship_code"
                    placeholder="Code de parrainage (facultatif)"
                    value={formData.sponsorship_code}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-md"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[var(--color-secondary)] text-white py-3 rounded-md font-semibold hover:brightness-110 transition"
                >
                    {loading ? "Création du compte..." : "Créer un compte"}
                </button>
            </form>

            {message && <p className="text-sm text-center">{message}</p>}
        </main>
    )
}
