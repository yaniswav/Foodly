import Header from "@/components/ui/Header"
import HeroSection from "@/components/ui/HeroSection"
import HiveSection from "@/components/ui/HiveSection"
import Footer from "@/components/ui/Footer"

export default function Home() {
    return (
        <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <HeroSection />
            <HiveSection />
            <Footer />
        </main>
    )
}
