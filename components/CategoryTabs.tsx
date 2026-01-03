
import React, { useRef } from 'react';
import { CATEGORIES, CategoryType } from '../types';
import { getCategoryIcon } from '../constants';

interface CategoryTabsProps {
  activeCategory: CategoryType;
  onSelect: (category: CategoryType) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ activeCategory, onSelect }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="sticky top-[64px] z-30 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div 
        ref={scrollRef}
        className="flex items-center space-x-2 p-3 overflow-x-auto no-scrollbar scroll-smooth"
      >
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelect(cat)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' 
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              <span className={isActive ? 'text-white' : 'text-slate-400'}>
                {getCategoryIcon(cat, 16)}
              </span>
              <span className="text-sm font-medium">{cat}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryTabs;
