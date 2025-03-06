import { useState } from 'react';
import { StreamChat } from 'stream-chat';
import { useAuthContext } from '@/modules/auth/context/AuthProvider';
import * as Sentry from '@sentry/browser';

export function useChatClient() {
  const { session } = useAuthContext();
  const [client, setClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);

  const connectChat = async () => {
    try {
      setIsConnecting(true);
      setError(null);
      
      const userEmail = session?.user?.email;
      if (!userEmail) {
        const error = new Error('No user session available for chat connection');
        console.error(error);
        setError('Please log in to use customer support');
        return false;
      }
      
      // Get chat credentials from the backend
      const response = await fetch('/api/customerSupport', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({ email: userEmail }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        const error = new Error(`Failed to connect to customer support: ${errorData.error || response.statusText}`);
        console.error(error);
        setError('Unable to connect to support chat. Please try again later.');
        Sentry.captureException(error);
        return false;
      }
      
      // Parse the support response
      const { token, channelId, userId, VITE_PUBLIC_STREAM_KEY } = await response.json();
      
      // Create Stream chat instance
      console.log('Initializing Stream chat with API key', VITE_PUBLIC_STREAM_KEY);
      const streamClient = StreamChat.getInstance(VITE_PUBLIC_STREAM_KEY);
      
      // Connect the user
      await streamClient.connectUser(
        { id: userId, name: userEmail },
        token
      );
      
      // Initialize channel
      console.log('Initializing channel', channelId);
      const streamChannel = streamClient.channel('messaging', channelId);
      await streamChannel.watch();
      
      // Update state with client and channel
      setClient(streamClient);
      setChannel(streamChannel);
      
      return true;
    } catch (error) {
      console.error('Error initializing customer support chat:', error);
      Sentry.captureException(error);
      setError('An error occurred while connecting to support chat');
      return false;
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectChat = async () => {
    try {
      if (client) {
        await client.disconnectUser();
        setClient(null);
        setChannel(null);
      }
      return true;
    } catch (error) {
      console.error('Error disconnecting from chat:', error);
      Sentry.captureException(error);
      return false;
    }
  };

  return { 
    client, 
    channel, 
    connectChat, 
    disconnectChat,
    isConnecting,
    error
  };
}