'use client';

import React from 'react';

interface ScheduleCallButtonProps {
  onClick: () => void;
}

const ScheduleCallButton: React.FC<ScheduleCallButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="mt-4 w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      Schedule a Meeting
    </button>
  );
};

export default ScheduleCallButton;
