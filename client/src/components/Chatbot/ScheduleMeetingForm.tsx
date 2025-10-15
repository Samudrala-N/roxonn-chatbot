'use client';

import React, { useState } from 'react';

interface ScheduleMeetingFormProps {
  onSubmit: (details: { name: string; email: string; time: string }) => void;
}

const ScheduleMeetingForm: React.FC<ScheduleMeetingFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, time });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-card rounded-2xl border border-border shadow-lg animate-fade-in-up space-y-4">
      <h4 className="font-extrabold text-foreground text-2xl tracking-wide">Schedule a Meeting</h4>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-400">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-400">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="time" className="block text-sm font-medium text-gray-400">Preferred Time</label>
        <input
          type="datetime-local"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Schedule
      </button>
    </form>
  );
};

export default ScheduleMeetingForm;
