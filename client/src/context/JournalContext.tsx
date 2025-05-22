import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { useBackgroundManager } from '@/hooks/useBackgroundManager';
import { useJournalStorage } from '@/hooks/useJournalStorage';
import { useDateTime } from '@/hooks/useDateTime';
import { useNightMode } from '@/hooks/useNightMode';
// Removed database imports for privacy-focused approach

// Prompt types
export interface PromptItem {
  text: string;
  credit: string;
  mood: string;
}

export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  timestamp: number;
  prompt?: PromptItem;
  mood?: string;
}

export interface PromptCategories {
  [key: string]: PromptItem[];
}

// Context type
interface JournalContextType {
  // State
  currentEntry: string;
  entries: JournalEntry[];
  currentPrompt: PromptItem | null;
  showHistory: boolean;
  searchTerm: string;
  selectedCategory: string;
  showCategories: boolean;
  showPorsche: boolean;
  isTyping: boolean;
  lanternMode: boolean;
  isNightMode: boolean;
  isDayCycle: boolean;
  currentWhisperNudge: string;
  backgroundImage: string;
  
  // Methods
  setCurrentEntry: (entry: string) => void;
  addEntry: (entry: JournalEntry) => void;
  deleteEntry: (id: string) => void;
  editEntry: (id: string) => void;
  setShowHistory: (show: boolean) => void;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string) => void;
  toggleCategories: () => void;
  toggleLanternMode: () => void;
  toggleNightMode: () => void;
  toggleDayCycle: () => void;
  togglePorsche: () => void;
  getRandomPrompt: (category?: string) => void;
  getWhisperNudge: () => void;
  setCurrentWhisperNudge: (nudge: string) => void;
  clearAllEntries: () => void;
  newEntry: () => void;
  saveEntry: () => void;
  
  // Privacy-focused export methods
  exportEntryToEmail: (id: string) => void;
  exportEntryToText: (id: string) => string | undefined;
  
  // Helper data
  formattedDate: string;
  formattedTime: string;
  promptCategories: PromptCategories;
  filteredEntries: JournalEntry[];
  aiWhispers: string[];
}

