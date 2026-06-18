'use client'
import { track } from '@vercel/analytics'

type Platform = {
  num: string
  name: string
  handle: string
  href: string
}

export default function PlatformLinks({ platforms }: { platforms: Platform[] }) {
  return (
    <>
      {platforms.map(p => (
        <a
          key={p.num}
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          className="link-row"
          onClick={() => track('platform_click', { name: p.name })}
        >
          <span className="link-num">{p.num}</span>
          <div className="link-body">
            <span className="link-name">{p.name}</span>
            <span className="link-handle">{p.handle}</span>
          </div>
          <span className="link-arr">&#8594;</span>
        </a>
      ))}
    </>
  )
}
