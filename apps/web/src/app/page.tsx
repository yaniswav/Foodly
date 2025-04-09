import HeroSection from "@/components/ui/HeroSection"
import Footer from "@/components/ui/Footer"

export default function Home() {
    return (
        <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <HeroSection />
            <Footer />
        </main>
    )
}
