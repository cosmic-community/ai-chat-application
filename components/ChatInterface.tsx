'use client'

import { useState, useEffect, useRef } from 'react'
import { Message } from '@/types'
import MessageList from '@/components/MessageList'
import MessageInput from '@/components/MessageInput'
import ConversationStarters from '@/components/ConversationStarters'

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showStarters, setShowStarters] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Load chat history from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('chat-history')
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages)
        setMessages(parsedMessages)
        setShowStarters(parsedMessages.length === 0)
      } catch (error) {
        console.error('Error loading chat history:', error)
      }
    }
  }, [])

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chat-history', JSON.stringify(messages))
    }
  }, [messages])

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      role: 'user',
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)
    setShowStarters(false)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          history: messages
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get AI response')
      }

      const data = await response.json()
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message,
        role: 'assistant',
        timestamp: new Date().toISOString()
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please try again.',
        role: 'assistant',
        timestamp: new Date().toISOString()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleStarterClick = (question: string) => {
    handleSendMessage(question)
  }

  const clearChat = () => {
    setMessages([])
    setShowStarters(true)
    localStorage.removeItem('chat-history')
  }

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto py-4">
        {showStarters && messages.length === 0 ? (
          <ConversationStarters onStarterClick={handleStarterClick} />
        ) : (
          <MessageList messages={messages} isLoading={isLoading} />
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-background">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <MessageInput
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            onClearChat={clearChat}
            showClearButton={messages.length > 0}
          />
        </div>
      </div>
    </div>
  )
}