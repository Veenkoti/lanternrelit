// Collection of positive quotes from movies, Pokemon, and pop culture
// Targeted for ages 8-50

export interface PopCultureQuote {
  text: string;
  source: string;
  category: 'movie' | 'animation' | 'game' | 'tv' | 'book';
}

export const popCultureQuotes: PopCultureQuote[] = [
  // Pokemon
  {
    text: "The important thing is not how long you live. It's what you accomplish with your life.",
    source: "Mewtwo, Pokemon: The First Movie",
    category: 'animation'
  },
  {
    text: "Make your wonderful dream a reality, and it will become your truth.",
    source: "N, Pokemon Black/White",
    category: 'game'
  },
  {
    text: "It's more important to master the cards you're holding than to complain about the ones your opponents were dealt.",
    source: "Grimsley, Pokemon Black/White",
    category: 'game'
  },
  {
    text: "Even if we don't understand each other, that's not a reason to reject each other.",
    source: "Mewtwo, Pokemon: The First Movie",
    category: 'animation'
  },
  
  // Kung Fu Panda
  {
    text: "Yesterday is history, tomorrow is a mystery, but today is a gift. That is why it is called the present.",
    source: "Master Oogway, Kung Fu Panda",
    category: 'animation'
  },
  {
    text: "There is no secret ingredient. It's just you.",
    source: "Po, Kung Fu Panda",
    category: 'animation'
  },
  {
    text: "Your mind is like this water, my friend. When it becomes agitated, it becomes difficult to see. But if you allow it to settle, the answer becomes clear.",
    source: "Master Oogway, Kung Fu Panda",
    category: 'animation'
  },
  
  // Harry Potter
  {
    text: "Happiness can be found even in the darkest of times, if one only remembers to turn on the light.",
    source: "Albus Dumbledore, Harry Potter",
    category: 'movie'
  },
  {
    text: "It is our choices that show what we truly are, far more than our abilities.",
    source: "Albus Dumbledore, Harry Potter",
    category: 'movie'
  },
  
  // Star Wars
  {
    text: "Do or do not. There is no try.",
    source: "Yoda, Star Wars: The Empire Strikes Back",
    category: 'movie'
  },
  {
    text: "The Force will be with you. Always.",
    source: "Obi-Wan Kenobi, Star Wars",
    category: 'movie'
  },
  {
    text: "In my experience, there's no such thing as luck.",
    source: "Obi-Wan Kenobi, Star Wars",
    category: 'movie'
  },
  
  // Marvel
  {
    text: "Part of the journey is the end.",
    source: "Tony Stark, Avengers: Endgame",
    category: 'movie'
  },
  {
    text: "You never know. You hope for the best and make do with what you get.",
    source: "Nick Fury, Captain Marvel",
    category: 'movie'
  },
  {
    text: "With great power comes great responsibility.",
    source: "Uncle Ben, Spider-Man",
    category: 'movie'
  },
  {
    text: "We can't always choose our path. Sometimes our path chooses us.",
    source: "T'Challa, Black Panther",
    category: 'movie'
  },
  
  // Disney/Pixar
  {
    text: "The past can hurt. But the way I see it, you can either run from it, or learn from it.",
    source: "Rafiki, The Lion King",
    category: 'animation'
  },
  {
    text: "The flower that blooms in adversity is the most rare and beautiful of all.",
    source: "The Emperor, Mulan",
    category: 'animation'
  },
  {
    text: "Our fate lives within us. You only have to be brave enough to see it.",
    source: "Merida, Brave",
    category: 'animation'
  },
  {
    text: "Just keep swimming.",
    source: "Dory, Finding Nemo",
    category: 'animation'
  },
  {
    text: "Adventure is out there!",
    source: "Ellie, Up",
    category: 'animation'
  },
  {
    text: "To infinity and beyond!",
    source: "Buzz Lightyear, Toy Story",
    category: 'animation'
  },
  
  // Lord of the Rings
  {
    text: "All we have to decide is what to do with the time that is given to us.",
    source: "Gandalf, The Lord of the Rings",
    category: 'movie'
  },
  {
    text: "Even the smallest person can change the course of the future.",
    source: "Galadriel, The Lord of the Rings",
    category: 'movie'
  },
  
  // The Matrix
  {
    text: "There's a difference between knowing the path and walking the path.",
    source: "Morpheus, The Matrix",
    category: 'movie'
  },
  
  // Rocky
  {
    text: "It ain't about how hard you hit. It's about how hard you can get hit and keep moving forward.",
    source: "Rocky Balboa, Rocky",
    category: 'movie'
  },
  
  // The Hunger Games
  {
    text: "Hope is the only thing stronger than fear.",
    source: "President Snow, The Hunger Games",
    category: 'movie'
  },
  
  // Forrest Gump
  {
    text: "Life is like a box of chocolates. You never know what you're gonna get.",
    source: "Forrest Gump",
    category: 'movie'
  },
  
  // The Shawshank Redemption
  {
    text: "Hope is a good thing, maybe the best of things, and no good thing ever dies.",
    source: "Andy Dufresne, The Shawshank Redemption",
    category: 'movie'
  },
  {
    text: "Get busy living, or get busy dying.",
    source: "Andy Dufresne, The Shawshank Redemption",
    category: 'movie'
  },
  
  // Avatar: The Last Airbender
  {
    text: "It is important to draw wisdom from many different places.",
    source: "Uncle Iroh, Avatar: The Last Airbender",
    category: 'animation'
  },
  {
    text: "Pride is not the opposite of shame, but its source. True humility is the only antidote to shame.",
    source: "Uncle Iroh, Avatar: The Last Airbender",
    category: 'animation'
  },
  {
    text: "Sometimes life is like this dark tunnel. You can't always see the light at the end of the tunnel, but if you just keep moving, you will come to a better place.",
    source: "Uncle Iroh, Avatar: The Last Airbender",
    category: 'animation'
  },
  
  // Doctor Who
  {
    text: "We're all stories in the end. Just make it a good one.",
    source: "The Doctor, Doctor Who",
    category: 'tv'
  },
  {
    text: "Do what I do. Hold tight and pretend it's a plan!",
    source: "The Doctor, Doctor Who",
    category: 'tv'
  },
  
  // Legend of Zelda
  {
    text: "It's dangerous to go alone! Take this.",
    source: "Old Man, The Legend of Zelda",
    category: 'game'
  },
  {
    text: "A sword wields no strength unless the hand that holds it has courage.",
    source: "Hero's Shade, The Legend of Zelda: Twilight Princess",
    category: 'game'
  },
  
  // Minecraft
  {
    text: "The riskiest thing is to take no risks.",
    source: "Minecraft splash text",
    category: 'game'
  },
  
  // Animal Crossing
  {
    text: "You have to do what makes you happy. No use doing something that puts you in a bad mood!",
    source: "Isabelle, Animal Crossing",
    category: 'game'
  }
];

// Function to get a random quote
export function getRandomQuote(): PopCultureQuote {
  const randomIndex = Math.floor(Math.random() * popCultureQuotes.length);
  return popCultureQuotes[randomIndex];
}

// Function to get quotes by category
export function getQuotesByCategory(category: 'movie' | 'animation' | 'game' | 'tv' | 'book'): PopCultureQuote[] {
  return popCultureQuotes.filter(quote => quote.category === category);
}