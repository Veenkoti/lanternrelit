import React from 'react';

interface PorscheOverlayProps {
  onClose: () => void;
}

const PorscheOverlay: React.FC<PorscheOverlayProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 transition-opacity duration-500">
      <img 
        src="https://res.cloudinary.com/dausootjh/image/upload/v1747906043/Twilight_Porsche_in_Snowy_Landscape_xwlrkj.png" 
        alt="Porsche in a snowy landscape" 
        className="max-w-[90%] max-h-[90%] object-contain" 
      />
      <button 
        className="absolute top-5 right-5 bg-white bg-opacity-20 hover:bg-opacity-40 text-white px-4 py-2 rounded transition-colors duration-200"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};

export default PorscheOverlay;
