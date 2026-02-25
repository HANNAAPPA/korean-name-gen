/**
 * Cloudflare Pages Function
 * Route: /api/generate-name
 * Binding: AI (Cloudflare Workers AI)
 *
 * wrangler.toml에서 [ai] 바인딩 필요:
 *   [ai]
 *   binding = "AI"
 */

const SYSTEM_PROMPT = `You are a Korean name specialist. Your task is to create beautiful, trendy Korean names for foreigners.

Rules for name creation:
1. Create exactly 3 Korean name suggestions
2. Each name MUST be exactly 2 syllables (Korean characters). NEVER use 3 syllables. Examples of correct 2-syllable names: 지우, 서연, 민준, 하은, 도윤, 아린, 채원, 시우, 주원, 유나
3. Names must sound phonetically similar to the original name OR carry a related meaning
4. Use modern, trendy Korean naming conventions (2020s style)
5. Provide the Romanization (how to pronounce in English)
6. Provide Hanja (Chinese characters) if applicable — keep it simple, 1-2 characters
7. Keep the meaning positive and beautiful

Response format must be valid JSON only, no other text:
{
  "originalMeaning": "Brief meaning/origin of the original name in the input language's context",
  "names": [
    {
      "korean": "한국이름",
      "romanization": "Han-guk I-reum",
      "hanja": "漢字 (optional, empty string if none)",
      "meaning": "What this name means",
      "style": "modern|classic|cute|strong|elegant",
      "reason": "Why this name suits the person (1 sentence)"
    }
  ]
}`

export async function onRequestPost(context) {
  const { request, env } = context

  // CORS headers
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }

  try {
    const body = await request.json()
    const { name, customMeaning } = body

    if (!name || name.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Name is required' }),
        { status: 400, headers }
      )
    }

    const nameInput = name.trim().slice(0, 100) // 입력 길이 제한

    const userPrompt = customMeaning
      ? `Create Korean names for: "${nameInput}"\nThe person has confirmed the meaning is: "${customMeaning}"\nUse this meaning to inspire the Korean names.`
      : `Create Korean names for: "${nameInput}"\nFirst detect the language and meaning of this name, then create 3 beautiful Korean names.`

    // Cloudflare Workers AI 호출
    const aiResponse = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      max_tokens: 800,
      temperature: 0.7,
    })

    const rawText = aiResponse.response || ''

    // JSON 파싱 (AI가 가끔 마크다운 코드블록으로 감쌀 수 있음)
    const jsonMatch = rawText.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Invalid AI response format')
    }

    const parsed = JSON.parse(jsonMatch[0])

    return new Response(JSON.stringify(parsed), { status: 200, headers })
  } catch (err) {
    console.error('generate-name error:', err)
    return new Response(
      JSON.stringify({ error: 'Failed to generate names', detail: err.message }),
      { status: 500, headers }
    )
  }
}

// OPTIONS preflight
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
