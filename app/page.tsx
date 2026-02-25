import { ScrollProgress } from "@/components/scroll-progress"
import { CustomCursor } from "@/components/custom-cursor"
import { IntroOverlay } from "@/components/intro-overlay"
import { AnnouncementBar } from "@/components/announcement-bar"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { TrustBar } from "@/components/trust-bar"
import { ProductGrid } from "@/components/product-grid"
import { VibeStrip } from "@/components/vibe-strip"
import { MonthlyDrop } from "@/components/monthly-drop"
import { ComparisonSection } from "@/components/comparison-section"
import { DeliverySection } from "@/components/delivery-section"
import { LocationsSection } from "@/components/locations-section"
import { AboutSection } from "@/components/about-section"
import { FaqSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"
import { MobileBottomBar } from "@/components/mobile-bottom-bar"

export default function Home() {
  return (
    <main className="pb-20 md:pb-0">
      <ScrollProgress />
      <CustomCursor />
      <IntroOverlay />
      <AnnouncementBar />
      <Header />
      <HeroSection />
      <TrustBar />
      <ProductGrid />
      <VibeStrip />
      <MonthlyDrop />
      <ComparisonSection />
      <DeliverySection />
      <LocationsSection />
      <AboutSection />
      <FaqSection />
      <Footer />
      <MobileBottomBar />
    </main>
  )
}