// Prompt categories data
const promptCategories: PromptCategories = {
  emotional: [
    { text: "What emotion are you avoiding right now, and why?", credit: "Emotional Awareness", mood: "contemplative" },
    { text: "Describe a feeling you're having without judging it as good or bad.", credit: "Mindful Acceptance", mood: "calm" },
    { text: "What would you say to comfort a friend feeling exactly what you're feeling right now?", credit: "Self-Compassion", mood: "nurturing" },
    { text: "Write about a time when you felt completely safe and at peace.", credit: "Emotional Memory", mood: "peaceful" },
    { text: "What does your inner critic sound like? Now, what would your inner friend say instead?", credit: "Inner Voice Work", mood: "reflective" },
    { text: "If your current emotion had a color, shape, and texture, what would it be?", credit: "Emotion Visualization", mood: "creative" },
    { text: "What boundaries do you need to set to protect your emotional well-being?", credit: "Emotional Boundaries", mood: "empowering" },
    { text: "Describe a moment when you felt truly understood by someone.", credit: "Connection Memory", mood: "warm" }
  ],
  healing: [
    { text: "What part of this still needs more kindness?", credit: "Healing Focus", mood: "gentle" },
    { text: "Write a letter of forgiveness to yourself for something you've been carrying.", credit: "Self-Forgiveness", mood: "releasing" },
    { text: "What would healing look like for you today? Not tomorrow, not next year, but today.", credit: "Present Healing", mood: "hopeful" },
    { text: "Describe a wound that has become a source of wisdom or strength.", credit: "Post-Traumatic Growth", mood: "triumphant" },
    { text: "What permission do you need to give yourself to heal?", credit: "Healing Permission", mood: "liberating" },
    { text: "If your pain could speak, what would it want you to know?", credit: "Pain Dialogue", mood: "deep" },
    { text: "Write about someone who made you feel worthy of love exactly as you are.", credit: "Unconditional Love", mood: "loved" },
    { text: "What small act of healing can you offer yourself right now?", credit: "Micro-Healing", mood: "nurturing" }
  ],
  mindfulness: [
    { text: "Describe what you notice in your body right now, without changing anything.", credit: "Body Awareness", mood: "present" },
    { text: "What are five things you can see, four you can hear, three you can touch, two you can smell, and one you can taste?", credit: "5-4-3-2-1 Grounding", mood: "grounded" },
    { text: "Write about this moment as if you're experiencing it for the very first time.", credit: "Beginner's Mind", mood: "wonder" },
    { text: "What thoughts keep visiting your mind today? Welcome them like guests, then let them go.", credit: "Thought Observer", mood: "flowing" },
    { text: "Describe your breathing right now. Is it shallow or deep? Fast or slow? No judgment, just awareness.", credit: "Breath Awareness", mood: "centered" },
    { text: "What would you notice if you approached this day with gentle curiosity instead of judgment?", credit: "Curious Awareness", mood: "open" },
    { text: "Write about a simple pleasure you experienced today that you almost missed.", credit: "Present Moment Joy", mood: "grateful" },
    { text: "If you could send love to every part of yourself right now, where would you start?", credit: "Loving-Kindness", mood: "compassionate" }
  ],
  gratitude: [
    { text: "What are three things you're grateful for right now?", credit: "Daily Gratitude", mood: "thankful" },
    { text: "Write about someone who showed you unexpected kindness recently.", credit: "Kindness Recognition", mood: "warm" },
    { text: "What challenge are you grateful for because of how it helped you grow?", credit: "Growth Gratitude", mood: "appreciative" },
    { text: "Describe a part of your body you're grateful for and why.", credit: "Body Appreciation", mood: "accepting" },
    { text: "What small comfort brought you peace today?", credit: "Simple Comforts", mood: "content" },
    { text: "Write a thank you note to a part of yourself that's been working hard lately.", credit: "Self-Appreciation", mood: "loving" },
    { text: "What skill or ability do you have that you sometimes take for granted?", credit: "Ability Gratitude", mood: "proud" },
    { text: "Describe a moment today when you felt connected to something larger than yourself.", credit: "Connection Gratitude", mood: "connected" }
  ],
  selfCare: [
    { text: "How did you show kindness to yourself today?", credit: "Self-Kindness", mood: "gentle" },
    { text: "What does your soul need right now that you haven't been giving it?", credit: "Soul Needs", mood: "introspective" },
    { text: "If you treated yourself the way you treat your best friend, what would change?", credit: "Friend Treatment", mood: "compassionate" },
    { text: "What activity makes you lose track of time in the best way?", credit: "Flow State", mood: "joyful" },
    { text: "Write about a way you can nurture yourself that doesn't cost money.", credit: "Free Self-Care", mood: "resourceful" },
    { text: "What would 'good enough' look like today instead of perfect?", credit: "Perfectionism Release", mood: "accepting" },
    { text: "How can you make your environment more supportive of your well-being?", credit: "Environment Care", mood: "nurturing" },
    { text: "What's one habit you'd like to release and one you'd like to embrace?", credit: "Habit Reflection", mood: "intentional" }
  ],
  inspiration: [
    { text: "Hope is a good thing, maybe the best of things. – The Shawshank Redemption", credit: "The Shawshank Redemption", mood: "hopeful" },
    { text: "You are not the darkness you endured. You are the light that refused to surrender.", credit: "Unknown", mood: "triumphant" },
    { text: "There is no secret ingredient. It's just you. – Kung Fu Panda", credit: "Kung Fu Panda", mood: "empowering" },
    { text: "What would you tell your younger self today?", credit: "Wisdom Sharing", mood: "wise" },
    { text: "You have been assigned this mountain to show others it can be moved.", credit: "Purpose", mood: "determined" },
    { text: "What strength have you discovered within yourself that surprised you?", credit: "Hidden Strength", mood: "proud" },
    { text: "If you knew you couldn't fail, what would you try?", credit: "Fearless Exploration", mood: "bold" },
    { text: "How has your story given you wisdom that only you can share?", credit: "Unique Wisdom", mood: "meaningful" }
  ],
  whisper: [
    { text: "What secret does your heart whisper to you in the quiet moments?", credit: "Heart Whispers", mood: "intimate" },
    { text: "If silence could speak, what would it tell you about yourself?", credit: "Silent Wisdom", mood: "profound" },
    { text: "What truth are you afraid to acknowledge?", credit: "Hidden Truth", mood: "vulnerable" },
    { text: "Describe the voice inside you that knows exactly what you need.", credit: "Inner Knowing", mood: "intuitive" },
    { text: "What would you do if no one was watching or judging?", credit: "Authentic Self", mood: "free" },
    { text: "Write about a dream that keeps calling to you.", credit: "Dream Calling", mood: "aspirational" },
    { text: "What does your intuition keep trying to tell you?", credit: "Intuitive Voice", mood: "listening" },
    { text: "If your future self could whisper one thing to you right now, what would it be?", credit: "Future Wisdom", mood: "visionary" }
  ]
};

