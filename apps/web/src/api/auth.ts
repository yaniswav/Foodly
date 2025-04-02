export const loginUser = async (email: string, password: string) => {
    const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        throw new Error("Erreur de connexion");
    }

    return res.json(); // Contient user + token
};
