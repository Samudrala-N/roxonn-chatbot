'use client';

import React, { useState } from 'react';

interface TaskTopicInputProps {
  onSubmit: (topic: string) => void;
}

const TaskTopicInput: React.FC<TaskTopicInputProps> = ({ onSubmit }) => {
  const [topic, setTopic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onSubmit(topic);
    }
  };

  return (
    <div className="p-4">
      <p className="text-foreground mb-4 text-xl font-semibold">
        Great! What is the topic of your project?
      </p>
      <form onSubmit={handleSubmit} className="flex items-center space-x-3">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., 'a new e-commerce website'"
          className="flex-grow p-3 border border-input rounded-xl focus:ring-2 focus:ring-primary focus:outline-none text-lg"
        />
        <button
          type="submit"
          className="bg-primary text-primary-foreground p-3 rounded-full hover:opacity-90 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default TaskTopicInput;
