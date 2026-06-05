import { publicAsset } from '@/lib/assets'

type CheekoLogoProps = {
  className?: string
  loading?: 'eager' | 'lazy'
}

export default function CheekoLogo({ className = '', loading = 'lazy' }: CheekoLogoProps) {
  return (
    <img
      src={publicAsset('cheekolog.svg')}
      alt="Cheeko"
      width={134}
      height={68}
      loading={loading}
      decoding="async"
      className={className}
    />
  )
}
