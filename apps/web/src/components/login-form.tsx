"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

export function LoginForm() {
    const router = useRouter();
    const { toast } = useToast();
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Erreur lors de la connexion");
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.userId);

            toast({
                title: "Connexion réussie",
                description: "Bienvenue sur Foodly !",
                className: "bg-green-50 border-green-200",
            });

            router.push("/dashboard");
        } catch (error: any) {
            toast({
                title: "Erreur de connexion",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (!mounted) return null;

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="mb-8 flex flex-col items-center text-center">
                    <Image
                        src="/logo-foodly.png"
                        alt="Visuel de connexion"
                        width={120}
                        height={120}
                        className="object-contain rounded-lg shadow"
                    />
                    <span className="mt-4 text-3xl font-bold text-transparent bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text">
            Foodly
          </span>
                    <p className="text-muted-foreground mt-2">
                        Connectez-vous pour commander vos repas préférés
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Connexion</CardTitle>
                        <CardDescription>
                            Entrez vos identifiants pour vous connecter
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="exemple@email.com"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Mot de passe</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-black text-white hover:bg-gray-800"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <motion.div
                                            className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        />
                                        Connexion en cours...
                                    </>
                                ) : (
                                    "Se connecter"
                                )}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <div className="text-center text-sm">
                            <span className="text-muted-foreground">Vous n'avez pas de compte ? </span>
                            <Link href="/register" className="font-medium text-amber-600 hover:underline">
                                Créer un compte
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    );
}