// Get all prompts as a flat array
const allPrompts = Object.values(promptCategories).flat();

// AI Whisper nudges - more gentle, therapeutic nudges that guide without solving
const aiWhispers = [
  "What secret does your heart whisper to you in the quiet moments?",
  "If silence could speak, what would it tell you about yourself?",
  "What truth are you afraid to acknowledge?",
  "Describe the voice inside you that knows exactly what you need.",
  "What would you do if no one was watching or judging?",
  "Write about a dream that keeps calling to you.",
  "What does your intuition keep trying to tell you?",
  "If your future self could whisper one thing to you right now, what would it be?",
  "What emotions are visiting you today? Notice them without judgment.",
  "Where in your body do you feel most tense right now? And most at ease?",
  "What small thing could you release to create more space within?",
  "If your inner wisdom had a gentle message for you today, what might it be?",
  "What part of yourself needs more tenderness right now?",
  "What's a question you've been avoiding asking yourself?",
  "What strengths are you not giving yourself credit for?",
  "If your heart could speak directly to you, what would it say?",
  "What's one small step toward healing you could take today?",
  "Where are you seeking permission that you could give yourself?",
  "What would feel like kindness toward yourself right now?",
  "How would you approach this situation if you truly believed you were enough?",
  "What are you learning about yourself in this season of life?",
  "What story are you telling yourself that might not be completely true?",
  "Where could you be gentler with yourself today?",
  "What boundaries might help you honor your own needs more fully?",
  "What feeling are you most resistant to right now? Can you make space for it?",
  "If you didn't need to be productive right now, what would your body want?",
  "What matters most deeply to you in this moment?",
  "What truth feels both scary and freeing to acknowledge?"
];

// Create context
export const JournalContext = createContext<JournalContextType | undefined>(undefined);

