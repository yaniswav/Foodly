"use client"

import { useState } from "react"
import { login } from "@/lib/api"

export default function TestApiLoginPage() {
    const [token, setToken] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        setLoading(true)
        setError("")
        try {
            const data = await login({
                email: "noantest@gmail.com",
                password: "mdp"
            })
            setToken(data.access_token)
            console.log("Token reçu :", data.access_token)
        } catch (err: any) {
            setError(err.message || "Erreur inconnue")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Test Login</h1>
            <button
                onClick={handleLogin}
                style={{
                    backgroundColor: "var(--color-secondary)",
                    color: "white",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "999px",
                    border: "none",
                    fontWeight: "bold",
                    cursor: "pointer"
                }}
            >
                Se connecter avec noantest@gmail.com
            </button>

            {loading && <p>Connexion...</p>}
            {token && (
                <p style={{ marginTop: "1rem", color: "green", wordBreak: "break-word" }}>
                    ✅ Token : <br /> {token}
                </p>
            )}
            {error && (
                <p style={{ marginTop: "1rem", color: "red" }}>
                    ❌ Erreur : {error}
                </p>
            )}
        </div>
    )
}
