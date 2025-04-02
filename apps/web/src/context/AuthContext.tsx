"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { User } from "@/types/user"; // Typage global de l'utilisateur

type AuthContextType = {
    user: User | null;
    accessToken: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
};

// ✅ Crée un contexte avec un type sécurisé
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ✅ Fournisseur du contexte
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    // 🔐 MOCK TEMPORAIRE — à remplacer plus tard par la vraie API
    const login = async (email: string, password: string) => {
        if (email === "bob88@gmail.com" && password === "mdp") {
            setAccessToken("fake-token-123");
            setUser({ id: "1", email, name: "Bob", role: "user" });
        } else {
            throw new Error("Email ou mot de passe incorrect");
        }
    };

    // ✅ VRAIE VERSION (à activer plus tard)
    /*
      const login = async (email: string, password: string) => {
        try {
          const response = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
            throw new Error("Email ou mot de passe incorrect");
          }

          const data = await response.json();

          if (data.access_token) {
            setAccessToken(data.access_token);
            setUser(data.user); // 👈 adapte selon la réponse réelle de l’API
          } else {
            throw new Error("Token manquant dans la réponse");
          }
        } catch (error: any) {
          console.error("Erreur de login :", error.message);
          throw error;
        }
      };
    */

    const logout = () => {
        setAccessToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, accessToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// ✅ Hook pour utiliser le contexte
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
