import { Link } from 'react-router'
import CheekoLogo from '@/components/ui/CheekoLogo'

const footerColumns = [
  {
    title: 'Product',
    links: [
      { label: ' Features', href: '#' },
      { label: 'How it works', href: '#' },
      { label: 'Pricing', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '/careers' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'FAQ', href: '#faq' },
      { label: 'Shipping', href: '/shipping' },
      { label: 'Returns', href: '/returns' },
      { label: 'Help Center', href: '/help' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'hello@cheeko.in', href: 'mailto:hello@cheeko.in' },
      { label: 'Bangalore, India', href: '#' },
      { label: 'Preorders: June 2026', href: '#' },
    ],
  },
]

export default function Footer() {
  return (
    <footer
      className="relative pt-16 pb-8 px-6"
      style={{ background: 'var(--bg-secondary)' }}
    >
      {/* Top hairline */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'var(--border)' }}
      />


      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8 mb-0">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <CheekoLogo className="h-16 w-auto object-contain" />
            </div>
            <p className="font-sans text-[14px] text-[var(--c-muted)] mb-2">
              Your AI Language Companion
            </p>
            <p className="font-sans text-[13px] text-[var(--c-muted)] mb-6">
              Made with care in Bangalore, India 🇮🇳
            </p>
            <div className="flex items-center gap-3">
              {[
                {
                  href: 'https://facebook.com',
                  label: 'Facebook',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  ),
                },
                {
                  href: 'https://instagram.com',
                  label: 'Instagram',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                    </svg>
                  ),
                },
                {
                  href: 'https://x.com',
                  label: 'Twitter / X',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ),
                },
              ].map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center w-8 h-8 rounded-full text-[var(--c-muted)] hover:text-[var(--c-cream)] transition-colors duration-300"
                  style={{ background: 'rgba(255,255,255,0.08)' }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="font-sans font-semibold text-[11px] uppercase tracking-[0.12em] text-[var(--c-cream)] mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('/') ? (
                      <Link
                        to={link.href}
                        className="font-sans text-[14px] text-[var(--c-muted)] hover:text-[var(--c-cream)] transition-colors duration-300"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        onClick={
                          link.href.startsWith('#')
                            ? (e) => {
                                e.preventDefault()
                                const id = link.href.slice(1)
                                const el = document.getElementById(id)
                                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                              }
                            : undefined
                        }
                        className="font-sans text-[14px] text-[var(--c-muted)] hover:text-[var(--c-cream)] transition-colors duration-300"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Footer illustration */}
        <div className="flex justify-center -mt-16" style={{ marginLeft: '10%' }}>
          <img
            src="/footer-illustration.png"
            alt="Cheeko team illustration"
            className="w-[380px] object-contain opacity-90"
          />
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <p className="font-sans text-[12px] text-[var(--c-muted)]">
            © 2026 Cheeko. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {[
              { label: 'Terms of Use', href: '#' },
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Cookie Policy', href: '#' },
            ].map((item, i) => (
              <span key={item.label} className="flex items-center gap-3">
                {i > 0 && (
                  <span className="text-[var(--c-muted)] opacity-30">·</span>
                )}
                <Link
                  to={item.href}
                  className="font-sans text-[12px] text-[var(--c-muted)] hover:text-[var(--c-cream)] transition-colors duration-300"
                >
                  {item.label}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
