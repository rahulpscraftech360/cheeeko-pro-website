import { Link } from 'react-router'
import CheekoLogo from '@/components/ui/CheekoLogo'

export default function Privacy() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>

      {/* Top nav bar */}
      <div
        className="px-6 py-4 flex items-center justify-between"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <Link
          to="/"
          className="flex items-center gap-2 font-sans text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </Link>
        <CheekoLogo className="h-8 w-auto" />
        <div className="w-12" />
      </div>

      <section className="px-6 pt-14 pb-24">
        <div className="max-w-[680px] mx-auto">

          {/* Header */}
          <div className="mb-2 text-center">
            <h1 className="font-display text-[40px] sm:text-[52px] font-bold text-[var(--text-primary)] leading-[1.1] mb-3">
              Privacy Policy
            </h1>
            <p className="font-sans text-[13px] text-[var(--text-secondary)]">
              Last updated: December 2024
            </p>
          </div>

          <div className="mt-10 space-y-10">

            {/* Introduction */}
            <div>
              <p className="font-sans text-[15px] text-[var(--text-secondary)] leading-relaxed">
                At Cheeko AI, we are committed to protecting the privacy of our users, especially children. This Privacy Policy explains how we collect, use, and safeguard your information when you purchase or use our Cheeko AI learning companion.
              </p>
            </div>

            {/* Information We Collect */}
            <div>
              <h2 className="font-sans font-semibold text-[20px] text-[var(--text-primary)] mb-4">Information We Collect</h2>

              <h3 className="font-sans font-semibold text-[15px] text-[var(--text-primary)] mb-3">Personal Information</h3>
              <ul className="space-y-2 mb-6">
                {[
                  'Name and contact information',
                  'Shipping and billing address',
                  'Payment information (processed securely via Shopify)',
                  'Email address for order updates',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--brand-primary)' }} />
                    <span className="font-sans text-[15px] text-[var(--text-secondary)] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className="font-sans font-semibold text-[15px] text-[var(--text-primary)] mb-3">Device Information</h3>
              <ul className="space-y-2">
                {[
                  'Voice interactions (processed locally on device)',
                  'Usage patterns for personalized learning',
                  'Device health and battery status',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--brand-primary)' }} />
                    <span className="font-sans text-[15px] text-[var(--text-secondary)] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* How We Use Your Information */}
            <div>
              <h2 className="font-sans font-semibold text-[20px] text-[var(--text-primary)] mb-3">How We Use Your Information</h2>
              <p className="font-sans text-[15px] text-[var(--text-secondary)] leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="space-y-2">
                {[
                  'Process and deliver your orders',
                  'Provide customer support',
                  'Improve our products and services',
                  'Send important updates about your Cheeko device',
                  'Personalize the learning experience for your child',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--brand-primary)' }} />
                    <span className="font-sans text-[15px] text-[var(--text-secondary)] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Children's Privacy */}
            <div>
              <h2 className="font-sans font-semibold text-[20px] text-[var(--text-primary)] mb-3">Children's Privacy</h2>
              <p className="font-sans text-[15px] text-[var(--text-secondary)] leading-relaxed mb-4">
                We take children's privacy very seriously. Cheeko AI is designed with privacy-first principles:
              </p>
              <ul className="space-y-2">
                {[
                  { label: 'Local Processing', text: 'Voice interactions are processed locally on the device whenever possible' },
                  { label: 'No Personal Data Collection', text: 'We do not collect personal data from children' },
                  { label: 'Parental Controls', text: 'Parents have full control over the device settings and data' },
                  { label: 'COPPA Compliant', text: 'We comply with the Children\'s Online Privacy Protection Act' },
                ].map(item => (
                  <li key={item.label} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--brand-primary)' }} />
                    <span className="font-sans text-[15px] text-[var(--text-secondary)] leading-relaxed">
                      <span className="font-semibold text-[var(--text-primary)]">{item.label}:</span> {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Data Security */}
            <div>
              <h2 className="font-sans font-semibold text-[20px] text-[var(--text-primary)] mb-3">Data Security</h2>
              <p className="font-sans text-[15px] text-[var(--text-secondary)] leading-relaxed mb-4">
                We implement industry-standard security measures to protect your data:
              </p>
              <ul className="space-y-2">
                {[
                  'Encrypted data transmission (SSL/TLS)',
                  'Secure payment processing via Shopify',
                  'Regular security audits',
                  'Limited employee access to personal data',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--brand-primary)' }} />
                    <span className="font-sans text-[15px] text-[var(--text-secondary)] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Third-Party Services */}
            <div>
              <h2 className="font-sans font-semibold text-[20px] text-[var(--text-primary)] mb-3">Third-Party Services</h2>
              <p className="font-sans text-[15px] text-[var(--text-secondary)] leading-relaxed mb-4">
                We may use third-party services for:
              </p>
              <ul className="space-y-2 mb-4">
                {[
                  'Payment processing (Shopify)',
                  'Order fulfillment and shipping',
                  'Analytics (anonymized data only)',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--brand-primary)' }} />
                    <span className="font-sans text-[15px] text-[var(--text-secondary)] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="font-sans text-[15px] text-[var(--text-secondary)] leading-relaxed">
                These services have their own privacy policies, and we encourage you to review them.
              </p>
            </div>

            {/* Your Rights */}
            <div>
              <h2 className="font-sans font-semibold text-[20px] text-[var(--text-primary)] mb-3">Your Rights</h2>
              <p className="font-sans text-[15px] text-[var(--text-secondary)] leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="space-y-2">
                {[
                  'Access your personal data',
                  'Correct inaccurate information',
                  'Delete your data (subject to legal requirements)',
                  'Opt-out of marketing communications',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--brand-primary)' }} />
                    <span className="font-sans text-[15px] text-[var(--text-secondary)] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h2 className="font-sans font-semibold text-[20px] text-[var(--text-primary)] mb-3">Contact Us</h2>
              <p className="font-sans text-[15px] text-[var(--text-secondary)] leading-relaxed mb-4">
                If you have questions about this Privacy Policy, please contact us:
              </p>
              <ul className="space-y-2">
                {[
                  'Email: info@altio.me',
                  'Address: Mumbai, Maharashtra, India',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--brand-primary)' }} />
                    <span className="font-sans text-[15px] text-[var(--text-secondary)] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Changes to This Policy */}
            <div>
              <h2 className="font-sans font-semibold text-[20px] text-[var(--text-primary)] mb-3">Changes to This Policy</h2>
              <p className="font-sans text-[15px] text-[var(--text-secondary)] leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any significant changes via email or through our website.
              </p>
            </div>

          </div>

          {/* Back to Home */}
          <div className="mt-14">
            <Link
              to="/"
              className="font-sans text-[14px] font-medium text-[var(--brand-primary)] hover:underline"
            >
              ← Back to Home
            </Link>
          </div>

        </div>
      </section>
    </main>
  )
}
