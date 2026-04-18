import { useRef, useEffect, Suspense, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Environment, ContactShadows, Float } from '@react-three/drei'
import { useLocation } from 'react-router-dom'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const GLB_VILLA      = '/villa.glb'
const GLB_APARTMENT  = '/modern_apartment.glb'
const GLB_AUDITORIUM = '/super_minimal_round_auditorium.glb'
const GLB_STUDIO     = '/studio_office_interior.glb'

/* ─── Camera Rig HOME ────────────────────────────────────── */
function CameraRigHome() {
  const { camera } = useThree()
  const cam = useRef({ px: 0, py: 1.5, pz: 5, tx: 0, ty: 0.8, tz: 0 })

  useEffect(() => {
    const c = cam.current
    camera.position.set(c.px, c.py, c.pz)
    camera.lookAt(c.tx, c.ty, c.tz)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 2,
      },
    })

    tl.to(c, { px: 2.5, py: 1.4, pz: 3.5, tx: 0, ty: 0.7, tz: 0,  duration: 1 }, 0)
    tl.to(c, { px: -2.5, py: 1.3, pz: 2,  tx: 0, ty: 0.6, tz: -1, duration: 1 }, 1)
    tl.to(c, { px: 0.5, py: 0.9, pz: 0.5, tx: 0, ty: 0.5, tz: -2, duration: 1 }, 2)
    tl.to(c, { px: 0,   py: 2.8, pz: 5.5, tx: 0, ty: 0.8, tz: 0,  duration: 1 }, 3)

    return () => { tl.scrollTrigger?.kill(); tl.kill() }
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

/* ─── Camera Rig PROPERTIES ──────────────────────────────── */
function CameraRigProperties() {
  const { camera } = useThree()
  const cam = useRef({ px: 0, py: 1.5, pz: 4, tx: 0, ty: 0.8, tz: 0 })

  useEffect(() => {
    const c = cam.current
    camera.position.set(c.px, c.py, c.pz)
    camera.lookAt(c.tx, c.ty, c.tz)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.page-wrapper',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 2,
      },
    })

    tl.to(c, { px: 2,  py: 1.2, pz: 3, tx: 0, ty: 0.8, tz: 0,  duration: 1 }, 0)
    tl.to(c, { px: -2, py: 1.4, pz: 2, tx: 0, ty: 0.7, tz: -1, duration: 1 }, 1)
    tl.to(c, { px: 0,  py: 2.5, pz: 5, tx: 0, ty: 0.8, tz: 0,  duration: 1 }, 2)

    return () => { tl.scrollTrigger?.kill(); tl.kill() }
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

/* ─── Camera Rig ABOUT ───────────────────────────────────── */
function CameraRigAbout() {
  const { camera } = useThree()
  const cam = useRef({ px: 0, py: 2, pz: 8, tx: 0, ty: 1, tz: 0 })

  useEffect(() => {
    const c = cam.current
    camera.position.set(c.px, c.py, c.pz)
    camera.lookAt(c.tx, c.ty, c.tz)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.page-wrapper',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 2,
      },
    })

    tl.to(c, { px: 4,  py: 1.8, pz: 6, tx: 0, ty: 1.2, tz: 0, duration: 1 }, 0)
    tl.to(c, { px: -4, py: 2.0, pz: 4, tx: 0, ty: 1.0, tz: 0, duration: 1 }, 1)
    tl.to(c, { px: 0,  py: 3.5, pz: 7, tx: 0, ty: 1.0, tz: 0, duration: 1 }, 2)

    return () => { tl.scrollTrigger?.kill(); tl.kill() }
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

/* ─── Camera Rig CONTACT ─────────────────────────────────── */
function CameraRigContact() {
  const { camera } = useThree()
  const cam = useRef({ px: 1.5, py: 1.8, pz: 2.5, tx: 0, ty: 0.8, tz: 0 })

  useEffect(() => {
    const c = cam.current
    camera.position.set(c.px, c.py, c.pz)
    camera.lookAt(c.tx, c.ty, c.tz)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.page-wrapper',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 2,
      },
    })

    tl.to(c, { px: 0.5,  py: 1.2, pz: 1.8,  tx: 0,    ty: 0.7, tz: 0,    duration: 1 }, 0)
    tl.to(c, { px: -1.5, py: 1.0, pz: 1.5,  tx: -0.5, ty: 0.6, tz: -0.5, duration: 1 }, 1)
    tl.to(c, { px: 0,    py: 1.5, pz: 0.8,  tx: 0,    ty: 1.2, tz: 0,    duration: 1 }, 2)

    return () => { tl.scrollTrigger?.kill(); tl.kill() }
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

