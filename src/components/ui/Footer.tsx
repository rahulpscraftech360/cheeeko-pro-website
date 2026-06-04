function FoxIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16 4L8 12V20L16 28L24 20V12L16 4Z"
        fill="var(--c-orange)"
        opacity="0.9"
      />
      <path
        d="M16 4L8 12H24L16 4Z"
        fill="var(--c-orange)"
      />
      <circle cx="12.5" cy="16" r="1.5" fill="#0D0D0D" />
      <circle cx="19.5" cy="16" r="1.5" fill="#0D0D0D" />
      <ellipse cx="16" cy="19" rx="3" ry="2" fill="#0D0D0D" opacity="0.3" />
    </svg>
  )
}

const footerColumns = [
  {
    title: 'Product',
    links: ['Cheeko Pro', 'Cheeko Cards', 'Compare Models', "What's Included"],
  },
  {
    title: 'Company',
    links: ['About Cheeko', 'Our Story', 'Careers', 'Press'],
  },
  {
    title: 'Support',
    links: ['FAQ', 'Contact Us', 'Shipping & Returns', 'Privacy Policy'],
  },
]

export default function Footer() {
  return (
    <footer
      className="relative pt-16 pb-8 px-6"
      style={{ background: '#0A0A0A' }}
    >
      {/* Top hairline */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'rgba(255,255,255,0.06)' }}
      />

      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <FoxIcon className="w-7 h-7" />
              <span className="font-sans font-bold text-[18px] tracking-[0.05em] text-[var(--c-cream)]">
                CHEEKO
              </span>
            </div>
            <p className="font-sans text-[14px] text-[var(--c-muted)] mb-2">
              Your AI Language Companion
            </p>
            <p className="font-sans text-[13px] text-[var(--c-muted)] mb-6">
              Made with care in Bangalore, India 🇮🇳
            </p>
            <div className="flex items-center gap-4">
              {['Instagram', 'Twitter', 'LinkedIn'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="font-sans font-medium text-[13px] text-[var(--c-muted)] hover:text-[var(--c-cream)] transition-colors duration-300"
                >
                  {social}
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
                  <li key={link}>
                    <a
                      href="#"
                      className="font-sans text-[14px] text-[var(--c-muted)] hover:text-[var(--c-cream)] transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div>
            <h4 className="font-sans font-semibold text-[11px] uppercase tracking-[0.12em] text-[var(--c-cream)] mb-4">
              Contact
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:hello@cheeko.in"
                  className="font-sans text-[14px] text-[var(--c-muted)] hover:text-[var(--c-cream)] transition-colors duration-300"
                >
                  hello@cheeko.in
                </a>
              </li>
              <li className="font-sans text-[14px] text-[var(--c-muted)]">
                Bangalore, India
              </li>
              <li className="font-sans text-[14px] text-[var(--c-muted)]">
                Preorders: June 2026
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="font-sans text-[12px] text-[var(--c-muted)]">
            © 2026 Cheeko. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {['Terms of Use', 'Privacy Policy', 'Cookie Policy'].map((item, i) => (
              <span key={item} className="flex items-center gap-3">
                {i > 0 && (
                  <span className="text-[var(--c-muted)] opacity-30">·</span>
                )}
                <a
                  href="#"
                  className="font-sans text-[12px] text-[var(--c-muted)] hover:text-[var(--c-cream)] transition-colors duration-300"
                >
                  {item}
                </a>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
