'use client'

import { useState, KeyboardEvent } from 'react'

interface MessageInputProps {
  onSendMessage: (message: string) -> void
  isLoading: boolean
  onClearChat: () -> void
  showClearButton: boolean
}

export default function MessageInput({
  onSendMessage,
  isLoading,
  onClearChat,
  showClearButton
}: MessageInputProps) {
  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      onSendMessage(input)
      setInput('')
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex items-end space-x-3">
        <div className="flex-1 relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isLoading ? "AI is thinking..." : "Type your message here..."}
            disabled={isLoading}
            rows={1}
            className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ minHeight: '48px', maxHeight: '120px' }}
          />
        </div>
        
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="bg-primary text-primary-foreground rounded-lg px-6 py-3 font-medium text-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? '...' : 'Send'}
        </button>
      </div>
      
      {showClearButton && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={onClearChat}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear conversation
          </button>
        </div>
      )}
    </form>
  )
}