import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext"; // ✅ Ajout du provider

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Foodly App",
    description: "Plateforme de restauration",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr" className={`${geistSans.variable} ${geistMono.variable}`}>
        <body className="bg-white text-black font-sans">
        <AuthProvider>
            <Navbar />
            {children}
        </AuthProvider>
        </body>
        </html>
    );
}
