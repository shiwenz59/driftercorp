type ReleaseBadge = {
  name: string
  img: string
  href: string
}

type ReleaseSectionProps = {
  cover: string
  coverAlt: string
  label: string
  title: string
  statusLabel: string
  badges: ReleaseBadge[]
}

export default function ReleaseSection({ cover, coverAlt, label, title, statusLabel, badges }: ReleaseSectionProps) {
  return (
    <section className="release">
      <div className="release-media">
        <img className="release-cover" src={cover} alt={coverAlt} />
      </div>
      <div className="release-info">
        <span className="release-label">{label}</span>
        <span className="release-title">{title}</span>
        <span className="hero-badge"><span className="dot" />{statusLabel}</span>

        <div className="release-badges">
          {badges.map(b => (
            <a key={b.name} href={b.href} target="_blank" rel="noopener noreferrer">
              <img src={b.img} alt={b.name} />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
