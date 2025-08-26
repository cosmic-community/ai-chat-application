'use client'

import { useState } from 'react'
import { Message } from '@/types'

interface MessageBubbleProps {
  message: Message
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const [showCopyFeedback, setShowCopyFeedback] = useState(false)

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message.content)
      setShowCopyFeedback(true)
      setTimeout(() => setShowCopyFeedback(false), 2000)
    } catch (error) {
      console.error('Failed to copy message:', error)
    }
  }

  return (
    <div className={`chat-message ${message.role === 'user' ? 'flex justify-end' : 'flex justify-start'}`}>
      <div className={`message-bubble relative group max-w-[80%] ${
        message.role === 'user' ? 'user-message' : 'ai-message'
      }`}>
        <div className="whitespace-pre-wrap">{message.content}</div>
        
        {/* Message actions */}
        <div className="flex items-center justify-between mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-xs opacity-60">
            {formatTime(message.timestamp)}
          </span>
          
          <button
            onClick={copyMessage}
            className="text-xs hover:bg-black/10 dark:hover:bg-white/10 rounded px-2 py-1 transition-colors"
            title="Copy message"
          >
            {showCopyFeedback ? '✓ Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  )
}