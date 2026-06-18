'use client'
import { useEffect, useRef, type ReactNode } from 'react'

// globals.css: .hero-badge { animation-delay: 1.55s } + hero-item-in { duration: 0.9s } = 2.45s + buffer
const HERO_DONE = 2600

export default function MainContent({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)

    const timer = setTimeout(() => {
      const el = ref.current
      if (!el) return
      el.classList.add('visible')

      requestAnimationFrame(() => {
        const io = new IntersectionObserver(entries => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              e.target.classList.add('in')
              io.unobserve(e.target)
            }
          })
        }, { threshold: 0.15 })

        el.querySelectorAll('.reveal:not(.bio-quote)').forEach(node => io.observe(node))

        const quoteEl = el.querySelector('.bio-quote')
        if (quoteEl) {
          const rect = quoteEl.getBoundingClientRect()
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            quoteEl.classList.add('in')
          } else {
            const ioQuote = new IntersectionObserver(entries => {
              entries.forEach(e => {
                if (e.isIntersecting) {
                  e.target.classList.add('in')
                  ioQuote.unobserve(e.target)
                }
              })
            }, { threshold: 0.2 })
            ioQuote.observe(quoteEl)
          }
        }
      })
    }, HERO_DONE)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div id="main-content" ref={ref}>
      {children}
    </div>
  )
}
