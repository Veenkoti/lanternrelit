import React from 'react';

interface PromptBoxProps {
  prompt: string;
  credit: string;
}

const PromptBox: React.FC<PromptBoxProps> = ({ prompt, credit }) => {
  return (
    <div className="bg-secondary-bg-light p-5 md:p-7 rounded-xl mb-8 text-center shadow-inset border-l-4 border-accent-light">
      <p className="italic mb-2 text-lg">{prompt}</p>
      <span className="text-sm opacity-85 text-text-lighter">{credit}</span>
    </div>
  );
};

export default PromptBox;
