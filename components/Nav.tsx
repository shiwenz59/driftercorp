'use client'
import { useEffect, useState } from 'react'

export default function Nav() {
  const [open, setOpen] = useState(false)

  function close() { setOpen(false) }

  useEffect(() => {
    if (!open) return
    const onScroll = () => setOpen(false)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [open])

  return (
    <nav className={open ? 'open' : undefined}>
      <a href="#home" className="nav-logo">Drifter Corp.</a>
      <ul className="nav-links">
        <li><a href="#bio" onClick={close}>About</a></li>
        <li><a href="#links" onClick={close}>Platforms</a></li>
        <li><a href="#announcements" onClick={close}>Calendar</a></li>
        <li><a href="#photos" onClick={close}>Gallery</a></li>
      </ul>
      <button
        className="nav-hamburger"
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen(prev => !prev)}
      >
        <span /><span /><span />
      </button>
    </nav>
  )
}