/* ─── Modelli ────────────────────────────────────────────── */
function VillaModel() {
  const { scene } = useGLTF(GLB_VILLA)
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
        if (child.material) {
          child.material.envMapIntensity = 0.6
          if (child.material.transparent && child.material.opacity > 0.9)
            child.material.transparent = false
        }
      }
    })
  }, [scene])
  return <primitive object={scene} scale={1} position={[0, 0, 0]} />
}

function ApartmentModel() {
  const { scene } = useGLTF(GLB_APARTMENT)
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
        if (child.material) {
          child.material.envMapIntensity = 0.8
          if (child.material.transparent && child.material.opacity > 0.9)
            child.material.transparent = false
        }
      }
    })
  }, [scene])
  return <primitive object={scene} scale={1} position={[0, 0, 0]} />
}

function CastleModel() {
  const { scene } = useGLTF(GLB_AUDITORIUM)
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
        if (child.material) {
          child.material.envMapIntensity = 0.7
          if (child.material.transparent && child.material.opacity > 0.9)
            child.material.transparent = false
        }
      }
    })
  }, [scene])
  return <primitive object={scene} scale={1} position={[0, 0, 0]} />
}

function StudioModel() {
  const { scene } = useGLTF(GLB_STUDIO)
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
        if (child.material) {
          child.material.envMapIntensity = 0.7
          if (child.material.transparent && child.material.opacity > 0.9)
            child.material.transparent = false
        }
      }
    })
  }, [scene])
  return <primitive object={scene} scale={1} position={[0, 0, 0]} />
}

/* ─── Fallback Box ───────────────────────────────────────── */
function FallbackBox() {
  const ref = useRef()
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.4
  })
  return (
    <Float speed={1.4} floatIntensity={0.4}>
      <mesh ref={ref} castShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#C9A96E" metalness={0.85} roughness={0.12} />
      </mesh>
    </Float>
  )
}

/* ─── Particles ──────────────────────────────────────────── */
function Particles({ count = 80, spread = 12 }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * spread
      arr[i * 3 + 1] = (Math.random() - 0.5) * (spread / 2)
      arr[i * 3 + 2] = (Math.random() - 0.5) * spread
    }
    return arr
  }, [count, spread])
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.005
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#C9A96E" transparent opacity={0.4} sizeAttenuation />
    </points>
  )
}

/* ─── Scene Content — cambia in base alla route ──────────── */
function SceneContent({ pathname }) {
  const isHome       = pathname === '/'
  const isProperties = pathname === '/properties'
  const isAbout      = pathname === '/about'
  const isContact    = pathname === '/contact'

  return (
    <>
      {isHome       && <CameraRigHome />}
      {isProperties && <CameraRigProperties />}
      {isAbout      && <CameraRigAbout />}
      {isContact    && <CameraRigContact />}

      <ambientLight intensity={0.18} color="#F5EDD6" />
      <spotLight
        position={[0, 10, 0]}
        intensity={2.2}
        angle={0.5}
        penumbra={1}
        color="#FFF5E0"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[3,  0.5,  2]}  intensity={0.8} color="#C9A96E" distance={10} />
      <pointLight position={[-3, 0.5,  1]}  intensity={0.6} color="#E8D5A3" distance={8}  />
      <directionalLight position={[8, 6, 8]} intensity={0.35} color="#B0C4DE" />

      <Suspense fallback={<FallbackBox />}>
        <Environment preset="night" background={false} />
        {isHome       && <VillaModel />}
        {isProperties && <ApartmentModel />}
        {isAbout      && <CastleModel />}
        {isContact    && <StudioModel />}
      </Suspense>

      <ContactShadows
        position={[0, -0.01, 0]}
        opacity={0.4}
        scale={14}
        blur={2.5}
        far={4}
        color="#000000"
      />
      <Particles />
    </>
  )
}

/* ─── Canvas unico globale ───────────────────────────────── */
export default function Scene3D() {
  const location = useLocation()

  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ fov: 60, near: 0.01, far: 500, position: [0, 1.5, 5] }}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
      }}
    >
      <SceneContent pathname={location.pathname} />
    </Canvas>
  )
}

// Preload landing model immediately; defer remaining models until after initial render
useGLTF.preload(GLB_VILLA)

if (typeof window !== 'undefined') {
  const prefetch = () => {
    useGLTF.preload(GLB_APARTMENT)
    useGLTF.preload(GLB_AUDITORIUM)
    useGLTF.preload(GLB_STUDIO)
  }
  if (document.readyState === 'complete') {
    prefetch()
  } else {
    window.addEventListener('load', prefetch, { once: true })
  }
}
