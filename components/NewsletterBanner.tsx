'use client'
import { useState, useEffect } from 'react'

const KEY_DISMISSED  = 'dc_newsletter_dismissed_at'  // timestamp — expires after 7 days
const KEY_SUBSCRIBED = 'dc_newsletter_subscribed'     // permanent
const WEEK_MS = 7 * 24 * 60 * 60 * 1000

function shouldShow() {
  if (localStorage.getItem(KEY_SUBSCRIBED)) return false
  const dismissedAt = localStorage.getItem(KEY_DISMISSED)
  if (!dismissedAt) return true
  return Date.now() - Number(dismissedAt) > WEEK_MS
}

export default function NewsletterBanner() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (!shouldShow()) return
    const timer = setTimeout(() => setVisible(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  function dismiss() {
    localStorage.setItem(KEY_DISMISSED, String(Date.now()))
    setVisible(false)
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) {
        setStatus('error')
        setErrorMsg(data.error ?? 'Something went wrong.')
      } else {
        setStatus('success')
        localStorage.setItem(KEY_SUBSCRIBED, '1')
        setTimeout(() => setVisible(false), 2500)
      }
    } catch {
      setStatus('error')
      setErrorMsg('Network error. Please try again.')
    }
  }

  if (!visible) return null

  return (
    <div className="nl-banner" role="region" aria-label="Newsletter signup">
      <button className="nl-close" onClick={dismiss} aria-label="Dismiss">&#215;</button>

      {status === 'success' ? (
        <p className="nl-success">You&rsquo;re in. Thanks for joining!</p>
      ) : (
        <>
          <p className="nl-heading">Stay in the loop</p>
          <p className="nl-sub">Get updates on shows and new music.</p>
          <form className="nl-form" onSubmit={submit}>
            <input
              className="nl-input"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              disabled={status === 'loading'}
            />
            <button className="nl-submit" type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? '...' : 'Subscribe'}
            </button>
          </form>
          {status === 'error' && <p className="nl-error">{errorMsg}</p>}
        </>
      )}
    </div>
  )
}
