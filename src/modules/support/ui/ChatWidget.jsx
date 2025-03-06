import React, { useState, useEffect, useRef } from 'react';
import {
  Chat,
  Channel,
  Window,
  MessageList,
  MessageInput,
} from 'stream-chat-react';
import { useChatClient } from '@/modules/support/api';
import { useAuthContext } from '@/modules/auth/context/AuthProvider';
import * as Sentry from '@sentry/browser';
import 'stream-chat-react/dist/css/v2/index.css';

function ChatLoading() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 border-4 border-t-transparent border-white rounded-full animate-spin" />
      <span className="text-sm font-medium">Connecting...</span>
    </div>
  );
}

function CustomChannelHeader() {
  return (
    <div className="py-3 px-4 border-b border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Customer Support</h3>
    </div>
  );
}

const ChatWidget = () => {
  const { user } = useAuthContext();
  const { client, channel, connectChat, disconnectChat, isConnecting, error } = useChatClient();
  const [isOpen, setIsOpen] = useState(false);
  const chatContainerRef = useRef(null);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (client) {
        disconnectChat();
      }
    };
  }, [client, disconnectChat]);

  if (!user) {
    return null;
  }

  const toggleChat = async () => {
    if (!isOpen) {
      try {
        const connected = await connectChat();
        if (connected) {
          setIsOpen(true);
        }
      } catch (error) {
        console.error('Error connecting to chat:', error);
        Sentry.captureException(error);
      }
    } else {
      setIsOpen(false);
      await disconnectChat();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 chat-widget">
      <button
        onClick={toggleChat}
        className={`cursor-pointer shadow-lg flex items-center justify-center ${
          isConnecting ? 'bg-brand-600 text-white px-4 py-2 rounded-md' : 'bg-brand-500 text-white w-12 h-12 rounded-full hover:bg-brand-600'
        } transition-all duration-300`}
        disabled={isConnecting}
      >
        {isConnecting ? <ChatLoading /> : (isOpen ? '✕' : '💬')}
      </button>
      
      {isOpen && (
        <div 
          ref={chatContainerRef}
          className="absolute bottom-16 right-0 w-80 md:w-96 h-96 shadow-xl rounded-md overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
          style={{ maxHeight: 'calc(100vh - 150px)' }}
        >
          {client && channel ? (
            <Chat client={client} theme="messaging light">
              <Channel channel={channel}>
                <Window>
                  <CustomChannelHeader />
                  <MessageList />
                  <MessageInput placeholder="Type your message here..." />
                </Window>
              </Channel>
            </Chat>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white">
              {error ? (
                <div className="text-center">
                  <p className="text-red-500 mb-4">{error}</p>
                  <button 
                    onClick={toggleChat}
                    className="px-4 py-2 bg-brand-500 text-white rounded-md cursor-pointer hover:bg-brand-600"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 border-4 border-t-transparent border-brand-500 rounded-full animate-spin" />
                  <span>Loading chat...</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatWidget;