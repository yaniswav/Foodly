"use client"

import { useState } from "react"
import { login } from "@/lib/api"

export default function TestLoginPage() {
    const [email, setEmail] = useState("bob88@gmail.com")
    const [password, setPassword] = useState("mdp")
    const [message, setMessage] = useState("")

    const handleLogin = async () => {
        try {
            const response = await login(email, password);
            console.log("Réponse login API :", response);

            const token = response.access_token; // ✅ c’est ici qu’il est
            console.log("Token reçu :", token);

            if (!token) {
                setMessage("❌ Token non reçu. Vérifie la structure de la réponse.");
                return;
            }

            localStorage.setItem("access_token", token);
            setMessage("✅ Connexion réussie !");
        } catch (error) {
            console.error("Erreur login :", error);
            setMessage("❌ Erreur lors de la connexion.");
        }
    };



    return (
        <div className="p-10 max-w-md mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-[var(--color-black-1)]">Connexion Test</h1>

            <div className="space-y-2">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full p-3 border rounded-md"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mot de passe"
                    className="w-full p-3 border rounded-md"
                />
            </div>

            <button
                onClick={handleLogin}
                className="bg-[var(--color-secondary)] text-white px-6 py-3 rounded-full hover:brightness-110 transition"
            >
                Se connecter
            </button>

            {message && (
                <div className="mt-4 text-sm font-medium text-[var(--color-black-2)]">{message}</div>
            )}
        </div>
    )
}
