import React, { useContext } from 'react';
import { JournalEntry } from '@/context/JournalContext';
import * as JournalContextModule from '@/context/JournalContext';
import EntryExportButton from './EntryExportButton';

interface EntryCardProps {
  entry: JournalEntry;
}

const EntryCard: React.FC<EntryCardProps> = ({ entry }) => {
  const context = useContext(JournalContextModule.JournalContext);
  
  if (!context) {
    console.error("EntryCard must be used within JournalProvider");
    return null;
  }
  
  const { deleteEntry, editEntry } = context;

  // Format the date nicely
  const formattedDate = new Date(entry.timestamp).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const formattedTime = new Date(entry.timestamp).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  const handleEdit = () => {
    editEntry(entry.id);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      deleteEntry(entry.id);
    }
  };

  return (
    <div className="bg-secondary-bg-light p-6 rounded-xl mb-5 border-l-4 border-accent-medium shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-200">
      <h3 className="text-xl text-accent-light m-0 leading-snug">{entry.title}</h3>
      <div className="text-sm opacity-85 text-text-lighter mb-4">
        {formattedDate} • {formattedTime}
      </div>
      <div className="text-base leading-relaxed mb-5 max-h-[120px] overflow-hidden">
        {entry.content}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-start mb-2">
          <div className="bg-amber-100/30 inline-block px-3 py-1 rounded-full text-amber-800 text-xs">
            {entry.mood || 'reflective'}
          </div>
        </div>
        
        <EntryExportButton entryId={entry.id} />
        
        <div className="flex justify-end gap-3 mt-2">
          <button 
            className="bg-accent-medium text-white px-4 py-2 rounded transition hover:bg-accent-light text-sm"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button 
            className="bg-red-500 text-white px-4 py-2 rounded transition hover:bg-red-600 text-sm"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EntryCard;
