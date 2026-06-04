import { ContactShadows, Environment } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import CheekoModel from './CheekoModel'
import ParticleField from './ParticleField'
import PostFX from './PostFX'

type CheekoCanvasProps = {
  scrollProgress: number
  opacity: number
  onDeviceProjection?: (point: { x: number; y: number }) => void
}

function CameraParallax({ disabled }: { disabled: boolean }) {
  const { camera } = useThree()
  const target = useRef({ x: 0, y: 0.5 })
  const isTouch = useRef(false)

  useEffect(() => {
    isTouch.current = window.matchMedia('(hover: none), (pointer: coarse)').matches

    const onPointerMove = (event: PointerEvent) => {
      if (isTouch.current || disabled) return

      const normalizedX = (event.clientX / window.innerWidth) * 2 - 1
      const normalizedY = -((event.clientY / window.innerHeight) * 2 - 1)
      target.current.x = normalizedX * 0.08
      target.current.y = 0.5 + normalizedY * 0.08
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })

    return () => window.removeEventListener('pointermove', onPointerMove)
  }, [disabled])

  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, disabled ? 0 : target.current.x, 0.05)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, disabled ? 0.5 : target.current.y, 0.05)
    camera.lookAt(0, 0, 0)
  })

  return null
}

function DesktopContactShadow() {
  const { size } = useThree()

  if (size.width < 768) return null

  return <ContactShadows position={[0, -0.8, 0]} opacity={0.34} blur={2.5} scale={6} />
}

export default function CheekoCanvas({ scrollProgress, opacity, onDeviceProjection }: CheekoCanvasProps) {
  const [dpr, setDpr] = useState(1)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => setReducedMotion(media.matches)

    setDpr(Math.min(window.devicePixelRatio || 1, 1.5))
    updateMotion()
    media.addEventListener('change', updateMotion)

    return () => media.removeEventListener('change', updateMotion)
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 z-[12]" style={{ opacity }} aria-hidden="true">
      <Canvas
        dpr={dpr}
        shadows
        camera={{ fov: 45, position: [0, 0.5, 3.5] }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <CameraParallax disabled={reducedMotion} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[2, 4, 3]} intensity={1.8} color="#FFF4E6" castShadow />
        <directionalLight position={[-3, 1, -2]} intensity={0.6} color="#FF6B2C" />
        <pointLight position={[0, 2, 1]} intensity={0.5} color="#FFB830" />
        <Suspense fallback={null}>
          <Environment preset="city" />
          <ParticleField />
          <CheekoModel scrollProgress={reducedMotion ? 0.08 : scrollProgress} onDeviceProjection={onDeviceProjection} />
          <DesktopContactShadow />
          <PostFX />
        </Suspense>
      </Canvas>
    </div>
  )
}
