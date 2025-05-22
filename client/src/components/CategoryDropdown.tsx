import React, { useRef, useEffect } from 'react';
import { useJournal } from '@/context/JournalContext';

const CategoryDropdown: React.FC = () => {
  const { 
    promptCategories, 
    selectedCategory, 
    setSelectedCategory, 
    showCategories, 
    toggleCategories,
    getRandomPrompt
  } = useJournal();

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && showCategories) {
        toggleCategories();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCategories, toggleCategories]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    getRandomPrompt(category);
    toggleCategories();
  };

  // Get all category keys and add 'all' option
  const categories = ['all', ...Object.keys(promptCategories)];

  // Format category names for display
  const formatCategoryName = (category: string): string => {
    if (category === 'all') return 'All Categories';
    
    // Handle camelCase categories
    if (category === 'selfCare') return 'Self-Care';
    
    // Capitalize first letter
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button 
        className="bg-secondary-bg-light text-text-light border border-border-subtle px-5 py-3 rounded-lg font-semibold transition hover:bg-button-hover-bg hover:-translate-y-0.5 hover:border-accent-medium active:translate-y-0 active:bg-button-active-bg shadow-lg min-w-[160px] flex items-center justify-center gap-2"
        onClick={toggleCategories}
      >
        <span>Choose Category</span>
      </button>
      
      {showCategories && (
        <div className="absolute mt-2 left-1/2 -translate-x-1/2 bg-primary-bg-dark border border-accent-medium rounded-xl shadow-dark min-w-[200px] max-h-[350px] overflow-y-auto z-20 flex flex-col transition-opacity duration-200">
          {categories.map((category) => (
            <button 
              key={category}
              className={`bg-transparent text-text-lighter border-none py-3.5 px-5 text-center cursor-pointer text-base w-full transition-colors hover:bg-secondary-bg-light hover:text-text-light first:rounded-t-xl last:rounded-b-xl ${selectedCategory === category ? 'bg-secondary-bg-light text-text-light' : ''}`}
              onClick={() => handleCategorySelect(category)}
            >
              {formatCategoryName(category)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
