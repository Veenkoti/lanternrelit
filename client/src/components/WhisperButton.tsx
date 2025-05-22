import React, { useState, useEffect, useContext } from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { JournalContext } from '@/context/JournalContext';

const WhisperButton = () => {
  const journalContext = useContext(JournalContext);
  
  if (!journalContext) {
    return null; // Return early if context is not available
  }
  
  const [showMist, setShowMist] = useState(false);
  
  // Close the mist when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.whisper-mist') && !target.closest('.whisper-button')) {
        setShowMist(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);
  
  // Auto-hide the mist after 8 seconds
  useEffect(() => {
    if (showMist) {
      const timer = setTimeout(() => {
        setShowMist(false);
      }, 8000);
      
      return () => clearTimeout(timer);
    }
  }, [showMist]);
  
  const handleWhisperClick = () => {
    // Get a random whisper nudge
    const randomIndex = Math.floor(Math.random() * journalContext.aiWhispers.length);
    journalContext.setCurrentWhisperNudge(journalContext.aiWhispers[randomIndex]);
    setShowMist(true);
  };
  
  return (
    <div className="whisper-container relative">
      <Button 
        variant="ghost" 
        className="whisper-button rounded-full p-2 hover:bg-black/10 hover:text-amber-500 transition-colors duration-300"
        onClick={handleWhisperClick}
        title="Receive a gentle nudge"
      >
        <Sparkles className="h-5 w-5 text-amber-400" />
      </Button>
      
      {showMist && (
        <div className="whisper-mist absolute z-50 top-10 right-0 w-72 md:w-80 lg:w-96 p-5 animate-fadeIn">
          <div className="relative">
            {/* Multiple fog/mist layers for a more ethereal effect */}
            <div className="absolute inset-0 bg-gradient-radial from-amber-50/80 to-slate-900/30 rounded-lg blur-sm animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-amber-100/50 via-gray-100/30 to-slate-800/40 rounded-lg animate-mistFlow"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-50/30 via-transparent to-slate-700/20 rounded-lg blur-md" style={{animationDelay: '0.5s', animationDuration: '10s'}}></div>
            <div className="absolute inset-0 bg-amber-50/10 rounded-lg mix-blend-overlay"></div>
            
            {/* Content */}
            <div className="relative bg-black/5 backdrop-blur-md rounded-lg p-5 shadow-2xl border border-amber-100/30">
              <p className="font-serif italic text-amber-900/80 leading-relaxed mb-3">
                {journalContext.currentWhisperNudge}
              </p>
              <div className="w-full flex justify-end">
                <span className="text-xs text-amber-700/60 font-light">~ gentle nudge</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhisperButton;