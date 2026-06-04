import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing'

export default function PostFX() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom luminanceThreshold={0.6} luminanceSmoothing={0.9} intensity={0.4} />
      <Vignette eskil={false} offset={0.3} darkness={0.6} />
    </EffectComposer>
  )
}
