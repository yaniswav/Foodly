"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
    const { login, accessToken } = useAuth();

    const [email, setEmail] = useState(""); // 🔄 Mis à jour ici
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            await login(email, password);
            alert("Connexion réussie !");
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="p-8 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Connexion</h1>

            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Adresse e-mail"
                className="border border-gray-300 rounded px-4 py-2 w-full mb-2"
            />

            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                className="border border-gray-300 rounded px-4 py-2 w-full mb-2"
            />

            <button
                onClick={handleLogin}
                className="bg-[var(--color-primary)] text-white px-4 py-2 rounded w-full"
            >
                Se connecter
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
}
