import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Helper function for error handling
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

export async function getChatConfig() {
  try {
    const response = await cosmic.objects.findOne({
      type: 'chat-config',
      slug: 'main-config'
    });
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch chat configuration');
  }
}

export async function getConversationStarters() {
  try {
    const response = await cosmic.objects.find({
      type: 'conversation-starters'
    }).props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects.sort((a, b) => {
      const orderA = a.metadata?.order || 999;
      const orderB = b.metadata?.order || 999;
      return orderA - orderB;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch conversation starters');
  }
}

export async function saveChatSession(messages: any[], userId?: string) {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'chat-sessions',
      title: `Chat Session ${new Date().toLocaleDateString()}`,
      metadata: {
        messages: JSON.stringify(messages),
        user_id: userId || '',
        session_date: new Date().toISOString(),
        session_duration: 0
      }
    });
    
    return response.object;
  } catch (error) {
    console.error('Error saving chat session:', error);
    throw new Error('Failed to save chat session');
  }
}