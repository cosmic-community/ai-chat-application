export default function TypingIndicator() {
  return (
    <div className="chat-message flex justify-start">
      <div className="message-bubble ai-message typing-indicator">
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
          </div>
          <span className="text-sm ml-2">AI is typing...</span>
        </div>
      </div>
    </div>
  )
}