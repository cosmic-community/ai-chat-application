import { NextRequest, NextResponse } from 'next/server'
import { ChatRequest, ChatResponse } from '@/types'
import { getChatConfig } from '@/lib/cosmic'

export async function POST(request: NextRequest) {
  try {
    const { message, history }: ChatRequest = await request.json()

    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Get chat configuration from Cosmic
    const config = await getChatConfig()
    const systemPrompt = config?.metadata?.system_prompt || 
      'You are a helpful AI assistant. Be concise, friendly, and informative.'

    // Simulate AI response (replace with your preferred AI service)
    const aiResponse = await generateAIResponse(message, history, systemPrompt)

    const response: ChatResponse = {
      message: aiResponse
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Mock AI response function - replace with your AI service
async function generateAIResponse(message: string, history: any[], systemPrompt: string): Promise<string> {
  // This is a mock response. In a real application, you would:
  // 1. Use OpenAI API, Claude, or another AI service
  // 2. Pass the message, history, and system prompt to the AI
  // 3. Return the AI's response
  
  // Example with OpenAI (uncomment and configure):
  /*
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  
  const messages = [
    { role: 'system', content: systemPrompt },
    ...history.map(h => ({ role: h.role, content: h.content })),
    { role: 'user', content: message }
  ]
  
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages,
    max_tokens: 500,
    temperature: 0.7,
  })
  
  return completion.choices[0]?.message?.content || 'I apologize, but I could not generate a response.'
  */

  // Mock responses for demonstration
  const responses = [
    "That's an interesting question! Let me think about that for a moment. Based on what you've asked, I'd say that there are several ways to approach this topic.",
    "I understand what you're asking about. This is actually a common question, and there are a few key points to consider.",
    "Great question! I can definitely help you with that. Here's what I think would be the best approach for your situation.",
    "Thanks for reaching out! I'd be happy to help you understand this better. Let me break it down for you.",
    "I see what you're getting at. This is something that many people wonder about, and I'm glad you asked."
  ]

  // Add a small delay to simulate processing
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))

  return responses[Math.floor(Math.random() * responses.length)]
}