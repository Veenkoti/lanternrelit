import { useState, useEffect } from 'react';

export function useDateTime() {
  const [clock, setClock] = useState(new Date());

  // Update the clock every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setClock(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Format the date in a readable format
  const formattedDate = clock.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  // Format the time in a readable format
  const formattedTime = clock.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return {
    clock,
    formattedDate,
    formattedTime
  };
}
