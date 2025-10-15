'use client';

import React, { useState, useEffect } from 'react';
import TaskTopicInput from '@/components/Chatbot/TaskTopicInput';
import IntentSelector from '@/components/Chatbot/IntentSelector';
import PricingDisplay from '@/components/Chatbot/PricingDisplay';
import ScheduleMeetingForm from '@/components/Chatbot/ScheduleMeetingForm';
import { analyzePricing, scheduleMeeting } from '@/services/chat.service';
import MessageBubble from '@/components/Chatbot/MessageBubble';

interface ClientFlowProps {
  addMessage: (content: React.ReactNode) => void;
}

const ClientFlow: React.FC<ClientFlowProps> = ({ addMessage }) => {
  const [step, setStep] = useState('topic');
  const [topic, setTopic] = useState('');

  const handleTopicSubmit = (submittedTopic: string) => {
    setTopic(submittedTopic);
    addMessage(<MessageBubble type="user" content={submittedTopic} />);
    setStep('intent');
  };

  useEffect(() => {
    if (step === 'intent') {
      addMessage(<MessageBubble type="bot" content={<IntentSelector onSelect={handleIntentSelect} />} />);
    }
  }, [step]);

  const handleIntentSelect = async (intent: 'getPricing' | 'other') => {
    if (intent === 'getPricing') {
      addMessage(<MessageBubble type="user" content="Get a Price Estimate" />);
      addMessage(<MessageBubble type="bot" content="Analyzing pricing, please wait..." />);
      setStep('analyzing');

      try {
        const data = await analyzePricing(topic);
        addMessage(<MessageBubble type="bot" content={<PricingDisplay pricingData={data} onScheduleClick={() => setStep('schedule')} />} />);
        addMessage(
          <div className="p-2">
            <p className="mb-3 text-base">At Roxonn, we typically complete similar projects for about 30% less than the market average.</p>
          </div>
        );
        setStep('priced'); // <-- Add this line
      } catch (error) {
        addMessage(<MessageBubble type="bot" content="Sorry, I couldn't analyze the pricing right now. Please try again." />);
        setStep('topic');
      }
    } else {
      addMessage(<MessageBubble type="user" content="Ask Another Question" />);
      addMessage(<MessageBubble type="bot" content="No problem! What else can I help you with?" />);
      setStep('topic');
    }
  };

  const handleScheduleSubmit = async (details: { name: string; email: string; time: string }) => {
    addMessage(<MessageBubble type="user" content={`Schedule meeting for ${details.time}`} />);
    addMessage(<MessageBubble type="bot" content="Scheduling your meeting, please wait..." />);
    try {
      const summary = `Meeting with ${details.name}`;
      const description = `Follow-up call regarding: ${topic}`;
      const startTime = new Date(details.time).toISOString();
      const endTime = new Date(new Date(details.time).getTime() + 30 * 60000).toISOString(); // Add 30 minutes
      
      await scheduleMeeting(summary, description, startTime, endTime, details.email);
      addMessage(<MessageBubble type="bot" content="Your meeting has been scheduled! Please check your email for the invitation." />);
    } catch (error) {
      addMessage(<MessageBubble type="bot" content="Sorry, I couldn't schedule the meeting. Please try again." />);
    }
    setStep('topic');
  };

  return (
    <div className="flex flex-col space-y-4 h-full">
      {step === 'topic' && <TaskTopicInput onSubmit={handleTopicSubmit} />}
      {step === 'schedule' && <ScheduleMeetingForm onSubmit={handleScheduleSubmit} />}
    </div>
  );
};

export default ClientFlow;
