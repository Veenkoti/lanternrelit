import React from 'react';
import { useJournal } from '@/context/JournalContext';
import CategoryDropdown from './CategoryDropdown';

const JournalControls: React.FC = () => {
  const { 
    getRandomPrompt, 
    newEntry, 
    saveEntry, 
    setShowHistory,
    selectedCategory
  } = useJournal().getRandomPrompt;

  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-5">
      {/* Random Prompt Button */}
      <button 
        className="bg-secondary-bg-light text-text-light border border-border-subtle px-5 py-3 rounded-lg font-semibold transition hover:bg-button-hover-bg hover:-translate-y-0.5 hover:border-accent-medium active:translate-y-0 active:bg-button-active-bg shadow-lg min-w-[160px] flex items-center justify-center gap-2"
        onClick={() => getRandomPrompt(selectedCategory)}
      >
        <span>Random Prompt</span>
      </button>
      
      {/* Category Dropdown */}
      <CategoryDropdown />
      
      {/* New Entry Button */}
      <button 
        className="bg-secondary-bg-light text-text-light border border-border-subtle px-5 py-3 rounded-lg font-semibold transition hover:bg-button-hover-bg hover:-translate-y-0.5 hover:border-accent-medium active:translate-y-0 active:bg-button-active-bg shadow-lg min-w-[160px] flex items-center justify-center gap-2"

      <button
        onClick={() => getRandomPrompt()}
        className="bg-secondary-bg-light text-text-light border border-border-subtle px-3 py-2 rounded-md text-sm hover:bg-button-hover-bg hover:border-accent-medium active:bg-button-active-bg transition shadow-sm mr-2"
      >
        ✨ Change Prompt
      </button>
        onClick={newEntry}
      >
        <span>New Entry</span>
      </button>
      
      {/* Save Entry Button */}
      <button 
        className="bg-accent-medium text-text-light border border-accent-medium px-5 py-3 rounded-lg font-semibold transition hover:bg-accent-light hover:-translate-y-0.5 hover:border-accent-light active:translate-y-0 shadow-lg min-w-[160px] flex items-center justify-center gap-2"
        onClick={saveEntry}
      >
        <span>Save Entry</span>
      </button>
      
      {/* View History Button */}
      <button 
        className="bg-secondary-bg-light text-text-light border border-border-subtle px-5 py-3 rounded-lg font-semibold transition hover:bg-button-hover-bg hover:-translate-y-0.5 hover:border-accent-medium active:translate-y-0 active:bg-button-active-bg shadow-lg min-w-[160px] flex items-center justify-center gap-2"
        onClick={() => setShowHistory(true)}
      >
        <span>View History</span>
      </button>
    </div>
  );
};

export default JournalControls;
