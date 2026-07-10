import WavesBg from '@/components/WavesBg'
import PlatformLinks from '@/components/PlatformLinks'
import { musicPlatforms, socialPlatforms } from '@/lib/platforms'

export const metadata = { title: 'Drifter Corp. — Links' }

const releaseBadges = [
  { name: 'Apple Music', img: '/1_apple_badge.png',   href: 'https://music.apple.com/us/artist/drifter-corp/6782407914' },
  { name: 'Spotify',     img: '/2_spotify_badge.png', href: 'https://open.spotify.com/artist/6WbDMwGpRtZdXUKEBrYhRR?si=-entC25UQVWl_1GNWj8XoA' },
  { name: 'YouTube Music', img: '/3_youtube_badge.png', href: 'https://music.youtube.com/@drifter_corp?si=BmrA2WApt4ulxWmA' },
  { name: 'Tidal',       img: '/4_tidal_badge.png',   href: 'https://tidal.com/artist/81416212/u' },
]

export default function LinksPage() {
  return (
    <>
      <WavesBg />

      <div className="site-wrap">
        <nav>
          <a href="/" className="nav-logo">Drifter Corp.</a>
        </nav>

        <section id="release">
          <div className="release-media">
            <img className="release-cover" src="/canopy_eden_release.png" alt="Canopy Eden" />
          </div>
          <div className="release-info">
            <span className="release-label">Single</span>
            <span className="release-title">Canopy Eden</span>
            <span className="release-status"><span className="dot" />Now Out</span>

            <div className="release-badges">
              {releaseBadges.map(b => (
                <a key={b.name} href={b.href} target="_blank" rel="noopener noreferrer">
                  <img src={b.img} alt={b.name} />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="links">
          <div className="sec-head">
            <h2>Music</h2>
          </div>
          <PlatformLinks platforms={musicPlatforms} />
        </section>

        <section id="social">
          <div className="sec-head">
            <h2>Social</h2>
          </div>
          <PlatformLinks platforms={socialPlatforms} />
        </section>

        <footer>
          <a href="/" className="ft-subscribe">&#8592; driftercorp.com</a>
          <span className="ft-brand">Drifter Corp.</span>
        </footer>
      </div>
    </>
  )
}
