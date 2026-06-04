import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

const PARTICLE_COUNT = 420

export default function ParticleField() {
  const geometryRef = useRef<THREE.BufferGeometry>(null)
  const pointer = useRef({ x: 0, y: 0, active: false })
  const [reducedMotion, setReducedMotion] = useState(false)

  const { positions, colors } = useMemo(() => {
    const positionArray = new Float32Array(PARTICLE_COUNT * 3)
    const colorArray = new Float32Array(PARTICLE_COUNT * 3)
    const orange = new THREE.Color('#E96B2C')
    const mutedInk = new THREE.Color('#5C6166')
    const mixed = new THREE.Color()

    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      const index = i * 3
      const radius = Math.cbrt(Math.random()) * 4
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positionArray[index] = radius * Math.sin(phi) * Math.cos(theta)
      positionArray[index + 1] = radius * Math.cos(phi)
      positionArray[index + 2] = radius * Math.sin(phi) * Math.sin(theta)

      mixed.copy(orange).lerp(mutedInk, Math.random() * 0.32)
      colorArray[index] = mixed.r
      colorArray[index + 1] = mixed.g
      colorArray[index + 2] = mixed.b
    }

    return { positions: positionArray, colors: colorArray }
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => setReducedMotion(media.matches)
    const updatePointer = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = -((event.clientY / window.innerHeight) * 2 - 1)
      pointer.current.active = true
    }

    updateMotion()
    media.addEventListener('change', updateMotion)
    window.addEventListener('pointermove', updatePointer, { passive: true })

    return () => {
      media.removeEventListener('change', updateMotion)
      window.removeEventListener('pointermove', updatePointer)
    }
  }, [])

  useFrame(() => {
    const geometry = geometryRef.current
    if (!geometry || reducedMotion) return

    const attribute = geometry.getAttribute('position') as THREE.BufferAttribute
    const array = attribute.array as Float32Array
    const targetX = pointer.current.x * 2
    const targetY = pointer.current.y * 1.35
    let repelled = 0

    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      const index = i * 3
      array[index + 1] += 0.0003

      if (array[index + 1] > 2) {
        array[index + 1] = -2
      }

      if (pointer.current.active && repelled < 30) {
        const dx = array[index] - targetX
        const dy = array[index + 1] - targetY
        const distanceSq = dx * dx + dy * dy

        if (distanceSq < 0.36 && distanceSq > 0.001) {
          const force = (0.36 - distanceSq) * 0.002
          array[index] += dx * force
          array[index + 1] += dy * force
          repelled += 1
        }
      }
    }

    attribute.needsUpdate = true
  })

  return (
    <points frustumCulled={false}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.021}
        vertexColors
        transparent
        opacity={0.68}
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  )
}
