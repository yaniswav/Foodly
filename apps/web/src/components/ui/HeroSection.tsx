"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function HeroSection() {
    return (
        <section className="w-full flex flex-col md:flex-row items-center justify-between min-h-screen pt-28 px-6 md:px-12 relative overflow-hidden"
                 style={{ background: "linear-gradient(135deg, var(--color-secondary), var(--color-tertiary))" }}>

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
        <span className="px-4 py-2 rounded-full text-sm border border-white/20 bg-white/10 backdrop-blur-sm"
              style={{ color: "var(--color-white)" }}>
          Livraison gratuite sur votre première commande
        </span>

                <h1 style={{
                    fontSize: "var(--heading-2)",
                    lineHeight: "var(--lh-heading-2)",
                    fontWeight: "bold",
                    color: "var(--color-white)"
                }}>
                    Délicieux repas <br />
                    <span style={{ color: "var(--color-black-1)" }}>livrés chez vous</span>
                </h1>

                <p style={{
                    fontSize: "var(--text-lg)",
                    lineHeight: "var(--lh-lg)",
                    color: "rgba(255, 255, 255, 0.9)"
                }}>
                    Découvrez les meilleurs restaurants de votre quartier et commandez en quelques clics.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <button className="px-6 py-3 rounded-full font-medium transition-colors"
                            style={{
                                backgroundColor: "var(--color-black-2)",
                                color: "var(--color-white)"
                            }}>
                        Commander
                    </button>
                    <button className="px-6 py-3 rounded-full font-medium border transition-colors"
                            style={{
                                backgroundColor: "rgba(255, 255, 255, 0.15)",
                                borderColor: "var(--color-white)",
                                color: "var(--color-white)"
                            }}>
                        Voir les menus
                    </button>
                </div>

                <div className="flex items-center gap-4 mt-6">
                    <div className="flex -space-x-3">
                        {[1, 2, 3].map((i) => (
                            <Image
                                key={i}
                                src="/placeholder.svg"
                                width={40}
                                height={40}
                                alt="User"
                                className="rounded-full border-2"
                                style={{ borderColor: "var(--color-white)" }}
                            />
                        ))}
                    </div>
                    <div className="text-sm" style={{ color: "var(--color-white)" }}>
                        <span className="font-bold">4.8/5</span> — Plus de 2 000 avis
                    </div>
                </div>
            </motion.div>

            {/* Image */}
            <motion.div
                className="relative md:w-1/2 h-full flex justify-center mt-12 md:mt-0"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <div className="rounded-full w-[300px] h-[300px] md:w-[450px] md:h-[450px] flex items-center justify-center shadow-2xl"
                     style={{
                         backgroundColor: "rgba(255, 255, 255, 0.2)",
                         border: "1px solid rgba(255, 255, 255, 0.3)"
                     }}>
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
    )
}
