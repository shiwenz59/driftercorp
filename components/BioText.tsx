'use client'
import { useState } from 'react'

const rest = ' Drawing from psychedelic rock, progressive composition, blues, and experimental production, the group explores alienation, memory, desire, repetition, and the human search for meaning within an indifferent universe. Rather than treating recording as the final documentation of a performance, Drifter Corp. approaches the studio as part of the composition itself. The members work not only as musicians and songwriters, but as producers, sound engineers, and architects of atmosphere. Arrangements are developed through layered instrumentation, tonal experimentation, dynamic contrast, and careful mixing and mastering, as they allow each recording to exist as its own constructed environment. The band began through a shared dissatisfaction with music that felt immediate but disposable. What started as a collaboration between musicians with different creative instincts gradually developed into a larger project. At the center of Drifter Corp. is a tension between nihilism and creation. If existence offers no fixed meaning, the band does not treat that conclusion as an endpoint. Instead, its music asks why people continue to love, build, remember, destroy, and create in the face of uncertainty. Absurdity becomes not only a source of despair, but also a reason to make something deliberate.'

export default function BioText() {
  const [expanded, setExpanded] = useState(false)

  return (
    <p className="bio-text reveal">
      <strong>Drifter Corp.</strong> is a four-piece prog rock band based in New York
      City. The band&rsquo;s identity is built around the idea that music can give
      temporary shape to a world that often appears shapeless.
      {expanded && rest}
      {' '}
      <button
        className="bio-expand"
        onClick={() => setExpanded(prev => !prev)}
        aria-expanded={expanded}
      >
        {expanded ? '← collapse' : 'read more →'}
      </button>
    </p>
  )
}
