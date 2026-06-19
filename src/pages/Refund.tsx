import { Link } from 'react-router'
import CheekoLogo from '@/components/ui/CheekoLogo'

export default function Refund() {
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
              Refund Policy
            </h1>
            <p className="font-sans text-[13px] text-[var(--text-secondary)]">
              Last updated: December 2024
            </p>
          </div>

          <div className="mt-10 space-y-10">

            {/* Our Promise */}
            <div>
              <h2 className="font-sans font-semibold text-[20px] text-[var(--text-primary)] mb-3">Our Promise</h2>
              <p className="font-sans text-[15px] text-[var(--text-secondary)] leading-relaxed">
                We want you and your child to be completely satisfied with Cheeko AI. If for any reason you're not happy with your purchase, we offer a hassle-free return policy.
              </p>
            </div>

            {/* 30-Day Return Policy */}
            <div>
              <h2 className="font-sans font-semibold text-[20px] text-[var(--text-primary)] mb-3">30-Day Return Policy</h2>
              <p className="font-sans text-[15px] text-[var(--text-secondary)] leading-relaxed mb-4">
                You may return your Cheeko AI device within 7 days of delivery for a full refund, provided:
              </p>
              <ul className="space-y-2">
                {[
                  'The device is in its original packaging',
                  'All accessories are included',
                  'The device is undamaged and in working condition',
                  'You have proof of purchase (order confirmation email)',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--brand-primary)' }} />
                    <span className="font-sans text-[15px] text-[var(--text-secondary)] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* How to Initiate a Return */}
            <div>
              <h2 className="font-sans font-semibold text-[20px] text-[var(--text-primary)] mb-3">How to Initiate a Return</h2>
              <ol className="space-y-3">
                {[
                  { label: 'Contact Us', text: 'Email us at info@altio.me within 7 days of receiving your order.' },
                  { label: 'Get Approval', text: 'Our team will review your request and provide a Return Authorization number.' },
                  { label: 'Ship the Product', text: 'Pack the device securely in its original packaging and ship it to the address provided.' },
                  { label: 'Receive Refund', text: "Once we receive and inspect the returned item, we'll process your refund within 5-7 business days." },
                ].map((step, i) => (
                  <li key={step.label} className="flex items-start gap-4">
                    <span
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-sans font-bold text-[12px] text-[var(--brand-primary)] mt-0.5"
                      style={{ background: 'var(--brand-primary-soft)' }}
                    >
                      {i + 1}
                    </span>
                    <p className="font-sans text-[15px] text-[var(--text-secondary)] leading-relaxed">
                      <span className="font-semibold text-[var(--text-primary)]">{step.label}:</span> {step.text}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Refund Method */}
            <div>
              <h2 className="font-sans font-semibold text-[20px] text-[var(--text-primary)] mb-3">Refund Method</h2>
              <p className="font-sans text-[15px] text-[var(--text-secondary)] leading-relaxed mb-4">
                Refunds will be processed to the original payment method used during purchase. Please note:
              </p>
              <ul className="space-y-2">
                {[
                  'Credit/Debit card refunds: 5-7 business days',
                  'UPI/Net Banking refunds: 3-5 business days',
                  'Wallet refunds: 1-2 business days',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--brand-primary)' }} />
                    <span className="font-sans text-[15px] text-[var(--text-secondary)] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Damaged or Defective Products */}
            <div>
              <h2 className="font-sans font-semibold text-[20px] text-[var(--text-primary)] mb-3">Damaged or Defective Products</h2>
              <p className="font-sans text-[15px] text-[var(--text-secondary)] leading-relaxed mb-4">
                If you receive a damaged or defective product, please contact us immediately (within 48 hours of delivery) with:
              </p>
              <ul className="space-y-2 mb-4">
                {[
                  'Photos of the damage',
                  'Your order number',
                  'Description of the issue',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--brand-primary)' }} />
                    <span className="font-sans text-[15px] text-[var(--text-secondary)] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="font-sans text-[15px] text-[var(--text-secondary)] leading-relaxed">
                We will arrange for a free replacement or full refund, including return shipping costs.
              </p>
            </div>

            {/* Non-Returnable Items */}
            <div>
              <h2 className="font-sans font-semibold text-[20px] text-[var(--text-primary)] mb-3">Non-Returnable Items</h2>
              <p className="font-sans text-[15px] text-[var(--text-secondary)] leading-relaxed mb-4">
                The following are not eligible for return:
              </p>
              <ul className="space-y-2">
                {[
                  'Products with physical damage caused by misuse',
                  'Products without original packaging',
                  'Products returned after 7 days',
                  'Products that have been modified or tampered with',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--brand-primary)' }} />
                    <span className="font-sans text-[15px] text-[var(--text-secondary)] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Warranty Claims */}
            <div>
              <h2 className="font-sans font-semibold text-[20px] text-[var(--text-primary)] mb-3">Warranty Claims</h2>
              <p className="font-sans text-[15px] text-[var(--text-secondary)] leading-relaxed">
                For warranty claims after the 30-day return period, please refer to our warranty terms in the Terms of Service.
              </p>
            </div>

            {/* Return Shipping */}
            <div>
              <h2 className="font-sans font-semibold text-[20px] text-[var(--text-primary)] mb-3">Return Shipping</h2>
              <p className="font-sans text-[15px] text-[var(--text-secondary)] leading-relaxed">
                For standard returns within the 30-day period, return shipping costs are the customer's responsibility. For defective products, we will cover all shipping costs.
              </p>
            </div>

            {/* Contact Us */}
            <div>
              <h2 className="font-sans font-semibold text-[20px] text-[var(--text-primary)] mb-3">Contact Us</h2>
              <p className="font-sans text-[15px] text-[var(--text-secondary)] leading-relaxed mb-4">
                For any questions about returns or refunds:
              </p>
              <ul className="space-y-2">
                {[
                  'Email: info@altio.me',
                  'Hours: Monday-Saturday, 10 AM - 7 PM IST',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--brand-primary)' }} />
                    <span className="font-sans text-[15px] text-[var(--text-secondary)] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
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
