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
      <div className="w-5 h-5 border-3 border-t-transparent border-white rounded-full animate-spin" />
      <span className="text-sm font-medium">Connecting...</span>
    </div>
  );
}

function CustomChannelHeader() {
  return (
    <div className="py-3 px-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
      <div className="w-8 h-8 bg-brand-500 text-white rounded-full flex items-center justify-center mr-3">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
        </svg>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Customer Support</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">We typically respond within a few hours</p>
      </div>
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
        className={`flex items-center justify-center cursor-pointer shadow-lg rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 transition-all duration-200 ${
          isConnecting 
            ? 'bg-gray-100 dark:bg-gray-700 text-brand-500 dark:text-brand-400 px-4 py-2' 
            : isOpen 
              ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 w-12 h-12 rounded-full' 
              : 'bg-brand-500 text-white w-14 h-14 rounded-full hover:bg-brand-600'
        }`}
        disabled={isConnecting}
        aria-label={isOpen ? "Close support chat" : "Open support chat"}
      >
        {isConnecting ? (
          <ChatLoading />
        ) : isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>
      
      {isOpen && (
        <div 
          ref={chatContainerRef}
          className="absolute bottom-16 right-0 w-[350px] md:w-[400px] h-[500px] shadow-2xl rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all duration-300 animate-fade-in"
          style={{ maxHeight: 'calc(100vh - 120px)' }}
        >
          {client && channel ? (
            <Chat client={client} theme={document.documentElement.classList.contains('dark') ? 'messaging dark' : 'messaging light'}>
              <Channel channel={channel}>
                <Window>
                  <CustomChannelHeader />
                  <MessageList />
                  <MessageInput placeholder="Type your message here..." focus />
                </Window>
              </Channel>
            </Chat>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white">
              {error ? (
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
                  <button 
                    onClick={toggleChat}
                    className="px-4 py-2 bg-brand-500 text-white rounded-md cursor-pointer hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-400"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 border-4 border-t-transparent border-brand-500 rounded-full animate-spin" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">Connecting to support...</p>
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