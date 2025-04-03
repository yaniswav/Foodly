"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const restaurants = [
    {
        id: 1,
        name: "Burger King",
        logo: "/logos/Burger_King_2020.svg",
        color: "var(--color-secondary)",
    },
    {
        id: 2,
        name: "McDonald's",
        logo: "/logos/McDonald's.svg",
        color: "var(--color-tertiary)",
    },
]

function HexTile({ restaurant }: { restaurant: typeof restaurants[0] }) {
    return (
        <motion.div
            className="hex-tile relative"
            initial="rest"
            whileHover="hover"
            animate="rest"
            style={{
                border: `1px solid transparent`,
            }}
        >
            <div className="hex-inner flex items-center justify-center w-full h-full overflow-hidden"
                 style={{
                     clipPath:
                         "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                     backgroundColor: restaurant.color,
                 }}>
                <div className="z-10 flex flex-col items-center justify-center text-white">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-2">
                        <Image
                            src={restaurant.logo}
                            alt={restaurant.name}
                            width={28}
                            height={28}
                            className="object-contain"
                        />
                    </div>
                    <span className="text-sm font-medium">{restaurant.name}</span>
                </div>
            </div>
        </motion.div>
    )
}

export default function HiveSection() {
    return (
        <section className="w-full py-20 px-6 bg-white text-black">
            <div className="max-w-6xl mx-auto text-center mb-16">
                <h2 style={{
                    fontSize: "var(--heading-3)",
                    lineHeight: "var(--lh-heading-3)",
                    fontWeight: "bold",
                    color: "var(--color-primary)"
                }}>
                    Nos restaurants partenaires
                </h2>
                <p style={{
                    fontSize: "var(--text-md)",
                    lineHeight: "var(--lh-md)",
                    color: "var(--color-gray-3)"
                }}>
                    Découvrez notre réseau de restaurants partenaires qui proposent une large variété de cuisines.
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {restaurants.map((r) => (
                    <HexTile key={r.id} restaurant={r} />
                ))}
            </div>
        </section>
    )
}
