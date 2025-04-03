import Link from "next/link"

export default function Footer() {
    return (
        <footer style={{ backgroundColor: "var(--color-black-3)", color: "var(--color-gray-4)" }} className="pt-12 pb-8 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 style={{ color: "var(--color-secondary)", fontWeight: "bold" }} className="text-lg mb-4">Foodly</h3>
                    <p className="text-sm">
                        Commandez vos plats préférés auprès des meilleurs restaurants de votre région.
                    </p>
                </div>

                <div>
                    <h4 className="text-base font-medium mb-4">À propos</h4>
                    <ul className="space-y-1 text-sm">
                        <li><Link href="#">Notre histoire</Link></li>
                        <li><Link href="#">Blog</Link></li>
                        <li><Link href="#">Carrières</Link></li>
                        <li><Link href="#">Devenir partenaire</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-base font-medium mb-4">Support</h4>
                    <ul className="space-y-1 text-sm">
                        <li><Link href="#">Centre d'aide</Link></li>
                        <li><Link href="#">Contactez-nous</Link></li>
                        <li><Link href="#">Confidentialité</Link></li>
                        <li><Link href="#">Conditions</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-base font-medium mb-4">Télécharger l'appli</h4>
                    <p className="text-sm mb-2">Commandez plus vite depuis votre mobile.</p>
                    <div className="flex flex-col gap-2">
                        <a href="#" className="bg-white text-black px-4 py-2 rounded-md text-center text-sm hover:bg-gray-200 transition">App Store</a>
                        <a href="#" className="bg-white text-black px-4 py-2 rounded-md text-center text-sm hover:bg-gray-200 transition">Google Play</a>
                    </div>
                </div>
            </div>

            <div className="text-center mt-12 text-xs text-gray-500 border-t border-gray-800 pt-6">
                &copy; {new Date().getFullYear()} Foodly. Tous droits réservés.
            </div>
        </footer>
    )
}
