import cloudinaryAssets from '@/data/cloudinary-assets.json'

const cloudinaryAssetMap: Record<string, string> = cloudinaryAssets

export function publicAsset(fileName: string) {
  const normalizedFileName = fileName.replace(/^\//, '')
  return cloudinaryAssetMap[normalizedFileName] ?? `${import.meta.env.BASE_URL}${normalizedFileName}`
}
