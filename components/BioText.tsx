'use client'
import { useState } from 'react'

export default function BioText() {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bio-text reveal">
      <p>
        <strong>Drifter Corp.</strong> is a four-piece prog rock band based in New York City.
        The band&rsquo;s identity is built around the idea that music can give temporary shape
        to a world that often appears shapeless. Drawing from progressive rock, blues, and
        experimental ideas, the group explores alienation, memory, desire, and the human search
        for meaning within an indifferent universe.
      </p>

      {expanded && (
        <>
          <p style={{ marginTop: '1em' }}>
            Rather than treating recording as the final documentation, Drifter Corp. approaches
            the studio as part of the composition itself. Each member brings a different
            discipline to the group. Shiwen, as the major composer and lyricist, contributed
            towards the structure of creative endeavors. Jeffery, as the guitarist, composer,
            and lyricist, enriched the philosophy. Harry, as the guitarist, sound engineer, and
            studio master, professionalized the band by providing music knowledge and
            industrial-level operations. Jerry, as the Bassist and band manager, lifted up the
            band to a more competitive stage. Every single Drifter provided a strong and
            inseparable identity, largely based on their knowledge of sound, computer-science,
            art history, data-science, economics, philosophy, and music technology.
          </p>

          <p style={{ marginTop: '1em' }}>
            Drifter Corp. is currently developing a body of work intended to be experienced as
            more than a sequence of songs. It is an ongoing world of sound, image, and
            narrative, as one that offers no simple explanation, but invites the listener to
            remain inside the questions.
          </p>
        </>
      )}

      <button
        className="bio-expand"
        style={{ marginTop: '0.75em', display: 'block' }}
        onClick={() => setExpanded(prev => !prev)}
        aria-expanded={expanded}
      >
        {expanded ? '← collapse' : 'read more →'}
      </button>
    </div>
  )
}
