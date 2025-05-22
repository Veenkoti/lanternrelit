import { useState, useCallback } from 'react';

// Dynamic background system based on mood/tone (using Unsplash for reliability)
const backgroundScenes = {
  peaceful: ["https://source.unsplash.com/1920x1080/?norwegian,fjord,calm", "https://source.unsplash.com/1920x1080/?scandinavian,lake,mirror", "https://source.unsplash.com/1920x1080/?finland,forest,misty"],
  contemplative: ["https://source.unsplash.com/1920x1080/?nordic,mountains,fog", "https://source.unsplash.com/1920x1080/?iceland,landscape,moody", "https://source.unsplash.com/1920x1080/?norway,clouds,dramatic"],
  hopeful: ["https://source.unsplash.com/1920x1080/?aurora,northern,lights", "https://source.unsplash.com/1920x1080/?nordic,sunrise,golden", "https://source.unsplash.com/1920x1080/?scandinavia,spring,bright"],
  calm: ["https://source.unsplash.com/1920x1080/?scandinavian,beach,serene", "https://source.unsplash.com/1920x1080/?nordic,water,still", "https://source.unsplash.com/1920x1080/?finland,winter,quiet"],
  empowering: ["https://source.unsplash.com/1920x1080/?mountain,peak,triumph", "https://source.unsplash.com/1920x1080/?nordic,cliff,strong", "https://source.unsplash.com/1920x1080/?scandinavian,glacier,powerful"],
  flowing: ["https://source.unsplash.com/1920x1080/?ocean,waves,gentle", "https://source.unsplash.com/1920x1080/?sea,rhythm,peaceful", "https://source.unsplash.com/1920x1080/?water,movement,calm"],
  deep: ["https://source.unsplash.com/1920x1080/?ocean,deep,blue", "https://source.unsplash.com/1920x1080/?sea,mysterious,vast", "https://source.unsplash.com/1920x1080/?underwater,serene,blue"],
  nurturing: ["https://source.unsplash.com/1920x1080/?forest,green,nurturing", "https://source.unsplash.com/1920x1080/?woodland,gentle,light", "https://source.unsplash.com/1920x1080/?trees,protective,warm"],
  grounded: ["https://source.unsplash.com/1920x1080/?forest,earth,roots", "https://source.unsplash.com/1920x1080/?woodland,stable,strong", "https://source.unsplash.com/1920x1080/?nature,foundation,solid"],
  default: ["https://source.unsplash.com/1920x1080/?nordic,nature,beautiful", "https://source.unsplash.com/1920x1080/?scandinavian,landscape,serene", "https://source.unsplash.com/1920x1080/?nature,peaceful,healing"],
  triumphant: ["https://source.unsplash.com/1920x1080/?summit,victory,achievement", "https://source.unsplash.com/1920x1080/?mountain,top,success", "https://source.unsplash.com/1920x1080/?peak,triumph,golden"],
  grateful: ["https://source.unsplash.com/1920x1080/?sunset,golden,light,warm", "https://source.unsplash.com/1920x1080/?harvest,abundance,nature", "https://source.unsplash.com/1920x1080/?cozy,home,comfort"],
  reflective: ["https://source.unsplash.com/1920x1080/?library,books,study,quiet", "https://source.unsplash.com/1920x1080/?rain,window,contemplation", "https://source.unsplash.com/1920x1080/?foggy,morning,solitude"],
  creative: ["https://source.unsplash.com/1920x1080/?art,studio,inspiration", "https://source.unsplash.com/1920x1080/?colorful,abstract,paint", "https://source.unsplash.com/1920x1080/?dreamy,surreal,imagination"],
  atmospheric: ["https://source.unsplash.com/1920x1080/?atmospheric,journal,background", "https://source.unsplash.com/1920x1080/?moody,writing,scene", "https://source.unsplash.com/1920x1080/?dark,notebook,ambiance", "https://source.unsplash.com/1920x1080/?misty,journal,setting"],
  cozy: ["https://source.unsplash.com/1920x1080/?cozy,writing,ambiance", "https://source.unsplash.com/1920x1080/?warm,journal,light", "https://source.unsplash.com/1920x1080/?cabin,writing,desk"]
};

export function useBackgroundManager() {
  const [backgroundImage, setBackgroundImage] = useState<string>("");

  // Get all available mood keys
  const moodKeys = Object.keys(backgroundScenes);

  // Update background image based on mood
  const updateBackground = useCallback((mood: string = 'default') => {
    // If mood doesn't exist in our scenes, use default
    const moodKey = moodKeys.includes(mood) ? mood : 'default';
    const sceneOptions = backgroundScenes[moodKey as keyof typeof backgroundScenes];
    
    // Select a random image from the options for this mood
    const randomIndex = Math.floor(Math.random() * sceneOptions.length);
    const newBackgroundUrl = sceneOptions[randomIndex];
    
    // Prevent unnecessary re-renders if the URL is the same
    if (newBackgroundUrl !== backgroundImage) {
      // Add a cache-busting parameter to ensure we get a fresh image
      const cacheBuster = `&cb=${Date.now()}`;
      setBackgroundImage(`${newBackgroundUrl}${cacheBuster}`);
    }
  }, [backgroundImage, moodKeys]);

  return {
    backgroundImage,
    updateBackground
  };
}
