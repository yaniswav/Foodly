"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

export function MyAccount() {
    const { toast } = useToast();

    const [token, setToken] = useState<string | null | undefined>(undefined);
    const [userId, setUserId] = useState<string | null | undefined>(undefined);
    const [isSaving, setIsSaving] = useState(false);
    const [loading, setLoading] = useState(true);

    const [formState, setFormState] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        emailNotifications: true,
        pushNotifications: true,
        smsNotifications: false,
    });

    // ✅ Récupération du token / userId seulement côté client
    useEffect(() => {
        const t = localStorage.getItem("token");
        const uid = localStorage.getItem("userId");

        setToken(t);
        setUserId(uid);
    }, []);

    // ✅ Chargement des infos utilisateur
    useEffect(() => {
        if (!token || !userId) return;

        fetch(`http://localhost:8080/users?id=${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => {
                setFormState((prev) => ({
                    ...prev,
                    name: `${data.firstname} ${data.lastname}`,
                    email: data.email,
                    phone: "+33 6 00 00 00 00", // mock
                    address: "123 rue Foodly, Paris", // mock
                }));
            })
            .catch((err) => console.error("Erreur fetch user :", err))
            .finally(() => setLoading(false));
    }, [token, userId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const handleSwitchChange = (name: string, checked: boolean) => {
        setFormState((prev) => ({ ...prev, [name]: checked }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        // ✅ À implémenter : PUT /users/:id pour mise à jour des infos

        setTimeout(() => {
            setIsSaving(false);
            toast({
                title: "Profil mis à jour",
                description: "Vos informations ont bien été enregistrées.",
                className: "bg-green-50 border-green-200",
            });
        }, 1000);
    };

    // ✅ Étape 1 : tant que token/userId ne sont pas initialisés, on ne rend rien
    if (token === undefined || userId === undefined) {
        return null; // Pas de rendu => pas d'hydration error
    }

    // ✅ Étape 2 : utilisateur non connecté
    if (!token || !userId) {
        return (
            <div className="p-6 rounded-xl bg-red-50 border border-red-200 text-red-800 space-y-4 max-w-md mx-auto mt-10 shadow">
                <h2 className="text-lg font-semibold">Vous devez vous connecter</h2>
                <p>
                    Cette page est réservée aux utilisateurs connectés. Veuillez vous authentifier
                    pour accéder à votre compte.
                </p>
                <Button
                    className="bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => (window.location.href = "/login")}
                >
                    Se connecter
                </Button>
            </div>
        );
    }

    // ✅ Étape 3 : chargement
    if (loading) {
        return (
            <div className="text-center py-10 text-muted-foreground">
                Chargement de vos informations...
            </div>
        );
    }

    // ✅ Étape 4 : affichage du formulaire complet
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Mon compte</h1>
                <p className="text-muted-foreground">Gérez vos informations personnelles</p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Informations personnelles</CardTitle>
                                <CardDescription>Modifiez vos coordonnées</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nom complet</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={formState.name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formState.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Téléphone</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        value={formState.phone}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address">Adresse</Label>
                                    <Input
                                        id="address"
                                        name="address"
                                        value={formState.address}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Notifications</CardTitle>
                                <CardDescription>Choisissez vos préférences</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {[
                                    {
                                        id: "emailNotifications",
                                        label: "Email",
                                        desc: "Recevoir les infos commandes par email",
                                    },
                                    {
                                        id: "pushNotifications",
                                        label: "Push",
                                        desc: "Notifications en direct",
                                    },
                                    {
                                        id: "smsNotifications",
                                        label: "SMS",
                                        desc: "Mises à jour par SMS",
                                    },
                                ].map(({ id, label, desc }) => (
                                    <div key={id} className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor={id}>{label}</Label>
                                            <p className="text-sm text-muted-foreground">{desc}</p>
                                        </div>
                                        <Switch
                                            id={id}
                                            checked={formState[id as keyof typeof formState] as boolean}
                                            onCheckedChange={(checked) =>
                                                handleSwitchChange(id, checked)
                                            }
                                        />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <Button
                            type="submit"
                            className="bg-black text-white hover:bg-gray-800"
                            disabled={isSaving}
                        >
                            {isSaving ? (
                                <>
                                    <motion.div
                                        className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
                                        animate={{ rotate: 360 }}
                                        transition={{
                                            duration: 1,
                                            repeat: Number.POSITIVE_INFINITY,
                                            ease: "linear",
                                        }}
                                    />
                                    Sauvegarde...
                                </>
                            ) : (
                                <>Sauvegarder</>
                            )}
                        </Button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
