import React from 'react';
import WhisperButton from './WhisperButton';



interface FooterProps {
  lanternMode?: boolean;
  toggleLanternMode?: () => void;
  togglePorsche?: () => void;
  clearAllEntries?: () => void;
}

const Footer: React.FC<FooterProps> = ({ 
  lanternMode = false, 
  toggleLanternMode = () => {}, 
  togglePorsche = () => {}, 
  clearAllEntries = () => {}
}) => {
  return (
    <footer className="text-center p-6 mt-auto bg-primary-bg-dark backdrop-blur border-t border-border-subtle shadow-[0_-4px_10px_rgba(0,0,0,0.5)]">
      
        <div className="flex flex-wrap justify-center gap-4 mb-4">
        {/* Toggle Lantern Mode Button */}
        <button 
          className="bg-secondary-bg-light text-text-light border border-border-subtle px-5 py-3 rounded-lg font-semibold transition hover:bg-button-hover-bg hover:-translate-y-0.5 hover:border-accent-medium active:translate-y-0 active:bg-button-active-bg shadow-lg min-w-[160px] flex items-center justify-center gap-2"
          onClick={toggleLanternMode}
        >
          <img 
            src="https://res.cloudinary.com/dausootjh/image/upload/v1747906043/Northern_Journal_Icon_Design_g9vm1l.png" 
            alt="Pine tree icon" 
            className="h-5 w-auto" 
          />
          <span>{lanternMode ? 'Disable Lantern' : 'Enable Lantern'}</span>
        </button>
        
        {/* Clear All Button */}
        <button 
          className="bg-red-500 text-white border border-red-500 px-5 py-3 rounded-lg font-semibold transition hover:bg-red-600 hover:-translate-y-0.5 hover:border-red-600 active:translate-y-0 shadow-lg min-w-[160px] flex items-center justify-center gap-2"
          onClick={clearAllEntries}
        >
          <span>Clear All</span>
        </button>
      </div>
      
      <div className="text-text-lighter mt-4">
        <p className="opacity-85 text-sm mb-1">
          Northern Journal • Your words, your journey
        </p>
        <p className="opacity-60 text-xs">
          {`Built by Veenkoti Studios © ${new Date().getFullYear()} • Let silence be your sanctuary`}
        </p>
        <p className="opacity-60 text-xs mt-1 italic">
          Privacy focused: your entries never leave your device
        </p>
      </div>
    
        <div className="mt-6 flex justify-center">
          <WhisperButton className="text-yellow-400 text-4xl animate-pulse hover:scale-110 transition duration-300 ease-in-out" />
        </div>

</footer>
  );
};

export default Footer;
