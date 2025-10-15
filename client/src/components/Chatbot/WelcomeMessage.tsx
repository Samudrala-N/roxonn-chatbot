'use client';

import React from 'react';

interface WelcomeMessageProps {
  onSelect: (type: 'client' | 'developer') => void;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ onSelect }) => {
  return (
    <div className="p-4">
      <p className="text-foreground mb-4 text-xl font-semibold">
        Hi 👋 Welcome to Roxonn! Are you a Client or a Developer?
      </p>
      <div className="flex flex-col space-y-3">
        <button
          onClick={() => onSelect('client')}
          className="w-full bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 transition-all font-bold text-lg"
        >
          I'm a Client
        </button>
        <button
          onClick={() => onSelect('developer')}
          className="w-full bg-green-600 text-white px-4 py-3 rounded-xl hover:bg-green-700 transition-colors font-bold text-lg"
        >
          I'm a Developer
        </button>
      </div>
    </div>
  );
};

export default WelcomeMessage;
