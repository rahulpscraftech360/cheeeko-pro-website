import { Float, useGLTF, useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

const MODEL_PATH = '/cheeko.glb'
const SCREEN_IMAGE_PATH = '/screen.png'
const BASE_Y = -0.72
const MODEL_SCALE = 12.6
const MOBILE_MODEL_SCALE = 9.6

type CheekoModelProps = {
  scrollProgress: number
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3)
}

function clamp(value: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value))
}

function modelXFromProgress(progress: number, isCompact: boolean) {
  if (isCompact) return 0
  if (progress <= 0.16) return 0
  if (progress <= 0.5) return THREE.MathUtils.lerp(0, 1.18, easeOutCubic(clamp((progress - 0.16) / 0.34)))
  return 1.18
}

function modelYFromProgress(progress: number) {
  if (progress <= 0.16) return 2.35
  if (progress >= 0.48) return BASE_Y

  return THREE.MathUtils.lerp(2.35, BASE_Y, easeOutCubic(clamp((progress - 0.16) / 0.32)))
}

function modelRotationFromProgress(progress: number) {
  if (progress <= 0.16) return -0.35
  if (progress <= 0.48) return THREE.MathUtils.lerp(-0.35, 0.08, easeOutCubic(clamp((progress - 0.16) / 0.32)))
  if (progress <= 0.72) return 0.08

  return THREE.MathUtils.lerp(0.08, 0.55, easeOutCubic(clamp((progress - 0.72) / 0.28)))
}

export default function CheekoModel({ scrollProgress }: CheekoModelProps) {
  const { scene } = useGLTF(MODEL_PATH)
  const screenTexture = useTexture(SCREEN_IMAGE_PATH)
  const { size } = useThree()
  const ref = useRef<THREE.Group>(null)
  const smoothedProgress = useRef(0)
  const [reducedMotion, setReducedMotion] = useState(false)

  useMemo(() => {
    screenTexture.colorSpace = THREE.SRGBColorSpace
    screenTexture.flipY = false
    screenTexture.wrapS = THREE.ClampToEdgeWrapping
    screenTexture.wrapT = THREE.ClampToEdgeWrapping
    screenTexture.anisotropy = 8
    screenTexture.needsUpdate = true
  }, [screenTexture])

  const styledScene = useMemo(() => {
    const clone = scene.clone(true)

    clone.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return

      const meshName = object.name.toLowerCase()
      const existingMaterials = Array.isArray(object.material) ? object.material : [object.material]
      const materialNames = existingMaterials.map((material) => material?.name.toLowerCase() ?? '').join(' ')

      if (meshName.includes('display')) {
        const screenMaterial = new THREE.MeshStandardMaterial({
          map: screenTexture,
          color: '#ffffff',
          emissive: '#ffffff',
          emissiveMap: screenTexture,
          emissiveIntensity: 0.45,
          roughness: 0.38,
          metalness: 0,
        })
        screenMaterial.toneMapped = false
        object.material = screenMaterial
        return
      }

      const isAccent =
        meshName.includes('button') ||
        meshName.includes('knob') ||
        meshName.includes('front006_1') ||
        meshName.includes('body12002_2') ||
        meshName.includes('body12002_3') ||
        meshName.includes('body12002_5') ||
        materialNames.includes('opaque(71') ||
        materialNames.includes('opaque(77') ||
        materialNames.includes('opaque(67')

      if (isAccent) {
        object.material = new THREE.MeshStandardMaterial({
          color: '#5A2F11',
          roughness: 0.78,
          metalness: 0,
          envMapIntensity: 0.45,
        })
        return
      }

      object.material = new THREE.MeshStandardMaterial({
        color: '#D8A137',
        roughness: 0.92,
        metalness: 0,
        envMapIntensity: 0.32,
      })
    })

    return clone
  }, [scene, screenTexture])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(media.matches)

    update()
    media.addEventListener('change', update)

    return () => media.removeEventListener('change', update)
  }, [])

  useFrame((state) => {
    if (!ref.current) return

    smoothedProgress.current = THREE.MathUtils.lerp(smoothedProgress.current, scrollProgress, 0.09)

    const progress = smoothedProgress.current
    const isCompact = size.width < 768
    const targetX = modelXFromProgress(progress, isCompact)
    const targetY = modelYFromProgress(progress)
    const targetRotation = modelRotationFromProgress(progress)
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, targetX, 0.06)
    ref.current.position.y = reducedMotion ? BASE_Y : targetY + Math.sin(state.clock.elapsedTime) * 0.04
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, reducedMotion ? 0.08 : targetRotation, 0.08)
  })

  return (
    <Float enabled={!reducedMotion} speed={1.2} floatIntensity={0.16} rotationIntensity={0.08}>
      <group ref={ref} scale={size.width < 768 ? MOBILE_MODEL_SCALE : MODEL_SCALE} position={[0, BASE_Y, 0]}>
        <primitive object={styledScene} />
      </group>
    </Float>
  )
}

useGLTF.preload(MODEL_PATH)
useTexture.preload(SCREEN_IMAGE_PATH)
