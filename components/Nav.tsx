'use client'
import { useState } from 'react'

export default function Nav() {
  const [open, setOpen] = useState(false)

  function close() { setOpen(false) }

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
