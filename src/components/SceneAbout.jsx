import { useRef, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function CameraRig() {
  const { camera } = useThree()

  const cam = useRef({
    px: 0, py: 2, pz: 8,
    tx: 0, ty: 1, tz: 0,
  })

  useEffect(() => {
    const c = cam.current
    camera.position.set(c.px, c.py, c.pz)
    camera.lookAt(c.tx, c.ty, c.tz)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.page-wrapper',
        start: 'top top',
        end:   'bottom bottom',
        scrub: 2,
      },
    })

    // Vista frontale archi
    tl.to(c, { px:  4, py: 1.8, pz:  6, tx:  0, ty: 1.2, tz:  0, duration: 1 }, 0)
    // Vista laterale colonne
    tl.to(c, { px: -4, py: 2.0, pz:  4, tx:  0, ty: 1.0, tz:  0, duration: 1 }, 1)
    // Vista cortile centrale
    tl.to(c, { px:  0, py: 3.5, pz:  7, tx:  0, ty: 1.0, tz:  0, duration: 1 }, 2)

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [camera])

  useFrame(() => {
    const { px, py, pz, tx, ty, tz } = cam.current
    camera.position.x += (px - camera.position.x) * 0.04
    camera.position.y += (py - camera.position.y) * 0.04
    camera.position.z += (pz - camera.position.z) * 0.04
    camera.lookAt(tx, ty, tz)
  })

  return null
}

function CastleModel() {
  const { scene } = useGLTF('/super_minimal_round_auditorium.glb')

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow    = true
        child.receiveShadow = true
        if (child.material) {
          child.material.envMapIntensity = 0.7
          if (child.material.transparent && child.material.opacity > 0.9) {
            child.material.transparent = false
          }
        }
      }
    })
  }, [scene])

  return <primitive object={scene} scale={1} position={[0, 0, 0]} />
}

function Particles({ count = 80 }) {
  const ref = useRef()
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 18
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10
    positions[i * 3 + 2] = (Math.random() - 0.5) * 18
  }
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.005
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#C9A96E" transparent opacity={0.4} sizeAttenuation />
    </points>
  )
}

function SceneContent() {
  return (
    <>
      <CameraRig />
      <ambientLight intensity={0.25} color="#F5EDD6" />
      <directionalLight position={[10, 16, 6]} intensity={1.8} color="#FFFFFF" castShadow shadow-mapSize={[2048, 2048]} shadow-camera-far={50} shadow-camera-left={-20} shadow-camera-right={20} shadow-camera-top={20} shadow-camera-bottom={-20} />
      <pointLight position={[-6, 5, -5]}  intensity={0.7} color="#C9A96E" />
      <pointLight position={[6,  3,  5]}  intensity={0.5} color="#F5EDD6" />
      <spotLight position={[0, 14, 0]} intensity={1.2} angle={0.4} penumbra={1} color="#C9A96E" castShadow />
      <Suspense fallback={null}>
        <Environment preset="night" background={false} />
        <CastleModel />
      </Suspense>
      <ContactShadows position={[0, -0.01, 0]} opacity={0.45} scale={20} blur={3} far={5} color="#000000" />
      <Particles />
    </>
  )
}

export default function SceneAbout() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ fov: 60, near: 0.01, far: 500, position: [0, 2, 8] }}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
      }}
    >
      <SceneContent />
    </Canvas>
  )
}

useGLTF.preload('/super_minimal_round_auditorium.glb')
