'use client';

import React, { useState, useEffect, useRef } from 'react';
import WelcomeMessage from '@/components/Chatbot/WelcomeMessage';
import DeveloperOptions from '@/components/Chatbot/DeveloperOptions';
import ClientFlow from '@/components/Chatbot/ClientFlow';
import MessageBubble from '@/components/Chatbot/MessageBubble';

interface Message {
  id: number;
  type: 'bot' | 'user';
  content: React.ReactNode;
}

let messageId = 0;

const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const addMessage = (type: 'bot' | 'user', content: React.ReactNode) => {
    setMessages(prev => [...prev, { id: messageId++, type, content }]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addMessage('bot', <WelcomeMessage onSelect={handleUserTypeSelect} />);
    }
  }, [isOpen]);

  useEffect(scrollToBottom, [messages]);

  const handleUserTypeSelect = (type: 'client' | 'developer') => {
    addMessage('user', type === 'client' ? 'I am a Client' : 'I am a Developer');
    if (type === 'developer') {
      addMessage('bot', <DeveloperOptions />);
    } else {
      addMessage('bot', <ClientFlow addMessage={(content) => addMessage('bot', content)} />);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans">
      <button
        className="bg-primary text-primary-foreground rounded-full w-20 h-20 flex items-center justify-center shadow-2xl hover:scale-110 transform transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute bottom-28 right-0 w-[440px] h-[700px] bg-card rounded-3xl shadow-2xl flex flex-col transition-all duration-300 ease-in-out transform-gpu animate-fade-in-up">
          <div className="bg-primary text-primary-foreground p-6 rounded-t-3xl flex justify-between items-center shadow-lg">
            <h3 className="text-2xl font-bold tracking-wider">Roxonn AI Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="text-primary-foreground text-4xl leading-none hover:opacity-80">&times;</button>
          </div>
          <div className="flex-1 p-6 overflow-y-auto bg-secondary">
            <div className="flex flex-col space-y-5">
              {messages.map(msg => (
                <MessageBubble key={msg.id} type={msg.type} content={msg.content} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;
