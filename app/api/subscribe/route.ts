import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  const apiKey = process.env.MAILCHIMP_API_KEY
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID
  const server = process.env.MAILCHIMP_SERVER_PREFIX

  if (!apiKey || !audienceId || !server) {
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 })
  }

  const res = await fetch(
    `https://${server}.api.mailchimp.com/3.0/lists/${audienceId}/members`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email_address: email, status: 'subscribed' }),
    }
  )

  if (res.status === 400) {
    const data = await res.json()
    // Already subscribed is fine — treat it as success
    if (data.title === 'Member Exists') {
      return NextResponse.json({ ok: true })
    }
    return NextResponse.json({ error: data.detail ?? 'Bad request' }, { status: 400 })
  }

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
