# AI Chat Application

![App Preview](https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=300&fit=crop&auto=format)

A modern, real-time AI chat application built with Next.js 15 and Cosmic CMS. Engage in intelligent conversations with AI, maintain chat history, and enjoy a seamless user experience across all devices.

## Features

- 🤖 **Real-time AI Conversations** - Intelligent responses with context awareness
- 💾 **Persistent Chat History** - Messages saved locally across sessions
- 📱 **Responsive Design** - Optimized for desktop and mobile devices
- ⚡ **Fast Performance** - Built with Next.js 15 and optimized for speed
- 🎨 **Modern UI** - Clean, intuitive chat interface with smooth animations
- 📋 **Message Management** - Copy, timestamp, and threading features
- ⚙️ **Configurable AI** - Manage AI behavior through Cosmic CMS

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68ad609a1f09167261d58d08&clone_repository=68ad620e1f09167261d58d12)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> No content model prompt provided - app built from existing content structure

### Code Generation Prompt

> ai chat app

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic CMS** - Headless CMS for content management
- **OpenAI API** - AI-powered conversations (configurable)

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Cosmic account with a bucket
- OpenAI API key (or alternative AI service)

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up environment variables:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   OPENAI_API_KEY=your-openai-api-key
   ```

4. Run the development server:
   ```bash
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

### Fetch Chat Configuration
```typescript
import { cosmic } from '@/lib/cosmic'

// Get chat settings
const chatConfig = await cosmic.objects.findOne({
  type: 'chat-config',
  slug: 'main-config'
})

// Get conversation starters
const starters = await cosmic.objects.find({
  type: 'conversation-starters'
})
```

### Save Chat History
```typescript
// Save conversation to Cosmic
await cosmic.objects.insertOne({
  type: 'chat-sessions',
  title: `Chat ${new Date().toISOString()}`,
  metadata: {
    messages: JSON.stringify(chatHistory),
    user_id: userId,
    session_date: new Date().toISOString()
  }
})
```

## Cosmic CMS Integration

This app uses Cosmic to manage:

- **Chat Configuration** - AI behavior, response settings, and system prompts
- **Conversation Starters** - Pre-defined questions to help users get started
- **Chat Sessions** - Persistent storage of conversation history
- **AI Prompts** - System messages and personality configurations

The Cosmic integration allows you to:
- Update AI behavior without code changes
- Manage conversation templates
- Store and retrieve chat history
- Configure multiple AI personalities

## Deployment Options

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically

### Netlify
1. Connect repository to Netlify
2. Set build command: `bun run build`
3. Set publish directory: `.next`
4. Add environment variables

### Environment Variables for Production

Remember to set these in your deployment platform:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY` 
- `COSMIC_WRITE_KEY`
- `OPENAI_API_KEY`

<!-- README_END -->