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
    px: 0, py: 1.5, pz: 4,
    tx: 0, ty: 0.8, tz: 0,
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

    // Vista soggiorno
    tl.to(c, { px:  2, py: 1.2, pz:  3, tx:  0, ty: 0.8, tz:  0, duration: 1 }, 0)
    // Vista sala da pranzo
    tl.to(c, { px: -2, py: 1.4, pz:  2, tx:  0, ty: 0.7, tz: -1, duration: 1 }, 1)
    // Pull back generale
    tl.to(c, { px:  0, py: 2.5, pz:  5, tx:  0, ty: 0.8, tz:  0, duration: 1 }, 2)

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

function ApartmentModel() {
  const { scene } = useGLTF('/modern_apartment.glb')

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow    = true
        child.receiveShadow = true
        if (child.material) {
          child.material.envMapIntensity = 0.8
          if (child.material.transparent && child.material.opacity > 0.9) {
            child.material.transparent = false
          }
        }
      }
    })
  }, [scene])

  return <primitive object={scene} scale={1} position={[0, 0, 0]} />
}

function Particles({ count = 60 }) {
  const ref = useRef()
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 12
    positions[i * 3 + 1] = (Math.random() - 0.5) * 6
    positions[i * 3 + 2] = (Math.random() - 0.5) * 12
  }
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.005
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#C9A96E" transparent opacity={0.35} sizeAttenuation />
    </points>
  )
}

function SceneContent() {
  return (
    <>
      <CameraRig />
      <ambientLight intensity={0.2} color="#F5EDD6" />
      <spotLight position={[0, 8, 0]} intensity={2} angle={0.5} penumbra={1} color="#FFF5E0" castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[3,  0.5,  2]} intensity={0.8} color="#E8D5A3" distance={8} />
      <pointLight position={[-3, 0.5,  1]} intensity={0.6} color="#F5EDD6" distance={6} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} color="#B0C4DE" />
      <Suspense fallback={null}>
        <Environment preset="night" background={false} />
        <ApartmentModel />
      </Suspense>
      <ContactShadows position={[0, -0.01, 0]} opacity={0.4} scale={12} blur={2} far={3} color="#000000" />
      <Particles />
    </>
  )
}

export default function SceneProperties() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ fov: 60, near: 0.01, far: 500, position: [0, 1.5, 4] }}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
      }}
    >
      <SceneContent />
    </Canvas>
  )
}

useGLTF.preload('/modern_apartment.glb')
