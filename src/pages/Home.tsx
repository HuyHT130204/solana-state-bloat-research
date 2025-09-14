import { useEffect } from 'react'
import Hero from '../components/sections/Hero'
import ProblemOverview from '../components/sections/ProblemOverview'
import QuantitativeDashboard from '../components/sections/QuantitativeDashboard'
import SIMDReview from '../components/sections/SIMDReview'
import ProposedSolutions from '../components/sections/ProposedSolutions'
import MigrationTimeline from '../components/sections/MigrationTimeline'
import BlockchainComparison from '../components/sections/BlockchainComparison'
import AboutResearcher from '../components/sections/AboutResearcher'
import References from '../components/sections/References'
import SolutionPlaybook from '../components/sections/SolutionPlaybook'
import SyscallSpec from '../components/sections/SyscallSpec'
import StorageEconomics from '../components/sections/StorageEconomics'
import PilotPartners from '../components/sections/PilotPartners'
import SecurityAppendix from '../components/sections/SecurityAppendix'
import EconomicModeling from '../components/sections/EconomicModeling'
import WorkingPrototype from '../components/sections/WorkingPrototype'
import FormalSecurityProofs from '../components/sections/FormalSecurityProofs'
import ProductionReadiness from '../components/sections/ProductionReadiness'
import EcosystemImpact from '../components/sections/EcosystemImpact'
import GovernanceFramework from '../components/sections/GovernanceFramework'
import ComplianceLegal from '../components/sections/ComplianceLegal'
import DisasterRecovery from '../components/sections/DisasterRecovery'
import ModernUpdates from '../components/sections/ModernUpdates'
import PDFExport from '../components/PDFExport'
import ScrollToTop from '../components/ScrollToTop'
import FloatingActions from '../components/FloatingActions'

export default function Home() {
  useEffect(() => {
    // Add smooth scrolling behavior
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement
      if (target.hash) {
        e.preventDefault()
        const element = document.querySelector(target.hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }

    document.addEventListener('click', handleSmoothScroll)
    return () => document.removeEventListener('click', handleSmoothScroll)
  }, [])

  return (
    <div className="pt-16">
      <Hero />
      <ProblemOverview />
      <QuantitativeDashboard />
      <SIMDReview />
      <ProposedSolutions />
      <SyscallSpec />
      <StorageEconomics />
      <PilotPartners />
      <SecurityAppendix />
      <EconomicModeling />
      <WorkingPrototype />
      <FormalSecurityProofs />
      <ProductionReadiness />
      <EcosystemImpact />
      <GovernanceFramework />
      <ComplianceLegal />
      <DisasterRecovery />
      <ModernUpdates />
      <SolutionPlaybook />
      <MigrationTimeline />
      <BlockchainComparison />
      <AboutResearcher />
      <References />
      <PDFExport />
      <ScrollToTop />
      <FloatingActions />
    </div>
  )
}
