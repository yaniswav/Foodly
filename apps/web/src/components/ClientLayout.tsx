// src/components/ClientLayout.tsx
"use client";

import Header from "@/components/ui/Header";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            {children}
        </>
    );
}
