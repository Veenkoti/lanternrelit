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
      <Button 
        variant="ghost" 
        onClick={handleWhisperClick}
        title="Receive a gentle nudge"
      >
      </Button>
      
      {showMist && (
            {/* Multiple fog/mist layers for a more ethereal effect */}
            
            {/* Content */}
                {journalContext.currentWhisperNudge}
              </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhisperButton;