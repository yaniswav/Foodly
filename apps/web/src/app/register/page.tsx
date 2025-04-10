"use client"

import { useState } from "react"
import { registerUser } from "@/lib/api"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { User, UtensilsCrossed, Truck } from "lucide-react"

export default function RegisterPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        sponsorship_code: "",
        role: 0,
        restaurant_name: "",
        location: "",
        keywords: "",
        siret: "",
        vehicle: "",
    })

    const [errors, setErrors] = useState<Record<string, string>>({})
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleRoleSelect = (role: number) => {
        setFormData((prev) => ({ ...prev, role }))
    }

    const validate = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.firstname) newErrors.firstname = "Prénom requis"
        if (!formData.lastname) newErrors.lastname = "Nom requis"
        if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = "Email invalide"
        if (formData.password.length < 3) newErrors.password = "3 caractères minimum"

        if (formData.role === 1) {
            if (!formData.restaurant_name) newErrors.restaurant_name = "Nom du restaurant requis"
            if (!formData.location) newErrors.location = "Adresse requise"
            if (!formData.keywords) newErrors.keywords = "Mots-clés requis"
            if (!formData.siret) newErrors.siret = "SIRET requis"
        }

        return newErrors
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const validationErrors = validate()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        setLoading(true)
        setMessage("")
        try {
            await registerUser(formData)
            setMessage("✅ Inscription réussie ! Redirection...")
            setTimeout(() => router.push("/login"), 1500)
        } catch (err) {
            console.error(err)
            setMessage("❌ Erreur : Ce compte existe déjà.")
        } finally {
            setLoading(false)
        }
    }

    const RoleButton = ({ label, icon, index }: { label: string; icon: any; index: number }) => (
        <button
            type="button"
            onClick={() => handleRoleSelect(index)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-sm font-medium rounded-md transition cursor-pointer
                ${
                formData.role === index
                    ? "bg-[var(--color-secondary)] text-white shadow-md"
                    : "bg-white text-[var(--color-black-2)] border border-gray-300 hover:bg-[var(--color-gray-5)]"
            }`}
        >
            {icon}
            {label}
        </button>
    )

    return (
        <main className="min-h-screen flex items-start justify-center bg-[var(--color-gray-6)] pt-24 px-4">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-md bg-white p-10 rounded-2xl shadow-2xl space-y-6"
            >
                <h1 className="text-3xl font-bold text-center text-[var(--color-black-1)]">Créer un compte</h1>
                <p className="text-[var(--color-gray-2)] text-center text-base">
                    Rejoins la plateforme Foodly dès maintenant 🍽️
                </p>

                {/* Boutons de sélection de rôle */}
                <div className="flex flex-col sm:flex-row justify-between gap-2">
                <RoleButton label="Client" icon={<User size={18} />} index={0} />
                    <RoleButton label="Restaurateur" icon={<UtensilsCrossed size={18} />} index={1} />
                    <RoleButton label="Livreur" icon={<Truck size={18} />} index={2} />
                </div>

                {/* Formulaire */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {["firstname", "lastname", "email", "password"].map((field) => (
                        <div key={field}>
                            <input
                                type={field === "password" ? "password" : "text"}
                                name={field}
                                placeholder={
                                    field === "firstname"
                                        ? "Prénom"
                                        : field === "lastname"
                                            ? "Nom"
                                            : field === "email"
                                                ? "Email"
                                                : "Mot de passe"
                                }
                                value={formData[field as keyof typeof formData]}
                                onChange={handleChange}
                                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                                    errors[field]
                                        ? "border-[var(--color-error)] ring-[var(--color-error)]"
                                        : "border-gray-300 focus:ring-[var(--color-secondary)]"
                                }`}
                            />
                            {errors[field] && <p className="text-sm text-[var(--color-error)]">{errors[field]}</p>}
                        </div>
                    ))}

                    {/* Champs pour restaurateur */}
                    <AnimatePresence>
                        {formData.role === 1 && (
                            <>
                                {["restaurant_name", "location", "keywords", "siret"].map((field) => (
                                    <motion.div
                                        key={field}
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <input
                                            type="text"
                                            name={field}
                                            placeholder={
                                                field === "restaurant_name"
                                                    ? "Nom du restaurant"
                                                    : field === "location"
                                                        ? "Adresse"
                                                        : field === "keywords"
                                                            ? "Mots-clés (ex : pizza, bio)"
                                                            : "Numéro SIRET"
                                            }
                                            onChange={handleChange}
                                            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                                                errors[field]
                                                    ? "border-[var(--color-error)] ring-[var(--color-error)]"
                                                    : "border-gray-300 focus:ring-[var(--color-secondary)]"
                                            }`}
                                        />
                                        {errors[field] && (
                                            <p className="text-sm text-[var(--color-error)]">{errors[field]}</p>
                                        )}
                                    </motion.div>
                                ))}
                            </>
                        )}
                    </AnimatePresence>

                    <input
                        type="text"
                        name="sponsorship_code"
                        placeholder="Code de parrainage (facultatif)"
                        value={formData.sponsorship_code}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[var(--color-secondary)] text-white py-3 rounded-full font-semibold hover:brightness-110 transition cursor-pointer"
                    >
                        {loading ? "Création du compte..." : "Créer un compte"}
                    </button>
                </form>

                {message && <p className="text-sm text-center font-medium text-[var(--color-black-2)]">{message}</p>}

                <div className="text-center text-sm text-[var(--color-gray-3)] pt-2">
                    Déjà inscrit ?{" "}
                    <span
                        onClick={() => router.push("/login")}
                        className="text-[var(--color-secondary)] font-semibold hover:underline cursor-pointer"
                    >
                        Se connecter
                    </span>
                </div>
            </motion.div>
        </main>
    )
}
