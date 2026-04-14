import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb'],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react':  ['react', 'react-dom', 'react-router-dom'],
          'vendor-three':  ['three'],
          'vendor-r3f':    ['@react-three/fiber', '@react-three/drei'],
          'vendor-gsap':   ['gsap'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})
