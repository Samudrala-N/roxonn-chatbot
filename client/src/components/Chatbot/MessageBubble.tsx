'use client';

import React from 'react';

interface MessageBubbleProps {
  type: 'bot' | 'user';
  content: React.ReactNode;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ type, content }) => {
  const isBot = type === 'bot';

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`rounded-2xl px-5 py-3 max-w-lg shadow-md text-lg ${
          isBot
            ? 'bg-card text-card-foreground rounded-bl-lg'
            : 'bg-primary text-primary-foreground rounded-br-lg'
        }`}
      >
        {content}
      </div>
    </div>
  );
};

export default MessageBubble;
