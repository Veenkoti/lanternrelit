import React, { useState, useRef, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PorscheOverlay from '@/components/PorscheOverlay';

// Dynamic background scene options based on mood
const backgroundScenes = {
  peaceful: [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1920", 
    "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1920",
    "https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1920"
  ],
  contemplative: [
    "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1920", 
    "https://images.unsplash.com/photo-1527489377706-5bf97e608852?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1920",
    "https://images.unsplash.com/photo-1516646255117-f9f933680173?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1920"
  ],
  hopeful: [
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1920", 
    "https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1920",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1920"
  ],
  calm: [
    "https://images.unsplash.com/photo-1486078695445-0497c2f58cdb?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1920", 
    "https://images.unsplash.com/photo-1492058379598-32e2c5ad1cd3?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1920",
    "https://images.unsplash.com/photo-1515612148533-6247582c12c7?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1920"
  ],
  default: [
    "https://images.unsplash.com/photo-1548263594-a71ea65a8598?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1920", 
    "https://images.unsplash.com/photo-1488415032361-b7e238421f1b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1920",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1920"
  ],
};

// Main component
const Home: React.FC = () => {
  // State
  const [lanternMode, setLanternMode] = useState(false);
  const [showPorsche, setShowPorsche] = useState(false);
  const [currentEntry, setCurrentEntry] = useState('');
  const [backgroundImage, setBackgroundImage] = useState(
    backgroundScenes.default[Math.floor(Math.random() * backgroundScenes.default.length)]
  );
  const [currentMood, setCurrentMood] = useState('default');
  
  const videoRef = useRef<HTMLVideoElement>(null);

  // Update background based on mood
  const updateBackground = useCallback((mood = 'default') => {
    const moodKey = backgroundScenes[mood as keyof typeof backgroundScenes] 
      ? mood 
      : 'default';
    
    const sceneOptions = backgroundScenes[moodKey as keyof typeof backgroundScenes];
    const randomIndex = Math.floor(Math.random() * sceneOptions.length);
    const newBackgroundUrl = sceneOptions[randomIndex];
    
    setBackgroundImage(`${newBackgroundUrl}`);
  }, []);

  // Toggle functions
  const toggleLanternMode = () => setLanternMode(prev => !prev);
  const togglePorsche = () => setShowPorsche(prev => !prev);
  
  // Change background on mood change
  useEffect(() => {
    if (!lanternMode) {
      updateBackground(currentMood);
    }
  }, [currentMood, lanternMode, updateBackground]);

  // Handle lantern video playback
  useEffect(() => {
    if (videoRef.current) {
      if (lanternMode) {
        videoRef.current.play().catch(error => {
          console.error("Video playback failed:", error);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [lanternMode]);

  // Cycle through different moods for demo purposes
  useEffect(() => {
    const moodKeys = Object.keys(backgroundScenes);
    const moodInterval = setInterval(() => {
      if (!lanternMode) {
        const randomMoodIndex = Math.floor(Math.random() * moodKeys.length);
        setCurrentMood(moodKeys[randomMoodIndex]);
      }
    }, 15000); // Change mood every 15 seconds

    return () => clearInterval(moodInterval);
  }, [lanternMode]);

  // Random journal prompts for demo
  const journalPrompts = [
    "What emotion are you avoiding right now, and why?",
    "Describe a feeling you're having without judging it as good or bad.",
    "Write about a time when you felt completely safe and at peace.",
    "What small act of healing can you offer yourself right now?",
    "What are five things you can see, four you can hear, three you can touch, two you can smell, and one you can taste?"
  ];
  
  const randomPrompt = journalPrompts[Math.floor(Math.random() * journalPrompts.length)];

  return (
    <div 
      className="app-container"
      style={{ backgroundImage: !lanternMode ? `url(${backgroundImage})` : 'none' }}
    >
      {/* Lantern Mode Video Background */}
      {lanternMode && (
        <video 
          ref={videoRef}
          className="lantern-video-background"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src="https://res.cloudinary.com/dausootjh/video/upload/v1747906119/vhfgxrpxygwaqnpsmca4.mp4" type="video/mp4" />
        </video>
      )}

      {/* Porsche Surprise Overlay */}
      {showPorsche && (
        <PorscheOverlay onClose={togglePorsche} />
      )}

      <Header />
      
      <main className="flex-grow flex justify-center items-start p-4 md:p-8">
        <div className="bg-primary-bg-dark backdrop-blur border border-border-subtle rounded-xl px-5 py-8 md:p-9 w-full max-w-3xl shadow-dark">
          {/* Prompt Box */}
          <div className="bg-secondary-bg-light p-5 md:p-7 rounded-xl mb-8 text-center shadow-inset border-l-4 border-accent-light">
            <p className="italic mb-2 text-lg">{randomPrompt}</p>
            <span className="text-sm opacity-85 text-text-lighter">Journal Prompt</span>
          </div>
          
          <textarea 
            className="journal-textarea mb-6"
            placeholder="Begin writing here. Your words are saved locally on your device."
            value={currentEntry}
            onChange={(e) => setCurrentEntry(e.target.value)}
          />
          
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              className="bg-secondary-bg-light text-text-light border border-border-subtle px-5 py-3 rounded-lg font-semibold transition hover:bg-button-hover-bg hover:-translate-y-0.5 hover:border-accent-medium active:translate-y-0 active:bg-button-active-bg shadow-lg min-w-[160px] flex items-center justify-center gap-2"
              onClick={() => {
                const moods = Object.keys(backgroundScenes);
                const randomMood = moods[Math.floor(Math.random() * moods.length)];
                updateBackground(randomMood);
              }}
            >
              Change Background
            </button>
            <button 
              className="bg-secondary-bg-light text-text-light border border-border-subtle px-5 py-3 rounded-lg font-semibold transition hover:bg-button-hover-bg hover:-translate-y-0.5 hover:border-accent-medium active:translate-y-0 active:bg-button-active-bg shadow-lg min-w-[160px] flex items-center justify-center gap-2"
              onClick={() => setCurrentEntry('')}
            >
              New Entry
            </button>
            <button 
              className="bg-accent-medium text-white border border-accent-medium px-5 py-3 rounded-lg font-semibold transition hover:bg-accent-light hover:-translate-y-0.5 hover:border-accent-light active:translate-y-0 shadow-lg min-w-[160px] flex items-center justify-center gap-2"
            >
              Save Entry
            </button>
          </div>
        </div>
      </main>
      
      <Footer 
        lanternMode={lanternMode}
        toggleLanternMode={toggleLanternMode}
        togglePorsche={togglePorsche}
      />
    </div>
  );
};

export default Home;
