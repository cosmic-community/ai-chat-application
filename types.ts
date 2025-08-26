// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Chat message interface
export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
}

// Chat configuration from Cosmic
export interface ChatConfig extends CosmicObject {
  type: 'chat-config';
  metadata: {
    ai_model?: string;
    max_tokens?: number;
    temperature?: number;
    system_prompt?: string;
    welcome_message?: string;
  };
}

// Conversation starters from Cosmic
export interface ConversationStarter extends CosmicObject {
  type: 'conversation-starters';
  metadata: {
    question: string;
    category?: string;
    order?: number;
  };
}

// Chat session for storage
export interface ChatSession extends CosmicObject {
  type: 'chat-sessions';
  metadata: {
    messages: string; // JSON stringified Message[]
    user_id?: string;
    session_date: string;
    session_duration?: number;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Chat API request/response
export interface ChatRequest {
  message: string;
  history: Message[];
}

export interface ChatResponse {
  message: string;
  error?: string;
}

// Type guards
export function isChatConfig(obj: CosmicObject): obj is ChatConfig {
  return obj.type === 'chat-config';
}

export function isConversationStarter(obj: CosmicObject): obj is ConversationStarter {
  return obj.type === 'conversation-starters';
}

export function isChatSession(obj: CosmicObject): obj is ChatSession {
  return obj.type === 'chat-sessions';
}