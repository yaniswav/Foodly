"use client"

import { useEffect, useState } from "react"

export default function TestUser() {
    const [data, setData] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const token = localStorage.getItem("access_token")
        if (!token) return setError("Pas de token trouvé")

        fetch("http://localhost:8080/users?id=2", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error("Erreur réseau")
                return res.json()
            })
            .then((data) => setData(data))
            .catch((err) => setError("Erreur : " + err.message))
    }, [])

    return (
        <div className="p-10">
            <h1 className="text-xl font-bold">🧪 Test API - Utilisateur #2</h1>
            {error && <p className="text-red-500">{error}</p>}
            {data && (
                <pre className="bg-gray-100 p-4 rounded mt-4 text-sm">{JSON.stringify(data, null, 2)}</pre>
            )}
        </div>
    )
}
