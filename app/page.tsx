import Navbar from "@/components/Navbar"
import HeroSection from "@/components/HeroSection"
import ProblemSection from "@/components/ProblemSection"
import AboutSection from "@/components/AboutSection"
import ServicesGrid from "@/components/ServicesGrid"
import SystemsSection from "@/components/SystemsSection"
import DifferentialsSection from "@/components/DifferentialsSection"
import ProcessTimeline from "@/components/ProcessTimeline"
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
        <HeroSection />
        <ProblemSection />
        <AboutSection />
        <ServicesGrid />
        <SystemsSection />
        <DifferentialsSection />
        <ProcessTimeline />
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
