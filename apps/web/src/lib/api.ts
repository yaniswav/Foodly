export async function login({ email, password }: { email: string; password: string }) {
    const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })

    if (!res.ok) {
        throw new Error("Échec de la connexion")
    }

    return res.json() // On attend ici un access_token
}
