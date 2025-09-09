import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Lenis from '@studio-freight/lenis'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
;

// Initialize smooth scrolling with a subtle glide effect
(() => {
  if (typeof window === 'undefined') return
  // Respect reduced-motion preferences
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) return

  // Skip on coarse/touch inputs where native scrolling feels better
  const isCoarsePointer = window.matchMedia('(hover: none), (pointer: coarse)').matches
  if (isCoarsePointer) return

  // Avoid duplicate init during hot reloads
  if ((window as any).__lenis) return

  const lenis = new Lenis({
    // Slightly slower + glide
    duration: 1.1, // default ~1.0; a touch slower
    smoothWheel: true,
    wheelMultiplier: 0.81, // ~10% slower than previous (0.9)
    gestureOrientation: 'vertical',
  })

  ;(window as any).__lenis = lenis

  const raf = (time: number) => {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
})()
