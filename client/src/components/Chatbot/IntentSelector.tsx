'use client';

import React from 'react';

interface IntentSelectorProps {
  onSelect: (intent: 'getPricing' | 'other') => void;
}

const IntentSelector: React.FC<IntentSelectorProps> = ({ onSelect }) => {
  return (
    <div className="p-4">
      <p className="text-foreground mb-4 text-xl font-semibold">What would you like to do next?</p>
      <div className="flex flex-col space-y-3">
        <button
          onClick={() => onSelect('getPricing')}
          className="w-full bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 transition-all font-bold text-lg"
        >
          Get a Price Estimate
        </button>
        <button
          onClick={() => onSelect('other')}
          className="w-full bg-gray-600 text-white px-4 py-3 rounded-xl hover:bg-gray-700 transition-colors font-bold text-lg"
        >
          Ask Another Question
        </button>
      </div>
    </div>
  );
};

export default IntentSelector;
