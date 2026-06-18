import WavesBg from '@/components/WavesBg'
import Nav from '@/components/Nav'
import MainContent from '@/components/MainContent'
import BioText from '@/components/BioText'

const members = [
  { name: 'Harry Zhao',   role: ['Producer /', 'Guitar'],           img: '/harry.jpg'  },
  { name: 'Jeffery Zhao', role: ['Guitar /',   'Songwriter'],       img: '/jeff.jpg'   },
  { name: 'Jerry Huang',  role: ['Bass /',     'Manager'],          img: '/jerry.jpg'  },
  { name: 'Shiwen Zhu',   role: ['Vocals/Keys/',      'Songwriter'],         img: '/shiwen.jpg' },
]

const platforms = [
  { num: '01', name: 'Samply',    handle: 'Demo Listening',        href: 'https://samply.app/p/Wbah11phHCbJ0mUhMBKW?si=r16IHHRhZFb6pZAt6edHKcE9MpF3' },
  { num: '02', name: 'Instagram', handle: '@drifter_corp',         href: 'https://www.instagram.com/drifter_corp/' },
  { num: '03', name: 'RedNote',   handle: '小红书 · @Drifter Corp.', href: 'https://xhslink.com/m/O76ZBqVad0' },
  { num: '04', name: 'TikTok',    handle: '@drifter_corp',         href: 'https://www.tiktok.com/@drifter_corp' },
]

export default function Page() {
  return (
    <>
      <WavesBg />

      <div className="site-wrap">
        <Nav />

        {/* ── Hero ── */}
        <section id="home">
          <div className="hero-photo" />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="hero-eyebrow">Independent &middot; New York &middot; Est. 2025</p>
            <h1 className="hero-title">Drifter<br />Corp.</h1>
            <div className="hero-badge">
              <span className="dot" />
              Ebbs N&rsquo; Flows &mdash; Coming Soon
            </div>
          </div>
        </section>

        <MainContent>

          {/* ── About ── */}
          <section id="bio">
            <div className="sec-head reveal"><h2>About</h2></div>

            <em className="bio-quote reveal">
              &ldquo;We&rsquo;re all drifting on this journey with no end.&rdquo;
            </em>

            <BioText />

            <div className="bio-grid reveal">
              {members.map(m => (
                <div className="member-card" key={m.name}>
                  <div className="member-pic" style={{ backgroundImage: `url('${m.img}')` }} />
                  <div className="member-info">
                    <div className="member-name">{m.name}</div>
                    <div className="member-role">{m.role[0]}<br />{m.role[1]}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Platforms ── */}
          <section id="links">
            <div className="sec-head reveal"><h2>Platforms</h2></div>
            {platforms.map(p => (
              <a key={p.num} href={p.href} target="_blank" rel="noopener noreferrer" className="link-row">
                <span className="link-num">{p.num}</span>
                <div className="link-body">
                  <span className="link-name">{p.name}</span>
                  <span className="link-handle">{p.handle}</span>
                </div>
                <span className="link-arr">&#8594;</span>
              </a>
            ))}
          </section>

          {/* ── Calendar ── */}
          <section id="announcements">
            <div className="sec-head reveal"><h2>Calendar</h2></div>

            <div className="ann-item ann-item--past reveal">
              <div className="ann-date">
                <span className="month">Apr</span>
                <span className="day">05</span>
              </div>
              <div className="ann-body">
                <span className="ann-tag tag-show">Live Show</span>
                <div className="ann-title">Live at Mercury Lounge</div>
                <div className="ann-desc">
                  New York &middot; 8PM &middot;{' '}
                  <a href="https://docs.google.com/forms/d/e/1FAIpQLScs3TZ6ZxWA7l-RvgtfQZhmn81gNiqZZZZ6KdPJdkAt2TNaZQ/viewform" target="_blank" rel="noopener noreferrer">Register</a>
                </div>
              </div>
            </div>

            <div className="ann-item ann-item--past reveal">
              <div className="ann-date">
                <span className="month">May</span>
                <span className="day">03</span>
              </div>
              <div className="ann-body">
                <span className="ann-tag tag-news">Event</span>
                <div className="ann-title">Ebbs N&rsquo; Flows &mdash; Listening Party</div>
                <div className="ann-desc">
                  Pre-launch listening event.<br />
                  New York &middot; Saturday &middot; 7&ndash;9PM &middot;{' '}
                  <a href="https://partiful.com/e/O4F2eOzlIz8aVC4YGdDz?c=9TKsns9N" target="_blank" rel="noopener noreferrer">Register</a>
                </div>
              </div>
            </div>
          </section>

          {/* ── Gallery ── */}
          <section id="photos">
            <div className="sec-head reveal"><h2>Gallery</h2></div>
            <div className="gallery">
              <div className="g-cell wide" style={{ backgroundImage: "url('/photo1.jpg')" }} />
              <div className="g-cell"      style={{ backgroundImage: "url('/photo2.jpg')" }} />
              <div className="g-cell"      style={{ backgroundImage: "url('/photo3.jpg')" }} />
              <div className="g-cell wide" style={{ backgroundImage: "url('/photo4.jpg')" }} />
            </div>
          </section>

          {/* ── Footer ── */}
          <footer>
            <span className="ft-copy">&copy; Drifter Corp. All rights reserved.</span>
          </footer>

        </MainContent>
      </div>
    </>
  )
}
