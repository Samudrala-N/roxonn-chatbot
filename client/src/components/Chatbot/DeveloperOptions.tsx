'use client';

import React from 'react';

const DeveloperOptions: React.FC = () => {
  return (
    <div className="p-4">
      <p className="text-foreground mb-4 text-xl font-semibold">
        Welcome Developer! 👨‍💻 Here are some quick links:
      </p>
      <div className="flex flex-col space-y-3">
        <a
          href="https://app.roxonn.com/repos"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 transition-all font-bold text-lg flex items-center justify-center"
        >
          View Open Tasks
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
        <a
          href="https://app.roxonn.com/auth"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-green-600 text-white px-4 py-3 rounded-xl hover:bg-green-700 transition-colors font-bold text-lg flex items-center justify-center"
        >
          My Dashboard
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default DeveloperOptions;