export function JournalProvider({ children }: { children: ReactNode }) {
  // Use custom hooks
  const { saveEntries, getSavedEntries } = useJournalStorage();
  const { formattedDate, formattedTime } = useDateTime();
  const { backgroundImage, updateBackground } = useBackgroundManager();
  
  // State
  const [currentEntry, setCurrentEntry] = useState<string>('');
  const [entries, setEntries] = useState<JournalEntry[]>(() => getSavedEntries());
  const [currentPrompt, setCurrentPrompt] = useState<PromptItem | null>(null);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showCategories, setShowCategories] = useState<boolean>(false);
  const [showPorsche, setShowPorsche] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [lanternMode, setLanternMode] = useState<boolean>(false);
  const [currentWhisperNudge, setCurrentWhisperNudge] = useState<string>('');
  const [lastActivity, setLastActivity] = useState<number>(Date.now());
  const [promptCount, setPromptCount] = useState<number>(0);

  // Refs
  const typingTimeoutRef = useRef<number | null>(null);
  const whisperIntervalRef = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Filter entries based on search term
  const filteredEntries = entries.filter(entry => {
    const lowercaseSearch = searchTerm.toLowerCase();
    return (
      entry.title.toLowerCase().includes(lowercaseSearch) ||
      entry.content.toLowerCase().includes(lowercaseSearch) ||
      (entry.prompt?.text.toLowerCase().includes(lowercaseSearch) || false)
    );
  }).sort((a, b) => b.timestamp - a.timestamp);

  // Effects
  // Save entries to localStorage when they change
  useEffect(() => {
    saveEntries(entries);
  }, [entries, saveEntries]);

  // Update background when prompt or lantern mode changes
  useEffect(() => {
    if (currentPrompt && !lanternMode) {
      updateBackground(currentPrompt.mood);
    }
  }, [currentPrompt, lanternMode, updateBackground]);

  // Handle typing detection
  useEffect(() => {
    const handleActivity = () => {
      setLastActivity(Date.now());
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keypress', handleActivity);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keypress', handleActivity);
    };
  }, []);

  // Set up whisper nudges that appear after inactivity
  useEffect(() => {
    const checkInactivity = () => {
      const now = Date.now();
      const inactiveTime = now - lastActivity;
      
      // Show a whisper nudge after 20 seconds of inactivity
      if (inactiveTime > 20000 && !showHistory) {
        const randomIndex = Math.floor(Math.random() * aiWhispers.length);
        setCurrentWhisperNudge(aiWhispers[randomIndex]);
      } else if (inactiveTime < 5000) {
        setCurrentWhisperNudge('');
      }
    };

    whisperIntervalRef.current = window.setInterval(checkInactivity, 5000);

    return () => {
      if (whisperIntervalRef.current) {
        clearInterval(whisperIntervalRef.current);
      }
    };
  }, [lastActivity, showHistory, aiWhispers]);

  // Update typing state
  useEffect(() => {
    const handleTyping = () => {
      setIsTyping(true);
      
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      
      typingTimeoutRef.current = window.setTimeout(() => {
        setIsTyping(false);
      }, 1000);
    };

    if (currentEntry) {
      handleTyping();
    }

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [currentEntry]);

  // Select a random prompt on initial load
  useEffect(() => {
    if (!currentPrompt) {
      getRandomPrompt();
    }
  }, []);

  // Methods
  const getRandomPrompt = (category?: string) => {
    let promptPool;
    
    if (category && category !== 'all' && promptCategories[category]) {
      promptPool = promptCategories[category];
    } else {
      promptPool = allPrompts;
    }
    
    // Get a random prompt, but try to avoid repeating the last one if possible
    let newPromptIndex;
    const poolSize = promptPool.length;
    
    if (poolSize > 1) {
      do {
        newPromptIndex = Math.floor(Math.random() * poolSize);
      } while (
        promptPool[newPromptIndex].text === currentPrompt?.text && 
        promptCount < 5 // Only try to avoid duplicates for the first few prompts
      );
    } else {
      newPromptIndex = 0;
    }
    
    const newPrompt = promptPool[newPromptIndex];
    setCurrentPrompt(newPrompt);
    setPromptCount(prevCount => prevCount + 1);
    
    // Update background based on the new prompt mood
    if (!lanternMode && newPrompt) {
      updateBackground(newPrompt.mood);
    }
  };

  const toggleCategories = () => {
    setShowCategories(prev => !prev);
  };

  const toggleLanternMode = () => {
    setLanternMode(prev => !prev);
    setLastActivity(Date.now());
  };

  const togglePorsche = () => {
    setShowPorsche(prev => !prev);
    setLastActivity(Date.now());
  };

  const newEntry = () => {
    setCurrentEntry('');
    getRandomPrompt(selectedCategory);
    setLastActivity(Date.now());
  };

  const saveEntry = () => {
    if (currentEntry.trim()) {
      // Create a title from the first few words of content or use prompt text as title
      const contentPreview = currentEntry.trim().split(' ').slice(0, 5).join(' ');
      const title = contentPreview.length > 3 
        ? `${contentPreview}${contentPreview.length < currentEntry.trim().length ? '...' : ''}`
        : currentPrompt?.text.split(' ').slice(0, 5).join(' ') || 'Untitled Entry';
      
      const timestamp = Date.now();
      const dateStr = new Date().toLocaleString();
      
      // Create the entry (stored only locally for privacy)
      const newEntry: JournalEntry = {
        id: timestamp.toString(),
        title,
        content: currentEntry,
        date: dateStr,
        timestamp: timestamp,
        prompt: currentPrompt || undefined,
        mood: currentPrompt?.mood
      };
      
      // Add to local state only - privacy-focused approach
      setEntries(prev => [newEntry, ...prev]);
      
      // Reset UI state
      setCurrentEntry('');
      getRandomPrompt(selectedCategory);
      setLastActivity(Date.now());
    }
  };

  const deleteEntry = (id: string) => {
    // Remove from local state only
    setEntries(prev => prev.filter(entry => entry.id !== id));
    setLastActivity(Date.now());
  };
  
  // New export functionality for privacy-focused approach
  const exportEntryToEmail = (id: string) => {
    const entry = entries.find(e => e.id === id);
    if (!entry) return;
    
    const subject = encodeURIComponent(`Northern Journal: ${entry.title}`);
    const body = encodeURIComponent(
      `${entry.date}\n\n${entry.prompt?.text ? `Prompt: ${entry.prompt.text}\n\n` : ''}${entry.content}`
    );
    
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };
  
  // Export to text format for saving to notes app
  const exportEntryToText = (id: string) => {
    const entry = entries.find(e => e.id === id);
    if (!entry) return;
    
    const content = `
NORTHERN JOURNAL
Date: ${entry.date}
${entry.prompt?.text ? `Prompt: ${entry.prompt.text}` : ''}
${entry.prompt?.credit ? `Credit: ${entry.prompt.credit}` : ''}

${entry.content}
    `.trim();
    
    // Create a temporary element to facilitate copy to clipboard
    const el = document.createElement('textarea');
    el.value = content;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    
    // Return content for potential download
    return content;
  };

  const editEntry = (id: string) => {
    const entryToEdit = entries.find(entry => entry.id === id);
    if (entryToEdit) {
      setCurrentEntry(entryToEdit.content);
      if (entryToEdit.prompt) {
        setCurrentPrompt(entryToEdit.prompt);
      }
      setShowHistory(false);
      setLastActivity(Date.now());
      
      // Remove the entry that's being edited
      setEntries(prev => prev.filter(entry => entry.id !== id));
    }
  };

  const clearAllEntries = () => {
    if (window.confirm('Are you sure you want to clear all journal entries? This cannot be undone.')) {
      setEntries([]);
      setLastActivity(Date.now());
    }
  };

  const addEntry = (entry: JournalEntry) => {
    setEntries(prev => [entry, ...prev]);
    setLastActivity(Date.now());
  };

  // Add getWhisperNudge function for AI-based guidance
  const getWhisperNudge = () => {
    const randomIndex = Math.floor(Math.random() * aiWhispers.length);
    setCurrentWhisperNudge(aiWhispers[randomIndex]);
    setLastActivity(Date.now());
  };
  
  // Context value
  const value: JournalContextType = {
    currentEntry,
    entries,
    currentPrompt,
    showHistory,
    searchTerm,
    selectedCategory,
    showCategories,
    showPorsche,
    isTyping,
    lanternMode,
    currentWhisperNudge,
    backgroundImage,
    
    setCurrentEntry,
    addEntry,
    deleteEntry,
    editEntry,
    setShowHistory,
    setSearchTerm,
    setSelectedCategory,
    toggleCategories,
    toggleLanternMode,
    togglePorsche,
    getRandomPrompt,
    getWhisperNudge,
    setCurrentWhisperNudge,
    clearAllEntries,
    newEntry,
    saveEntry,
    
    // Privacy-focused export methods
    exportEntryToEmail,
    exportEntryToText,
    
    formattedDate,
    formattedTime,
    promptCategories,
    filteredEntries,
    aiWhispers
  };

  return (
    <JournalContext.Provider value={value}>
      {children}
    </JournalContext.Provider>
  );
}

export function useJournal() {
  const context = useContext(JournalContext);
  if (context === undefined) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  return context;
}
