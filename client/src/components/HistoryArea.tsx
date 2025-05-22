import React from 'react';
import { useJournal } from '@/context/JournalContext';
import EntryCard from './EntryCard';

const HistoryArea: React.FC = () => {
  const { 
    showHistory, 
    searchTerm, 
    setSearchTerm, 
    filteredEntries,
    setShowHistory
  } = useJournal();

  if (!showHistory) {
    return null;
  }

  return (
    <section className="bg-primary-bg-dark backdrop-blur border border-border-subtle rounded-xl px-5 py-8 md:p-9 w-full max-w-3xl shadow-dark">
      <h2 className="text-3xl text-center text-accent-light mb-6">Journal History</h2>
      
      {/* Search Bar */}
      <input 
        type="text" 
        placeholder="Search your entries..." 
        className="w-full p-4 mb-6 rounded-lg border border-border-subtle bg-primary-bg-light text-text-light text-lg shadow-inset focus:border-accent-light focus:shadow-[inset_0_0_15px_rgba(128,222,234,0.2),0_0_8px_rgba(128,222,234,0.4)] outline-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      {/* Journal Entries List */}
      <div className="max-h-[60vh] overflow-y-auto pr-4">
        {filteredEntries.length > 0 ? (
          filteredEntries.map(entry => (
            <EntryCard key={entry.id} entry={entry} />
          ))
        ) : (
          <div className="text-center opacity-70 text-text-lighter py-10 text-lg">
            {searchTerm 
              ? "No entries match your search. Try different keywords."
              : "Your journal history is empty. Start writing to see entries here."}
          </div>
        )}
      </div>
      
      {/* Back to Journal Button */}
      <div className="mt-6 text-center">
        <button 
          className="bg-secondary-bg-light text-text-light border border-border-subtle px-5 py-3 rounded-lg font-semibold transition hover:bg-button-hover-bg hover:-translate-y-0.5 hover:border-accent-medium active:translate-y-0 active:bg-button-active-bg shadow-lg min-w-[160px] flex items-center justify-center gap-2 mx-auto"
          onClick={() => setShowHistory(false)}
        >
          <span>Back to Journal</span>
        </button>
      </div>
    </section>
  );
};

export default HistoryArea;
