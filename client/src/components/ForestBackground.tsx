import React, { useEffect, useState } from 'react';

interface ForestBackgroundProps {
  lanternMode: boolean;
  isNightMode: boolean;
}

const ForestBackground: React.FC<ForestBackgroundProps> = ({ lanternMode, isNightMode }) => {
  const [opacity, setOpacity] = useState(0);
  
  // Fade in effect
  useEffect(() => {
    setOpacity(0);
    const timer = setTimeout(() => setOpacity(1), 1000);
    return () => clearTimeout(timer);
  }, [lanternMode, isNightMode]);
  
  if (!lanternMode) return null;
  
  const time = new Date().getHours();
  const isDawn = time >= 5 && time < 8;
  const isDusk = time >= 17 && time < 20;
  
  // Determine the appropriate forest background based on time of day
  let backgroundImage = '';
  if (isNightMode) {
    backgroundImage = 'https://images.unsplash.com/photo-1516466723877-e4ec1d736c8a?q=80&w=1776&auto=format&fit=crop';
  } else if (isDawn) {
    backgroundImage = 'https://images.unsplash.com/photo-1533633310920-cc9bf846bc99?q=80&w=1770&auto=format&fit=crop';
  } else if (isDusk) {
    backgroundImage = 'https://images.unsplash.com/photo-1569110462378-8eef7f5f1216?q=80&w=1776&auto=format&fit=crop';
  } else {
    backgroundImage = 'https://images.unsplash.com/photo-1544084944-15c0696c4ac2?q=80&w=1774&auto=format&fit=crop';
  }
  
  // Apply lighting effects based on time of day
  let overlayClass = '';
  if (isNightMode) {
    overlayClass = 'bg-blue-950/60';
  } else if (isDawn) {
    overlayClass = 'bg-gradient-to-t from-amber-800/40 to-blue-900/40';
  } else if (isDusk) {
    overlayClass = 'bg-gradient-to-t from-amber-700/40 to-indigo-900/40';
  } else {
    overlayClass = 'bg-blue-500/20';
  }
  
  return (
    <div 
      className="absolute inset-0 z-[-1] overflow-hidden transition-opacity duration-1000"
      style={{ opacity }}
    >
      {/* Forest background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Overlay for time of day lighting effect */}
      <div className={`absolute inset-0 ${overlayClass}`} />
      
      {/* Light rays */}
      {!isNightMode && (
        <div className="absolute inset-0 bg-gradient-to-b from-amber-400/10 to-transparent" />
      )}
      
      {/* Lantern glow effect */}
      <div className="absolute inset-0 bg-amber-500/5 mix-blend-overlay" />
      
      {/* Fog/mist effect */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-[12px]" />
      
      {/* Particle overlay (stars at night, dust motes during day) */}
      {isNightMode ? (
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30" />
      ) : (
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-10" />
      )}
    </div>
  );
};

export default ForestBackground;
  // Track time every 5 minutes to force a new background
  useEffect(() => {
    const bgInterval = setInterval(() => {
      setOpacity(0);
      setTimeout(() => setOpacity(1), 1000);
    }, 5 * 60 * 1000); // 5 minutes
    return () => clearInterval(bgInterval);
  }, []);
