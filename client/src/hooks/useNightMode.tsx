import { useState, useEffect } from 'react';

/**
 * Hook for managing night mode in the application
 * Simulates natural daylight cycle or can be manually toggled
 */
export function useNightMode() {
  const [isNightMode, setIsNightMode] = useState(false);
  const [isDayCycle, setIsDayCycle] = useState(true);

  // Set initial night mode based on time of day
  useEffect(() => {
    const checkTimeOfDay = () => {
      const hour = new Date().getHours();
      // Night time is between 7pm (19) and 6am (6)
      return hour >= 19 || hour < 6;
    };

    if (isDayCycle) {
      setIsNightMode(checkTimeOfDay());
    }
  }, [isDayCycle]);

  // Update night mode every minute when day cycle is enabled
  useEffect(() => {
    if (!isDayCycle) return;

    const updateNightMode = () => {
      const hour = new Date().getHours();
      const minute = new Date().getMinutes();
      
      // Calculate a gradual transition between day and night
      // Morning transition (5am-7am)
      if (hour >= 5 && hour < 7) {
        const transitionProgress = (hour - 5) * 60 + minute;
        const totalTransitionMinutes = 2 * 60; // 2 hours
        const isDaylight = transitionProgress / totalTransitionMinutes > 0.5;
        setIsNightMode(!isDaylight);
      } 
      // Evening transition (5pm-7pm)
      else if (hour >= 17 && hour < 19) {
        const transitionProgress = (hour - 17) * 60 + minute;
        const totalTransitionMinutes = 2 * 60; // 2 hours
        const isDaylight = transitionProgress / totalTransitionMinutes < 0.5;
        setIsNightMode(!isDaylight);
      }
      // Night (7pm-5am)
      else if (hour >= 19 || hour < 5) {
        setIsNightMode(true);
      }
      // Day (7am-5pm)
      else {
        setIsNightMode(false);
      }
    };

    // Initial update
    updateNightMode();

    // Set interval to check every minute
    const interval = setInterval(updateNightMode, 60000);
    return () => clearInterval(interval);
  }, [isDayCycle]);

  // Toggle night mode manually
  const toggleNightMode = () => {
    if (isDayCycle) {
      // If we're following day cycle, turn that off and set to opposite of current
      setIsDayCycle(false);
      setIsNightMode(prev => !prev);
    } else {
      // If manual mode, just toggle
      setIsNightMode(prev => !prev);
    }
  };

  // Toggle between auto day/night cycle and manual mode
  const toggleDayCycle = () => {
    setIsDayCycle(prev => !prev);
    if (!isDayCycle) {
      // When turning on day cycle, immediately update to correct time
      const hour = new Date().getHours();
      setIsNightMode(hour >= 19 || hour < 6);
    }
  };

  return {
    isNightMode,
    isDayCycle,
    toggleNightMode,
    toggleDayCycle
  };
}