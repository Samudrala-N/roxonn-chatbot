'use client';

import React, { useState, useEffect } from 'react';
import ScheduleCallButton from './ScheduleCallButton';

interface PricingDisplayProps {
  pricingData: {
    fiverrRange?: { min: number; max: number };
    upworkRange?: { min: number; max: number };
    averageMarketRate?: number;
    roxonnEstimate?: number;
    explanation?: string;
  };
  onScheduleClick: () => void;
}

const PricingDisplay: React.FC<PricingDisplayProps> = ({ pricingData, onScheduleClick }) => {
  const [currency, setCurrency] = useState('USD');
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        setExchangeRate(data.rates.INR);
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
      }
    };

    fetchExchangeRate();
  }, []);

  const convertCurrency = (amount: number) => {
    if (currency === 'USD' || !exchangeRate) {
      return amount;
    }
    return Math.round(amount * exchangeRate);
  };

  const formatCurrency = (amount: number) => {
    if (currency === 'USD') {
      return `$${amount}`;
    }
    return `₹${amount}`;
  };

  return (
    <div className="p-4 bg-card rounded-2xl border border-border shadow-lg animate-fade-in-up">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-extrabold text-foreground text-2xl tracking-wide">Project Cost Estimate</h4>
        <button
          onClick={() => setCurrency(currency === 'USD' ? 'INR' : 'USD')}
          className="px-3 py-1 text-sm font-semibold rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          {currency === 'USD' ? 'Show in INR' : 'Show in USD'}
        </button>
      </div>
      
      <div className="space-y-3 text-lg">
        {pricingData.fiverrRange && (
          <p><span className="font-semibold text-gray-600">Fiverr Range:</span> {formatCurrency(convertCurrency(pricingData.fiverrRange.min))} - {formatCurrency(convertCurrency(pricingData.fiverrRange.max))}</p>
        )}
        {pricingData.upworkRange && (
          <p><span className="font-semibold text-gray-600">Upwork Range:</span> {formatCurrency(convertCurrency(pricingData.upworkRange.min))} - {formatCurrency(convertCurrency(pricingData.upworkRange.max))}</p>
        )}
        {pricingData.averageMarketRate && (
          <p><span className="font-semibold text-gray-600">Average Market Rate:</span> {formatCurrency(convertCurrency(pricingData.averageMarketRate))}</p>
        )}
      </div>

      {pricingData.explanation && <p className="italic mt-4 text-muted-foreground text-center text-base">{pricingData.explanation}</p>}

      {pricingData.roxonnEstimate && (
        <div className="mt-5 pt-5 border-t border-dashed border-border text-center">
          <p className="font-extrabold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-500">
            ✨ Roxonn Estimate: {formatCurrency(convertCurrency(pricingData.roxonnEstimate))}
          </p>
          <p className="text-base text-muted-foreground mt-1">Up to 30% savings!</p>
        </div>
      )}
      <ScheduleCallButton onClick={onScheduleClick} />
    </div>
  );
};

export default PricingDisplay;
