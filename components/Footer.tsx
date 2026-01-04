import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-slate-900 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col items-center text-center space-y-4">
        
        <div className="flex items-center space-x-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <ImageIcon className="text-white" size={18} />
          </div>
          <span className="text-lg font-black italic tracking-tight text-white">
            GIGAWALLS
          </span>
        </div>

        <p className="text-sm text-slate-500 max-w-md">
          High-quality wallpapers curated across movies, anime, games, nature,
          sci-fi and more. Free to explore. Free to download.
        </p>

        <p className="text-xs text-slate-600">
          © {new Date().getFullYear()} GigaWalls. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
