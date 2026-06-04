import Navbar from '@/components/ui/Navbar'
import HeroSection from '@/components/sections/HeroSection'
import FeaturesNarrative from '@/components/sections/FeaturesNarrative'
import ProductLine from '@/components/sections/ProductLine'
import ComparisonTable from '@/components/sections/ComparisonTable'
import WhyCheeko from '@/components/sections/WhyCheeko'
import SafetySection from '@/components/sections/SafetySection'
import SpecsSection from '@/components/sections/SpecsSection'
import FAQSection from '@/components/sections/FAQSection'
import CTABlock from '@/components/sections/CTABlock'
import Footer from '@/components/ui/Footer'

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <FeaturesNarrative />
      <ProductLine />
      <ComparisonTable />
      <WhyCheeko />
      <SafetySection />
      <SpecsSection />
      <FAQSection />
      <CTABlock />
      <Footer />
    </main>
  )
}
