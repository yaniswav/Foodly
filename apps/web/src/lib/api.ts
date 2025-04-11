// ✅ Login d'un utilisateur
export async function loginUser(email: string, password: string) {
    const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })

    if (!res.ok) {
        throw new Error("Échec de la connexion")
    }

    const data = await res.json()
    localStorage.setItem("access_token", data.access_token)
    return data
}

// ✅ Récupérer TOUS les restaurants (si jamais tu en as besoin)
export async function fetchAllRestaurants() {
    const token = localStorage.getItem("access_token")

    if (!token) {
        throw new Error("Aucun token d'accès")
    }

    const res = await fetch("http://localhost:8080/restaurants/", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if (!res.ok) {
        throw new Error("Impossible de récupérer les restaurants")
    }

    return res.json()
}

// ✅ Récupérer UN restaurant par son ID
export async function getRestaurantById(id: string, token: string) {
    const res = await fetch(`http://localhost:8080/restaurants/byRestaurantId?id=${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if (!res.ok) {
        throw new Error("Impossible de récupérer le restaurant")
    }

    return res.json()
}


// ✅ Récupérer les infos d’un utilisateur par son ID
export async function getUserById(id: string) {
    const token = localStorage.getItem("access_token")

    if (!token) {
        throw new Error("Aucun token d'accès")
    }

    const res = await fetch(`http://localhost:8080/users?id=${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if (!res.ok) {
        throw new Error("Impossible de récupérer l'utilisateur")
    }

    return res.json()
}

export async function login(email: string, password: string) {
    const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        throw new Error("Erreur d'authentification");
    }

    const data = await res.json()

    // Stockage du token uniquement
    localStorage.setItem("access_token", data.access_token)

    console.log("✅ Données reçues :", data)

    return data
}



export async function searchRestaurants(
    keywords: string,
    page: number,
    limit: number,
    token: string
) {
    const res = await fetch("http://localhost:8080/restaurants/research", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ keywords, page, limit }),
    })

    if (!res.ok) {
        throw new Error("Erreur lors de la recherche des restaurants")
    }

    return res.json()
}

export async function getMenuByRestaurantId(id: string, token: string) {
    const res = await fetch(`http://localhost:8080/restaurants/menu?id=${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if (!res.ok) {
        throw new Error("Impossible de récupérer le menu")
    }

    return res.json()
}

export async function registerUser(formData: any) {
    const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })

    if (!response.ok) {
        throw new Error("Erreur lors de l’inscription")
    }

    return response.json()
}

export async function createOrder(order: any, token: string) {
    const response = await fetch("http://localhost:8080/orders/order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(order),
    })

    const resText = await response.text()

    if (!response.ok) {
        console.error("❌ Backend error /orders/order :", resText)
        throw new Error("Erreur lors de la commande")
    }

    console.log("✅ Réponse backend /orders :", resText)
    return JSON.parse(resText)
}

export async function getCurrentUser(token: string) {
    const res = await fetch("http://localhost:8080/users/", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if (!res.ok) {
        const text = await res.text()
        console.error("Erreur getCurrentUser:", text)
        throw new Error("Erreur lors du chargement du profil")
    }

    return res.json()
}

export async function updateCurrentUser(data: any, token: string) {
    const res = await fetch("http://localhost:8080/users/", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    })

    if (!res.ok) {
        const text = await res.text()
        console.error("Erreur updateCurrentUser:", text)
        throw new Error("Erreur lors de la mise à jour du profil")
    }

    return res.json()
}




