import WavesBg from '@/components/WavesBg'
import PlatformLinks from '@/components/PlatformLinks'
import { platforms } from '@/lib/platforms'

export const metadata = { title: 'Drifter Corp. — Links' }

export default function LinksPage() {
  return (
    <>
      <WavesBg />

      <div className="site-wrap">
        <nav>
          <a href="/" className="nav-logo">Drifter Corp.</a>
        </nav>

        <section id="links" style={{ borderTop: 'none' }}>
          <div className="sec-head">
            <h2>Platforms</h2>
          </div>
          <PlatformLinks platforms={platforms} />
        </section>

        <footer>
          <a href="/" className="ft-subscribe">&#8592; driftercorp.com</a>
          <span className="ft-brand">Drifter Corp.</span>
        </footer>
      </div>
    </>
  )
}
