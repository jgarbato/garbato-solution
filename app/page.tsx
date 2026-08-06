import Navbar from "@/components/Navbar"
import { HeroGarbato } from "@/components/ui/hero-garbato"
import ProductScroll from "@/components/ProductScroll"
import ProblemSection from "@/components/ProblemSection"
import AboutSection from "@/components/AboutSection"
import ServicesGrid from "@/components/ServicesGrid"
import SystemsSection from "@/components/SystemsSection"
import DifferentialsSection from "@/components/DifferentialsSection"
import ProcessOrbital from "@/components/ProcessOrbital"
import SolutionsShowcase from "@/components/SolutionsShowcase"
import BenefitsSection from "@/components/BenefitsSection"
import TrustSection from "@/components/TrustSection"
import FAQSection from "@/components/FAQSection"
import CTASection from "@/components/CTASection"
import ContactSection from "@/components/ContactSection"
import WhatsAppFloatButton from "@/components/WhatsAppFloatButton"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroGarbato />
        <ProductScroll />
        <ProblemSection />
        <AboutSection />
        <ServicesGrid />
        <SystemsSection />
        <DifferentialsSection />
        <ProcessOrbital />
        <SolutionsShowcase />
        <BenefitsSection />
        <TrustSection />
        <FAQSection />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFloatButton />
    </>
  )
}
