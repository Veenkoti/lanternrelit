import React, { useRef, useEffect } from 'react';
import { useJournal } from '@/context/JournalContext';
import PromptBox from './PromptBox';
import CategoryDropdown from './CategoryDropdown';
import JournalControls from './JournalControls';

const JournalArea: React.FC = () => {
  const { 
    currentEntry, 
    setCurrentEntry, 
    currentPrompt, 
    showHistory, 
    isTyping,
    currentWhisperNudge
  } = useJournal();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-focus textarea when it becomes visible
  useEffect(() => {
    if (!showHistory && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [showHistory]);

  if (showHistory) {
    return null;
  }

  return (
    <section className="bg-primary-bg-dark backdrop-blur border border-border-subtle rounded-xl px-5 py-8 md:p-9 w-full max-w-3xl shadow-dark">
      {/* Prompt Box */}
      {currentPrompt && <PromptBox prompt={currentPrompt.text} credit={currentPrompt.credit} />}
      
      {/* Journal Textarea */}
      <textarea 
        ref={textareaRef}
        className="journal-textarea mb-6"
        placeholder="Begin writing here. Your words are saved locally on your device."
        value={currentEntry}
        onChange={(e) => setCurrentEntry(e.target.value)}
      />
      
      {/* Typing Indicator */}
      {isTyping && (
        <div className="text-sm text-accent-light opacity-70 -mt-4 mb-4 typing-animation">
          Saving your thoughts
        </div>
      )}
      
      {/* Journal Controls */}
      <JournalControls />
      
      {/* Whisper Nudge Box */}
      {currentWhisperNudge && !isTyping && (
        <div className="mt-8 bg-secondary-bg-light border border-accent-light rounded-lg p-4 md:p-6 w-4/5 mx-auto text-center italic text-base shadow-inset">
          <p className="m-0">{currentWhisperNudge}</p>
        </div>
      )}
    </section>
  );
};

export default JournalArea;
