import React, { useState, useEffect } from 'react';

import { getRandomQuote } from '@/data/popCultureQuotes';

const Header: React.FC<{date?: string, time?: string}> = ({ date, time }) => {
  const [quote, setQuote] = useState({ text: '', source: '' });
  
  // Format the date with a more elegant, serene style
  const formatDate = () => {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    return formatter.format(now);
  };
  
  // Format the time with a more elegant style
  const formatTime = () => {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    return formatter.format(now);
  };
  
  // Get a random pop culture quote on load and every 20 seconds
  useEffect(() => {
    const updateQuote = () => {
      const newQuote = getRandomQuote();
      setQuote({ 
        text: newQuote.text, 
        source: newQuote.source 
      });
    };
    
    // Initial quote
    updateQuote();
    
    // Update quote every 20 seconds
    const interval = setInterval(updateQuote, 20000);
    
    return () => clearInterval(interval);
  }, []);
  
  const currentDate = formatDate();
  const currentTime = formatTime();

  return (
    <header className="relative text-center p-5 py-6 bg-primary-bg-dark backdrop-blur border-b border-border-subtle shadow-dark">
      {/* Date and time positioned in top corners */}
      <div className="absolute left-6 top-4 text-amber-100/80 font-serif italic text-sm">
        {date || currentDate}
      </div>
      <div className="absolute right-6 top-4 text-amber-100/80 font-serif italic text-sm">
        {time || currentTime}
      </div>
      
      {/* Whisper button positioned absolutely */}
      <div className="absolute right-6 top-12">
        
      </div>
      
      <h1 className="text-4xl md:text-5xl font-light tracking-wider text-accent-light m-0 leading-tight mt-6">
        Northern Journal
      </h1>
      <p className="text-lg italic mt-1 text-text-lighter opacity-90">
        Healing begins in silence
      </p>
      
      {/* Dynamic pop culture quote */}
      <div className="mt-4 max-w-2xl mx-auto px-4 py-3 bg-amber-50/10 backdrop-blur-sm rounded-lg border border-amber-100/20">
        <p className="font-serif italic text-amber-100/90">"{quote.text}"</p>
        <p className="text-xs text-amber-100/70 mt-1">— {quote.source}</p>
      </div>
    </header>
  );
};

export default Header;
