import WavesBg from '@/components/WavesBg'
import PlatformLinks from '@/components/PlatformLinks'
import ReleaseSection from '@/components/ReleaseSection'
import { musicPlatforms, socialPlatforms } from '@/lib/platforms'

export const metadata = { title: 'Drifter Corp. — Links' }

const nextReleaseBadges = [
  { name: 'Apple Music', img: '/1_apple_badge.png',   href: 'https://music.apple.com/us/album/ebbs-n-flows/6798915673' },
  { name: 'Spotify',     img: '/2_spotify_badge.png', href: 'https://distrokid.com/hyperfollow/driftercorp/ebbs-n-flows' },
]

export default function LinksPage() {
  return (
    <>
      <WavesBg />

      <div className="site-wrap">
        <nav>
          <a href="/" className="nav-logo">Drifter Corp.</a>
        </nav>

        <ReleaseSection
          cover="/enf_release.png"
          coverAlt="Ebbs N' Flows"
          label="Album"
          title="Ebbs N' Flows"
          statusLabel="PRE-ORDER NOW"
          badges={nextReleaseBadges}
          note="More pre-order options coming soon."
        />

        {/* Canopy Eden release hidden for now — restore badges array above to bring back.
        <ReleaseSection
          cover="/canopy_eden_release.png"
          coverAlt="Canopy Eden"
          label="Single"
          title="Canopy Eden"
          statusLabel="OUT NOW"
          badges={[]}
        />
        */}

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
