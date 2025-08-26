import ChatInterface from '@/components/ChatInterface'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl">
        <header className="py-6 px-4 border-b border-border">
          <h1 className="text-2xl font-bold text-center">AI Chat Assistant</h1>
          <p className="text-muted-foreground text-center mt-2">
            Ask me anything and I'll do my best to help you
          </p>
        </header>
        
        <ChatInterface />
      </div>
    </main>
  )
}