"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
    return (
        <section
            className="w-full flex flex-col md:flex-row items-center justify-between min-h-screen pt-28 px-6 md:px-12 relative overflow-hidden"
            style={{
                background: "linear-gradient(135deg, var(--color-secondary), var(--color-tertiary))",
            }}
        >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
                <div
                    className="absolute top-0 left-0 w-full h-full bg-repeat"
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='3' cy='3' r='1.5'/%3E%3C/g%3E%3C/svg%3E\")",
                        backgroundSize: "20px 20px",
                    }}
                />
            </div>

            {/* Text */}
            <motion.div
                className="z-10 flex flex-col gap-6 md:w-1/2 mt-12 md:mt-0"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <h1
                    style={{
                        fontSize: "var(--heading-2)",
                        lineHeight: "var(--lh-heading-2)",
                        fontWeight: "bold",
                        color: "var(--color-white)",
                    }}
                >
                    Des repas délicieux <br />
                    <span style={{ color: "var(--color-black-1)" }}>
                        livrés rapidement chez vous !
                    </span>
                </h1>

                <p
                    style={{
                        fontSize: "var(--text-lg)",
                        lineHeight: "var(--lh-lg)",
                        color: "rgba(255, 255, 255, 0.9)",
                    }}
                >
                    Découvrez les meilleurs restaurants de votre ville et commandez en quelques clics.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    {/* ✅ Correction : remplace le <button> par un vrai <Link> stylé */}
                    <Link
                        href="/restaurant"
                        className="px-6 py-3 rounded-full font-medium border transition-colors"
                        style={{
                            backgroundColor: "rgba(255, 255, 255, 0.15)",
                            borderColor: "var(--color-white)",
                            color: "var(--color-white)",
                        }}
                    >
                        Voir les restaurants
                    </Link>
                </div>
            </motion.div>

            {/* Image */}
            <motion.div
                className="relative md:w-1/2 h-full flex justify-center mt-12 md:mt-0"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <div
                    className="rounded-full w-[300px] h-[300px] md:w-[450px] md:h-[450px] flex items-center justify-center shadow-2xl"
                    style={{
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                    }}
                >
                    <Image
                        src="/burger.png"
                        alt="Burger 3D"
                        width={400}
                        height={400}
                        className="object-contain drop-shadow-2xl scale-125"
                        priority
                    />
                </div>
            </motion.div>
        </section>
    );
}
