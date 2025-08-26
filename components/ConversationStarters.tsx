'use client'

import { useEffect, useState } from 'react'
import { ConversationStarter } from '@/types'
import { getConversationStarters } from '@/lib/cosmic'

interface ConversationStartersProps {
  onStarterClick: (question: string) => void
}

export default function ConversationStarters({ onStarterClick }: ConversationStartersProps) {
  const [starters, setStarters] = useState<ConversationStarter[]>([])
  const [loading, setLoading] = useState(true)

  // Default starters if none found in Cosmic
  const defaultStarters = [
    "What can you help me with?",
    "Tell me a fun fact",
    "Help me brainstorm ideas",
    "Explain a complex topic simply"
  ]

  useEffect(() => {
    const fetchStarters = async () => {
      try {
        const cosmicStarters = await getConversationStarters()
        setStarters(cosmicStarters as ConversationStarter[])
      } catch (error) {
        console.error('Error fetching conversation starters:', error)
        // Use default starters if Cosmic fetch fails
      } finally {
        setLoading(false)
      }
    }

    fetchStarters()
  }, [])

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-muted rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  const displayStarters = starters.length > 0 
    ? starters.map(s => s.metadata?.question).filter(Boolean)
    : defaultStarters

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold mb-2">How can I help you today?</h2>
        <p className="text-muted-foreground">
          Choose a suggestion below or type your own message
        </p>
      </div>
      
      <div className="grid gap-3 sm:grid-cols-2">
        {displayStarters.map((question, index) => (
          <button
            key={index}
            onClick={() => onStarterClick(question as string)}
            className="text-left p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/50 transition-all duration-200 group"
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <span className="text-primary text-sm">💬</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium group-hover:text-primary transition-colors">
                  {question}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}