'use client'

export default function FooterSubscribeTrigger() {
  function open() {
    window.dispatchEvent(new CustomEvent('dc:show-newsletter'))
  }

  return (
    <button className="ft-subscribe" onClick={open}>
      Mailing List &#8594;
    </button>
  )
}
