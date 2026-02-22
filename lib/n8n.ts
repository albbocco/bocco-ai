const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL
const N8N_WEBHOOK_SECRET = process.env.N8N_WEBHOOK_SECRET

export async function triggerAvatarCreation({
  avatarId,
  photoUrl,
  name,
  description,
  userId,
}: {
  avatarId: string
  photoUrl: string
  name: string
  description?: string | null
  userId: string
}) {
  if (!N8N_WEBHOOK_URL) {
    throw new Error('N8N_WEBHOOK_URL not configured')
  }

  const response = await fetch(`${N8N_WEBHOOK_URL}/avatar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Webhook-Secret': N8N_WEBHOOK_SECRET || '',
    },
    body: JSON.stringify({
      avatarId,
      photoUrl,
      name,
      description,
      userId,
      webhookUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhook/n8n/avatar`,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to trigger avatar creation')
  }

  return response.json()
}

export async function triggerVideoCreation({
  videoId,
  avatarId,
  sourceUrl,
  sourceType,
  durationType,
  title,
  userId,
}: {
  videoId: string
  avatarId: string
  sourceUrl: string
  sourceType: 'url' | 'upload'
  durationType: 'short' | 'long'
  title: string
  userId: string
}) {
  if (!N8N_WEBHOOK_URL) {
    throw new Error('N8N_WEBHOOK_URL not configured')
  }

  const response = await fetch(`${N8N_WEBHOOK_URL}/video`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Webhook-Secret': N8N_WEBHOOK_SECRET || '',
    },
    body: JSON.stringify({
      videoId,
      avatarId,
      sourceUrl,
      sourceType,
      durationType,
      title,
      userId,
      webhookUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhook/n8n/video`,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to trigger video creation')
  }

  return response.json()
}
