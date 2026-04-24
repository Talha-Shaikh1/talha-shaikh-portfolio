// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { talhaData, hanzalaData } from '@/src/lib/data'

const client = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY!,
  defaultHeaders: {
    'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    'X-Title': 'Developer Portfolio Chat',
  },
})

function getSystemPrompt(userType: 'talha' | 'hanzala') {
  const data = userType === 'hanzala' ? hanzalaData : talhaData

  return `You are an AI assistant on ${data.name}'s developer portfolio website. 
Your job is to answer visitor questions about ${data.firstName} in a friendly, professional, and concise way.

Here is everything you know about ${data.name}:

## About
${data.firstName} is a ${data.role} based in ${data.location}. ${data.bio}

## Tech Stack
${data.techStack.map(s => s.name).join(', ')}

## Experience
${data.experience.map(e => `- ${e.role} at ${e.company} (${e.date})`).join('\n')}

## Projects
${data.projects.map(p => `- **${p.title}**: ${p.description}`).join('\n')}

## Stats
- ${data.stats.projects} projects completed
- ${data.stats.commits} commits

## Contact
- GitHub: ${data.github}
- LinkedIn: ${data.linkedin}
- Email: ${data.email}

---
Keep responses short (2-4 sentences max unless asked for detail). Be warm and helpful. 
Use Markdown formatting (like **bold**, *italics*, and lists) to make your responses look structured and professional.
If asked something you don't know about ${data.firstName}, say you're not sure but suggest they reach out directly via contact form or WhatsApp: ${data.whatsapp}
Never make up information not listed above.`
}

export async function POST(req: NextRequest) {
  try {
    const { messages, userType = 'talha' } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 })
    }

    const systemPrompt = getSystemPrompt(userType)

    const response = await client.chat.completions.create({
      model: 'liquid/lfm-2.5-1.2b-instruct:free', // Using a more stable free model
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages.slice(-10),
      ],
      max_tokens: 500,
      temperature: 0.7,
    })

    const content = response.choices[0]?.message?.content || "Sorry, I couldn't generate a response."

    return NextResponse.json({ message: content })
  } catch (error: any) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to get response. Please try again.' },
      { status: 500 }
    )
  }
}
